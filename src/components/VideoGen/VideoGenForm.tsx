'use client';

import { useState } from 'react';
import { generateVideo } from '@/lib/client';
import { VideoGenResponse, VideoStatusResponse } from '@/types/minimax';

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
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    setTaskId(null);
    setVideoUrl(null);
    setStatus('');

    try {
      const data = await generateVideo({
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
    // 简化版：直接使用返回的 task_id，实际应轮询查询状态
    // 视频生成是异步的，需要定时查询状态
    const maxAttempts = 60;
    let attempts = 0;

    const poll = async () => {
      if (attempts >= maxAttempts) {
        setStatus('超时，请稍后重试');
        return;
      }

      try {
        const response = await fetch(`/api/minimax/video/status?task_id=${id}`);
        const data: VideoStatusResponse = await response.json();

        if (data.status === 'success') {
          setStatus('success');
          // 实际应从响应中获取视频 URL
          setVideoUrl(data.file_id ? `https://your-video-url.com/${data.file_id}` : null);
          return;
        } else if (data.status === 'failed') {
          setStatus('failed');
          setError('视频生成失败');
          return;
        }

        setStatus('processing');
        attempts++;
        setTimeout(poll, 5000);
      } catch {
        attempts++;
        setTimeout(poll, 5000);
      }
    };

    poll();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">文生视频</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            描述
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="描述你想要生成的视频... 支持 [运镜指令] 如 [推进], [拉远]"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              时长
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={6}>6 秒</option>
              <option value={10}>10 秒</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              分辨率
            </label>
            <select
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="720P">720P</option>
              <option value="768P">768P</option>
              <option value="1080P">1080P</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? '提交中...' : '生成视频'}
        </button>
      </form>

      {error && (
        <p className="mt-4 text-red-600 text-sm">{error}</p>
      )}

      {status && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            状态: {status === 'processing' ? '生成中...' : status}
          </p>
          {taskId && (
            <p className="text-xs text-gray-400 mt-1">Task ID: {taskId}</p>
          )}
        </div>
      )}

      {videoUrl && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">生成结果：</h3>
          <video
            src={videoUrl}
            controls
            className="w-full rounded-md"
          />
        </div>
      )}
    </div>
  );
}
