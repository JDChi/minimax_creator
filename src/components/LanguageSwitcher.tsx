'use client';

import { useI18n } from '@/lib/i18n';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useI18n();

  return (
    <button
      onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
      className="group flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-zinc-800/50 transition-colors"
      title={language === 'zh' ? 'Switch to English' : '切换到中文'}
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
      <span>{language === 'zh' ? 'EN' : '中'}</span>
    </button>
  );
}
