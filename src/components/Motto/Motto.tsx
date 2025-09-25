"use client";

import { useLanguage } from "../../i18n/LanguageContext";

export function Motto() {
  const { t } = useLanguage();

  return (
    <div className="glass-card-adaptive rounded-2xl p-6 text-center shadow-lg hover-glow bg-overlay-dark">
      <div className="text-readable text-lg font-medium mb-2">
        {t("motto.title")}
      </div>
      <div className="text-contrast-soft text-base leading-relaxed whitespace-pre-line">
        {t("motto.text")}
      </div>
      <div className="text-white/60 text-sm mt-2">{t("motto.subtitle")}</div>
    </div>
  );
}
