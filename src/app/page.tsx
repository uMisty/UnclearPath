'use client';

import { useState, useEffect } from 'react';
import { FaGithub, FaSteam, FaTwitter, FaTelegram, FaDiscord } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { LanguageProvider, useLanguage } from '../i18n/LanguageContext';
import { LanguageSwitch } from '../i18n/LanguageSwitch';

// 随机渐变背景生成器
function useRandomGradient() {
  const [gradientStyle, setGradientStyle] = useState('');
  const [decorativeColors, setDecorativeColors] = useState({
    color1: 'bg-white/10',
    color2: 'bg-blue-300/20', 
    color3: 'bg-pink-300/20'
  });

  useEffect(() => {
    // 和谐色彩组合预设 - 基于色彩理论
    const harmonicColorSets = [
      // 暖色调组合
      {
        gradient: 'from-orange-400 via-red-400 to-pink-500',
        decorative: ['bg-yellow-300/20', 'bg-red-300/20', 'bg-pink-300/20']
      },
      // 冷色调组合
      {
        gradient: 'from-blue-400 via-purple-400 to-indigo-500',
        decorative: ['bg-cyan-300/20', 'bg-blue-300/20', 'bg-purple-300/20']
      },
      // 自然色调组合
      {
        gradient: 'from-green-400 via-teal-400 to-blue-500',
        decorative: ['bg-emerald-300/20', 'bg-teal-300/20', 'bg-blue-300/20']
      },
      // 日落色调组合
      {
        gradient: 'from-yellow-400 via-orange-400 to-red-500',
        decorative: ['bg-yellow-300/20', 'bg-orange-300/20', 'bg-red-300/20']
      },
      // 薰衣草色调组合
      {
        gradient: 'from-purple-400 via-pink-400 to-indigo-500',
        decorative: ['bg-purple-300/20', 'bg-pink-300/20', 'bg-indigo-300/20']
      },
      // 海洋色调组合
      {
        gradient: 'from-cyan-400 via-blue-400 to-indigo-600',
        decorative: ['bg-cyan-300/20', 'bg-blue-300/20', 'bg-indigo-300/20']
      },
      // 森林色调组合
      {
        gradient: 'from-emerald-400 via-green-400 to-teal-500',
        decorative: ['bg-emerald-300/20', 'bg-green-300/20', 'bg-teal-300/20']
      },
      // 梦幻色调组合
      {
        gradient: 'from-pink-400 via-purple-400 to-blue-500',
        decorative: ['bg-pink-300/20', 'bg-purple-300/20', 'bg-blue-300/20']
      }
    ];

    // 随机选择一个和谐色彩组合
    const randomSet = harmonicColorSets[Math.floor(Math.random() * harmonicColorSets.length)];
    
    setGradientStyle(randomSet.gradient);
    setDecorativeColors({
      color1: randomSet.decorative[0],
      color2: randomSet.decorative[1],
      color3: randomSet.decorative[2]
    });
  }, []);

  return { gradientStyle, decorativeColors };
}

