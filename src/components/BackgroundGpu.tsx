import React, { useMemo } from 'react';
import { ThemeMode } from '../types';

interface BackgroundGpuProps {
  theme: ThemeMode;
}

export const BackgroundGpu: React.FC<BackgroundGpuProps> = ({ theme }) => {
  const isDark = theme === 'dark' || theme === 'halloween';
  const isHalloween = theme === 'halloween';

  const particles = useMemo(() => {
    return Array.from({ length: isHalloween ? 24 : 18 }).map((_, index) => {
      const left = `${(index * 4.2 + 2) % 96}%`;
      const size = (index % 3) * 1.5 + (isHalloween ? 2.5 : 2);
      const duration = `${(isHalloween ? 8 : 12) + (index % 7) * 3}s`;
      const delay = `-${(index * 1.7) % 15}s`;
      const driftX = `${((index % 5) - 2) * (isHalloween ? 45 : 35)}px`;
      const opacity = isHalloween
        ? 0.35 + (index % 4) * 0.2
        : isDark
        ? 0.2 + (index % 4) * 0.15
        : 0.15 + (index % 4) * 0.1;

      let colorClass =
        index % 4 === 0
          ? 'bg-rose-500 shadow-rose-500/50'
          : index % 4 === 1
          ? 'bg-amber-500 shadow-amber-500/50'
          : index % 4 === 2
          ? 'bg-indigo-400 shadow-indigo-400/50'
          : 'bg-white shadow-white/50';

      if (isHalloween) {
        colorClass =
          index % 4 === 0
            ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.9)]'
            : index % 4 === 1
            ? 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.9)]'
            : index % 4 === 2
            ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]'
            : 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]';
      }

      return {
        id: index,
        left,
        size,
        duration,
        delay,
        driftX,
        opacity,
        colorClass,
      };
    });
  }, [isDark, isHalloween]);

  return (
    <div
      id="animated-gpu-bg"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Orb 1 */}
      <div
        className="absolute -top-[10%] -left-[10%] w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] rounded-full opacity-60 dark:opacity-40 animate-orb-1 transform-gpu pointer-events-none"
        style={{
          background: isHalloween
            ? 'radial-gradient(circle at center, rgba(249, 115, 22, 0.32) 0%, rgba(249, 115, 22, 0.14) 35%, rgba(249, 115, 22, 0.03) 60%, transparent 75%)'
            : isDark
            ? 'radial-gradient(circle at center, rgba(225, 29, 72, 0.22) 0%, rgba(225, 29, 72, 0.10) 35%, rgba(225, 29, 72, 0.02) 60%, transparent 75%)'
            : 'radial-gradient(circle at center, rgba(239, 68, 68, 0.14) 0%, rgba(239, 68, 68, 0.05) 35%, rgba(239, 68, 68, 0.01) 60%, transparent 75%)',
        }}
      />

      {/* Orb 2 */}
      <div
        className="absolute top-[25%] -right-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full opacity-50 dark:opacity-30 animate-orb-2 transform-gpu pointer-events-none"
        style={{
          background: isHalloween
            ? 'radial-gradient(circle at center, rgba(168, 85, 247, 0.28) 0%, rgba(168, 85, 247, 0.12) 35%, rgba(168, 85, 247, 0.02) 60%, transparent 75%)'
            : isDark
            ? 'radial-gradient(circle at center, rgba(245, 158, 11, 0.18) 0%, rgba(245, 158, 11, 0.08) 35%, rgba(245, 158, 11, 0.01) 60%, transparent 75%)'
            : 'radial-gradient(circle at center, rgba(245, 158, 11, 0.10) 0%, rgba(245, 158, 11, 0.04) 35%, rgba(245, 158, 11, 0.01) 60%, transparent 75%)',
        }}
      />

      {/* Orb 3 */}
      <div
        className="absolute bottom-[10%] left-[20%] w-[55vw] h-[55vw] max-w-[680px] max-h-[680px] rounded-full opacity-50 dark:opacity-30 animate-orb-3 transform-gpu pointer-events-none"
        style={{
          background: isHalloween
            ? 'radial-gradient(circle at center, rgba(34, 197, 94, 0.20) 0%, rgba(34, 197, 94, 0.08) 35%, rgba(34, 197, 94, 0.01) 60%, transparent 75%)'
            : isDark
            ? 'radial-gradient(circle at center, rgba(99, 102, 241, 0.20) 0%, rgba(99, 102, 241, 0.08) 35%, rgba(99, 102, 241, 0.01) 60%, transparent 75%)'
            : 'radial-gradient(circle at center, rgba(99, 102, 241, 0.10) 0%, rgba(99, 102, 241, 0.04) 35%, rgba(99, 102, 241, 0.01) 60%, transparent 75%)',
        }}
      />

      {/* Halloween Bats */}
      {isHalloween && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 animate-bat-1 opacity-70">
            <svg
              className="w-10 h-6 text-purple-950/80 fill-current drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]"
              viewBox="0 0 24 14"
            >
              <path d="M12 4.5C10.5 2 7 1 4 2.5C1 4 0 7.5 1 9C2.5 7.5 5 7 7 8C6 9 5.5 11 6.5 12.5C8 11.5 10 11.5 11 12.5C11.3 10.5 11.5 9 12 8C12.5 9 12.7 10.5 13 12.5C14 11.5 16 11.5 17.5 12.5C18.5 11 18 9 17 8C19 7 21.5 7.5 23 9C24 7.5 23 4 20 2.5C17 1 13.5 2 12 4.5Z" />
            </svg>
          </div>
          <div className="absolute top-0 left-0 animate-bat-2 opacity-60">
            <svg
              className="w-8 h-5 text-orange-950/80 fill-current drop-shadow-[0_0_6px_rgba(168,85,247,0.4)]"
              viewBox="0 0 24 14"
            >
              <path d="M12 4.5C10.5 2 7 1 4 2.5C1 4 0 7.5 1 9C2.5 7.5 5 7 7 8C6 9 5.5 11 6.5 12.5C8 11.5 10 11.5 11 12.5C11.3 10.5 11.5 9 12 8C12.5 9 12.7 10.5 13 12.5C14 11.5 16 11.5 17.5 12.5C18.5 11 18 9 17 8C19 7 21.5 7.5 23 9C24 7.5 23 4 20 2.5C17 1 13.5 2 12 4.5Z" />
            </svg>
          </div>
        </div>
      )}

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className={`absolute rounded-full animate-particle transform-gpu shadow-xs ${p.colorClass}`}
            style={{
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              ['--duration' as any]: p.duration,
              ['--drift-x' as any]: p.driftX,
              ['--p-opacity' as any]: p.opacity,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Grid Pattern */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isHalloween ? 'opacity-25' : isDark ? 'opacity-20' : 'opacity-15'
        }`}
        style={{
          backgroundImage: `radial-gradient(${
            isHalloween
              ? 'rgba(249, 115, 22, 0.15)'
              : isDark
              ? 'rgba(255, 255, 255, 0.12)'
              : 'rgba(0, 0, 0, 0.08)'
          } 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Vignette */}
      <div
        className={`absolute inset-0 ${
          isHalloween
            ? 'bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(7,3,12,0.88)_100%)]'
            : isDark
            ? 'bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(9,9,11,0.6)_100%)]'
            : 'bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(244,244,245,0.5)_100%)]'
        }`}
      />
    </div>
  );
};
