import type { SkillMeta, SkillItem } from "@/types";

// ── GitHub Config ──
export const GITHUB_USER = "RobsonMarcolino";

// ── Repo images mapping ──
export const REPO_IMAGES: Record<string, string> = {
  "chatbot-raio": "/Agent IA.png",
  raioxapp: "/RaioXapp.jpeg",
  mimos: "/CestasMimos.png",
  conecta: "/ConectaDoa.png",
  nathani: "/Gestao.png",
  marvel: "/MarvelStore.png",
  mec: "/MecChill.png",
  nexus: "/NexusStore.png",
  barber: "/TheBarber.png",
  vanguard:
    "https://github.com/RobsonMarcolino/VANGUARD/raw/main/public/screenshot.png",
  moto: "https://github.com/RobsonMarcolino/moto-pecas/raw/main/public/preview.webp",
};

// ── Priority repos (shown first) ──
export const PRIORITY_REPOS = ["raioxapp", "nexus", "nathani", "moto", "mec"];

// ── Language colors ──
export const LANG_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  "C#": "#178600",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Go: "#00ADD8",
  Rust: "#dea584",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Dart: "#00B4AB",
  Kotlin: "#F18E33",
  Swift: "#F05138",
};

// ── Skill metadata (detected from GitHub repos) ──
export const SKILL_META: SkillMeta = {
  JavaScript: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: "#f1e05a",
  },
  TypeScript: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    color: "#3178c6",
  },
  Python: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    color: "#3572A5",
  },
  Java: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    color: "#b07219",
  },
  "C#": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
    color: "#178600",
  },
  PHP: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    color: "#4F5D95",
  },
  HTML: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    color: "#e34c26",
  },
  CSS: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    color: "#563d7c",
  },
  Shell: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
    color: "#89e051",
  },
  Dart: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
    color: "#00B4AB",
  },
  Dockerfile: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    color: "#2496ED",
  },
};

// ── Extra skills (always shown) ──
export const EXTRA_SKILLS: SkillItem[] = [
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "#539e43",
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#61DAFB",
  },
  {
    name: "Next.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    color: "#ffffff",
  },
  {
    name: "Inteligência Art.",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/openai/openai-original.svg",
    color: "#412991",
  },
  {
    name: "Google Cloud",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    color: "#4285F4",
  },
  {
    name: "Azure",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
    color: "#008AD7",
  },
  {
    name: "Docker",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    color: "#2496ED",
  },
  {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    color: "#F05032",
  },
  {
    name: "PostgreSQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    color: "#336791",
  },
  {
    name: "MySQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    color: "#00758f",
  },
  {
    name: "MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    color: "#589636",
  },
  {
    name: "Linux",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    color: "#FCC624",
  },
  {
    name: "Tailwind",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    color: "#06B6D4",
  },
  {
    name: "Express",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    color: "#aaaaaa",
  },
  {
    name: "Databricks",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/databricks/databricks-original.svg",
    color: "#FF3621",
  },
  {
    name: "VS Code",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    color: "#007ACC",
  },
];

// ── Typing roles ──
export const TYPING_ROLES = [
  "Fullstack Developer",
  "React & Node.js",
  "API Architect",
  "Clean Code Advocate",
  "Open Source Enthusiast",
];

// ── Stats ──
export const STATS = [
  { value: 3, label: "Anos Exp.", suffix: "+" },
  { value: 20, label: "Projetos", suffix: "+" },
  { value: 12, label: "Tecnologias", suffix: "+" },
];
