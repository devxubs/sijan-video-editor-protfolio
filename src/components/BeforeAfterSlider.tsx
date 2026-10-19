import React, { useState, useRef } from "react";
import { Sliders, Sparkles, TrendingUp, MoveHorizontal } from "lucide-react";
import { ThemeMode } from "../types";

interface ComparisonConfig {
   title: string;
   beforeLabel: string;
   afterLabel: string;
   img: string;
   beforeFilter: string;
   afterFilter: string;
   description: string;
}

const COMPARISONS: Record<"color" | "vfx" | "pacing", ComparisonConfig> = {
   color: {
      title: "Studio Color Grading & Skin Tone Match",
      beforeLabel: "FLAT LOG / RAW CAMERA FOOTAGE",
      afterLabel: "HIGH-CTR FACEBOOK AD GRADE",
      img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1400&q=80",
      beforeFilter: "grayscale(0.7) contrast(0.65) brightness(0.85)",
      afterFilter: "contrast(1.15) saturate(1.25) brightness(1.05)",
      description:
         "Transform flat camera profiles into vivid, eye-catching Facebook feed visuals engineered to stop users scrolling.",
   },
   vfx: {
      title: "Facebook Motion FX, CTA Badges & Captions",
      beforeLabel: "RAW TALKING HEAD / NO HOOKS",
      afterLabel: "CTA BADGES + NATIVE FB CAPTIONS",
      img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1400&q=80",
      beforeFilter: "brightness(0.9)",
      afterFilter: "contrast(1.1) saturate(1.1)",
      description:
         "Add pattern-interrupt hooks, animated lower thirds, customer review popups, and bold captions for muted Facebook auto-play.",
   },
   pacing: {
      title: "Shorts & Facebook Reels 9:16 Re-framing",
      beforeLabel: "STATIC 16:9 WIDESCREEN FOOTAGE",
      afterLabel: "DYNAMIC 9:16 VERTICAL + ZOOM CUTS",
      img: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=1400&q=80",
      beforeFilter: "brightness(0.85)",
      afterFilter: "contrast(1.2) saturate(1.2)",
      description:
         "Convert horizontal widescreen clips into high-converting 9:16 vertical Shorts & Reels with snappy zoom-cuts and face tracking.",
   },
};

const MODES = [
   { id: "color" as const, label: "Color Grade" },
   { id: "vfx" as const, label: "VFX & Badges" },
   { id: "pacing" as const, label: "Shorts Re-frame" },
];

