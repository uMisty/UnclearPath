"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { type Language, translations } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  formatWeather: (weather: WeatherData) => string;
  formatDate: (date: Date) => string;
  getPageTitle: () => string;
}

interface WeatherData {
  location: string;
  condition: string;
  temperature: number;
  windDirection: string;
  windSpeed: number;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// 获取用户首选语言
function getUserPreferredLanguage(): Language {
  if (typeof window === "undefined") return "zh";

  // 从localStorage获取保存的语言设置
  const savedLanguage = localStorage.getItem("preferred-language") as Language;
  if (savedLanguage && savedLanguage in translations) {
    return savedLanguage;
  }

  // 从浏览器语言获取
  const browserLang = navigator.language || navigator.languages?.[0] || "zh";

  // 匹配支持的语言
  if (browserLang.startsWith("zh")) {
    // 区分简体和繁体中文
    if (
      browserLang.includes("TW") ||
      browserLang.includes("HK") ||
      browserLang.includes("MO")
    ) {
      return "zh-TW";
    }
    return "zh";
  }
  if (browserLang.startsWith("en")) return "en";

  // 默认简体中文
  return "zh";
}

// 嵌套对象访问函数
function getNestedValue(obj: Record<string, unknown>, path: string): string {
  return (
    (path.split(".").reduce((current: unknown, key: string) => {
      if (current && typeof current === "object" && key in current) {
        return (current as Record<string, unknown>)[key];
      }
      return undefined;
    }, obj) as string) || path
  );
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("zh");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // 客户端初始化语言
    const preferredLang = getUserPreferredLanguage();
    setLanguageState(preferredLang);
    setIsInitialized(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("preferred-language", lang);
    }
  };

  const t = (key: string): string => {
    if (!isInitialized) return key; // 初始化前返回key避免闪烁
    return getNestedValue(translations[language], key);
  };

  const formatDate = (date: Date): string => {
    if (!isInitialized) return "";

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdayIndex = date.getDay();

    const weekdays = getNestedValue(
      translations[language],
      "clock.weekdays",
    ) as unknown as string[];
    const weekday = weekdays[weekdayIndex];
    const template = getNestedValue(translations[language], "clock.dateFormat");

    if (language === "en") {
      const months = getNestedValue(
        translations[language],
        "clock.months",
      ) as unknown as string[];
      return template
        .replace("{year}", year.toString())
        .replace("{month}", months[month - 1])
        .replace("{day}", day.toString())
        .replace("{weekday}", weekday);
    } else {
      // 中文格式
      return template
        .replace("{year}", year.toString())
        .replace("{month}", month.toString().padStart(2, "0"))
        .replace("{day}", day.toString().padStart(2, "0"))
        .replace("{weekday}", weekday);
    }
  };

  const formatWeather = (weather: WeatherData): string => {
    if (!isInitialized) return "";
    const template = getNestedValue(translations[language], "weather.format");
    return template
      .replace("{location}", weather.location)
      .replace("{condition}", weather.condition)
      .replace("{temperature}", weather.temperature.toString())
      .replace("{windDirection}", weather.windDirection)
      .replace("{windSpeed}", weather.windSpeed.toString());
  };

  const getPageTitle = (): string => {
    if (!isInitialized) return "UnclearPath";
    const pageTitle = getNestedValue(translations[language], "site.title");
    const siteName = getNestedValue(translations[language], "site.name");
    return `${pageTitle} - ${siteName}`;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        formatWeather,
        formatDate,
        getPageTitle,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
