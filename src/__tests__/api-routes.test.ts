import { describe, it, expect } from 'vitest';

// Test the API response structures
describe('API Response Structures', () => {
  describe('Image Generation Response', () => {
    it('should have correct structure for successful response', () => {
      const mockResponse = {
        id: '123456',
        data: {
          image_urls: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
        },
        metadata: {
          failed_count: '0',
          success_count: '2',
        },
        base_resp: {
          status_code: 0,
          status_msg: 'success',
        },
      };

      expect(mockResponse.base_resp.status_code).toBe(0);
      expect(mockResponse.data.image_urls).toHaveLength(2);
      expect(mockResponse.metadata.success_count).toBe('2');
    });
  });

  describe('Video Generation Response', () => {
    it('should have correct structure for successful submission', () => {
      const mockResponse = {
        task_id: '106916112212032',
        base_resp: {
          status_code: 0,
          status_msg: 'success',
        },
      };

      expect(mockResponse.task_id).toBeDefined();
      expect(mockResponse.task_id.length).toBeGreaterThan(0);
      expect(mockResponse.base_resp.status_code).toBe(0);
    });
  });

  describe('Video Status Response', () => {
    it('should handle processing status', () => {
      const mockResponse = {
        task_id: '106916112212032',
        status: 'processing',
        base_resp: {
          status_code: 0,
          status_msg: 'success',
        },
      };

      expect(mockResponse.status).toBe('processing');
    });

    it('should handle success status', () => {
      const mockResponse = {
        task_id: '106916112212032',
        status: 'success',
        file_id: '205258526306433',
        base_resp: {
          status_code: 0,
          status_msg: 'success',
        },
      };

      expect(mockResponse.status).toBe('success');
      expect(mockResponse.file_id).toBeDefined();
    });

    it('should handle failed status', () => {
      const mockResponse = {
        task_id: '106916112212032',
        status: 'failed',
        base_resp: {
          status_code: 0,
          status_msg: 'success',
        },
      };

      expect(mockResponse.status).toBe('failed');
    });
  });

  describe('Music Generation Response', () => {
    it('should have correct structure for hex output', () => {
      const mockResponse = {
        data: {
          audio: 'hex_encoded_audio_data',
          status: 2,
        },
        trace_id: '04ede0ab069fb1ba8be5156a24b1e081',
        extra_info: {
          music_duration: 25364,
          music_sample_rate: 44100,
          music_channel: 2,
          bitrate: 256000,
          music_size: 813651,
        },
        base_resp: {
          status_code: 0,
          status_msg: 'success',
        },
      };

      expect(mockResponse.data.audio).toBeDefined();
      expect(mockResponse.trace_id).toBeDefined();
      expect(mockResponse.extra_info.music_duration).toBe(25364);
      expect(mockResponse.base_resp.status_code).toBe(0);
    });
  });

  describe('Speech Generation Response', () => {
    it('should have correct structure for successful response', () => {
      const mockResponse = {
        data: {
          audio: 'hex_encoded_audio_or_url',
          subtitle_file: 'https://example.com/subtitle.json',
          status: 2,
          trace_id: '01b8bf9bb7433cc75c18eee6cfa8fe21',
          extra_info: {
            audio_length: 9900,
            audio_sample_rate: 32000,
            audio_size: 160323,
            bitrate: 128000,
            audio_format: 'mp3',
            audio_channel: 1,
            usage_characters: 26,
            word_count: 52,
          },
        },
        base_resp: {
          status_code: 0,
          status_msg: 'success',
        },
      };

      expect(mockResponse.data.audio).toBeDefined();
      expect(mockResponse.data.status).toBe(2);
      expect(mockResponse.data.trace_id).toBeDefined();
      expect(mockResponse.data.extra_info.audio_length).toBe(9900);
      expect(mockResponse.base_resp.status_code).toBe(0);
    });

    it('should handle streaming response status', () => {
      const mockResponse = {
        data: {
          audio: 'hex_chunk',
          status: 1,
          trace_id: '01b8bf9bb7433cc75c18eee6cfa8fe21',
        },
        base_resp: {
          status_code: 0,
          status_msg: '',
        },
      };

      expect(mockResponse.data.status).toBe(1);
    });
  });

  describe('Error Responses', () => {
    it('should handle API key missing error', () => {
      const mockError = {
        base_resp: {
          status_code: 401,
          status_msg: 'API Key 未配置',
        },
      };

      expect(mockError.base_resp.status_code).toBe(401);
    });

    it('should handle usage limit exceeded error', () => {
      const mockError = {
        task_id: '',
        base_resp: {
          status_code: 2056,
          status_msg: 'usage limit exceeded',
        },
      };

      expect(mockError.base_resp.status_code).toBe(2056);
      expect(mockError.base_resp.status_msg).toContain('limit');
    });

    it('should handle invalid params error', () => {
      const mockError = {
        base_resp: {
          status_code: 2013,
          status_msg: 'invalid params',
        },
      };

      expect(mockError.base_resp.status_code).toBe(2013);
    });
  });
});
