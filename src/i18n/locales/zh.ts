// 中文翻译
export const zh = {
  // 站点配置
  site: {
    title: "Homepage",
    name: "uMisty",
    description: "一个熟练各种技术名称拼写的全栈工程师",
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
    title: "✨ 信念感 ✨",
    text: "编译信念，运行梦想",
    subtitle: "Compile beliefs, run dreams",
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
    greeting: "uMisty",
    role: "👀正在假装是一个全栈工程师",
    bio: "你好 👋，我是 Misty，一名正在全栈之路上升级打怪的开发者 🛠️。目前以 .NET 为核心技术栈，熟悉 Vue，正在学习 React 和 Flutter，一步步拓展自己的技能版图。对我来说，编程不仅是一份工作，更是一场持续探索的冒险，每一次敲下的代码，都是向未知世界迈出的一步。\n\n我热爱探索新技术 🔍，保持对编程的热枕 ❤️‍🔥，喜欢在解决问题的过程中找到成就感，也享受调试时那种“啊哈！”的瞬间 ✨。无论是后端的逻辑构建，还是前端的交互体验，我都希望能用代码创造出既实用又有温度的作品 🌍。\n\n未来，我希望自己能成为一名独立的全栈工程师 🚀，不仅能独立完成从后端到前端的开发，还能在跨平台领域游刃有余。对我来说，学习的过程永远不会停止，就像版本迭代一样，不断优化、不断进化。",
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
};
