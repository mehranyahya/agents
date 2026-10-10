import React, { useState, useEffect } from 'react';
import { Brain, Cog, Eye, RotateCw, Play, Pause, ChevronRight } from 'lucide-react';

interface SlideProps {
  theme: 'dark' | 'light';
  isFullscreen?: boolean;
}

const LOOP_STEPS = [
  {
    key: 'decide_1',
    phase: 'Decide',
    icon: Brain,
    color: 'cyan',
    title: '۱. تصمیم‌گیری (Decide)',
    desc: '«باید پروازهای جمعه را با سرویس رزرو جستجو کنم.»',
    action: 'درخواست اجرای ابزار',
  },
  {
    key: 'act_1',
    phase: 'Act',
    icon: Cog,
    color: 'amber',
    title: '۲. اقدام (Act)',
    desc: 'فراخوانی ابزار search_flights(day: "Friday")',
    action: 'اجرای ابزار جست‌وجو',
  },
  {
    key: 'observe_1',
    phase: 'Observe',
    icon: Eye,
    color: 'emerald',
    title: '۳. مشاهده نتیجه (Observe)',
    desc: 'دریافت پاسخ سرور: «۱۲ پرواز با قیمت‌های مختلف یافت شد.»',
    action: 'دریافت نتیجه ابزار',
  },
  {
    key: 'repeat_1',
    phase: 'Repeat',
    icon: RotateCw,
    color: 'indigo',
    title: '۴. تکرار و تصمیم بعدی (Repeat)',
    desc: '«حالا ارزان‌ترین گزینه‌ها را مقایسه و به کاربر پیشنهاد می‌کنم.»',
    action: 'تکرار تا رسیدن به نتیجه',
  },
];

export const Slide3AgentLoop: React.FC<SlideProps> = ({ theme, isFullscreen }) => {
  const isDark = theme === 'dark';
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % LOOP_STEPS.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div
      className={`h-full flex flex-col justify-between select-none ${
        isFullscreen ? 'py-6 px-10 md:px-14' : 'py-3 px-6'
      }`}
    >
      {/* Slide Header */}
      <div>
        <div className="flex items-center justify-between text-xs mb-1">
          <span
            className={`px-2.5 py-0.5 rounded-full font-mono font-medium ${
              isDark ? 'bg-cyan-500/10 text-cyan-400' : 'bg-blue-50 text-blue-700'
            }`}
          >
            اسلاید ۴ • سازوکار تکرار
          </span>
          <span className="text-xs text-slate-400 font-mono">زمان: ۰:۵۵</span>
        </div>
        <h2
          className={`font-extrabold tracking-tight ${
            isFullscreen ? 'text-4xl md:text-5xl lg:text-6xl mb-1' : 'text-3xl md:text-4xl'
          } ${isDark ? 'text-white' : 'text-slate-900'}`}
        >
          Agent Loop: چرخه خودکار تصمیم تا اقدام
        </h2>
      </div>

      {/* Center Formula Box */}
      <div
        className={`my-2 p-2.5 rounded-xl border text-center font-mono text-sm md:text-base font-bold shadow-sm ${
          isDark
            ? 'bg-slate-900/90 border-cyan-500/40 text-cyan-300'
            : 'bg-white border-blue-200 text-blue-900'
        }`}
      >
        <span className="text-slate-400 text-xs mr-2 font-sans font-normal">فرمول حلقه:</span>
        <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400">Goal</span>
        <span className="mx-2 text-slate-500">➔</span>
        <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400">Decide</span>
        <span className="mx-2 text-slate-500">➔</span>
        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">Act</span>
        <span className="mx-2 text-slate-500">➔</span>
        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">Observe</span>
        <span className="mx-2 text-slate-500">➔</span>
        <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400">Repeat</span>
      </div>

      {/* Main Interactive Stage: Circle + Concrete Example */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 my-auto items-center">
        {/* Loop Diagram & Steps (7 cols) */}
        <div className="md:col-span-7 space-y-2">
          {LOOP_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <div
                key={step.key}
                onClick={() => setActiveStep(idx)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isActive
                    ? isDark
                      ? 'bg-cyan-950/40 border-cyan-400 text-cyan-100 shadow-md ring-1 ring-cyan-500/40'
                      : 'bg-blue-50 border-blue-500 text-blue-950 shadow-md ring-1 ring-blue-500/30'
                    : isDark
                    ? 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-800/40'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isActive
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : isDark
                        ? 'bg-slate-800 text-slate-400'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm">{step.title}</div>
                    <div className="text-xs opacity-80 font-mono mt-0.5">{step.desc}</div>
                  </div>
                </div>

                <div className="text-left shrink-0">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-mono font-medium ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        : 'text-slate-500'
                    }`}
                  >
                    {step.action}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Example Terminal / Status Box (5 cols) */}
        <div
          className={`md:col-span-5 p-4 rounded-2xl border flex flex-col justify-between h-full ${
            isDark
              ? 'bg-slate-900/90 border-slate-800 text-slate-200'
              : 'bg-slate-50 border-slate-200 text-slate-800'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-700/50">
              <span className="text-xs font-bold text-cyan-400">سناریوی واقعی: رزرو پرواز</span>
              <span className="text-[10px] font-mono text-slate-400">Flight Agent Demo</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2 rounded bg-slate-950/60 border border-slate-800 font-mono text-slate-300">
                <span className="text-cyan-400 font-bold block mb-0.5">🎯 هدف کاربر:</span>
                «ارزان‌ترین پرواز جمعه را پیدا کن.»
              </div>

              <div
                className={`p-2.5 rounded-lg border font-mono text-xs transition-all ${
                  isDark ? 'bg-cyan-950/30 border-cyan-500/30 text-cyan-200' : 'bg-white border-blue-200 text-blue-900'
                }`}
              >
                <div className="text-[10px] uppercase font-bold text-cyan-400 mb-1">
                  وضعیت گام جاری:
                </div>
                <div className="font-bold">{LOOP_STEPS[activeStep].title}</div>
                <div className="text-[11px] opacity-80 mt-1">{LOOP_STEPS[activeStep].desc}</div>
              </div>
            </div>
          </div>

          {/* Interactive Controls */}
          <div className="mt-4 pt-3 border-t border-slate-700/50 flex items-center justify-between">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isPlaying
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'توقف پخش' : 'اجرای زنده چرخه'}</span>
            </button>

            <button
              onClick={() => setActiveStep((prev) => (prev + 1) % LOOP_STEPS.length)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>گام بعدی</span>
              <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Takeaway */}
      <div
        className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
          isDark
            ? 'bg-slate-900/60 border-slate-800 text-slate-400'
            : 'bg-slate-100 border-slate-200 text-slate-600'
        }`}
      >
        چرخه تا زمانی تکرار می‌شود که مدل به شرط خروج (ارضای هدف یا رسیدن به سقف مراحل مجاز) برسد.
      </div>
    </div>
  );
};
