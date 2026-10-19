# Rafiaad Ahmed Rohaan — Video Editor Portfolio

A pixel-perfect, feature-complete clone of the portfolio website [rafiaad-ahmed-rohaan-video-editor-portfolio.ai.studio](https://rafiaad-ahmed-rohaan-video-editor-portfolio.ai.studio/), crafted with **React 18**, **TypeScript**, **Tailwind CSS**, **Vite**, **Framer Motion**, **Recharts**, **Lenis Smooth Scroll**, and the **Web Audio API**.

---

## 🌟 Key Features

1. **Cinematic Preloader & Shutter Reveal**
   - Live 60 FPS running timecode counter (`00:00:00:00`).
   - Dynamic stage feedback: *Calibrating Color Matrix*, *ProRes 4K Master Render*, *Atmospheric Audio Master*, and *Ready for Playback*.
   - Split-door shutter transition opening smoothly into the hero view with click-to-skip support.

2. **Custom Interactive Cursor**
   - High-responsiveness center tracking dot powered by physics springs.
   - Magnetic trailing ring that dynamically expands with a frosted blur and "PLAY" badge when hovering over video cards and interactive controls.
   - Automatic disabling on mobile / touch devices.

3. **Multi-Theme Engine (Halloween / Dark / Light)**
   - **Halloween Mode** (Default): Spooky synthesized Web Audio chords on toggle, floating glowing bat silhouettes, particle ember drifts, custom orange-to-amber glowing scrollbars, and Halloween easter eggs.
   - **Dark Mode**: Sleek obsidian cinematic look with red highlights.
   - **Light Mode**: High-contrast, clean minimalist editorial design.
   - Persistent theme state saved in `localStorage`.

4. **Atmospheric Background Visualizer**
   - Multi-layered floating GPU orbs running continuous 3D keyframe animations.
   - Dynamic drifting particle system with varying opacity, drift velocity, and colors mapped to the active theme.

5. **Hero Section & Animated Metrics**
   - 4 count-up metric cards (`15M+ Campaign Views`, `3.8x Average ROAS`, `+48% Retention Boost`, `4.9/5 Client Rating`).
   - Pulsing badges, glowing gradient borders, and instant triggers for the showreel modal and portfolio scroll.

6. **Video Portfolio Showcase (All 39 Projects Included)**
   - Category filtering: *All Videos*, *FB Direct Response VSLs*, *FB Reels & Vertical Ads*, *UGC & Unboxing Ads*, *Personal Category*, and *Gaming & Gameplay Edits*.
   - Instant search across video titles, descriptions, client names, software, and editing techniques.
   - Configurable per-page views (6, 9, or 12 cards per page) with full pagination and smooth scroll-to-view.
   - High-resolution YouTube thumbnail fallback system with local cached cover images (`tondra-thumb.jpg`, `bonobhumi-bestotaa-thumb.jpg`, `diabetes-pills-thumb.jpg`).
   - Support for custom video additions and local deletions saved to `localStorage`.

7. **Video Lightbox Modal**
   - Embeds clean, zero-cookie YouTube players (`youtube-nocookie.com`) with autoplay on launch.
   - 1-click clipboard link sharing with visual feedback, external YouTube launch, client/brand metrics, software badges, and technique highlights.

8. **Frame-by-Frame Stills Carousel & Zoom Lightbox**
   - 7 high-resolution frames with technical annotations:
     - Liquid Glass 3D Motion Design
     - Bonobhumi Diabetic Tea Glassmorphism UI
     - Diabetes Medical Diagnosis X-Ray & Warning Badges
     - Diabetes Statistical Infographics (13.8M Patients)
     - Social Proof Metric Card (300,000+ Customers)
     - Multi-Window Customer UGC Testimonial Grid
     - Bengali AI Search Prompt & Search Bar Motion Hook
   - Interactive Lightbox with **Zoom In**, **Zoom Out**, **Reset**, **Pan/Drag**, and keyboard navigation (`Left`, `Right`, `Escape`).

9. **Interactive Before / After Split Slider**
   - 3 comparative modes:
     - **Color Grade**: Flat log / RAW profile vs high-CTR saturated Facebook ad grade.
     - **VFX & Badges**: Clean footage vs animated lower-thirds, CTA badges, and subtitles with +128% retention spike badges.
     - **Shorts Re-frame**: 16:9 widescreen footage vs dynamic 9:16 vertical crop with background blur and pattern-interrupt hooks.
   - Fluid drag and pointer capture controls with responsive percentage slider.

10. **Other Projects & Motion Utilities**
    - **Keyframe Smoother**: Web tool for smoothing bezier curves and generating AE expressions (`key-frame-smoother.vercel.app`).
    - **Aspect Ratio Previewer**: Visual aspect ratio framing tool for video editors (`aspec-ratioo.vercel.app`).

11. **Technical Stack & Mastery Charts**
    - Interactive **Recharts Bar Chart** & **Radar Chart** visualizer.
    - Deep dives into primary NLEs: *DaVinci Resolve Studio* (98%), *Adobe After Effects* (95%), *Adobe Photoshop* (92%), and *Adobe Audition & Fairlight* (85%).
    - Key capabilities, favorite plugins & accelerators (*Dehancer Pro*, *FilmConvert Nitrate*, *Phantom LUTs*, *Beauty Box*, *Element 3D*, *Red Giant Universe*, *Sapphire FX*, *Mocha Pro*, etc.).
    - Milestone post-production stats: 1,200+ hrs raw footage, 450+ color grades, 800+ audio mixes, and 24-48 hr turnaround.

12. **Persistent Floating Presentation Scrubber**
    - Bottom persistent control bar with liquid water-flow wave animation.
    - Auto-play presentation / teleprompter mode (press `Space` to toggle).
    - Scrubbing track across 6 sections with interactive hover tooltip preview.
    - Quick back-to-top button.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite 5](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Animation**: [Framer Motion 11](https://www.framer.com/motion/)
- **Data Visualization**: [Recharts 2](https://recharts.org/)
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio Synthesis**: Native HTML5 Web Audio API

---

## 📂 Project Structure

```
rohaan-video-editor-portfolio/
├── index.html                   # HTML entry point with theme pre-hydration
├── package.json                 # Project dependencies & scripts
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.js           # Tailwind configuration with custom keyframes
├── tsconfig.json                # Root TypeScript config
├── tsconfig.app.json            # Application TypeScript config
├── tsconfig.node.json           # Vite node TypeScript config
├── vite.config.ts               # Vite bundler config with path aliases
├── public/                      # Static assets & downloaded images
│   ├── apple-touch-icon.png
│   ├── bonobhumi-bestotaa-thumb.jpg
│   ├── diabetes-pills-thumb.jpg
│   ├── favicon.ico
│   ├── liquid-glass-motion.jpg
│   ├── project-still-1.jpg
│   ├── project-still-2.jpg
│   ├── project-still-3.jpg
│   ├── project-still-4.jpg
│   ├── project-still-5.jpg
│   ├── project-still-6.jpg
│   ├── title-icon.png
│   └── tondra-thumb.jpg
└── src/
    ├── App.tsx                  # Root application orchestrator & theme manager
    ├── main.tsx                 # React DOM mount point
    ├── index.css                # Global styles, Tailwind directives & animations
    ├── types/
    │   └── index.ts             # Strong TypeScript interfaces & types
    ├── data/
    │   ├── videos.ts            # Complete database of all 39 video projects
    │   ├── stills.ts            # 7 high-res showcase frames with metadata
    │   ├── skills.ts            # Software toolkit & radar assessment datasets
    │   └── tools.ts             # Web utilities & creative tools
    ├── utils/
    │   └── audio.ts             # Web Audio API sound synthesizers
    └── components/
        ├── BackgroundGpu.tsx    # Atmospheric particles & animated floating orbs
        ├── BeforeAfterSlider.tsx# Interactive comparative image slider
        ├── CustomCursor.tsx     # Spring-based magnetic pointer
        ├── FloatingActions.tsx  # Presentation controller & scrubber bar
        ├── Footer.tsx           # Footer with links & back-to-top
        ├── Hero.tsx             # Hero section with animated metric counters
        ├── Navbar.tsx           # Floating navigation bar with theme switches
        ├── OtherProjects.tsx    # Web utilities showcase
        ├── Portfolio.tsx        # Video grid, search, filters & pagination
        ├── Preloader.tsx        # Cinematic timecode & shutter loader
        ├── SkillsSection.tsx    # Recharts bar/radar charts & software details
        ├── StillsCarousel.tsx   # Frame-by-frame stills & pan/zoom lightbox
        └── VideoModal.tsx       # YouTube video lightbox modal
```

---

## 🚀 Getting Started

### 1. Installation

```bash
cd /home/devxub/.gemini/antigravity/scratch/rohaan-video-editor-portfolio
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to preview the live application.

### 3. Build for Production

```bash
npm run build
```

This compiles TypeScript and builds production-optimized assets in the `dist/` directory.

### 4. Preview Production Build

```bash
npm run preview
```
