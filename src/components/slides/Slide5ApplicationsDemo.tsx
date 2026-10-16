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
  ExternalLink,
  Cpu
} from 'lucide-react';

interface SlideProps {
  theme: 'dark' | 'light';
  isFullscreen?: boolean;
}

const USE_CASES = [
  {
    icon: Code2,
    title: 'برنامه‌نویسی',
    color: 'emerald',
    steps: 'رفع خطا و آزمون',
  },
  {
    icon: Search,
    title: 'پژوهش',
    color: 'sky',
    steps: 'پژوهش و گزارش',
  },
  {
    icon: Headphones,
    title: 'پشتیبانی',
    color: 'amber',
    steps: 'رسیدگی به درخواست',
  },
  {
    icon: BarChart2,
    title: 'تحلیل داده',
    color: 'indigo',
    steps: 'تحلیل و نمودار',
  },
  {
    icon: CalendarDays,
    title: 'کارهای شخصی',
    color: 'rose',
    steps: 'ایمیل و تقویم',
  },
];

export const Slide5ApplicationsDemo: React.FC<SlideProps> = ({ theme, isFullscreen }) => {
  const isDark = theme === 'dark';

  // Demo simulator state
  const [demoStep, setDemoStep] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'interactive' | 'real_trace' | 'backup_snapshots'>('interactive');

  // Trigger next step in coding agent simulation
  const nextStep = () => {
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
            اسلاید ۶ • کاربردها و شبیه‌سازی
          </span>
        </div>
        <h2
          className={`font-extrabold tracking-tight ${
            isFullscreen ? 'text-4xl md:text-5xl lg:text-6xl mb-1' : 'text-3xl md:text-4xl'
          } ${isDark ? 'text-white' : 'text-slate-900'}`}
        >
          یک ایجنت چطور خطا را رفع می‌کند؟
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
                <div className="text-xs opacity-75 font-mono leading-relaxed">{uc.steps}</div>
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
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/40" />
            <span className="font-bold text-cyan-400 font-mono">
              {viewMode === 'real_trace' ? 'سند ثبت‌شده SWE-agent • اجرای واقعی در گذشته' : 'شبیه‌سازی آموزشی رفع خطا • بدون اجرای زنده کد'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setViewMode('interactive')}
              aria-pressed={viewMode === 'interactive'}
              className={`px-2 py-1 rounded-lg border text-xs font-medium ${viewMode === 'interactive'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'bg-slate-800 border-slate-700 text-slate-300'}`}
            >شبیه‌سازی</button>
            <button
              type="button"
              onClick={() => setViewMode('real_trace')}
              aria-pressed={viewMode === 'real_trace'}
              className={`px-2 py-1 rounded-lg border text-xs font-medium ${viewMode === 'real_trace'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-800 border-slate-700 text-slate-300'}`}
            >سند اجرای واقعی</button>
            <button
              type="button"
              onClick={() => setViewMode('backup_snapshots')}
              aria-pressed={viewMode === 'backup_snapshots'}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-xs font-medium ${viewMode === 'backup_snapshots'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800 border-slate-700 text-slate-300'}`}
            ><ImageIcon className="w-3 h-3" />خلاصه پشتیبان</button>
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
                <span>1. Read File (`discount.ts`)</span>
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
                {demoStep >= 3 && <span className="text-xs text-red-400 font-bold">1 FAILED</span>}
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
                <span>5. Test Again ➔ PASSED ✓</span>
                {demoStep >= 5 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </div>
            </div>

            {/* Terminal Window */}
            <div className="md:col-span-8 bg-slate-950 rounded-xl p-3 border border-slate-800 font-mono text-xs text-slate-300 min-h-[140px] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-slate-500 mb-2 border-b border-slate-800 pb-1">
                  <span className="w-2 h-2 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-2 h-2 rounded-full bg-green-500/80 inline-block" />
                  <span className="text-xs mr-2">bash - agent_sandbox</span>
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
                    <span className="text-slate-400 text-xs">
                      Observation: Rate calculation logic omitted percentage subtraction.
                    </span>
                  </div>
                )}

                {demoStep === 4 && (
                  <div className="text-indigo-300">
                    <span className="text-slate-500">$ agent:</span> patch src/discount.ts
                    <div className="text-emerald-400 text-xs mt-1">
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
                    <span className="text-cyan-300 text-xs font-normal">
                      Demo completed: test passed after the fix.
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
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-white"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>ریست</span>
                </button>
              </div>
            </div>
          </div>
        ) : viewMode === 'real_trace' ? (
          /* Faithful excerpts of a publicly published SWE-agent tool-call trajectory.
             This is a recorded past execution, not live code execution in the browser. */
          <div className="my-auto flex flex-col gap-2.5 py-1" aria-label="سند اجرای واقعی SWE-agent">
            <p className="text-xs leading-relaxed text-slate-300">
              گزیده ثبت واقعی ابزارهای <strong className="text-emerald-300">SWE-agent</strong> برای رفع
              خطای SyntaxError در <span dir="ltr" className="font-mono text-cyan-300">tests/missing_colon.py</span>.
              این یک ردگیری منتشرشده است؛ اجرای زنده این اسلاید نیست.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-950 border border-slate-700 p-3 space-y-2">
                <div className="text-emerald-300 font-semibold text-xs">۱. پیدا کردن، خواندن و اصلاح فایل</div>
                <pre dir="ltr" className="text-left text-xs text-slate-300 font-mono whitespace-pre-wrap break-all">{`find_file missing_colon.py
open "tests/missing_colon.py"`}</pre>
                <pre dir="ltr" className="text-left text-xs text-amber-200 font-mono whitespace-pre-wrap break-all">{`- def division(a: float, b: float) -> float
+ def division(a: float, b: float) -> float:`}</pre>
              </div>
              <div className="rounded-xl bg-slate-950 border border-emerald-700/50 p-3 space-y-2">
                <div className="text-emerald-300 font-semibold text-xs">۲. اجرای Python، مشاهده خروجی و پایان</div>
                <pre dir="ltr" className="text-left text-xs text-slate-300 font-mono whitespace-pre-wrap">{`$ python tests/missing_colon.py
8.2
$ submit`}</pre>
                <p className="text-xs text-slate-400 leading-relaxed">
                  خروجی 8.2 واقعاً در ردگیری ابزار ثبت شده است؛ این یک اجرای فایل است، نه مدرک پاس‌شدن مجموعه‌تست.
                </p>
              </div>
            </div>
            <a
              href="https://github.com/SWE-agent/SWE-agent/blob/main/trajectories/demonstrations/function_calling_simple.traj"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 underline underline-offset-2 hover:text-cyan-100"
            >
              مشاهده فایل ردگیری اصلی SWE-agent در GitHub
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ) : (
          /* Backup textual states of the simulated discount example; not screenshots or a tool trace. */
          <div className="grid grid-cols-3 gap-3 my-auto py-1">
            <div className="p-2.5 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs">
              <div className="text-amber-400 font-bold mb-1">۱. گام Act (اجرای تست)</div>
              <div className="p-2 rounded bg-slate-900 text-slate-300">
                $ npm test
                <br />
                Executing test suite...
              </div>
            </div>

            <div className="p-2.5 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs">
              <div className="text-red-400 font-bold mb-1">۲. گام Observe (نمایش Error)</div>
              <div className="p-2 rounded bg-slate-900 text-red-300">
                FAIL: expected 80, got 100
                <br />
                Agent analyzes stacktrace.
              </div>
            </div>

            <div className="p-2.5 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs">
              <div className="text-emerald-400 font-bold mb-1">۳. گام Act Again (اصلاح + Passed)</div>
              <div className="p-2 rounded bg-slate-900 text-emerald-300">
                Edit applied ➔ Test Passed ✓
                <br />
                All checks successful.
              </div>
            </div>
          </div>
        )}

        <div className="text-xs text-center text-slate-400 pt-1">
          {viewMode === 'real_trace' ? 'این قسمت یک اجرای ثبت‌شده واقعی را نقل می‌کند؛ دموی تخفیفِ کنار آن همچنان شبیه‌سازی است.' : 'نکته اصلی: پس از دیدن نتیجه ناموفق، مسیر اصلاح و آزمون دوباره آغاز می‌شود.'}
        </div>
      </div>
    </div>
  );
};
