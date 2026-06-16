import type { GitHubRepo, SkillItem } from "@/types";
import {
  GITHUB_USER,
  REPO_IMAGES,
  PRIORITY_REPOS,
  SKILL_META,
  EXTRA_SKILLS,
} from "./constants";

// ── Fetch GitHub repos ──
export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=18&type=public`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const repos: GitHubRepo[] = await res.json();

    return repos
      .filter((r) => !r.fork)
      .sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        let pA = PRIORITY_REPOS.findIndex((p) => nameA.includes(p));
        let pB = PRIORITY_REPOS.findIndex((p) => nameB.includes(p));
        pA = pA === -1 ? 999 : pA;
        pB = pB === -1 ? 999 : pB;
        if (pA !== pB) return pA - pB;
        return (
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
      })
      .slice(0, 12);
  } catch {
    return [];
  }
}

// ── Get repo image ──
export function getRepoImage(repoName: string): string | null {
  const name = repoName.toLowerCase();
  for (const [key, img] of Object.entries(REPO_IMAGES)) {
    if (name.includes(key)) return img;
  }
  return null;
}

// ── Time since (relative date) ──
export function timeSince(dateStr: string): string {
  const d = new Date(dateStr);
  const n = new Date();
  const diff = Math.floor((n.getTime() - d.getTime()) / 1000);

  if (diff < 3600) return Math.floor(diff / 60) + "m atrás";
  if (diff < 86400) return Math.floor(diff / 3600) + "h atrás";
  if (diff < 2592000) return Math.floor(diff / 86400) + "d atrás";
  if (diff < 31536000) return Math.floor(diff / 2592000) + "mo atrás";
  return Math.floor(diff / 31536000) + "a atrás";
}

// ── Fetch skills from GitHub language usage ──
export async function fetchSkills(): Promise<{
  row1: SkillItem[];
  row2: SkillItem[];
}> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=30&type=public`,
      { next: { revalidate: 3600 } }
    );

    const repos: GitHubRepo[] = res.ok ? await res.json() : [];

    const freq: Record<string, number> = {};
    repos.forEach((r) => {
      if (r.language) freq[r.language] = (freq[r.language] || 0) + 1;
    });

    const detected: SkillItem[] = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .map(([lang]) => {
        const meta = SKILL_META[lang];
        return meta ? { name: lang, ...meta } : null;
      })
      .filter((item): item is SkillItem => item !== null);

    const detectedNames = new Set(detected.map((d) => d.name));
    const extras = EXTRA_SKILLS.filter((e) => !detectedNames.has(e.name));
    const all = [...detected, ...extras];

    const row1 = all.filter((_, i) => i % 2 === 0);
    const row2 = all.filter((_, i) => i % 2 !== 0);

    while (row1.length < 6) row1.push(...row1.slice(0, 1));
    while (row2.length < 6) row2.push(...row2.slice(0, 1));

    return { row1, row2 };
  } catch {
    const half = Math.ceil(EXTRA_SKILLS.length / 2);
    return {
      row1: EXTRA_SKILLS.slice(0, half),
      row2: EXTRA_SKILLS.slice(half),
    };
  }
}
