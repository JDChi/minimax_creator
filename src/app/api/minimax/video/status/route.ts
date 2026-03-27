import { NextRequest, NextResponse } from 'next/server';
import { VideoStatusResponse } from '@/types/minimax';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get('task_id');

    if (!taskId) {
      return NextResponse.json(
        { base_resp: { status_code: 400, status_msg: '缺少 task_id' } },
        { status: 400 }
      );
    }

    const apiKey = request.headers.get('x-minimax-api-key');
    const baseUrl = request.headers.get('x-minimax-base-url') || 'https://api.minimax.com';

    if (!apiKey) {
      return NextResponse.json(
        { base_resp: { status_code: 401, status_msg: 'API Key 未配置' } },
        { status: 401 }
      );
    }

    const response = await fetch(`${baseUrl}/v1/video_generation/retrieve?task_id=${taskId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    const data: VideoStatusResponse = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Video status error:', error);
    return NextResponse.json(
      { base_resp: { status_code: 500, status_msg: String(error) } },
      { status: 500 }
    );
  }
}
