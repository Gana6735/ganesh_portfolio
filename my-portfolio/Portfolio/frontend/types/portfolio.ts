
export interface BrandingConfig {
  venture_name: string;
  recruiter_email: string;
  typing_text: string[];
  typing_speed: number;
}

export interface AssetsConfig {
  hero_image_url: string;
  resume_pdf_url: string;
  show_resume_button: boolean;
  resume_button_text: string;
  logo_url: string;
}

export interface NavItem {
  name: string;
  path: string;
  order: number;
}

export interface SocialLink {
  platform: string;
  url: string;
  active: boolean;
}

export interface Specialty {
  label: string;
  tags: string;
}

export interface AboutConfig {
  heading: string;
  bio: string;
  image_url: string;
  specialties: Specialty[];
}

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  dates: string;
  coreImpact: string;
  bullets: string[];
}

export interface VideoResumeConfig {
  youtube_url: string;
  youtube_id: string;
  title: string;
  description: string;
  autoplay: boolean;
  show_controls: boolean;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  iconUrl: string | null;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  githubUrl: string;
  demoUrl: string;
  isPublished: boolean;
}

export interface PortfolioConfig {
  branding: BrandingConfig;
  assets: AssetsConfig;
  navigation: NavItem[];
  socials: SocialLink[];
  about: AboutConfig;
  experience: ExperienceItem[];
  video_resume: VideoResumeConfig;
  skills: Skill[];
  projects: Project[];
  blogs: any[];
  contact: {
    welcome_modal_delay: number;
    recurring_cta_interval: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'master' | 'admin';
  status: 'approved' | 'pending';
  pin?: string;
}
