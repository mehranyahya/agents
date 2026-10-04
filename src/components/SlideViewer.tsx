import React from 'react';
import { Slide0Title } from './slides/Slide0Title';
import { Slide1ChatbotVsAgent } from './slides/Slide1ChatbotVsAgent';
import { Slide2Architecture } from './slides/Slide2Architecture';
import { Slide3AgentLoop } from './slides/Slide3AgentLoop';
import { Slide4RealWorld } from './slides/Slide4RealWorld';
import { Slide5ApplicationsDemo } from './slides/Slide5ApplicationsDemo';
import { Slide6CompoundingErrors } from './slides/Slide6CompoundingErrors';
import { Slide7MultiAgent } from './slides/Slide7MultiAgent';
import { Slide8Summary } from './slides/Slide8Summary';

interface SlideViewerProps {
  currentSlideIndex: number;
  theme: 'dark' | 'light';
  isFullscreen: boolean;
}

export const SlideViewer: React.FC<SlideViewerProps> = ({
  currentSlideIndex,
  theme,
  isFullscreen,
}) => {
  const isDark = theme === 'dark';

  const renderSlide = () => {
    switch (currentSlideIndex) {
      case 0:
        return <Slide0Title theme={theme} />;
      case 1:
        return <Slide1ChatbotVsAgent theme={theme} />;
      case 2:
        return <Slide2Architecture theme={theme} />;
      case 3:
        return <Slide3AgentLoop theme={theme} />;
      case 4:
        return <Slide4RealWorld theme={theme} />;
      case 5:
        return <Slide5ApplicationsDemo theme={theme} />;
      case 6:
        return <Slide6CompoundingErrors theme={theme} />;
      case 7:
        return <Slide7MultiAgent theme={theme} />;
      case 8:
        return <Slide8Summary theme={theme} />;
      default:
        return <Slide0Title theme={theme} />;
    }
  };

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
