'use client';

import { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { Language } from './translations';

const languages = [
  { code: 'zh' as Language, name: '简体中文', flag: '🇨🇳' },
  { code: 'zh-TW' as Language, name: '繁體中文', flag: '🇹🇼' },
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
];

export function LanguageSwitch() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-2 text-white hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 hover:shadow-lg hover:shadow-white/10"
        title={t('language.switch')}
      >
        <span className="text-sm">{currentLanguage.flag}</span>
        <span className="text-xs font-medium hidden sm:block">{currentLanguage.name}</span>
        <svg 
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* 下拉菜单 */}
          <div className="absolute top-full right-0 mt-2 bg-white/15 backdrop-blur-md rounded-xl border border-white/20 shadow-xl shadow-black/20 overflow-hidden z-20 min-w-[120px]">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left text-white hover:bg-white/20 transition-colors duration-200 flex items-center gap-3 ${
                  language === lang.code ? 'bg-white/10' : ''
                }`}
              >
                <span className="text-sm">{lang.flag}</span>
                <span className="text-sm font-medium">{lang.name}</span>
                {language === lang.code && (
                  <span className="ml-auto text-green-400">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}