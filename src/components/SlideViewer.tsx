import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Minimize2,
  Maximize2,
  Moon,
  Sun,
  Mic,
  Clock,
  Sparkles
} from 'lucide-react';
import { Slide0Title } from './slides/Slide0Title';
import { Slide1ChatbotVsAgent } from './slides/Slide1ChatbotVsAgent';
import { Slide2Architecture } from './slides/Slide2Architecture';
import { Slide3AgentLoop } from './slides/Slide3AgentLoop';
import { Slide4RealWorld } from './slides/Slide4RealWorld';
import { Slide5ApplicationsDemo } from './slides/Slide5ApplicationsDemo';
import { Slide6CompoundingErrors } from './slides/Slide6CompoundingErrors';
import { Slide7MultiAgent } from './slides/Slide7MultiAgent';
import { Slide8Summary } from './slides/Slide8Summary';
import { SLIDES } from '../data/slidesData';

interface SlideViewerProps {
  currentSlideIndex: number;
  theme: 'dark' | 'light';
  isFullscreen: boolean;
  onNext?: () => void;
  onPrev?: () => void;
  onExitFullscreen?: () => void;
  onToggleTheme?: () => void;
  onToggleNotes?: () => void;
  isNotesOpen?: boolean;
}

export const SlideViewer: React.FC<SlideViewerProps> = ({
  currentSlideIndex,
  theme,
  isFullscreen,
  onNext,
  onPrev,
  onExitFullscreen,
  onToggleTheme,
  onToggleNotes,
  isNotesOpen,
}) => {
  const isDark = theme === 'dark';
  const totalSlides = SLIDES.length;

  // Auto-hiding floating controls for fullscreen mode
  const [showControls, setShowControls] = useState(true);
  const hideTimerRef = useRef<any>(null);

  useEffect(() => {
    if (!isFullscreen) {
      setShowControls(true);
      return;
    }

    const handleMouseMove = () => {
      setShowControls(true);
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
      hideTimerRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    // Initial timer to hide
    hideTimerRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [isFullscreen]);

  const renderSlide = () => {
    switch (currentSlideIndex) {
      case 0:
        return <Slide0Title theme={theme} isFullscreen={isFullscreen} />;
      case 1:
        return <Slide1ChatbotVsAgent theme={theme} isFullscreen={isFullscreen} />;
      case 2:
        return <Slide2Architecture theme={theme} isFullscreen={isFullscreen} />;
      case 3:
        return <Slide3AgentLoop theme={theme} isFullscreen={isFullscreen} />;
      case 4:
        return <Slide4RealWorld theme={theme} isFullscreen={isFullscreen} />;
      case 5:
        return <Slide5ApplicationsDemo theme={theme} isFullscreen={isFullscreen} />;
      case 6:
        return <Slide6CompoundingErrors theme={theme} isFullscreen={isFullscreen} />;
      case 7:
        return <Slide7MultiAgent theme={theme} isFullscreen={isFullscreen} />;
      case 8:
        return <Slide8Summary theme={theme} isFullscreen={isFullscreen} />;
      default:
        return <Slide0Title theme={theme} isFullscreen={isFullscreen} />;
    }
  };

  // Fullscreen container
  if (isFullscreen) {
    return (
      <div
        className={`fixed inset-0 z-50 w-screen h-screen flex items-center justify-center overflow-hidden transition-all duration-300 ${
          showControls ? '' : 'cursor-none'
        } ${isDark ? 'bg-black text-slate-100' : 'bg-slate-200 text-slate-900'}`}
      >
        {/* Maximum 16:9 Aspect Ratio Container filling the entire screen */}
        <div
          className={`relative w-full h-full max-w-[177.78vh] max-h-[56.25vw] aspect-[16/9] flex flex-col justify-between overflow-hidden shadow-2xl transition-colors duration-300 ${
            isDark ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900'
          }`}
        >
          {/* Subtle Background Mesh Texture */}
          <div
            className={`absolute inset-0 pointer-events-none opacity-25 ${
              isDark
                ? 'bg-[radial-gradient(#38bdf8_1.5px,transparent_1.5px)] [background-size:32px_32px]'
                : 'bg-[radial-gradient(#94a3b8_1.5px,transparent_1.5px)] [background-size:32px_32px]'
            }`}
          />

          {/* Slide Inner View */}
          <div className="relative z-10 w-full h-full flex flex-col justify-between">
            {renderSlide()}
          </div>
        </div>

        {/* Minimal Floating Control Dock (Auto-hides on inactivity) */}
        <div
          className={`fixed bottom-6 inset-x-0 flex justify-center z-50 transition-opacity duration-300 pointer-events-none ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900/90 hover:bg-slate-900 text-slate-200 border border-slate-700/80 shadow-2xl backdrop-blur-md text-xs font-mono">
            {/* Prev */}
            <button
              onClick={onPrev}
              disabled={currentSlideIndex === 0}
              className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white disabled:opacity-30 transition-colors"
              title="اسلاید قبلی"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Slide Indicator */}
            <div className="px-2 font-bold font-sans text-cyan-400">
              اسلاید {currentSlideIndex} از {totalSlides - 1}
            </div>

            {/* Next */}
            <button
              onClick={onNext}
              disabled={currentSlideIndex === totalSlides - 1}
              className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white disabled:opacity-30 transition-colors"
              title="اسلاید بعدی"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="h-4 w-px bg-slate-700 mx-1" />

            {/* Speaker Notes button */}
            {onToggleNotes && (
              <button
                onClick={onToggleNotes}
                className={`p-1.5 rounded-xl transition-colors ${
                  isNotesOpen
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
                title="یادداشت‌های سخنران"
              >
                <Mic className="w-4 h-4" />
              </button>
            )}

            {/* Theme toggle */}
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                title="تغییر تم"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
              </button>
            )}

            {/* Exit Fullscreen */}
            {onExitFullscreen && (
              <button
                onClick={onExitFullscreen}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-sans font-semibold transition-colors"
                title="خروج از تمام‌صفحه (Esc)"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">خروج</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Standard non-fullscreen embedded view
  return (
    <div
      className={`relative w-full aspect-[16/9] max-h-[82vh] rounded-3xl overflow-hidden border shadow-2xl transition-all duration-300 ${
        isDark
          ? 'bg-slate-950 border-slate-800/80 shadow-cyan-950/20 text-slate-100'
          : 'bg-white border-slate-200 shadow-slate-200/80 text-slate-900'
      }`}
    >
      {/* Background visual texture */}
      <div
        className={`absolute inset-0 pointer-events-none opacity-20 ${
          isDark
            ? 'bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]'
            : 'bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px]'
        }`}
      />

      <div className="relative z-10 w-full h-full">
        {renderSlide()}
      </div>
    </div>
  );
};
