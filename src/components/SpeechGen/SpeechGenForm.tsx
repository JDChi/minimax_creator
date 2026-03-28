'use client';

import { useState } from 'react';
import { generateSpeech } from '@/lib/client';
import { SpeechGenResponse } from '@/types/minimax';
import { useI18n } from '@/lib/i18n';

export default function SpeechGenForm() {
  const { t } = useI18n();
  const [text, setText] = useState('');
  const [model, setModel] = useState('speech-2.8-hd');
  const [voiceId, setVoiceId] = useState('male-qn-qingse');
  const [speed, setSpeed] = useState(1);
  const [vol, setVol] = useState(1);
  const [pitch, setPitch] = useState(0);
  const [emotion, setEmotion] = useState('happy');
  const [format, setFormat] = useState('mp3');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      setError(t.pleaseEnterPrompt);
      return;
    }

    setLoading(true);
    setError('');
    setAudioUrl(null);

    try {
      const data = await generateSpeech({
        model: model as 'speech-2.8-hd' | 'speech-2.8-turbo' | 'speech-2.6-hd' | 'speech-2.6-turbo' | 'speech-02-hd' | 'speech-02-turbo' | 'speech-01-hd' | 'speech-01-turbo',
        text,
        voice_setting: {
          voice_id: voiceId,
          speed,
          vol,
          pitch,
          emotion: emotion as 'happy' | 'sad' | 'angry' | 'fearful' | 'disgusted' | 'surprised' | 'neutral',
        },
        audio_setting: {
          format: format as 'mp3' | 'pcm' | 'flac' | 'wav',
        },
        output_format: 'url',
      }) as SpeechGenResponse;

      if (data.data?.audio) {
        setAudioUrl(data.data.audio);
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-zinc-800/50 shadow-xl p-6 sm:p-8 card-hover">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">{t.textToSpeech}</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Text Input */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              {t.speechPrompt}
            </span>
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t.speechPromptPlaceholder}
            rows={4}
            className="w-full px-4 py-3 bg-slate-50/50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-800 dark:text-white text-sm resize-none transition-all duration-200 input-focus"
          />
        </div>

        {/* Model + Voice Selection */}
        <div className="grid grid-cols-2 gap-4">
          {/* Model */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                {t.speechModel}
              </span>
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50/50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 text-slate-800 dark:text-white text-sm cursor-pointer transition-all duration-200 input-focus"
            >
              <option value="speech-2.8-hd">speech-2.8-hd</option>
              <option value="speech-2.8-turbo">speech-2.8-turbo</option>
              <option value="speech-2.6-hd">speech-2.6-hd</option>
              <option value="speech-2.6-turbo">speech-2.6-turbo</option>
              <option value="speech-02-hd">speech-02-hd</option>
              <option value="speech-02-turbo">speech-02-turbo</option>
              <option value="speech-01-hd">speech-01-hd</option>
              <option value="speech-01-turbo">speech-01-turbo</option>
            </select>
          </div>

          {/* Voice */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {t.voiceId}
              </span>
            </label>
            <select
              value={voiceId}
              onChange={(e) => setVoiceId(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50/50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 text-slate-800 dark:text-white text-sm cursor-pointer transition-all duration-200 input-focus"
            >
              <option value="male-qn-qingse">male-qn-qingse (青涩青年)</option>
              <option value="female-shaonv">female-shaonv (少女)</option>
              <option value="female-shaonv-excited">female-shaonv-excited (活泼少女)</option>
              <option value="male-boli">male-boli (博士)</option>
              <option value="male-yifu">male-yifu (御姐)</option>
              <option value="male-wenrou">male-wenrou (温柔男声)</option>
              <option value="female-tianhong">female-tianhong (甜美女声)</option>
              <option value="male-zhuge">male-zhuge (主播)</option>
            </select>
          </div>
        </div>

        {/* Speed + Volume + Pitch */}
        <div className="grid grid-cols-3 gap-4">
          {/* Speed */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {t.speechSpeed}
              </span>
            </label>
            <input
              type="number"
              min="0.5"
              max="2.0"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value) || 1)}
              className="w-full px-4 py-3 bg-slate-50/50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 text-slate-800 dark:text-white text-sm cursor-pointer transition-all duration-200 input-focus"
            />
          </div>

          {/* Volume */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
                {t.speechVolume || 'Volume'}
              </span>
            </label>
            <input
              type="number"
              min="0.1"
              max="10.0"
              step="0.1"
              value={vol}
              onChange={(e) => setVol(parseFloat(e.target.value) || 1)}
              className="w-full px-4 py-3 bg-slate-50/50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 text-slate-800 dark:text-white text-sm cursor-pointer transition-all duration-200 input-focus"
            />
          </div>

          {/* Pitch */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M3 12h18M3 18h18" />
                </svg>
                {t.speechPitch || 'Pitch'}
              </span>
            </label>
            <input
              type="number"
              min="-12"
              max="12"
              step="1"
              value={pitch}
              onChange={(e) => setPitch(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 bg-slate-50/50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 text-slate-800 dark:text-white text-sm cursor-pointer transition-all duration-200 input-focus"
            />
          </div>
        </div>

        {/* Emotion */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t.speechEmotion}
            </span>
          </label>
          <select
            value={emotion}
            onChange={(e) => setEmotion(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50/50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 text-slate-800 dark:text-white text-sm cursor-pointer transition-all duration-200 input-focus"
          >
            <option value="happy">happy</option>
            <option value="sad">sad</option>
            <option value="angry">angry</option>
            <option value="fearful">fearful</option>
            <option value="disgusted">disgusted</option>
            <option value="surprised">surprised</option>
            <option value="neutral">neutral</option>
          </select>
        </div>

        {/* Output Format */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
              {t.speechOutputFormat}
            </span>
          </label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50/50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 text-slate-800 dark:text-white text-sm cursor-pointer transition-all duration-200 input-focus"
          >
            <option value="mp3">mp3</option>
            <option value="pcm">pcm</option>
            <option value="flac">flac</option>
            <option value="wav">wav</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-cyan-500/30 disabled:shadow-none disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(135deg, #06b6d4, #2563eb)' }}
        >
          {loading ? (
            <>
              <div className="spinner w-5 h-5"></div>
              <span>{t.generating || 'Generating...'}</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              <span>{t.generateSpeech}</span>
            </>
          )}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div className="mt-5 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl animate-fade-in">
          <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </p>
        </div>
      )}

      {/* Results */}
      {audioUrl && (
        <div className="mt-8 animate-fade-in">
          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Audio
          </h3>
          <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border border-cyan-200 dark:border-cyan-800/50 rounded-xl">
            <audio src={audioUrl} controls className="w-full" />
          </div>
        </div>
      )}
    </div>
  );
}
