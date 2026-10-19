import React from "react";
import { ArrowUp } from "lucide-react";
import { ThemeMode } from "../types";

export const Footer: React.FC<{ theme?: ThemeMode }> = () => {
   const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
   };

   return (
      <footer className="bg-zinc-100/75 dark:bg-[#0A0A0A]/75 border-t border-zinc-200/80 dark:border-zinc-900/80 py-10 sm:py-12 pb-24 sm:pb-28 text-zinc-600 dark:text-zinc-400 text-xs font-mono transition-colors duration-300">
         <div className="max-w-[1920px] w-full mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex items-center gap-3 text-center md:text-left">
               <div className="w-8 h-8 rounded-xl overflow-hidden border border-zinc-800 bg-black shadow-xs shrink-0">
                  <img
                     src="/title-icon.png"
                     alt="Rohaan Title Icon"
                     className="w-full h-full object-cover"
                  />
               </div>
               <div>
                  <span className="font-black text-zinc-900 dark:text-zinc-100 text-sm uppercase tracking-wider block">
                     Ahsanull Sijan
                  </span>
                  <p className="text-zinc-500 text-[10px] uppercase tracking-widest">
                     Video Editor & Media Post-Production
                  </p>
               </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-zinc-600 dark:text-zinc-400 font-bold uppercase tracking-widest text-[11px] sm:text-[10px]">
               <a
                  href="#portfolio"
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors py-1.5 px-2"
               >
                  Portfolio
               </a>
               <a
                  href="#before-after"
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors py-1.5 px-2"
               >
                  Color & FX
               </a>
               <a
                  href="#personal-projects"
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors py-1.5 px-2"
               >
                  Tools
               </a>
               <a
                  href="#skills"
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors py-1.5 px-2"
               >
                  Skills Stack
               </a>
            </div>

            {/* Copyright & Top Button */}
            <div className="flex items-center justify-between sm:justify-end gap-4 w-full md:w-auto pt-2 md:pt-0 border-t border-zinc-200 dark:border-zinc-900 md:border-t-0">
               <span className="text-zinc-500 dark:text-zinc-600 text-[10px] uppercase">
                  © {new Date().getFullYear()} Developed by
                  <a
                     href="https://jnx-dev.netlify.app/"
                     className="text-zinc-500 text-[10px] uppercase tracking-widest underline hover:text-zinc-900 dark:hover:text-white transition-colors py-1.5 px-2"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     JNX
                  </a>
                  All rights reserved.
               </span>
               <button
                  onClick={scrollToTop}
                  className="p-2.5 bg-white hover:bg-zinc-200 text-zinc-700 hover:text-black dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-300 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 transition-colors shadow-xs rounded-xl min-h-[40px] min-w-[40px] flex items-center justify-center active:scale-90"
                  title="Back to top"
               >
                  <ArrowUp className="w-4 h-4" />
               </button>
            </div>
         </div>
      </footer>
   );
};
