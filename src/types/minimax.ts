// 文生图
export interface ImageGenParams {
  model?: 'image-01' | 'image-01-live';
  prompt: string;
  aspect_ratio?: '1:1' | '16:9' | '4:3' | '3:2' | '2:3' | '3:4' | '9:16' | '21:9';
  width?: number;
  height?: number;
  response_format?: 'url' | 'base64';
  seed?: number;
  n?: number;
  prompt_optimizer?: boolean;
  aigc_watermark?: boolean;
}

export interface ImageGenResponse {
  id: string;
  data: {
    image_urls: string[];
  };
  metadata: {
    failed_count: string;
    success_count: string;
  };
  base_resp: {
    status_code: number;
    status_msg: string;
  };
}

// 文生视频
export interface VideoGenParams {
  model?: 'MiniMax-Hailuo-2.3' | 'MiniMax-Hailuo-2.3-Fast' | 'MiniMax-Hailuo-02';
  prompt: string;
  prompt_optimizer?: boolean;
  fast_pretreatment?: boolean;
  duration?: 6 | 10;
  resolution?: '720P' | '768P' | '1080P';
  callback_url?: string;
  aigc_watermark?: boolean;
}

export interface VideoGenResponse {
  task_id: string;
  base_resp: {
    status_code: number;
    status_msg: string;
  };
}

// 查询视频状态
export interface VideoStatusResponse {
  task_id: string;
  status: 'processing' | 'success' | 'failed';
  file_id?: string;
  base_resp: {
    status_code: number;
    status_msg: string;
  };
}

// 生音乐
export interface MusicGenParams {
  model?: 'music-2.5+' | 'music-2.5';
  prompt: string;
  lyrics?: string;
  stream?: boolean;
  output_format?: 'url' | 'hex';
  audio_setting?: {
    sample_rate?: number;
    bitrate?: number;
    format?: 'mp3';
  };
  aigc_watermark?: boolean;
  lyrics_optimizer?: boolean;
  is_instrumental?: boolean;
}

export interface MusicGenResponse {
  data: {
    audio: string;
    status: number;
  };
  trace_id: string;
  extra_info?: {
    music_duration: number;
    music_sample_rate: number;
    music_channel: number;
    bitrate: number;
    music_size: number;
  };
  base_resp: {
    status_code: number;
    status_msg: string;
  };
}

// 语音合成
export interface SpeechGenParams {
  model: 'speech-2.8-hd' | 'speech-2.8-turbo' | 'speech-2.6-hd' | 'speech-2.6-turbo' | 'speech-02-hd' | 'speech-02-turbo' | 'speech-01-hd' | 'speech-01-turbo';
  text: string;
  voice_setting: {
    voice_id: string;
    speed?: number;
    vol?: number;
    pitch?: number;
    emotion?: 'happy' | 'sad' | 'angry' | 'fearful' | 'disgusted' | 'surprised' | 'neutral';
  };
  audio_setting?: {
    sample_rate?: number;
    bitrate?: number;
    format?: 'mp3' | 'pcm' | 'flac' | 'wav';
    channel?: 1 | 2;
  };
  subtitle_enable?: boolean;
  output_format?: 'url' | 'hex';
}

export interface SpeechGenResponse {
  data: {
    audio: string;
    subtitle_file?: string;
    status: number;
    trace_id: string;
    extra_info?: {
      audio_length: number;
      audio_sample_rate: number;
      audio_size: number;
      bitrate: number;
      audio_format: string;
      audio_channel: number;
      usage_characters: number;
      word_count: number;
    };
  };
  base_resp: {
    status_code: number;
    status_msg: string;
  };
}
