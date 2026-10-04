import React from 'react';
import { Globe, Mail, Code2, Database, Calendar, Bot, ArrowRight, User } from 'lucide-react';

interface SlideProps {
  theme: 'dark' | 'light';
}

export const Slide0Title: React.FC<SlideProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <div className="h-full flex flex-col justify-between py-4 px-6 select-none">
      {/* Top Header Tag */}
      <div className="flex items-center justify-between text-xs tracking-wider">
        <span
          className={`px-3 py-1 rounded-full font-mono uppercase font-semibold ${
            isDark
              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
              : 'bg-blue-50 text-blue-700 border border-blue-200'
          }`}
        >
          AI Presentation • اسلاید ۰
        </span>
        <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
          زمان تقریبی: ۱۰ ثانیه
        </span>
      </div>

      {/* Main Hero Section */}
      <div className="my-auto text-center flex flex-col items-center">
        {/* Title */}
        <h1
          className={`text-6xl md:text-7xl font-black tracking-tight mb-4 ${
            isDark
              ? 'bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent'
              : 'text-slate-900'
          }`}
        >
          AI AGENTS
        </h1>

        <h2
          className={`text-2xl md:text-3xl font-bold mb-3 ${
            isDark ? 'text-slate-200' : 'text-slate-800'
          }`}
        >
          وقتی هوش مصنوعی فقط جواب نمی‌دهد؛ کار می‌کند
        </h2>

        <p
          className={`text-base md:text-lg max-w-xl font-normal ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          از مفهوم ساده تا معماری فنی عامل‌های هوشمند
        </p>

        {/* Minimal Illustration: Human -> AI Agent -> Tools */}
        <div className="mt-8 flex items-center justify-center gap-4 md:gap-8 max-w-2xl w-full">
          {/* Human */}
          <div
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
              isDark
                ? 'bg-slate-900/60 border-slate-800 text-slate-300 shadow-lg'
                : 'bg-slate-50 border-slate-200 text-slate-700 shadow-sm'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                isDark ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-700'
              }`}
            >
              <User className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold">Human</span>
            <span className="text-[10px] opacity-70">تعیین هدف</span>
          </div>

          <ArrowRight
            className={`w-5 h-5 rtl:rotate-180 animate-pulse ${
              isDark ? 'text-cyan-400' : 'text-blue-600'
            }`}
          />

          {/* AI Agent (Center) */}
          <div
            className={`relative flex flex-col items-center gap-2 p-5 rounded-2xl border transition-all transform scale-105 shadow-xl ${
              isDark
                ? 'bg-gradient-to-b from-cyan-950/40 to-slate-900 border-cyan-500/40 text-cyan-200 shadow-cyan-950/50'
                : 'bg-white border-blue-300 text-blue-900 shadow-blue-100'
            }`}
          >
            <div className="absolute -top-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500 text-slate-950">
              Center
            </div>
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                isDark ? 'bg-cyan-500/20 text-cyan-400' : 'bg-blue-100 text-blue-600'
              }`}
            >
              <Bot className="w-8 h-8 animate-pulse-subtle" />
            </div>
            <span className="text-sm font-bold">AI Agent</span>
            <span className="text-[10px] font-mono opacity-80">Decide & Act</span>
          </div>

          <ArrowRight
            className={`w-5 h-5 rtl:rotate-180 animate-pulse ${
              isDark ? 'text-cyan-400' : 'text-blue-600'
            }`}
          />

          {/* Tools & Environment */}
          <div
            className={`flex flex-col items-center gap-2 p-3.5 rounded-2xl border transition-all ${
              isDark
                ? 'bg-slate-900/60 border-slate-800 text-slate-300 shadow-lg'
                : 'bg-slate-50 border-slate-200 text-slate-700 shadow-sm'
            }`}
          >
            <div className="grid grid-cols-3 gap-1.5 p-1">
              <div
                className={`p-1.5 rounded-lg flex items-center justify-center ${
                  isDark ? 'bg-slate-800 text-amber-400' : 'bg-amber-100 text-amber-700'
                }`}
                title="Browser"
              >
                <Globe className="w-4 h-4" />
              </div>
              <div
                className={`p-1.5 rounded-lg flex items-center justify-center ${
                  isDark ? 'bg-slate-800 text-red-400' : 'bg-red-100 text-red-700'
                }`}
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </div>
              <div
                className={`p-1.5 rounded-lg flex items-center justify-center ${
                  isDark ? 'bg-slate-800 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                }`}
                title="Code"
              >
                <Code2 className="w-4 h-4" />
              </div>
              <div
                className={`p-1.5 rounded-lg flex items-center justify-center ${
                  isDark ? 'bg-slate-800 text-sky-400' : 'bg-sky-100 text-sky-700'
                }`}
                title="Database"
              >
                <Database className="w-4 h-4" />
              </div>
              <div
                className={`p-1.5 rounded-lg flex items-center justify-center ${
                  isDark ? 'bg-slate-800 text-purple-400' : 'bg-purple-100 text-purple-700'
                }`}
                title="Calendar"
              >
                <Calendar className="w-4 h-4" />
              </div>
              <div
                className={`p-1.5 rounded-lg flex items-center justify-center text-[10px] font-bold ${
                  isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'
                }`}
              >
                API
              </div>
            </div>
            <span className="text-xs font-semibold">Tools & APIs</span>
            <span className="text-[10px] opacity-70">ابزارهای محیطی</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer Info */}
      <div
        className={`pt-3 border-t flex flex-wrap items-center justify-between text-xs ${
          isDark ? 'border-slate-800/80 text-slate-400' : 'border-slate-200 text-slate-600'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="font-semibold text-cyan-500">موضوع:</span>
          <span>درس هوش مصنوعی • سمینار کلاسی ۱۰ دقیقه‌ای</span>
        </div>
        <div className="flex items-center gap-2 font-mono">
          <span>ارائه‌دهنده:</span>
          <span className="font-semibold text-slate-300">نام و نام خانوادگی</span>
        </div>
      </div>
    </div>
  );
};
