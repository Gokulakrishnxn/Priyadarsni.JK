/**
 * Single source of truth for everything the site says.
 * Edit this file to change content; components only render it.
 */

export const site = {
  name: "Priyadarsni JK",
  role: "AI & Data Science",
  city: "Chennai",
  country: "India",
  timeZone: "Asia/Kolkata",
  email: "priyadarsnijk@gmail.com",
  github: "https://github.com/priyadjk",
  githubUser: "priyadjk",
  linkedin: "https://www.linkedin.com/in/priyadarsni-jk-745a0025b/",
  /** ISO date shown as "Updated ..." under the name. */
  updated: "2026-11-13",
  summary:
    "AI and Data Science graduate of Hindustan Institute of Technology and Science with hands-on experience in data analytics, model building and generative AI. Interested in building intelligent, user-centric products, and driven by curiosity across technical and creative work.",
  description:
    "Priyadarsni JK is an AI and Data Science engineer from Chennai, India, working with Python, machine learning and generative AI.",
} as const;

/* ------------------------------------------------------------------ */
/* Tech                                                                */
/* ------------------------------------------------------------------ */

export type Tech = {
  name: string;
  /** Path under /public. */
  icon: string;
  /** Alternate file for the dark theme. */
  iconDark?: string;
  /** Single-colour black artwork that should invert on dark. */
  mono?: boolean;
};

export const tech = {
  python: { name: "Python", icon: "/icons/python.svg" },
  java: { name: "Java", icon: "/icons/java.svg" },
  typescript: { name: "TypeScript", icon: "/icons/typescript.svg" },
  sql: { name: "SQL", icon: "/icons/database.svg", mono: true },
  pandas: {
    name: "Pandas",
    icon: "/icons/pandas.svg",
    iconDark: "/icons/pandas-dark.svg",
  },
  numpy: { name: "NumPy", icon: "/icons/numpy.svg" },
  matplotlib: { name: "Matplotlib", icon: "/icons/matplotlib.svg" },
  seaborn: { name: "Seaborn", icon: "/icons/seaborn.png" },
  ml: { name: "Machine Learning", icon: "/icons/ml.svg", mono: true },
  nlp: { name: "NLP", icon: "/icons/nlp.svg", mono: true },
  genai: { name: "Generative AI", icon: "/icons/genai.svg", mono: true },
  streamlit: { name: "Streamlit", icon: "/icons/streamlit.svg" },
  nextjs: { name: "Next.js", icon: "/icons/nextjs.svg", mono: true },
  react: { name: "React", icon: "/icons/react.svg" },
  git: { name: "Git", icon: "/icons/git.svg" },
  github: { name: "GitHub", icon: "/icons/github.svg", mono: true },
  jupyter: { name: "Jupyter Notebook", icon: "/icons/jupyter.svg" },
  vscode: { name: "VS Code", icon: "/icons/vscode.svg" },
  colab: { name: "Google Colab", icon: "/icons/colab.svg" },
  gemini: { name: "Google Gemini", icon: "/icons/gemini.svg" },
  chatgpt: { name: "ChatGPT", icon: "/icons/openai.svg", mono: true },
  copilot: { name: "GitHub Copilot", icon: "/icons/copilot.svg", mono: true },
  perplexity: { name: "Perplexity", icon: "/icons/perplexity.svg" },
  claude: { name: "Claude", icon: "/icons/claude.svg" },
} satisfies Record<string, Tech>;

export type TechId = keyof typeof tech;

export const stack: { label: string; items: TechId[] }[] = [
  { label: "Languages", items: ["python", "java", "typescript", "sql"] },
  { label: "Data", items: ["pandas", "numpy", "matplotlib", "seaborn"] },
  { label: "ML & AI", items: ["ml", "nlp", "genai"] },
  { label: "Apps", items: ["streamlit", "nextjs", "react"] },
  {
    label: "Tools",
    items: ["git", "github", "jupyter", "vscode", "colab"],
  },
  {
    label: "AI",
    items: ["gemini", "chatgpt", "copilot", "perplexity", "claude"],
  },
];

/* ------------------------------------------------------------------ */
/* Work                                                                */
/* ------------------------------------------------------------------ */

export type CoverKind =
  | "chat"
  | "route"
  | "chip"
  | "wave"
  | "scan"
  | "grid"
  | "pipeline"
  | "bars"
  | "line"
  | "receipt"
  | "frames";

export type ProjectGroup = "Capstone" | "AI" | "Data & ML" | "Mini";

