export type MediaItem = {
  src: string;
  alt: string;
  caption?: string;
  type?: 'image' | 'video' | 'youtube' | 'pdf';
  videoId?: string;
};

export type CaseStudy = {
  title: string;
  context: string;
  role: string;
  challenge: string;
  outcome: string;
  stack: string[];
  mediaPlaceholder: string;
  projectUrl?: string;
  githubUrl?: string;
  mediaItems?: MediaItem[];
};

export type GameProject = {
  title: string;
  arc: string;
  tools: string[];
  details: string;
  projectUrl?: string;
  imagePath?: string;
  imageCaption?: string;
  mediaItems?: MediaItem[];
  mediaPlaceholder: string;
};
