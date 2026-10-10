/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { SlideViewer } from './components/SlideViewer';
import { SlideThumbnails } from './components/SlideThumbnails';
import { SpeakerNotesDrawer } from './components/SpeakerNotesDrawer';
import { GoogleSlidesModal } from './components/GoogleSlidesModal';
import { SLIDES } from './data/slidesData';

export default function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);
  const [isGoogleSlidesModalOpen, setIsGoogleSlidesModalOpen] = useState<boolean>(false);

  const totalSlides = SLIDES.length;

  const handleNext = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.min(prev + 1, totalSlides - 1));
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const enterFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    }
    setIsFullscreen(true);
  }, []);

  const exitFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    }
    setIsFullscreen(false);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  }, [isFullscreen, enterFullscreen, exitFullscreen]);

  // Listen for fullscreen change event from browser
  useEffect(() => {
    const onFullscreenChange = () => {
      // Sync state if user pressed Esc natively
      if (!document.fullscreenElement && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, [isFullscreen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      switch (e.key) {
        // In Persian RTL: ArrowLeft goes forward, ArrowRight goes backward
        case 'ArrowLeft':
        case ' ':
        case 'PageDown':
          e.preventDefault();
          handleNext();
          break;
        case 'ArrowRight':
        case 'Backspace':
        case 'PageUp':
          e.preventDefault();
          handlePrev();
          break;
        case 'Home':
          e.preventDefault();
          setCurrentSlideIndex(0);
          break;
        case 'End':
          e.preventDefault();
          setCurrentSlideIndex(totalSlides - 1);
          break;
        case 'Escape':
          if (isFullscreen) {
            e.preventDefault();
            exitFullscreen();
          }
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'n':
        case 'N':
          setIsNotesOpen((prev) => !prev);
          break;
        default:
          // number keys 0-9 for quick jump
          if (e.key >= '0' && e.key <= '9') {
            const idx = parseInt(e.key, 10);
            if (idx < totalSlides) {
              setCurrentSlideIndex(idx);
            }
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, totalSlides, toggleFullscreen, isFullscreen, exitFullscreen]);

  const isDark = theme === 'dark';

  return (
    <div
      dir="rtl"
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'
      }`}
    >
      {/* Top Presentation Navbar: Hidden completely in fullscreen */}
      {!isFullscreen && (
        <Navbar
          currentSlideIndex={currentSlideIndex}
          onPrev={handlePrev}
          onNext={handleNext}
          theme={theme}
          onToggleTheme={toggleTheme}
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
          isNotesOpen={isNotesOpen}
          onToggleNotes={() => setIsNotesOpen((prev) => !prev)}
          onOpenGoogleSlidesModal={() => setIsGoogleSlidesModalOpen(true)}
        />
      )}

      {/* Main Slide Canvas Area */}
      <main
        className={`flex-1 flex flex-col items-center justify-center ${
          isFullscreen
            ? 'p-0 m-0 w-screen h-screen max-w-none overflow-hidden'
            : 'p-3 md:p-6 max-w-6xl w-full mx-auto'
        }`}
      >
        <SlideViewer
          currentSlideIndex={currentSlideIndex}
          theme={theme}
          isFullscreen={isFullscreen}
          onNext={handleNext}
          onPrev={handlePrev}
          onExitFullscreen={exitFullscreen}
          onToggleTheme={toggleTheme}
          onToggleNotes={() => setIsNotesOpen((prev) => !prev)}
          isNotesOpen={isNotesOpen}
        />

        {/* Slide Carousel Thumbnails: Hidden completely in fullscreen */}
        {!isFullscreen && (
          <div className="w-full mt-3">
            <SlideThumbnails
              currentSlideIndex={currentSlideIndex}
              onSelectSlide={(idx) => setCurrentSlideIndex(idx)}
              theme={theme}
            />
          </div>
        )}
      </main>

      {/* Slide Speaker Notes Drawer */}
      <SpeakerNotesDrawer
        currentSlideIndex={currentSlideIndex}
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        theme={theme}
      />

      {/* Google Slides Export Modal */}
      <GoogleSlidesModal
        isOpen={isGoogleSlidesModalOpen}
        onClose={() => setIsGoogleSlidesModalOpen(false)}
        theme={theme}
      />
    </div>
  );
}
