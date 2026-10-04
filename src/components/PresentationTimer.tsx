import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock, AlertCircle } from 'lucide-react';
import { SLIDES } from '../data/slidesData';

interface TimerProps {
  currentSlideIndex: number;
}

export const PresentationTimer: React.FC<TimerProps> = ({ currentSlideIndex }) => {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTotalSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const resetTimer = () => {
    setIsRunning(false);
    setTotalSeconds(0);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Target duration calculation:
  // Presentation is ~10 minutes (600s)
  const currentSlide = SLIDES[currentSlideIndex];
  const slideTarget = currentSlide ? currentSlide.timing : '۱:۰۰';

  // Total cumulative target up to this slide
  const cumulativeTargetSeconds = SLIDES.slice(0, currentSlideIndex + 1).reduce(
    (acc, curr) => acc + curr.durationSeconds,
    0
  );

  const isOverPace = totalSeconds > cumulativeTargetSeconds + 20;

  return (
    <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200">
      <Clock className={`w-3.5 h-3.5 ${isOverPace ? 'text-red-400 animate-pulse' : 'text-cyan-400'}`} />

      <div className="flex items-baseline gap-1 font-mono">
        <span className="font-bold text-sm text-cyan-300">{formatTime(totalSeconds)}</span>
        <span className="text-[10px] text-slate-400">/ ۱۰:۰۰</span>
      </div>

      <div className="h-4 w-px bg-slate-800 mx-1" />

      <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400">
        <span>اسلاید {currentSlideIndex}:</span>
        <span className="text-cyan-400 font-mono font-semibold">{slideTarget}</span>
      </div>

      {isOverPace && (
        <span className="text-[10px] text-red-400 font-medium hidden md:inline">
          عقب‌تر از زمان‌بندی
        </span>
      )}

      <div className="flex items-center gap-1 mr-1">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="p-1 rounded hover:bg-slate-800 text-slate-300 transition-colors"
          title={isRunning ? 'توقف تایمر' : 'شروع تایمر'}
        >
          {isRunning ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
        </button>

        <button
          onClick={resetTimer}
          className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          title="ریست تایمر"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
