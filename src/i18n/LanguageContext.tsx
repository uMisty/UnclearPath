"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  ensureLanguageLoaded,
  type Language,
  translations,
} from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  formatWeather: (weather: WeatherData) => string;
  formatDate: (date: Date) => string;
  getPageTitle: () => string;
  isLoading: boolean;
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

// 简化的语言检测函数
function getUserPreferredLanguage(): Language {
  if (typeof window === "undefined") return "zh";

  // 从localStorage获取保存的语言设置
  const savedLanguage = localStorage.getItem("preferred-language") as Language;
  if (savedLanguage && ["zh", "zh-TW", "en"].includes(savedLanguage)) {
    return savedLanguage;
  }

  // 从浏览器语言获取（简化逻辑）
  const browserLang = navigator.language || "zh";

  if (browserLang.startsWith("zh")) {
    return browserLang.includes("TW") ||
      browserLang.includes("HK") ||
      browserLang.includes("MO")
      ? "zh-TW"
      : "zh";
  }
  if (browserLang.startsWith("en")) return "en";

  return "zh";
}

// 嵌套对象访问函数
function getNestedValue(obj: unknown, path: string): string {
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 初始化用户首选语言
    const preferredLang = getUserPreferredLanguage();
    if (preferredLang !== "zh") {
      setIsLoading(true);
      ensureLanguageLoaded(preferredLang).finally(() => {
        setLanguageState(preferredLang);
        setIsLoading(false);
      });
    } else {
      setLanguageState(preferredLang);
    }
  }, []);

  const setLanguage = async (lang: Language) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("preferred-language", lang);
    }

    if (lang !== "zh") {
      setIsLoading(true);
      await ensureLanguageLoaded(lang);
      setIsLoading(false);
    }

    setLanguageState(lang);
  };

  const t = (key: string): string => {
    if (!translations[language]) return key;
    return getNestedValue(translations[language], key);
  };

  const formatDate = (date: Date): string => {
    if (!translations[language]) return "";

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
    if (!translations[language]) return "";
    const template = getNestedValue(translations[language], "weather.format");
    return template
      .replace("{location}", weather.location)
      .replace("{condition}", weather.condition)
      .replace("{temperature}", weather.temperature.toString())
      .replace("{windDirection}", weather.windDirection)
      .replace("{windSpeed}", weather.windSpeed.toString());
  };

  const getPageTitle = (): string => {
    if (!translations[language]) return "UnclearPath";
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
        isLoading,
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
