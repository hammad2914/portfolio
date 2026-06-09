export const site = {
  title: "Hammad Ali | Full Stack Software Engineer",
  description:
    "Full Stack Software Engineer specializing in scalable ERP, SaaS, and supply-chain systems with React.js, Next.js, Node.js, and PostgreSQL.",
};

export const hero = {
  imgUrl: "/images/Code typing-bro.png",
  name: "Hammad Ali",
  heading: "Hi, I'm Hammad",
  typingText: [
    "Full Stack Software Engineer",
    1500,
    "Building ERP & SaaS Systems",
    1500,
  ] as (string | number)[],
  description:
    "Results-driven Full Stack Software Engineer with 3+ years of experience designing and delivering enterprise-grade ERP, SaaS, and supply-chain systems. I lead end-to-end development — frontend architecture, backend APIs, real-time data, AI integrations, and production deployments.",
  btnText: "Get in touch",
  btnUrl: "contactus",
};

export const socialLinks = [
  {
    icon: "fa-brands:github",
    iconBgClass: "facebook",
    href: "https://github.com/hammad2914",
  },
  {
    icon: "fa-brands:linkedin-in",
    iconBgClass: "linkedin",
    href: "https://www.linkedin.com/in/hammad-ali-1a4631255",
  },
  {
    icon: "fa-file-pdf-o",
    iconBgClass: "pdf",
    href: "/resume/Hammad_Resume.pdf",
  },
];

export const about = {
  imgSrc: "/images/hammad.png",
  miniTitle: "About Me",
  title:
    'BUILDING <span>SCALABLE &</span><br /><span>EFFICIENT</span> FULL-STACK APPS',
  description:
    "I'm a Full Stack Software Engineer with 3+ years of experience delivering production ERP, SaaS, and supply-chain platforms using React.js, Next.js, Node.js, Nest.js, and PostgreSQL. I work across the full stack — from reusable frontend architecture and high-performance AG Grid interfaces to backend APIs, WebSocket synchronization, Prisma data layers, Docker deployments, and AI-powered automation pipelines.",
  funfacts: [
    { title: "Production Systems", number: 7 },
    { title: "Years Experience", number: 3 },
    { title: "Core Technologies", number: 5 },
  ],
  btnText: "Get in touch",
  btnUrl: "contactus",
};

export type ProjectDetails = {
  title: string;
  description: string;
  type: string;
  technologies: string;
  platform: string;
};

export type ProjectCollageSize = "featured" | "medium" | "portrait" | "small";

export type ProjectItem = {
  thumbUrl: string;
  /** Extra images shown in the detail modal (e.g. second app screenshot). */
  modalImages?: string[];
  title: string;
  subTitle: string;
  collageSize: ProjectCollageSize;
  details: ProjectDetails;
};

