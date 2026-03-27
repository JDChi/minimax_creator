import { ImageGenParams, VideoGenParams, MusicGenParams } from '@/types/minimax';

const DEFAULT_BASE_URL = 'https://api.minimax.com';

function getConfig() {
  if (typeof window === 'undefined') {
    return { baseUrl: DEFAULT_BASE_URL };
  }
  return {
    baseUrl: localStorage.getItem('minimax_base_url') || DEFAULT_BASE_URL,
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

  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
    signal,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.base_resp?.status_msg || `请求失败: ${response.status}`);
  }

  return response.json();
}

// 文生图
export async function generateImage(
  params: ImageGenParams,
  signal?: AbortSignal
) {
  return apiPost('/v1/image_generation', params, signal);
}

// 文生视频
export async function generateVideo(
  params: VideoGenParams,
  signal?: AbortSignal
) {
  return apiPost('/v1/video_generation', params, signal);
}

// 查询视频状态
export async function queryVideoStatus(taskId: string) {
  const { baseUrl, apiKey } = getConfig();

  if (!apiKey) {
    throw new Error('API Key 未配置，请在设置页面配置');
  }

  const response = await fetch(`${baseUrl}/v1/video_generation/retrieve?task_id=${taskId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.base_resp?.status_msg || `请求失败: ${response.status}`);
  }

  return response.json();
}

// 生音乐
export async function generateMusic(
  params: MusicGenParams,
  signal?: AbortSignal
) {
  return apiPost('/v1/music_generation', params, signal);
}
