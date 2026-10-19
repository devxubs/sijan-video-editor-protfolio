import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Eye, TrendingUp, Zap, Star, Play, Video, Sparkles } from 'lucide-react';
import { ThemeMode } from '../types';

interface MetricItem {
  label: string;
  targetValue: number;
  prefix?: string;
  suffix: string;
  decimals: number;
  icon: React.ComponentType<{ className?: string }>;
  sub: string;
  glowColor: string;
}

interface StatCardProps {
  stat: MetricItem;
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({ stat, index }) => {
  const [val, setVal] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });
  const Icon = stat.icon;

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    const duration = 1800;

    const animateNumber = (now: number) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = (1 - Math.pow(1 - progress, 3)) * stat.targetValue;
      setVal(eased);
      if (progress < 1) {
        requestAnimationFrame(animateNumber);
      }
    };

    const rafId = requestAnimationFrame(animateNumber);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, stat.targetValue]);

  const displayValue = `${stat.prefix || ''}${val.toFixed(stat.decimals)}${stat.suffix}`;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.215, 0.61, 0.355, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 p-3.5 sm:p-5 md:p-6 flex flex-col justify-between group overflow-hidden shadow-md dark:shadow-xl transition-colors rounded-2xl"
    >
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br ${stat.glowColor}`}
      />
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
      />
      <div className="flex items-center justify-between mb-2 sm:mb-4 relative z-10 gap-1">
        <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider sm:tracking-widest text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors truncate">
          {stat.label}
        </span>
        <div className="relative p-1.5 sm:p-2 bg-zinc-100 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800/80 rounded-lg sm:rounded-xl group-hover:border-blue-500/50 dark:group-hover:border-blue-500/50 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/30 transition-all duration-300 shrink-0">
          <motion.div
            className={`absolute inset-0 rounded-lg sm:rounded-xl -z-10 ${
              index === 0
                ? 'bg-blue-500/25'
                : index === 1
                ? 'bg-emerald-500/25'
                : index === 2
                ? 'bg-amber-500/25'
                : 'bg-indigo-500/25'
            }`}
            animate={{ scale: [1, 1.35, 1], opacity: [0.1, 0.6, 0.1] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.4, ease: 'easeInOut' }}
          />
          <motion.div
            animate={
              index === 0
                ? { scale: [1, 1.18, 1], opacity: [0.85, 1, 0.85] }
                : index === 1
                ? { y: [0, -3, 0], x: [0, 2, 0] }
                : index === 2
                ? { scale: [1, 1.2, 0.95, 1.12, 1], rotate: [0, -6, 6, -3, 0], y: [0, -2, 0] }
                : { rotate: [0, 180, 360], scale: [1, 1.08, 1] }
            }
            transition={{
              duration: index === 2 ? 1.8 : index === 3 ? 8 : 2.5,
              repeat: Infinity,
              ease: index === 3 ? 'linear' : 'easeInOut',
            }}
            whileHover={{ scale: 1.3, rotate: index === 3 ? 90 : index === 2 ? 12 : index === 0 ? 0 : -8 }}
            className="flex items-center justify-center"
          >
            <Icon
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors duration-300 ${
                index === 0
                  ? 'text-blue-600 dark:text-blue-400 group-hover:text-blue-500'
                  : index === 1
                  ? 'text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-500'
                  : index === 2
                  ? 'text-amber-600 dark:text-amber-400 group-hover:text-amber-500'
                  : 'text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500'
              }`}
            />
          </motion.div>
        </div>
      </div>
      <div className="relative z-10">
        <div className="text-2xl sm:text-3xl md:text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight font-mono group-hover:text-black dark:group-hover:text-white transition-colors flex items-baseline gap-0.5 sm:gap-1">
          {displayValue}
        </div>
        <div className="text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-400 mt-1 uppercase tracking-wider font-mono transition-colors line-clamp-1">
          {stat.sub}
        </div>
      </div>
    </motion.div>
  );
};

interface HeroProps {
  theme: ThemeMode;
  onPlayShowreel: () => void;
  onScrollToPortfolio: () => void;
}

