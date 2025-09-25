"use client";

import Image from "next/image";
import { useState } from "react";
import { appConfig } from "../../config";
import { useLanguage } from "../../i18n/LanguageContext";
import { translations } from "../../i18n/translations";
import type { TagItem } from "../../i18n/types";

export function Introduction() {
  const { t, language } = useLanguage();
  const [avatarError, setAvatarError] = useState(false);

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 text-white border border-white/10">
      {/* 头像和基本信息 */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-2 border-white/20 flex items-center justify-center text-xl font-bold overflow-hidden">
            {!avatarError ? (
              <Image
                src={appConfig.avatar.url}
                alt={t("introduction.greeting")}
                width={appConfig.avatar.sizes.medium}
                height={appConfig.avatar.sizes.medium}
                className="w-full h-full object-cover rounded-full"
                onError={() => setAvatarError(true)}
                onLoad={() => setAvatarError(false)}
              />
            ) : (
              <span className="text-white select-none">
                {appConfig.avatar.fallback}
              </span>
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white/20 flex items-center justify-center">
            <span className="text-xs">✨</span>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-1">
            {t("introduction.greeting")}
          </h2>
          <p className="text-sm opacity-80">{t("introduction.role")}</p>
        </div>
      </div>

      {/* 个人简介 */}
      <div className="space-y-4 mb-4">
        <p className="text-sm opacity-90 leading-relaxed whitespace-pre-line">
          {t("introduction.bio")}
        </p>
      </div>

      {/* 底部标签 */}
      <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10">
        {translations[language]?.introduction.tags.map(
          (tag: TagItem, index: number) => (
            <span
              key={`tag-${index}-${tag.name}`}
              className="tag-item px-2 py-1 text-xs rounded-full flex items-center gap-1 border text-white"
              data-color={tag.color}
            >
              <span>{tag.icon}</span>
              <span>{tag.name}</span>
            </span>
          ),
        )}
      </div>
    </div>
  );
}
