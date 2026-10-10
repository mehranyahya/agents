import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Moon,
  Sun,
  Mic,
  Share2,
  Layers,
  Sparkles
} from 'lucide-react';
import { PresentationTimer } from './PresentationTimer';
import { SLIDES } from '../data/slidesData';

interface NavbarProps {
  currentSlideIndex: number;
  onPrev: () => void;
  onNext: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  isNotesOpen: boolean;
  onToggleNotes: () => void;
  onOpenGoogleSlidesModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSlideIndex,
  onPrev,
  onNext,
  theme,
  onToggleTheme,
  isFullscreen,
  onToggleFullscreen,
  isNotesOpen,
  onToggleNotes,
  onOpenGoogleSlidesModal,
}) => {
  const isDark = theme === 'dark';
  const totalSlides = SLIDES.length;

  return (
    <header
      className={`h-16 px-4 md:px-6 flex items-center justify-between border-b backdrop-blur-md sticky top-0 z-30 transition-colors ${
        isDark
          ? 'bg-slate-950/80 border-slate-800 text-slate-100'
          : 'bg-white/80 border-slate-200 text-slate-800'
      }`}
    >
      {/* Left section: Brand & Slide Counter */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-slate-950 font-black text-xs shadow-md shadow-cyan-500/30">
            AI
          </div>
          <div className="hidden sm:block">
            <span className="font-extrabold text-sm tracking-tight block">
              AI Agents Deck
            </span>
            <span className="text-[10px] text-cyan-400 font-mono block">
              ارائه سمینار ۱۰ دقیقه‌ای
            </span>
          </div>
        </div>

        {/* Slide Counter badge */}
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-semibold border ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
          }`}
        >
          <span>اسلاید</span>
          <span className="text-cyan-400 font-bold">{currentSlideIndex + 1}</span>
          <span className="text-slate-500">/</span>
          <span>{totalSlides}</span>
        </div>
      </div>

      {/* Middle section: 10-Minute Presentation Timer */}
      <div className="hidden md:flex items-center justify-center">
        <PresentationTimer currentSlideIndex={currentSlideIndex} />
      </div>

      {/* Right section: Slide Nav, Notes, Google Slides, Fullscreen */}
      <div className="flex items-center gap-2">
        {/* Previous / Next buttons */}
        <div className="flex items-center gap-1 bg-slate-900/60 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={onPrev}
            disabled={currentSlideIndex === 0}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="اسلاید قبلی (کلید جهت‌نما راست یا Backspace)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={onNext}
            disabled={currentSlideIndex === totalSlides - 1}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="اسلاید بعدی (کلید جهت‌نما چپ یا Space)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Speaker Notes Toggle */}
        <button
          onClick={onToggleNotes}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            isNotesOpen
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-md ring-1 ring-cyan-500/40'
              : isDark
              ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
              : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
          }`}
          title="یادداشت‌های شفاهی سخنران"
        >
          <Mic className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">یادداشت سخنران</span>
        </button>

        {/* Google Slides Export Button */}
        <button
          onClick={onOpenGoogleSlidesModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 shadow-md shadow-amber-900/30 transition-all active:scale-95"
          title="ایجاد اسلاید در Google Slides"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
          </svg>
          <span className="hidden sm:inline">Google Slides</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className={`p-2 rounded-xl border transition-colors ${
            isDark
              ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
              : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-black'
          }`}
          title={isDark ? 'تغییر به تم روشن' : 'تغییر به تم تاریک'}
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={onToggleFullscreen}
          className={`p-2 rounded-xl border transition-colors ${
            isDark
              ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
              : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-black'
          }`}
          title={isFullscreen ? 'خروج از تمام‌صفحه' : 'حالت ارائه تمام‌صفحه'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
