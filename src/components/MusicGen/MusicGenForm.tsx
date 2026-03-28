'use client';

import { useState } from 'react';
import { generateMusic } from '@/lib/client';
import { MusicGenResponse } from '@/types/minimax';
import { useI18n } from '@/lib/i18n';

export default function MusicGenForm() {
  const { t } = useI18n();
  const [prompt, setPrompt] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [isInstrumental, setIsInstrumental] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MusicGenResponse | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() && !isInstrumental) {
      setError(t.pleaseEnterPrompt);
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await generateMusic({
        model: 'music-2.5+',
        prompt,
        lyrics: isInstrumental ? undefined : lyrics,
        is_instrumental: isInstrumental,
        output_format: 'url',
      });
      setResult(data as MusicGenResponse);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-zinc-800/50 shadow-xl p-6 sm:p-8 card-hover">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-amber-500 shadow-lg shadow-pink-500/30">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">{t.textToMusic}</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Prompt Input */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              {t.musicPrompt}
            </span>
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={t.musicPromptPlaceholder}
            rows={3}
            className="w-full px-4 py-3 bg-slate-50/50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-800 dark:text-white text-sm resize-none transition-all duration-200 input-focus"
          />
        </div>

        {/* Instrumental Toggle */}
        <div className="relative">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                id="isInstrumental"
                checked={isInstrumental}
                onChange={(e) => setIsInstrumental(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 dark:bg-zinc-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pink-500/50 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-pink-500 peer-checked:to-amber-500 transition-all duration-200"></div>
            </div>
            <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors">
              {t.instrumental}
            </span>
          </label>
        </div>

        {/* Lyrics Input */}
        {!isInstrumental && (
          <div className="animate-fade-in">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {t.lyrics}
              </span>
            </label>
            <textarea
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              placeholder={t.lyricsPlaceholder}
              rows={6}
              className="w-full px-4 py-3 bg-slate-50/50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-800 dark:text-white text-sm resize-none transition-all duration-200 input-focus font-mono text-xs"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-pink-500/30 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(135deg, #ec4899, #f59e0b)' }}
        >
          {loading ? (
            <>
              <div className="spinner w-5 h-5"></div>
              <span>{t.generatingMusic}</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              <span>{t.generateMusic}</span>
            </>
          )}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div className="mt-5 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl animate-fade-in">
          <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </p>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="mt-8 animate-fade-in">
          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t.musicUrl}
          </h3>
          <div className="p-4 bg-gradient-to-r from-pink-50 to-amber-50 dark:from-pink-900/20 dark:to-amber-900/20 border border-pink-200 dark:border-pink-800/50 rounded-xl">
            {result.extra_info && (
              <p className="text-xs text-pink-600 dark:text-pink-400 mb-2 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t.duration}: {Math.round((result.extra_info.music_duration || 0) / 1000)}s
              </p>
            )}
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono break-all">
              Trace ID: {result.trace_id}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
