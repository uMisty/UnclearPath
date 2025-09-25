// English translations
export const en = {
  // Site configuration
  site: {
    title: "Personal Homepage",
    name: "uMisty",
    description:
      "An elegant personal homepage showcasing your digital business card",
  },
  // Clock and weather
  clock: {
    today: "Today",
    currentTime: "Now",
    loading: "Loading weather...",
    locating: "Locating...",
    reloading: "Reloading...",
    weekdays: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    dateFormat: "{weekday}, {month} {day}, {year}",
  },
  weather: {
    location: "Location",
    temperature: "Temperature",
    condition: "Weather",
    wind: "Wind",
    level: "level",
    format:
      "{location} {condition} {temperature}°C {windDirection} ≤{windSpeed} level",
    defaultLocation: "Shenzhen",
    defaultCondition: "Cloudy",
    defaultWind: "Southeast Wind",
    // Error messages
    errors: {
      fetchFailed: "Failed to fetch weather",
      timeout: "Network timeout, please try again later",
      notFound: "Weather information not found for this location",
      serverError: "Weather service temporarily unavailable",
    },
    // Weather condition translations
    conditions: {
      clear: "Clear",
      sunny: "Sunny",
      cloudy: "Cloudy",
      overcast: "Overcast",
      rain: "Rain",
      drizzle: "Drizzle",
      showers: "Showers",
      snow: "Snow",
      sleet: "Sleet",
      fog: "Fog",
      mist: "Mist",
      haze: "Haze",
      thunderstorm: "Thunderstorm",
      tornado: "Tornado",
      hurricane: "Hurricane",
      windy: "Windy",
      hot: "Hot",
      cold: "Cold",
      freezing: "Freezing",
      "partly-cloudy-day": "Partly Cloudy",
      "partly-cloudy-night": "Partly Cloudy",
      "clear-day": "Clear",
      "clear-night": "Clear",
    },
    // Wind direction translations
    windDirections: [
      "North Wind",
      "Northeast Wind",
      "East Wind",
      "Southeast Wind",
      "South Wind",
      "Southwest Wind",
      "West Wind",
      "Northwest Wind",
    ],
  },
  // Motto
  motto: {
    title: "✨ Life Motto ✨",
    text: "Stay curious, always on the road",
    subtitle: "保持好奇心，永远在路上",
  },
  // Quick links
  quickLinks: {
    title: "🌟 Get to Know Me More 🌟",
    links: [
      {
        name: "Website List",
        icon: "🌐",
        url: "/websites",
        description: "My website collection",
      },
      {
        name: "Blog",
        icon: "📝",
        url: "/blog",
        description: "Tech sharing and thoughts",
      },
      {
        name: "Cloud Storage",
        icon: "☁️",
        url: "/cloud",
        description: "File storage service",
      },
      {
        name: "Music",
        icon: "🎵",
        url: "/music",
        description: "My music playlist",
      },
      {
        name: "Start Page",
        icon: "🏠",
        url: "/start",
        description: "Browser start page",
      },
      {
        name: "Bookmarks",
        icon: "⭐",
        url: "/collection",
        description: "Curated content collection",
      },
      {
        name: "Trending Today",
        icon: "🔥",
        url: "/trending",
        description: "Popular content recommendations",
      },
    ],
  },
  // Social media
  social: {
    title: "🤝 Contact Me",
    links: [
      {
        name: "GitHub",
        icon: "FaGithub",
        url: "https://github.com/umisty",
        description: "Code repositories and projects",
      },
      {
        name: "Steam",
        icon: "FaSteam",
        url: "https://steamcommunity.com/id/umisty",
        description: "Gaming profile",
      },
      {
        name: "Email",
        icon: "MdEmail",
        url: "mailto:your.email@example.com",
        description: "Contact email",
      },
      {
        name: "Twitter",
        icon: "FaTwitter",
        url: "https://twitter.com/umisty",
        description: "Twitter updates",
      },
      {
        name: "LinkedIn",
        icon: "FaLinkedin",
        url: "https://linkedin.com/in/umisty",
        description: "Professional network",
      },
      {
        name: "YouTube",
        icon: "FaYoutube",
        url: "https://youtube.com/@umisty",
        description: "Video channel",
      },
    ],
  },
  // Personal introduction
  introduction: {
    greeting: "👋 Hello, I'm CodeExplorer",
    role: "Full-Stack Developer",
    bio: "I am a passionate full-stack developer with years of web development experience. I focus on creating elegant and efficient code solutions, from frontend user interfaces to backend system architecture.\n\nI love exploring new technologies and maintaining a passion for learning. I believe code is not just a tool for solving problems, but also a form of artistic expression. I pursue perfect user experience in work and simplicity and elegance in code.",
    tags: [
      {
        name: "Full-Stack",
        icon: "💻",
        color: "#3B82F6",
      },
      {
        name: "Tech Exploration",
        icon: "🔍",
        color: "#10B981",
      },
      {
        name: "Open Source",
        icon: "🌟",
        color: "#F59E0B",
      },
      {
        name: "Code Artistry",
        icon: "🎨",
        color: "#8B5CF6",
      },
      {
        name: "Learning Passion",
        icon: "📚",
        color: "#EF4444",
      },
    ],
  },
  // Language switch
  language: {
    switch: "Switch Language",
  },
  // Loading screen
  loading: {
    brandName: "UnclearPath",
    welcome: "Welcome to my personal homepage",
    status: {
      initializing: "Initializing...",
      loadingResources: "Loading resources...",
      preparingInterface: "Preparing interface...",
      completed: "Loading completed...",
    },
  },
};