export type Project = {
  slug: string;
  name: string;
  /** One line, shown under the cover. */
  tagline: string;
  /** A fuller sentence, used on the resume page. */
  description: string;
  group: ProjectGroup;
  stack: TechId[];
  repo?: string;
  cover: CoverKind;
  /** Accent colour for the cover and the small mark. */
  accent: string;
};

const gh = (repo: string) => `${site.github}/${repo}`;

export const projects: Project[] = [
  {
    slug: "praxis",
    name: "Praxis",
    tagline: "Chat, voice, images and document Q&A in one multi-LLM app.",
    description:
      "Capstone project. A unified multi-LLM app that merges chat, voice, image generation and smart document Q&A into one platform, with both online and offline AI interactions for students, professionals and creators.",
    group: "Capstone",
    stack: ["genai", "nlp"],
    cover: "chat",
    accent: "#8b5cf6",
  },
  {
    slug: "llm-query-router",
    name: "LLM Query Router",
    tagline: "Classifies intent and routes each query to the right model.",
    description:
      "Final-year project. A web framework for orchestrating heterogeneous LLMs that classifies user intent and routes each request to the most suitable model by task complexity and cost.",
    group: "Capstone",
    stack: ["typescript", "nextjs", "react", "genai"],
    repo: gh("project"),
    cover: "route",
    accent: "#0ea5e9",
  },
  {
    slug: "aura-ai",
    name: "AURA AI",
    tagline: "An air-gapped assistant that runs fully on-device.",
    description:
      "A privacy-first workspace assistant for Snapdragon-powered PCs: document intelligence, multi-file semantic search and voice-driven actions that run locally with no cloud APIs.",
    group: "AI",
    stack: ["python", "streamlit", "genai", "nlp"],
    repo: gh("AURA-AI-Air-Gapped-Ultra-Responsive-Assistant"),
    cover: "chip",
    accent: "#ef4444",
  },
  {
    slug: "frosty",
    name: "Frosty the Penguin",
    tagline: "A voice-interactive, penguin-themed AI companion.",
    description:
      "A friendly penguin AI companion built on NLP concepts, with voice interaction, joke telling, customisable voice settings and a responsive light and dark interface.",
    group: "AI",
    stack: ["typescript", "python", "nlp"],
    repo: gh("NLP--chatbot"),
    cover: "wave",
    accent: "#38bdf8",
  },
  {
    slug: "verisport-ai",
    name: "VeriSport AI",
    tagline: "An AI solution for digital sports media.",
    description: "An AI solution for digital sports media, built with Gemini.",
    group: "AI",
    stack: ["typescript", "react", "gemini"],
    repo: gh("VeriSport-AI"),
    cover: "scan",
    accent: "#22c55e",
  },
  {
    slug: "ml-pipeline-architect",
    name: "ML Pipeline Architect",
    tagline: "AI agents that plan and write Kaggle pipelines with you.",
    description:
      "An interactive Kaggle strategy builder and pipeline generator that simulates a team of AI agents (domain expert, feature engineer and ML modeller) to design and write code for machine learning competitions.",
    group: "AI",
    stack: ["typescript", "react", "gemini", "ml"],
    repo: gh("ML-Pipeline-Architect"),
    cover: "pipeline",
    accent: "#f59e0b",
  },
  {
    slug: "representation-learning",
    name: "Representation Learning",
    tagline: "Image search by visual content instead of tags.",
    description:
      "A content-based image retrieval system that maps images into a learned latent space and finds matches by visual similarity instead of metadata or tags.",
    group: "AI",
    stack: ["typescript", "react", "ml"],
    repo: gh("Representation-Learning-"),
    cover: "grid",
    accent: "#ec4899",
  },
  {
    slug: "churn-predictor",
    name: "Churn Predictor",
    tagline: "End-to-end customer churn prediction, served with Streamlit.",
    description:
      "An end-to-end machine learning application that predicts customer churn and is deployed as a Streamlit app.",
    group: "Data & ML",
    stack: ["python", "streamlit", "pandas", "ml"],
    repo: gh("StreamLit-Task"),
    cover: "bars",
    accent: "#f97316",
  },
  {
    slug: "crypto-forecast",
    name: "Crypto Forecast",
    tagline: "Trend and volatility analysis with LSTM forecasting.",
    description:
      "A workflow for analysing historical cryptocurrency prices, identifying trends and volatility patterns, and forecasting with Long Short-Term Memory networks.",
    group: "Data & ML",
    stack: ["typescript", "ml"],
    repo: gh("Cryptocurrency"),
    cover: "line",
    accent: "#eab308",
  },
  {
    slug: "pizza-bill-generator",
    name: "Pizza Bill Generator",
    tagline: "Itemised pizza bills from core Java.",
    description:
      "A mini project in core Java that automates pizza billing: itemised costs, size and topping customisations, and a clear final receipt.",
    group: "Mini",
    stack: ["java"],
    repo: gh("Java-mini-project-"),
    cover: "receipt",
    accent: "#e11d48",
  },
  {
    slug: "imageio-gif-creator",
    name: "ImageIO GIF Creator",
    tagline: "A Python script that stitches images into GIFs.",
    description:
      "A Python script that merges multiple images into a GIF using the ImageIO library.",
    group: "Mini",
    stack: ["python"],
    repo: gh("imageio-gif-project"),
    cover: "frames",
    accent: "#14b8a6",
  },
];

