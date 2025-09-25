"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";

export function Clock() {
  const { t, language, formatWeather, formatDate } = useLanguage();
  const [time, setTime] = useState<Date | null>(null);
  const [weather, setWeather] = useState<{
    location: string;
    temperature: number;
    condition: string;
    windDirection: string;
    windSpeed: number;
  } | null>(null);
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(language);

  useEffect(() => {
    // 首次设置时间
    setTime(new Date());

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 监听语言变化，触发天气重新加载
  useEffect(() => {
    if (currentLanguage !== language) {
      // 语言切换时，清除当前天气数据并显示加载状态
      setWeather(null);
      setIsLoadingWeather(true);
      setCurrentLanguage(language);
    }
  }, [language, currentLanguage]);

  useEffect(() => {
    // 获取用户地理位置 - 只在客户端执行
    const getLocation = () => {
      if (typeof window === "undefined") return;

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCoordinates({ lat: latitude, lon: longitude });
          },
          (_error) => {
            // 获取位置失败，使用深圳的坐标作为默认值
            setCoordinates({ lat: 22.5431, lon: 114.0579 });
          },
          {
            timeout: 10000,
            maximumAge: 600000, // 10分钟内的缓存位置有效
            enableHighAccuracy: false, // 不要求高精度，提高获取速度
          },
        );
      } else {
        // 浏览器不支持地理位置，使用深圳坐标
        setCoordinates({ lat: 22.5431, lon: 114.0579 });
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    // 当有坐标时获取天气数据
    const fetchWeather = async () => {
      if (!coordinates) return;

      // 开始加载
      setIsLoadingWeather(true);

      try {
        const response = await fetch(
          `/api/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&lang=${language}`,
        );
        if (response.ok) {
          const weatherData = await response.json();
          setWeather({
            location: weatherData.location, // 直接使用API返回的位置名称
            temperature: weatherData.temperature,
            condition: weatherData.condition,
            windDirection: weatherData.windDirection,
            windSpeed: Math.round(weatherData.windSpeed),
          });
        }
      } catch (_error) {
        // 如果API失败，显示默认天气信息
        setWeather({
          location: t("weather.defaultLocation"),
          temperature: 25,
          condition: t("weather.defaultCondition"),
          windDirection: t("weather.defaultWind"),
          windSpeed: 3,
        });
      } finally {
        // 无论成功还是失败，都结束加载状态
        setIsLoadingWeather(false);
      }
    };

    if (coordinates) {
      fetchWeather();
    }
  }, [coordinates, language, t]); // 添加language作为依赖，语言变化时重新获取天气

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("zh-CN", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="text-right clock-container">
      <div className="text-sm clock-date mb-1">
        {time ? formatDate(time) : "--"}
      </div>
      <div className="text-4xl md:text-5xl font-mono font-bold tracking-wider mb-2 clock-time">
        {time ? formatTime(time) : "--:--:--"}
      </div>
      <div className="text-sm clock-weather">
        {isLoadingWeather ? (
          // 显示加载状态 - 右对齐
          <div className="flex items-center justify-end gap-2 clock-loading">
            <div className="animate-spin rounded-full h-3 w-3 border clock-spinner border-t-transparent"></div>
            <span>{t("clock.loading")}</span>
          </div>
        ) : weather ? (
          // 显示天气信息
          formatWeather(weather)
        ) : // 显示定位状态
        coordinates ? (
          t("clock.loading")
        ) : (
          t("clock.locating")
        )}
      </div>
    </div>
  );
}
