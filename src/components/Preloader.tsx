import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeMode } from "../types";

interface PreloaderProps {
   theme: ThemeMode;
   onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({
   theme = "dark",
   onComplete,
}) => {
   const [progress, setProgress] = useState(0);
   const [stage, setStage] = useState<"loading" | "reveal" | "finished">(
      "loading",
   );
   const [timecode, setTimecode] = useState("00:00:00:00");
   const isLight = theme === "light";
   const isHalloween = theme === "halloween";
   const timecodeRaf = useRef<number | null>(null);

   // Timecode counter simulation (60fps)
   useEffect(() => {
      const startTime = performance.now();
      const updateTimecode = (now: number) => {
         const elapsed = (now - startTime) / 1000;
         const frames = (Math.floor(elapsed * 60) % 60)
            .toString()
            .padStart(2, "0");
         const seconds = (Math.floor(elapsed) % 60).toString().padStart(2, "0");
         const minutes = (Math.floor(elapsed / 60) % 60)
            .toString()
            .padStart(2, "0");
         setTimecode(`00:${minutes}:${seconds}:${frames}`);
         timecodeRaf.current = requestAnimationFrame(updateTimecode);
      };

      timecodeRaf.current = requestAnimationFrame(updateTimecode);
      return () => {
         if (timecodeRaf.current) cancelAnimationFrame(timecodeRaf.current);
      };
   }, []);

   // Progress animation
   useEffect(() => {
      const startTime = performance.now();
      let animId: number;

      const animateProgress = (now: number) => {
         const elapsed = now - startTime;
         const t = Math.min(1, elapsed / 1800);
         const eased = 1 - Math.pow(1 - t, 4);
         const val = Math.min(100, Math.round(eased * 100));
         setProgress(val);

         if (t < 1) {
            animId = requestAnimationFrame(animateProgress);
         } else {
            setStage("reveal");
            setTimeout(() => {
               setStage("finished");
               onComplete();
            }, 750);
         }
      };

      animId = requestAnimationFrame(animateProgress);
      return () => cancelAnimationFrame(animId);
   }, [onComplete]);

   const handleSkip = () => {
      if (stage === "loading") {
         setProgress(100);
         setStage("reveal");
         setTimeout(() => {
            setStage("finished");
            onComplete();
         }, 400);
      }
   };

   const getStatusText = (p: number) => {
      if (p < 28) return "CALIBRATING COLOR MATRIX";
      if (p < 62) return "PRORES 4K MASTER RENDER";
      if (p < 92) return "ATMOSPHERIC AUDIO MASTER";
      return "READY FOR PLAYBACK";
   };

   return (
      <AnimatePresence>
         {stage !== "finished" && (
            <div
               onClick={handleSkip}
               className="fixed inset-0 z-[10000] select-none cursor-pointer overflow-hidden pointer-events-auto flex flex-col items-center justify-center will-change-transform backdrop-blur-2xl backdrop-saturate-200"
               style={{ touchAction: "none" }}
            >
               {/* Top Half Door */}
               <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: stage === "reveal" ? "-100%" : "0%" }}
                  transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
                  className={`absolute top-0 left-0 w-full h-[50.2vh] flex flex-col justify-between px-5 sm:px-10 lg:px-16 pt-5 sm:pt-8 pb-3 z-20 will-change-transform ${
                     isLight
                        ? "bg-zinc-100/98 text-zinc-900 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
                        : "bg-[#08080a]/98 text-zinc-100 shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
                  }`}
               >
                  {/* Top Bar: Recording badge & Timecode */}
                  <div className="flex items-center justify-between w-full font-mono text-[10px] sm:text-xs tracking-widest uppercase">
                     <div className="flex items-center gap-2 sm:gap-3">
                        <span className="relative flex h-2 w-2">
                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />
                           <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600" />
                        </span>
                        <span className="font-bold text-rose-500 tracking-wider">
                           REC
                        </span>
                        <span
                           className={
                              isLight ? "text-zinc-400" : "text-zinc-600"
                           }
                        >
                           |
                        </span>
                        <span
                           className={`font-medium ${isLight ? "text-zinc-600" : "text-zinc-400"}`}
                        >
                           4K DCI · 60FPS
                        </span>
                     </div>
                     <div className="flex items-center gap-2">
                        <span
                           className={`hidden xs:inline text-[9px] ${isLight ? "text-zinc-400" : "text-zinc-500"}`}
                        >
                           TC
                        </span>
                        <span
                           className={`font-bold font-mono tracking-wider tabular-nums ${isLight ? "text-zinc-900" : "text-zinc-200"}`}
                        >
                           {timecode}
                        </span>
                     </div>
                  </div>

                  {/* Middle Title */}
                  <div className="flex flex-col items-center justify-end overflow-hidden pb-1 sm:pb-2">
                     <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{
                           opacity: stage === "reveal" ? 0 : 1,
                           y: stage === "reveal" ? -20 : 0,
                        }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-center gap-2 mb-2 sm:mb-3"
                     >
                        <div
                           className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg overflow-hidden border bg-black ${
                              isLight
                                 ? "border-zinc-800 shadow-xs"
                                 : "border-white/20 shadow-[0_0_12px_rgba(255,255,255,0.15)]"
                           }`}
                        >
                           <img
                              src="/title-icon.png"
                              alt="Rohaan Title Icon"
                              className="w-full h-full object-cover"
                           />
                        </div>
                        <span
                           className={`text-[9px] sm:text-[11px] font-mono tracking-[0.25em] uppercase font-semibold ${
                              isLight ? "text-zinc-600" : "text-zinc-400"
                           }`}
                        >
                           DIRECTOR & VIDEO EDITOR
                        </span>
                     </motion.div>
                     <div className="overflow-hidden w-full flex justify-center">
                        <motion.h1
                           initial={{ y: 80, opacity: 0 }}
                           animate={{
                              y: stage === "reveal" ? -50 : 0,
                              opacity: 1,
                           }}
                           transition={{
                              duration: 0.65,
                              ease: [0.22, 1, 0.36, 1],
                           }}
                           className={`text-[clamp(2.5rem,8.5vw,7.5rem)] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] pl-[0.15em] sm:pl-[0.2em] leading-[0.9] text-center select-none ${
                              isLight ? "text-zinc-900" : "text-white"
                           }`}
                        >
                           {"Ahsanull Sijan".toUpperCase()}
                        </motion.h1>
                     </div>
                  </div>
               </motion.div>

               {/* Bottom Half Door */}
               <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: stage === "reveal" ? "100%" : "0%" }}
                  transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
                  className={`absolute bottom-0 left-0 w-full h-[50.2vh] flex flex-col justify-between px-5 sm:px-10 lg:px-16 pt-3 pb-5 sm:pb-8 z-20 will-change-transform ${
                     isLight
                        ? "bg-zinc-100/98 text-zinc-900 shadow-[0_-10px_30px_rgba(0,0,0,0.04)]"
                        : "bg-[#08080a]/98 text-zinc-100 shadow-[0_-15px_40px_rgba(0,0,0,0.8)]"
                  }`}
               >
                  {/* Progress Container */}
                  <div className="flex flex-col items-center justify-start pt-2 sm:pt-4 w-full max-w-sm sm:max-w-md mx-auto">
                     <div className="w-full flex flex-col gap-2.5 sm:gap-3">
                        <div
                           className={`relative w-full h-[3px] sm:h-1 rounded-full overflow-hidden ${isLight ? "bg-zinc-200/90" : "bg-zinc-800/80"}`}
                        >
                           <motion.div
                              className={`h-full rounded-full transition-all duration-75 ease-out ${
                                 isHalloween
                                    ? "bg-gradient-to-r from-orange-500 to-amber-400 shadow-[0_0_14px_rgba(249,115,22,0.9)]"
                                    : "bg-red-600 shadow-[0_0_12px_rgba(239,68,68,0.85)]"
                              }`}
                              style={{ width: `${progress}%` }}
                           />
                        </div>
                        <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs">
                           <span
                              className={`tracking-wider font-medium truncate pr-2 ${isLight ? "text-zinc-600" : "text-zinc-400"}`}
                           >
                              {getStatusText(progress)}
                           </span>
                           <span
                              className={`font-bold tracking-widest tabular-nums ${isLight ? "text-zinc-900" : "text-white"}`}
                           >
                              {progress.toString().padStart(3, "0")}%
                           </span>
                        </div>
                     </div>
                     <p
                        className={`text-[8px] sm:text-[9px] font-mono tracking-[0.2em] uppercase mt-4 sm:mt-5 opacity-60 hover:opacity-100 transition-opacity ${
                           isLight ? "text-zinc-500" : "text-zinc-400"
                        }`}
                     >
                        [ CLICK OR TAP TO ENTER ]
                     </p>
                  </div>

                  {/* Bottom Footer */}
                  <div className="flex items-center justify-between w-full font-mono text-[9px] sm:text-[11px] tracking-wider uppercase">
                     <div
                        className={`truncate pr-2 ${isLight ? "text-zinc-500" : "text-zinc-400"}`}
                     >
                        DAVINCI RESOLVE · AFTER EFFECTS
                     </div>
                     <div
                        className={`whitespace-nowrap ${isLight ? "text-zinc-500" : "text-zinc-400"}`}
                     >
                        ARCHIVE © 2026
                     </div>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>
   );
};
