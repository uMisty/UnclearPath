"use client";

import { useEffect } from "react";
import {
  AnimatedBackground,
  Clock,
  Introduction,
  Motto,
  QuickLinks,
  SocialLinks,
} from "../components";
import { useRandomGradient } from "../hooks/useRandomGradient";
import { useLanguage } from "../i18n/LanguageContext";
import { LanguageSwitch } from "../i18n/LanguageSwitch";

// 主页内容组件
export default function HomePage() {
  const { gradientStyle } = useRandomGradient();
  const { getPageTitle } = useLanguage();

  // 动态更新页面标题
  useEffect(() => {
    const title = getPageTitle();
    document.title = title;
  }, [getPageTitle]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientStyle}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* 动态背景效果 */}
      <AnimatedBackground gradientStyle={gradientStyle} />

      <div className="relative z-10 min-h-screen flex flex-col p-6 md:p-8">
        <div className="flex justify-between items-start mb-8">
          {/* 左上角语言切换器 */}
          <div className="animate-fadeInUp">
            <LanguageSwitch />
          </div>
          {/* 右上角时钟 */}
          <div className="animate-fadeInUp-delay">
            <Clock />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center py-8">
          <div className="grid lg:grid-cols-2 gap-6 items-center max-w-5xl w-full mx-auto">
            {/* 左侧：个人介绍 */}
            <div className="flex justify-center">
              <div className="space-y-6 animate-fadeInUp-delay">
                <div className="hover-lift">
                  <Introduction />
                </div>
              </div>
            </div>

            {/* 右侧：座右铭和快捷链接 */}
            <div className="flex justify-center">
              <div className="space-y-6 w-full max-w-lg">
                <div className="animate-fadeInUp">
                  <Motto />
                </div>
                <div className="animate-fadeInUp-delay-2">
                  <QuickLinks />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部社交媒体和版权 */}
        <div className="mt-8 space-y-6">
          <div className="animate-fadeInUp-delay-2">
            <SocialLinks />
          </div>
          <div className="text-center text-white/60 text-xs md:text-sm">
            Copyright © 2025 uMisty. Powered by{" "}
            <a
              href="https://github.com/uMisty/UnclearPath"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors underline decoration-white/40 hover:decoration-white"
            >
              UnclearPath
            </a>
            . Made by{" "}
            <a
              href="https://umisty.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors underline decoration-white/40 hover:decoration-white"
            >
              uMisty
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
