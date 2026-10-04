import React, { useState } from 'react';
import { AlertTriangle, RefreshCw, Compass, ShieldOff, CheckSquare, ShieldCheck, UserCheck, Layers } from 'lucide-react';

interface SlideProps {
  theme: 'dark' | 'light';
  isFullscreen?: boolean;
}

export const Slide6CompoundingErrors: React.FC<SlideProps> = ({ theme, isFullscreen }) => {
  const isDark = theme === 'dark';

  // Interactive slider for step accuracy p
  const [stepAccuracy, setStepAccuracy] = useState<number>(0.95);

  const calcSuccess = (n: number) => Math.round(Math.pow(stepAccuracy, n) * 100);

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
              isDark ? 'bg-red-500/10 text-red-400' : 'bg-red-50 text-red-700'
            }`}
          >
            اسلاید ۶ • فنی‌ترین بخش: خطاهای زنجیره‌ای
          </span>
          <span className="text-xs text-slate-400 font-mono">زمان: ۲:۰۰</span>
        </div>
        <h2
          className={`font-extrabold tracking-tight ${
            isFullscreen ? 'text-3xl md:text-4xl lg:text-5xl mb-1' : 'text-2xl md:text-3xl'
          } ${isDark ? 'text-white' : 'text-slate-900'}`}
        >
          Agent قدرتمند است؛ اما هر قدم می‌تواند اشتباه باشد
        </h2>
      </div>

      {/* 4 Risk Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 my-2">
        <div
          className={`p-2.5 rounded-xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center gap-1.5 text-red-400 font-bold text-xs mb-1">
            <AlertTriangle className="w-4 h-4" />
            <span>Hallucination</span>
          </div>
          <p className="text-[11px] opacity-75">اطلاعات اشتباه یا ناموجود تولید می‌کند.</p>
        </div>

        <div
          className={`p-2.5 rounded-xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs mb-1">
            <RefreshCw className="w-4 h-4" />
            <span>Infinite Loop</span>
          </div>
          <p className="text-[11px] opacity-75">در تکرار یک دستور ناموفق گیر می‌کند.</p>
        </div>

        <div
          className={`p-2.5 rounded-xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center gap-1.5 text-sky-400 font-bold text-xs mb-1">
            <Compass className="w-4 h-4" />
            <span>Goal Drift</span>
          </div>
          <p className="text-[11px] opacity-75">به تدریج از مأموریت و هدف اصلی منحرف می‌شود.</p>
        </div>

        <div
          className={`p-2.5 rounded-xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center gap-1.5 text-purple-400 font-bold text-xs mb-1">
            <ShieldOff className="w-4 h-4" />
            <span>Prompt Injection</span>
          </div>
          <p className="text-[11px] opacity-75">محتوای خارجی کنترل و منطق عامل را فریب می‌دهد.</p>
        </div>
      </div>

      {/* Central Formula & Compounding Error Table */}
      <div
        className={`p-4 rounded-2xl border my-auto transition-all ${
          isDark
            ? 'bg-slate-900/90 border-slate-800 text-slate-200'
            : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          {/* Formula Display (6 cols) */}
          <div className="md:col-span-6 text-center md:text-right">
            <div className="text-xs text-slate-400 mb-1 font-mono">قانون خطای فزاینده (Compounding Error):</div>
            <div
              className={`inline-block px-6 py-3 rounded-2xl border-2 font-mono text-2xl md:text-3xl font-black ${
                isDark
                  ? 'bg-slate-950 border-red-500/50 text-red-400 shadow-lg shadow-red-950/40'
                  : 'bg-red-50 border-red-300 text-red-700'
              }`}
            >
              P(Success) = p<sup>n</sup>
            </div>

            <div className="mt-2 text-xs text-slate-300">
              فرض کنیم احتمال موفقیت هر مرحله منفرد:
              <span className="font-mono font-bold text-cyan-400 mx-1.5">
                p = {(stepAccuracy * 100).toFixed(0)}%
              </span>
            </div>

            {/* Subtle interactive slider */}
            <div className="mt-2 flex items-center gap-2 max-w-xs">
              <span className="text-[10px] text-slate-400 font-mono">تغییر p:</span>
              <input
                type="range"
                min="0.80"
                max="0.99"
                step="0.01"
                value={stepAccuracy}
                onChange={(e) => setStepAccuracy(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            <div className="mt-2 text-[10px] text-amber-400/90">
              ⚠️ مدل ساده‌شده با فرض استقلال مراحل (برای درک اثر تجمعی خطاها)
            </div>
          </div>

          {/* Table (6 cols) */}
          <div className="md:col-span-6">
            <table className="w-full text-center text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-slate-700/60 text-slate-400">
                  <th className="py-1.5 font-sans">تعداد مراحل (n)</th>
                  <th className="py-1.5 font-sans">شانس موفقیت نهایی</th>
                  <th className="py-1.5 font-sans">ریسک شکست</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr>
                  <td className="py-1.5 font-bold">۵ مرحله</td>
                  <td className="py-1.5 text-emerald-400 font-black">{calcSuccess(5)}%</td>
                  <td className="py-1.5 text-slate-400">{100 - calcSuccess(5)}%</td>
                </tr>
                <tr className="bg-slate-800/20">
                  <td className="py-1.5 font-bold">۱۰ مرحله</td>
                  <td className="py-1.5 text-amber-400 font-black">{calcSuccess(10)}%</td>
                  <td className="py-1.5 text-slate-400">{100 - calcSuccess(10)}%</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-bold">۲۰ مرحله</td>
                  <td className="py-1.5 text-red-400 font-black">{calcSuccess(20)}%</td>
                  <td className="py-1.5 text-red-300 font-bold">{100 - calcSuccess(20)}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Engineering Guardrails */}
      <div
        className={`p-3 rounded-2xl border transition-all ${
          isDark
            ? 'bg-slate-900/60 border-slate-800 text-slate-200'
            : 'bg-slate-50 border-slate-200 text-slate-800'
        }`}
      >
        <div className="text-[11px] font-bold text-emerald-400 mb-1.5">
          راه‌حل‌های مهندسی برای مهار خطاهای عاملی:
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-950/40 border border-slate-800">
            <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>تأیید انسان (Human Approval)</span>
          </div>
          <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-950/40 border border-slate-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>دسترسی حداقلی (Least Privilege)</span>
          </div>
          <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-950/40 border border-slate-800">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>محدودیت مراحل (Step Limits)</span>
          </div>
          <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-950/40 border border-slate-800">
            <CheckSquare className="w-3.5 h-3.5 text-indigo-400" />
            <span>بررسی خروجی (Verification)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
