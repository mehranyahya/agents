import React, { useState } from 'react';
import { Users, Search, Code, CheckCircle, ArrowDown, ArrowUpRight, ShieldAlert, Cpu } from 'lucide-react';

interface SlideProps {
  theme: 'dark' | 'light';
}

export const Slide7MultiAgent: React.FC<SlideProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [showNuance, setShowNuance] = useState(false);

  return (
    <div className="h-full flex flex-col justify-between py-3 px-6 select-none">
      {/* Slide Header */}
      <div>
        <div className="flex items-center justify-between text-xs mb-1">
          <span
            className={`px-2.5 py-0.5 rounded-full font-mono font-medium ${
              isDark ? 'bg-cyan-500/10 text-cyan-400' : 'bg-blue-50 text-blue-700'
            }`}
          >
            اسلاید ۷ • سیستم‌های چندعاملی
          </span>
          <span className="text-xs text-slate-400 font-mono">زمان: ۰:۴۵</span>
        </div>
        <h2
          className={`text-3xl md:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          وقتی یک Agent کافی نیست
        </h2>
      </div>

      {/* Main Multi-Agent Architecture Tree */}
      <div className="my-auto flex flex-col items-center justify-center">
        {/* Orchestrator Card */}
        <div
          className={`px-6 py-3 rounded-2xl border-2 shadow-xl flex items-center gap-3 transition-all ${
            isDark
              ? 'bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border-cyan-400 text-cyan-100 shadow-cyan-950/60'
              : 'bg-white border-blue-500 text-blue-900 shadow-blue-100'
          }`}
        >
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
            <Users className="w-6 h-6" />
          </div>
          <div className="text-right">
            <div className="font-extrabold text-base">Orchestrator (عامل مدیر / هماهنگ‌کننده)</div>
            <div className="text-[11px] opacity-80 font-mono">تفسیر هدف کلان، تقسیم مأموریت و جمع‌بندی خروجی</div>
          </div>
        </div>

        {/* Connecting Arrows */}
        <div className="flex items-center justify-center gap-16 my-2 text-cyan-400 opacity-80">
          <ArrowDown className="w-5 h-5 animate-bounce" />
          <ArrowDown className="w-5 h-5 animate-bounce" style={{ animationDelay: '150ms' }} />
          <ArrowDown className="w-5 h-5 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>

        {/* 3 Specialized Worker Agents */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
          {/* Worker 1: Research */}
          <div
            className={`p-3.5 rounded-xl border transition-all text-center flex flex-col items-center ${
              isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 mb-1.5">
              <Search className="w-5 h-5" />
            </div>
            <div className="font-bold text-sm text-sky-400">Research Agent</div>
            <div className="text-xs opacity-70">محقق و جمع‌آوری داده</div>
            <div className="text-[10px] text-slate-400 mt-2 font-mono">Search ➔ Extract ➔ Summarize</div>
          </div>

          {/* Worker 2: Coding */}
          <div
            className={`p-3.5 rounded-xl border transition-all text-center flex flex-col items-center ${
              isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 mb-1.5">
              <Code className="w-5 h-5" />
            </div>
            <div className="font-bold text-sm text-emerald-400">Coding Agent</div>
            <div className="text-xs opacity-70">برنامه‌نویس و مجری کد</div>
            <div className="text-[10px] text-slate-400 mt-2 font-mono">Write Code ➔ Run Tests</div>
          </div>

          {/* Worker 3: Review */}
          <div
            className={`p-3.5 rounded-xl border transition-all text-center flex flex-col items-center ${
              isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 mb-1.5">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div className="font-bold text-sm text-purple-400">Review Agent</div>
            <div className="text-xs opacity-70">بازبین و کنترل کیفیت</div>
            <div className="text-[10px] text-slate-400 mt-2 font-mono">Audit ➔ Benchmark ➔ Approve</div>
          </div>
        </div>

        {/* Synthesis Flow */}
        <div className="mt-3 flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
          <span>Specialization</span>
          <span className="text-cyan-400 font-bold">+</span>
          <span>Coordination</span>
          <span className="mx-2 text-slate-600">➔</span>
          <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
            Final Result (خروجی نهایی ترکیب‌شده)
          </span>
        </div>
      </div>

      {/* Main Statement & Oral Nuance Button */}
      <div className="space-y-2">
        <div
          className={`p-3 rounded-2xl border text-center transition-all ${
            isDark
              ? 'bg-slate-900/90 border-cyan-500/40 text-slate-100'
              : 'bg-white border-blue-300 text-slate-900'
          }`}
        >
          <div className="text-base md:text-lg font-bold text-cyan-400">
            «یک Agent همه‌کاره نیست؛ چند Agent می‌توانند مثل یک تیم تخصصی همکاری کنند.»
          </div>
        </div>

        {/* Nuance Toggle for Speaker */}
        <div className="text-center">
          <button
            onClick={() => setShowNuance(!showNuance)}
            className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>نکته مهم مهندسی (شفاهی): {showNuance ? 'بستن' : 'مشاهده تذکر واقع‌بینانه'}</span>
          </button>

          {showNuance && (
            <div className="mt-1.5 p-2 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-200 text-xs max-w-xl mx-auto animate-fade-in">
              Multi-Agent همیشه بهتر نیست! باعث افزایش تأخیر، مصرف توکن و پیچیدگی دیباگ می‌شود.
              گاهی یک Agent ساده، ارزان‌تر، سریع‌تر و قابل‌کنترل‌تر است.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
