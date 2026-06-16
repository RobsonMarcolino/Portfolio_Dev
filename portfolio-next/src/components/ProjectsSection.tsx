"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Tilt from "react-parallax-tilt";
import type { GitHubRepo } from "@/types";
import { GITHUB_USER, LANG_COLORS, REPO_IMAGES, PRIORITY_REPOS } from "@/lib/constants";

const ICONS = [
  "📦", "⚙️", "🚀", "🔧", "💡", "🌐", "🎯", "🔬", "🛠️", "📊", "🧩", "🔑",
  "🗂️", "🎲", "💻",
];

function getRepoImage(repoName: string): string | null {
  const name = repoName.toLowerCase();
  for (const [key, img] of Object.entries(REPO_IMAGES)) {
    if (name.includes(key)) return img;
  }
  return null;
}

function timeSince(dateStr: string): string {
  const d = new Date(dateStr);
  const n = new Date();
  const diff = Math.floor((n.getTime() - d.getTime()) / 1000);
  if (diff < 3600) return Math.floor(diff / 60) + "m atrás";
  if (diff < 86400) return Math.floor(diff / 3600) + "h atrás";
  if (diff < 2592000) return Math.floor(diff / 86400) + "d atrás";
  if (diff < 31536000) return Math.floor(diff / 2592000) + "mo atrás";
  return Math.floor(diff / 31536000) + "a atrás";
}

function ProjectCard({
  repo,
  index,
}: {
  repo: GitHubRepo;
  index: number;
}) {
  const imgSrc = getRepoImage(repo.name);
  const langColor = LANG_COLORS[repo.language || ""] || "#555";
  const icon = ICONS[index % ICONS.length];
  const [imgError, setImgError] = useState(false);

  const tags: { name: string; color: string | null }[] = [];
  if (repo.language) tags.push({ name: repo.language, color: langColor });
  if (repo.topics)
    repo.topics
      .slice(0, 2)
      .forEach((t) => tags.push({ name: t, color: null }));

  return (
    <Tilt
      tiltMaxAngleX={6}
      tiltMaxAngleY={6}
      glareEnable={true}
      glareMaxOpacity={0.15}
      glareColor="#ffffff"
      glarePosition="all"
      scale={1.02}
      className="h-full rounded-3xl"
    >
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex flex-col h-full bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_8px_32px_rgba(15,33,62,0.06)] overflow-hidden transition-all duration-500 hover:shadow-[0_16px_48px_rgba(241,90,36,0.15)] hover:border-orange/30"
      >
        {/* Subtle shine overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none z-10" />

        {/* Image area */}
        <div className="w-full h-48 relative overflow-hidden flex items-center justify-center border-b border-white/40 bg-slate-100/30">
          {imgSrc && !imgError ? (
            <Image
              src={imgSrc}
              alt={repo.name}
              fill
              className="object-cover z-[2] transition-transform duration-700 group-hover:scale-110"
              onError={() => setImgError(true)}
              unoptimized
            />
          ) : (
            <span className="text-6xl opacity-20 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500 transform">
              {icon}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex-1 flex flex-col relative z-[2]">
          <div className="flex justify-between items-start mb-4">
            <div className="font-[Montserrat] font-bold text-xl text-navy tracking-tight transition-colors duration-300 group-hover:text-orange">
              {repo.name.replace(/-/g, " ")}
            </div>
            <div className="flex gap-3 text-[0.7rem] font-medium text-slate-500 bg-white/50 px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">
              <span>⭐ {repo.stargazers_count}</span>
              <span>🍴 {repo.forks_count}</span>
            </div>
          </div>

        <p className="text-sm text-slate-600/70 leading-relaxed font-light mb-5 flex-1">
          {repo.description ||
            "Projetos e soluções em desenvolvimento contínuo. Focado em performance e boas práticas."}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag.name}
              className="text-[0.6rem] font-bold tracking-widest text-slate-700 bg-white/40 border border-white/60 rounded-full px-3 py-1.5 uppercase shadow-sm transition-all duration-300 group-hover:border-orange/30 group-hover:bg-orange/10 group-hover:text-orange"
              style={
                tag.color
                  ? { color: tag.color, borderColor: `${tag.color}44` }
                  : undefined
              }
            >
              {tag.name}
            </span>
          ))}
        </div>

        <div className="text-[0.65rem] font-medium text-navy/40 tracking-wider pt-4 mt-auto">
          ⟳ Atualizado {timeSince(repo.updated_at)}
        </div>
      </div>
      </a>
    </Tilt>
  );
}

