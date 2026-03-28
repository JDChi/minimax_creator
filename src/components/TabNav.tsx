'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';

type Tab = 'image' | 'video' | 'music' | 'speech';

interface TabNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabConfig: Record<Tab, { gradient: string; icon: React.ReactNode }> = {
  image: {
    gradient: 'from-indigo-500 to-purple-600',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  video: {
    gradient: 'from-purple-500 to-pink-600',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  music: {
    gradient: 'from-pink-500 to-amber-500',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
  },
  speech: {
    gradient: 'from-cyan-500 to-blue-600',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
  },
};

export default function TabNav({ activeTab, onTabChange }: TabNavProps) {
  const { t } = useI18n();

  const tabs: Tab[] = ['image', 'video', 'music', 'speech'];
  const labels: Record<Tab, string> = {
    image: t.tabImage,
    video: t.tabVideo,
    music: t.tabMusic,
    speech: t.tabSpeech,
  };

  return (
    <nav className="max-w-5xl mx-auto mb-8 animate-fade-in">
      <div className="flex items-center justify-between bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-zinc-800/50 shadow-lg p-2">
        {/* Tab Buttons */}
        <div className="flex items-center gap-1 flex-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            const config = tabConfig[tab];

            return (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`
                  relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex-1 justify-center
                  ${isActive
                    ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg`
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-zinc-800/50'
                  }
                `}
              >
                {config.icon}
                <span>{labels[tab]}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-white rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Settings Button - separate from tabs */}
        <div className="flex items-center ml-2">
          <a
            href="/settings"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-zinc-800/50 transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
}
