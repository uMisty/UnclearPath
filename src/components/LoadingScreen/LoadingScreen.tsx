"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { appConfig } from "../../config";
import { useLanguage } from "../../i18n/LanguageContext";

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

export function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [displayText, setDisplayText] = useState("加载中...");
  const [avatarError, setAvatarError] = useState(false);
  const { t } = useLanguage();

  // 从配置文件获取设置
  const { loading: loadingConfig } = appConfig;

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;

    // 从国际化文件获取加载文本
    const loadingTexts = [
      t("loading.status.initializing"),
      t("loading.status.loadingResources"),
      t("loading.status.preparingInterface"),
      t("loading.status.completed"),
    ];

    // 初始化显示文本
    setDisplayText(loadingTexts[0]);

    // 模拟加载进度
    const simulateLoading = () => {
      let currentProgress = 0;

      progressInterval = setInterval(() => {
        const increment =
          Math.random() *
            (loadingConfig.progressConfig.incrementMax -
              loadingConfig.progressConfig.incrementMin) +
          loadingConfig.progressConfig.incrementMin;

        currentProgress += increment;

        if (currentProgress >= 100) {
          currentProgress = 100;
          setProgress(100);
          setDisplayText(loadingTexts[3]);
          clearInterval(progressInterval);

          // 等待一小段时间让用户看到 100%
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(
              onLoadComplete,
              loadingConfig.progressConfig.fadeOutDelay,
            );
          }, loadingConfig.progressConfig.completionDelay);
        } else {
          setProgress(currentProgress);

          // 根据进度更新文本
          if (currentProgress < 25) {
            setDisplayText(loadingTexts[0]);
          } else if (currentProgress < 50) {
            setDisplayText(loadingTexts[1]);
          } else if (currentProgress < 75) {
            setDisplayText(loadingTexts[2]);
          } else {
            setDisplayText(loadingTexts[3]);
          }
        }
      }, loadingConfig.progressConfig.updateInterval);
    };

    // 等待所有资源加载完成
    const checkResourcesLoaded = () => {
      // 检查页面加载状态
      const isDocumentReady = document.readyState === "complete";

      // 检查图片是否加载完成
      const images = Array.from(document.images);
      const allImagesLoaded = images.every(
        (img) => img.complete && img.naturalHeight !== 0,
      );

      // 检查字体是否加载完成
      const checkFontsLoaded = () => {
        return document.fonts ? document.fonts.ready : Promise.resolve();
      };

      if (isDocumentReady && allImagesLoaded) {
        checkFontsLoaded().then(() => {
          setTimeout(simulateLoading, 300);
        });
      } else {
        // 监听所有加载完成事件
        const handleLoad = () => {
          checkFontsLoaded().then(() => {
            setTimeout(simulateLoading, 300);
          });
        };

        if (!isDocumentReady) {
          window.addEventListener("load", handleLoad, { once: true });
        } else {
          // 等待图片加载
          Promise.all(
            images.map((img) => {
              if (img.complete) return Promise.resolve();
              return new Promise((resolve) => {
                img.onload = img.onerror = resolve;
              });
            }),
          ).then(() => {
            checkFontsLoaded().then(() => {
              setTimeout(simulateLoading, 300);
            });
          });
        }
      }
    };

    checkResourcesLoaded();

    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, [onLoadComplete, t, loadingConfig]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 transition-opacity duration-500 ${
        isComplete ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* 背景动画效果 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>

        {Array.from({ length: 6 }, (_, i) => {
          const uniqueKey = `floating-dot-${Date.now()}-${Math.random()}-${i}`;
          return (
            <div
              key={uniqueKey}
              className={`absolute w-2 h-2 bg-white/30 rounded-full loading-floating-dot floating-dot-pos-${i}`}
            />
          );
        })}
      </div>

      {/* 主要加载内容 */}
      <div className="relative z-10 text-center text-white">
        {/* Logo 或品牌名称 */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold animate-pulse overflow-hidden">
            {!avatarError ? (
              <Image
                src={appConfig.avatar.url}
                alt={t("loading.brandName")}
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
          <h1 className="text-2xl font-bold mb-2">{t("loading.brandName")}</h1>
          <p className="text-white/70 text-sm">{t("loading.welcome")}</p>
        </div>

        {/* 加载动画 */}
        <div className="mb-6">
          <div className="relative w-64 h-2 bg-white/20 rounded-full mx-auto overflow-hidden">
            <div
              className={`absolute left-0 top-0 h-full bg-gradient-to-r from-blue-400 to-purple-600 rounded-full loading-progress-bar progress-${Math.round(progress)}`}
            >
              {/* 闪光效果 */}
              <div className="absolute right-0 top-0 w-4 h-full loading-progress-shine"></div>
            </div>
          </div>

          {/* 进度百分比 */}
          <div className="mt-3 text-sm text-white/80">
            {Math.round(progress)}%
          </div>
        </div>

        {/* 加载状态文本 */}
        <div className="text-white/60 text-sm animate-pulse">{displayText}</div>

        {/* 底部装饰 */}
        <div className="mt-8 flex justify-center space-x-1">
          {[...Array(3)].map((_, i) => {
            const uniqueBounceKey = `bounce-dot-${Date.now()}-${Math.random()}-${i}`;
            return (
              <div
                key={uniqueBounceKey}
                className="w-2 h-2 bg-white/40 rounded-full loading-bounce-dot"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
