import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Fast inner dot
  const cursorX = useSpring(0, { stiffness: 600, damping: 35, mass: 0.5 });
  const cursorY = useSpring(0, { stiffness: 600, damping: 35, mass: 0.5 });

  // Trailing ring
  const ringX = useSpring(0, { stiffness: 220, damping: 24, mass: 0.8 });
  const ringY = useSpring(0, { stiffness: 220, damping: 24, mass: 0.8 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    let rafId: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      if (!rafId) {
        rafId = window.requestAnimationFrame(() => {
          rafId = null;
          const target = e.target as HTMLElement | null;
          if (target) {
            const isClickable = !!target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer');
            const isVideo = !!target.closest('.group, [data-video-card]');
            setIsHovered(isClickable);
            setIsVideoHovered(isVideo && isClickable);
          }
        });
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, ringX, ringY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Outer Spring Ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: isMouseDown ? 0.75 : isVideoHovered ? 2.2 : isHovered ? 1.6 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
      >
        <div
          className={`rounded-full transition-all duration-300 flex items-center justify-center font-mono text-[9px] font-bold tracking-widest uppercase ${
            isVideoHovered
              ? 'w-16 h-16 bg-red-600/20 dark:bg-rose-500/25 border border-red-500/80 text-red-600 dark:text-rose-300 shadow-[0_0_20px_rgba(239,68,68,0.4)] backdrop-blur-[2px]'
              : isHovered
              ? 'w-12 h-12 bg-zinc-900/10 dark:bg-white/10 border border-zinc-900/40 dark:border-white/40 shadow-lg'
              : 'w-9 h-9 border border-red-500/40 dark:border-red-500/50'
          }`}
        >
          {isVideoHovered && (
            <motion.span initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-[8px] tracking-tighter">
              PLAY
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* Center Precision Dot */}
      <motion.div
        style={{ x: cursorX, y: cursorY }}
        animate={{
          scale: isMouseDown ? 0.5 : isVideoHovered ? 0 : isHovered ? 1.4 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <div className="w-2.5 h-2.5 bg-red-500 dark:bg-rose-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
      </motion.div>
    </div>
  );
};
