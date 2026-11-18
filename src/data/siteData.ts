export const siteConfig = {
  name: "Webster C. Elumelu",
  handle: "get-webster",
  tagline:
    "I work on what's asked of me and what I can't stop thinking about. Duty and desire, mostly in the same week.",
  subline: "I'll go where I'm needed, and stay where I'm curious.",
  resume: "webster-elumelu-resume.pdf",
  seeking:
    "Open to software and security engineering roles worldwide, remote or on-site.",
  title: "Webster Elumelu",
  description:
    "The personal site of Webster Elumelu: payment systems, security research, editing, films, books, and the work in between.",
  location: "Abuja, NG",
  email: "elumeluwebster@gmail.com",
  bio: `I grew up in Nigeria, studied in Accra and St. Louis, and came back to work on money that has to move. At 78 Financials that means Payaza and Rove10. At LaBackDoor I research how AI finds and fixes vulnerabilities. At Bare Max I edit interviews with Nigerian creatives. The rest of my time goes to films, books, politics, and the arguments I keep having with all three.`,
};

export const now = {
  updated: "November 2026",
  building:
    "Payaza and Rove10 at 78 Financials; an agent that finds and fixes vulnerabilities at LaBackDoor.",
  reading: "Between books. The shelf is in the log.",
  thinking: "Whether an agent can be trusted to fix what it finds.",
};

export const links = {
  linkedin: "https://linkedin.com/in/webster-elumelu",
  github: "https://github.com/elu-melu",
  githubLab: "https://github.com/LaBackDoor",
  labackdoor: "https://www.labackdoor.com",
  scholar: "https://scholar.google.com/citations?user=ukgh9BkAAAAJ",
  // Paste your Spotify profile or playlist link here; the Listening column appears once it is set.
  spotify: "https://open.spotify.com/user/lrhdt8pv6tr2wzng7jho127l1",
  // Live now-playing endpoint (see scripts/SPOTIFY.md). Paste the Worker URL after
  // deploying it. Leave it empty and the column stays on the last-played snapshot.
  nowPlaying: "https://elumelu-now-playing.elumelu.workers.dev",
  bareMax: "https://www.bare-max.club/",
};

export interface BrandChip {
  name: string;
  color: string;
  descriptor: string;
}

// Keys match the data-chip attribute on the elements the chip follows.
export const brandChips: Record<string, BrandChip> = {
  payaza: {
    name: "Payaza",
    color: "#0B7A5B",
    descriptor: "payments for african business",
  },
  rove10: { name: "Rove10", color: "#C2571A", descriptor: "back office" },
  "78financials": {
    name: "78 Financials",
    color: "#2F5D8C",
    descriptor: "fintech group",
  },
  labackdoor: {
    name: "LaBackDoor",
    color: "#A0522D",
    descriptor: "security research lab",
  },
};

export const education = [
  {
    school: "Georgia Institute of Technology",
    location: "Atlanta, GA, USA",
    degree: "Masters of Science in Computer Science",
    focus: "Computing Systems",
    date: "Expected Dec 2027",
  },
  {
    school: "Webster University",
    location: "Saint Louis, MO, USA",
    degree: "Bachelor of Science in Computer Science",
    minor: "International Relations",
    date: "Jan 2019 - Dec 2022",
  },
];

export const skills = {
  Frontend: ["React", "TypeScript", "Vue.js"],
  Backend: ["Java (Spring Boot)", "Python", "Go", "REST APIs"],
  Data: ["PostgreSQL", "MongoDB"],
  "Security & Infra": ["OAuth, MFA, RBAC", "Docker", "Terraform"],
};

export interface ExperienceEntry {
  role: string;
  company: string;
  location?: string;
  caseStudy?: { href: string; label: string };
  date: string;
  bullets: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: "UX/Software Engineer",
    company: "78 Financials (Payaza & Rove10)",
    location: "Lagos, NG",
    date: "Jan 2025 - Present",
    caseStudy: { href: "work/dangote-ipo/", label: "Read the Dangote IPO case study" },
    bullets: [
      "Own the Payaza merchant app and the Rove10 back office (React, TypeScript, Vue)",
      "Build the Spring Boot services behind transfers and bill payments, with OAuth, role-based access and audit logging",
      "Helped build the Dangote IPO platform: the investor-facing side, the admin panel, and a setup that let different brokers run on it. It sold over 2.79 million shares, worth over ₦1.46 billion",
      "Shipped Payaza Give from start to finish, including settling payments in multiple currencies, designed to hold up under many people paying at once and under attack",
    ],
  },
  {
    role: "Research Assistant (Systems & Infrastructure)",
    company: "LaBackDoor Cybersecurity Research Lab",
    date: "Jun 2023 - Present",
    bullets: [
      "Automated 30+ virtual lab environments with Terraform, Ansible and Proxmox",
      "Built AW-TRBAC, an access-control framework for large distributed NoSQL databases",
      "Wrote distributed Python network-analysis tools and a Rust networking stack",
      "Prototyped an LLM agent that finds and fixes software vulnerabilities",
    ],
  },
  {
    role: "CyberSecurity AI Trainer",
    company: "micro1",
    location: "Remote",
    date: "Dec 2024 - Jan 2026",
    bullets: [
      "Built training data and test benchmarks for AI models in cybersecurity",
      "Attacked large language models on purpose, then documented how they failed and how to fix it",
    ],
  },
  {
    role: "IT Support",
    company: "Niger Delta Power Holding Company",
    location: "Abuja, NG",
    date: "Jan 2024 - Oct 2024",
    bullets: [
      "Supported malware detection and protection projects, and kept enterprise hardware running",
    ],
  },
  {
    role: "Frontend Engineer",
    company: "KNG Technologies",
    location: "New York, USA",
    date: "Nov 2022 - Aug 2024",
    bullets: [
      "Built React and TypeScript components for internal and client-facing products",
      "Moved scattered technical docs into one central repository",
    ],
  },
];

