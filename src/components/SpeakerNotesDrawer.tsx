import React from 'react';
import { Mic, Clock, Sparkles, AlertCircle, ChevronDown, CheckCircle2 } from 'lucide-react';
import { SLIDES } from '../data/slidesData';

interface SpeakerNotesDrawerProps {
  currentSlideIndex: number;
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
}

export const SpeakerNotesDrawer: React.FC<SpeakerNotesDrawerProps> = ({
  currentSlideIndex,
  isOpen,
  onClose,
  theme,
}) => {
  if (!isOpen) return null;

  const currentSlide = SLIDES[currentSlideIndex];
  const isDark = theme === 'dark';

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-40 border-t shadow-2xl transition-transform max-h-[42vh] flex flex-col ${
        isDark ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
      }`}
    >
      {/* Drawer Header */}
      <div className="flex items-center justify-between px-6 py-2.5 border-b border-slate-700/50 bg-slate-950/40">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-cyan-500/20 text-cyan-400">
            <Mic className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm">
            یادداشت‌های شفاهی سخنران (اسلاید {currentSlideIndex + 1}: {currentSlide.title})
          </span>
          <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            زمان تخصیص‌یافته: {currentSlide.timing}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          title="بستن پنل یادداشت‌ها"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Body */}
      <div className="overflow-y-auto p-6 space-y-4 text-sm leading-relaxed">
        {/* Oral script points */}
        <div className="space-y-2.5">
          <div className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>متن پیشنهادی برای بیان شفاهی (این موارد را در اسلاید ننوشته‌ایم تا خلوت بماند):</span>
          </div>

          <div className="space-y-2">
            {currentSlide.oralNotes.map((note, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border flex items-start gap-2.5 ${
                  isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-slate-300 text-xs md:text-sm">{note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Essential Takeaway / Scientific Caution */}
        <div
          className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs ${
            isDark ? 'bg-amber-950/20 border-amber-500/30 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}
        >
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-0.5">پیام کلیدی اسلاید:</span>
            <span>{currentSlide.keyTakeaway}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
