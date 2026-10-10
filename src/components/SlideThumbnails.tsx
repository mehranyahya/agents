import React from 'react';
import { SLIDES } from '../data/slidesData';

interface SlideThumbnailsProps {
  currentSlideIndex: number;
  onSelectSlide: (index: number) => void;
  theme: 'dark' | 'light';
}

export const SlideThumbnails: React.FC<SlideThumbnailsProps> = ({
  currentSlideIndex,
  onSelectSlide,
  theme,
}) => {
  const isDark = theme === 'dark';

  return (
    <div className="flex items-center gap-2 overflow-x-auto py-2 px-4 no-scrollbar">
      {SLIDES.map((slide, idx) => {
        const isSelected = currentSlideIndex === idx;
        return (
          <button
            key={idx + 1}
            onClick={() => onSelectSlide(idx)}
            className={`shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all text-right ${
              isSelected
                ? isDark
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md ring-1 ring-cyan-500/50'
                  : 'bg-blue-100 border-blue-500 text-blue-900 shadow-sm'
                : isDark
                ? 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold ${
                isSelected
                  ? 'bg-cyan-500 text-slate-950'
                  : isDark
                  ? 'bg-slate-800 text-slate-400'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {slide.id}
            </span>

            <span className="truncate max-w-[120px] font-sans text-[11px] font-medium">
              {slide.title}
            </span>

            <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
              {slide.timing}
            </span>
          </button>
        );
      })}
    </div>
  );
};
