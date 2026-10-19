import React, { useState, useEffect } from "react";
import {
   Menu,
   X,
   Sun,
   Moon,
   ChevronRight,
   Video,
   Layers,
   Sliders,
   ExternalLink,
   Cpu,
} from "lucide-react";
import { ThemeMode } from "../types";

interface NavbarProps {
   theme: ThemeMode;
   onToggleTheme: () => void;
   onToggleHalloween: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
   theme = "dark",
   onToggleTheme,
   onToggleHalloween,
}) => {
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
   const isLight = theme === "light";
   const isHalloween = theme === "halloween";

   useEffect(() => {
      if (mobileMenuOpen) {
         document.body.style.overflow = "hidden";
      } else {
         document.body.style.overflow = "";
      }
      return () => {
         document.body.style.overflow = "";
      };
   }, [mobileMenuOpen]);

   const scrollTo = (id: string) => {
      setMobileMenuOpen(false);
      const element = document.getElementById(id);
      if (element) {
         element.scrollIntoView({ behavior: "smooth" });
      }
   };

   return (
      <header className="sticky top-0 z-40 w-full pt-2 sm:pt-3 px-3 sm:px-6 lg:px-10 2xl:px-16 transition-all duration-300 transform-gpu">
         <div
            className={`max-w-[1920px] w-full mx-auto backdrop-blur-2xl backdrop-saturate-200 rounded-2xl sm:rounded-full px-4 sm:px-8 lg:px-10 h-14 sm:h-18 flex items-center justify-between gap-2 sm:gap-4 transition-colors duration-300 ${
               isLight
                  ? "bg-white/85 border border-zinc-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] text-zinc-900"
                  : "bg-black/55 dark:bg-zinc-950/60 border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.25)] text-white"
            }`}
         >
            {/* Brand Logo */}
            <a
               href="#hero"
               onClick={(e) => {
                  e.preventDefault();
                  scrollTo("hero");
               }}
               className="flex items-center gap-2.5 sm:gap-3 group shrink-0 min-h-[44px]"
            >
               <div
                  className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden border shadow-sm group-hover:scale-105 transition-all duration-300 shrink-0 bg-black ${
                     isLight
                        ? "border-zinc-800/80 shadow-xs"
                        : "border-white/20 shadow-[0_0_14px_rgba(255,255,255,0.18)]"
                  }`}
               >
                  <img
                     src="/title-icon.png"
                     alt="Rohaan Title Icon"
                     className="w-full h-full object-cover"
                     onError={(e) => {
                        e.currentTarget.style.display = "none";
                     }}
                  />
               </div>
               <div>
                  <span
                     className={`font-bold text-xs sm:text-base tracking-widest uppercase transition-colors block leading-none ${
                        isLight
                           ? "text-zinc-900 group-hover:text-zinc-700"
                           : "text-white group-hover:text-zinc-200"
                     }`}
                  >
                     Sijan
                  </span>
                  <span
                     className={`text-[9px] sm:text-[10px] uppercase tracking-wider font-sans block mt-0.5 ${
                        isLight ? "text-zinc-500" : "text-zinc-400"
                     }`}
                  >
                     Video Editor
                  </span>
               </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav
               className={`hidden md:flex items-center gap-1 sm:gap-1.5 text-xs font-medium p-1 sm:p-1.5 rounded-full backdrop-blur-md transition-colors ${
                  isLight
                     ? "bg-zinc-100/90 border border-zinc-200 text-zinc-700 shadow-inner"
                     : "bg-white/5 border border-white/10 text-zinc-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
               }`}
            >
               <button
                  onClick={() => scrollTo("portfolio")}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-full transition-all duration-200 min-h-[36px] flex items-center ${
                     isLight
                        ? "hover:bg-zinc-200/80 hover:text-zinc-900"
                        : "hover:bg-white/15 hover:text-white"
                  }`}
               >
                  Portfolio
               </button>
               <button
                  onClick={() => scrollTo("stills-carousel")}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-full transition-all duration-200 min-h-[36px] flex items-center ${
                     isLight
                        ? "hover:bg-zinc-200/80 hover:text-zinc-900"
                        : "hover:bg-white/15 hover:text-white"
                  }`}
               >
                  Stills
               </button>
               <button
                  onClick={() => scrollTo("before-after")}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-full transition-all duration-200 min-h-[36px] flex items-center ${
                     isLight
                        ? "hover:bg-zinc-200/80 hover:text-zinc-900"
                        : "hover:bg-white/15 hover:text-white"
                  }`}
               >
                  FX & Grade
               </button>
               <button
                  onClick={() => scrollTo("personal-projects")}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-full transition-all duration-200 min-h-[36px] flex items-center ${
                     isLight
                        ? "hover:bg-zinc-200/80 hover:text-zinc-900"
                        : "hover:bg-white/15 hover:text-white"
                  }`}
               >
                  Tools
               </button>
               <button
                  onClick={() => scrollTo("skills")}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-full transition-all duration-200 min-h-[36px] flex items-center ${
                     isLight
                        ? "hover:bg-zinc-200/80 hover:text-zinc-900"
                        : "hover:bg-white/15 hover:text-white"
                  }`}
               >
                  Skills
               </button>
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
               {/* Halloween Toggle */}
               <button
                  onClick={onToggleHalloween}
                  className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full border transition-all duration-300 active:scale-90 flex items-center justify-center gap-1.5 text-xs font-bold min-h-[40px] cursor-pointer ${
                     isHalloween
                        ? "bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 border-orange-300 shadow-[0_0_20px_rgba(249,115,22,0.8)] animate-pulse"
                        : isLight
                          ? "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border-zinc-200"
                          : "bg-white/5 hover:bg-white/10 text-zinc-300 border-white/10"
                  }`}
                  title="Toggle Halloween Mode"
               >
                  <span className="text-sm">🎃</span>
                  <span className="hidden sm:inline font-mono uppercase text-[11px]">
                     Halloween
                  </span>
               </button>

               {/* Theme Toggle (Sun / Moon) */}
               <button
                  onClick={onToggleTheme}
                  className={`p-2 sm:p-2.5 rounded-full border transition-all duration-300 active:scale-90 flex items-center justify-center min-h-[40px] min-w-[40px] cursor-pointer ${
                     isLight
                        ? "bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-200"
                        : "bg-white/5 hover:bg-white/10 text-zinc-200 border-white/10"
                  }`}
                  title="Toggle Light/Dark Theme"
               >
                  {isLight ? (
                     <Moon className="w-4 h-4" />
                  ) : (
                     <Sun className="w-4 h-4 text-amber-300" />
                  )}
               </button>

               {/* Contact / Hire CTA Button */}
               <a
                  href="https://wa.me/8801881632929"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-xs font-black uppercase tracking-wider bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all hover:scale-105 active:scale-95"
               >
                  <span>LET'S TALK</span>
                  <ChevronRight className="w-3.5 h-3.5" />
               </a>

               {/* Mobile Hamburger Button */}
               <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`md:hidden p-2 rounded-xl border flex items-center justify-center min-h-[40px] min-w-[40px] ${
                     isLight
                        ? "bg-zinc-100 border-zinc-200 text-zinc-800"
                        : "bg-white/10 border-white/10 text-white"
                  }`}
                  aria-label="Toggle Navigation Menu"
               >
                  {mobileMenuOpen ? (
                     <X className="w-5 h-5" />
                  ) : (
                     <Menu className="w-5 h-5" />
                  )}
               </button>
            </div>
         </div>

         {/* Mobile Menu Drawer */}
         {mobileMenuOpen && (
            <div
               className={`fixed inset-x-3 top-20 rounded-3xl p-5 shadow-2xl border backdrop-blur-2xl z-50 md:hidden transition-all duration-300 ${
                  isLight
                     ? "bg-white/95 border-zinc-200 text-zinc-900 shadow-zinc-400/20"
                     : "bg-zinc-950/95 border-white/15 text-white shadow-black/80"
               }`}
            >
               <div className="flex flex-col gap-1.5 font-sans">
                  <button
                     onClick={() => scrollTo("portfolio")}
                     className={`flex items-center justify-between w-full py-3.5 px-4 rounded-xl font-bold transition-colors min-h-[48px] ${
                        isLight
                           ? "hover:bg-zinc-100 active:bg-zinc-200"
                           : "hover:bg-white/10 active:bg-white/15"
                     }`}
                  >
                     <span className="flex items-center gap-2.5">
                        <Video className="w-4 h-4 text-red-500" />
                        Featured Video Projects
                     </span>
                     <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </button>

                  <button
                     onClick={() => scrollTo("stills-carousel")}
                     className={`flex items-center justify-between w-full py-3.5 px-4 rounded-xl font-bold transition-colors min-h-[48px] ${
                        isLight
                           ? "hover:bg-zinc-100 active:bg-zinc-200"
                           : "hover:bg-white/10 active:bg-white/15"
                     }`}
                  >
                     <span className="flex items-center gap-2.5">
                        <Layers className="w-4 h-4 text-rose-500" />
                        Screenshots & Stills
                     </span>
                     <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </button>

                  <button
                     onClick={() => scrollTo("before-after")}
                     className={`flex items-center justify-between w-full py-3.5 px-4 rounded-xl font-bold transition-colors min-h-[48px] ${
                        isLight
                           ? "hover:bg-zinc-100 active:bg-zinc-200"
                           : "hover:bg-white/10 active:bg-white/15"
                     }`}
                  >
                     <span className="flex items-center gap-2.5">
                        <Sliders className="w-4 h-4 text-amber-500" />
                        Color & VFX Compare
                     </span>
                     <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </button>

                  <button
                     onClick={() => scrollTo("personal-projects")}
                     className={`flex items-center justify-between w-full py-3.5 px-4 rounded-xl font-bold transition-colors min-h-[48px] ${
                        isLight
                           ? "hover:bg-zinc-100 active:bg-zinc-200"
                           : "hover:bg-white/10 active:bg-white/15"
                     }`}
                  >
                     <span className="flex items-center gap-2.5">
                        <ExternalLink className="w-4 h-4 text-indigo-500" />
                        Other Projects
                     </span>
                     <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </button>

                  <button
                     onClick={() => scrollTo("skills")}
                     className={`flex items-center justify-between w-full py-3.5 px-4 rounded-xl font-bold transition-colors min-h-[48px] ${
                        isLight
                           ? "hover:bg-zinc-100 active:bg-zinc-200"
                           : "hover:bg-white/10 active:bg-white/15"
                     }`}
                  >
                     <span className="flex items-center gap-2.5">
                        <Cpu className="w-4 h-4 text-emerald-500" />
                        Skills & Software Breakdown
                     </span>
                     <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </button>

                  {/* Mobile Halloween Switch */}
                  <button
                     onClick={() => {
                        onToggleHalloween();
                        setMobileMenuOpen(false);
                     }}
                     className={`flex items-center justify-between w-full py-3.5 px-4 rounded-xl font-bold transition-all min-h-[48px] mt-2 border ${
                        isHalloween
                           ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.8)]"
                           : "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30"
                     }`}
                  >
                     <span className="flex items-center gap-2.5">
                        <span className="text-base">🎃</span>
                        <span>
                           {isHalloween
                              ? "Disable Halloween Theme"
                              : "Enable Halloween Theme"}
                        </span>
                     </span>
                     <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-black/20">
                        {isHalloween ? "Active" : "Try it"}
                     </span>
                  </button>
               </div>
            </div>
         )}
      </header>
   );
};
