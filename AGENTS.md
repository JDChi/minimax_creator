<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# MiniMax Creator Project

## Project Overview
- **Purpose**: A web application for generating images, videos, and music using MiniMax APIs
- **Stack**: Next.js 16 + React 19 + TypeScript + Tailwind CSS 4
- **Features**: Text-to-image, Text-to-video, Text-to-music generation

## Project Structure
```
src/
├── app/
│   ├── page.tsx              # Home page with all generation forms
│   ├── settings/page.tsx      # API key configuration page
│   └── api/minimax/
│       ├── image/route.ts     # Image generation API proxy
│       ├── video/route.ts     # Video generation API proxy
│       ├── video/status/      # Video status query
│       └── music/route.ts     # Music generation API proxy
├── components/
│   ├── ImageGen/             # Image generation form component
│   ├── VideoGen/             # Video generation form component
│   ├── MusicGen/             # Music generation form component
│   └── Settings/             # Settings form component
├── lib/
│   └── client.ts             # Client-side API wrapper
└── types/
    └── minimax.ts            # TypeScript type definitions
```

## Key Conventions
- API Key stored in localStorage (not .env)
- Base URL: `https://api.minimaxi.com` (note: minimax**i**.com)
- All API routes use custom headers `x-minimax-api-key` and `x-minimax-base-url`
- Video generation is async - requires polling task status

## MiniMax API Endpoints
- Image: `POST /v1/image_generation`
- Video: `POST /v1/video_generation`
- Video Status: `GET /v1/video_generation/retrieve?task_id={id}`
- Music: `POST /v1/music_generation`

## Commands
- `npm run dev` - Start development server
- `npm run test:run` - Run tests once
- `npm run test` - Run tests in watch mode

## 查询 MiniMax API 文档流程

当需要查看 MiniMax API 文档时，按以下步骤：

1. **访问文档页面** - 用 `web_fetch` 访问 `https://platform.minimaxi.com/docs/guides/models-intro`
2. **查找索引链接** - 页面顶部有 "Documentation Index" 部分，包含 `llms.txt` 链接
3. **抓取全站索引** - 访问 `https://platform.minimaxi.com/docs/llms.txt` 获取完整文档索引
4. **搜索关键词** - 在索引中搜索 "语音"、"音色"、"视频" 等关键词
5. **抓取具体页面** - 根据索引中的链接抓取目标页面

**llms.txt 协议**：这是现代文档网站给 AI 助手指路的索引文件，方便快速掌握整站地图。

**可用工具：**
- `WebFetch` / `mcp__ddg-search__fetch_content` - 获取页面内容
- `WebSearch` / `mcp__MiniMax__web_search` - 搜索

**参考实现** - MiniMax-MCP 仓库: https://github.com/MiniMax-Software/MiniMax-MCP