export const projects = {
  sectionHeading: {
    miniTitle: "My Work",
    title: "RECENT PROJECTS",
  },
  allProjects: [
    {
      thumbUrl: "/images/qa-app.png",
      title: "Integra",
      subTitle: "Quality Inspection Platform",
      collageSize: "featured",
      details: {
        title: "Integra – Quality Inspection Platform",
        description:
          "Led full-stack development of 7 inspection workflows with multi-stage approvals, real-time WebSocket updates, and automated PDF generation. Built live KPI dashboards and backend services that improved quality oversight and significantly reduced quality escapes.<br><br>Replaced manual reporting with a fully digital workflow — generating inspection reports in seconds, streamlining validation and sign-offs, and giving QA teams real-time visibility into defect trends and team productivity.",
        type: "Enterprise Web Platform",
        technologies:
          "React.js, Node.js, WebSockets, PDF Generation, PostgreSQL",
        platform: "Web",
      },
    },
    {
      thumbUrl: "/images/vp.png",
      title: "Oculas Vendor Portal",
      subTitle: "B2B Supply Chain Management",
      collageSize: "medium",
      details: {
        title: "OCULAS – Vendor Portal",
        description:
          "Built a smart vendor portal with automated PDF extraction and invoice/debit note generation — cutting manual work by 70% and processing time by 50%.<br><br>Implemented a centralized document management system with automated workflows handling 10,000+ documents per year, improving accuracy by 60%. Suppliers upload PDFs for automated data extraction, validation, and record-keeping across the full stack.",
        type: "Enterprise Web Platform",
        technologies: "Next.js, Node.js, PostgreSQL, PDF Automation",
        platform: "Web",
      },
    },
    {
      thumbUrl: "/images/cortex-demo.png",
      title: "Cortex",
      subTitle: "AI-Powered ERP System",
      collageSize: "featured",
      details: {
        title: "Cortex – AI-Powered ERP System",
        description:
          "Led full-stack frontend and backend contributions for an AI-powered ERP platform managing 50,000+ row grids with real-time updates across 8 interconnected modules.<br><br>Designed and implemented an AI-powered bulk PDF extraction pipeline for invoices and purchase orders using Gemini AI — eliminating manual data entry and reducing processing time by 70%. Engineered AG Grid solutions with WebSocket synchronization for zero UI lag and fresh data across frontend and backend.",
        type: "AI-Powered ERP",
        technologies:
          "React.js, Nest.js, PostgreSQL, WebSockets, Gemini AI, AG Grid",
        platform: "Web",
      },
    },
    {
      thumbUrl: "/images/taskify.png",
      title: "Taskify",
      subTitle: "Multi-Tenant SaaS Platform",
      collageSize: "medium",
      details: {
        title: "Taskify – Multi-Tenant SaaS Project Management",
        description:
          "Built a full-stack multi-tenant SaaS platform with secure JWT authentication (refresh rotation, HttpOnly cookies) and 3-tier RBAC, ensuring zero cross-tenant data leaks.<br><br>Engineered a real-time task management system with Socket.io, 5-state machine logic, and immutable deadline enforcement. Integrated Gemini AI for automated report generation with sub-3-second response times.",
        type: "Multi-Tenant SaaS",
        technologies:
          "React.js, Express.js, Socket.io, JWT, PostgreSQL, Gemini AI",
        platform: "Web",
      },
    },
    {
      thumbUrl: "/images/hotel-booking.png",
      title: "Seasons Heritage",
      subTitle: "Hotel Booking Platform",
      collageSize: "small",
      details: {
        title: "Seasons Heritage – Hotel Booking Platform",
        description:
          "Built a full-stack hotel booking platform with React and Node.js — delivering a responsive booking flow, real-time room availability, and a REST API backend for reservations and inventory management.<br><br>Designed an intuitive user experience with optimized components for fast rendering, smooth navigation, and a clean interface that simplifies the end-to-end booking process for travelers.",
        type: "Web Application",
        technologies: "React, Node.js, Tailwind CSS, REST APIs",
        platform: "Web",
      },
    },
    {
      thumbUrl: "/images/gioia.png",
      title: "Gioia Bakers",
      subTitle: "E-commerce Bakery Website",
      collageSize: "small",
      details: {
        title: "Gioia Bakers – E-commerce Bakery Website",
        description:
          "Developed a full-stack e-commerce platform using Next.js with server-side rendering, a custom ordering backend, and Tailwind CSS for a fast, SEO-friendly shopping experience.<br><br>Customers can explore baked goods, customize orders, and complete checkout seamlessly — with performance-optimized UI and a structured API layer powering product catalog and order management.",
        type: "E-commerce Website",
        technologies: "Next.js, Node.js, TypeScript, Tailwind CSS",
        platform: "Web",
      },
    },
    {
      thumbUrl: "/images/car-rental.png",
      modalImages: ["/images/car-rental.png", "/images/car-rental2.png"],
      title: "MiCar",
      subTitle: "Car Rental App",
      collageSize: "portrait",
      details: {
        title: "MiCar – Car Rental App",
        description:
          "Developed a cross-platform car rental app using React Native and Node.js — delivering a seamless rental experience on iOS and Android with RESTful APIs for user management, vehicle inventory, reservations, and secure payments.<br><br>Built real-time availability checks, booking history, push notifications, and admin dashboards for fleet management, booking approvals, and performance tracking across the full mobile stack.",
        type: "Mobile Application",
        technologies: "React Native, TypeScript, Node.js, REST APIs",
        platform: "Android & iOS",
      },
    },
  ] satisfies ProjectItem[],
};

export const services = {
  sectionHeading: {
    miniTitle: "SERVICES",
    title: "<span>services</span> I am providing",
  },
  allService: [
    {
      imgUrl: "/images/service-02.jpg",
      title: "Full-Stack Development",
      subTitle:
        "Build end-to-end web apps with MERN and PERN stacks — React.js/Next.js frontends, Node.js/Nest.js APIs, PostgreSQL, and production-ready architecture for scalable ERP and SaaS products.",
      icon: "bi:layers-fill",
      ratings: 5,
    },
    {
      imgUrl: "/images/service-05.jpg",
      title: "Mobile App Development",
      subTitle:
        "Ship cross-platform iOS and Android apps with React Native. Polished UI, secure API integration, real-time sync, and Node.js backends — from booking apps to full-featured mobile products.",
      icon: "bi:phone",
      ratings: 4.5,
    },
    {
      imgUrl: "/images/service-01.jpg",
      title: "ERP & Enterprise Systems",
      subTitle:
        "Architect modular ERP platforms with AG Grid interfaces, legacy system migration, reusable component libraries, and multi-module workflows built for maintainability and scale.",
      icon: "bi:diagram-3-fill",
      ratings: 4.5,
    },
    {
      imgUrl: "/images/service-04.jpg",
      title: "AI Integration & Automation",
      subTitle:
        "Integrate Gemini AI and automated PDF pipelines into production systems. AI-powered ERP modules and intelligent reporting that reduce manual work and accelerate delivery.",
      icon: "bi:cpu",
      ratings: 4,
    },
  ],
};