export const BeforeAfterSlider: React.FC<{ theme?: ThemeMode }> = () => {
   const [sliderPos, setSliderPos] = useState(50);
   const [activeMode, setActiveMode] = useState<"color" | "vfx" | "pacing">(
      "color",
   );
   const [isDragging, setIsDragging] = useState(false);
   const containerRef = useRef<HTMLDivElement>(null);

   const activeConfig = COMPARISONS[activeMode];

   const updatePosition = (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pos =
         (Math.max(0, Math.min(clientX - rect.left, rect.width)) / rect.width) *
         100;
      setSliderPos(Math.round(pos));
   };

   const handlePointerDown = (e: React.PointerEvent) => {
      setIsDragging(true);
      updatePosition(e.clientX);
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
   };

   const handlePointerMove = (e: React.PointerEvent) => {
      if (isDragging) {
         updatePosition(e.clientX);
      }
   };

   const handlePointerUp = () => {
      setIsDragging(false);
   };

   const handleModeChange = (mode: "color" | "vfx" | "pacing") => {
      setActiveMode(mode);
      setSliderPos(50);
   };

   return (
      <section
         id="before-after"
         className="py-16 sm:py-24 bg-zinc-50/75 dark:bg-[#0A0A0A]/75 border-b border-zinc-200/80 dark:border-zinc-900/80 transition-colors duration-300"
      >
         <div className="max-w-[1920px] w-full mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
            {/* Section Header */}
            <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 space-y-3">
               <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  <Sliders className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                  <span>EDITING TRANSFORMATIONS</span>
               </div>
               <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tight">
                  Raw Footage vs Master Edit
               </h2>
               <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto font-light">
                  Slide horizontally to inspect how professional color grading,
                  kinetic graphic hooks, and vertical re-framing increase viewer
                  retention.
               </p>
            </div>

            {/* Mode Selector Tabs */}
            <div className="flex items-center justify-center gap-2 mb-8 font-mono text-xs uppercase tracking-wider flex-wrap">
               {MODES.map((m) => (
                  <button
                     key={m.id}
                     onClick={() => handleModeChange(m.id)}
                     className={`px-4 sm:px-5 py-2.5 transition-all border rounded-xl min-h-[44px] flex items-center active:scale-95 ${
                        activeMode === m.id
                           ? "bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-black dark:border-zinc-100 font-bold scale-105 shadow-md"
                           : "bg-white text-zinc-700 hover:bg-zinc-200 border-zinc-300 dark:bg-zinc-900/80 dark:text-zinc-400 dark:hover:text-zinc-100 dark:border-zinc-800"
                     }`}
                  >
                     {m.label}
                  </button>
               ))}
            </div>

            {/* Comparison Interactive Slider Container */}
            <div className="max-w-4xl mx-auto">
               <div
                  ref={containerRef}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  className="relative aspect-video w-full overflow-hidden select-none border border-zinc-800 bg-zinc-950 shadow-2xl group cursor-ew-resize touch-none rounded-xl sm:rounded-2xl"
               >
                  {/* After layer (background) */}
                  <div className="absolute inset-0 w-full h-full overflow-hidden bg-zinc-950 rounded-xl sm:rounded-2xl">
                     {activeMode === "pacing" ? (
                        <div className="relative w-full h-full flex items-center justify-center bg-black">
                           <img
                              src={activeConfig.img}
                              alt="Background Blur"
                              referrerPolicy="no-referrer"
                              style={{
                                 filter: `${activeConfig.afterFilter} blur(16px)`,
                              }}
                              className="absolute inset-0 w-full h-full object-cover opacity-40 scale-110"
                              draggable="false"
                           />
                           <div className="relative aspect-[9/16] h-full max-h-full border-2 border-emerald-500/80 shadow-2xl overflow-hidden z-10 flex flex-col justify-between p-2 sm:p-4 rounded-lg sm:rounded-xl">
                              <img
                                 src={activeConfig.img}
                                 alt="Vertical Crop"
                                 referrerPolicy="no-referrer"
                                 style={{ filter: activeConfig.afterFilter }}
                                 className="absolute inset-0 w-full h-full object-cover scale-125"
                                 draggable="false"
                              />
                              <div className="relative z-10 self-start bg-emerald-600 text-white text-[8px] sm:text-[9px] font-mono font-bold uppercase px-1.5 sm:px-2 py-0.5 rounded shadow">
                                 9:16 REEL FRAME
                              </div>
                              <div className="relative z-10 bg-black/80 backdrop-blur border border-zinc-700 p-1.5 sm:p-2 text-center rounded-lg">
                                 <span className="text-yellow-400 font-extrabold text-[10px] sm:text-xs uppercase tracking-wider block animate-pulse">
                                    "STOP SCROLLING NOW!"
                                 </span>
                                 <span className="text-[8px] sm:text-[9px] text-zinc-300 font-mono uppercase block mt-0.5">
                                    +115% Retention
                                 </span>
                              </div>
                           </div>
                        </div>
                     ) : (
                        <img
                           src={activeConfig.img}
                           alt="Master Edit"
                           referrerPolicy="no-referrer"
                           style={{ filter: activeConfig.afterFilter }}
                           className="w-full h-full object-cover"
                           draggable="false"
                        />
                     )}

                     {activeMode === "vfx" && (
                        <div className="absolute bottom-4 sm:bottom-10 right-3 sm:right-6 bg-black/90 border border-emerald-500/80 p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-2xl animate-pulse flex items-center gap-1.5 sm:gap-2">
                           <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                           <span className="text-[10px] sm:text-xs font-mono font-bold text-emerald-300 uppercase">
                              +128% Retention Spike
                           </span>
                        </div>
                     )}

                     <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black/90 text-zinc-100 border border-emerald-800/80 text-[8px] sm:text-[10px] font-mono font-bold uppercase tracking-widest px-2 sm:px-3 py-1 sm:py-1.5 z-10 flex items-center gap-1 sm:gap-1.5 shadow-lg rounded-md sm:rounded-lg">
                        <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
                        <span className="truncate max-w-[120px] sm:max-w-none">
                           {activeConfig.afterLabel}
                        </span>
                     </div>
                  </div>

                  {/* Before layer with clip-path */}
                  <div
                     className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-10 rounded-xl sm:rounded-2xl"
                     style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                  >
                     <img
                        src={activeConfig.img}
                        alt="Raw Footage"
                        referrerPolicy="no-referrer"
                        style={{ filter: activeConfig.beforeFilter }}
                        className="w-full h-full object-cover"
                        draggable="false"
                     />
                     <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-black/90 text-zinc-400 border border-zinc-800 text-[8px] sm:text-[10px] font-mono font-bold uppercase tracking-widest px-2 sm:px-3 py-1 sm:py-1.5 z-10 shadow-lg rounded-md sm:rounded-lg">
                        <span className="truncate max-w-[120px] sm:max-w-none">
                           {activeConfig.beforeLabel}
                        </span>
                     </div>
                  </div>

                  {/* Divider line & Drag handle */}
                  <div
                     className="absolute inset-y-0 w-1 bg-white cursor-ew-resize z-20 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.9)] pointer-events-none"
                     style={{ left: `${sliderPos}%` }}
                  >
                     <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-black font-bold flex items-center justify-center shadow-2xl border-2 border-black transform transition-transform group-hover:scale-110">
                        <MoveHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                     </div>
                  </div>

                  <input
                     type="range"
                     min="0"
                     max="100"
                     value={sliderPos}
                     onChange={(e) => setSliderPos(Number(e.target.value))}
                     className="sr-only"
                     aria-label="Comparison slider"
                  />
               </div>

               {/* Description Card */}
               <div className="mt-4 p-3.5 sm:p-4 bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 text-center font-mono text-xs text-zinc-600 dark:text-zinc-400 shadow-xs rounded-xl sm:rounded-2xl">
                  <span className="font-bold text-zinc-900 dark:text-zinc-200 uppercase tracking-widest mr-2 block sm:inline mb-1 sm:mb-0">
                     {activeConfig.title}:
                  </span>
                  <span>{activeConfig.description}</span>
               </div>
            </div>
         </div>
      </section>
   );
};