// 时钟组件
function Clock() {
  const { t, language, formatWeather, formatDate } = useLanguage();
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState<{
    location: string;
    temperature: number;
    condition: string;
    windDirection: string;
    windSpeed: number;
  } | null>(null);
  const [coordinates, setCoordinates] = useState<{lat: number, lon: number} | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(language);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 监听语言变化，触发天气重新加载
  useEffect(() => {
    if (currentLanguage !== language) {
      // 语言切换时，清除当前天气数据并显示加载状态
      setWeather(null);
      setIsLoadingWeather(true);
      setCurrentLanguage(language);
    }
  }, [language, currentLanguage]);

  useEffect(() => {
    // 获取用户地理位置
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCoordinates({ lat: latitude, lon: longitude });
            console.log('User location:', latitude, longitude);
          },
          (error) => {
            console.warn('Geolocation error:', error.message);
            // 获取位置失败，使用深圳的坐标作为默认值
            setCoordinates({ lat: 22.5431, lon: 114.0579 });
          },
          {
            timeout: 10000,
            maximumAge: 600000, // 10分钟内的缓存位置有效
            enableHighAccuracy: false // 不要求高精度，提高获取速度
          }
        );
      } else {
        console.warn('Geolocation is not supported by this browser');
        // 浏览器不支持地理位置，使用深圳坐标
        setCoordinates({ lat: 22.5431, lon: 114.0579 });
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    // 当有坐标时获取天气数据
    const fetchWeather = async () => {
      if (!coordinates) return;

      // 开始加载
      setIsLoadingWeather(true);

      try {
        const response = await fetch(`/api/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&lang=${language}`);
        if (response.ok) {
          const weatherData = await response.json();
          setWeather({
            location: weatherData.location, // 直接使用API返回的位置名称
            temperature: weatherData.temperature,
            condition: weatherData.condition,
            windDirection: weatherData.windDirection,
            windSpeed: Math.round(weatherData.windSpeed),
          });
        }
      } catch (error) {
        console.error('Failed to fetch weather:', error);
        // 如果API失败，显示默认天气信息
        setWeather({
          location: t('weather.defaultLocation'),
          temperature: 25,
          condition: t('weather.defaultCondition'),
          windDirection: t('weather.defaultWind'),
          windSpeed: 3,
        });
      } finally {
        // 无论成功还是失败，都结束加载状态
        setIsLoadingWeather(false);
      }
    };

    if (coordinates) {
      fetchWeather();
    }
  }, [coordinates, language]); // 添加language作为依赖，语言变化时重新获取天气

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="text-right text-white">
      <div className="text-sm opacity-80 mb-1">{formatDate(time)}</div>
      <div className="text-4xl md:text-5xl font-mono font-bold tracking-wider mb-2">
        {formatTime(time)}
      </div>
      <div className="text-sm opacity-80">
        {isLoadingWeather ? (
          // 显示加载状态 - 右对齐
          <div className="flex items-center justify-end gap-2">
            <div className="animate-spin rounded-full h-3 w-3 border border-white border-t-transparent"></div>
            <span>{t('clock.loading')}</span>
          </div>
        ) : weather ? (
          // 显示天气信息
          formatWeather(weather)
        ) : (
          // 显示定位状态
          coordinates ? t('clock.loading') : t('clock.locating')
        )}
      </div>
    </div>
  );
}

// 座右铭组件
function Motto() {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 shadow-lg hover-glow">
      <div className="text-white/90 text-lg font-medium mb-2">
        {t('motto.title')}
      </div>
      <div className="text-white/80 text-base leading-relaxed whitespace-pre-line">
        {t('motto.text')}
      </div>
      <div className="text-white/60 text-sm mt-2">
        {t('motto.subtitle')}
      </div>
    </div>
  );
}