export default function ProjectsSection() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);

  const fetchRepos = useCallback(async () => {
    try {
      const res = await fetch(
        `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=18&type=public`
      );

      if (res.status === 404) throw new Error("Usuário não encontrado");
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.message || `HTTP ${res.status}`);
      }

      const data: GitHubRepo[] = await res.json();
      const filtered = data
        .filter((r) => !r.fork)
        .sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          let pA = PRIORITY_REPOS.findIndex((p) => nameA.includes(p));
          let pB = PRIORITY_REPOS.findIndex((p) => nameB.includes(p));
          pA = pA === -1 ? 999 : pA;
          pB = pB === -1 ? 999 : pB;
          if (pA !== pB) return pA - pB;
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        })
        .slice(0, 12);

      setRepos(filtered);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  // Reveal animation & Parallax
  useEffect(() => {
    if (loading) return;
    const section = sectionRef.current;
    if (!section) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting)
            setTimeout(() => e.target.classList.add("in"), i * 70);
        });
      },
      { threshold: 0.1 }
    );

    section.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [loading, repos]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-28 md:py-32 px-[6%] md:px-[10%] bg-off-white overflow-hidden"
    >
      <div className="relative z-[2]">
        {/* Header */}
      <div className="text-center mb-16 reveal">
        <span className="text-[0.68rem] tracking-[6px] text-orange uppercase font-medium block mb-2.5">
          // 03. projetos_github
        </span>
        <h2 className="font-[Montserrat] font-black text-[clamp(2rem,4vw,3rem)] text-navy tracking-tight">
          Meus <span className="text-orange">Repositórios</span>
        </h2>
        <div className="w-14 h-1 bg-orange mt-4 mx-auto rounded-full shadow-[0_0_12px_rgba(241,90,36,0.5)]" />
      </div>

      {/* GitHub status */}
      <div className="flex items-center gap-3 justify-center mb-12 reveal">
        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#4caf50] animate-[pulse-dot_2s_ease-in-out_infinite]" />
        <span className="text-xs tracking-[3px] text-slate-600">
          github.com/<strong className="text-orange">RobsonMarcolino</strong>
        </span>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-20 text-xs tracking-[3px] text-slate-600">
          Carregando repositórios
          <span className="animate-[blink_0.9s_step-end_infinite]">.</span>
          <span className="animate-[blink_0.9s_0.2s_step-end_infinite]">.</span>
          <span className="animate-[blink_0.9s_0.4s_step-end_infinite]">.</span>
        </div>
      ) : error ? (
        <div className="text-center py-20 text-xs tracking-[3px] text-red-500 border border-red-500/20 max-w-[500px] mx-auto rounded-lg p-8">
          // ERRO AO CARREGAR REPOSITÓRIOS
          <br />
          <br />
          {error}
          <br />
          <br />
          <a
            href={`https://github.com/${GITHUB_USER}?tab=repositories`}
            target="_blank"
            className="text-orange no-underline"
          >
            Ver repositórios no GitHub
          </a>
        </div>
      ) : repos.length === 0 ? (
        <div className="text-center py-20 text-xs tracking-[3px] text-slate-600">
          Nenhum repositório público encontrado.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
          {repos.map((repo, i) => {
            // Bento Grid asymmetry: Some cards are larger
            const colSpan = (i % 5 === 0 || i % 5 === 3) ? "md:col-span-2 lg:col-span-3" : "md:col-span-2 lg:col-span-2";
            return (
              <div key={repo.id} className={`reveal ${colSpan}`}>
                <ProjectCard repo={repo} index={i} />
              </div>
            );
          })}
        </div>
      )}
      </div>
    </section>
  );
}
