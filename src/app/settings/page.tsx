import SettingsForm from '@/components/Settings/SettingsForm';

export default function SettingsPage() {
  return (
    <main className="min-h-screen py-8 px-4">
      {/* Header */}
      <header className="max-w-lg mx-auto mb-8">
        <div className="flex items-center gap-3 mb-6">
          {/* Back Button */}
          <a
            href="/"
            className="group flex items-center justify-center w-10 h-10 rounded-xl bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-zinc-700/50 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300"
          >
            <svg className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </a>
          <h1 className="text-2xl font-bold gradient-text">设置</h1>
        </div>
      </header>

      {/* Settings Card */}
      <div className="max-w-lg mx-auto">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative">
            <SettingsForm />
          </div>
        </div>
      </div>
    </main>
  );
}
