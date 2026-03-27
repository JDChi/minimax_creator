import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageGenForm from '../components/ImageGen/ImageGenForm';

// Mock the client module
vi.mock('../lib/client', () => ({
  generateImage: vi.fn(),
}));

describe('ImageGenForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render form elements', () => {
    render(<ImageGenForm />);

    expect(screen.getByText('文生图')).toBeDefined();
    expect(screen.getByPlaceholderText('描述你想要生成的图片...')).toBeDefined();
    expect(screen.getByText('生成图片')).toBeDefined();
  });

  it('should show error when submitting empty prompt', async () => {
    render(<ImageGenForm />);

    const button = screen.getByRole('button', { name: '生成图片' });
    fireEvent.click(button);

    expect(await screen.findByText('请输入描述')).toBeDefined();
  });

  it('should have correct aspect ratio options', () => {
    render(<ImageGenForm />);

    // Find the first select element (aspect ratio)
    const selects = screen.getAllByRole('combobox');
    expect(selects.length).toBeGreaterThanOrEqual(2);
    expect(selects[0]).toBeDefined();
  });

  it('should have quantity options from 1 to 9', () => {
    render(<ImageGenForm />);

    const options = screen.getAllByRole('option');
    expect(options.length).toBeGreaterThanOrEqual(9);
  });
});