// 快捷链接组件
function QuickLinks() {
  const { t } = useLanguage();
  
  const links = [
    { id: 'websites', name: t('quickLinks.websites'), icon: '🔗', href: '#' },
    { id: 'blog', name: t('quickLinks.blog'), icon: '📝', href: '#' },
    { id: 'cloud', name: t('quickLinks.cloud'), icon: '☁️', href: '#' },
    { id: 'music', name: t('quickLinks.music'), icon: '🎵', href: '#' },
    { id: 'start', name: t('quickLinks.start'), icon: '🚀', href: '#' },
    { id: 'collection', name: t('quickLinks.collection'), icon: '📚', href: '#' },
    { id: 'trending', name: t('quickLinks.trending'), icon: '🔥', href: '#' }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-white text-lg font-semibold mb-4">
          {t('quickLinks.title')}
        </h3>
      </div>
      <div className="flex flex-wrap gap-3 w-full justify-start">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.href}
            className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-white hover:bg-white/25 transition-all duration-300 flex items-center gap-2 group border border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-white/10 flex-1 min-w-fit justify-center hover:scale-105"
          >
            <span className="text-lg">{link.icon}</span>
            <span className="font-medium text-sm whitespace-nowrap">
              {link.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

// 社交媒体链接组件
function SocialLinks() {
  const { t } = useLanguage();
  
  const socials = [
    { id: 'github', name: t('social.github'), icon: FaGithub, href: '#' },
    { id: 'steam', name: t('social.steam'), icon: FaSteam, href: '#' },
    { id: 'email', name: t('social.email'), icon: MdEmail, href: '#' },
    { id: 'twitter', name: t('social.twitter'), icon: FaTwitter, href: '#' },
    { id: 'telegram', name: t('social.telegram'), icon: FaTelegram, href: '#' },
    { id: 'discord', name: t('social.discord'), icon: FaDiscord, href: '#' }
  ];

  return (
    <div className="flex items-center justify-center gap-3">
      {socials.map((social) => {
        const IconComponent = social.icon;
        return (
          <a
            key={social.id}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-white/20 hover:border-white/40 hover:shadow-lg hover:shadow-white/10"
            title={social.name}
          >
            <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            
            {/* 悬浮提示 */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
              {social.name}
            </div>
          </a>
        );
      })}
    </div>
  );
}

// 个人介绍组件
function Introduction() {
  const { t } = useLanguage();
  
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 text-white border border-white/10">
      {/* 头像和基本信息 */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-2 border-white/20 flex items-center justify-center text-xl font-bold">
            CE
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white/20 flex items-center justify-center">
            <span className="text-xs">✨</span>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-1">{t('introduction.greeting')}</h2>
          <p className="text-sm opacity-80">{t('introduction.role')}</p>
        </div>
      </div>

      {/* 个人简介 */}
      <div className="space-y-4 mb-4">
        <p className="text-sm opacity-90 leading-relaxed whitespace-pre-line">
          {t('introduction.bio')}
        </p>

        <div className="flex items-center gap-2 pt-2">
          <span className="text-purple-400">🔗</span>
          <span className="text-sm">
            {t('introduction.linkText')} 
            <span className="text-blue-300 hover:text-blue-200 underline underline-offset-2 mx-1 cursor-pointer">
              {t('introduction.github')}
            </span>
          </span>
        </div>
      </div>

      {/* 底部标签 */}
      <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10">
        <span className="px-2 py-1 text-xs bg-white/10 rounded-full">{t('introduction.tags.fullstack')}</span>
        <span className="px-2 py-1 text-xs bg-white/10 rounded-full">{t('introduction.tags.exploration')}</span>
        <span className="px-2 py-1 text-xs bg-white/10 rounded-full">{t('introduction.tags.opensource')}</span>
      </div>
    </div>
  );
}

// 主页内容组件
function HomePage() {
  const { gradientStyle, decorativeColors } = useRandomGradient();
  const { getPageTitle } = useLanguage();

  // 动态更新页面标题
  useEffect(() => {
    const title = getPageTitle();
    document.title = title;
  }, [getPageTitle]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientStyle}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
      
      <div className="absolute inset-0 opacity-30">
        <div className={`absolute top-20 left-10 w-32 h-32 ${decorativeColors.color1} rounded-full blur-xl animate-pulse`}></div>
        <div className={`absolute top-40 right-20 w-48 h-48 ${decorativeColors.color2} rounded-full blur-2xl animate-pulse animate-delay-1`}></div>
        <div className={`absolute bottom-20 left-1/3 w-40 h-40 ${decorativeColors.color3} rounded-full blur-xl animate-pulse animate-delay-2`}></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col p-6 md:p-8">
        <div className="flex justify-between items-start mb-8">
          {/* 左上角语言切换器 */}
          <div className="animate-fadeInUp">
            <LanguageSwitch />
          </div>
          {/* 右上角时钟 */}
          <div className="animate-fadeInUp-delay">
            <Clock />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center py-8">
          <div className="grid lg:grid-cols-2 gap-6 items-start max-w-5xl w-full mx-auto">
            {/* 左侧：个人介绍 */}
            <div className="flex justify-center">
              <div className="space-y-6 animate-fadeInUp-delay">
                <div className="hover-lift">
                  <Introduction />
                </div>
              </div>
            </div>

            {/* 右侧：座右铭和快捷链接 */}
            <div className="flex justify-center">
              <div className="space-y-6 w-full max-w-lg">
                <div className="animate-fadeInUp">
                  <Motto />
                </div>
                <div className="animate-fadeInUp-delay-2">
                  <QuickLinks />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部社交媒体和版权 */}
        <div className="mt-8 space-y-6">
          <div className="animate-fadeInUp-delay-2">
            <SocialLinks />
          </div>
          <div className="text-center text-white/60 text-xs md:text-sm">
            Copyright © 2025 uMisty. Powered by{' '}
            <a 
              href="https://github.com/uMisty/UnclearPath" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors underline decoration-white/40 hover:decoration-white"
            >
              UnclearPath
            </a>
            . Made by{' '}
            <a 
              href="https://umisty.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors underline decoration-white/40 hover:decoration-white"
            >
              uMisty
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <HomePage />
    </LanguageProvider>
  );
}