export interface Publication {
  title: string;
  venue: string;
  year: string;
  status: "published" | "under review";
}

export const publications: Publication[] = [
  {
    title:
      "A Unified Framework Incorporating AW-TRBAC and Semantic Variational Autoencoders for Dynamic Threat Detection and Access Control",
    venue:
      "International Conference on Artificial Intelligence (World Congress in Computer Science, Computer Engineering & Applied Computing)",
    year: "2025",
    status: "published",
  },
  {
    title:
      "Predicting Software Vulnerability Trends with Multi-Recurrent Neural Networks: A Time Series Forecasting Approach",
    venue: "NLPAICS 2024, ACL Anthology",
    year: "2024",
    status: "published",
  },
  {
    title:
      "SysRepair-Bench: A Benchmark for AI Agents' Ability to Remediate Real-World System Vulnerabilities",
    venue: "Under review",
    year: "",
    status: "under review",
  },
  {
    title:
      "SysRepair: A Benchmark and Multi-Architecture Approach to Autonomous Vulnerability Remediation",
    venue: "Under review",
    year: "",
    status: "under review",
  },
  {
    title:
      "Autonomous System Vulnerability Remediation: A Survey of Agentic AI, Reinforcement Learning, Benchmarks, and Operational Safety",
    venue: "Under review",
    year: "",
    status: "under review",
  },
];

export interface Project {
  title: string;
  description: string;
  tech: string[];
  highlights: string[];
  link?: string;
  linkLabel?: string;
}

export const projects: Project[] = [
  {
    title: "Vulnerability trend forecasting",
    description:
      "Multi-recurrent neural networks that forecast software vulnerability trends from time-series data. Code for the NLPAICS 2024 paper.",
    tech: ["Python", "RNNs", "Time series"],
    highlights: ["Published in the ACL Anthology (NLPAICS 2024)"],
    link: "https://github.com/LaBackDoor/multi-recurrent-network",
    linkLabel: "View code",
  },
  {
    title: "AW-TRBAC and SVAE threat detection",
    description:
      "Access control for large distributed NoSQL databases combined with semantic variational autoencoders for dynamic threat detection.",
    tech: ["Python", "NoSQL", "VAEs", "Access control"],
    highlights: [
      "Published at the International Conference on Artificial Intelligence, 2025",
    ],
    link: "https://github.com/CybearsecurityLab/svae-based-dynamic-threat-detection",
    linkLabel: "View code",
  },
  {
    title: "Automated lab provisioning",
    description:
      "Infrastructure as code that provisions virtualised research environments for the LaBackDoor lab.",
    tech: ["Terraform", "Ansible", "Proxmox"],
    highlights: ["30+ environments provisioned with Terraform and Ansible on Proxmox"],
  },
  {
    title: "Wellness Pathway",
    description: "Full-stack health platform based on CDC Prevent T2 standards.",
    tech: ["Java", "GCP", "Docker", "MySQL", "GitHub Actions", "OAuth 2.0"],
    highlights: ["Java API, CI/CD on GCP, Gmail API notifications via OAuth 2.0"],
  },
];

// Films without exact dates are ordered by their "order" number. Set this to
// match your list: "oldest-first" if you add new films at the bottom.
export const filmListOrder: "oldest-first" | "newest-first" = "oldest-first";

export const bareMax = {
  role: "Editor",
  body: "I'm the editor at Bare Max, which spotlights Nigerians in the creative industry. I research each creative, write interview questions tailored to them, and shape their answers into stories that keep the artist's voice intact. I also bring an engineer's and researcher's rigour to the process, and handle the technical side of getting each issue out.",
};

export const photos = {
  portrait: {
    alt: "Webster as a baby in a studio portrait, wearing denim dungarees over a white top and looking straight at the camera.",
    caption: "The first draft. No notes yet.",
  },
};
