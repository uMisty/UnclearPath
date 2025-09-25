// 中文翻译
export const zh = {
  // 站点配置
  site: {
    title: "个人主页",
    name: "uMisty",
    description: "一个优雅的个人主页，展示你的数字名片",
  },
  // 时钟和天气
  clock: {
    today: "今天",
    currentTime: "现在",
    loading: "获取天气中...",
    locating: "定位中...",
    reloading: "重新加载中...",
    weekdays: [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
    ],
    dateFormat: "{year} 年 {month} 月 {day} 日 {weekday}",
  },
  weather: {
    location: "位置",
    temperature: "温度",
    condition: "天气",
    wind: "风向",
    level: "级",
    format:
      "{location} {condition} {temperature}°C {windDirection} ≤{windSpeed} 级",
    defaultLocation: "深圳市",
    defaultCondition: "多云",
    defaultWind: "东南风",
    // 错误消息
    errors: {
      fetchFailed: "天气获取失败",
      timeout: "网络超时，请稍后重试",
      notFound: "未找到该地区的天气信息",
      serverError: "天气服务暂时不可用",
    },
    // 天气状况翻译
    conditions: {
      clear: "晴朗",
      sunny: "晴天",
      cloudy: "多云",
      overcast: "阴天",
      rain: "雨",
      drizzle: "毛毛雨",
      showers: "阵雨",
      snow: "雪",
      sleet: "雨夹雪",
      fog: "雾",
      mist: "薄雾",
      haze: "霾",
      thunderstorm: "雷雨",
      tornado: "龙卷风",
      hurricane: "飓风",
      windy: "大风",
      hot: "炎热",
      cold: "寒冷",
      freezing: "冰冻",
      "partly-cloudy-day": "局部多云",
      "partly-cloudy-night": "局部多云",
      "clear-day": "晴朗",
      "clear-night": "晴朗",
    },
    // 风向翻译
    windDirections: [
      "北风",
      "东北风",
      "东风",
      "东南风",
      "南风",
      "西南风",
      "西风",
      "西北风",
    ],
  },
  // 座右铭
  motto: {
    title: "✨ 人生座右铭 ✨",
    text: "保持好奇心，永远在路上",
    subtitle: "Stay curious, always on the road",
  },
  // 快捷链接
  quickLinks: {
    title: "🌟 了解更多关于我 🌟",
    links: [
      {
        name: "网站列表",
        icon: "🌐",
        url: "/websites",
        description: "我的网站收藏",
      },
      {
        name: "博客",
        icon: "📝",
        url: "/blog",
        description: "技术分享与思考",
      },
      {
        name: "云存储",
        icon: "☁️",
        url: "/cloud",
        description: "文件存储服务",
      },
      {
        name: "音乐",
        icon: "🎵",
        url: "/music",
        description: "我的音乐播放列表",
      },
      {
        name: "起始页",
        icon: "🏠",
        url: "/start",
        description: "浏览器起始页",
      },
      {
        name: "收藏夹",
        icon: "⭐",
        url: "/collection",
        description: "精选内容收藏",
      },
      {
        name: "今日热门",
        icon: "🔥",
        url: "/trending",
        description: "热门内容推荐",
      },
    ],
  },
  // 社交媒体
  social: {
    title: "🤝 联系我",
    links: [
      {
        name: "GitHub",
        icon: "FaGithub",
        url: "https://github.com/umisty",
        description: "代码仓库与项目",
      },
      {
        name: "Steam",
        icon: "FaSteam",
        url: "https://steamcommunity.com/id/umisty",
        description: "游戏档案",
      },
      {
        name: "邮箱",
        icon: "MdEmail",
        url: "mailto:your.email@example.com",
        description: "联系邮箱",
      },
      {
        name: "Twitter",
        icon: "FaTwitter",
        url: "https://twitter.com/umisty",
        description: "推特动态",
      },
      {
        name: "LinkedIn",
        icon: "FaLinkedin",
        url: "https://linkedin.com/in/umisty",
        description: "职业网络",
      },
      {
        name: "YouTube",
        icon: "FaYoutube",
        url: "https://youtube.com/@umisty",
        description: "视频频道",
      },
    ],
  },
  // 个人介绍
  introduction: {
    greeting: "👋 你好，我是 CodeExplorer",
    role: "全栈开发者",
    bio: "我是一名热爱编程的全栈开发者，拥有多年的Web开发经验。专注于创建优雅、高效的代码解决方案，从前端用户界面到后端系统架构，我都能熟练掌握。\n\n喜欢探索新技术，保持学习的热情。相信代码不仅仅是解决问题的工具，更是一种艺术表达。在工作中追求完美的用户体验，在代码中追求简洁与优雅。",
    tags: [
      {
        name: "全栈开发",
        icon: "💻",
        color: "#3B82F6",
      },
      {
        name: "技术探索",
        icon: "🔍",
        color: "#10B981",
      },
      {
        name: "开源贡献",
        icon: "🌟",
        color: "#F59E0B",
      },
      {
        name: "代码艺术",
        icon: "🎨",
        color: "#8B5CF6",
      },
      {
        name: "学习热情",
        icon: "📚",
        color: "#EF4444",
      },
    ],
  },
  // 语言切换
  language: {
    switch: "切换语言",
  },
  // 加载屏幕
  loading: {
    brandName: "UnclearPath",
    welcome: "欢迎来到我的个人主页",
    status: {
      initializing: "初始化...",
      loadingResources: "加载资源...",
      preparingInterface: "准备界面...",
      completed: "完成加载...",
    },
  },
};
