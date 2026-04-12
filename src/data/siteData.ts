export const siteConfig = {
  name: "Webster C. Elumelu",
  handle: "get-webster",
  title: "Software & Cloud Engineer",
  location: "Abuja, NG",
  email: "elumeluwebster@gmail.com",
  bio: `Results-driven Software Engineer with an MS in Computer Science (Candidate). Proven expertise in architecting scalable fintech applications and cloud-native infrastructure. Skilled in bridging the gap between high-performance systems, DevOps practices, and user-centric design to drive digital transformation and reliable, production-grade deployments.`,
};

export const links = {
  linkedin: "https://linkedin.com/in/webster-elumelu",
  github: "https://github.com/LaBackDoor",
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
  "Cloud & Infrastructure": [
    "Docker",
    "Kubernetes",
    "Terraform",
    "GCP",
    "Linux",
    "Networking",
  ],
  "DevOps & CI/CD": [
    "GitHub Actions",
    "CI/CD Pipelines",
    "Infrastructure as Code",
    "Container Orchestration",
    "Monitoring & Observability",
  ],
  "Frontend & UX": [
    "React",
    "Vue.js",
    "TypeScript",
    "Heuristic Evaluation",
    "User Journey Mapping",
  ],
  "Backend & Data": ["Java", "Python", "MySQL", "Bash", "OAuth 2.0"],
};

export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  date: string;
  bullets: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: "UX/Software Engineer",
    company: "78 Financials",
    location: "Lagos, NG",
    date: "Jan 2025 - Present",
    bullets: [
      "Architected multi-factor authentication (MFA) and Google OAuth integrations using FingerprintJS, protecting thousands of user accounts",
      "Engineered a custom auto-reconciliation system providing real-time financial insights for executive leadership",
      "Shipped Payaza Give product end-to-end, developing complete onboarding flows and link creation systems",
      "Designed multi-tenancy architecture for white-labeled merchant and back office applications",
      "Developed critical accounts infrastructure with PND/PNC implementations",
      "Architected responsive UI components and led UX ideation for currency exchange features using VueJS and TypeScript",
    ],
  },
  {
    role: "CyberSecurity AI Trainer",
    company: "micro1",
    location: "Remote",
    date: "Dec 2024 - June 2025",
    bullets: [
      "Compiled technical reports quantifying vulnerabilities, improving AI system resilience by 60%",
      "Simulated over 10 cyber attack vectors on LLMs in Docker-based VM environments, mitigating up to 85% of targeted vulnerabilities",
      "Designed secure Docker setups reducing environment deployment time by 30%",
    ],
  },
  {
    role: "IT Support",
    company: "Niger Delta Power Holding Company",
    location: "Abuja, NG",
    date: "Jan 2024 - Oct 2024",
    bullets: [
      "Assisted in internal projects concerning malware detection and protection, as well as CDN attack mitigation",
      "Managed repairs and maintenance of enterprise computing infrastructure",
    ],
  },
  {
    role: "Frontend Engineer",
    company: "KNG Technologies",
    location: "New York, USA",
    date: "Nov 2022 - August 2024",
    bullets: [
      "Implemented standardized documentation process with centralized repository access",
      "Developed custom solutions used as patch updates for legacy projects",
      "Built components using React TypeScript best practices for optimal page load performance",
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
    description:
      "Full-stack health platform based on CDC Prevent T2 standards",
    tech: [
      "Java",
      "GCP",
      "Docker",
      "MySQL",
      "GitHub Actions",
      "OAuth 2.0",
    ],
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
