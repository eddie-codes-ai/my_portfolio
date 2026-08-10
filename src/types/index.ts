export interface Profile {
  name: string;
  title: string;
  location: string;
  status: string;
  uptime: string;
  philosophy: {
    paragraphs: string[];
    quote: string;
    tags: string[];
  };
  social: {
    github: string;
    linkedin: string;
    email: string;
  };
  stats: {
    label: string;
    value: string;
  }[];
}

export interface Skill {
  id: string;
  name: string;
  percentage: number;
  category: 'frontend' | 'backend' | 'mobile' | 'devops' | 'database';
  icon: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  type: 'backend' | 'fullstack' | 'frontend' | 'mobile';
  status: 'live' | 'in-progress' | 'archived';
  techStack: string[];
  highlights: string[];
  github?: string;
  live?: string;
  year: string;
  /** 'github' marks a card auto-generated from the live repo list rather than hand-written. */
  source?: 'github';
  /** True for auto-synced cards backed by a private repo — hides the (inaccessible) github link. */
  private?: boolean;
}

export interface TimelineEntry {
  id: string;
  year: string;
  title: string;
  organization: string;
  description: string;
  type: 'education' | 'project' | 'freelance';
}