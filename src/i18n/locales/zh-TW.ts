// 繁體中文翻譯
export const zhTW = {
  // 站點配置
  site: {
    title: "個人主頁",
    name: "uMisty",
    description: "一個優雅的個人主頁，展示你的數位名片",
  },
  // 時鐘和天氣
  clock: {
    today: "今天",
    currentTime: "現在",
    loading: "獲取天氣中...",
    locating: "定位中...",
    reloading: "重新載入中...",
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
    temperature: "溫度",
    condition: "天氣",
    wind: "風向",
    level: "級",
    format:
      "{location} {condition} {temperature}°C {windDirection} ≤{windSpeed} 級",
    defaultLocation: "深圳市",
    defaultCondition: "多雲",
    defaultWind: "東南風",
    // 錯誤消息
    errors: {
      fetchFailed: "天氣獲取失敗",
      timeout: "網路超時，請稍後重試",
      notFound: "未找到該地區的天氣資訊",
      serverError: "天氣服務暫時不可用",
    },
    // 天氣狀況翻譯
    conditions: {
      clear: "晴朗",
      sunny: "晴天",
      cloudy: "多雲",
      overcast: "陰天",
      rain: "雨",
      drizzle: "毛毛雨",
      showers: "陣雨",
      snow: "雪",
      sleet: "雨夾雪",
      fog: "霧",
      mist: "薄霧",
      haze: "霾",
      thunderstorm: "雷雨",
      tornado: "龍捲風",
      hurricane: "颶風",
      windy: "大風",
      hot: "炎熱",
      cold: "寒冷",
      freezing: "冰凍",
      "partly-cloudy-day": "局部多雲",
      "partly-cloudy-night": "局部多雲",
      "clear-day": "晴朗",
      "clear-night": "晴朗",
    },
    // 風向翻譯
    windDirections: [
      "北風",
      "東北風",
      "東風",
      "東南風",
      "南風",
      "西南風",
      "西風",
      "西北風",
    ],
  },
  // 座右銘
  motto: {
    title: "✨ 人生座右銘 ✨",
    text: "保持好奇心，永遠在路上",
    subtitle: "Stay curious, always on the road",
  },
  // 快捷連結
  quickLinks: {
    title: "🌟 了解更多關於我 🌟",
    links: [
      {
        name: "網站列表",
        icon: "🌐",
        url: "/websites",
        description: "我的網站收藏",
      },
      {
        name: "部落格",
        icon: "📝",
        url: "/blog",
        description: "技術分享與思考",
      },
      {
        name: "雲端存儲",
        icon: "☁️",
        url: "/cloud",
        description: "檔案存儲服務",
      },
      {
        name: "音樂",
        icon: "🎵",
        url: "/music",
        description: "我的音樂播放清單",
      },
      {
        name: "起始頁",
        icon: "🏠",
        url: "/start",
        description: "瀏覽器起始頁",
      },
      {
        name: "收藏夾",
        icon: "⭐",
        url: "/collection",
        description: "精選內容收藏",
      },
      {
        name: "今日熱門",
        icon: "🔥",
        url: "/trending",
        description: "熱門內容推薦",
      },
    ],
  },
  // 社交媒體
  social: {
    title: "🤝 聯繫我",
    links: [
      {
        name: "GitHub",
        icon: "FaGithub",
        url: "https://github.com/umisty",
        description: "程式碼倉庫與專案",
      },
      {
        name: "Steam",
        icon: "FaSteam",
        url: "https://steamcommunity.com/id/umisty",
        description: "遊戲檔案",
      },
      {
        name: "電子郵件",
        icon: "MdEmail",
        url: "mailto:your.email@example.com",
        description: "聯繫郵箱",
      },
      {
        name: "Twitter",
        icon: "FaTwitter",
        url: "https://twitter.com/umisty",
        description: "推特動態",
      },
      {
        name: "LinkedIn",
        icon: "FaLinkedin",
        url: "https://linkedin.com/in/umisty",
        description: "職業網路",
      },
      {
        name: "YouTube",
        icon: "FaYoutube",
        url: "https://youtube.com/@umisty",
        description: "影片頻道",
      },
    ],
  },
  // 個人介紹
  introduction: {
    greeting: "👋 你好，我是 CodeExplorer",
    role: "全端開發者",
    bio: "我是一名熱愛程式設計的全端開發者，擁有多年的Web開發經驗。專注於創建優雅、高效的程式碼解決方案，從前端使用者介面到後端系統架構，我都能熟練掌握。\n\n喜歡探索新技術，保持學習的熱忱。相信程式碼不僅僅是解決問題的工具，更是一種藝術表達。在工作中追求完美的使用者體驗，在程式碼中追求簡潔與優雅。",
    tags: [
      {
        name: "全端開發",
        icon: "💻",
        color: "#3B82F6",
      },
      {
        name: "技術探索",
        icon: "🔍",
        color: "#10B981",
      },
      {
        name: "開源貢獻",
        icon: "🌟",
        color: "#F59E0B",
      },
      {
        name: "程式藝術",
        icon: "🎨",
        color: "#8B5CF6",
      },
      {
        name: "學習熱忱",
        icon: "📚",
        color: "#EF4444",
      },
    ],
  },
  // 語言切換
  language: {
    switch: "切換語言",
  },
};
