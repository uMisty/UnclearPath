import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // 优先使用经纬度，如果没有则使用默认的深圳坐标
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    const language = searchParams.get("lang") || "zh"; // 新增语言参数

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

    // 使用经纬度构建API URL
    const location = `${latitude},${longitude}`;
    const weatherUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}&contentType=json&include=current`;

    console.log(
      "Fetching weather from coordinates:",
      `${latitude},${longitude}`,
    );

    const response = await fetch(weatherUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; Weather-App/1.0)",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Weather API error ${response.status}:`, errorText);
      throw new Error(`Weather API returned ${response.status}: ${errorText}`);
    }

    const weatherData = await response.json();

    // 获取地理位置名称 (逆地理编码)
    let locationName =
      weatherData.resolvedAddress || getDefaultLocationName(language);

    try {
      // 根据语言设置逆地理编码API的语言参数
      const geoLanguage = getGeocodingLanguage(language);
      const geocodeResponse = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=${geoLanguage}`,
        {
          headers: {
            Accept: "application/json",
            "User-Agent": "Mozilla/5.0 (compatible; Weather-App/1.0)",
          },
        },
      );

      if (geocodeResponse.ok) {
        const geocodeData = await geocodeResponse.json();

        // 构建本地化地址 - 优先使用城市、县或区
        const city =
          geocodeData.city ||
          geocodeData.locality ||
          geocodeData.principalSubdivision;
        const countryName = geocodeData.countryName;

        if (city) {
          // 根据语言和国家判断地址格式
          locationName = formatLocationName(city, countryName, language);
        } else if (geocodeData.countryName) {
          locationName = formatCountryName(geocodeData.countryName, language);
        }

        console.log("Geocode result:", {
          language,
          city: geocodeData.city,
          locality: geocodeData.locality,
          principalSubdivision: geocodeData.principalSubdivision,
          countryName: geocodeData.countryName,
          finalName: locationName,
        });
      }
    } catch (geocodeError) {
      console.warn(
        "Geocoding failed, using weather API address:",
        geocodeError,
      );
      // 如果逆地理编码失败，尝试从天气API的地址中提取城市名
      if (weatherData.resolvedAddress) {
        const addressParts = weatherData.resolvedAddress.split(",");
        locationName = addressParts[0]?.trim() || weatherData.resolvedAddress;
      }
    }

    // 提取当前天气信息
    const currentConditions = weatherData.currentConditions;
    const todayData = weatherData.days[0];

    // 格式化天气数据
    const formattedWeather = {
      location: locationName, // 使用逆地理编码获取的位置名称
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

    return NextResponse.json(formattedWeather);
  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch weather data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// 获取逆地理编码API支持的语言代码
function getGeocodingLanguage(language: string): string {
  const languageMap: { [key: string]: string } = {
    zh: "zh",
    "zh-TW": "zh",
    en: "en",
  };
  return languageMap[language] || "en";
}

// 获取默认位置名称
function getDefaultLocationName(language: string): string {
  const defaultNames: { [key: string]: string } = {
    zh: "未知位置",
    "zh-TW": "未知位置",
    en: "Unknown Location",
  };
  return defaultNames[language] || defaultNames.en;
}

// 格式化位置名称
function formatLocationName(
  city: string,
  countryName: string,
  language: string,
): string {
  if (language === "zh" || language === "zh-TW") {
    // 中文：如果是中国，只显示城市名，不显示国家名
    return countryName === "China" ||
      countryName === "中国" ||
      countryName === "中华人民共和国"
      ? city
      : `${city}, ${countryName}`;
  } else {
    // 英文：显示城市和国家
    return `${city}, ${countryName}`;
  }
}

// 格式化国家名称
function formatCountryName(countryName: string, language: string): string {
  if (language === "zh" || language === "zh-TW") {
    return countryName === "中华人民共和国" ? "中国" : countryName;
  } else {
    return countryName;
  }
}

// 将英文天气条件转换为本地化文本
function getLocalizedCondition(condition: string, language: string): string {
  const conditionMaps: { [key: string]: { [key: string]: string } } = {
    zh: {
      clear: "晴",
      sunny: "晴",
      "partly-cloudy": "多云",
      cloudy: "阴",
      overcast: "阴",
      rain: "雨",
      snow: "雪",
      fog: "雾",
      wind: "风",
      "partly-cloudy-day": "多云",
      "partly-cloudy-night": "多云",
      "clear-day": "晴",
      "clear-night": "晴",
    },
    "zh-TW": {
      clear: "晴",
      sunny: "晴",
      "partly-cloudy": "多雲",
      cloudy: "陰",
      overcast: "陰",
      rain: "雨",
      snow: "雪",
      fog: "霧",
      wind: "風",
      "partly-cloudy-day": "多雲",
      "partly-cloudy-night": "多雲",
      "clear-day": "晴",
      "clear-night": "晴",
    },
    en: {
      clear: "Clear",
      sunny: "Sunny",
      "partly-cloudy": "Partly Cloudy",
      cloudy: "Cloudy",
      overcast: "Overcast",
      rain: "Rain",
      snow: "Snow",
      fog: "Fog",
      wind: "Windy",
      "partly-cloudy-day": "Partly Cloudy",
      "partly-cloudy-night": "Partly Cloudy",
      "clear-day": "Clear",
      "clear-night": "Clear",
    },
  };

  const conditionMap = conditionMaps[language] || conditionMaps.en;
  const lowerCondition = condition.toLowerCase();

  for (const key in conditionMap) {
    if (lowerCondition.includes(key)) {
      return conditionMap[key];
    }
  }

  return condition; // 如果没有匹配，返回原文
}

// 将风向角度转换为本地化方向
function getLocalizedWindDirection(degrees: number, language: string): string {
  const directionMaps: { [key: string]: string[] } = {
    zh: [
      "北风",
      "东北风",
      "东风",
      "东南风",
      "南风",
      "西南风",
      "西风",
      "西北风",
    ],
    "zh-TW": [
      "北風",
      "東北風",
      "東風",
      "東南風",
      "南風",
      "西南風",
      "西風",
      "西北風",
    ],
    en: [
      "North Wind",
      "Northeast Wind",
      "East Wind",
      "Southeast Wind",
      "South Wind",
      "Southwest Wind",
      "West Wind",
      "Northwest Wind",
    ],
  };

  const directions = directionMaps[language] || directionMaps.en;
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

// 将英文天气条件转换为中文 (保持向后兼容)
function _getChineseCondition(condition: string): string {
  return getLocalizedCondition(condition, "zh");
}

// 将风向角度转换为中文方向 (保持向后兼容)
function _getChineseWindDirection(degrees: number): string {
  return getLocalizedWindDirection(degrees, "zh");
}
