"use client";

import { useCallback, useEffect, useState } from "react";

interface AnimatedBackgroundProps {
  className?: string;
  gradientStyle?: string;
}

interface ParticleData {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export function AnimatedBackground({
  className = "",
  gradientStyle = "",
}: AnimatedBackgroundProps) {
  const [mounted, setMounted] = useState(false);
  const [opacityClass, setOpacityClass] = useState("adaptive-opacity-medium");
  const [particles, setParticles] = useState<ParticleData[]>([]);

  // 生成随机粒子位置，避开中心区域
  const generateRandomParticles = useCallback((): ParticleData[] => {
    const newParticles: ParticleData[] = [];
    const particleCount = 8 + Math.floor(Math.random() * 6); // 8-13个粒子

    for (let i = 0; i < particleCount; i++) {
      let x: number, y: number;

      // 确保粒子不出现在中心区域 (30%-70% 的区域)
      do {
        x = Math.random() * 100;
        y = Math.random() * 100;
      } while (
        x > 25 &&
        x < 75 &&
        y > 25 &&
        y < 75 // 避开中心50%区域
      );

      newParticles.push({
        id: i,
        x,
        y,
        size: 2 + Math.random() * 3, // 2-5px
        duration: 6 + Math.random() * 8, // 6-14秒
        delay: Math.random() * 5, // 0-5秒延迟
      });
    }

    return newParticles;
  }, []);

  useEffect(() => {
    setMounted(true);

    // 生成随机粒子
    setParticles(generateRandomParticles());

    // 根据背景渐变调整透明度类
    if (gradientStyle.includes("blue") || gradientStyle.includes("indigo")) {
      setOpacityClass("adaptive-opacity-high");
    } else if (
      gradientStyle.includes("purple") ||
      gradientStyle.includes("pink")
    ) {
      setOpacityClass("adaptive-opacity-medium");
    } else if (
      gradientStyle.includes("orange") ||
      gradientStyle.includes("yellow")
    ) {
      setOpacityClass("adaptive-opacity-max");
    } else {
      setOpacityClass("adaptive-opacity-medium");
    }
  }, [gradientStyle, generateRandomParticles]); // 设置粒子位置
  useEffect(() => {
    if (!mounted || particles.length === 0) return;

    particles.forEach((particle, index) => {
      const element = document.querySelector(
        `.random-particle-${index % 6}[data-x="${particle.x}"]`,
      ) as HTMLElement;
      if (element) {
        element.style.left = `${particle.x}%`;
        element.style.top = `${particle.y}%`;
      }
    });
  }, [mounted, particles]);

  if (!mounted) return null;
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${opacityClass} ${className}`}
    >
      {/* 网格背景 */}
      <div className="grid-overlay opacity-20" />

      {/* 曲线动态线条 */}
      <div className="bg-lines">
        <div className="bg-line bg-line-curved-1" />
        <div className="bg-line bg-line-curved-2" />
        <div className="bg-line bg-line-curved-3" />
        <div className="bg-line bg-line-wave" />
        <div className="bg-line bg-line-spiral" />
      </div>

      {/* 随机浮动粒子 */}
      <div className="floating-particles">
        {particles.map((particle, index) => (
          <div
            key={particle.id}
            className={`absolute rounded-full random-particle random-particle-${index % 6}`}
            data-x={particle.x}
            data-y={particle.y}
            data-size={particle.size}
            data-duration={particle.duration}
            data-delay={particle.delay}
          />
        ))}
      </div>

      {/* 边缘光环效果 - 避开中心区域 */}
      <div className="absolute inset-0">
        {/* 左上角光环 */}
        <div className="absolute top-[10%] left-[5%] w-80 h-80">
          <div className="w-full h-full rounded-full light-ring-1 enhanced-ring-1 shadow-2xl" />
        </div>

        {/* 右下角光环 */}
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96">
          <div className="w-full h-full rounded-full light-ring-2 enhanced-ring-2 shadow-2xl" />
        </div>

        {/* 边缘移动光斑 */}
        <div className="absolute inset-0">
          <div className="absolute top-[5%] left-[15%] rounded-full moving-glow-1 enhanced-glow-1" />
          <div className="absolute top-[80%] right-[10%] rounded-full moving-glow-2 enhanced-glow-2" />
          <div className="absolute bottom-[15%] left-[80%] rounded-full moving-glow-3 enhanced-glow-3" />
        </div>
      </div>
    </div>
  );
}
