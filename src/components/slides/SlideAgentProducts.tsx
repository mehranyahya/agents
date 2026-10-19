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
      category: 'ALWAYS-ON WORKER',
      text: 'An always-on AI worker inside ChatGPT. Give it an ongoing goal and access to selected apps; it can use its own cloud computer to make progress between conversations, then bring results and decisions back for your review.',
      note: 'Access depends on plan and region.',
      url: 'https://chatgpt.com/features/dots/',
      Icon: BrainCircuit,
      accent: 'violet',
    },
    {
      name: 'Muse',
      maker: 'Meta',
      category: 'PERSONAL LIFE AGENT',
      text: 'A personal agent for bookings, online shopping, forms, reminders and long-term goals. It uses a secure browser and connected apps to carry out tasks, while requesting approval for sensitive actions such as purchases.',
      note: 'Permissions and connected apps matter.',
      url: 'https://ai.meta.com/muse/',
      Icon: CalendarCheck2,
      accent: 'cyan',
    },
    {
      name: 'Grok Bot',
      maker: 'xAI',
      category: 'AI COWORKER TEAM',
      text: 'A roster of AI coworkers with different roles. Each Bot can use a computer and connected tools, take on assigned work, keep progressing in the background and return when it needs your input or approval.',
      note: 'Currently offered through eligible plans.',
      url: 'https://x.ai/news/introducing-grok-bot',
      Icon: UsersRound,
      accent: 'emerald',
    },
  ],
  open: [
    {
      name: 'OpenClaw',
      maker: 'Open-source · self-hosted',
      category: 'MESSAGING-BASED ASSISTANT',
      text: 'Install and run an AI assistant on your own machine or server. A background gateway lets you message it through WhatsApp, Telegram and other channels. Community skills and plugins add capabilities for everyday apps and workflows.',
      note: 'Background work needs an online host; no verified fixed skill count.',
      url: 'https://openclaw.ai/',
      Icon: MessagesSquare,
      accent: 'amber',
    },
    {
      name: 'Hermes',
      maker: 'Nous Research',
      category: 'SELF-IMPROVING AGENT',
      text: 'An agent with a desktop app and a learning loop. In Bot Mode, you can create named Bots with their own role, model, memory and skills. Hermes can write and improve reusable skills from its experience.',
      note: 'Bots and learning depend on setup and permissions.',
      url: 'https://hermes-agent.nousresearch.com/',
      Icon: Sparkles,
      accent: 'violet',
    },
    {
      name: 'MausBot',
      maker: 'Open-source · orchestration',
      category: 'TEAM COORDINATOR',
      text: 'A workspace for coordinating the AI tools you already use, including Claude Code, Codex and Grok. Give Bots different roles; a Chief of Staff can organize tasks. Review supported approvals from desktop or a paired phone.',
      note: 'Additional integrations depend on available adapters; local work needs an active host.',
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
      dir="ltr"
      data-agent-product={product.name}
      className={`min-w-0 min-h-0 flex flex-col rounded-2xl border p-3.5 shadow-sm ${isDark ? 'bg-slate-900/85 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'}`}
    >
      <div className="flex items-center gap-2.5 min-w-0 mb-2.5">
        <div className={`p-2 rounded-xl shrink-0 ${color}`}><Icon className="w-6 h-6" aria-hidden="true" /></div>
        <div className="min-w-0">
          <h3 className={`font-extrabold text-xl leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{product.name}</h3>
          <div className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{product.maker}</div>
        </div>
      </div>
      <div className={`text-[11px] uppercase font-extrabold tracking-wider mb-2 ${isDark ? 'text-cyan-300' : 'text-blue-700'}`}>{product.category}</div>
      <p className="text-sm leading-relaxed flex-1 min-h-0">{product.text}</p>
      <div className={`border-t mt-2.5 pt-2 flex flex-col gap-1.5 ${isDark ? 'border-slate-700/80' : 'border-slate-200'}`}>
        <p className={`text-xs leading-snug ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{product.note}</p>
        <a href={product.url} target="_blank" rel="noopener noreferrer"
           className={`text-xs font-semibold inline-flex items-center gap-1.5 w-fit hover:underline ${isDark ? 'text-cyan-300' : 'text-blue-700'}`}>
          Official source <ExternalLink className="w-3 h-3" aria-hidden="true" />
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
        <p dir="ltr" className={`text-sm mt-0.5 ${isDark?'text-slate-300':'text-slate-600'}`}>
          {isPersonal ? 'Three approaches: ongoing goals, personal tasks and AI coworkers' : 'Three approaches: a messaging agent, a learning agent and a team orchestrator'}
        </p>
      </header>
      <main className="grid grid-cols-3 gap-3 flex-1 min-h-0 items-stretch" aria-label="Real AI agent product examples">
        {data.map(product=><ProductCard product={product} isDark={isDark} key={product.name} />)}
      </main>
      <footer className={`shrink-0 mt-2 text-xs text-center ${isDark?'text-slate-400':'text-slate-600'}`}>
        {isPersonal ? 'Different products offer different degrees of autonomy, availability and approval.' : 'Product capabilities and integrations depend on deployment, access and permissions.'}
      </footer>
    </div>
  );
}

export const Slide7AgentProducts: React.FC<SlideProps> = props => <AgentGallerySlide {...props} variant="personal" />;
export const Slide8AgentProducts: React.FC<SlideProps> = props => <AgentGallerySlide {...props} variant="open" />;
