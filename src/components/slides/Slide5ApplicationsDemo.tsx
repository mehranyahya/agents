import React, { useState } from 'react';
import {
  Code2,
  Search,
  Headphones,
  BarChart2,
  CalendarDays,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  FileCode,
  Image as ImageIcon,
  Cpu
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SlideProps {
  theme: 'dark' | 'light';
  isFullscreen?: boolean;
}

const USE_CASES = [
  {
    icon: Code2,
    title: 'برنامه‌نویسی',
    color: 'emerald',
    steps: 'پیدا کردن خطا ← اصلاح کد ← تست',
  },
  {
    icon: Search,
    title: 'پژوهش',
    color: 'sky',
    steps: 'جست‌وجو ← مقایسه منابع ← گزارش',
  },
  {
    icon: Headphones,
    title: 'پشتیبانی مشتری',
    color: 'amber',
    steps: 'خواندن درخواست ← بررسی سفارش',
  },
  {
    icon: BarChart2,
    title: 'تحلیل داده',
    color: 'indigo',
    steps: 'خواندن داده ← تحلیل ← نمودار',
  },
  {
    icon: CalendarDays,
    title: 'دستیار شخصی',
    color: 'rose',
    steps: 'ایمیل ← تقویم ← پیگیری کارها',
  },
];

export const Slide5ApplicationsDemo: React.FC<SlideProps> = ({ theme, isFullscreen }) => {
  const isDark = theme === 'dark';

  // Demo simulator state
  const [demoStep, setDemoStep] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'interactive' | 'backup_snapshots'>('interactive');

  // Trigger next step in coding agent simulation
  const nextStep = () => {
    if (demoStep === 4) {
      // celebrate
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch (e) {}
    }
    setDemoStep((prev) => (prev < 5 ? prev + 1 : 0));
  };

  const resetDemo = () => setDemoStep(0);

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
            اسلاید ۶ • کاربردها و دمو زنده
          </span>
          <span className="text-xs text-slate-400 font-mono">زمان: ۱:۰۰</span>
        </div>
        <h2
          className={`font-extrabold tracking-tight ${
            isFullscreen ? 'text-4xl md:text-5xl lg:text-6xl mb-1' : 'text-3xl md:text-4xl'
          } ${isDark ? 'text-white' : 'text-slate-900'}`}
        >
          کاربردهای واقعی Agent + شبیه‌سازی
        </h2>
      </div>

      {/* 5 Compact Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 my-2">
        {USE_CASES.map((uc) => {
          const Icon = uc.icon;
          return (
            <div
              key={uc.title}
              className={`p-3 rounded-xl border flex flex-col justify-between transition-all ${
                isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="p-1 rounded-lg bg-slate-800 text-cyan-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-xs">{uc.title}</h3>
                </div>
                <div className="text-[10px] opacity-75 font-mono leading-relaxed">{uc.steps}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Demo Section */}
      <div
        className={`p-3.5 rounded-2xl border flex-1 flex flex-col justify-between overflow-hidden shadow-lg ${
          isDark
            ? 'bg-slate-900/90 border-cyan-500/30 text-slate-200'
            : 'bg-white border-blue-200 text-slate-800'
        }`}
      >
        {/* Demo Header Bar */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold text-cyan-400 font-mono">
              شبیه‌سازی تعاملی: ایجنتِ رفع خطای کد
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'interactive' ? 'backup_snapshots' : 'interactive')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono border transition-all ${
                viewMode === 'backup_snapshots'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              <ImageIcon className="w-3 h-3" />
              <span>{viewMode === 'backup_snapshots' ? 'حالت تعاملی' : 'اسکرین‌شات‌های پشتیبان'}</span>
            </button>
          </div>
        </div>

        {viewMode === 'interactive' ? (
          /* Interactive Coding Agent Runner */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 my-auto items-center py-1">
            {/* Steps Visualizer */}
            <div className="md:col-span-4 space-y-1.5 text-xs font-mono">
              <div
                className={`p-2 rounded-lg border flex items-center justify-between ${
                  demoStep >= 1
                    ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-200'
                    : 'bg-slate-950/40 border-slate-800 opacity-60'
                }`}
              >
                <span>1. Read File (`auth.ts`)</span>
                {demoStep >= 1 && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
              </div>

              <div
                className={`p-2 rounded-lg border flex items-center justify-between ${
                  demoStep >= 2
                    ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                    : 'bg-slate-950/40 border-slate-800 opacity-60'
                }`}
              >
                <span>2. Run Test (`npm test`)</span>
                {demoStep >= 2 && <XCircle className="w-3.5 h-3.5 text-red-400" />}
              </div>

              <div
                className={`p-2 rounded-lg border flex items-center justify-between ${
                  demoStep >= 3
                    ? 'bg-red-950/40 border-red-500/50 text-red-200'
                    : 'bg-slate-950/40 border-slate-800 opacity-60'
                }`}
              >
                <span>3. Observe Error (Failed)</span>
                {demoStep >= 3 && <span className="text-[10px] text-red-400 font-bold">1 FAILED</span>}
              </div>

              <div
                className={`p-2 rounded-lg border flex items-center justify-between ${
                  demoStep >= 4
                    ? 'bg-indigo-950/40 border-indigo-500/50 text-indigo-200'
                    : 'bg-slate-950/40 border-slate-800 opacity-60'
                }`}
              >
                <span>4. Edit Code (Patch Logic)</span>
                {demoStep >= 4 && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />}
              </div>

              <div
                className={`p-2 rounded-lg border flex items-center justify-between ${
                  demoStep >= 5
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200 ring-1 ring-emerald-500'
                    : 'bg-slate-950/40 border-slate-800 opacity-60'
                }`}
              >
                <span>5. Run Again ➔ PASSED ✓</span>
                {demoStep >= 5 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </div>
            </div>

            {/* Terminal Window */}
            <div className="md:col-span-8 bg-slate-950 rounded-xl p-3 border border-slate-800 font-mono text-[11px] text-slate-300 min-h-[140px] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-slate-500 mb-2 border-b border-slate-800 pb-1">
                  <span className="w-2 h-2 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-2 h-2 rounded-full bg-green-500/80 inline-block" />
                  <span className="text-[10px] mr-2">bash - agent_sandbox</span>
                </div>

                {demoStep === 0 && (
                  <div className="text-slate-400 py-4 text-center">
                    مأموریت تعیین شد: «تست ناموفق محاسبه تخفیف را اصلاح کن.»
                    <div className="text-cyan-400 mt-2">روی دکمه «گام بعدی شبیه‌سازی» کلیک کنید...</div>
                  </div>
                )}

                {demoStep === 1 && (
                  <div className="text-cyan-300">
                    <span className="text-slate-500">$ agent:</span> reading src/discount.ts
                    <br />
                    <span className="text-slate-400">&gt; File contents loaded (24 lines).</span>
                  </div>
                )}

                {demoStep === 2 && (
                  <div>
                    <span className="text-slate-500">$ npm test</span>
                    <div className="text-amber-300 mt-1">RUNS  tests/discount.test.ts</div>
                  </div>
                )}

                {demoStep === 3 && (
                  <div className="text-red-400">
                    <span className="text-red-500 font-bold">FAIL</span> tests/discount.test.ts
                    <br />
                    <span>● testDiscount &gt; expected $80, but received $100</span>
                    <br />
                    <span className="text-slate-400 text-[10px]">
                      Observation: Rate calculation logic omitted percentage subtraction.
                    </span>
                  </div>
                )}

                {demoStep === 4 && (
                  <div className="text-indigo-300">
                    <span className="text-slate-500">$ agent:</span> patch src/discount.ts
                    <div className="text-emerald-400 text-[10px] mt-1">
                      + return price * (1 - rate / 100);
                    </div>
                  </div>
                )}

                {demoStep === 5 && (
                  <div className="text-emerald-400 font-bold">
                    <span className="text-slate-500">$ npm test -- --run</span>
                    <br />
                    <span>✓ tests/discount.test.ts (4 passed, 4 total)</span>
                    <br />
                    <span className="text-cyan-300 text-[10px] font-normal">
                      Task completed successfully in 2 loop iterations!
                    </span>
                  </div>
                )}
              </div>

              {/* Step Controls */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800 mt-2">
                <button
                  onClick={nextStep}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{demoStep === 5 ? 'شروع مجدد دمو' : 'گام بعدی شبیه‌سازی'}</span>
                </button>

                <button
                  onClick={resetDemo}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>ریست</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Backup Snapshots (If video/demo issues in presentation) */
          <div className="grid grid-cols-3 gap-3 my-auto py-1">
            <div className="p-2.5 rounded-xl border border-slate-800 bg-slate-950 font-mono text-[10px]">
              <div className="text-amber-400 font-bold mb-1">۱. گام Act (اجرای تست)</div>
              <div className="p-2 rounded bg-slate-900 text-slate-300">
                $ npm test
                <br />
                Executing test suite...
              </div>
            </div>

            <div className="p-2.5 rounded-xl border border-slate-800 bg-slate-950 font-mono text-[10px]">
              <div className="text-red-400 font-bold mb-1">۲. گام Observe (نمایش Error)</div>
              <div className="p-2 rounded bg-slate-900 text-red-300">
                FAIL: expected 80, got 100
                <br />
                Agent analyzes stacktrace.
              </div>
            </div>

            <div className="p-2.5 rounded-xl border border-slate-800 bg-slate-950 font-mono text-[10px]">
              <div className="text-emerald-400 font-bold mb-1">۳. گام Act Again (اصلاح + Passed)</div>
              <div className="p-2 rounded bg-slate-900 text-emerald-300">
                Edit applied ➔ Test Passed ✓
                <br />
                All checks successful.
              </div>
            </div>
          </div>
        )}

        <div className="text-[10px] text-center text-slate-400 pt-1">
          این دمو نحوه همگرایی حلقه Decide ➔ Act ➔ Observe را در حل مسائل نرم‌افزاری نمایش می‌دهد.
        </div>
      </div>
    </div>
  );
};
