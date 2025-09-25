"use client";

import { useEffect, useState } from "react";

// 随机渐变背景生成器
export function useRandomGradient() {
  const [gradientStyle, setGradientStyle] = useState(
    "from-blue-400 via-purple-400 to-indigo-500",
  );

  useEffect(() => {
    // 只在客户端水合后设置随机样式

    // 和谐色彩组合预设 - 基于色彩理论
    const harmonicGradients = [
      // 暖色调组合
      "from-orange-400 via-red-400 to-pink-500",
      // 冷色调组合
      "from-blue-400 via-purple-400 to-indigo-500",
      // 自然色调组合
      "from-green-400 via-teal-400 to-blue-500",
      // 日落色调组合
      "from-yellow-400 via-orange-400 to-red-500",
      // 薰衣草色调组合
      "from-purple-400 via-pink-400 to-indigo-500",
      // 海洋色调组合
      "from-cyan-400 via-blue-400 to-indigo-600",
      // 森林色调组合
      "from-emerald-400 via-green-400 to-teal-500",
      // 梦幻色调组合
      "from-pink-400 via-purple-400 to-blue-500",
    ];

    // 随机选择一个和谐色彩组合
    const randomGradient =
      harmonicGradients[Math.floor(Math.random() * harmonicGradients.length)];

    setGradientStyle(randomGradient);
  }, []);

  return { gradientStyle };
}
