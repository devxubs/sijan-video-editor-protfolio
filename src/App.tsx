import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";

import { ThemeMode, VideoProject } from "./types";
import { INITIAL_VIDEOS } from "./data/videos";
import { playSpookySound } from "./utils/audio";

import { BackgroundGpu } from "./components/BackgroundGpu";
import { Preloader } from "./components/Preloader";
import { CustomCursor } from "./components/CustomCursor";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Portfolio } from "./components/Portfolio";
import { StillsCarousel } from "./components/StillsCarousel";
import { BeforeAfterSlider } from "./components/BeforeAfterSlider";
import { OtherProjects } from "./components/OtherProjects";
import { SkillsSection } from "./components/SkillsSection";
import { Footer } from "./components/Footer";
import { VideoModal } from "./components/VideoModal";
import { FloatingActions } from "./components/FloatingActions";

const STORAGE_KEY_CUSTOM_VIDEOS = "rohaan_portfolio_custom_videos_v1";
const STORAGE_KEY_THEME = "rohaan_portfolio_theme_v2";

export function App() {
   const previousModeRef = useRef<"dark" | "light">("dark");

   const [theme, setTheme] = useState<ThemeMode>(() => {
      try {
         const saved = localStorage.getItem(STORAGE_KEY_THEME);
         if (saved === "light") return "light";
         if (saved === "dark") return "dark";
         if (saved === "halloween") return "halloween";
      } catch {}
      return "halloween";
   });

   const [videos, setVideos] = useState<VideoProject[]>(INITIAL_VIDEOS);
   const [customVideoIds, setCustomVideoIds] = useState<string[]>([]);
   const [activeModalVideo, setActiveModalVideo] =
      useState<VideoProject | null>(null);
   const [showPreloader, setShowPreloader] = useState(true);
   const lenisRef = useRef<Lenis | null>(null);

   // Manual scroll restoration on refresh
   useEffect(() => {
      if ("scrollRestoration" in window.history) {
         window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
   }, []);

   // Sync theme changes with DOM & LocalStorage
   useEffect(() => {
      const root = document.documentElement;
      const body = document.body;

      if (theme === "halloween") {
         root.classList.add("dark", "halloween");
         body.classList.add("dark", "halloween");
      } else if (theme === "dark") {
         root.classList.add("dark");
         root.classList.remove("halloween");
         body.classList.add("dark");
         body.classList.remove("halloween");
         previousModeRef.current = "dark";
      } else {
         root.classList.remove("dark", "halloween");
         body.classList.remove("dark", "halloween");
         previousModeRef.current = "light";
      }

      try {
         localStorage.setItem(STORAGE_KEY_THEME, theme);
         localStorage.setItem("rohaan_theme", theme);
         localStorage.setItem("rohaan_portfolio_theme", theme);
      } catch {}
   }, [theme]);

   // Theme toggling actions
   const handleToggleTheme = () => {
      setTheme((curr) => {
         if (curr === "halloween") {
            return previousModeRef.current === "light" ? "light" : "dark";
         }
         return curr === "dark" ? "light" : "dark";
      });
   };

   const handleToggleHalloween = () => {
      setTheme((curr) => {
         if (curr === "halloween") {
            return previousModeRef.current;
         }
         previousModeRef.current = curr as "dark" | "light";
         playSpookySound();
         return "halloween";
      });
   };

   // Lenis smooth scroll engine
   useEffect(() => {
      const lenis = new Lenis({
         duration: 0.65,
         easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
         smoothWheel: true,
         wheelMultiplier: 1.05,
         touchMultiplier: 1,
         infinite: false,
      });

      lenisRef.current = lenis;
      let rafId: number;

      function raf(time: number) {
         lenis.raf(time);
         rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
      return () => {
         cancelAnimationFrame(rafId);
         lenis.destroy();
         lenisRef.current = null;
      };
   }, []);

   // Load custom videos from localStorage if present
   useEffect(() => {
      try {
         const saved = localStorage.getItem(STORAGE_KEY_CUSTOM_VIDEOS);
         if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
               setCustomVideoIds(parsed.map((v) => v.id));
               const customIds = new Set(parsed.map((v) => v.youtubeId));
               const filteredInitial = INITIAL_VIDEOS.filter(
                  (v) => !customIds.has(v.youtubeId),
               );
               setVideos([...parsed, ...filteredInitial]);
            }
         }
      } catch (e) {
         console.error("Failed to parse saved portfolio videos:", e);
      }
   }, []);

   const handleDeleteCustomVideo = (id: string) => {
      const updatedVideos = videos.filter((v) => v.id !== id);
      const updatedCustomIds = customVideoIds.filter((item) => item !== id);
      setVideos(updatedVideos);
      setCustomVideoIds(updatedCustomIds);
      try {
         const toSave = updatedVideos.filter((v) =>
            updatedCustomIds.includes(v.id),
         );
         localStorage.setItem(
            STORAGE_KEY_CUSTOM_VIDEOS,
            JSON.stringify(toSave),
         );
      } catch (e) {
         console.error("Failed to update localStorage:", e);
      }
   };

   const scrollToPortfolio = () => {
      const el = document.getElementById("portfolio");
      el?.scrollIntoView({ behavior: "smooth" });
   };

   const handlePreloaderComplete = () => {
      setShowPreloader(false);
      window.scrollTo(0, 0);
      lenisRef.current?.scrollTo(0, { immediate: true });
   };

   return (
      <div
         className={`relative min-h-screen ${
            theme === "halloween"
               ? "bg-[#09050d] text-zinc-100 selection:bg-orange-500 selection:text-white"
               : "bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 selection:bg-red-600 selection:text-white"
         } font-sans pb-16 sm:pb-20 transition-colors duration-300`}
      >
         {/* Background Ambient Visualizer */}
         <BackgroundGpu theme={theme} />

         {/* Cinematic Intro Preloader */}
         {showPreloader && (
            <Preloader theme={theme} onComplete={handlePreloaderComplete} />
         )}

         {/* Custom Spring Animated Cursor */}
         <CustomCursor />

         {/* Page Content */}
         <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col"
         >
            <Navbar
               theme={theme}
               onToggleTheme={handleToggleTheme}
               onToggleHalloween={handleToggleHalloween}
            />

            <Hero
               theme={theme}
               onPlayShowreel={() => setActiveModalVideo(videos[0])}
               onScrollToPortfolio={scrollToPortfolio}
            />

            <Portfolio
               theme={theme}
               videos={videos}
               onSelectVideo={(video) => setActiveModalVideo(video)}
               onDeleteCustomVideo={handleDeleteCustomVideo}
               customVideoIds={customVideoIds}
            />

            <StillsCarousel theme={theme} />

            <BeforeAfterSlider theme={theme} />

            <OtherProjects theme={theme} />

            <SkillsSection theme={theme} />

            <Footer theme={theme} />
         </motion.div>

         {/* Lightbox Video Player Modal */}
         <VideoModal
            video={activeModalVideo}
            onClose={() => setActiveModalVideo(null)}
         />

         {/* Persistent Floating Presentation Scrubber */}
         <FloatingActions theme={theme} />
      </div>
   );
}

export default App;
