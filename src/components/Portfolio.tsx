import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
   Search,
   ChevronLeft,
   ChevronRight,
   Play,
   Eye,
   Clock,
   TrendingUp,
   Tag,
   Film,
   Trash2,
} from "lucide-react";
import { VideoProject, VideoCategory, ThemeMode } from "../types";
import { CATEGORIES } from "../data/videos";

interface PortfolioProps {
   videos: VideoProject[];
   onSelectVideo: (video: VideoProject) => void;
   onDeleteCustomVideo?: (id: string) => void;
   customVideoIds?: string[];
   theme?: ThemeMode;
}

export function getThumbnailUrl(
   youtubeId: string,
   quality: "maxres" | "hq" | "default" = "maxres",
): string {
   if (!youtubeId) return "/tondra-thumb.jpg";
   if (quality === "maxres")
      return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
   if (quality === "hq")
      return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
   return `https://img.youtube.com/vi/${youtubeId}/default.jpg`;
}

interface VideoCardProps {
   video: VideoProject;
   onSelect: (video: VideoProject) => void;
   onDelete?: (id: string) => void;
   isCustom?: boolean;
   theme?: ThemeMode;
}

export const VideoCard: React.FC<VideoCardProps> = ({
   video,
   onSelect,
   onDelete,
   isCustom,
   theme,
}) => {
   const thumbUrl = video.thumbnailUrl || getThumbnailUrl(video.video_url);

   const getHoverGlow = () => {
      if (theme === "halloween") {
         return "hover:border-orange-500 hover:shadow-[0_0_32px_rgba(249,115,22,0.65),0_20px_40px_rgba(0,0,0,0.85)]";
      }
      if (theme === "light") {
         return "hover:border-red-500 hover:shadow-[0_0_26px_rgba(239,68,68,0.45),0_16px_32px_rgba(0,0,0,0.12)]";
      }
      return "hover:border-red-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.55),0_20px_40px_rgba(0,0,0,0.9)]";
   };

   return (
      <div
         data-video-card="true"
         className={`video-card-hover group relative bg-white dark:bg-[#0A0A0A] border border-zinc-200 dark:border-zinc-900 transition-all duration-300 ease-out flex flex-col justify-between shadow-xs hover:-translate-y-2 hover:scale-[1.035] hover:z-20 rounded-2xl overflow-hidden ${getHoverGlow()}`}
      >
         {/* Video Media Container */}
         <div
            className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-950 cursor-pointer shadow-inner rounded-t-2xl"
            onClick={() => onSelect(video)}
         >
            <img
               src={thumbUrl}
               alt={video.title}
               referrerPolicy="no-referrer"
               className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
               onError={(e) => {
                  const target = e.currentTarget;
                  if (target.dataset.triedFallback) {
                     target.src = "/tondra-thumb.jpg";
                  } else {
                     target.dataset.triedFallback = "true";
                     target.src = `https://img.youtube.com/vi/${video.video_url}/hqdefault.jpg`;
                  }
               }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-85 group-hover:opacity-70 transition-opacity duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity duration-300">
               <div className="video-play-btn w-12 h-12 flex items-center justify-center shadow-xl group-hover:scale-115 transition-all duration-300 rounded-full border border-white/40 bg-white/20 backdrop-blur-md text-white">
                  <Play className="w-5 h-5 fill-current text-inherit ml-0.5" />
               </div>
            </div>

            {/* Top Badges */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-wider">
               <span className="px-2.5 py-1 font-bold bg-black/90 text-zinc-200 border border-zinc-800 rounded-md">
                  {video.category}
               </span>
               {video.views &&
                  video.category !== "personal" &&
                  video.category !== "gaming" && (
                     <span className="px-2.5 py-1 font-semibold bg-black/90 text-zinc-300 border border-zinc-800 flex items-center gap-1 rounded-md">
                        <Eye className="w-3 h-3 text-zinc-400" />
                        {video.views}
                     </span>
                  )}
            </div>

            {/* Bottom Badges */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] text-zinc-300">
               {video.duration && (
                  <span className="px-2 py-0.5 bg-black/90 text-zinc-400 border border-zinc-800 flex items-center gap-1 rounded-md">
                     <Clock className="w-3 h-3 text-zinc-500" />
                     {video.duration}
                  </span>
               )}
               {video.retentionBoost && (
                  <span className="px-2 py-0.5 bg-zinc-900/90 text-emerald-400 border border-zinc-800 font-medium flex items-center gap-1 rounded-md">
                     <TrendingUp className="w-3 h-3 text-emerald-400" />
                     {video.retentionBoost}
                  </span>
               )}
            </div>

            {/* Delete custom video button if applicable */}
            {isCustom && onDelete && (
               <button
                  onClick={(e) => {
                     e.stopPropagation();
                     onDelete(video.id);
                  }}
                  className="absolute top-3 right-3 p-1.5 bg-black/90 text-zinc-400 hover:text-rose-400 border border-zinc-800 transition-colors z-20 rounded-md"
                  title="Remove from local portfolio"
               >
                  <Trash2 className="w-4 h-4" />
               </button>
            )}
         </div>

         {/* Content Container */}
         <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
            <div>
               <h3
                  onClick={() => onSelect(video)}
                  className="text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors line-clamp-2 cursor-pointer leading-snug uppercase tracking-wide"
               >
                  {video.title}
               </h3>
               <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 line-clamp-2 leading-relaxed font-light">
                  {video.description}
               </p>
               {video.clientName && (
                  <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-500 mt-3 flex items-center gap-1.5">
                     <Tag className="w-3.5 h-3.5 text-zinc-400" />
                     <span>
                        PAGE / BRAND:{" "}
                        <span className="text-zinc-800 dark:text-zinc-300 font-semibold">
                           {video.clientName}
                        </span>
                     </span>
                  </p>
               )}
            </div>

            {/* Tags / Software */}
            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-900 space-y-2">
               <div className="flex flex-wrap gap-1.5 font-mono text-[10px] uppercase">
                  {video.editingSoftware.map((sw) => (
                     <span
                        key={sw}
                        className="px-2.5 py-1 text-zinc-800 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 rounded-lg"
                     >
                        {sw}
                     </span>
                  ))}
               </div>
               {video.features && video.features.length > 0 && (
                  <div className="flex flex-wrap gap-1 font-mono text-[10px] uppercase">
                     {video.features.map((feat) => (
                        <span
                           key={feat}
                           className="px-2 py-0.5 text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 rounded-md"
                        >
                           {feat}
                        </span>
                     ))}
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export const Portfolio: React.FC<PortfolioProps> = ({
   videos,
   onSelectVideo,
   onDeleteCustomVideo,
   customVideoIds = [],
   theme = "halloween",
}) => {
   const [selectedCategory, setSelectedCategory] =
      useState<VideoCategory>("all");
   const [searchQuery, setSearchQuery] = useState("");
   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage, setItemsPerPage] = useState(9);

   const filteredVideos = useMemo(() => {
      return videos.filter((video) => {
         const matchCat =
            selectedCategory === "all" || video.category === selectedCategory;
         const q = searchQuery.toLowerCase().trim();
         const matchSearch =
            !q ||
            video.title.toLowerCase().includes(q) ||
            video.description.toLowerCase().includes(q) ||
            video.clientName?.toLowerCase().includes(q) ||
            video.editingSoftware.some((s) => s.toLowerCase().includes(q)) ||
            video.features.some((f) => f.toLowerCase().includes(q));

         return matchCat && matchSearch;
      });
   }, [videos, selectedCategory, searchQuery]);

   useEffect(() => {
      setCurrentPage(1);
   }, [selectedCategory, searchQuery, itemsPerPage]);

   const totalPages = Math.max(
      1,
      Math.ceil(filteredVideos.length / itemsPerPage),
   );

   useEffect(() => {
      if (currentPage > totalPages) {
         setCurrentPage(totalPages);
      }
   }, [totalPages, currentPage]);

   const paginatedVideos = useMemo(() => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      return filteredVideos.slice(startIndex, startIndex + itemsPerPage);
   }, [filteredVideos, currentPage, itemsPerPage]);

   const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages) {
         setCurrentPage(page);
         const section = document.getElementById("portfolio");
         if (section) section.scrollIntoView({ behavior: "smooth" });
      }
   };

   return (
      <section
         id="portfolio"
         className="py-16 sm:py-24 bg-zinc-100/75 dark:bg-[#0A0A0A]/75 border-b border-zinc-200/80 dark:border-zinc-900/80 relative transition-colors duration-300"
      >
         <div className="max-w-[1920px] w-full mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
            {/* Section Heading */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
               <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2">
                     <Film className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                     <span>VIDEO SHOWCASE & CREATIVE PORTFOLIO</span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tight">
                     Featured Video Projects
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl font-light">
                     Direct response VSLs, vertical Facebook Reels, UGC review
                     ads, and cinematic creative storytelling.
                  </p>
               </div>
            </div>

            {/* Filter Controls & Search */}
            <div className="flex flex-col gap-6 mb-10">
               {/* Category Tabs */}
               <div className="overflow-x-auto pb-2 scrollbar-none">
                  <div className="flex items-center gap-2 min-w-max">
                     {CATEGORIES.map((cat) => {
                        const isActive = selectedCategory === cat.id;
                        return (
                           <button
                              key={cat.id}
                              onClick={() => setSelectedCategory(cat.id)}
                              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 flex items-center gap-2 border ${
                                 isActive
                                    ? theme === "halloween"
                                       ? "bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 border-orange-400 font-bold shadow-[0_0_15px_rgba(249,115,22,0.6)] scale-[1.02]"
                                       : "bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-black dark:border-zinc-100 font-bold shadow-xs scale-[1.02]"
                                    : "bg-white text-zinc-700 hover:bg-zinc-200 border-zinc-300 dark:bg-zinc-900/80 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 dark:border-zinc-800"
                              }`}
                           >
                              <motion.span
                                 className="inline-block text-sm origin-center"
                                 animate={
                                    isActive
                                       ? {
                                            scale: [1, 1.25, 1],
                                            rotate: [0, 8, -8, 0],
                                         }
                                       : { scale: 1, rotate: 0 }
                                 }
                                 transition={{
                                    duration: 1.5,
                                    repeat: isActive ? Infinity : 0,
                                    repeatDelay: 2,
                                 }}
                              >
                                 {cat.icon}
                              </motion.span>
                              <span className="text-[11px] sm:text-xs">
                                 {cat.label}
                              </span>
                           </button>
                        );
                     })}
                  </div>
               </div>

               {/* Search bar & items per page */}
               <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 font-mono">
                  <div className="relative flex-1">
                     <Search className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                     <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Filter by title, creator, software, or technique..."
                        className="w-full bg-white dark:bg-zinc-900/90 border border-zinc-300 dark:border-zinc-800 pl-10 sm:pl-11 pr-16 py-2.5 sm:py-3 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors shadow-xs rounded-xl min-h-[42px]"
                     />
                     {searchQuery && (
                        <button
                           onClick={() => setSearchQuery("")}
                           className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] sm:text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 uppercase tracking-widest px-1.5 py-1"
                        >
                           Clear
                        </button>
                     )}
                  </div>

                  <div className="flex items-center justify-between sm:justify-start gap-1 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 p-1 text-xs uppercase tracking-wider shadow-xs rounded-xl">
                     <span className="px-2 text-zinc-500 text-[10px]">
                        Show:
                     </span>
                     <div className="flex items-center gap-1">
                        <button
                           onClick={() => setItemsPerPage(6)}
                           className={`px-3 py-1.5 transition-colors rounded-lg text-[11px] sm:text-xs min-h-[34px] ${
                              itemsPerPage === 6
                                 ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black font-bold"
                                 : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                           }`}
                           title="Show 6 videos per page"
                        >
                           6 Edits
                        </button>
                        <button
                           onClick={() => setItemsPerPage(9)}
                           className={`px-3 py-1.5 transition-colors rounded-lg text-[11px] sm:text-xs min-h-[34px] ${
                              itemsPerPage === 9
                                 ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black font-bold"
                                 : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                           }`}
                           title="Show 9 videos per page"
                        >
                           9 Edits
                        </button>
                        <button
                           onClick={() => setItemsPerPage(12)}
                           className={`px-3 py-1.5 transition-colors rounded-lg text-[11px] sm:text-xs min-h-[34px] ${
                              itemsPerPage === 12
                                 ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black font-bold"
                                 : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                           }`}
                           title="Show 12 videos per page"
                        >
                           12 Edits
                        </button>
                     </div>
                  </div>
               </div>
            </div>

            {/* Video Grid */}
            {filteredVideos.length > 0 ? (
               <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 sm:gap-8">
                     {paginatedVideos.map((video) => (
                        <VideoCard
                           key={video.id}
                           video={video}
                           onSelect={onSelectVideo}
                           onDelete={onDeleteCustomVideo}
                           isCustom={customVideoIds.includes(video.id)}
                           theme={theme}
                        />
                     ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                     <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
                        <div className="text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                           Showing{" "}
                           <span className="text-zinc-900 dark:text-zinc-100 font-bold">
                              {(currentPage - 1) * itemsPerPage + 1}
                           </span>{" "}
                           -{" "}
                           <span className="text-zinc-900 dark:text-zinc-100 font-bold">
                              {Math.min(
                                 currentPage * itemsPerPage,
                                 filteredVideos.length,
                              )}
                           </span>{" "}
                           of{" "}
                           <span className="text-zinc-900 dark:text-zinc-100 font-bold">
                              {filteredVideos.length}
                           </span>{" "}
                           videos
                        </div>

                        <div className="flex items-center gap-2">
                           <button
                              onClick={() => handlePageChange(currentPage - 1)}
                              disabled={currentPage === 1}
                              className="p-2.5 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-xs rounded-xl"
                              title="Previous Page"
                           >
                              <ChevronLeft className="w-4 h-4" />
                           </button>

                           {Array.from(
                              { length: totalPages },
                              (_, idx) => idx + 1,
                           ).map((page) => (
                              <button
                                 key={page}
                                 onClick={() => handlePageChange(page)}
                                 className={`min-w-[36px] h-[36px] flex items-center justify-center font-bold tracking-wider transition-colors border rounded-xl ${
                                    currentPage === page
                                       ? "bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-black dark:border-zinc-100 shadow-xs"
                                       : "bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                                 }`}
                              >
                                 {page}
                              </button>
                           ))}

                           <button
                              onClick={() => handlePageChange(currentPage + 1)}
                              disabled={currentPage === totalPages}
                              className="p-2.5 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-xs rounded-xl"
                              title="Next Page"
                           >
                              <ChevronRight className="w-4 h-4" />
                           </button>
                        </div>
                     </div>
                  )}
               </>
            ) : (
               <div className="text-center py-16 bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-900 space-y-4 rounded-xl">
                  <Film className="w-12 h-12 text-zinc-400 dark:text-zinc-600 mx-auto" />
                  <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider font-mono">
                     No edits match this filter
                  </h3>
                  <p className="text-xs text-zinc-500 max-w-md mx-auto">
                     Try adjusting your search query or switching categories.
                  </p>
                  <button
                     onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("all");
                     }}
                     className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black uppercase tracking-widest hover:bg-zinc-800 dark:hover:bg-zinc-300 transition-colors shadow-md rounded-xl"
                  >
                     Reset Filters
                  </button>
               </div>
            )}
         </div>
      </section>
   );
};
