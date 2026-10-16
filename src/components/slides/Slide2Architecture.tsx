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
        isFullscreen ? 'py-3 px-7 md:px-9' : 'py-3 px-6'
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
        </div>
        <h2
          className={`font-extrabold tracking-tight ${
            isFullscreen ? 'text-4xl md:text-5xl lg:text-6xl mb-1' : 'text-3xl md:text-4xl'
          } ${isDark ? 'text-white' : 'text-slate-900'}`}
        >
          قطعات یک ایجنت مدرن
        </h2>
      </div>

      {/* The architecture diagram is intentionally taller and narrower than before:
          no absolute labels or scale transforms that can overlap surrounding text. */}
      <div className="flex-1 min-h-0 flex items-center justify-center py-2">
        <div className={
          'architecture-diagram w-full max-w-[860px] h-full max-h-[510px] rounded-3xl border px-4 py-3 flex flex-col justify-between gap-1.5 ' +
          (isDark ? 'bg-slate-900/20 border-cyan-500/25' : 'bg-blue-50/50 border-blue-200')
        }>
          {/* The loop indicator participates in normal layout: never floats over Memory. */}
          <div data-diagram-part="loop-label" className="flex shrink-0 items-center justify-center">
            <div className={
              'inline-flex items-center justify-center gap-2 text-xs font-semibold rounded-full px-3 py-1 ' +
              (isDark ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/30' : 'text-blue-800 bg-white border border-blue-200')
            }>
              <RotateCw className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>اجزا در یک چرخه اجرایی با هم کار می‌کنند</span>
            </div>
          </div>

          {/* Memory / State */}
          <div data-diagram-part="memory" className={
            'architecture-card self-center w-full max-w-[650px] min-w-0 flex items-center justify-center gap-3 rounded-2xl border px-4 py-2 text-center shadow-sm ' +
            (isDark ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-100' : 'bg-emerald-50 border-emerald-300 text-emerald-900')
          }>
            <div className="p-2 shrink-0 rounded-xl bg-emerald-500/20 text-emerald-400">
              <HardDrive className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="min-w-0 text-right">
              <div className="font-bold text-sm">حافظه و وضعیت (Memory)</div>
              <div className="text-xs opacity-80 leading-relaxed">سابقه تصمیمات، وضعیت محیط و داده‌های پیشین</div>
            </div>
          </div>

          <div aria-hidden="true" className="mx-auto w-0.5 h-3 shrink-0 rounded-full bg-cyan-500/50" />

          {/* Central relationship: three independent cards with equal room to wrap. */}
          <div data-diagram-part="middle" className="grid grid-cols-3 gap-3 w-full items-stretch">
            <div data-diagram-part="tools" className={
              'architecture-card min-w-0 flex flex-col items-center justify-center gap-1.5 rounded-2xl border px-2.5 py-3 text-center shadow-sm ' +
              (isDark ? 'bg-amber-950/40 border-amber-500/50 text-amber-100' : 'bg-amber-50 border-amber-300 text-amber-900')
            }>
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                <Wrench className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="min-w-0 w-full">
                <div className="font-bold text-sm">ابزارها (Tools)</div>
                <div className="text-xs opacity-80 leading-relaxed">وب، APIها، محاسبات و دیتابیس</div>
              </div>
            </div>

            <div data-diagram-part="llm" className={
              'architecture-card min-w-0 flex flex-col items-center justify-center gap-1.5 rounded-2xl border-2 px-2.5 py-3 text-center shadow-lg ' +
              (isDark ? 'bg-gradient-to-b from-slate-900 to-cyan-950/70 border-cyan-400 text-cyan-100' : 'bg-white border-blue-500 text-blue-900')
            }>
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                <Cpu className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="min-w-0 w-full">
                <div className="font-black text-base">LLM (مغز)</div>
                <div className="text-xs font-semibold text-cyan-400 leading-relaxed">تحلیل و تصمیم‌گیری</div>
              </div>
            </div>

            <div data-diagram-part="instructions" className={
              'architecture-card min-w-0 flex flex-col items-center justify-center gap-1.5 rounded-2xl border px-2.5 py-3 text-center shadow-sm ' +
              (isDark ? 'bg-indigo-950/40 border-indigo-500/50 text-indigo-100' : 'bg-indigo-50 border-indigo-300 text-indigo-900')
            }>
              <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                <FileText className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="min-w-0 w-full">
                <div className="font-bold text-sm">دستورها (Instructions)</div>
                <div className="text-xs opacity-80 leading-relaxed">مأموریت، پرامپت سیستم و نقشه هدف</div>
              </div>
            </div>
          </div>

          <div aria-hidden="true" className="mx-auto w-0.5 h-3 shrink-0 rounded-full bg-cyan-500/50" />

          {/* Safety guardrails anchor the bottom of the vertical architecture. */}
          <div data-diagram-part="safety" className={
            'architecture-card self-center w-full max-w-[650px] min-w-0 flex items-center justify-center gap-3 rounded-2xl border px-4 py-2 text-center shadow-sm ' +
            (isDark ? 'bg-rose-950/40 border-rose-500/50 text-rose-100' : 'bg-rose-50 border-rose-300 text-rose-900')
          }>
            <div className="p-2 shrink-0 rounded-xl bg-rose-500/20 text-rose-400">
              <ShieldAlert className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="min-w-0 text-right">
              <div className="font-bold text-sm">امنیت و دسترسی</div>
              <div className="text-xs opacity-80 leading-relaxed">خطوط قرمز، تأیید انسانی، سقف هزینه و دسترسی مجاز</div>
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
          مدل + ابزار + حافظه + دستور و کنترل دسترسی
        </div>
        
      </div>
    </div>
  );
};