export type SkillItem = {
  name: string;
  icon: string;
};

export type SkillCategory = {
  title: string;
  items: SkillItem[];
};

export const skills = {
  sectionHeading: {
    miniTitle: "Skills",
    title: "Technical <span>Skillset</span>",
  },
  categories: [
    {
      title: "Frontend",
      items: [
        { name: "React.js", icon: "logos:react" },
        { name: "Next.js", icon: "logos:nextjs-icon" },
        { name: "React Native", icon: "logos:react" },
        { name: "TypeScript", icon: "logos:typescript-icon" },
        { name: "JavaScript", icon: "logos:javascript" },
        { name: "Redux", icon: "logos:redux" },
        { name: "Zustand", icon: "devicon:zustand" },
        { name: "AG Grid", icon: "carbon:data-table" },
      ],
    },
    {
      title: "Backend",
      items: [
        { name: "Node.js", icon: "logos:nodejs-icon" },
        { name: "Express.js", icon: "simple-icons:express" },
        { name: "Nest.js", icon: "logos:nestjs" },
        { name: "Prisma ORM", icon: "skill-icons:prisma" },
        { name: "REST APIs", icon: "carbon:api" },
        { name: "WebSockets", icon: "mdi:web-sync" },
        { name: "Socket.io", icon: "logos:socket-io" },
        { name: "JWT Auth", icon: "mdi:shield-key-outline" },
      ],
    },
    {
      title: "Database & AI",
      items: [
        { name: "PostgreSQL", icon: "logos:postgresql" },
        { name: "MongoDB", icon: "logos:mongodb-icon" },
        { name: "MySQL", icon: "logos:mysql-icon" },
        { name: "Gemini AI", icon: "simple-icons:googlegemini" },
        { name: "PDF Extraction", icon: "mdi:file-pdf-box" },
        { name: "Automation", icon: "mdi:robot-outline" },
        { name: "AI ERP Modules", icon: "mdi:brain" },
      ],
    },
    {
      title: "DevOps & Tools",
      items: [
        { name: "Docker", icon: "logos:docker-icon" },
        { name: "Redis", icon: "logos:redis" },
        { name: "CI/CD", icon: "mdi:pipe" },
        { name: "Git", icon: "logos:git-icon" },
        { name: "GitHub", icon: "mdi:github" },
        { name: "Code Reviews", icon: "mdi:code-braces-box" },
        { name: "Performance", icon: "mdi:speedometer" },
      ],
    },
  ] satisfies SkillCategory[],
};

export const experience = {
  sectionHeading: {
    miniTitle: "Experience",
    title: "My Work <span>Experience</span>",
  },
  allExperience: [
    {
      designation: "Software Engineer",
      company: "Interactive Technologies Gateway",
      duration: "MAY 2023 - PRESENT",
      jobType: "Full time",
      companyTitle: "My Role & Responsibilities",
      companyDescription:
        "Lead full-stack development for 7+ enterprise ERP systems using React/Next.js, Node.js/Nest.js, and PostgreSQL — from API design and real-time WebSocket features to production deployments.<br><br>Migrated legacy systems to modern architecture, built reusable reporting and component libraries, and delivered AG Grid interfaces with Docker and CI/CD pipelines.",
    },
    {
      designation: "Full Stack Developer",
      company: "Upwork | REMOTE",
      duration: "MAR 2023 - PRESENT",
      jobType: "Part time",
      companyTitle: "My Role & Responsibilities",
      companyDescription:
        "Built full-stack freelance projects with React.js, Next.js, and Node.js — responsive web apps, REST APIs, and client features from requirements through deployment.<br><br>Work closely with clients on scope, performance, and maintainable production-ready solutions.",
    },
  ],
};

export const contact = {
  sectionHeading: {
    title: "Let's Discuss Your Project",
    subTitle:
      "Open to full-stack roles and freelance projects. Feel free to reach out — I typically respond within 24 hours.",
  },
  contactImg: "/images/hammad.png",
  contactInfo: [{ title: "Write an e-mail", email: "ch.hammad2914@gmail.com" }],
};
