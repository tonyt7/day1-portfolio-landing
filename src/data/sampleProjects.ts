import type { Project } from "../components/ProjectGallery";
import SmartCityImage from "../assets/smart-city-project.png"
import PortfolioImage from "../assets/Portfolio.png"
import StringMasterImage from "../assets/string-master-uk.png"
import WebInter from "../assets/website-internationalisation.png"
import MathPlan from "../assets/Mathpath-Logo.jpg"

export const sampleProjects: Project[] = [
  {
    id: "smart-city",
    title: "Smart City Community Portal",
    summary:
      "Crowdsourced reporting and idea-sharing platform with maps, voting, and admin dashboards.",
    stacks: ["React", "Express.js", "Leaflet", "Node.js", "MySQL","AWS"],
    image: SmartCityImage,
    status:"completed",
    links: [
      { type: "live", url: "https://smart-city-project.com" },
      { type: "github", url: "https://github.com/tonyt7/Smart_City_Community_Portal" },
      { type: "caseStudy", url: "https://1drv.ms/b/c/b4df617c42287b7f/EexA6WokiTlDlQcg9WQPMUgB9A4m9BVF7n-06r7ESgGZEw?e=SO1Euu" },
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
    image: MathPlan,
    status:"ongoing",
    links: [
            { type: "github", url: "https://github.com/yourname/mathpath" },
    ],
    year: 2025,
  },
  {
    id: "portfolio",
    title: "Interactive Portfolio Website",
    summary:
      "Personal developer portfolio with neon UI, theme switching, and project showcase components.",
    stacks: ["React", "TypeScript", "Vite","Framer Motion", "CSS","Vercel"],
    image: PortfolioImage,
    status:"completed",
    links: [
      { type: "live", url: "https://tonys-portfolio-ten.vercel.app" },
      { type: "github", url: "https://github.com/tonyt7/day1-portfolio-landing" },
    ],
    year: 2025,
  },
  {
    id: "String-master",
    title: "String Master -Business Portfolio",
    summary:
      "Interactive slide deck and exercises to train new trainees on fibre optics and communications.",
    stacks: ["Wordpress"],
    image: StringMasterImage,
    status:"completed",
    links: [
      { type: "live", url: "https://string-master.com/" },
    ],
    year: 2024,
  },
  {
    id: "kerala-i18n",
    title: "Kerala Culture Internationalisation Site",
    summary:
      "A multilingual website prototype that auto-detects the user's language and redirects them to a localized version. ",
    stacks: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    image: WebInter,
    status:"completed",
    links: [
      { type: "caseStudy", url: "https://1drv.ms/w/c/b4df617c42287b7f/EX97KEJ8Yd8ggLTsFgAAAAAB_d28Zm3OzYUAFq3Iu0sNog?e=XNAziX" },
      { type: "github", url: "https://github.com/tonyt7/Website-Internationalisation-Project" },
    ],
    year: 2024,
  },
];
