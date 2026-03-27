# MiniMax Creator

<p align="center">
  <img src="./screenshot.png" alt="MiniMax Creator" />
</p>

> 一款优雅的 AI 创作工具，让创意触手可及

📖 [English Version](./README_EN.md)

✨ **MiniMax Creator** 是一款基于 MiniMax API 的智能创作平台，支持文生图、文生视频、音乐生成三大核心功能。简洁现代的界面，让你专注于创作本身。

## 功能特点

### 🎨 文生图 (Text to Image)
- 支持多种画幅比例：1:1、16:9、4:3、9:16 等
- 单次可生成 1-9 张图片
- 智能 Prompt 优化
- 24 小时有效期图片链接

### 🎬 文生视频 (Text to Video)
- 支持多种分辨率：720P、768P、1080P
- 灵活时长选择：6秒或10秒
- 运镜指令支持：`[推进]`、`[拉远]`、`[左摇]` 等 15 种运镜
- 实时任务状态追踪

### 🎵 生音乐 (Text to Music)
- 支持纯音乐与人声创作
- 专业歌词结构标签：`[Verse]`、`[Chorus]`、`[Bridge]`
- 多种音频格式输出
- AI 智能歌词生成

## 技术栈

- **框架**: Next.js 16 + React 19
- **语言**: TypeScript
- **样式**: Tailwind CSS 4
- **API**: MiniMax Open Platform

## 快速开始

### 环境要求
- Node.js 18+
- MiniMax API Key

### 安装

```bash
# 克隆项目
git clone https://github.com/JDChi/minimax_creator.git
cd minimax_creator

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 即可使用。

### 配置

首次使用需要配置 API Key：

1. 点击右上角「设置」
2. 填入你的 MiniMax API Key
3. Base URL 通常不需要修改（默认为 `https://api.minimaxi.com`）
4. 点击「保存配置」

## 项目结构

```
src/
├── app/
│   ├── page.tsx              # 首页
│   ├── settings/page.tsx    # 设置页面
│   └── api/minimax/         # API 代理
│       ├── image/            # 文生图
│       ├── video/            # 文生视频
│       └── music/            # 生音乐
├── components/               # UI 组件
├── lib/                     # 工具函数
└── types/                   # 类型定义
```

## 开发命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run test` | 运行测试（watch 模式） |
| `npm run test:run` | 运行测试（单次） |

## 致谢

- [MiniMax](https://platform.minimaxi.com) - 提供强大的 AI 生成能力
- [Next.js](https://nextjs.org) - 现代化的 React 框架
- [Tailwind CSS](https://tailwindcss.com) - 高效的 CSS 框架

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/JDChi">JDChi</a>
</p>
