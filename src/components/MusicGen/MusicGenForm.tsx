'use client';

import { useState } from 'react';
import { generateMusic } from '@/lib/client';
import { MusicGenResponse } from '@/types/minimax';

export default function MusicGenForm() {
  const [prompt, setPrompt] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [isInstrumental, setIsInstrumental] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MusicGenResponse | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() && !isInstrumental) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await generateMusic({
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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">生音乐</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            音乐描述
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="描述音乐风格、情绪和场景，如：独立民谣, 忧郁, 适合在下雨的晚上"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isInstrumental"
            checked={isInstrumental}
            onChange={(e) => setIsInstrumental(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="isInstrumental" className="text-sm text-gray-700">
            纯音乐（无人声）
          </label>
        </div>

        {!isInstrumental && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              歌词（可选）
            </label>
            <textarea
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              placeholder="输入歌词，使用 \n 分隔每行。支持结构标签：[Verse], [Chorus], [Bridge] 等"
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading || (!prompt.trim() && !isInstrumental)}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? '生成中...' : '生成音乐'}
        </button>
      </form>

      {error && (
        <p className="mt-4 text-red-600 text-sm">{error}</p>
      )}

      {result && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">生成结果：</h3>
          {result.extra_info && (
            <p className="text-xs text-gray-500 mb-2">
              时长: {Math.round((result.extra_info.music_duration || 0) / 1000)}秒
            </p>
          )}
          {/* 音乐播放组件需要根据实际返回格式调整 */}
          <p className="text-sm text-gray-600">Trace ID: {result.trace_id}</p>
        </div>
      )}
    </div>
  );
}
