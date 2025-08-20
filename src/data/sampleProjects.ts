import type { Project } from "../components/ProjectGallery";

export const sampleProjects: Project[] = [
  {
    id: "smart-city",
    title: "Smart City Community Portal",
    summary:
      "Crowdsourced reporting and idea-sharing platform with maps, voting, and admin dashboards.",
    stacks: ["React", "TypeScript", "Leaflet", "Node.js", "MySQL"],
    image: "/images/smart-city.jpg",
    links: [
      { type: "live", url: "https://example.com/smart-city" },
      { type: "github", url: "https://github.com/yourname/smart-city" },
      { type: "caseStudy", url: "/case-studies/smart-city" },
    ],
    year: 2025,
    featured: true,
  },
  {
    id: "mathpath",
    title: "MathPath Learning App",
    summary:
      "An adaptive maths practice tool with skills assessment, dashboards, and progress tracking.",
    stacks: ["React", "Node.js", "Express", "MongoDB"],
    image: "/images/mathpath.jpg",
    links: [
      { type: "live", url: "https://example.com/mathpath" },
      { type: "github", url: "https://github.com/yourname/mathpath" },
    ],
    year: 2024,
  },
  {
    id: "portfolio",
    title: "Interactive Portfolio Website",
    summary:
      "Personal developer portfolio with neon UI, theme switching, and project showcase components.",
    stacks: ["React", "TypeScript", "Framer Motion", "CSS"],
    image: "/images/portfolio.jpg",
    links: [
      { type: "live", url: "https://example.com/portfolio" },
      { type: "github", url: "https://github.com/yourname/portfolio" },
      { type: "demo", url: "https://youtu.be/demo-portfolio" },
    ],
    year: 2025,
  },
  {
    id: "fiber-training",
    title: "Fibre Optics Training Deck",
    summary:
      "Interactive slide deck and exercises to train new trainees on fibre optics and communications.",
    stacks: ["Svelte", "TypeScript", "Vite"],
    image: "/images/fiber-training.jpg",
    links: [
      { type: "github", url: "https://github.com/yourname/fiber-training" },
    ],
    year: 2025,
  },
  {
    id: "kerala-i18n",
    title: "Kerala Culture Internationalisation Site",
    summary:
      "A multilingual demo site showcasing cultural assets with adaptive layouts and MoSCoW requirements.",
    stacks: ["Laravel", "MySQL", "HTML", "CSS", "JavaScript"],
    image: "/images/kerala-i18n.jpg",
    links: [
      { type: "live", url: "https://example.com/kerala" },
      { type: "github", url: "https://github.com/yourname/kerala-i18n" },
    ],
    year: 2024,
  },
];
