import { NextResponse } from "next/server";
import { translations } from "@/i18n/translations";
import { type WeatherData, weatherCache } from "@/utils/weatherCache";
import {
  formatLocationName,
  getDefaultLocationName,
  getGeocodingLanguage,
  getLocalizedCondition,
  getLocalizedWindDirection,
} from "@/utils/weatherTranslations";

// 获取本地化错误消息的辅助函数
function getLocalizedErrorMessage(errorType: string, language: string): string {
  const lang = language === "zh-TW" ? "zh-TW" : language === "en" ? "en" : "zh";
  const errorMessages = translations[lang]?.weather?.errors;

  switch (errorType) {
    case "timeout":
      return errorMessages?.timeout || "网络超时，请稍后重试";
    case "notFound":
      return errorMessages?.notFound || "未找到该地区的天气信息";
    case "serverError":
      return errorMessages?.serverError || "天气服务暂时不可用";
    default:
      return errorMessages?.fetchFailed || "天气获取失败";
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // 优先使用经纬度，如果没有则使用默认的深圳坐标
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const language = searchParams.get("lang") || "zh"; // 新增语言参数

  try {
    // 深圳的经纬度作为默认值
    const defaultLat = "22.5431";
    const defaultLon = "114.0579";

    const latitude = lat || defaultLat;
    const longitude = lon || defaultLon;

    // 从环境变量获取API Key，保护密钥安全
    const apiKey = process.env.VISUAL_CROSSING_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Weather API key not configured" },
        { status: 500 },
      );
    }

    // 第一步：检查位置缓存，如果没有则使用逆地理编码获取城市名称
    let cityName = "";
    let locationDisplayName = getDefaultLocationName(language);

    // 首先检查位置缓存
    const cachedLocation = weatherCache.getLocation(
      latitude,
      longitude,
      language,
    );
    if (cachedLocation) {
      cityName = cachedLocation.cityName;
      locationDisplayName = cachedLocation.displayName;
    } else {
      // 缓存中没有，进行地理编码API调用
      try {
        // 根据语言设置逆地理编码API的语言参数
        const geoLanguage = getGeocodingLanguage(language);

        // 添加超时控制
        const geocodeController = new AbortController();
        const timeoutId = setTimeout(() => geocodeController.abort(), 5000); // 5秒超时

        const geocodeResponse = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=${geoLanguage}`,
          {
            headers: {
              Accept: "application/json",
              "User-Agent": "Mozilla/5.0 (compatible; Weather-App/1.0)",
            },
            signal: geocodeController.signal,
          },
        );

        clearTimeout(timeoutId);

        if (geocodeResponse.ok) {
          const geocodeData = await geocodeResponse.json();

          // 构建本地化地址 - 优先使用城市、县或区
          const city =
            geocodeData.city ||
            geocodeData.locality ||
            geocodeData.principalSubdivision;
          const countryName = geocodeData.countryName;

          if (city?.trim()) {
            // 构建更完整的城市名用于天气API查询
            // 格式：城市, 省份, 国家（英文）或 城市, 国家（英文）
            if (geocodeData.principalSubdivision && geocodeData.countryName) {
              // 如果有省份信息，使用完整格式：深圳, 广东, China
              cityName = `${city}, ${geocodeData.principalSubdivision}, China`;
            } else if (geocodeData.countryName) {
              // 只有国家信息：深圳, China
              cityName = `${city}, China`;
            } else {
              // 只有城市名，可能不够精确，但先尝试
              cityName = city;
            }

            // 用于显示的本地化城市名
            locationDisplayName = formatLocationName(
              city,
              countryName,
              language,
            );

            // 将位置信息保存到缓存
            const locationData = {
              cityName: cityName,
              displayName: locationDisplayName,
              coordinates: {
                lat: parseFloat(latitude),
                lon: parseFloat(longitude),
              },
            };
            weatherCache.setLocation(
              latitude,
              longitude,
              language,
              locationData,
            );
          }
        }
      } catch (_geocodeError) {
        // 尝试备用的地理编码服务
        try {
          const backupController = new AbortController();
          const backupTimeoutId = setTimeout(
            () => backupController.abort(),
            3000,
          ); // 3秒超时

          const backupResponse = await fetch(
            `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`,
            {
              headers: {
                Accept: "application/json",
                "User-Agent": "Mozilla/5.0 (compatible; Weather-App/1.0)",
              },
              signal: backupController.signal,
            },
          );

          clearTimeout(backupTimeoutId);

          if (backupResponse.ok) {
            const backupData = await backupResponse.json();

            const city =
              backupData.address?.city ||
              backupData.address?.town ||
              backupData.address?.village ||
              backupData.display_name?.split(",")[0]?.trim();

            if (city?.trim()) {
              cityName = city;
              locationDisplayName = city;
            }
          }
        } catch (_backupError) {
          // 备用地理编码服务也失败了，继续使用坐标
        }
      }
    }

    // 如果没有获取到城市名，回退到坐标查询
    const weatherLocation = cityName || `${latitude},${longitude}`;
    const cacheKey = cityName || `${latitude},${longitude}`;

    // 检查基于城市名的缓存
    const cachedData = weatherCache.get(cacheKey, language);
    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    // 第二步：使用城市名或坐标查询天气
    const weatherUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(weatherLocation)}?unitGroup=metric&key=${apiKey}&contentType=json&include=current`;

    // 创建AbortController用于超时控制
    const weatherController = new AbortController();
    const timeoutId = setTimeout(() => weatherController.abort(), 10000); // 10秒超时

    let response: Response;
    try {
      response = await fetch(weatherUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "User-Agent": "Mozilla/5.0 (compatible; Weather-App/1.0)",
        },
        signal: weatherController.signal,
      });
      clearTimeout(timeoutId);
    } catch (fetchError) {
      clearTimeout(timeoutId);

      // 检查是否是超时错误
      if (fetchError instanceof Error && fetchError.name === "AbortError") {
        return NextResponse.json(
          {
            error: getLocalizedErrorMessage("timeout", language),
            details: "Request timeout after 10 seconds",
          },
          { status: 408 },
        );
      }

      // 其他网络错误
      return NextResponse.json(
        {
          error: getLocalizedErrorMessage("fetchFailed", language),
          details:
            fetchError instanceof Error ? fetchError.message : "Network error",
        },
        { status: 500 },
      );
    }

    if (!response.ok) {
      const errorText = await response.text();
      // 根据HTTP状态码返回相应的错误消息
      let errorType = "serverError";
      if (response.status === 404) {
        errorType = "notFound";
      } else if (response.status >= 500) {
        errorType = "serverError";
      } else {
        errorType = "fetchFailed";
      }

      return NextResponse.json(
        {
          error: getLocalizedErrorMessage(errorType, language),
          details: `Weather API returned ${response.status}: ${errorText}`,
        },
        { status: response.status },
      );
    }

    const weatherData = await response.json();

    // 第三步：处理天气数据
    const currentConditions = weatherData.currentConditions;
    const todayData = weatherData.days[0];

    // 格式化天气数据
    const formattedWeather: WeatherData = {
      location: locationDisplayName, // 使用本地化的位置名称
      originalAddress: weatherData.resolvedAddress, // 保留原始地址作为备用
      temperature: Math.round(currentConditions.temp),
      condition: getLocalizedCondition(currentConditions.conditions, language),
      humidity: currentConditions.humidity,
      windSpeed: currentConditions.windspeed,
      windDirection: getLocalizedWindDirection(
        currentConditions.winddir,
        language,
      ),
      visibility: currentConditions.visibility,
      uvIndex: currentConditions.uvindex,
      icon: currentConditions.icon,
      description: todayData.description,
      tempMax: Math.round(todayData.tempmax),
      tempMin: Math.round(todayData.tempmin),
      coordinates: { lat: parseFloat(latitude), lon: parseFloat(longitude) },
    };

    // 将数据保存到缓存（使用城市名作为缓存键）
    weatherCache.set(cacheKey, language, formattedWeather);

    return NextResponse.json(formattedWeather);
  } catch (error) {
    return NextResponse.json(
      {
        error: getLocalizedErrorMessage("fetchFailed", language),
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
