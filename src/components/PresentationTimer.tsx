import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';
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

  // Planned: 9:25 (565s); absolute cap: 10:00 (600s).
  const currentSlide = SLIDES[currentSlideIndex];
  const slideTarget = currentSlide ? currentSlide.timing : '۱:۰۰';

  // Total cumulative target up to this slide
  const cumulativeTargetSeconds = SLIDES.slice(0, currentSlideIndex + 1).reduce(
    (acc, curr) => acc + curr.durationSeconds,
    0
  );

  const plannedSeconds = SLIDES.reduce((sum, slide) => sum + slide.durationSeconds, 0);
  const isOverPace = totalSeconds > cumulativeTargetSeconds + 20;
  const isNearHardLimit = totalSeconds >= 570 && totalSeconds < 600;
  const isPastHardLimit = totalSeconds >= 600;

  return (
    <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200">
      <Clock className={`w-3.5 h-3.5 ${isPastHardLimit ? 'text-red-500 animate-pulse' : isNearHardLimit || isOverPace ? 'text-amber-400' : 'text-cyan-400'}`} />

      <div className="flex items-baseline gap-1 font-mono">
        <span className="font-bold text-sm text-cyan-300">{formatTime(totalSeconds)}</span>
        <span className="text-[10px] text-slate-400">/ ۱۰:۰۰</span>
        <span className="text-[10px] text-slate-500" title="هدف زمان‌بندی‌شده">هدف: {formatTime(plannedSeconds)}</span>
      </div>

      <div className="h-4 w-px bg-slate-800 mx-1" />

      <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400">
        <span>اسلاید {currentSlideIndex + 1}:</span>
        <span className="text-cyan-400 font-mono font-semibold">{slideTarget}</span>
      </div>

      {(isPastHardLimit || isNearHardLimit || isOverPace) && (
        <span className={`text-[10px] font-medium hidden lg:inline ${
          isPastHardLimit ? 'text-red-400' : 'text-amber-400'
        }`}>
          {isPastHardLimit ? 'سقف ۱۰ دقیقه تمام شد' : isNearHardLimit ? 'کمتر از ۳۰ ثانیه تا سقف' : 'عقب‌تر از زمان‌بندی'}
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
