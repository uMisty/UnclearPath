// 多语言翻译配置

import { en } from "./locales/en";
import { zh } from "./locales/zh";
import { zhTW } from "./locales/zh-TW";

export const translations = {
  zh,
  "zh-TW": zhTW,
  en,
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.zh;
