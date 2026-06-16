// ── Types for the portfolio ──

export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
  topics: string[];
}

export interface SkillItem {
  name: string;
  logo: string;
  color: string;
}

export interface SkillMeta {
  [key: string]: {
    logo: string;
    color: string;
  };
}

export interface StatItem {
  value: number;
  label: string;
  suffix?: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}
