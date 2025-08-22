# UnclearPath ✨

> 一个优雅的个人主页，展示你的数字名片

[![Next.js](https://img.shields.io/badge/Next.js-15.5.0-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

## 📸 项目预览

![UnclearPath 主页预览](docs/screenshot.png)

*展示了动态渐变背景、实时天气、时钟显示、多语言切换等核心功能*

## 🌟 项目背景

一直想要一个类似名片页之类的个人网站首页，但迟迟没有开始动手。

偶然在互联网上发现了 [imsyy](https://github.com/imsyy) 的 [home](https://github.com/imsyy/home) 项目，被其简洁优雅的风格深深吸引。于是决定借鉴这种设计理念，打造属于自己的个人主页。

最近也在探索如何更好地进行面向AI编程，这个项目就是我使用AI辅助开发完成的实践成果。通过与AI的协作，不仅提高了开发效率，也让我对现代前端技术栈有了更深入的理解。

后续如果发现有趣的小功能模块，也会持续更新到这个项目中。如果你有任何创意想法，欢迎提交PR一起完善这个项目！

**特别感谢** [imsyy](https://github.com/imsyy) 提供的设计灵感和创意启发。

## ✨ 功能特性

### 🎨 界面设计
- **动态渐变背景** - 基于色彩理论的和谐色彩组合
- **流体动画效果** - 平滑的装饰元素动画
- **响应式布局** - 完美适配桌面端和移动端
- **玻璃态设计** - 现代化的毛玻璃效果

### 🌤️ 实时天气
- **地理位置自动获取** - 基于用户当前位置显示天气
- **多语言天气信息** - 支持中英文天气状况显示
- **智能加载状态** - 优雅的加载动画和错误处理
- **风向风力显示** - 详细的气象信息展示
- **API集成** - 支持OpenWeatherMap真实天气数据
- **离线降级** - API不可用时自动使用Mock数据

### 🕐 动态时钟
- **实时时间显示** - 精确到秒的时间更新
- **多语言日期格式** - 根据语言自适应日期格式
- **星期显示** - 完整的日期信息展示

### 🌍 多语言支持
- **三语言切换** - 简体中文、繁体中文、English
- **智能语言检测** - 自动识别浏览器语言偏好
- **本地化存储** - 记住用户的语言选择
- **完整翻译体系** - 从界面到天气信息的全面本地化

> **关于多语言模块**：其实这类个人主页项目通常不需要多语言支持，但我就是想看看AI能够做到什么程度，所以特意加入了完整的多语言系统。结果证明，AI在这方面的表现确实超出了我的预期！

### 📱 社交链接
- **丰富的社交平台支持** - GitHub、Steam、Twitter、Telegram、Discord等
- **悬停动画效果** - 精美的交互反馈
- **可配置链接** - 轻松自定义你的社交媒体链接

### 🔗 快捷导航
- **个人项目展示** - 网站、博客、云盘等快捷入口
- **收藏夹功能** - 常用工具和资源链接
- **热门内容** - 推荐内容快速访问

## 🚀 快速开始

### 环境要求
- Node.js 18+ 
- pnpm 8+ (推荐) 或 npm/yarn

### 安装与运行

```bash
# 克隆项目
git clone https://github.com/uMisty/UnclearPath.git
cd UnclearPath

# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建项目
pnpm build

# 启动生产环境
pnpm start
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果。

## ⚙️ 配置说明

### 🌤️ 天气API配置

项目使用 Visual Crossing Weather API 获取实时天气数据。虽然项目内置了Mock数据作为备用，但为了获得最佳体验，建议申请API密钥。

#### 申请 Visual Crossing Weather API Key

1. **注册账户**
   - 访问 [Visual Crossing Weather](https://www.visualcrossing.com/weather-api)
   - 点击 "Sign Up" 创建免费账户
   - 填写邮箱、用户名、密码等信息

2. **获取API Key**
   - 登录后进入 [Account页面](https://www.visualcrossing.com/account)
   - 在 "Your API Key" 部分可以看到您的API密钥
   - 复制API Key (格式类似: `ABCDEFGHIJKLMNOPQRSTUVWXYZ123456`)

3. **API限制说明**
   - **免费账户**: 每天1000次调用
   - **激活时间**: 新申请的API Key立即生效
   - **支持功能**: 当前天气、历史天气、天气预报、气候数据等
   - **数据质量**: 提供高精度的全球天气数据

4. **配置到项目**
   ```bash
   # 在项目根目录创建 .env.local 文件
   echo "VISUAL_CROSSING_API_KEY=your_api_key_here" > .env.local
   ```

> **💡 提示**: 如果不配置API Key，项目会使用内置的Mock数据，显示深圳的模拟天气信息。

### 环境变量

创建 `.env.local` 文件：

```env
# 天气API密钥 (推荐配置以获得真实天气数据)
VISUAL_CROSSING_API_KEY=your_visual_crossing_api_key
```

### 个人信息配置

#### 站点标题和个人信息

在 `src/i18n/translations.ts` 中配置站点和个人信息：

```typescript
// 站点配置 - 会自动生成 "[页面名称] - [站点名称]" 格式的标题
site: {
  title: '个人主页',      // 页面名称
  name: 'uMisty',        // 站点名称 
  description: '一个优雅的个人主页，展示你的数字名片',
},

// 个人简介 - 支持多行文本，使用 \n 换行
motto: {
  title: '✨ 人生座右铭 ✨',
  text: '我是一名热爱编程的开发者\n专注于创建优雅的用户体验\n永远保持学习的好奇心\n在技术的道路上不断前行',
  subtitle: 'Stay curious, always on the road',
},

// 个人介绍 - 支持多行文本，使用 \n\n 创建段落分隔
introduction: {
  greeting: '👋 你好，我是 CodeExplorer',
  role: '全栈开发者',
  bio: '我是一名热爱编程的全栈开发者，拥有多年的Web开发经验。专注于创建优雅、高效的代码解决方案。\n\n喜欢探索新技术，保持学习的热情。相信代码不仅仅是解决问题的工具，更是一种艺术表达。',
  // ... 其他配置
},
```

#### 其他内容自定义

在 `src/i18n/translations.ts` 中修改个人信息：

```typescript
// 修改座右铭
motto: {
  title: '✨ 你的座右铭标题 ✨',
  text: '"在这里写下你的人生格言"',
  subtitle: 'Your motto subtitle',
},

// 修改快捷链接
quickLinks: {
  websites: '你的网站',
  blog: '你的博客',
  // ... 其他链接
}
```

在 `src/app/page.tsx` 中修改社交链接：

```typescript
const socialLinks = [
  { icon: FaGithub, href: 'https://github.com/yourusername', label: 'GitHub' },
  { icon: MdEmail, href: 'mailto:your@email.com', label: 'Email' },
  // ... 添加你的社交链接
];
```

### 多语言配置

#### 支持的语言
- **简体中文 (zh)** - 默认语言
- **繁体中文 (zh-TW)** - 港澳台地区
- **英语 (en)** - 国际化支持

#### 语言切换逻辑
1. **自动检测** - 根据浏览器语言自动选择
2. **手动切换** - 右上角语言切换器
3. **持久化** - 使用localStorage记住用户选择

#### 添加新语言
1. 在 `src/i18n/translations.ts` 中添加新语言对象
2. 在 `src/i18n/LanguageSwitch.tsx` 中添加语言选项
3. 在 `src/app/api/weather/route.ts` 中添加天气API语言映射

## 🛠️ 技术栈

- **框架**: Next.js 15.5.0 (App Router)
- **语言**: TypeScript 5.7.2
- **样式**: Tailwind CSS 3.4.1
- **图标**: React Icons
- **部署**: Vercel / Netlify / 自托管

## 📦 项目结构

```
UnclearPath/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/weather/     # 天气API路由
│   │   ├── globals.css      # 全局样式
│   │   ├── layout.tsx       # 根布局
│   │   └── page.tsx         # 主页面
│   └── i18n/               # 国际化
│       ├── LanguageContext.tsx
│       ├── LanguageSwitch.tsx
│       └── translations.ts
├── public/                 # 静态资源
├── package.json
└── README.md
```

## 🎯 部署指南

### 🔑 部署前准备

1. **申请天气API Key** (推荐)
   - 按照上述说明申请OpenWeatherMap API Key
   - 配置环境变量以获得真实天气数据

2. **自定义个人信息**
   - 修改座右铭、社交链接等个人信息
   - 更新快捷导航链接

### Vercel 部署 (推荐)
1. Fork 本项目到你的 GitHub
2. 在 [Vercel](https://vercel.com) 中导入项目
3. 配置环境变量:
   ```
   VISUAL_CROSSING_API_KEY=your_visual_crossing_api_key
   ```
4. 部署完成！

### Netlify 部署
1. 在 [Netlify](https://netlify.com) 中连接你的 GitHub 仓库
2. 设置构建命令: `pnpm build`
3. 设置发布目录: `.next`
4. 部署完成！

### 自托管部署
```bash
# 构建项目
pnpm build

# 使用 PM2 运行 (推荐)
pm2 start npm --name "unclearpath" -- start

# 或使用 Docker
docker build -t unclearpath .
docker run -p 3000:3000 unclearpath
```

## ❓ 常见问题

### 天气功能相关

**Q: 天气信息显示不准确或显示默认信息怎么办？**
A: 
1. 检查是否已配置 `VISUAL_CROSSING_API_KEY` 环境变量
2. 确认API Key是否有效（Visual Crossing的Key立即生效）
3. 检查浏览器是否允许地理位置访问
4. 如果仍有问题，项目会自动使用Mock数据作为降级方案

**Q: 支持哪些地区的天气？**
A: Visual Crossing Weather API支持全球范围的高精度天气数据，包括中国大陆、港澳台、海外等地区。

**Q: 天气API有调用限制吗？**
A: 免费账户每天最多1000次调用，对于个人主页来说完全够用。项目已做了缓存优化。

### 多语言相关

**Q: 如何添加新的语言支持？**
A: 参考配置说明中的"添加新语言"部分，需要修改translations.ts等文件。

**Q: 为什么要做多语言支持？**
A: 这主要是技术探索和AI协作的实验，想看看AI能做到什么程度。结果超出预期！

## 🤝 贡献指南

欢迎提交 Issues 和 Pull Requests！

1. Fork 本项目
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📄 开源协议

本项目采用 [MIT](LICENSE) 协议开源。

## 🙏 致谢

- [imsyy](https://github.com/imsyy) - 提供设计灵感
- [Next.js](https://nextjs.org/) - 强大的React框架
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的CSS框架
- [Visual Crossing Weather](https://www.visualcrossing.com/) - 天气数据API

---

**Copyright © 2025 uMisty. Powered by [UnclearPath](https://github.com/uMisty/UnclearPath), made by [uMisty](https://umisty.com)**
