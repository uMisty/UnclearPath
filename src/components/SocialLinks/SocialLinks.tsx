"use client";

import { useLanguage } from "../../i18n/LanguageContext";
import { translations } from "../../i18n/translations";
import type { LinkItem } from "../../i18n/types";
import { getDynamicIcon } from "../../utils/iconResolver";

export function SocialLinks() {
  const { language } = useLanguage();
  const socialData = translations[language]?.social;

  if (!socialData) {
    return null; // 语言还未加载
  }

  return (
    <div className="flex items-center justify-center gap-3">
      {socialData.links.map((social: LinkItem, index: number) => {
        // 使用动态图标解析器，自动支持所有ReactIcon图标
        const IconComponent = getDynamicIcon(social.icon, "FaGlobe");

        return (
          <a
            key={`social-${index}-${social.name}`}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/20 hover:border-white/40 hover:shadow-lg hover:shadow-white/10"
            title={social.description}
          >
            <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />

            {/* 悬浮提示 */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
              {social.name}
            </div>
          </a>
        );
      })}
    </div>
  );
}
