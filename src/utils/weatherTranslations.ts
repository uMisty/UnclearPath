import { translations } from "@/i18n/translations";

export type SupportedLanguage = "zh" | "zh-TW" | "en";

/**
 * 获取默认位置名称
 */
export function getDefaultLocationName(language: string): string {
  const supportedLang = getSupportedLanguage(language);
  return translations[supportedLang].weather.defaultLocation;
}

/**
 * 获取本地化的天气状况
 */
export function getLocalizedCondition(
  condition: string,
  language: string,
): string {
  const supportedLang = getSupportedLanguage(language);
  const conditions = translations[supportedLang].weather.conditions;
  const lowerCondition = condition.toLowerCase();

  // 查找完全匹配的条件
  if (conditions[lowerCondition as keyof typeof conditions]) {
    return conditions[lowerCondition as keyof typeof conditions];
  }

  // 查找包含关键字的条件
  for (const [key, value] of Object.entries(conditions)) {
    if (lowerCondition.includes(key)) {
      return value;
    }
  }

  // 如果没有匹配，返回原文
  return condition;
}

/**
 * 将风向角度转换为本地化方向
 */
export function getLocalizedWindDirection(
  degrees: number,
  language: string,
): string {
  const supportedLang = getSupportedLanguage(language);
  const directions = translations[supportedLang].weather.windDirections;
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

/**
 * 获取逆地理编码API支持的语言代码
 */
export function getGeocodingLanguage(language: string): string {
  const languageMap: { [key: string]: string } = {
    zh: "zh",
    "zh-TW": "zh",
    en: "en",
  };
  return languageMap[language] || "en";
}

/**
 * 格式化位置名称 - 只显示城市名，不包含国家信息
 */
export function formatLocationName(
  city: string,
  _countryName: string,
  language: string,
): string {
  if (!city?.trim()) return getDefaultLocationName(language);

  // 所有语言都只显示城市名，不显示国家信息
  return city;
}

/**
 * 获取支持的语言代码
 */
function getSupportedLanguage(language: string): SupportedLanguage {
  if (language === "zh-TW") return "zh-TW";
  if (language.startsWith("zh")) return "zh";
  return "en";
}
