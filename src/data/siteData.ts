export const siteConfig = {
  name: "Webster C. Elumelu",
  handle: "get-webster",
  tagline: "I build payment systems, research AI security, and edit stories about Nigerian creatives.",
  resume: "webster-elumelu-resume.pdf",
  seeking: "Open to software and security engineering roles worldwide, remote or on-site.",
  title: "Software Engineer & Security Researcher",
  location: "Abuja, NG",
  email: "elumeluwebster@gmail.com",
  bio: `Software engineer building payment products end to end at 78 Financials: React, TypeScript and Vue frontends, Spring Boot and Python backends, and the databases behind them. I also research AI security at the LaBackDoor Cybersecurity Research Lab, with published work on vulnerability forecasting and access control. M.S. in Computer Science (Computing Systems) in progress at Georgia Tech.`,
};

export const links = {
  linkedin: "https://linkedin.com/in/webster-elumelu",
  github: "https://github.com/elu-melu",
  githubLab: "https://github.com/LaBackDoor",
  labackdoor: "https://www.labackdoor.com",
  scholar: "https://scholar.google.com/citations?user=ukgh9BkAAAAJ",
  // Paste your Spotify profile or playlist link here; the Listening column appears once it is set.
  spotify: "",
  bareMax: "https://www.bare-max.club/",
};

export const stats = [
  { value: "2.79M+", label: "Dangote IPO shares sold through a system I helped design" },
  { value: "₦1.46B+", label: "worth of shares sold through it, 14 Sep - 27 Oct 2026" },
  { value: "30+", label: "lab environments automated with Terraform and Ansible" },
  { value: "2", label: "published papers, 3 more under review" },
];

