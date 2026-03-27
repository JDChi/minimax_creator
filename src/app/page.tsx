'use client';

import ImageGenForm from '@/components/ImageGen/ImageGenForm';
import VideoGenForm from '@/components/VideoGen/VideoGenForm';
import MusicGenForm from '@/components/MusicGen/MusicGenForm';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useI18n } from '@/lib/i18n';

export default function Home() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen py-8 px-4">
      {/* Header */}
      <header className="max-w-5xl mx-auto mb-12 animate-fade-in">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 animate-pulse-glow">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">
                <span className="gradient-text">{t.title}</span>
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{t.subtitle}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* GitHub Button */}
            <a
              href="https://github.com/JDChi/minimax_creator"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-zinc-700/50 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300"
            >
              <svg className="w-4 h-4 text-slate-600 dark:text-slate-300 group-hover:text-indigo-500 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">{t.github}</span>
            </a>

            {/* Settings Button */}
            <a
              href="/settings"
              className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-zinc-700/50 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300"
            >
              <svg className="w-4 h-4 text-slate-600 dark:text-slate-300 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">{t.settings}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Feature Cards */}
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Image Generation */}
        <div className="animate-fade-in stagger-1 opacity-0" style={{ animationFillMode: 'forwards' }}>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative">
              <ImageGenForm />
            </div>
          </div>
        </div>

        {/* Video Generation */}
        <div className="animate-fade-in stagger-2 opacity-0" style={{ animationFillMode: 'forwards' }}>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative">
              <VideoGenForm />
            </div>
          </div>
        </div>

        {/* Music Generation */}
        <div className="animate-fade-in stagger-3 opacity-0" style={{ animationFillMode: 'forwards' }}>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-amber-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative">
              <MusicGenForm />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto mt-16 pb-8 text-center">
        <p className="text-xs text-slate-400 dark:text-slate-500">
          {t.poweredBy}
        </p>
      </footer>
    </main>
  );
}
