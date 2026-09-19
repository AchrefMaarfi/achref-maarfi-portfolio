/**
 * All site copy lives here. Sources: Achref_Maarfi_Resume.pdf (authoritative
 * for facts, dates and titles) enriched with "Achref Maarfi infos combined.pdf"
 * (projects, services, design, photography).
 */
import {
  Code2,
  Layers,
  Palette,
  Rocket,
  Workflow,
  type LucideIcon,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface NavLink {
  label: string;
  href: `#${string}`;
}

export interface Fact {
  label: string;
  value: string;
}

/** One layer of the stack, ordered top (what a user touches) to bottom (what runs it). */
export interface StackLayer {
  label: string;
  /** One plain sentence: the job this layer does. */
  role: string;
  skills: string[];
}

/** A cross-cutting toolset that isn't a runtime layer (languages, design tools). */
export interface ToolBelt {
  label: string;
  skills: string[];
}

/** A distinct title/date range within one company (LinkedIn-style grouped roles). */
export interface ExperiencePosition {
  title: string;
  type: string;
  start: string;
  end: string;
  bullets: string[];
}

export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  /** Present on a single-role entry; omitted when `positions` groups several roles at this company. */
  bullets?: string[];
  /** Present when this company had multiple distinct roles, rendered as sub-entries. */
  positions?: ExperiencePosition[];
  stack: string[];
}

export interface EducationEntry {
  degree: string;
  school: string;
  date: string;
}

export interface Project {
  title: string;
  tag: string;
  description: string;
  stack: string[];
  /** Path under /assets — a placeholder renders until the file exists. */
  image: string;
  imageAlt: string;
  /** null hides the CTA. Never invent a URL. */
  link: string | null;
  /** CTA text suffix, e.g. "on GitHub" or "Live Demo". Defaults to "on GitHub". */
  linkLabel?: string;
  /** Repo URL. When set alongside demoLink, renders both as separate icon links instead of the single link/linkLabel CTA. */
  githubLink?: string;
  /** Live site URL. See githubLink. */
  demoLink?: string;
  /** Set once `image` points at a real file instead of a placeholder. */
  hasRealImage?: boolean;
  /** Dark-mode variant of `image`, shown instead when the site is in dark theme. */
  imageDark?: string;
}

export interface FeaturedProject extends Project {
  features: string[];
  stackGroups: { label: string; items: string[] }[];
}

export interface Service {
  title: string;
  description: string;
  tools: string[];
  icon: LucideIcon;
}

export interface ContactLink {
  label: string;
  value: string;
  href: string;
  external: boolean;
}

// ---------------------------------------------------------------------------
// Identity
// ---------------------------------------------------------------------------

export const person = {
  name: "Achref Maarfi",
  firstName: "Achref",
  lastName: "Maarfi",
  role: "Software Engineer",
  location: "Ariana, Tunisia",
  email: "achref.maarfi0@gmail.com",
  github: "https://github.com/achrefmaarfi",
  linkedin: "https://www.linkedin.com/in/achrefmaarfi/",
  resume: "/Achref_Maarfi_Resume.pdf",
} as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
] satisfies NavLink[];

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const hero = {
  eyebrow: "Software Engineer",
  titleLead: "Building Ideas into",
  titleHighlight: "Software",
  photo: {
    src: "/assets/headshot.jpg",
    alt: "Portrait photograph of Achref Maarfi",
  },
  description:
    "Full-stack engineer crafting scalable, user-centered web applications with React, Next.js, Django and PostgreSQL.",
  primaryCta: { label: "View Work", href: "#projects" },
  secondaryCta: { label: "Get in Touch", href: "#contact" },
} as const;

// ---------------------------------------------------------------------------
// About
// ---------------------------------------------------------------------------

