import React from 'react';
import { Cpu, Wrench, HardDrive, FileText, ShieldAlert, RotateCw } from 'lucide-react';

interface SlideProps {
  theme: 'dark' | 'light';
  isFullscreen?: boolean;
}

export const Slide2Architecture: React.FC<SlideProps> = ({ theme, isFullscreen }) => {
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
            اسلاید ۳ • کالبدشکافی سیستم
          </span>
          <span className="text-xs text-slate-400 font-mono">زمان: ۰:۵۵</span>
        </div>
        <h2
          className={`font-extrabold tracking-tight ${
            isFullscreen ? 'text-4xl md:text-5xl lg:text-6xl mb-1' : 'text-3xl md:text-4xl'
          } ${isDark ? 'text-white' : 'text-slate-900'}`}
        >
          داخل یک AI Agent چه خبر است؟
        </h2>
      </div>

      {/* Central Architectural Diagram */}
      <div className="relative my-auto flex flex-col items-center justify-center p-3">
        {/* Orbit Loop Indicator */}
        <div
          className={`absolute inset-4 rounded-3xl border-2 border-dashed pointer-events-none transition-all ${
            isDark ? 'border-cyan-500/20' : 'border-blue-200'
          }`}
        >
          <div className="absolute top-2 right-4 flex items-center gap-1.5 text-[11px] font-mono font-semibold text-cyan-400 bg-slate-900/80 px-2 py-0.5 rounded-full border border-cyan-500/30">
            <RotateCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Control Loop (Goal → Decide → Act → Observe → Repeat)</span>
          </div>
        </div>

        {/* 5-Node Cross Diagram */}
        <div className="relative z-10 w-full max-w-xl flex flex-col items-center gap-3">
          {/* Top Node: Memory / State */}
          <div
            className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl border shadow-md transition-all ${
              isDark
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200 shadow-emerald-950/30'
                : 'bg-emerald-50 border-emerald-300 text-emerald-900'
            }`}
          >
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <HardDrive className="w-5 h-5" />
            </div>
            <div className="text-right">
              <div className="font-bold text-sm">حافظه و وضعیت (Memory)</div>
              <div className="text-[11px] opacity-75">سابقه تصمیمات، وضعیت محیط و داده‌های پیشین</div>
            </div>
          </div>

          {/* Middle Row: Tools <--> LLM <--> Instructions */}
          <div className="w-full flex items-center justify-between gap-3">
            {/* Left Node: Tools */}
            <div
              className={`flex-1 flex items-center gap-2.5 p-3 rounded-2xl border shadow-md transition-all ${
                isDark
                  ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                  : 'bg-amber-50 border-amber-300 text-amber-900'
              }`}
            >
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                <Wrench className="w-5 h-5" />
              </div>
              <div className="text-right">
                <div className="font-bold text-sm">ابزارها (Tools)</div>
                <div className="text-[11px] opacity-75">وب، APIها، محاسبات، دیتابیس</div>
              </div>
            </div>

            {/* Central LLM Brain */}
            <div
              className={`px-6 py-5 rounded-2xl border-2 shadow-xl flex flex-col items-center text-center transform scale-110 z-20 ${
                isDark
                  ? 'bg-gradient-to-b from-slate-900 via-cyan-950/60 to-slate-900 border-cyan-400 text-cyan-100 shadow-cyan-950/80'
                  : 'bg-white border-blue-500 text-blue-900 shadow-blue-100'
              }`}
            >
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 mb-1">
                <Cpu className="w-7 h-7" />
              </div>
              <div className="font-black text-base tracking-wide">LLM (مغز)</div>
              <div className="text-[10px] font-mono text-cyan-400 opacity-90">تحلیل و تصمیم‌گیری</div>
            </div>

            {/* Right Node: Instructions */}
            <div
              className={`flex-1 flex items-center gap-2.5 p-3 rounded-2xl border shadow-md transition-all ${
                isDark
                  ? 'bg-indigo-950/30 border-indigo-500/40 text-indigo-200'
                  : 'bg-indigo-50 border-indigo-300 text-indigo-900'
              }`}
            >
              <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                <FileText className="w-5 h-5" />
              </div>
              <div className="text-right">
                <div className="font-bold text-sm">دستورها (Instructions)</div>
                <div className="text-[11px] opacity-75">مأموریت، پرامپت سیستم و نقشه هدف</div>
              </div>
            </div>
          </div>

          {/* Bottom Node: Guardrails */}
          <div
            className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl border shadow-md transition-all ${
              isDark
                ? 'bg-red-950/30 border-red-500/40 text-red-200 shadow-red-950/30'
                : 'bg-red-50 border-red-300 text-red-900'
            }`}
          >
            <div className="p-1.5 rounded-lg bg-red-500/20 text-red-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="text-right">
              <div className="font-bold text-sm">امنیت و دسترسی</div>
              <div className="text-[11px] opacity-75">خطوط قرمز، تأیید انسانی، سقف هزینه و دسترسی مجاز</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Formula Box */}
      <div
        className={`p-3 rounded-2xl border text-center transition-all ${
          isDark
            ? 'bg-slate-900/90 border-slate-800 text-slate-200'
            : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        <div className="font-mono text-lg md:text-xl font-black text-cyan-400">
          Agent = Model + Tools + Memory + Control Loop
        </div>
        <div className="mt-1 flex items-center justify-center gap-3 text-xs text-slate-400">
          <span className="font-semibold text-slate-300">الگوی ReAct (Reasoning + Acting):</span>
          <span>یکی از الگوهای رایج برای پیوند دادن استدلال و فراخوانی ابزارها است.</span>
        </div>
      </div>
    </div>
  );
};
