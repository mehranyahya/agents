import React from 'react';
import { BrainCircuit, Code2, SearchCheck, Workflow, ExternalLink, AlertCircle } from 'lucide-react';

interface SlideProps {
  theme: 'dark' | 'light';
  isFullscreen?: boolean;
}

const TOOLS = [
  { name: 'OpenAI dots', domain: 'openai.com', category: 'دستیار شخصی', use: 'پیگیری کارهای مستمر و برنامه روزانه با اجازه کاربر', example: 'تقویم و ایمیل من را بررسی کن.', url: 'https://openai.com/index/introducing-dots/', icon: BrainCircuit, tone: 'text-cyan-400', bg: 'bg-cyan-500/15', edge: 'border-t-cyan-400', status: 'عرضه محدود' },
  { name: 'Google Antigravity 2.0', domain: 'antigravity.google', category: 'برنامه‌نویسی', use: 'ویرایش کد، اجرای تست و هماهنگی چند ایجنت', example: 'خطای این پروژه را پیدا و اصلاح کن.', url: 'https://www.antigravity.google/product/antigravity-2', icon: Code2, tone: 'text-emerald-400', bg: 'bg-emerald-500/15', edge: 'border-t-emerald-400', status: '' },
  { name: 'ChatGPT Deep Research', domain: 'openai.com', category: 'تحقیق علمی', use: 'بررسی چند منبع و تهیه گزارش همراه با استناد', example: 'روش‌های یادگیری ماشین را مقایسه کن.', url: 'https://openai.com/index/introducing-deep-research/', icon: SearchCheck, tone: 'text-violet-400', bg: 'bg-violet-500/15', edge: 'border-t-violet-400', status: '' },
  { name: 'Make AI Agents', domain: 'make.com', category: 'اتوماسیون', use: 'اتصال نرم‌افزارها و اجرای فرایندهای چندمرحله‌ای', example: 'ایمیل‌ها را دسته‌بندی و پیگیری کن.', url: 'https://www.make.com/en/ai-agents', icon: Workflow, tone: 'text-amber-400', bg: 'bg-amber-500/15', edge: 'border-t-amber-400', status: '' },
];

export const Slide6FeaturedAgents: React.FC<SlideProps> = ({ theme, isFullscreen }) => {
  const dark = theme === 'dark';
  return (
    <div className={'h-full flex flex-col justify-between select-none ' + (isFullscreen ? 'py-6 px-10 md:px-14' : 'py-3 px-6')}>
      <div>
        <div className="flex items-center justify-between text-xs mb-1">
          <span className={dark ? 'px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400' : 'px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700'}>اسلاید ۷ • ابزارهای واقعی</span>
          <span className="text-xs text-slate-400">زمان: ۰:۴۰</span>
        </div>
        <h2 className={'font-extrabold tracking-tight ' + (isFullscreen ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl') + (dark ? ' text-white' : ' text-slate-900')}>۴ ایجنت واقعی؛ ۴ کاربرد متفاوت</h2>
        <p className="text-xs md:text-sm text-slate-400 mt-1">برای هر ابزار: کاربرد، یک مثال و لینک رسمی قابل کلیک</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3 py-2 my-auto">
        {TOOLS.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <article key={tool.name} className={'flex min-w-0 flex-col justify-between gap-2.5 rounded-2xl border border-t-[3px] p-3.5 shadow-sm transition-colors duration-200 ' + tool.edge + ' ' + (dark ? 'bg-slate-900/85 border-x-slate-700 border-b-slate-700 text-slate-100' : 'bg-white border-x-slate-200 border-b-slate-200 text-slate-900')}>
              <div className="flex items-center justify-between gap-2">
                <div className={'w-10 h-10 rounded-xl flex items-center justify-center ' + tool.bg}><Icon className={'w-5 h-5 ' + tool.tone}/></div>
                <div className="flex flex-col items-end gap-1">
                  <span dir="ltr" className={'text-xs tabular-nums tracking-widest font-bold ' + (dark ? 'text-slate-500' : 'text-slate-400')}>{String(index + 1).padStart(2, '0')}</span>
                  {tool.status && <span className="text-[10px] text-amber-400 border border-amber-500/30 rounded-md px-1.5 py-0.5">{tool.status}</span>}
                </div>
              </div>
              <div>
                <h3 dir="ltr" className="text-right font-extrabold text-sm md:text-base leading-snug break-words">{tool.name}</h3>
                <p className={'text-xs md:text-sm font-semibold mt-1 ' + tool.tone}>{tool.category}</p>
              </div>
              <p className="text-xs md:text-sm leading-relaxed opacity-90">{tool.use}</p>
              <div className={'rounded-lg px-2 py-1.5 text-[11px] md:text-xs leading-relaxed ' + (dark ? 'bg-slate-950/70 text-slate-300' : 'bg-slate-100 text-slate-700')}>مثال: {tool.example}</div>
              <a href={tool.url} target="_blank" rel="noopener noreferrer" aria-label={'باز کردن سایت رسمی ' + tool.name} className={'flex items-center justify-between gap-1 rounded-lg border px-2 py-1.5 text-[11px] md:text-xs font-semibold transition-colors ' + (dark ? 'border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10' : 'border-blue-200 text-blue-700 hover:bg-blue-50')}>
                <span dir="ltr" className="truncate">{tool.domain}</span><ExternalLink className="w-3.5 h-3.5 shrink-0"/>
              </a>
            </article>
          );
        })}
      </div>
      <div className={'flex items-start gap-2 rounded-xl border p-2.5 text-[10px] md:text-xs ' + (dark ? 'bg-slate-900/70 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600')}>
        <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5"/><span>دسترسی و هزینه ممکن است بسته به کشور و حساب متفاوت باشد؛ dots هنوز عرضه محدود دارد.</span>
      </div>
    </div>
  );
};
