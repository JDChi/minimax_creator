import { ImageGenParams, VideoGenParams, MusicGenParams } from '@/types/minimax';

function getConfig() {
  if (typeof window === 'undefined') {
    return { baseUrl: 'https://api.minimaxi.com' };
  }
  return {
    baseUrl: localStorage.getItem('minimax_base_url') || 'https://api.minimaxi.com',
    apiKey: localStorage.getItem('minimax_api_key'),
  };
}

async function apiPost<T>(
  endpoint: string,
  params: Record<string, unknown>,
  signal?: AbortSignal
): Promise<T> {
  const { baseUrl, apiKey } = getConfig();

  if (!apiKey) {
    throw new Error('API Key 未配置，请在设置页面配置');
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-minimax-api-key': apiKey,
      'x-minimax-base-url': baseUrl,
    },
    body: JSON.stringify(params),
    signal,
  });

  const text = await response.text();

  if (!text) {
    throw new Error(`请求失败: 空响应 (${response.status})`);
  }

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`响应解析失败: ${text.slice(0, 200)}`);
  }

  if (!response.ok || data.base_resp?.status_code !== 0) {
    throw new Error(data.base_resp?.status_msg || `请求失败: ${response.status}`);
  }

  return data;
}

// 文生图
export async function generateImage(params: ImageGenParams, signal?: AbortSignal) {
  return apiPost('/api/minimax/image', params, signal);
}

// 文生视频
export async function generateVideo(params: VideoGenParams, signal?: AbortSignal) {
  return apiPost('/api/minimax/video', params, signal);
}

// 生音乐
export async function generateMusic(params: MusicGenParams, signal?: AbortSignal) {
  return apiPost('/api/minimax/music', params, signal);
}
