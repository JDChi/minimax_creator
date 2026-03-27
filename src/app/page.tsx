import ImageGenForm from '@/components/ImageGen/ImageGenForm';
import VideoGenForm from '@/components/VideoGen/VideoGenForm';
import MusicGenForm from '@/components/MusicGen/MusicGenForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">MiniMax Creator</h1>
          <a
            href="/settings"
            className="px-4 py-2 text-sm text-blue-500 hover:text-blue-700"
          >
            设置
          </a>
        </header>

        <div className="space-y-8">
          <ImageGenForm />
          <VideoGenForm />
          <MusicGenForm />
        </div>
      </div>
    </main>
  );
}
