import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, ArrowUp } from 'lucide-react';
import { ThemeMode } from '../types';

interface SectionCheckpoint {
  id: string;
  number: string;
  title: string;
  start: number;
  end: number;
}

const SECTIONS: SectionCheckpoint[] = [
  { id: 'hero', number: '01', title: 'Intro', start: 0, end: 0.18 },
  { id: 'portfolio', number: '02', title: 'Showreel', start: 0.18, end: 0.38 },
  { id: 'stills-carousel', number: '03', title: 'Stills', start: 0.38, end: 0.55 },
  { id: 'before-after', number: '04', title: 'Color Grade', start: 0.55, end: 0.7 },
  { id: 'personal-projects', number: '05', title: 'Tools', start: 0.7, end: 0.85 },
  { id: 'skills', number: '06', title: 'Stack', start: 0.85, end: 1 },
];

export const FloatingActions: React.FC<{ theme?: ThemeMode }> = ({ theme = 'dark' }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [hoverInfo, setHoverInfo] = useState<{ x: number; progress: number } | null>(null);

  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const isLight = theme === 'light';
  const isHalloween = theme === 'halloween';

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const totalScrollable = doc.scrollHeight - window.innerHeight;
      if (totalScrollable <= 0) {
        setScrollProgress(0);
        return;
      }
      const currentScroll = window.scrollY || doc.scrollTop;
      const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
      setScrollProgress(progress);

      let currentSec = 0;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        if (progress >= SECTIONS[i].start - 0.04) {
          currentSec = i;
          break;
        }
      }
      setActiveSectionIdx(currentSec);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Spacebar toggle playback
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName)) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Teleprompter presentation auto-scroll
  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = performance.now();
      const scrollStep = (now: number) => {
        if (!lastTimeRef.current) lastTimeRef.current = now;
        const delta = now - lastTimeRef.current;
        lastTimeRef.current = now;

        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (maxScroll > 0) {
          const nextY = window.scrollY + (delta / 1000) * 200;
          if (nextY >= maxScroll - 2) {
            window.scrollTo({ top: 0, behavior: 'instant' });
          } else {
            window.scrollTo({ top: nextY, behavior: 'instant' });
          }
        }
        rafRef.current = requestAnimationFrame(scrollStep);
      };

      rafRef.current = requestAnimationFrame(scrollStep);
    } else {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying]);

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrubberPointer = (clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(clientX - rect.left, rect.width)) / rect.width;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: ratio * maxScroll, behavior: 'instant' });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsScrubbing(true);
    handleScrubberPointer(e.clientX);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isScrubbing) {
      handleScrubberPointer(e.clientX);
    }
    if (trackRef.current) {
      const rect = trackRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      setHoverInfo({ x, progress: x / rect.width });
    }
  };

  const handlePointerUp = () => {
    setIsScrubbing(false);
  };

  const formatPercentage = (val: number) => `${Math.round(val * 100)}%`;

  const hoveredSection = hoverInfo
    ? SECTIONS.find((s) => hoverInfo.progress >= s.start && hoverInfo.progress <= s.end) || SECTIONS[0]
    : null;

  return (
    <div className="fixed bottom-4 sm:bottom-6 inset-x-0 z-40 flex justify-center px-3 sm:px-6 pointer-events-none">
      <div
        className={`pointer-events-auto max-w-xl w-full backdrop-blur-2xl backdrop-saturate-200 rounded-full px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-3 sm:gap-4 transition-all duration-300 border ${
          isLight
            ? 'bg-white/85 border-zinc-200/90 shadow-[0_12px_36px_rgba(0,0,0,0.1),0_1px_1px_rgba(255,255,255,0.8)] text-zinc-900'
            : isHalloween
            ? 'bg-[#12081f]/85 border-orange-500/30 shadow-[0_15px_40px_rgba(249,115,22,0.25),0_0_20px_rgba(168,85,247,0.2)] text-white'
            : 'bg-zinc-900/80 border-white/[0.12] shadow-[0_20px_48px_rgba(0,0,0,0.6),0_1px_1px_rgba(255,255,255,0.06)] text-white'
        }`}
      >
        {/* Play/Pause Auto-Scroll */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? 'Pause Presentation' : 'Play Presentation'}
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 active:scale-90 ${
            isPlaying
              ? isHalloween
                ? 'bg-orange-500 text-white shadow-[0_0_12px_rgba(249,115,22,0.85)]'
                : isLight
                ? 'bg-zinc-900 text-white'
                : 'bg-white text-zinc-950'
              : isHalloween
              ? 'hover:bg-orange-500/20 text-orange-400 hover:text-orange-300'
              : isLight
              ? 'hover:bg-black/5 text-zinc-700 hover:text-black'
              : 'hover:bg-white/10 text-zinc-300 hover:text-white'
          }`}
          title={isPlaying ? 'Pause (Space)' : 'Play Presentation (Space)'}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 fill-current" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          )}
        </button>

        {/* Center Section List & Scrubber Track */}
        <div className="flex-1 flex flex-col justify-center gap-1">
          {/* Section labels */}
          <div className="flex items-center justify-between px-0.5">
            {SECTIONS.map((sec, idx) => {
              const isActive = idx === activeSectionIdx;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`text-[10px] sm:text-[11px] font-medium tracking-tight transition-colors duration-150 flex items-center gap-1 ${
                    isActive
                      ? isLight
                        ? 'text-zinc-950 font-semibold'
                        : 'text-white font-semibold'
                      : isLight
                      ? 'text-zinc-400 hover:text-zinc-700'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <span className={`text-[9px] font-mono opacity-50 ${isActive ? 'opacity-90' : ''}`}>
                    {sec.number}
                  </span>
                  <span className="hidden xs:inline sm:inline">{sec.title}</span>
                </button>
              );
            })}
          </div>

          {/* Scrubber progress bar */}
          <div
            ref={trackRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onMouseLeave={() => setHoverInfo(null)}
            className="relative h-4 flex items-center cursor-pointer touch-none group/track"
          >
            <div className={`w-full h-1.5 sm:h-2 rounded-full overflow-hidden ${isLight ? 'bg-black/10' : 'bg-white/15'}`}>
              <div
                className={`h-full rounded-full relative overflow-hidden ${
                  isHalloween
                    ? 'animate-water-fill-halloween shadow-[0_0_14px_rgba(249,115,22,0.95)]'
                    : 'animate-water-fill shadow-[0_0_12px_rgba(239,68,68,0.85)]'
                }`}
                style={{ width: `${scrollProgress * 100}%` }}
              >
                <div
                  className={`absolute inset-0 pointer-events-none ${
                    isHalloween ? 'animate-water-waves-halloween' : 'animate-water-waves'
                  }`}
                />
                <div className="absolute top-0 left-0 right-0 h-[0.5px] bg-white/60 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-r from-transparent to-white/40 rounded-r-full pointer-events-none" />
              </div>
            </div>

            {/* Checkpoint Dots */}
            <div className="absolute inset-0 flex items-center justify-between px-1 pointer-events-none">
              {SECTIONS.slice(1).map((sec) => (
                <div
                  key={sec.id}
                  className={`w-1 h-1 rounded-full ${
                    scrollProgress >= sec.start ? 'bg-red-200' : isLight ? 'bg-black/20' : 'bg-white/30'
                  }`}
                  style={{ left: `${sec.start * 100}%`, position: 'absolute', transform: 'translateX(-50%)' }}
                />
              ))}
            </div>

            {/* Scrubber Tooltip */}
            {hoverInfo && !isScrubbing && (
              <div
                className="absolute -top-7 -translate-x-1/2 pointer-events-none"
                style={{ left: `${hoverInfo.x}px` }}
              >
                <div
                  className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full shadow-lg border whitespace-nowrap backdrop-blur-xl ${
                    isLight
                      ? 'bg-zinc-900/90 text-white border-zinc-700'
                      : 'bg-black/90 text-zinc-100 border-white/20'
                  }`}
                >
                  {hoveredSection?.title} · {formatPercentage(hoverInfo.progress)}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Percentage & Scroll-To-Top */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <span className={`font-mono text-[10px] sm:text-[11px] tabular-nums font-medium ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
            {formatPercentage(scrollProgress)}
          </span>
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setIsPlaying(false);
            }}
            aria-label="Back to Top"
            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all duration-150 active:scale-90 ${
              isLight
                ? 'hover:bg-black/5 text-zinc-400 hover:text-zinc-900'
                : 'hover:bg-white/10 text-zinc-500 hover:text-white'
            }`}
            title="Back to Top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
