export type ThemeMode = "dark" | "light" | "halloween";

export type VideoCategory =
   | "all"
   | "sales-ads"
   | "fb-reels"
   | "ugc"
   | "personal"
   | "gaming";

export interface VideoProject {
   id: string;
   video_url: string;
   title: string;
   description: string;
   category: "sales-ads" | "fb-reels" | "ugc" | "personal" | "gaming";
   views?: string;
   clientName: string;
   thumbnailUrl?: string;
   editingSoftware: string[];
   features: string[];
   duration: string;
   featured?: boolean;
   retentionBoost?: string;
   createdAt?: string;
}

export interface StillShowcase {
   id: string;
   title: string;
   subtitle: string;
   category: string;
   imageUrl: string;
   hdImageUrl: string;
   clientName: string;
   software: string[];
   editingHighlights: string[];
   aspectRatio: string;
   timestamp: string;
   notes: string;
}

export interface SkillItem {
   id: string;
   name: string;
   shortName: string;
   proficiency: number;
   experienceYears: number;
   projectsCompleted: number;
   primaryRole: string;
   color: string;
   bgColor: string;
   borderColor: string;
   keyCapabilities: string[];
   favoritePlugins: string[];
}

export interface RadarItem {
   subject: string;
   A: number;
   fullMark: number;
}

export interface OtherProject {
   title: string;
   category: string;
   description: string;
   url: string;
   displayUrl: string;
}

export interface CategoryTab {
   id: VideoCategory;
   label: string;
   icon: string;
}
