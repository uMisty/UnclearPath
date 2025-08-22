// 天气数据缓存管理器

// 定义天气数据类型
export interface WeatherData {
  location: string;
  originalAddress: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  visibility: number;
  uvIndex: number;
  icon: string;
  description: string;
  tempMax: number;
  tempMin: number;
  coordinates: { lat: number; lon: number };
}

// 定义地理编码数据类型
export interface LocationData {
  cityName: string; // 用于天气API查询的城市名
  displayName: string; // 用于显示的本地化城市名
  coordinates: { lat: number; lon: number };
}

interface WeatherCacheItem {
  data: WeatherData;
  timestamp: number;
  expiresAt: number;
}

interface LocationCacheItem {
  data: LocationData;
  timestamp: number;
  expiresAt: number;
}

class WeatherCache {
  private cache = new Map<string, WeatherCacheItem>();
  private locationCache = new Map<string, LocationCacheItem>();
  private readonly CACHE_DURATION = 2 * 60 * 60 * 1000; // 2小时（毫秒）
  private readonly LOCATION_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24小时（毫秒）- 位置信息变化较少

  /**
   * 生成缓存键 - 支持坐标或城市名
   */
  private generateKey(identifier: string, language: string): string {
    // 标准化城市名作为缓存键
    const normalizedId = identifier.toLowerCase().replace(/[^a-z0-9]/g, "_");
    return `weather_${normalizedId}_${language}`;
  }

  /**
   * 生成位置缓存键
   */
  private generateLocationKey(
    lat: string,
    lon: string,
    language: string,
  ): string {
    // 将坐标四舍五入到3位小数，减少缓存碎片
    const roundedLat = parseFloat(lat).toFixed(3);
    const roundedLon = parseFloat(lon).toFixed(3);
    return `location_${roundedLat}_${roundedLon}_${language}`;
  }

  /**
   * 获取缓存数据 - 支持坐标或城市名
   */
  get(identifier: string, language: string): WeatherData | null {
    const key = this.generateKey(identifier, language);
    const item = this.cache.get(key);

    if (!item) {
      return null;
    }

    // 检查是否过期
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  /**
   * 设置缓存数据 - 支持坐标或城市名
   */
  set(identifier: string, language: string, data: WeatherData): void {
    const key = this.generateKey(identifier, language);
    const now = Date.now();

    const item: WeatherCacheItem = {
      data,
      timestamp: now,
      expiresAt: now + this.CACHE_DURATION,
    };

    this.cache.set(key, item);
  }

  /**
   * 获取位置信息缓存
   */
  getLocation(lat: string, lon: string, language: string): LocationData | null {
    const key = this.generateLocationKey(lat, lon, language);
    const item = this.locationCache.get(key);

    if (!item) {
      return null;
    }

    // 检查是否过期
    if (Date.now() > item.expiresAt) {
      this.locationCache.delete(key);
      return null;
    }

    return item.data;
  }

  /**
   * 设置位置信息缓存
   */
  setLocation(
    lat: string,
    lon: string,
    language: string,
    data: LocationData,
  ): void {
    const key = this.generateLocationKey(lat, lon, language);
    const now = Date.now();

    const item: LocationCacheItem = {
      data,
      timestamp: now,
      expiresAt: now + this.LOCATION_CACHE_DURATION,
    };

    this.locationCache.set(key, item);
  }

  /**
   * 清理过期缓存
   */
  cleanup(): void {
    const now = Date.now();
    let cleanedCount = 0;
    let locationCleanedCount = 0;

    // 清理天气缓存
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiresAt) {
        this.cache.delete(key);
        cleanedCount++;
      }
    }

    // 清理位置缓存
    for (const [key, item] of this.locationCache.entries()) {
      if (now > item.expiresAt) {
        this.locationCache.delete(key);
        locationCleanedCount++;
      }
    }

    if (cleanedCount > 0 || locationCleanedCount > 0) {
      console.log(
        `Cleaned up ${cleanedCount} weather cache entries and ${locationCleanedCount} location cache entries`,
      );
    }
  }

  /**
   * 获取缓存统计信息
   */
  getStats(): {
    weatherSize: number;
    locationSize: number;
    weatherKeys: string[];
    locationKeys: string[];
  } {
    return {
      weatherSize: this.cache.size,
      locationSize: this.locationCache.size,
      weatherKeys: Array.from(this.cache.keys()),
      locationKeys: Array.from(this.locationCache.keys()),
    };
  }

  /**
   * 清空所有缓存
   */
  clear(): void {
    this.cache.clear();
    this.locationCache.clear();
  }
}

// 扩展 globalThis 类型
declare global {
  var __weatherCache: WeatherCache | undefined;
}

// 创建全局缓存实例
let globalCache: WeatherCache;

if (typeof globalThis !== "undefined") {
  // 确保在全局范围内只有一个缓存实例
  if (!globalThis.__weatherCache) {
    globalThis.__weatherCache = new WeatherCache();

    // 定期清理过期缓存（每30分钟执行一次）
    setInterval(
      () => {
        globalThis.__weatherCache?.cleanup();
      },
      30 * 60 * 1000,
    );
  }
  globalCache = globalThis.__weatherCache;
} else {
  globalCache = new WeatherCache();
}

export const weatherCache = globalCache;
