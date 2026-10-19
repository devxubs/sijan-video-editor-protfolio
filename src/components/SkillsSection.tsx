import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { Cpu, CheckCircle2, BarChart2, Compass } from 'lucide-react';
import { SkillItem, ThemeMode } from '../types';
import { SKILLS_DATA, RADAR_DATA } from '../data/skills';

interface SkillsSectionProps {
  theme?: ThemeMode;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ theme = 'dark' }) => {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(SKILLS_DATA[0]);
  const [chartMode, setChartMode] = useState<'bar' | 'radar'>('bar');
  const isLight = theme === 'light';

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3 shadow-2xl font-mono text-xs space-y-1 text-zinc-900 dark:text-zinc-100 rounded-xl">
          <p className="font-bold uppercase">{data.name || data.shortName || data.subject}</p>
          {data.proficiency !== undefined && (
            <p className="text-zinc-600 dark:text-zinc-300">
              Proficiency Level:{' '}
              <span className="font-bold text-zinc-900 dark:text-zinc-100">{data.proficiency}%</span>
            </p>
          )}
          {data.A !== undefined && (
            <p className="text-zinc-600 dark:text-zinc-300">
              Mastery Score: <span className="font-bold text-zinc-900 dark:text-zinc-100">{data.A}/100</span>
            </p>
          )}
          {data.primaryRole && (
            <p className="text-[10px] text-zinc-500 font-sans max-w-xs">{data.primaryRole}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <section
      id="skills"
      className="py-16 sm:py-24 bg-zinc-50/75 dark:bg-[#0A0A0A]/75 border-b border-zinc-200/80 dark:border-zinc-900/80 transition-colors duration-300"
    >
      <div className="max-w-[1920px] w-full mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500">
            <Cpu className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
            <span>TECHNICAL PROFICIENCY & STACK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tight">
            Post-Production Arsenal & Direct-Response Science
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
            Battle-tested across 500+ commercial deliverables. Every cut, transition, and grade is engineered for retention, conversion, and cinema-grade prestige.
          </p>
        </div>

        {/* Charts & Interactive Toolkit Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Chart Left Column (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 p-4 sm:p-6 space-y-4 shadow-sm rounded-xl sm:rounded-2xl">
            <div className="flex items-center justify-between font-mono text-xs pb-3 border-b border-zinc-200 dark:border-zinc-900">
              <span className="text-zinc-500 uppercase tracking-widest text-[10px]">
                CHART VISUALIZATION MODE:
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setChartMode('bar')}
                  className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 min-h-[30px] ${
                    chartMode === 'bar'
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black font-bold'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
                  }`}
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>Bar Chart</span>
                </button>
                <button
                  onClick={() => setChartMode('radar')}
                  className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 min-h-[30px] ${
                    chartMode === 'radar'
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black font-bold'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Radar Chart</span>
                </button>
              </div>
            </div>

            {/* Chart Area */}
            <div className="w-full h-72 sm:h-84 select-none pt-2">
              {chartMode === 'bar' && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={SKILLS_DATA} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis
                      type="category"
                      dataKey="shortName"
                      tick={{ fill: isLight ? '#27272a' : '#a1a1aa', fontSize: 11, fontFamily: 'monospace' }}
                      width={120}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="proficiency"
                      radius={[0, 8, 8, 0]}
                      onClick={(data) => {
                        const match = SKILLS_DATA.find((s) => s.id === data.id);
                        if (match) setSelectedSkill(match);
                      }}
                      className="cursor-pointer"
                    >
                      {SKILLS_DATA.map((entry) => (
                        <Cell
                          key={entry.id}
                          fill={entry.id === selectedSkill.id ? (isLight ? '#18181b' : '#ffffff') : entry.color}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}

              {chartMode === 'radar' && (
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={RADAR_DATA}>
                    <PolarGrid stroke={isLight ? '#e4e4e7' : '#27272a'} />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: isLight ? '#27272a' : '#d4d4d8', fontSize: 10, fontFamily: 'monospace' }}
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#71717a" tick={{ fontSize: 9 }} />
                    <Radar
                      name="Capabilities"
                      dataKey="A"
                      stroke={isLight ? '#18181b' : '#ffffff'}
                      fill={isLight ? '#18181b' : '#ffffff'}
                      fillOpacity={0.2}
                    />
                    <Tooltip content={<CustomTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="pt-3 sm:pt-4 border-t border-zinc-200 dark:border-zinc-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 font-mono text-[9px] sm:text-[10px] text-zinc-500 uppercase">
              <span>Updated for 2026 YouTube & Cinema Workflows</span>
              <span>100% Industry Standard Compliance</span>
            </div>
          </div>

          {/* Software Right Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* List of software tabs */}
            <div className="grid grid-cols-1 gap-2 font-mono">
              {SKILLS_DATA.map((sw) => {
                const isSelected = selectedSkill.id === sw.id;
                return (
                  <button
                    key={sw.id}
                    onClick={() => setSelectedSkill(sw)}
                    className={`p-3 sm:p-3.5 border text-left flex items-center justify-between transition-all rounded-xl min-h-[44px] active:scale-[0.98] ${
                      isSelected
                        ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-black dark:border-zinc-100 font-bold shadow-xs'
                        : 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-900 text-zinc-800 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-800 hover:bg-zinc-100/60 dark:hover:bg-zinc-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div
                        className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                          isSelected ? 'bg-white dark:bg-black' : 'bg-zinc-400 dark:bg-zinc-600'
                        }`}
                      />
                      <div>
                        <div className="text-xs uppercase">{sw.name}</div>
                        <div
                          className={`text-[10px] ${
                            isSelected ? 'text-zinc-300 dark:text-zinc-700' : 'text-zinc-500'
                          } uppercase font-normal`}
                        >
                          {sw.experienceYears} Yrs Exp • {sw.projectsCompleted}+ Projects
                        </div>
                      </div>
                    </div>
                    <div className="text-right font-mono text-xs shrink-0 ml-2">
                      <span className="font-extrabold">{sw.proficiency}%</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Tool Detail Card */}
            <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 p-4 sm:p-6 space-y-4 sm:space-y-5 font-mono shadow-sm rounded-xl sm:rounded-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-900">
                <div>
                  <span className="text-[9px] sm:text-[10px] uppercase text-zinc-500 block">SELECTED TOOLKIT</span>
                  <h4 className="text-sm sm:text-base font-black text-zinc-900 dark:text-zinc-100 uppercase">
                    {selectedSkill.name}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-[9px] sm:text-[10px] uppercase text-zinc-500 block">MASTERY</span>
                  <span className="text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-100">
                    {selectedSkill.proficiency}%
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[9px] sm:text-[10px] uppercase text-zinc-500 block mb-1">
                  PRIMARY POST-PRODUCTION ROLE
                </span>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 font-sans font-light leading-relaxed">
                  {selectedSkill.primaryRole}
                </p>
              </div>

              <div>
                <span className="text-[9px] sm:text-[10px] uppercase text-zinc-500 block mb-2">
                  KEY CAPABILITIES
                </span>
                <div className="space-y-1.5">
                  {selectedSkill.keyCapabilities.map((cap) => (
                    <div
                      key={cap}
                      className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300 font-sans font-light"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-200 dark:border-zinc-900">
                <span className="text-[9px] sm:text-[10px] uppercase text-zinc-500 block mb-2">
                  PREFERRED PLUGINS & ACCELERATORS
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSkill.favoritePlugins.map((plug) => (
                    <span
                      key={plug}
                      className="px-2 py-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300 text-[10px] uppercase font-mono rounded-md"
                    >
                      {plug}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom 4 Milestone Statistics Cards */}
        <div className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 p-4 sm:p-6 font-mono shadow-sm rounded-xl sm:rounded-2xl">
          <div className="space-y-1">
            <span className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-widest block">
              RAW FOOTAGE
            </span>
            <div className="text-lg sm:text-2xl font-black text-zinc-900 dark:text-zinc-100">1,200+ HRS</div>
            <p className="text-[9px] sm:text-[10px] text-zinc-500 font-sans font-light">
              4K, 10-bit LOG, RED & Sony Raw
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-widest block">
              COLOR GRADES
            </span>
            <div className="text-lg sm:text-2xl font-black text-zinc-900 dark:text-zinc-100">450+ VIDEOS</div>
            <p className="text-[9px] sm:text-[10px] text-zinc-500 font-sans font-light">
              Rec.709, Film Print & LUTs
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-widest block">
              SOUND DESIGN
            </span>
            <div className="text-lg sm:text-2xl font-black text-zinc-900 dark:text-zinc-100">800+ MIXES</div>
            <p className="text-[9px] sm:text-[10px] text-zinc-500 font-sans font-light">
              Layered Foley & Dynamic EQ
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-widest block">
              TURNAROUND
            </span>
            <div className="text-lg sm:text-2xl font-black text-zinc-900 dark:text-zinc-100">24-48 HRS</div>
            <p className="text-[9px] sm:text-[10px] text-zinc-500 font-sans font-light">
              High-speed project delivery
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