export const projectGroups: ProjectGroup[] = [
  "Capstone",
  "AI",
  "Data & ML",
  "Mini",
];

export function projectsUsing(id: TechId): Project[] {
  return projects.filter((p) => p.stack.includes(id));
}

/* ------------------------------------------------------------------ */
/* Experience, education, certificates                                 */
/* ------------------------------------------------------------------ */

export type Org = { name: string; logo: string; url?: string };

export const orgs = {
  hits: {
    name: "Hindustan Institute of Technology and Science",
    logo: "/logos/hits.png",
    url: "https://hindustanuniv.ac.in",
  },
  cognifyz: {
    name: "Cognifyz Technologies",
    logo: "/logos/cognifyz.png",
    url: "https://cognifyz.com",
  },
  internshipStudio: {
    name: "Internship Studio",
    logo: "/logos/internship-studio.svg",
    url: "https://internshipstudio.com",
  },
  cognizant: {
    name: "Cognizant",
    logo: "/logos/cognizant.png",
    url: "https://www.theforage.com",
  },
  forage: {
    name: "Forage",
    logo: "/logos/forage.png",
    url: "https://www.theforage.com",
  },
  google: {
    name: "Google",
    logo: "/icons/google.svg",
    url: "https://developers.google.com",
  },
  mongodb: {
    name: "MongoDB",
    logo: "/logos/mongodb.svg",
    url: "https://learn.mongodb.com",
  },
  gdg: {
    name: "Google Developer Groups On Campus",
    logo: "/logos/gdg.png",
    url: "https://gdg.community.dev",
  },
  myntra: {
    name: "Myntra",
    logo: "/logos/myntra.png",
    url: "https://www.myntra.com",
  },
} satisfies Record<string, Org>;

export type OrgId = keyof typeof orgs;

export type Role = {
  org: OrgId;
  title: string;
  when: string;
  lines: string[];
};

export const experience: Role[] = [
  {
    org: "cognifyz",
    title: "Data Science Intern",
    when: "May 2025 to Jun 2025",
    lines: ["Month-long data science internship, May 12 to June 12, 2025."],
  },
  {
    org: "internshipStudio",
    title: "Java Programming Intern",
    when: "Jul 2024 to Aug 2024",
    lines: [
      "Five-week internship in core Java programming, July 19 to August 23, 2024.",
    ],
  },
  {
    org: "cognizant",
    title: "Virtual Intern, Artificial Intelligence & Data Analytics",
    when: "Jul 2023",
    lines: [
      "Cognizant's virtual job simulation in AI and data analytics on Forage, July 1 to July 9, 2023.",
    ],
  },
];

export const education = {
  org: "hits" as OrgId,
  degree: "B.Tech, Computer Science and Engineering",
  specialization: "Artificial Intelligence and Data Science",
  place: "Chennai",
  when: "2022 to 2026",
  cgpa: "9.27",
};

export type CertGroup = {
  /** Folder name in the tree. */
  dir: string;
  org: OrgId;
  files: { name: string; note?: string; url?: string }[];
};

export const certifications: CertGroup[] = [
  { dir: "google", org: "google", files: [{ name: "Agentic AI Day" }] },
  {
    dir: "mongodb",
    org: "mongodb",
    files: [{ name: "MongoDB Basics for Students" }],
  },
  {
    dir: "gdg-on-campus",
    org: "gdg",
    files: [
      { name: "GDG on Campus Solution Challenge", note: "with Hack2skill" },
    ],
  },
  {
    dir: "myntra",
    org: "myntra",
    files: [{ name: "HackerRamp WeForShe" }],
  },
];

export const certificateCount = certifications.reduce(
  (n, g) => n + g.files.length,
  0,
);
