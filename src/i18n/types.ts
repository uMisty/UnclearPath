// 国际化类型定义

export interface LinkItem {
  name: string;
  icon: string;
  url: string;
  description: string;
}

export interface TagItem {
  name: string;
  icon: string;
  color: string;
}

export interface QuickLinksSection {
  title: string;
  links: LinkItem[];
}

export interface SocialSection {
  title: string;
  links: LinkItem[];
}

export interface IntroductionSection {
  greeting: string;
  role: string;
  bio: string;
  tags: TagItem[];
}

export interface WeatherConditions {
  clear: string;
  sunny: string;
  cloudy: string;
  overcast: string;
  rain: string;
  drizzle: string;
  showers: string;
  snow: string;
  sleet: string;
  fog: string;
  mist: string;
  haze: string;
  thunderstorm: string;
  tornado: string;
  hurricane: string;
  windy: string;
  hot: string;
  cold: string;
  freezing: string;
  "partly-cloudy-day": string;
  "partly-cloudy-night": string;
  "clear-day": string;
  "clear-night": string;
}

export interface WeatherErrors {
  fetchFailed: string;
  timeout: string;
  notFound: string;
  serverError: string;
}

export interface WeatherSection {
  location: string;
  temperature: string;
  condition: string;
  wind: string;
  level: string;
  format: string;
  defaultLocation: string;
  defaultCondition: string;
  defaultWind: string;
  errors: WeatherErrors;
  conditions: WeatherConditions;
  windDirections: string[];
}

export interface ClockSection {
  today: string;
  currentTime: string;
  loading: string;
  locating: string;
  reloading: string;
  weekdays: string[];
  dateFormat: string;
}

export interface SiteSection {
  title: string;
  name: string;
  description: string;
}

export interface MottoSection {
  title: string;
  text: string;
  subtitle: string;
}

export interface LanguageSection {
  switch: string;
}

export interface Translations {
  site: SiteSection;
  clock: ClockSection;
  weather: WeatherSection;
  motto: MottoSection;
  quickLinks: QuickLinksSection;
  social: SocialSection;
  introduction: IntroductionSection;
  language: LanguageSection;
}