'use client';

import { useState, useRef, useEffect } from 'react';
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
  const [dropdownPosition, setDropdownPosition] = useState<'left' | 'right' | 'center'>('right');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  // 计算下拉菜单的最佳位置
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const dropdownWidth = 140; // 下拉菜单的最小宽度
      const viewportWidth = window.innerWidth;
      const padding = 20; // 增加安全边距

      // 移动端特殊处理
      if (viewportWidth <= 640) { // sm breakpoint
        // 在移动端，优先考虑居中或者确保完全可见
        const buttonCenter = buttonRect.left + buttonRect.width / 2;
        const dropdownHalfWidth = dropdownWidth / 2;
        
        // 检查居中显示是否可行
        if (buttonCenter - dropdownHalfWidth >= padding && 
            buttonCenter + dropdownHalfWidth <= viewportWidth - padding) {
          setDropdownPosition('center');
        } else if (buttonRect.right + dropdownWidth + padding <= viewportWidth) {
          setDropdownPosition('right');
        } else {
          setDropdownPosition('left');
        }
      } else {
        // 桌面端逻辑
        const spaceOnRight = viewportWidth - buttonRect.right;
        const spaceOnLeft = buttonRect.left;

        if (spaceOnRight >= dropdownWidth + padding) {
          setDropdownPosition('right');
        } else if (spaceOnLeft >= dropdownWidth + padding) {
          setDropdownPosition('left');
        } else {
          // 如果两侧都不够，选择空间更大的一侧
          setDropdownPosition(spaceOnRight > spaceOnLeft ? 'right' : 'left');
        }
      }
    }
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-2 text-white hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 hover:shadow-lg hover:shadow-white/10 min-w-[100px] justify-center"
        title={t('language.switch')}
      >
        <span className="text-sm">{currentLanguage.flag}</span>
        <span className="text-xs font-medium hidden sm:block whitespace-nowrap">{currentLanguage.name}</span>
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
          <div 
            ref={dropdownRef}
            className={`absolute top-full mt-2 bg-white/15 backdrop-blur-md rounded-xl border border-white/20 shadow-xl shadow-black/20 overflow-hidden z-20 min-w-[140px] max-w-[calc(100vw-32px)] ${
              dropdownPosition === 'left' ? 'right-0' : 
              dropdownPosition === 'center' ? 'left-1/2 transform -translate-x-1/2' : 
              'left-0'
            }`}
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left text-white hover:bg-white/20 transition-colors duration-200 flex items-center gap-3 whitespace-nowrap ${
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