// 多语言翻译配置
export const translations = {
  zh: {
    // 站点配置
    site: {
      title: '个人主页',      // 页面名称
      name: 'uMisty',        // 站点名称
      description: '一个优雅的个人主页，展示你的数字名片',
    },
    // 时钟和天气
    clock: {
      today: '今天',
      currentTime: '现在',
      loading: '获取天气中...',
      locating: '定位中...',
      reloading: '重新加载中...',
      weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      dateFormat: '{year} 年 {month} 月 {day} 日 {weekday}',
    },
    weather: {
      location: '位置',
      temperature: '温度',
      condition: '天气',
      wind: '风向',
      level: '级',
      format: '{location} {condition} {temperature}°C {windDirection} ≤{windSpeed} 级',
      defaultLocation: '深圳市',
      defaultCondition: '多云',
      defaultWind: '东南风',
    },
    // 座右铭
    motto: {
      title: '✨ 人生座右铭 ✨',
      text: '保持好奇心，永远在路上',
      subtitle: 'Stay curious, always on the road',
    },
    // 快捷链接
    quickLinks: {
      title: '🌟 多了解了解我 🌟',
      websites: '网站列表',
      blog: '博客',
      cloud: '网盘',
      music: '音乐',
      start: '起始页',
      collection: '网址集',
      trending: '今日热榜',
    },
    // 社交媒体
    social: {
      github: 'GitHub',
      steam: 'Steam',
      email: '邮箱',
      twitter: 'Twitter',
      telegram: 'Telegram',
      discord: 'Discord',
    },
    // 个人介绍
    introduction: {
      greeting: '👋 你好，我是 CodeExplorer',
      role: '全栈开发者',
      bio: '我是一名热爱编程的全栈开发者，拥有多年的Web开发经验。专注于创建优雅、高效的代码解决方案，从前端用户界面到后端系统架构，我都能熟练掌握。\n\n喜欢探索新技术，保持学习的热情。相信代码不仅仅是解决问题的工具，更是一种艺术表达。在工作中追求完美的用户体验，在代码中追求简洁与优雅。',
      linkText: '查看我的',
      github: 'GitHub',
      tags: {
        fullstack: '#全栈开发',
        exploration: '#技术探索',
        opensource: '#开源贡献',
      },
    },
    // 语言切换
    language: {
      switch: '切换语言',
    },
  },
  'zh-TW': {
    // 站點配置
    site: {
      title: '個人主頁',      // 頁面名稱
      name: 'uMisty',        // 站點名稱
      description: '一個優雅的個人主頁，展示你的數字名片',
    },
    // 時鐘和天氣
    clock: {
      today: '今天',
      currentTime: '現在',
      loading: '獲取天氣中...',
      locating: '定位中...',
      reloading: '重新載入中...',
      weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      dateFormat: '{year} 年 {month} 月 {day} 日 {weekday}',
    },
    weather: {
      location: '位置',
      temperature: '溫度',
      condition: '天氣',
      wind: '風向',
      level: '級',
      format: '{location} {condition} {temperature}°C {windDirection} ≤{windSpeed} 級',
      defaultLocation: '深圳市',
      defaultCondition: '多雲',
      defaultWind: '東南風',
    },
    // 座右銘
    motto: {
      title: '✨ 人生座右銘 ✨',
      text: '保持好奇心，永远在路上',
      subtitle: 'Stay curious, always on the road',
    },
    // 快捷連結
    quickLinks: {
      title: '🌟 多了解了解我 🌟',
      websites: '網站列表',
      blog: '部落格',
      cloud: '網盤',
      music: '音樂',
      start: '起始頁',
      collection: '網址集',
      trending: '今日熱榜',
    },
    // 社交媒體
    social: {
      github: 'GitHub',
      steam: 'Steam',
      email: '信箱',
      twitter: 'Twitter',
      telegram: 'Telegram',
      discord: 'Discord',
    },
    // 個人介紹
    introduction: {
      greeting: '👋 你好，我是 CodeExplorer',
      role: '全端開發者',
      bio: '我是一名熱愛程式設計的全端開發者，擁有多年的Web開發經驗。專注於創建優雅、高效的程式碼解決方案，從前端使用者介面到後端系統架構，我都能熟練掌握。\n\n喜歡探索新技術，保持學習的熱忱。相信程式碼不僅僅是解決問題的工具，更是一種藝術表達。在工作中追求完美的使用者體驗，在程式碼中追求簡潔與優雅。',
      linkText: '查看我的',
      github: 'GitHub',
      tags: {
        fullstack: '#全端開發',
        exploration: '#技術探索',
        opensource: '#開源貢獻',
      },
    },
    // 語言切換
    language: {
      switch: '切換語言',
    },
  },
  en: {
    // Site configuration
    site: {
      title: 'Personal Homepage',  // Page name
      name: 'uMisty',             // Site name
      description: 'An elegant personal homepage showcasing your digital business card',
    },
    // Clock and weather
    clock: {
      today: 'Today',
      currentTime: 'Now',
      loading: 'Loading weather...',
      locating: 'Locating...',
      reloading: 'Reloading...',
      weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      dateFormat: '{weekday}, {month} {day}, {year}',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    weather: {
      location: 'Location',
      temperature: 'Temperature',
      condition: 'Weather',
      wind: 'Wind',
      level: 'level',
      format: '{location} {condition} {temperature}°C {windDirection} ≤{windSpeed} level',
      defaultLocation: 'Shenzhen',
      defaultCondition: 'Cloudy',
      defaultWind: 'Southeast Wind',
    },
    // Motto
    motto: {
      title: '✨ Life Motto ✨',
      text: 'Stay curious, always on the road',
      subtitle: '保持好奇心，永远在路上',
    },
    // Quick links
    quickLinks: {
      title: '🌟 Get to Know Me More 🌟',
      websites: 'Website List',
      blog: 'Blog',
      cloud: 'Cloud Storage',
      music: 'Music',
      start: 'Start Page',
      collection: 'Bookmarks',
      trending: 'Trending Today',
    },
    // Social media
    social: {
      github: 'GitHub',
      steam: 'Steam',
      email: 'Email',
      twitter: 'Twitter',
      telegram: 'Telegram',
      discord: 'Discord',
    },
    // Personal introduction
    introduction: {
      greeting: '👋 Hello, I\'m CodeExplorer',
      role: 'Full-Stack Developer',
      bio: 'I am a passionate full-stack developer with years of web development experience. I focus on creating elegant and efficient code solutions, from frontend user interfaces to backend system architecture.\n\nI love exploring new technologies and maintaining a passion for learning. I believe code is not just a tool for solving problems, but also a form of artistic expression. I pursue perfect user experience in work and simplicity and elegance in code.',
      linkText: 'Check out my',
      github: 'GitHub',
      tags: {
        fullstack: '#FullStack',
        exploration: '#TechExploration',
        opensource: '#OpenSource',
      },
    },
    // Language switch
    language: {
      switch: 'Switch Language',
    },
  },
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.zh;
