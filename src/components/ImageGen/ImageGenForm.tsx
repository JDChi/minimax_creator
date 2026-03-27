'use client';

import { useState } from 'react';
import { generateImage } from '@/lib/client';
import { ImageGenResponse } from '@/types/minimax';

export default function ImageGenForm() {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [n, setN] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImageGenResponse | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError('请输入描述');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await generateImage({
        model: 'image-01',
        prompt,
        aspect_ratio: aspectRatio as '1:1' | '16:9' | '4:3' | '3:2' | '2:3' | '3:4' | '9:16' | '21:9',
        n,
        response_format: 'url',
      });
      setResult(data as ImageGenResponse);
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
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">文生图</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Text to Image</p>
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
              描述
            </span>
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="描述你想要生成的图片..."
            rows={4}
            className="w-full px-4 py-3 bg-slate-50/50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-800 dark:text-white text-sm resize-none transition-all duration-200 input-focus"
          />
        </div>

        {/* Options Row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Aspect Ratio */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                宽高比
              </span>
            </label>
            <select
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50/50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-slate-800 dark:text-white text-sm cursor-pointer transition-all duration-200 input-focus"
            >
              <option value="1:1">1:1 (1024x1024)</option>
              <option value="16:9">16:9 (1280x720)</option>
              <option value="4:3">4:3 (1152x864)</option>
              <option value="3:2">3:2 (1248x832)</option>
              <option value="9:16">9:16 (720x1280)</option>
            </select>
          </div>

          {/* Number of Images */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                数量
              </span>
            </label>
            <select
              value={n}
              onChange={(e) => setN(Number(e.target.value))}
              className="w-full px-4 py-3 bg-slate-50/50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-slate-800 dark:text-white text-sm cursor-pointer transition-all duration-200 input-focus"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-indigo-500/30 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="spinner w-5 h-5"></div>
              <span>生成中...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>生成图片</span>
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
      {result && result.data.image_urls && (
        <div className="mt-8 animate-fade-in">
          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            生成结果
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {result.data.image_urls.map((url, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl bg-slate-100 dark:bg-zinc-800 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={url}
                  alt={`Generated ${index + 1}`}
                  className="w-full object-cover result-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
