'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'zh' | 'en';

interface Translations {
  // Header
  title: string;
  subtitle: string;
  settings: string;
  github: string;
  // Tab navigation
  tabImage: string;
  tabVideo: string;
  tabMusic: string;
  tabSpeech: string;
  // Generation types
  textToImage: string;
  textToVideo: string;
  textToMusic: string;
  textToSpeech: string;
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
  model: string;
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
  videoModel: string;
  cameraMovement: string;
  generateVideo: string;
  generatingVideo: string;
  videoStatus: string;
  videoUrl: string;
  downloadVideo: string;
  // Music Gen
  musicPrompt: string;
  musicPromptPlaceholder: string;
  instrumental: string;
  musicModel: string;
  musicLyricsRequired: string;
  lyrics: string;
  lyricsPlaceholder: string;
  generateMusic: string;
  generatingMusic: string;
  musicUrl: string;
  downloadMusic: string;
  // Speech Gen
  speechPrompt: string;
  speechPromptPlaceholder: string;
  speechTextLimit: string;
  speechModel: string;
  voiceId: string;
  speechSpeed: string;
  speechVolume: string;
  speechPitch: string;
  speechEmotion: string;
  speechEmotionHappy: string;
  speechEmotionSad: string;
  speechEmotionAngry: string;
  speechEmotionFearful: string;
  speechEmotionDisgusted: string;
  speechEmotionSurprised: string;
  speechEmotionNeutral: string;
  speechEmotionHint: string;
  speechOutputFormat: string;
  speechSubtitle: string;
  speechSubtitleHint: string;
  generateSpeech: string;
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
    // Tab navigation
    tabImage: '图像',
    tabVideo: '视频',
    tabMusic: '音乐',
    tabSpeech: '语音',
    // Generation types
    textToImage: '文生图',
    textToVideo: '文生视频',
    textToMusic: '生音乐',
    textToSpeech: '语音合成',
    // Footer
    poweredBy: 'Powered by MiniMax API',
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
    model: '模型',
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
    videoModel: '视频模型',
    cameraMovement: '运镜',
    generateVideo: '生成视频',
    generatingVideo: '生成中...',
    videoStatus: '任务状态',
    videoUrl: '视频链接',
    downloadVideo: '下载视频',
    // Music Gen
    musicPrompt: '音乐描述',
    musicPromptPlaceholder: '描述你想要生成的音乐...',
    instrumental: '纯音乐（无人声）',
    musicModel: '音乐模型',
    musicLyricsRequired: 'music-2.5 模型需要填写歌词',
    lyrics: '歌词',
    lyricsPlaceholder: '输入歌词（可选）...',
    generateMusic: '生成音乐',
    generatingMusic: '生成中...',
    musicUrl: '音乐链接',
    downloadMusic: '下载音乐',
    // Speech Gen
    speechPrompt: '文本内容',
    speechPromptPlaceholder: '输入要转换为语音的文本...',
    speechTextLimit: '最多 10000 字符',
    speechModel: '模型',
    voiceId: '音色',
    speechSpeed: '语速',
    speechVolume: '音量',
    speechPitch: '音调',
    speechEmotion: '情绪',
    speechEmotionHappy: '开心',
    speechEmotionSad: '悲伤',
    speechEmotionAngry: '生气',
    speechEmotionFearful: '害怕',
    speechEmotionDisgusted: '厌恶',
    speechEmotionSurprised: '惊讶',
    speechEmotionNeutral: '中性',
    speechEmotionHint: '仅 speech-2.8-hd/turbo 支持语气词标签如(laughs)',
    speechOutputFormat: '输出格式',
    speechSubtitle: '启用字幕',
    speechSubtitleHint: '仅部分模型支持',
    generateSpeech: '生成语音',
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
    // Tab navigation
    tabImage: 'Image',
    tabVideo: 'Video',
    tabMusic: 'Music',
    tabSpeech: 'Speech',
    // Generation types
    textToImage: 'Text to Image',
    textToVideo: 'Text to Video',
    textToMusic: 'Text to Music',
    textToSpeech: 'Text to Speech',
    // Footer
    poweredBy: 'Powered by MiniMax API',
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
    model: 'Model',
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
    videoModel: 'Video Model',
    cameraMovement: 'Camera Movement',
    generateVideo: 'Generate Video',
    generatingVideo: 'Generating...',
    videoStatus: 'Task Status',
    videoUrl: 'Video URL',
    downloadVideo: 'Download Video',
    // Music Gen
    musicPrompt: 'Music Description',
    musicPromptPlaceholder: 'Describe the music you want to generate...',
    instrumental: 'Instrumental (no vocals)',
    musicModel: 'Music Model',
    musicLyricsRequired: 'music-2.5 model requires lyrics',
    lyrics: 'Lyrics',
    lyricsPlaceholder: 'Enter lyrics (optional)...',
    generateMusic: 'Generate Music',
    generatingMusic: 'Generating...',
    musicUrl: 'Music URL',
    downloadMusic: 'Download Music',
    // Speech Gen
    speechPrompt: 'Text',
    speechPromptPlaceholder: 'Enter text to convert to speech...',
    speechTextLimit: 'Max 10000 characters',
    speechModel: 'Model',
    voiceId: 'Voice',
    speechSpeed: 'Speed',
    speechVolume: 'Volume',
    speechPitch: 'Pitch',
    speechEmotion: 'Emotion',
    speechEmotionHappy: 'Happy',
    speechEmotionSad: 'Sad',
    speechEmotionAngry: 'Angry',
    speechEmotionFearful: 'Fearful',
    speechEmotionDisgusted: 'Disgusted',
    speechEmotionSurprised: 'Surprised',
    speechEmotionNeutral: 'Neutral',
    speechEmotionHint: 'Only speech-2.8-hd/turbo support emotion tags like (laughs)',
    speechOutputFormat: 'Format',
    speechSubtitle: 'Enable Subtitle',
    speechSubtitleHint: 'Only supported by some models',
    generateSpeech: 'Generate Speech',
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
