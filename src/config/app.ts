// 应用配置文件

export const appConfig = {
  // 加载屏幕配置
  loading: {
    // 加载进度配置
    progressConfig: {
      // 每次进度增量范围 (最小值-最大值)
      incrementMin: 5,
      incrementMax: 20,
      // 进度更新间隔 (毫秒)
      updateInterval: 100,
      // 完成后等待时间 (毫秒)
      completionDelay: 300,
      // 淡出动画时间 (毫秒)
      fadeOutDelay: 500,
    },
  },
  // 头像配置
  avatar: {
    // 统一头像 (用于个人介绍和加载屏幕)
    url: "/logo.png",
    // 头像回退文字 (当图片加载失败时显示)
    fallback: "UP", // CodeExplorer的缩写
    // 头像尺寸配置
    sizes: {
      medium: 80, // 中等尺寸头像 (如个人介绍)
    },
  },
};

export type AppConfig = typeof appConfig;
