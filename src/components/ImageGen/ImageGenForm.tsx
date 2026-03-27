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
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await generateImage({
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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">文生图</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            描述
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="描述你想要生成的图片..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              宽高比
            </label>
            <select
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1:1">1:1 (1024x1024)</option>
              <option value="16:9">16:9 (1280x720)</option>
              <option value="4:3">4:3 (1152x864)</option>
              <option value="3:2">3:2 (1248x832)</option>
              <option value="9:16">9:16 (720x1280)</option>
            </select>
          </div>

          <div className="w-24">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              数量
            </label>
            <select
              value={n}
              onChange={(e) => setN(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? '生成中...' : '生成图片'}
        </button>
      </form>

      {error && (
        <p className="mt-4 text-red-600 text-sm">{error}</p>
      )}

      {result && result.data.image_urls && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">生成结果：</h3>
          <div className="grid grid-cols-1 gap-4">
            {result.data.image_urls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Generated ${index + 1}`}
                className="w-full rounded-md"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
