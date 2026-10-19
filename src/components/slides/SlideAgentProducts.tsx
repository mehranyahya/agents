import React from 'react';
import { BrainCircuit, CalendarCheck2, UsersRound, MessagesSquare, Sparkles, Network, ExternalLink, ShieldCheck } from 'lucide-react';

interface SlideProps {
  theme: 'dark' | 'light';
  isFullscreen?: boolean;
}

const products = {
  personal: [
    {
      name: 'Dots',
      maker: 'OpenAI · ChatGPT',
      category: 'دستیار همیشه‌فعال',
      text: 'دستیار همیشه‌فعالی در ChatGPT برای هدف‌های ادامه‌دار است. هدف را مشخص می‌کنی و به برنامه‌های انتخابی دسترسی می‌دهی؛ سپس با رایانه ابری خود بین گفتگوها روی کار پیش می‌رود و نتیجه یا تصمیم‌های نیازمند بررسی را به تو گزارش می‌کند.',
      note: 'دسترسی و امکانات آن به نوع حساب و منطقه بستگی دارد.',
      url: 'https://chatgpt.com/features/dots/',
      Icon: BrainCircuit,
      accent: 'violet',
    },
    {
      name: 'Muse',
      maker: 'Meta',
      category: 'دستیار امور شخصی',
      text: 'دستیار شخصی Meta برای رزرو، خرید اینترنتی، تکمیل فرم، یادآوری و هدف‌های بلندمدت است. با مرورگر امن و برنامه‌های متصل کارها را پیش می‌برد و برای اقدام‌های حساس، مثل خرید، تأیید کاربر را می‌گیرد.',
      note: 'قابلیت‌ها به مجوزها و برنامه‌های متصل وابسته‌اند.',
      url: 'https://ai.meta.com/muse/',
      Icon: CalendarCheck2,
      accent: 'cyan',
    },
    {
      name: 'Grok Bot',
      maker: 'xAI',
      category: 'تیم همکاران هوش مصنوعی',
      text: 'مجموعه‌ای از همکاران هوش مصنوعی با نقش‌های متفاوت است. هر بات می‌تواند با رایانه و ابزارهای متصل وظیفه‌ای را انجام دهد، کار را در پس‌زمینه ادامه دهد و هنگام نیاز به اطلاعات یا تأیید سراغ کاربر بیاید.',
      note: 'دسترسی به آن به طرح‌های واجد شرایط محدود است.',
      url: 'https://x.ai/news/introducing-grok-bot',
      Icon: UsersRound,
      accent: 'emerald',
    },
  ],
  open: [
    {
      name: 'OpenClaw',
      maker: 'متن‌باز · قابل میزبانی شخصی',
      category: 'دستیار متصل به پیام‌رسان‌ها',
      text: 'دستیار هوش مصنوعی متن‌بازی است که روی رایانه یا سرور خودت نصب می‌کنی. سرویس پس‌زمینه آن امکان گفتگو از واتساپ، تلگرام و کانال‌های دیگر را می‌دهد. مهارت‌ها و افزونه‌های جامعه کاربری، قابلیت‌های تازه‌ای به آن اضافه می‌کنند.',
      note: 'برای کار دائمی، میزبان باید روشن و متصل باشد؛ تعداد ثابت مهارت‌ها تأیید نشده است.',
      url: 'https://openclaw.ai/',
      Icon: MessagesSquare,
      accent: 'amber',
    },
    {
      name: 'Hermes',
      maker: 'Nous Research',
      category: 'ایجنت با مهارت‌های یادگیرنده',
      text: 'ایجنتی با برنامه دسکتاپ و سازوکار یادگیری است. در حالت Bot می‌توان بات‌هایی با نقش، مدل، حافظه و مهارت‌های جداگانه ساخت. Hermes می‌تواند با استفاده از تجربه خود، مهارت‌های قابل استفاده دوباره بنویسد و بهبود دهد.',
      note: 'قابلیت بات‌ها و یادگیری به تنظیمات و مجوزها وابسته است.',
      url: 'https://hermes-agent.nousresearch.com/',
      Icon: Sparkles,
      accent: 'violet',
    },
    {
      name: 'MausBot',
      maker: 'متن‌باز · هماهنگ‌کننده',
      category: 'هماهنگ‌کننده تیم ایجنت‌ها',
      text: 'محیطی برای هماهنگ‌کردن ابزارهای عاملی مانند Claude Code، Codex و Grok است. به بات‌ها نقش‌های متفاوت می‌دهی و یک بات «رئیس دفتر» وظایف را تقسیم می‌کند. تأیید کارهای پشتیبانی‌شده از رایانه یا تلفن متصل انجام می‌شود.',
      note: 'اتصال ابزارهای دیگر به سازگاری آن‌ها وابسته است؛ کار محلی به میزبان فعال نیاز دارد.',
      url: 'https://mausbot.com/',
      Icon: Network,
      accent: 'cyan',
    },
  ],
} as const;

