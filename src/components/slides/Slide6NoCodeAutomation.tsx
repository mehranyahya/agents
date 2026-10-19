import React from 'react';
import { Mail, BrainCircuit, CalendarCheck2, ArrowLeft, ShieldCheck, Workflow, AlertCircle, ExternalLink } from 'lucide-react';

interface SlideProps {
  theme: 'dark' | 'light';
  isFullscreen?: boolean;
}

const STEPS = [
  { number: '۱', title: 'ایمیل استاد می‌رسد', detail: 'دریافت پیام جدید', icon: Mail, tone: 'cyan' },
  { number: '۲', title: 'هوش مصنوعی بررسی می‌کند', detail: 'تکلیف و مهلت تحویل را پیدا می‌کند', icon: BrainCircuit, tone: 'violet' },
  { number: '۳', title: 'یادآور ساخته می‌شود', detail: 'فقط بعد از بررسی و تأیید کاربر', icon: CalendarCheck2, tone: 'emerald' },
] as const;

export const Slide6NoCodeAutomation: React.FC<SlideProps> = ({ theme, isFullscreen }) => {
  const isDark = theme === 'dark';
  const cardBase = isDark
    ? 'bg-slate-900/85 border-slate-700/90 text-slate-100'
    : 'bg-white border-slate-200 text-slate-900';

  const tones = {
    cyan: isDark ? 'bg-cyan-500/15 text-cyan-300' : 'bg-cyan-50 text-cyan-800',
    violet: isDark ? 'bg-violet-500/15 text-violet-300' : 'bg-violet-50 text-violet-800',
    emerald: isDark ? 'bg-emerald-500/15 text-emerald-300' : 'bg-emerald-50 text-emerald-800',
  };

  return (
    <div className={`h-full flex flex-col justify-between select-none ${isFullscreen ? 'py-3 px-7 md:px-9' : 'py-3 px-6'}`}>
      <header className="shrink-0">
        <div className="flex items-center justify-between mb-1">
          <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${isDark ? 'bg-cyan-500/10 text-cyan-300' : 'bg-blue-50 text-blue-700'}`}>
            اسلاید ۷ • موضوع پیشنهادی استاد
          </span>
        </div>
        <h2 className={`font-extrabold tracking-tight ${isFullscreen ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'} ${isDark ? 'text-white' : 'text-slate-900'}`}>
          خودکارسازی کارها بدون کدنویسی
        </h2>
        <p className="text-sm mt-1 text-slate-400">یک مثال دانشجویی؛ از ایمیل استاد تا یادآور تکلیف</p>
      </header>

      <main className="flex-1 min-h-0 flex flex-col justify-center gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold ${isDark ? 'bg-slate-900/80 border-cyan-500/30 text-cyan-300' : 'bg-blue-50 border-blue-200 text-blue-800'}`}>
            <Workflow className="w-5 h-5 shrink-0" />
            <span>یک جریان کار با سه مرحله</span>
          </div>
          <span className={`text-xs font-semibold rounded-lg px-2.5 py-1.5 ${isDark ? 'bg-amber-500/10 text-amber-300' : 'bg-amber-50 text-amber-800'}`}>
            سناریوی پیشنهادی؛ اجرای زنده نیست
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 items-stretch" aria-label="مراحل نمونه خودکارسازی دانشجویی">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <article key={step.number} className={`min-w-0 rounded-2xl border p-4 flex flex-col items-center justify-center text-center gap-2 shadow-sm ${cardBase}`}>
                <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center ${tones[step.tone]}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="font-bold text-sm leading-snug">{step.number}. {step.title}</div>
                <p className="text-xs opacity-80 leading-relaxed">{step.detail}</p>
              </article>
            );
          })}
        </div>

        <div className={`rounded-2xl border px-4 py-3 flex flex-wrap gap-3 items-center justify-between ${isDark ? 'bg-slate-900/80 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
          <div className="flex items-start gap-2 flex-1 min-w-0">
            <ShieldCheck className="w-5 h-5 mt-0.5 shrink-0 text-emerald-400" />
            <span className="text-sm leading-relaxed">
              <strong>فرق مهم:</strong> اتصال چند مرحله، خودکارسازی است؛ اگر سیستم لازم باشد متن را بفهمد و بر اساس آن تصمیم بگیرد، از هوش مصنوعی هم کمک می‌گیریم.
            </span>
          </div>
        </div>
      </main>

      <footer className={`shrink-0 flex flex-wrap items-center justify-between gap-2 rounded-xl border p-2.5 ${isDark ? 'bg-slate-900/70 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'}`}>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold">نمونه ابزارها:</span>
          <a href="https://www.make.com/en/ai-agents" target="_blank" rel="noopener noreferrer" className="font-bold text-cyan-400 hover:underline inline-flex items-center gap-1">Make <ExternalLink className="w-3 h-3"/></a>
          <span className="opacity-50">|</span>
          <a href="https://n8n.io/" target="_blank" rel="noopener noreferrer" className="font-bold text-cyan-400 hover:underline inline-flex items-center gap-1">n8n <ExternalLink className="w-3 h-3"/></a>
        </div>
        <div className="inline-flex items-center gap-1.5 text-xs text-amber-400">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>ورود به ایمیل و ثبت یادآور نیازمند دسترسی مجاز است.</span>
        </div>
      </footer>
    </div>
  );
};
