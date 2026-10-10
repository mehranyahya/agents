import React from 'react';
import { Target, Cpu, ShieldCheck, Sparkles } from 'lucide-react';

interface SlideProps {
  theme: 'dark' | 'light';
  isFullscreen?: boolean;
}

export const Slide8Summary: React.FC<SlideProps> = ({ theme, isFullscreen }) => {
  const isDark = theme === 'dark';

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
            اسلاید ۱۰ • جمع‌بندی نهایی
          </span>
          <span className="text-xs text-slate-400 font-mono">زمان: ۰:۴۰</span>
        </div>
        <h2
          className={`font-extrabold tracking-tight ${
            isFullscreen ? 'text-4xl md:text-5xl lg:text-6xl mb-1' : 'text-3xl md:text-4xl'
          } ${isDark ? 'text-white' : 'text-slate-900'}`}
        >
          AI Agent در یک نگاه
        </h2>
      </div>

      {/* 3 Big Lines */}
      <div className="space-y-3 my-auto max-w-2xl mx-auto w-full">
        {/* Pillar 1 */}
        <div
          className={`p-3.5 rounded-2xl border flex items-center gap-4 transition-all shadow-sm ${
            isDark
              ? 'bg-slate-900/80 border-slate-800 text-slate-200'
              : 'bg-white border-slate-200 text-slate-800'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 font-black text-xl flex items-center justify-center shrink-0">
            ۱
          </div>
          <div>
            <div className="font-extrabold text-base md:text-lg text-cyan-400">
              Agent هدف می‌گیرد، نه فقط سؤال.
            </div>
            <div className="text-xs opacity-75 mt-0.5">
              انتقال تمرکز از پرسش و پاسخ متنی به تحقق هدف مشخص و عملیاتی.
            </div>
          </div>
        </div>

        {/* Pillar 2 */}
        <div
          className={`p-3.5 rounded-2xl border flex items-center gap-4 transition-all shadow-sm ${
            isDark
              ? 'bg-slate-900/80 border-slate-800 text-slate-200'
              : 'bg-white border-slate-200 text-slate-800'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 font-black text-xl flex items-center justify-center shrink-0">
            ۲
          </div>
          <div>
            <div className="font-extrabold text-base md:text-lg text-amber-400">
              تصمیم می‌گیرد، ابزار استفاده می‌کند و نتیجه را می‌بیند.
            </div>
            <div className="text-xs opacity-75 mt-0.5">
              چرخه Decide ➔ Act ➔ Observe ➔ Repeat برای تعامل با دنیای بیرونی؛ ReAct یکی از الگوهای رایجِ ترکیب استدلال و عمل است.
            </div>
          </div>
        </div>

        {/* Pillar 3 */}
        <div
          className={`p-3.5 rounded-2xl border flex items-center gap-4 transition-all shadow-sm ${
            isDark
              ? 'bg-slate-900/80 border-slate-800 text-slate-200'
              : 'bg-white border-slate-200 text-slate-800'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 font-black text-xl flex items-center justify-center shrink-0">
            ۳
          </div>
          <div>
            <div className="font-extrabold text-base md:text-lg text-emerald-400">
              هرچه استقلال بیشتر باشد، کنترل و ایمنی مهم‌تر می‌شود.
            </div>
            <div className="text-xs opacity-75 mt-0.5">
              بررسی خروجی، محدودیت دسترسی و نظارت انسان بر اقدامات حساس.
            </div>
          </div>
        </div>
      </div>

      {/* Boxed Final Equation */}
      <div
        className={`p-3 rounded-2xl border text-center font-mono text-sm md:text-base font-bold my-2 shadow-sm ${
          isDark
            ? 'bg-slate-900/90 border-cyan-500/30 text-cyan-300'
            : 'bg-slate-100 border-slate-300 text-slate-900'
        }`}
      >
        <span className="text-slate-400 text-xs font-sans block mb-1">فرمول جامع معماری:</span>
        AI Agent = Model + Tools + Memory + Autonomy + Feedback
      </div>

      {/* The Big Final Punchline */}
      <div
        className={`p-5 rounded-2xl border-2 text-center transition-all shadow-xl ${
          isDark
            ? 'bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border-cyan-400 text-white shadow-cyan-950/80'
            : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-500 text-blue-950'
        }`}
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <span className="text-xs uppercase tracking-widest font-mono font-bold text-cyan-400">
            FINAL TAKEAWAY
          </span>
        </div>
        <div className="text-2xl md:text-3xl font-black tracking-tight mt-1 text-cyan-300">
          در LLM Agents، از «تولید پاسخ» به «اجرای کار» می‌رسیم.
        </div>
      </div>
      {/* Academic references — visible but not spoken during the timed talk */}
      <div className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] md:text-[11px] pb-0.5 ${
        isDark ? 'text-slate-400' : 'text-slate-600'
      }`}>
        <span className="font-bold">منابع علمی:</span>
        <a className="underline underline-offset-2 hover:text-cyan-400" target="_blank" rel="noopener noreferrer"
          href="https://www.pearson.com/en-us/subject-catalog/p/artificial-intelligence-a-modern-approach/P200000003500/9780134610993">
          Russell &amp; Norvig — AIMA (4th ed.)
        </a>
        <a className="underline underline-offset-2 hover:text-cyan-400" target="_blank" rel="noopener noreferrer"
          href="https://arxiv.org/abs/2210.03629">
          Yao et al. — ReAct (ICLR 2023)
        </a>
        <a className="underline underline-offset-2 hover:text-cyan-400" target="_blank" rel="noopener noreferrer"
          href="https://modelcontextprotocol.io/specification/2025-06-18/server/tools">
          MCP — Official Specification
        </a>
      </div>
    </div>
  );
};