export const interests = [
  { label: "Design", icon: "pen-tool" },
  { label: "International Politics", icon: "globe" },
  { label: "Data", icon: "bar-chart" },
  { label: "Travel", icon: "map-pin" },
  { label: "Photography", icon: "camera" },
  { label: "Mathematics", icon: "sigma" },
  { label: "Cloud Infrastructure", icon: "shield" },
];

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
  "Frontend": ["React", "TypeScript", "Vue.js"],
  "Backend": ["Java (Spring Boot)", "Python", "Go", "REST APIs"],
  "Data": ["PostgreSQL", "MongoDB"],
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
      "Build Spring Boot REST APIs and microservices for transfers and bill payments, with OAuth, RBAC and audit logging",
      "Build and maintain the Payaza merchant app and Rove10 back office in React, TypeScript and Vue",
      "Helped design and build the Dangote IPO platform: client side, admin panel and multi-broker deployments; over 2.79 million shares (over NGN 1.46 billion) sold",
      "Shipped Payaza Give end to end, including multi-currency settlement",
    ],
  },
  {
    role: "Research Assistant (Systems & Infrastructure)",
    company: "LaBackDoor Cybersecurity Research Lab",
    date: "Jun 2023 - Present",
    bullets: [
      "Automated provisioning of 30+ virtualised lab environments (Terraform, Ansible, Proxmox)",
      "Built an access-control framework (AW-TRBAC) for large distributed NoSQL databases",
      "Built distributed Python network-analysis systems and a Rust networking stack",
      "Prototyped an LLM-driven agentic system for finding and fixing software vulnerabilities",
    ],
  },
  {
    role: "CyberSecurity AI Trainer",
    company: "micro1",
    location: "Remote",
    date: "Dec 2024 - Jan 2026",
    bullets: [
      "Built training data and evaluation benchmarks for AI models in the cybersecurity domain",
      "Simulated attacks on large language models and documented failure modes and mitigations",
    ],
  },
  {
    role: "IT Support",
    company: "Niger Delta Power Holding Company",
    location: "Abuja, NG",
    date: "Jan 2024 - Oct 2024",
    bullets: [
      "Supported malware detection and protection projects and enterprise hardware maintenance",
    ],
  },
  {
    role: "Frontend Engineer",
    company: "KNG Technologies",
    location: "New York, USA",
    date: "Nov 2022 - Aug 2024",
    bullets: [
      "Built React and TypeScript components for internal and client-facing products",
      "Standardised technical documentation in a central repository",
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
    title: "A Unified Framework Incorporating AW-TRBAC and Semantic Variational Autoencoders for Dynamic Threat Detection and Access Control",
    venue: "International Conference on Artificial Intelligence (World Congress in Computer Science, Computer Engineering & Applied Computing)",
    year: "2025",
    status: "published",
  },
  {
    title: "Predicting Software Vulnerability Trends with Multi-Recurrent Neural Networks: A Time Series Forecasting Approach",
    venue: "NLPAICS 2024, ACL Anthology",
    year: "2024",
    status: "published",
  },
  {
    title: "SysRepair-Bench: A Benchmark for AI Agents' Ability to Remediate Real-World System Vulnerabilities",
    venue: "Under review",
    year: "",
    status: "under review",
  },
  {
    title: "SysRepair: A Benchmark and Multi-Architecture Approach to Autonomous Vulnerability Remediation",
    venue: "Under review",
    year: "",
    status: "under review",
  },
  {
    title: "Autonomous System Vulnerability Remediation: A Survey of Agentic AI, Reinforcement Learning, Benchmarks, and Operational Safety",
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
    description: "Multi-recurrent neural networks that forecast software vulnerability trends from time-series data. Code for the NLPAICS 2024 paper.",
    tech: ["Python", "RNNs", "Time series"],
    highlights: ["Published in the ACL Anthology (NLPAICS 2024)"],
    link: "https://github.com/LaBackDoor/multi-recurrent-network",
    linkLabel: "View code",
  },
  {
    title: "AW-TRBAC and SVAE threat detection",
    description: "Access control for large distributed NoSQL databases combined with semantic variational autoencoders for dynamic threat detection.",
    tech: ["Python", "NoSQL", "VAEs", "Access control"],
    highlights: ["Published at the International Conference on Artificial Intelligence, 2025"],
    link: "https://github.com/CybearsecurityLab/svae-based-dynamic-threat-detection",
    linkLabel: "View code",
  },
  {
    title: "Automated lab provisioning",
    description: "Infrastructure as code that provisions virtualised research environments for the LaBackDoor lab.",
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

export interface LearningItem {
  topic: string;
  category: string;
  progress: number; // 0-100
  status: "active" | "planned" | "completed";
}

export const learningTracker: LearningItem[] = [
  {
    topic: "Kubernetes (CKA)",
    category: "Cloud Infrastructure",
    progress: 40,
    status: "active",
  },
  {
    topic: "Terraform & IaC",
    category: "Cloud Infrastructure",
    progress: 70,
    status: "active",
  },
  {
    topic: "Distributed Systems",
    category: "MSCS - Georgia Tech",
    progress: 30,
    status: "active",
  },
  {
    topic: "Advanced OS Concepts",
    category: "MSCS - Georgia Tech",
    progress: 25,
    status: "active",
  },
  {
    topic: "Astro + Vue",
    category: "Web Development",
    progress: 15,
    status: "active",
  },
  {
    topic: "AWS Solutions Architect",
    category: "Cloud Infrastructure",
    progress: 0,
    status: "planned",
  },
  {
    topic: "Rust",
    category: "Systems Programming",
    progress: 40,
    status: "active",
  },
];

export const affiliations = [
  {
    name: "LaBackDoor",
    url: "https://www.labackdoor.com",
    description: "Security research collective",
  },
  {
    name: "Bare Max",
    url: "https://www.bare-max.club/",
    description: "Spotlighting Nigerians in the creative industry",
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
  cover: { src: "bucket-hat", alt: "Webster as a toddler in a light-blue bucket hat and a teal and red jacket, crouching by a wooden wall and smiling at the camera.", caption: "Early days." },
  about: { src: "portrait", alt: "Webster as a baby in a studio portrait, wearing denim dungarees over a white top and looking straight at the camera.", caption: "If you reject me, this is who you reject." },
};