export const about = {
  tag: "About Me",
  title: "Engineering with a designer’s eye",
  paragraphs: [
    "I’m a Full-Stack Software Engineer with hands-on experience building scalable web applications using React, Next.js, Angular, Django, Django REST Framework and PostgreSQL.",
    "I develop responsive interfaces, design RESTful APIs, containerize applications with Docker and set up CI/CD pipelines. I care about software architecture, clean code, and shipping maintainable, high-performance solutions in collaborative teams.",
    "Beyond code, I bring a background in UI/UX, graphic design and photography — combining technical expertise with design thinking to build products that are both functional and visually appealing.",
  ],
  facts: [
    { label: "Location", value: "Ariana, Tunisia" },
    { label: "Education", value: "MS Computer Science — ESPRIT" },
    { label: "Languages", value: "Arabic · French · English" },
    { label: "Availability", value: "Open to opportunities" },
  ] satisfies Fact[],
} as const;

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------

/**
 * The stack, in request order: top to bottom is what a user touches down to
 * what stores their data — the shape "full-stack" actually describes,
 * rather than an arbitrary grid of skill categories.
 */
export const stackLayers = [
  {
    label: "Interface",
    role: "What people see and touch.",
    skills: ["React", "Next.js", "Angular", "Tailwind CSS", "HTML5", "CSS3"],
  },
  {
    label: "Application",
    role: "Where the logic and business rules live.",
    skills: [
      "Django",
      "Django REST Framework",
      "Node.js",
      "Express.js",
      "Spring Boot",
      ".NET Core",
      "Symfony",
    ],
  },
  {
    label: "Data",
    role: "Where information is stored and retrieved.",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Oracle"],
  },
  {
    label: "Infrastructure",
    role: "How it ships, runs, and scales.",
    skills: [
      "Docker",
      "Nginx",
      "Jenkins",
      "GitHub Actions",
      "Linux",
      "Git",
      "SonarQube",
      "Maven",
      "RabbitMQ",
    ],
  },
] satisfies StackLayer[];

/** Cross-cutting skills that sit outside the request flow above. */
export const toolBelts = [
  {
    label: "Languages I write in",
    skills: [
      "Python",
      "JavaScript",
      "TypeScript",
      "Java",
      "SQL",
      "PHP",
      "Bash",
      "C#",
    ],
  },
  {
    label: "Also design with",
    skills: ["Figma", "Photoshop", "Illustrator"],
  },
] satisfies ToolBelt[];

// ---------------------------------------------------------------------------
// Experience & education
// ---------------------------------------------------------------------------

export const experience = [
  {
    role: "Software Engineer",
    company: "Business Management Group (BMG)",
    location: "Ariana, Tunisia",
    start: "Jul 2024",
    end: "Present",
    positions: [
      {
        title: "Full-Stack Software Engineer",
        type: "Full-time",
        start: "Oct 2024",
        end: "Present",
        bullets: [
          "Developed a full-stack social media management platform with Next.js, Django REST Framework and PostgreSQL to centralize content planning and publishing.",
          "Designed secure RESTful APIs, authentication, and scalable backend services for multi-user account management.",
          "Integrated Google Gemini AI to automate social media caption generation.",
          "Used Docker, Celery and WebSockets for containerized deployment, background tasks and real-time features.",
        ],
      },
      {
        title: "Software Engineering Intern (PFE — End of Studies)",
        type: "Internship",
        start: "Feb 2025",
        end: "Aug 2025",
        bullets: [
          "Completed the end-of-studies internship (PFE) in parallel with the full-time role above, using the same platform as the academic project.",
        ],
      },
      {
        title: "Frontend Web Developer Intern",
        type: "Internship",
        start: "Jul 2024",
        end: "Aug 2024",
        bullets: [
          "Converted a Figma prototype into a fully responsive React web platform for a Pilates studio, styled with Tailwind CSS.",
          "Delivered pixel-perfect UI alongside designers and optimized components for performance and UX.",
        ],
      },
    ],
    stack: [
      "React",
      "Next.js",
      "Django REST Framework",
      "PostgreSQL",
      "Docker",
      "Celery",
      "WebSockets",
      "Tailwind CSS",
    ],
  },
  {
    role: "Frontend Web Developer Intern",
    company: "INSTAR",
    location: "Tunis, Tunisia",
    start: "Jul 2023",
    end: "Aug 2023",
    bullets: [
      "Built the admin dashboard for Indar, a décor product catalog and ordering app, to manage products for the client-facing mobile app.",
    ],
    stack: ["Angular 16", "MongoDB"],
  },
  {
    role: "End of Studies Intern (PFE — ISET Béja) — Web Development",
    company: "Move Up IT Solutions",
    location: "Tunis, Tunisia",
    start: "Jan 2022",
    end: "Jun 2022",
    bullets: [
      "Built a consignment sales web app managing clients, products, sellers, contracts and invoices.",
    ],
    stack: ["Node.js", "Vue.js", "MySQL"],
  },
] satisfies ExperienceEntry[];

