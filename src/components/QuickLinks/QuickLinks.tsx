"use client";

import { useLanguage } from "../../i18n/LanguageContext";
import { translations } from "../../i18n/translations";
import type { LinkItem } from "../../i18n/types";

export function QuickLinks() {
  const { language } = useLanguage();
  const quickLinksData = translations[language]?.quickLinks;

  if (!quickLinksData) {
    return null; // 语言还未加载
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-white text-lg font-semibold mb-4">
          {quickLinksData.title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-3 w-full justify-start">
        {quickLinksData.links.map((link: LinkItem, index: number) => (
          <a
            key={`quicklink-${index}-${link.name}`}
            href={link.url}
            className="btn-glass rounded-xl p-3 flex items-center gap-2 group flex-1 min-w-fit justify-center hover:scale-105"
            title={link.description}
          >
            <span className="text-lg">{link.icon}</span>
            <span className="font-medium text-sm whitespace-nowrap text-readable">
              {link.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
