import React, { useState, useEffect } from "react";
import {
   X,
   Share2,
   Check,
   ExternalLink,
   Tag,
   Zap,
   Cpu,
   Film,
   TrendingUp,
} from "lucide-react";
import { VideoProject } from "../types";

interface VideoModalProps {
   video: VideoProject | null;
   onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
   const [copied, setCopied] = useState(false);

   useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
         if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
   }, [onClose]);

   if (!video) return null;

   const handleRequestEdit = () => {
      onClose();
      const contactElem = document.getElementById("contact");
      if (contactElem) {
         contactElem.scrollIntoView({ behavior: "smooth" });
      } else {
         window.open("https://wa.me/8801755106596", "_blank");
      }
   };

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-2xl backdrop-saturate-200 animate-in fade-in duration-200 font-sans">
         <div className="absolute inset-0" onClick={onClose} />
         <div className="relative w-full max-w-5xl bg-black/75 dark:bg-zinc-950/80 backdrop-blur-3xl backdrop-saturate-200 border border-white/20 rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.3)] overflow-hidden z-10 max-h-[92vh] sm:max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-7 py-3.5 sm:py-4 border-b border-white/10 bg-white/5 backdrop-blur-md shrink-0">
               <div className="flex items-center gap-2">
                  <span className="px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider bg-white/10 border border-white/15 text-white rounded-full backdrop-blur-md shadow-sm">
                     {video.category}
                  </span>
                  {video.retentionBoost && (
                     <span className="hidden xs:inline-flex px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-medium uppercase tracking-wider bg-red-500/10 border border-red-400/20 text-red-300 rounded-full items-center gap-1.5 shadow-sm">
                        <TrendingUp className="w-3.5 h-3.5 text-red-400" />
                        {video.retentionBoost}
                     </span>
                  )}
               </div>

               <div className="flex items-center gap-1.5 sm:gap-2">
                  {/* <a
                     href={youtubeUrl}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="px-2.5 sm:px-3 py-1.5 text-xs font-medium text-zinc-200 hover:text-white bg-white/10 hover:bg-white/20 border border-white/15 rounded-full transition-all duration-200 flex items-center gap-1.5 active:scale-95 shadow-sm min-h-[36px]"
                     title="Open in YouTube"
                  >
                     <ExternalLink className="w-3.5 h-3.5 text-zinc-300" />
                     <span className="hidden sm:inline">YouTube</span> 
                     </a> */}
                  <button
                     onClick={onClose}
                     className="p-2 text-zinc-300 hover:text-white bg-white/10 hover:bg-white/25 border border-white/15 rounded-full transition-all duration-200 active:scale-90 min-h-[36px] min-w-[36px] flex items-center justify-center"
                     aria-label="Close modal"
                  >
                     <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
               </div>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-4 sm:p-7 space-y-5 sm:space-y-6 overscroll-contain">
               {/* Responsive YouTube Player */}
               <div className="relative aspect-video w-full rounded-xl sm:rounded-2xl overflow-hidden bg-black/90 border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)]">
                  <iframe
                     src={video.video_url}
                     title={video.title}
                     className="w-full h-full border-0"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                     allowFullScreen
                  />
               </div>

               {/* Details Grid */}
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
                  <div className="lg:col-span-2 space-y-4">
                     <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight leading-snug">
                        {video.title}
                     </h2>
                     <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-normal">
                        {video.description}
                     </p>

                     {video.clientName && (
                        <div className="p-3.5 sm:p-4 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl backdrop-blur-md flex items-center justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                           <div className="flex items-center gap-3">
                              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 flex items-center justify-center font-bold shadow-sm shrink-0">
                                 <Tag className="w-4 h-4 sm:w-5 sm:h-5" />
                              </div>
                              <div>
                                 <div className="text-[9px] sm:text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">
                                    PROJECT / BRAND
                                 </div>
                                 <div className="text-xs sm:text-sm font-bold text-white">
                                    {video.clientName}
                                 </div>
                              </div>
                           </div>

                           {video.views &&
                              video.category !== "personal" &&
                              video.category !== "gaming" && (
                                 <div className="text-right">
                                    <div className="text-[9px] sm:text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">
                                       AUDIENCE REACH
                                    </div>
                                    <div className="text-xs sm:text-sm font-bold text-emerald-400">
                                       {video.views}
                                    </div>
                                 </div>
                              )}
                        </div>
                     )}
                  </div>

                  {/* Sidebar metadata */}
                  <div className="bg-white/5 backdrop-blur-xl p-4 sm:p-5 border border-white/10 rounded-xl sm:rounded-2xl space-y-4 sm:space-y-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                     <div>
                        <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2.5 sm:mb-3 flex items-center gap-1.5">
                           <Cpu className="w-3.5 h-3.5 text-zinc-300" />
                           SOFTWARE STACK
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                           {video.editingSoftware.map((sw) => (
                              <span
                                 key={sw}
                                 className="px-2.5 py-1 text-[11px] sm:text-xs font-medium rounded-full bg-white/10 border border-white/15 text-white backdrop-blur-md shadow-xs"
                              >
                                 {sw}
                              </span>
                           ))}
                        </div>
                     </div>

                     {video.features && video.features.length > 0 && (
                        <div>
                           <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2.5 sm:mb-3 flex items-center gap-1.5">
                              <Zap className="w-3.5 h-3.5 text-zinc-300" />
                              TECHNIQUES USED
                           </h4>
                           <ul className="space-y-1.5 sm:space-y-2">
                              {video.features.map((feat) => (
                                 <li
                                    key={feat}
                                    className="text-xs text-zinc-300 flex items-center gap-2"
                                 >
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                                    <span>{feat}</span>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     )}

                     <div className="pt-3 border-t border-white/10">
                        <button
                           onClick={handleRequestEdit}
                           className="w-full min-h-[44px] py-3 bg-white hover:bg-zinc-100 text-black font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(255,255,255,0.4)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.6)] active:scale-95 transition-all duration-200"
                        >
                           <Film className="w-4 h-4 text-black" />
                           Request Similar Edit
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
