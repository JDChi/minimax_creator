import { NextRequest, NextResponse } from 'next/server';
import { MusicGenParams, MusicGenResponse } from '@/types/minimax';

export async function POST(request: NextRequest) {
  try {
    const body: MusicGenParams = await request.json();

    const apiKey = request.headers.get('x-minimax-api-key');
    const baseUrl = request.headers.get('x-minimax-base-url') || 'https://api.minimaxi.com';

    if (!apiKey) {
      return NextResponse.json(
        { base_resp: { status_code: 401, status_msg: 'API Key 未配置' } },
        { status: 401 }
      );
    }

    const response = await fetch(`${baseUrl}/v1/music_generation`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { base_resp: { status_code: 500, status_msg: `响应解析失败: ${text.slice(0, 200)}` } },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Music generation error:', error);
    return NextResponse.json(
      { base_resp: { status_code: 500, status_msg: String(error) } },
      { status: 500 }
    );
  }
}
