import React from 'react';
import { ArrowLeft, Terminal, Cpu, Network, MonitorPlay, Layers, FileSpreadsheet, Mail, Database, Globe } from 'lucide-react';

interface SlideProps {
  theme: 'dark' | 'light';
}

export const Slide4RealWorld: React.FC<SlideProps> = ({ theme }) => {
  const isDark = theme === 'dark';

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
            اسلاید ۴ • واسط دنیای واقعی
          </span>
          <span className="text-xs text-slate-400 font-mono">زمان: ۱:۱۵</span>
        </div>
        <h2
          className={`text-3xl md:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          از «فکر کردن» تا «انجام دادن»
        </h2>
      </div>

      {/* Top Architecture Flow */}
      <div
        className={`p-3 rounded-2xl border flex flex-wrap items-center justify-around gap-2 text-xs font-mono transition-all ${
          isDark
            ? 'bg-slate-900/80 border-slate-800 text-slate-300'
            : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}
      >
        <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold font-sans">
          کاربر (User)
        </span>
        <ArrowLeft className="w-4 h-4 text-slate-500 rtl:rotate-180" />
        <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold font-sans">
          مدل هوشمند (LLM)
        </span>
        <ArrowLeft className="w-4 h-4 text-slate-500 rtl:rotate-180" />
        <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-400 font-bold font-sans">
          درخواست ابزار (Tool Request)
        </span>
        <ArrowLeft className="w-4 h-4 text-slate-500 rtl:rotate-180" />
        <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold font-sans">
          برنامه / API
        </span>
        <ArrowLeft className="w-4 h-4 text-slate-500 rtl:rotate-180" />
        <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-400 font-bold font-sans">
          نتیجه (Result) ➔ LLM
        </span>
      </div>

      {/* 4 Cards: Tool Calling, API, MCP, Computer Use */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 my-2">
        {/* Card 1: Tool Calling */}
        <div
          className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                <Terminal className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-cyan-400">Tool Calling</h3>
            </div>
            <p className="text-xs opacity-80 leading-relaxed">
              مدل به جای اقدام فیزیکی، یک درخواست ساختاریافته (JSON) با نام تابع و ورودی‌ها صادر می‌کند.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400">
            function: execute_task()
          </div>
        </div>

        {/* Card 2: API */}
        <div
          className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                <Network className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-emerald-400">API</h3>
            </div>
            <p className="text-xs opacity-80 leading-relaxed">
              پل ارتباطی استاندارد با وب‌سرویس‌ها، درگاه‌های پرداخت، دیتابیس‌ها و سرورهای خارجی.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400">
            REST / GraphQL / gRPC
          </div>
        </div>

        {/* Card 3: MCP (Model Context Protocol) */}
        <div
          className={`p-3.5 rounded-xl border-2 flex flex-col justify-between transition-all relative ${
            isDark
              ? 'bg-gradient-to-b from-slate-900 to-indigo-950/40 border-indigo-500/50 shadow-md'
              : 'bg-indigo-50/50 border-indigo-300'
          }`}
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-indigo-400">MCP</h3>
            </div>
            <p className="text-xs opacity-80 leading-relaxed">
              استاندارد باز اتصال هوش مصنوعی به منابع داده مانند پورت USB همگانی.
            </p>

            {/* MCP Mini Hub */}
            <div className="mt-2 flex items-center justify-center gap-2 text-[10px] text-slate-400 py-1 bg-slate-950/40 rounded-lg">
              <span title="Files"><FileSpreadsheet className="w-3 h-3 text-emerald-400" /></span>
              <span>•</span>
              <span title="Email"><Mail className="w-3 h-3 text-red-400" /></span>
              <span>•</span>
              <span title="DB"><Database className="w-3 h-3 text-sky-400" /></span>
              <span>•</span>
              <span title="Web"><Globe className="w-3 h-3 text-amber-400" /></span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-indigo-900/60 text-[9px] text-slate-400">
            «رابط استاندارد اتصال AI به ابزارها»
          </div>
        </div>

        {/* Card 4: Computer Use */}
        <div
          className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                <MonitorPlay className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-amber-400">Computer Use</h3>
            </div>
            <p className="text-xs opacity-80 leading-relaxed">
              تعامل مستقیم با دسکتاپ: مشاهده اسکرین‌شات صفحه، جابجایی نشانگر ماوس و تایپ کیبورد.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400">
            Vision ➔ Coordinates ➔ Click
          </div>
        </div>
      </div>

      {/* Concrete Example Box */}
      <div
        className={`p-3.5 rounded-2xl border font-mono text-xs transition-all ${
          isDark
            ? 'bg-slate-950/80 border-slate-800 text-slate-300'
            : 'bg-slate-100 border-slate-300 text-slate-800'
        }`}
      >
        <div className="font-sans font-bold text-xs text-cyan-400 mb-2">
          مثال عینی از گردش Tool Calling در یک سیستم واقعی:
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-[11px]">
          <div className="p-2 rounded bg-slate-900 border border-slate-800">
            <span className="text-indigo-400 font-bold block mb-1">👤 کاربر:</span>
            «وضعیت سفارش من را بررسی کن.»
          </div>
          <div className="p-2 rounded bg-slate-900 border border-cyan-500/40 text-cyan-300">
            <span className="text-cyan-400 font-bold block mb-1">🧠 Agent (Tool Call):</span>
            <code>get_order_status("ORD-942")</code>
          </div>
          <div className="p-2 rounded bg-slate-900 border border-amber-500/40 text-amber-300">
            <span className="text-amber-400 font-bold block mb-1">⚙️ Tool Output:</span>
            <code>&#123; status: "Delivered" &#125;</code>
          </div>
          <div className="p-2 rounded bg-slate-900 border border-emerald-500/40 text-emerald-300">
            <span className="text-emerald-400 font-bold block mb-1">💬 پاسخ نهایی:</span>
            «سفارش شما تحویل داده شده است.»
          </div>
        </div>
      </div>
    </div>
  );
};
