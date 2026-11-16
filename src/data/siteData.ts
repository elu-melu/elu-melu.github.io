export const siteConfig = {
  name: "Webster C. Elumelu",
  handle: "get-webster",
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
};

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
  "Frontend": ["React", "TypeScript", "Vue.js", "WebSockets", "Analytics instrumentation"],
  "Backend & APIs": ["Java (Spring Boot)", "Python (Django, FastAPI)", "Go", "REST APIs", "Microservices", "OAuth 2.0", "RBAC"],
  "Data": ["PostgreSQL", "Oracle", "MySQL", "MongoDB", "AWS S3"],
  "Cloud & Infrastructure": ["Docker", "Kubernetes", "Terraform", "Ansible", "Proxmox", "GCP", "Linux"],
  "Tooling": ["Git & GitHub", "GitHub Actions", "CI/CD Pipelines", "Bash"],
  "Systems": ["C/C++", "Rust"],
};

export interface ExperienceEntry {
  role: string;
  company: string;
  // location: string;
  date: string;
  bullets: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: "UX/Software Engineer",
    company: "78 Financials (Payaza & Rove10)",
    // location: "Lagos, NG",
    date: "Jan 2025 - Present",
    bullets: [
      "Build and maintain Spring Boot REST APIs and microservices for Transfer and Bills Payment, with OAuth, role-based access control and audit logging",
      "Build and maintain two production frontends, Payaza's merchant app and Rove10's back office (React, TypeScript, Vue), shipped through development, UAT and main",
      "Helped design the system Payaza used to sell shares in the Dangote IPO (14 Sep - 27 Oct 2026); over 2.79 million shares (over NGN 1.46 billion) were sold through it",
      "Shipped Payaza Give end to end, including multi-currency settlement, onboarding and link-creation workflows",
      "Built MFA and Google OAuth integrations using FingerprintJS, and designed multi-tenancy for white-labeled merchant and back-office applications",
      "Engineered a custom auto-reconciliation system providing real-time financial insights for executive leadership",
      "Developed accounts infrastructure with PND/PNC implementations",
      "Optimised queries across PostgreSQL, Oracle, MySQL and MongoDB, and debugged client integrations to root cause",
    ],
  },
  {
    role: "Research Assistant (Systems & Infrastructure)",
    company: "LaBackDoor Cybersecurity Research Lab",
    // location: "Remote",
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
    // location: "Remote",
    date: "Dec 2024 - Jan 2026",
    bullets: [
      "Built training data and evaluation benchmarks for AI models in the cybersecurity domain",
      "Simulated attack vectors against large language models in Docker-based VM environments",
      "Documented vulnerabilities, failure modes and mitigations in technical reports for model and system hardening",
    ],
  },
  {
    role: "IT Support",
    company: "Niger Delta Power Holding Company",
    // location: "Abuja, NG",
    date: "Jan 2024 - Oct 2024",
    bullets: [
      "Assisted in internal projects concerning malware detection and protection, as well as CDN attack mitigation",
      "Managed repairs and maintenance of enterprise computing infrastructure",
    ],
  },
  {
    role: "Frontend Engineer",
    company: "KNG Technologies",
    // location: "New York, USA",
    date: "Nov 2022 - Aug 2024",
    bullets: [
      "Built React and TypeScript components for internal and client-facing products",
      "Implemented standardized documentation process with centralized repository access",
      "Developed custom solutions used as patch updates for legacy projects",
    ],
  },
];

export interface Project {
  title: string;
  description: string;
  tech: string[];
  highlights: string[];
}

export const projects: Project[] = [
  {
    title: "Wellness Pathway",
    description: "Full-stack health platform based on CDC Prevent T2 standards",
    tech: ["Java", "GCP", "Docker", "MySQL", "GitHub Actions", "OAuth 2.0"],
    highlights: [
      "Architected secure Java-based API and backend infrastructure",
      "Engineered CI/CD pipeline using GitHub Actions and GCP",
      "Implemented Gmail API integration via OAuth 2.0 for notifications",
      "Designed MySQL schemas with automated data loading scripts",
    ],
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
    progress: 30,
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
    progress: 0,
    status: "planned",
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
