import { describe, it, expect } from 'vitest';
import type {
  ImageGenParams,
  VideoGenParams,
  MusicGenParams,
} from '../types/minimax';

describe('MiniMax Types', () => {
  describe('ImageGenParams', () => {
    it('should accept valid image generation params', () => {
      const params: ImageGenParams = {
        model: 'image-01',
        prompt: 'A beautiful sunset',
        aspect_ratio: '16:9',
        n: 2,
        response_format: 'url',
      };

      expect(params.model).toBe('image-01');
      expect(params.prompt).toBe('A beautiful sunset');
      expect(params.aspect_ratio).toBe('16:9');
      expect(params.n).toBe(2);
      expect(params.response_format).toBe('url');
    });

    it('should allow optional fields to be omitted', () => {
      const params: ImageGenParams = {
        prompt: 'Test prompt',
      };

      expect(params.prompt).toBe('Test prompt');
      expect(params.model).toBeUndefined();
      expect(params.n).toBeUndefined();
    });

    it('should validate aspect_ratio enum values', () => {
      const validRatios: ImageGenParams['aspect_ratio'][] = [
        '1:1', '16:9', '4:3', '3:2', '2:3', '3:4', '9:16', '21:9'
      ];

      validRatios.forEach(ratio => {
        const params: ImageGenParams = { prompt: 'test', aspect_ratio: ratio };
        expect(params.aspect_ratio).toBe(ratio);
      });
    });
  });

  describe('VideoGenParams', () => {
    it('should accept valid video generation params', () => {
      const params: VideoGenParams = {
        model: 'MiniMax-Hailuo-2.3',
        prompt: 'A man walking in the park',
        duration: 6,
        resolution: '1080P',
      };

      expect(params.model).toBe('MiniMax-Hailuo-2.3');
      expect(params.prompt).toBe('A man walking in the park');
      expect(params.duration).toBe(6);
      expect(params.resolution).toBe('1080P');
    });

    it('should support camera instructions in prompt', () => {
      const params: VideoGenParams = {
        prompt: 'A man picks up a book [Pedestal up], then reads [Static shot].',
      };

      expect(params.prompt).toContain('[Pedestal up]');
      expect(params.prompt).toContain('[Static shot]');
    });

    it('should validate duration values', () => {
      const params6s: VideoGenParams = { prompt: 'test', duration: 6 };
      const params10s: VideoGenParams = { prompt: 'test', duration: 10 };

      expect(params6s.duration).toBe(6);
      expect(params10s.duration).toBe(10);
    });
  });

  describe('MusicGenParams', () => {
    it('should accept valid music generation params', () => {
      const params: MusicGenParams = {
        model: 'music-2.5+',
        prompt: 'Pop music, happy, upbeat',
        lyrics: '[verse]\nHello world',
        is_instrumental: false,
        output_format: 'url',
      };

      expect(params.model).toBe('music-2.5+');
      expect(params.prompt).toBe('Pop music, happy, upbeat');
      expect(params.is_instrumental).toBe(false);
    });

    it('should allow instrumental music without lyrics', () => {
      const params: MusicGenParams = {
        model: 'music-2.5+',
        prompt: 'Piano solo, calm, peaceful',
        is_instrumental: true,
      };

      expect(params.is_instrumental).toBe(true);
      expect(params.lyrics).toBeUndefined();
    });

    it('should support lyrics structure tags', () => {
      const params: MusicGenParams = {
        prompt: 'A happy song',
        lyrics: '[verse]\nLine 1\n[chorus]\nLine 2',
      };

      expect(params.lyrics).toContain('[verse]');
      expect(params.lyrics).toContain('[chorus]');
    });
  });
});