export const education = [
  {
    degree: "MS in Computer Science / Software Engineering",
    school: "ESPRIT — École Supérieure Privée d’Ingénierie et de Technologies",
    date: "Jan 2026",
  },
  {
    degree: "BS in Computer Technology, Information System Development",
    school: "ISET Béja — Higher Institute of Technological Studies",
    date: "Jun 2022",
  },
] satisfies EducationEntry[];

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export const featuredProject = {
  title: "Plan’IT",
  tag: "Featured · SaaS Platform",
  description:
    "A social media management platform for businesses, agencies, community managers and content creators — centralizing content planning, publishing, collaboration, analytics, notifications and AI-assisted content generation.",
  features: [
    "Content scheduling",
    "Analytics dashboard",
    "Team collaboration",
    "AI-generated captions",
    "Role-based access control",
    "Real-time updates",
  ],
  stackGroups: [
    {
      label: "Frontend",
      items: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "PWA",
        "Electron",
      ],
    },
    {
      label: "Backend",
      items: ["Django", "DRF", "Django Channels", "Celery", "Celery Beat"],
    },
    {
      label: "Infrastructure",
      items: ["PostgreSQL", "Redis", "Docker", "Nginx", "Gunicorn", "Daphne"],
    },
    { label: "AI", items: ["Google Gemini API"] },
  ],
  stack: ["Next.js", "Django", "PostgreSQL", "Docker", "Gemini API"],
  image: "/assets/planit/create-post.png",
  imageAlt:
    "Plan’IT post composer with AI caption generation and engagement prediction",
  hasRealImage: true,
  link: "/projects/planit",
  linkLabel: "Project Details",
} satisfies FeaturedProject;

export const projects = [
  {
    title: "Logo Overlay Studio",
    tag: "Batch Image Tool",
    description:
      "A browser-based tool that overlays a logo onto batches of photos entirely client-side — nothing is uploaded, everything processes locally.",
    stack: ["HTML", "CSS", "JavaScript"],
    image: "/assets/logoverlay.png",
    imageAlt:
      "Logo Overlay Studio interface showing batch settings and file upload panels",
    link: "https://logoverlay.vercel.app/",
    githubLink: "https://github.com/AchrefMaarfi/Logoverlay",
    demoLink: "https://logoverlay.vercel.app/",
    hasRealImage: true,
  },
  {
    title: "Video Editor Portfolio",
    tag: "Portfolio Website",
    description:
      "A modern, responsive portfolio website built with React, TypeScript and Tailwind CSS, showcasing video editing work.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Vercel"],
    image: "/assets/video-editor-portfolio-light.png",
    imageDark: "/assets/video-editor-portfolio-dark.png",
    imageAlt: "Video editor portfolio website homepage",
    link: "https://video-editor-portfolio-blush-six.vercel.app/",
    githubLink: "https://github.com/AchrefMaarfi/video-editor-portfolio",
    demoLink: "https://video-editor-portfolio-blush-six.vercel.app/",
    hasRealImage: true,
  },
  // {
  //   title: "WhereToGo",
  //   tag: "Microservices",
  //   description:
  //     "Event creation and registration platform built on a microservices architecture with Keycloak authentication.",
  //   stack: ["Spring Boot", "Angular", "Docker", "Keycloak"],
  //   image: "/assets/wheretogo.jpg",
  //   imageAlt: "WhereToGo event listing page with registration options",
  //   link: null,
  // },
  // {
  //   title: "Angular Dashboard",
  //   tag: "Business Dashboard",
  //   description:
  //     "Administrative dashboard for business management with analytics, a modern responsive UI and component-based architecture.",
  //   stack: ["Angular", "TypeScript"],
  //   image: "/assets/angular-dashboard.jpg",
  //   imageAlt: "Angular admin dashboard with analytics charts",
  //   link: null,
  // },
  // {
  //   title: "React Website & Dashboard",
  //   tag: "Web Interfaces",
  //   description:
  //     "Responsive web interfaces and dashboards with API integration and reusable components.",
  //   stack: ["React", "Tailwind CSS"],
  //   image: "/assets/react-dashboard.jpg",
  //   imageAlt: "React dashboard interface built with Tailwind CSS",
  //   link: null,
  // },
  // {
  //   title: "Spring Boot + Angular App",
  //   tag: "Enterprise Full-Stack",
  //   description:
  //     "Enterprise-style full-stack application with REST APIs and authentication.",
  //   stack: ["Spring Boot", "Angular", "REST"],
  //   image: "/assets/springboot-angular.jpg",
  //   imageAlt:
  //     "Enterprise application screen built with Spring Boot and Angular",
  //   link: null,
  // },
  // {
  //   title: "Symfony Academic Project",
  //   tag: "MVC Application",
  //   description:
  //     "Full-stack MVC application with database integration and an authentication system.",
  //   stack: ["Symfony", "PHP", "MySQL"],
  //   image: "/assets/symfony.jpg",
  //   imageAlt: "Symfony web application interface",
  //   link: null,
  // },
] satisfies Project[];

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

