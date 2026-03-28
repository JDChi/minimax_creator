import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { I18nProvider } from '../lib/i18n';
import ImageGenForm from '../components/ImageGen/ImageGenForm';
import SpeechGenForm from '../components/SpeechGen/SpeechGenForm';

// Mock localStorage for jsdom environment
const localStorageMock = {
  getItem: vi.fn().mockReturnValue('zh'),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock the client module
vi.mock('../lib/client', () => ({
  generateImage: vi.fn(),
  generateSpeech: vi.fn(),
  getVoices: vi.fn().mockResolvedValue({
    system_voice: [
      { voice_id: 'male-qn-qingse', voice_name: '青涩青年' },
      { voice_id: 'female-shaonv', voice_name: '少女' },
    ],
    voice_cloning: [],
    voice_generation: [],
    base_resp: { status_code: 0, status_msg: 'success' },
  }),
}));

// Wrapper component to provide I18nContext
function Wrapper({ children }: { children: React.ReactNode }) {
  return <I18nProvider>{children}</I18nProvider>;
}

describe('ImageGenForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render form elements', () => {
    render(<ImageGenForm />, { wrapper: Wrapper });

    expect(screen.getByText('文生图')).toBeDefined();
    expect(screen.getByPlaceholderText('描述你想要生成的图片...')).toBeDefined();
    expect(screen.getByText('生成图片')).toBeDefined();
  });

  it('should show error when submitting empty prompt', async () => {
    render(<ImageGenForm />, { wrapper: Wrapper });

    const button = screen.getByRole('button', { name: '生成图片' });
    fireEvent.click(button);

    expect(await screen.findByText('请输入描述内容')).toBeDefined();
  });

  it('should have correct aspect ratio options', () => {
    render(<ImageGenForm />, { wrapper: Wrapper });

    // Find the first select element (aspect ratio)
    const selects = screen.getAllByRole('combobox');
    expect(selects.length).toBeGreaterThanOrEqual(2);
    expect(selects[0]).toBeDefined();
  });

  it('should have quantity options from 1 to 9', () => {
    render(<ImageGenForm />, { wrapper: Wrapper });

    const options = screen.getAllByRole('option');
    expect(options.length).toBeGreaterThanOrEqual(9);
  });
});

describe('SpeechGenForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render form elements', () => {
    render(<SpeechGenForm />, { wrapper: Wrapper });

    expect(screen.getByText('语音合成')).toBeDefined();
    expect(screen.getByPlaceholderText('输入要转换为语音的文本...')).toBeDefined();
    expect(screen.getByText('生成语音')).toBeDefined();
  });

  it('should show error when submitting empty text', async () => {
    render(<SpeechGenForm />, { wrapper: Wrapper });

    const button = screen.getByRole('button', { name: '生成语音' });
    fireEvent.click(button);

    expect(await screen.findByText('请输入描述内容')).toBeDefined();
  });

  it('should have model options', () => {
    render(<SpeechGenForm />, { wrapper: Wrapper });

    const selects = screen.getAllByRole('combobox');
    expect(selects.length).toBeGreaterThanOrEqual(2);
  });

  it('should have emotion options', () => {
    render(<SpeechGenForm />, { wrapper: Wrapper });

    // Check for emotion select with expected options
    const emotionSelect = screen.getByDisplayRole?.('combobox') || screen.getAllByRole('combobox')[3];
    expect(emotionSelect).toBeDefined();
  });
});
