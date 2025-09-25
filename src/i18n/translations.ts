// 多语言翻译配置

// 为了减少初始加载时间，我们只预加载默认语言（中文）
// 其他语言按需加载
import { zh } from "./locales/zh";

export type Language = "zh" | "zh-TW" | "en";

// 预加载默认语言
export const translations = {
  zh,
} as Record<Language, typeof zh>;

// 动态加载其他语言
const languageLoaders = {
  "zh-TW": () => import("./locales/zh-TW").then((module) => module.zhTW),
  en: () => import("./locales/en").then((module) => module.en),
};

// 语言加载缓存
const loadedLanguages = new Set<Language>(["zh"]);

// 动态加载语言
export async function ensureLanguageLoaded(language: Language): Promise<void> {
  if (loadedLanguages.has(language)) {
    return;
  }

  if (language === "zh") {
    // 中文已经预加载
    return;
  }

  try {
    const loader = languageLoaders[language as keyof typeof languageLoaders];
    if (loader) {
      const translation = await loader();
      translations[language] = translation;
      loadedLanguages.add(language);
    }
  } catch (error) {
    console.error(`Failed to load language ${language}:`, error);
    // 回退到中文
  }
}

export type TranslationKey = keyof typeof zh;