export const services = [
  {
    title: "Web Development",
    description: "Modern, responsive websites and web applications.",
    tools: ["React", "Next.js", "Angular", "Django"],
    icon: Code2,
  },
  {
    title: "Full-Stack Development",
    description:
      "Complete applications from frontend to backend — APIs, database design, authentication and business platforms.",
    tools: ["APIs", "Databases", "Auth"],
    icon: Layers,
  },
  {
    title: "UI/UX Implementation",
    description: "Turning designs into responsive, performant interfaces.",
    tools: ["Figma", "Tailwind CSS", "React"],
    icon: Palette,
  },
  {
    title: "Automation",
    description:
      "Workflow automations, internal tools and business process optimization.",
    tools: ["Process automation", "Internal tools", "Integrations"],
    icon: Workflow,
  },
  {
    title: "SaaS Development",
    description: "Building SaaS products end-to-end, from MVP to production.",
    tools: ["Next.js", "Django", "PostgreSQL", "Docker"],
    icon: Rocket,
  },
] satisfies Service[];

// ---------------------------------------------------------------------------
// Design & photography
// ---------------------------------------------------------------------------

export const creative = {
  tag: "Beyond Code",
  title: "Design & Photography",
  design: {
    title: "Graphic Design",
    description:
      "Visual communication work for student and tech communities — IEEE, WIE, SIGHT and Google Developer Groups.",
    tools: ["Photoshop", "Illustrator", "Figma"],
    work: [
      "Social media visuals",
      "Event branding",
      "Marketing assets",
      "UI mockups",
    ],
    images: [
      { src: "/assets/design-1.jpg", alt: "Event branding poster design" },
      { src: "/assets/design-2.jpg", alt: "Social media visual campaign" },
      { src: "/assets/design-3.jpg", alt: "UI mockup concept" },
    ],
  },
  photography: {
    title: "Photography",
    description:
      "A long-term passion for nature and creative photography and visual storytelling.",
    gear: "DSLR camera",
    interests: ["Nature", "Creative", "Visual storytelling"],
    images: [
      { src: "/assets/photo-1.jpg", alt: "Nature photograph" },
      { src: "/assets/photo-2.jpg", alt: "Creative photography composition" },
      { src: "/assets/photo-3.jpg", alt: "Visual storytelling photograph" },
    ],
  },
} as const;

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------

export const contact = {
  tag: "Contact",
  title: "Let’s build something great",
  description:
    "Interested in working together or discussing a project? Let’s connect.",
  links: [
    {
      label: "Email",
      value: person.email,
      href: `mailto:${person.email}`,
      external: false,
    },
    {
      label: "GitHub",
      value: "github.com/achrefmaarfi",
      href: person.github,
      external: true,
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/achrefmaarfi",
      href: person.linkedin,
      external: true,
    },
    {
      label: "Location",
      value: person.location,
      href: "",
      external: false,
    },
  ] satisfies ContactLink[],
} as const;
