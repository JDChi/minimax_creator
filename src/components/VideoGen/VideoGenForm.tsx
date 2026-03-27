'use client';

import { useState } from 'react';
import { generateVideo } from '@/lib/client';
import { VideoGenResponse } from '@/types/minimax';

export default function VideoGenForm() {
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState(6);
  const [resolution, setResolution] = useState('768P');
  const [loading, setLoading] = useState(false);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError('请输入描述');
      return;
    }

    setLoading(true);
    setError('');
    setTaskId(null);
    setVideoUrl(null);
    setStatus('');

    try {
      const data = await generateVideo({
        model: 'MiniMax-Hailuo-2.3',
        prompt,
        duration: duration as 6 | 10,
        resolution: resolution as '720P' | '768P' | '1080P',
      }) as VideoGenResponse;

      setTaskId(data.task_id);
      setStatus('processing');
      pollVideoStatus(data.task_id);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  const pollVideoStatus = async (id: string) => {
    const maxAttempts = 60;
    let attempts = 0;

    const poll = async () => {
      if (attempts >= maxAttempts) {
        setStatus('超时，请稍后重试');
        return;
      }

      try {
        const apiKey = localStorage.getItem('minimax_api_key');
        const baseUrl = localStorage.getItem('minimax_base_url') || 'https://api.minimaxi.com';

        const response = await fetch(`/api/minimax/video/status?task_id=${id}`, {
          headers: {
            'x-minimax-api-key': apiKey || '',
            'x-minimax-base-url': baseUrl,
          },
        });
        const data = await response.json();

        if (data.status === 'success') {
          setStatus('success');
          setVideoUrl(data.video_url || data.file_id || null);
          return;
        } else if (data.status === 'failed') {
          setStatus('failed');
          setError('视频生成失败');
          return;
        }

        setStatus('processing');
        attempts++;
        setTimeout(poll, 5000);
      } catch (err) {
        attempts++;
        setTimeout(poll, 5000);
      }
    };

    poll();
  };

  return (
    <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-zinc-800/50 shadow-xl p-6 sm:p-8 card-hover">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-500/30">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">文生视频</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Text to Video</p>
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
            placeholder="描述你想要生成的视频... 支持 [运镜指令] 如 [推进], [拉远]"
            rows={4}
            className="w-full px-4 py-3 bg-slate-50/50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-800 dark:text-white text-sm resize-none transition-all duration-200 input-focus"
          />
        </div>

        {/* Options Row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                时长
              </span>
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full px-4 py-3 bg-slate-50/50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 text-slate-800 dark:text-white text-sm cursor-pointer transition-all duration-200 input-focus"
            >
              <option value={6}>6 秒</option>
              <option value={10}>10 秒</option>
            </select>
          </div>

          {/* Resolution */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                分辨率
              </span>
            </label>
            <select
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50/50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 text-slate-800 dark:text-white text-sm cursor-pointer transition-all duration-200 input-focus"
            >
              <option value="720P">720P</option>
              <option value="768P">768P</option>
              <option value="1080P">1080P</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-purple-500/30 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(135deg, #9333ea, #ec4899)' }}
        >
          {loading ? (
            <>
              <div className="spinner w-5 h-5"></div>
              <span>提交中...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>生成视频</span>
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

      {/* Status */}
      {status && status !== 'success' && status !== 'failed' && (
        <div className="mt-5 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50 rounded-xl animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-purple-700 dark:text-purple-300 font-medium">生成中...</p>
              {taskId && (
                <p className="text-xs text-purple-500 dark:text-purple-400 mt-0.5 font-mono truncate">
                  Task ID: {taskId}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Video Result */}
      {videoUrl && (
        <div className="mt-8 animate-fade-in">
          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            生成结果
          </h3>
          <div className="relative overflow-hidden rounded-xl bg-slate-100 dark:bg-zinc-800">
            <video
              src={videoUrl}
              controls
              className="w-full result-image"
            />
          </div>
        </div>
      )}
    </div>
  );
}