type Product = (typeof products.personal)[number] | (typeof products.open)[number];

function ProductCard({ product, isDark }: { product: Product; isDark: boolean }) {
  const Icon = product.Icon;
  const color = {
    violet: isDark ? 'text-violet-300 bg-violet-400/15' : 'text-violet-800 bg-violet-100',
    cyan: isDark ? 'text-cyan-300 bg-cyan-400/15' : 'text-cyan-800 bg-cyan-100',
    emerald: isDark ? 'text-emerald-300 bg-emerald-400/15' : 'text-emerald-800 bg-emerald-100',
    amber: isDark ? 'text-amber-300 bg-amber-400/15' : 'text-amber-800 bg-amber-100',
  }[product.accent];

  return (
    <article
      dir="rtl"
      data-agent-product={product.name}
      className={`min-w-0 min-h-0 flex flex-col rounded-2xl border p-3.5 shadow-sm ${isDark ? 'bg-slate-900/85 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'}`}
    >
      <div className="flex items-center gap-2.5 min-w-0 mb-2.5">
        <div className={`p-2 rounded-xl shrink-0 ${color}`}><Icon className="w-6 h-6" aria-hidden="true" /></div>
        <div className="min-w-0 text-right">
          <h3 dir="ltr" className={`font-extrabold text-xl leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{product.name}</h3>
          <div className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{product.maker}</div>
        </div>
      </div>
      <div className={`text-[11px] font-extrabold mb-2 ${isDark ? 'text-cyan-300' : 'text-blue-700'}`}>{product.category}</div>
      <p className="text-sm leading-relaxed flex-1 min-h-0">{product.text}</p>
      <div className={`border-t mt-2.5 pt-2 flex flex-col gap-1.5 ${isDark ? 'border-slate-700/80' : 'border-slate-200'}`}>
        <p className={`text-xs leading-snug ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{product.note}</p>
        <a href={product.url} target="_blank" rel="noopener noreferrer"
           className={`text-xs font-semibold inline-flex items-center gap-1.5 w-fit hover:underline ${isDark ? 'text-cyan-300' : 'text-blue-700'}`}>
          منبع رسمی <ExternalLink className="w-3 h-3" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

function AgentGallerySlide({ theme, isFullscreen, variant }: SlideProps & { variant: 'personal' | 'open' }) {
  const isDark=theme==='dark';
  const isPersonal=variant==='personal';
  const data=products[variant];
  return (
    <div className={`h-full flex flex-col min-h-0 select-none ${isFullscreen ? 'py-3 px-7 md:px-9' : 'py-3 px-6'}`}>
      <header className="shrink-0 mb-2.5">
        <div className={`inline-flex items-center gap-2 text-xs font-bold rounded-full px-2.5 py-1 mb-1 ${isDark?'bg-cyan-500/10 text-cyan-300':'bg-blue-50 text-blue-800'}`}>
          <ShieldCheck className="w-4 h-4" aria-hidden="true" />
          اسلاید {isPersonal ? '۸' : '۹'} • نمونه‌های واقعی ایجنت‌ها
        </div>
        <h2 className={`font-extrabold tracking-tight ${isFullscreen?'text-4xl md:text-5xl':'text-3xl md:text-4xl'} ${isDark?'text-white':'text-slate-900'}`}>
          {isPersonal ? 'ایجنت‌های شخصی و همکار' : 'ایجنت‌های متن‌باز و هماهنگ‌کننده'}
        </h2>
        <p dir="rtl" className={`text-sm mt-0.5 ${isDark?'text-slate-300':'text-slate-600'}`}>
          {isPersonal ? 'سه رویکرد متفاوت: هدف‌های پیوسته، امور شخصی و همکاران هوش مصنوعی' : 'سه رویکرد متفاوت: دستیار پیام‌رسانی، ایجنت یادگیرنده و هماهنگ‌کننده تیم'}
        </p>
      </header>
      <main className="grid grid-cols-3 gap-3 flex-1 min-h-0 items-stretch" aria-label="نمونه‌های واقعی محصولات ایجنت هوش مصنوعی">
        {data.map(product=><ProductCard product={product} isDark={isDark} key={product.name} />)}
      </main>
      <footer className={`shrink-0 mt-2 text-xs text-center ${isDark?'text-slate-400':'text-slate-600'}`}>
        {isPersonal ? 'میزان اختیار، دسترسی و نیاز به تأیید کاربر در محصولات متفاوت است.' : 'قابلیت‌ها و اتصال‌ها به نحوه راه‌اندازی، دسترسی و مجوزها بستگی دارند.'}
      </footer>
    </div>
  );
}

export const Slide7AgentProducts: React.FC<SlideProps> = props => <AgentGallerySlide {...props} variant="personal" />;
export const Slide8AgentProducts: React.FC<SlideProps> = props => <AgentGallerySlide {...props} variant="open" />;
