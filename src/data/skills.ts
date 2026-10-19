import { SkillItem, RadarItem } from '../types';

export const SKILLS_DATA: SkillItem[] = [
  {
    id: "davinci",
    name: "DaVinci Resolve Studio",
    shortName: "DaVinci Resolve",
    proficiency: 98,
    experienceYears: 5,
    projectsCompleted: 320,
    primaryRole: "Primary NLE, Professional Color Grading, Node Workflows & Fairlight Audio",
    color: "#FDE047",
    bgColor: "bg-amber-950/40",
    borderColor: "border-amber-800",
    keyCapabilities: [
      "Color Space Transform (CST)",
      "Fusion VFX & Node Trees",
      "Film Grain & Halation Emulation",
      "HDR & Rec.709 Cinema Mastering"
    ],
    favoritePlugins: [
      "Dehancer Pro",
      "FilmConvert Nitrate",
      "Phantom LUTs",
      "Beauty Box"
    ]
  },
  {
    id: "aftereffects",
    name: "Adobe After Effects",
    shortName: "After Effects",
    proficiency: 95,
    experienceYears: 5,
    projectsCompleted: 280,
    primaryRole: "Advanced Motion Graphics, Kinetic Typography & 3D Visual Effects",
    color: "#D8B4FE",
    bgColor: "bg-purple-950/40",
    borderColor: "border-purple-800",
    keyCapabilities: [
      "3D Camera Tracking & Matchmoving",
      "Custom Kinetic Text Animation",
      "Rotoscoping & Chroma Keying",
      "Lower Thirds & Callout Graphics"
    ],
    favoritePlugins: [
      "Element 3D",
      "Red Giant Universe",
      "Sapphire FX",
      "Mocha Pro",
      "AEJuice"
    ]
  },
  {
    id: "photoshop",
    name: "Adobe Photoshop",
    shortName: "Photoshop",
    proficiency: 92,
    experienceYears: 6,
    projectsCompleted: 450,
    primaryRole: "High-CTR YouTube Thumbnails, Asset Composition & Graphic Overlays",
    color: "#93C5FD",
    bgColor: "bg-blue-950/40",
    borderColor: "border-blue-800",
    keyCapabilities: [
      "Subject Cutouts & Rim Lighting",
      "Clickable Expressive Text Design",
      "Generative Masking & Relighting",
      "Color Grading Overlays"
    ],
    favoritePlugins: [
      "Camera Raw FX",
      "Topaz Gigapixel AI",
      "Phlearn Actions",
      "Generative Fill"
    ]
  },
  {
    id: "audition",
    name: "Adobe Audition & Fairlight",
    shortName: "Audition & Audio",
    proficiency: 85,
    experienceYears: 5,
    projectsCompleted: 220,
    primaryRole: "Sound Design, Spectral Cleaning, SFX & Dynamic Audio Mixing",
    color: "#6EE7B7",
    bgColor: "bg-emerald-950/40",
    borderColor: "border-emerald-800",
    keyCapabilities: [
      "Spectral Noise Reduction",
      "Dialogue Isolation & De-essing",
      "Impact SFX & Whoosh Spatialization",
      "Loudness Normalization (-14 LUFS)"
    ],
    favoritePlugins: [
      "iZotope RX 10",
      "FabFilter Pro-Q 3",
      "Waves Clarity VX",
      "Soothe2"
    ]
  }
];

export const RADAR_DATA: RadarItem[] = [
  {
    subject: "3-Sec Hook",
    A: 98,
    fullMark: 100
  },
  {
    subject: "Sales Pacing",
    A: 96,
    fullMark: 100
  },
  {
    subject: "Motion FX & CTAs",
    A: 94,
    fullMark: 100
  },
  {
    subject: "Direct Response",
    A: 92,
    fullMark: 100
  },
  {
    subject: "Color Grade",
    A: 90,
    fullMark: 100
  },
  {
    subject: "Audio & SFX",
    A: 88,
    fullMark: 100
  }
];