export const Hero: React.FC<HeroProps> = ({ theme = 'dark', onPlayShowreel, onScrollToPortfolio }) => {
  const isHalloween = theme === 'halloween';

  const stats: MetricItem[] = [
    {
      label: 'CAMPAIGN VIEWS',
      targetValue: 15,
      suffix: 'M+',
      decimals: 0,
      icon: Eye,
      sub: 'Across Video Ads & Reels',
      glowColor: isHalloween
        ? 'from-orange-500/20 via-transparent to-transparent'
        : 'from-blue-500/10 via-transparent to-transparent',
    },
    {
      label: 'AVERAGE ROAS',
      targetValue: 3.8,
      suffix: 'x',
      decimals: 1,
      icon: TrendingUp,
      sub: 'Direct Response Ads',
      glowColor: isHalloween
        ? 'from-amber-500/20 via-transparent to-transparent'
        : 'from-emerald-500/10 via-transparent to-transparent',
    },
    {
      label: 'RETENTION BOOST',
      targetValue: 48,
      prefix: '+',
      suffix: '%',
      decimals: 0,
      icon: Zap,
      sub: 'Viewer Engagement',
      glowColor: isHalloween
        ? 'from-red-500/25 via-transparent to-transparent'
        : 'from-amber-500/10 via-transparent to-transparent',
    },
    {
      label: 'CLIENT RATING',
      targetValue: 4.9,
      suffix: '/5',
      decimals: 1,
      icon: Star,
      sub: 'Over 40 Client Reviews',
      glowColor: isHalloween
        ? 'from-purple-500/25 via-transparent to-transparent'
        : 'from-indigo-500/10 via-transparent to-transparent',
    },
  ];

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-slate-50/75 dark:bg-[#0A0A0A]/75 pt-10 sm:pt-16 md:pt-20 pb-16 sm:pb-24 border-b border-zinc-200/80 dark:border-zinc-900/80 transition-colors duration-300"
    >
      {/* Halloween spiderweb decorations */}
      {isHalloween && (
        <>
          <div className="absolute top-0 left-0 w-28 sm:w-36 h-28 sm:h-36 pointer-events-none opacity-25 z-0">
            <svg viewBox="0 0 100 100" className="w-full h-full text-orange-400 fill-none stroke-current stroke-[1.2]">
              <path d="M0,0 L100,0 M0,0 L0,100 M0,0 L70,70 M0,0 L40,85 M0,0 L85,40" />
              <path d="M20,0 A20,20 0 0,1 0,20" />
              <path d="M40,0 A40,40 0 0,1 0,40" />
              <path d="M65,0 A65,65 0 0,1 0,65" />
            </svg>
          </div>
          <div className="absolute top-0 right-0 w-28 sm:w-36 h-28 sm:h-36 pointer-events-none opacity-25 z-0 rotate-90">
            <svg viewBox="0 0 100 100" className="w-full h-full text-orange-400 fill-none stroke-current stroke-[1.2]">
              <path d="M0,0 L100,0 M0,0 L0,100 M0,0 L70,70 M0,0 L40,85 M0,0 L85,40" />
              <path d="M20,0 A20,20 0 0,1 0,20" />
              <path d="M40,0 A40,40 0 0,1 0,40" />
              <path d="M65,0 A65,65 0 0,1 0,65" />
            </svg>
          </div>
        </>
      )}

      <div className="max-w-[1920px] w-full mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-zinc-600 dark:text-zinc-300 font-semibold">
              AVAILABLE FOR WORK / FREELANCE & CONTRACT
            </span>
          </div>

          {/* Main Title */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
              <Sparkles className="w-4 h-4 text-red-500 animate-pulse" />
              <span>DIRECTOR & VIDEO EDITOR</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 uppercase leading-[1.05]">
              HIGH-CONVERTING DIRECT-RESPONSE VIDEO ADS & VIRAL REELS
            </h1>
          </div>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
            Helping DTC e-commerce brands, high-growth creators, and enterprise agencies turn raw footage into high-converting sales machines with pattern interrupts, kinetic pacing, and Hollywood-grade color finishing.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
            <button
              onClick={onPlayShowreel}
              className={`w-full sm:w-auto min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-4 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-200 shadow-xl active:scale-95 group rounded-2xl ${
                isHalloween
                  ? 'bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-[0_0_24px_rgba(249,115,22,0.6)] border border-orange-400/50'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-300 dark:text-black'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Watch Showreel</span>
            </button>
            <button
              onClick={onScrollToPortfolio}
              className={`w-full sm:w-auto min-h-[48px] px-6 sm:px-7 py-3.5 sm:py-4 border font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-200 shadow-xs active:scale-95 rounded-2xl ${
                isHalloween
                  ? 'bg-zinc-950/80 hover:bg-zinc-900 border-purple-500/40 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                  : 'bg-white hover:bg-zinc-100 border-zinc-300 text-zinc-900 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:border-zinc-800 dark:text-zinc-200'
              }`}
            >
              <Video className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
              <span>Explore Video Portfolio</span>
            </button>
          </div>
        </div>

        {/* 4 Animated Metric Cards */}
        <div className="mt-12 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 max-w-5xl mx-auto">
          {stats.map((stat, idx) => (
            <StatCard key={stat.label} stat={stat} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};
