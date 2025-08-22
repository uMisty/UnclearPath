# 国际化 (i18n) 文件结构

## 文件组织

```
src/i18n/
├── locales/           # 各语言翻译文件
│   ├── zh.ts         # 简体中文
│   ├── zh-TW.ts      # 繁体中文
│   └── en.ts         # 英文
├── translations.ts    # 翻译入口文件
├── LanguageContext.tsx # 语言上下文
└── LanguageSwitch.tsx  # 语言切换组件
```

## 使用方式

### 添加新的翻译项
1. 在 `locales/zh.ts` 中添加简体中文翻译
2. 在 `locales/zh-TW.ts` 中添加繁体中文翻译  
3. 在 `locales/en.ts` 中添加英文翻译

### 在组件中使用
```tsx
import { useLanguage } from '@/i18n/LanguageContext';

function MyComponent() {
  const { t } = useLanguage();
  
  return <div>{t('section.key')}</div>;
}
```

## 翻译键结构

- `site.*` - 站点相关配置
- `clock.*` - 时钟组件
- `weather.*` - 天气相关
- `motto.*` - 座右铭
- `quickLinks.*` - 快捷链接
- `social.*` - 社交媒体
- `introduction.*` - 个人介绍
- `language.*` - 语言切换

## 特殊说明

- 所有翻译键必须在三个语言文件中保持一致
- 使用 TypeScript 确保类型安全
- 支持模板字符串格式化
