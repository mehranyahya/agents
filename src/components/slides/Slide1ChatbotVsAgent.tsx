import React from 'react';
import { MessageSquareText, Search, BarChart3, CheckCircle2, Play, Sparkles, AlertCircle } from 'lucide-react';

interface SlideProps {
  theme: 'dark' | 'light';
  isFullscreen?: boolean;
}

export const Slide1ChatbotVsAgent: React.FC<SlideProps> = ({ theme, isFullscreen }) => {
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
            اسلاید ۲ • مفهوم بنیادین
          </span>
          <span className="text-xs text-slate-400 font-mono">زمان: ۱:۳۰</span>
        </div>
        <h2
          className={`font-extrabold tracking-tight ${
            isFullscreen ? 'text-4xl md:text-5xl lg:text-6xl mb-1' : 'text-3xl md:text-4xl'
          } ${isDark ? 'text-white' : 'text-slate-900'}`}
        >
          چتبات پاسخ می‌دهد؛ Agent اقدام می‌کند
        </h2>
      </div>

      {/* Two Column Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-auto">
        {/* Left Column: Chatbot */}
        <div
          className={`flex flex-col rounded-2xl border p-5 transition-all ${
            isDark
              ? 'bg-slate-900/50 border-slate-800 text-slate-200'
              : 'bg-slate-50 border-slate-200 text-slate-800'
          }`}
        >
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-dashed border-slate-700/50">
            <div
              className={`p-2 rounded-xl ${
                isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-700'
              }`}
            >
              <MessageSquareText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Chatbot (سیستم پاسخ‌دهنده)</h3>
              <p className="text-xs opacity-70">تعامل متنی تک‌مرحله‌ای یا محاوره‌ای</p>
            </div>
          </div>

          {/* Chatbot Prompt */}
          <div className="space-y-3 mb-4">
            <div
              className={`p-3 rounded-xl border text-sm ${
                isDark ? 'bg-slate-800/60 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <span className="text-xs font-bold text-cyan-400 block mb-1">پرسش کاربر:</span>
              «چطور بلیط هواپیما بگیرم؟»
            </div>

            <div
              className={`p-3 rounded-xl border text-sm ${
                isDark
                  ? 'bg-slate-950/70 border-slate-800 text-slate-400'
                  : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}
            >
              <span className="text-xs font-bold text-slate-400 block mb-1">پاسخ سیستم:</span>
              «۱. به سایت‌های فروش بلیط مراجعه کنید. ۲. مبدا و مقصد را وارد نمایید. ۳. درگاه پرداخت را تکمیل کنید...»
            </div>
          </div>

          <div
            className={`mt-auto p-2.5 rounded-xl text-center text-xs font-semibold ${
              isDark ? 'bg-slate-800/40 text-slate-400' : 'bg-slate-200/60 text-slate-600'
            }`}
          >
            نتیجه: کار اصلی هنوز بر دوش انسان باقی مانده است.
          </div>
        </div>

        {/* Right Column: AI Agent */}
        <div
          className={`flex flex-col rounded-2xl border-2 p-5 relative overflow-hidden transition-all shadow-lg ${
            isDark
              ? 'bg-gradient-to-br from-cyan-950/30 via-slate-900 to-indigo-950/20 border-cyan-500/50 text-cyan-100 shadow-cyan-950/50'
              : 'bg-white border-blue-500 text-slate-900 shadow-blue-100'
          }`}
        >
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-dashed border-cyan-500/30">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-cyan-400">AI Agent (سیستم کنش‌گر)</h3>
                <p className="text-xs opacity-75">هدف‌محور، خودکارساز و متصل به ابزارها</p>
              </div>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-cyan-500 text-slate-950">
              Autonomous
            </span>
          </div>

          {/* Agent Goal */}
          <div className="space-y-3 mb-4">
            <div
              className={`p-3 rounded-xl border text-sm ${
                isDark ? 'bg-cyan-950/40 border-cyan-500/30 text-cyan-100' : 'bg-blue-50 border-blue-200 text-blue-900'
              }`}
            >
              <span className="text-xs font-bold text-cyan-400 block mb-1">هدف کاربر:</span>
              «ارزان‌ترین پرواز جمعه را پیدا کن و گزینه‌ها را مقایسه کن.»
            </div>

            {/* Workflow steps */}
            <div className="grid grid-cols-4 gap-2 pt-1 text-center">
              <div
                className={`p-2 rounded-xl flex flex-col items-center gap-1 border ${
                  isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <Search className="w-4 h-4 text-cyan-400" />
                <span className="text-[11px] font-bold">۱. جستجو</span>
                <span className="text-[9px] opacity-70">Search API</span>
              </div>
              <div
                className={`p-2 rounded-xl flex flex-col items-center gap-1 border ${
                  isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <BarChart3 className="w-4 h-4 text-amber-400" />
                <span className="text-[11px] font-bold">۲. مقایسه</span>
                <span className="text-[9px] opacity-70">Filter & Sort</span>
              </div>
              <div
                className={`p-2 rounded-xl flex flex-col items-center gap-1 border ${
                  isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px] font-bold">۳. انتخاب</span>
                <span className="text-[9px] opacity-70">Best Deal</span>
              </div>
              <div
                className={`p-2 rounded-xl flex flex-col items-center gap-1 border ${
                  isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <Play className="w-4 h-4 text-indigo-400" />
                <span className="text-[11px] font-bold">۴. نتیجه</span>
                <span className="text-[9px] opacity-70">Show Results</span>
              </div>
            </div>
          </div>

          <div
            className={`mt-auto p-2.5 rounded-xl text-center text-xs font-semibold ${
              isDark ? 'bg-cyan-500/20 text-cyan-300' : 'bg-blue-100 text-blue-900'
            }`}
          >
            نتیجه: سیستم می‌تواند با کمک ابزارها چند مرحله از کار را در محیط واقعی اجرا کند.
          </div>
        </div>
      </div>

      {/* Academic anchor: classic agent theory without an extra slide */}
      <div className={`p-3 rounded-2xl border transition-all ${
        isDark ? 'bg-slate-900/80 border-cyan-500/40 text-slate-100 shadow-md'
          : 'bg-white border-blue-300 text-slate-900 shadow-sm'
      }`}>
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="text-base md:text-lg font-black text-cyan-400">
            «Chatbot سؤال می‌گیرد؛ Agent هدف می‌گیرد»
          </div>
          <span className={`text-[10px] font-bold rounded-full px-2 py-1 ${
            isDark ? 'bg-cyan-500/10 text-cyan-300' : 'bg-blue-50 text-blue-700'
          }`}>
            پیوند با مبانی هوش مصنوعی: Rational Agent
          </span>
        </div>
        <div dir="ltr" className="flex flex-wrap items-center justify-center gap-1.5 md:gap-3 mt-2 font-mono text-[11px] md:text-xs font-semibold text-cyan-400">
          <span>Environment</span><span aria-hidden="true">→</span>
          <span>Percepts</span><span aria-hidden="true">→</span>
          <span>Agent</span><span aria-hidden="true">→</span>
          <span>Actions</span><span aria-hidden="true">→</span>
          <span>Environment</span>
        </div>
        <p className={`text-xs text-center leading-relaxed mt-1.5 ${
          isDark ? 'text-slate-300' : 'text-slate-700'
        }`}>
          <strong>عامل عقلانی</strong> بر پایه ادراک‌ها و اطلاعات موجود، کنشی را انتخاب می‌کند که عملکرد مورد انتظار را بیشینه کند.
        </p>
        <div className="flex justify-center items-center gap-1.5 mt-1 text-[10px] text-slate-400">
          <AlertCircle className="w-3 h-3 shrink-0 text-amber-400" />
          <span>هر Agent لزوماً LLM ندارد؛ عامل‌ها می‌توانند نرم‌افزاری یا رباتیکی باشند. — Russell &amp; Norvig, AIMA (فصل ۲)</span>
        </div>
      </div>
    </div>
  );
};
