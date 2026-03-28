'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'zh' | 'en';

interface Translations {
  // Header
  title: string;
  subtitle: string;
  settings: string;
  github: string;
  // Generation types
  textToImage: string;
  textToVideo: string;
  textToMusic: string;
  // Footer
  poweredBy: string;
  // Settings page
  apiConfig: string;
  appearance: string;
  theme: string;
  themeLight: string;
  themeDark: string;
  themeSystem: string;
  apiKey: string;
  baseUrl: string;
  saveConfig: string;
  configSaved: string;
  // Security notice
  securityNotice: string;
  securityTip1: string;
  securityTip2: string;
  securityTip3: string;
  getApiKey: string;
  disclaimer: string;
  // Image Gen
  imagePrompt: string;
  imagePromptPlaceholder: string;
  aspectRatio: string;
  imageCount: string;
  generateImage: string;
  generating: string;
  imageUrl: string;
  downloadImage: string;
  copyImageUrl: string;
  copied: string;
  // Video Gen
  videoPrompt: string;
  videoPromptPlaceholder: string;
  resolution: string;
  duration: string;
  cameraMovement: string;
  generateVideo: string;
  generatingVideo: string;
  videoStatus: string;
  videoUrl: string;
  downloadVideo: string;
  // Music Gen
  musicPrompt: string;
  musicPromptPlaceholder: string;
  musicType: string;
  lyrics: string;
  lyricsPlaceholder: string;
  generateMusic: string;
  generatingMusic: string;
  musicUrl: string;
  downloadMusic: string;
  // Common
  error: string;
  noApiKey: string;
  pleaseEnterPrompt: string;
}

const translations: Record<Language, Translations> = {
  zh: {
    // Header
    title: 'MiniMax Creator',
    subtitle: 'AI Generation Platform',
    settings: '设置',
    github: 'GitHub',
    // Generation types
    textToImage: '文生图',
    textToVideo: '文生视频',
    textToMusic: '生音乐',
    // Footer
    poweredBy: 'Powered by MiniMax AI',
    // Settings page
    apiConfig: 'API 配置',
    appearance: '外观',
    theme: '主题',
    themeLight: '浅色',
    themeDark: '深色',
    themeSystem: '跟随系统',
    apiKey: 'API Key',
    baseUrl: 'Base URL',
    saveConfig: '保存配置',
    configSaved: '配置已保存',
    // Security notice
    securityNotice: '安全提示：API Key 存储在浏览器本地',
    securityTip1: '清除浏览器数据会导致 API Key 丢失',
    securityTip2: '在公共电脑上使用请注意安全风险',
    securityTip3: '如有疑虑请定期在 MiniMax 平台检查用量',
    getApiKey: '获取 API Key：',
    disclaimer: '本项目仅供学习研究使用，请勿用于商业目的。',
    // Image Gen
    imagePrompt: '图片描述',
    imagePromptPlaceholder: '描述你想要生成的图片...',
    aspectRatio: '图片比例',
    imageCount: '生成数量',
    generateImage: '生成图片',
    generating: '生成中...',
    imageUrl: '图片链接',
    downloadImage: '下载图片',
    copyImageUrl: '复制链接',
    copied: '已复制',
    // Video Gen
    videoPrompt: '视频描述',
    videoPromptPlaceholder: '描述你想要生成的视频...',
    resolution: '分辨率',
    duration: '时长',
    cameraMovement: '运镜',
    generateVideo: '生成视频',
    generatingVideo: '生成中...',
    videoStatus: '任务状态',
    videoUrl: '视频链接',
    downloadVideo: '下载视频',
    // Music Gen
    musicPrompt: '音乐描述',
    musicPromptPlaceholder: '描述你想要生成的音乐...',
    musicType: '音乐类型',
    lyrics: '歌词',
    lyricsPlaceholder: '输入歌词（可选）...',
    generateMusic: '生成音乐',
    generatingMusic: '生成中...',
    musicUrl: '音乐链接',
    downloadMusic: '下载音乐',
    // Common
    error: '错误',
    noApiKey: '请先在设置页面配置 API Key',
    pleaseEnterPrompt: '请输入描述内容',
  },
  en: {
    // Header
    title: 'MiniMax Creator',
    subtitle: 'AI Generation Platform',
    settings: 'Settings',
    github: 'GitHub',
    // Generation types
    textToImage: 'Text to Image',
    textToVideo: 'Text to Video',
    textToMusic: 'Text to Music',
    // Footer
    poweredBy: 'Powered by MiniMax AI',
    // Settings page
    apiConfig: 'API Configuration',
    appearance: 'Appearance',
    theme: 'Theme',
    themeLight: 'Light',
    themeDark: 'Dark',
    themeSystem: 'System',
    apiKey: 'API Key',
    baseUrl: 'Base URL',
    saveConfig: 'Save Configuration',
    configSaved: 'Configuration saved',
    // Security notice
    securityNotice: 'Security Notice: API Key is stored locally in browser',
    securityTip1: 'Clearing browser data will result in API Key loss',
    securityTip2: 'Be careful when using on public computers',
    securityTip3: 'Check usage regularly on MiniMax platform',
    getApiKey: 'Get API Key:',
    disclaimer: 'This project is for learning and research purposes only. Not for commercial use.',
    // Image Gen
    imagePrompt: 'Image Description',
    imagePromptPlaceholder: 'Describe the image you want to generate...',
    aspectRatio: 'Aspect Ratio',
    imageCount: 'Image Count',
    generateImage: 'Generate Image',
    generating: 'Generating...',
    imageUrl: 'Image URL',
    downloadImage: 'Download Image',
    copyImageUrl: 'Copy Link',
    copied: 'Copied!',
    // Video Gen
    videoPrompt: 'Video Description',
    videoPromptPlaceholder: 'Describe the video you want to generate...',
    resolution: 'Resolution',
    duration: 'Duration',
    cameraMovement: 'Camera Movement',
    generateVideo: 'Generate Video',
    generatingVideo: 'Generating...',
    videoStatus: 'Task Status',
    videoUrl: 'Video URL',
    downloadVideo: 'Download Video',
    // Music Gen
    musicPrompt: 'Music Description',
    musicPromptPlaceholder: 'Describe the music you want to generate...',
    musicType: 'Music Type',
    lyrics: 'Lyrics',
    lyricsPlaceholder: 'Enter lyrics (optional)...',
    generateMusic: 'Generate Music',
    generatingMusic: 'Generating...',
    musicUrl: 'Music URL',
    downloadMusic: 'Download Music',
    // Common
    error: 'Error',
    noApiKey: 'Please configure API Key in Settings page first',
    pleaseEnterPrompt: 'Please enter a description',
  },
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('zh');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'zh' || saved === 'en')) {
      setLanguageState(saved);
    } else {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('en')) {
        setLanguageState('en');
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
