import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Layers, ZoomIn, ZoomOut, RotateCcw, X, ChevronLeft, ChevronRight, Clock, Tag } from 'lucide-react';
import { StillShowcase, ThemeMode } from '../types';
import { STILLS_DATA } from '../data/stills';

interface StillsCarouselProps {
  theme?: ThemeMode;
}

const CATEGORIES = [
  { key: 'all', label: 'All Stills' },
  { key: 'motion-graphics', label: 'Motion Graphics & 3D' },
  { key: 'kinetic-hook', label: 'Kinetic Hooks & UI' },
  { key: 'commercial-ad', label: 'Commercial Ads' },
  { key: 'reels-ugc', label: 'Reels & Shorts' },
];

interface StillLightboxModalProps {
  stills: StillShowcase[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const StillLightboxModal: React.FC<StillLightboxModalProps> = ({
  stills,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const currentStill = stills[currentIndex];

  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [currentIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + stills.length) % stills.length);
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % stills.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, stills.length, onClose, onNavigate]);

  if (!isOpen || !currentStill) return null;

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.5, 1));
  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 overflow-hidden select-none">
      {/* Top Bar */}
      <div className="flex items-center justify-between text-white z-20">
        <div>
          <h3 className="text-sm sm:text-base font-bold font-mono uppercase">{currentStill.title}</h3>
          <p className="text-xs text-zinc-400 font-mono">{currentStill.subtitle}</p>
        </div>

        {/* Zoom & Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors text-xs font-mono"
            title="Reset Zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-red-600/80 hover:bg-red-600 text-white transition-colors ml-2"
            title="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Center Image */}
      <div
        className="relative flex-1 flex items-center justify-center overflow-hidden my-4 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img
          src={currentStill.hdImageUrl || currentStill.imageUrl}
          alt={currentStill.title}
          className="max-h-[82vh] max-w-full object-contain transition-transform duration-100 ease-out"
          style={{
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
          }}
          draggable={false}
        />

        {/* Prev / Next buttons */}
        <button
          onClick={() => onNavigate((currentIndex - 1 + stills.length) % stills.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white backdrop-blur-md transition-all active:scale-90"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => onNavigate((currentIndex + 1) % stills.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white backdrop-blur-md transition-all active:scale-90"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Notes & Highlights */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-400 gap-2 z-20">
        <div>{currentStill.notes}</div>
        <div className="flex items-center gap-2 flex-wrap">
          {currentStill.editingHighlights.map((hl) => (
            <span key={hl} className="px-2 py-0.5 rounded-md bg-white/10 text-zinc-300">
              {hl}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const StillsCarousel: React.FC<StillsCarouselProps> = ({ theme = 'dark' }) => {
  const [stills] = useState<StillShowcase[]>(STILLS_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const isLight = theme === 'light';

  const filteredStills = useMemo(() => {
    if (selectedCategory === 'all') return stills;
    return stills.filter((s) => s.category === selectedCategory);
  }, [stills, selectedCategory]);

  useEffect(() => {
    if (currentIndex >= filteredStills.length) {
      setCurrentIndex(0);
    }
  }, [filteredStills.length, currentIndex]);

  const activeStill = filteredStills[currentIndex] || filteredStills[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredStills.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredStills.length) % filteredStills.length);
  };

  return (
    <section
      id="stills-carousel"
      className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-10 2xl:px-16 transition-colors duration-300 relative ${
        isLight ? 'bg-zinc-50/70 text-zinc-900' : 'bg-black/50 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 border backdrop-blur-md bg-red-500/10 border-red-500/20 text-red-400">
              <Layers className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>FRAME-BY-FRAME SHOWCASE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Interactive Project Screenshots & Stills
            </h2>
            <p className={`text-sm sm:text-base mt-2 max-w-2xl ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
              Examine the high-resolution keyframes, kinetic typography hooks, 3D motion graphics, and DaVinci Resolve color grading that drive Rohaan's video edits. Click any frame to zoom and inspect in detail.
            </p>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {CATEGORIES.map(({ key, label }) => {
            const count = key === 'all' ? stills.length : stills.filter((s) => s.category === key).length;
            const isSelected = selectedCategory === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setSelectedCategory(key);
                  setCurrentIndex(0);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 shrink-0 min-h-[36px] ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                    : isLight
                    ? 'bg-zinc-200/80 text-zinc-700 hover:bg-zinc-300 border border-zinc-300/80'
                    : 'bg-white/5 text-zinc-300 hover:bg-white/15 border border-white/10'
                }`}
              >
                <span>{label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-white/25 text-white' : isLight ? 'bg-zinc-300 text-zinc-700' : 'bg-white/10 text-zinc-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Featured Still Card */}
        {activeStill && (
          <div
            className={`relative rounded-3xl overflow-hidden border shadow-2xl transition-all duration-300 group ${
              isLight
                ? 'bg-white/90 border-zinc-200/90 shadow-zinc-200/60'
                : 'bg-zinc-950/80 border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl'
            }`}
          >
            {/* Click to open Lightbox */}
            <div
              onClick={() => setIsLightboxOpen(true)}
              className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[640px] bg-black cursor-pointer overflow-hidden flex items-center justify-center"
            >
              <img
                src={activeStill.imageUrl || activeStill.hdImageUrl}
                alt={activeStill.title}
                className="w-full h-full object-contain sm:object-cover transform transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 pointer-events-none" />

              {/* Top Details */}
              <div className="absolute top-3 sm:top-5 left-3 sm:left-5 right-3 sm:right-5 flex items-center justify-between z-10 pointer-events-none">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md border border-white/20 text-white shadow-md">
                    {activeStill.category.replace('-', ' ')}
                  </span>
                  {activeStill.timestamp && (
                    <span className="hidden xs:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono bg-red-600/80 backdrop-blur-md text-white font-medium shadow-md">
                      <Clock className="w-3 h-3" />
                      {activeStill.timestamp}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 pointer-events-auto">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/25 text-white text-xs font-semibold shadow-lg transition-all">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Inspect & Zoom</span>
                  </div>
                </div>
              </div>

              {/* Prev / Next controls */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white backdrop-blur-md transition-all active:scale-90 shadow-2xl opacity-80 group-hover:opacity-100"
                aria-label="Previous frame"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white backdrop-blur-md transition-all active:scale-90 shadow-2xl opacity-80 group-hover:opacity-100"
                aria-label="Next frame"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Bottom Information overlay */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-8 z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 pointer-events-none">
                <div className="max-w-2xl">
                  <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wide leading-tight">
                    {activeStill.title}
                  </h3>
                  <p className="text-sm font-medium text-zinc-300 mt-1">{activeStill.subtitle}</p>
                  <p className="text-xs text-zinc-400 mt-2 font-mono line-clamp-2">{activeStill.notes}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 pointer-events-auto">
                  {activeStill.software.map((sw) => (
                    <span
                      key={sw}
                      className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-white/15 backdrop-blur-md text-white border border-white/20"
                    >
                      {sw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom thumbnail strip */}
            <div className="p-4 sm:p-5 border-t border-white/10 flex items-center gap-3 overflow-x-auto scrollbar-none">
              {filteredStills.map((still, idx) => (
                <button
                  key={still.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative w-24 sm:w-32 aspect-video rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    idx === currentIndex
                      ? 'border-red-500 scale-105 shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={still.imageUrl} alt={still.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <StillLightboxModal
        stills={filteredStills}
        currentIndex={currentIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={setCurrentIndex}
      />
    </section>
  );
};
