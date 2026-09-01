/** Career start — used to derive years of experience so it never goes stale. */
const CAREER_START = new Date("2023-05-01T00:00:00Z");

export const yearsOfExperience = Math.floor(
  (Date.now() - CAREER_START.getTime()) / (365.25 * 24 * 60 * 60 * 1000),
);

export const siteUrl = "https://hammad-shahid.vercel.app";

export const site = {
  title: "Hammad Ali | Full Stack Software Engineer",
  description:
    "Full Stack Software Engineer in Karachi, Pakistan building scalable ERP, SaaS, and supply-chain systems with React.js, Next.js, NestJS, .NET Core, and PostgreSQL.",
  author: "Hammad Ali",
  location: "Karachi, Pakistan",
  availability: "Open to full-time and freelance work",
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
    "React · NestJS · PostgreSQL",
    1500,
  ] as (string | number)[],
  description: `I build enterprise ERP, SaaS, and supply-chain systems end to end — frontend architecture, backend APIs, real-time data, and AI document pipelines. Over ${yearsOfExperience}+ years I've shipped 7+ production systems, migrated legacy VB.NET platforms to modern React and Node.js, and built grids that stay responsive at 50,000+ rows.`,
  location: site.location,
  availability: site.availability,
  btnText: "Get in touch",
  btnUrl: "contactus",
};

export const socialLinks = [
  {
    icon: "fa-brands:github",
    label: "GitHub",
    iconBgClass: "facebook",
    href: "https://github.com/hammad2914",
  },
  {
    icon: "fa-brands:linkedin-in",
    label: "LinkedIn",
    iconBgClass: "linkedin",
    href: "https://www.linkedin.com/in/hammad-ali-1a4631255",
  },
  {
    icon: "fa-file-pdf-o",
    label: "Download résumé (PDF)",
    iconBgClass: "pdf",
    href: "/resume/Hammad_Ali_Resume.pdf",
  },
];

export const about = {
  imgSrc: "/images/hammad.png",
  miniTitle: "About Me",
  title:
    "BUILDING <span>SCALABLE &</span><br /><span>EFFICIENT</span> FULL-STACK APPS",
  description: `I'm a Full Stack Software Engineer based in Karachi, Pakistan with ${yearsOfExperience}+ years delivering production ERP, SaaS, and supply-chain platforms for international clients. I work across React.js, Next.js, NestJS, .NET Core, Prisma, and PostgreSQL — from reusable frontend architecture and high-performance AG Grid interfaces to backend APIs, WebSocket synchronization, Docker deployments, and AI-powered document extraction.<br><br>Most of my work is proprietary client software, so the detail lives in the case studies below rather than in public repos. I'm always happy to walk through the architecture and trade-offs on a call.`,
  funfacts: [
    { title: "Production Systems", number: 7 },
    { title: "Years Experience", number: yearsOfExperience },
    { title: "Legacy Systems Migrated", number: 3 },
  ],
  btnText: "Get in touch",
  btnUrl: "contactus",
};

export type ProjectLink = { label: string; url: string };

export type ProjectDetails = {
  title: string;
  /** The problem the system had to solve. */
  challenge: string;
  /** What was actually built. */
  approach: string;
  /** Why these technical choices — the part that can't be faked. */
  decisions: string;
  /** Measurable outcomes. */
  impact: string[];
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
  /** Client work under NDA — no public source. */
  confidential?: boolean;
  /** Set while the project is still being built, so impact reads as expected, not delivered. */
  inProgress?: boolean;
  /** Public source, when it exists. */
  links?: ProjectLink[];
  details: ProjectDetails;
};

export const projects = {
  sectionHeading: {
    miniTitle: "My Work",
    title: "SELECTED PROJECTS",
  },
  /** Shown under the section heading to pre-empt "where's the code?". */
  note: "Most of these are proprietary client systems, so the source isn't public. Each case study covers the problem, the architecture, and why I made the calls I did — and I'm happy to walk through the code on a call.",
  allProjects: [
    {
      thumbUrl: "/images/qa-app.png",
      title: "Integra",
      subTitle: "Quality Inspection Platform",
      collageSize: "featured",
      confidential: true,
      details: {
        title: "Integra – Quality Inspection Platform",
        challenge:
          "QA teams ran inspections on paper. Reports were typed up after the fact, multi-stage sign-offs moved by email, and nobody had visibility into defect trends until the monthly review — by which point the escapes had already shipped.",
        approach:
          "Built 7 end-to-end inspection workflows with multi-stage approval chains, real-time WebSocket status updates, automated PDF report generation, and live KPI dashboards covering defect trends and team productivity.",
        decisions:
          "Approvals are modelled as an explicit state machine rather than a boolean flag per stage — inspections routinely bounce backwards on rejection, and a flag-based design can't represent that without ambiguity. Reports are generated server-side so the PDF is identical regardless of the inspector's device, which matters when the document is the audit record. WebSockets over polling because a supervisor watching the approval queue needs the state change immediately, not up to 30 seconds later.",
        impact: [
          "Inspection reports generated in seconds instead of being typed up manually",
          "Real-time visibility into defect trends and inspector productivity",
          "Measurable reduction in quality escapes reaching customers",
        ],
        type: "Enterprise Web Platform",
        technologies:
          "React.js, Node.js, WebSockets, PDF Generation, PostgreSQL",
        platform: "Web",
      },
    },
    {
      thumbUrl: "/images/cortex-demo.png",
      title: "Cortex",
      subTitle: "AI-Powered ERP System",
      collageSize: "featured",
      confidential: true,
      details: {
        title: "Cortex – AI-Powered ERP System",
        challenge:
          "An ERP spanning 8 interconnected modules where every invoice and purchase order was keyed in by hand from supplier PDFs — each client sending a different layout. Data entry was the bottleneck, and the grids were large enough that naive rendering locked up the browser.",
        approach:
          "Led full-stack development across 8 modules with complex admin panels and permission flows. Built an AI bulk PDF extraction pipeline on OpenAI handling 8–12 different client document formats, and AG Grid interfaces over 50,000+ row datasets with live WebSocket synchronization.",
        decisions:
          "TODO(hammad): why OpenAI over a document-specific extraction service, and how you handle varying layouts / low-confidence fields. AG Grid's server-side row model over a custom table: at 50k rows the work is virtualization, and that's a solved problem not worth rebuilding. WebSockets because 8 modules share state — a purchase order updated in one module has to be correct everywhere without a refresh.",
        impact: [
          "Document processing time reduced by 70%",
          "Manual data entry for invoices and purchase orders eliminated",
          "Zero UI lag on 50,000+ row grids with live data consistency",
        ],
        type: "AI-Powered ERP",
        technologies:
          "React.js, NestJS, PostgreSQL, WebSockets, OpenAI, AG Grid",
        platform: "Web",
      },
    },
    {
      thumbUrl: "/images/vp.png",
      title: "Oculas Vendor Portal",
      subTitle: "B2B Supply Chain Management",
      collageSize: "medium",
      confidential: true,
      details: {
        title: "OCULAS – Vendor Portal",
        challenge:
          "Suppliers submitted invoices and delivery documents as PDFs by email. Someone on the finance side re-keyed each one, reconciled it by hand, and filed it — roughly 10,000 documents a year, with transcription errors surfacing weeks later as payment disputes.",
        approach:
          "Built a vendor portal where suppliers upload documents directly, with automated PDF extraction, validation, and invoice/debit note generation on top of a centralized document management system.",
        decisions:
          "Extraction results go through a validation step before they're committed rather than being written straight to the ledger — automation that silently writes wrong financial records is worse than manual entry. Vendors upload to the portal instead of emailing, which turns an unstructured inbox into an auditable pipeline with a status each document can actually be in.",
        impact: [
          "Manual effort cut by 70% and processing time by 50%",
          "10,000+ documents per year handled through automated workflows",
          "Data accuracy improved by 60%",
        ],
        type: "Enterprise Web Platform",
        technologies: "Next.js, Node.js, PostgreSQL, PDF Automation",
        platform: "Web",
      },
    },
    {
      thumbUrl: "/images/qc-app.png",
      title: "PPWR Compliance",
      subTitle: "EU Packaging Regulation SaaS",
      collageSize: "medium",
      confidential: true,
      inProgress: true,
      details: {
        title: "PPWR – EU Packaging Compliance SaaS",
        challenge:
          "The EU Packaging and Packaging Waste Regulation requires manufacturers to evidence compliance across their packaging portfolio. Clients were tracking this in spreadsheets — no audit trail, no role separation, and no way to prove what was reported when.",
        approach:
          "Building a multi-client SaaS compliance platform with a multi-role admin structure and several compliance modules, on a .NET Core backend with SQL Server and a React frontend. Currently in active development.",
        decisions:
          "TODO(hammad): why .NET Core/SQL Server here rather than the Node stack you use elsewhere, and how tenant separation is enforced.",
        impact: [
          "Multi-client compliance tracking with per-role access control",
          "Replacing spreadsheet-based reporting with an auditable system of record",
        ],
        type: "Compliance SaaS",
        technologies: "React.js, .NET Core, .NET Web API, SQL Server",
        platform: "Web",
      },
    },
    {
      thumbUrl: "/images/taskify.png",
      title: "Taskify",
      subTitle: "Multi-Tenant SaaS Platform",
      collageSize: "medium",
      links: [
        {
          label: "Frontend",
          url: "https://github.com/hammad2914/Taskify-Frontend",
        },
        {
          label: "Backend",
          url: "https://github.com/hammad2914/Taskify-Backend",
        },
      ],
      details: {
        title: "Taskify – Multi-Tenant SaaS Project Management",
        challenge:
          "A multi-tenant project management tool where the hard requirement is that no tenant can ever see another's data — plus deadlines that stay honest, since a task system where people quietly move dates is just a to-do list.",
        approach:
          "Built the full stack: JWT authentication with refresh-token rotation and HttpOnly cookies, 3-tier RBAC, a real-time task system on Socket.io with 5-state workflow logic and immutable deadline enforcement, plus Gemini AI for automated report generation.",
        decisions:
          "Tenant scoping is enforced at the data-access layer rather than in each route handler — a per-route check is one forgotten line away from a cross-tenant leak. Refresh-token rotation with HttpOnly cookies over storing tokens in localStorage, which is readable by any injected script. Deadlines are immutable once set because the entire accountability value of the system collapses if they aren't.",
        impact: [
          "Zero cross-tenant data leakage under 3-tier RBAC",
          "Sub-3-second AI-generated project reports",
          "Real-time task state sync across all connected clients",
        ],
        type: "Multi-Tenant SaaS",
        technologies:
          "React.js, Express.js, Socket.io, JWT, PostgreSQL, Gemini AI",
        platform: "Web",
      },
    },
    {
      thumbUrl: "/images/car-rental.png",
      modalImages: ["/images/car-rental.png", "/images/car-rental2.png"],
      title: "MiCar",
      subTitle: "Car Rental App — UI",
      collageSize: "portrait",
      details: {
        title: "MiCar – Car Rental App (UI)",
        challenge:
          "A car rental concept that needed a complete mobile interface designed and built out — browse, booking flow, and account screens — before any backend work was scoped.",
        approach:
          "Built the full cross-platform mobile UI in React Native — vehicle browsing, booking flow, and account screens, laid out for both iOS and Android. Front-end only: this project has no backend, and the screens run against mocked data.",
        decisions:
          "TODO(hammad): why React Native for this, and anything notable about the screen/component structure.",
        impact: [
          "Complete booking-flow UI covering both iOS and Android from one codebase",
        ],
        type: "Mobile UI",
        technologies: "React Native, TypeScript",
        platform: "Android & iOS",
      },
    },
    {
      thumbUrl: "/images/hotel-booking.png",
      title: "Seasons Heritage",
      subTitle: "Hotel Booking Platform",
      collageSize: "small",
      links: [
        {
          label: "Source",
          url: "https://github.com/hammad2914/Seasons-Heritage",
        },
      ],
      details: {
        title: "Seasons Heritage – Hotel Booking Platform",
        challenge:
          "A heritage property needed direct bookings rather than paying commission on every reservation through third-party travel platforms.",
        approach:
          "Built a full-stack booking platform with a responsive booking flow, real-time room availability, and a REST API backend handling reservations and inventory.",
        decisions:
          "Availability is computed from the reservation table rather than stored as a counter — a counter drifts the moment a booking fails halfway through, and for inventory the derived value is the one you can trust.",
        impact: [
          "Direct booking flow removing third-party commission",
          "Real-time room availability across the booking journey",
        ],
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
      links: [
        { label: "Source", url: "https://github.com/hammad2914/Gioia-bakers" },
      ],
      details: {
        title: "Gioia Bakers – E-commerce Bakery Website",
        challenge:
          "A bakery taking custom cake orders through social media DMs, with no product catalogue and no structured way to capture order details.",
        approach:
          "Built an e-commerce platform on Next.js with server-side rendering, a custom ordering backend, and Tailwind CSS — product catalogue, order customization, and checkout.",
        decisions:
          "Server-side rendering because a bakery lives on local search: the product pages have to be crawlable and fast on mobile, which is where the traffic comes from. Order customization is modelled as structured options rather than a free-text note, so the kitchen gets an unambiguous ticket.",
        impact: [
          "DM-based ordering replaced with a structured catalogue and checkout",
          "SEO-friendly, performance-optimized product pages",
        ],
        type: "E-commerce Website",
        technologies: "Next.js, Node.js, TypeScript, Tailwind CSS",
        platform: "Web",
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
        "Build end-to-end web apps with MERN and PERN stacks — React.js/Next.js frontends, Node.js/NestJS APIs, PostgreSQL, and production-ready architecture for scalable ERP and SaaS products.",
      icon: "bi:layers-fill",
    },
    {
      imgUrl: "/images/service-05.jpg",
      title: "Mobile App Development",
      subTitle:
        "Ship cross-platform iOS and Android apps with React Native. Polished UI, secure API integration, real-time sync, and Node.js backends — from booking apps to full-featured mobile products.",
      icon: "bi:phone",
    },
    {
      imgUrl: "/images/service-01.jpg",
      title: "ERP & Enterprise Systems",
      subTitle:
        "Architect modular ERP platforms with AG Grid interfaces, legacy system migration, reusable component libraries, and multi-module workflows built for maintainability and scale.",
      icon: "bi:diagram-3-fill",
    },
    {
      imgUrl: "/images/service-04.jpg",
      title: "AI Integration & Automation",
      subTitle:
        "Integrate OpenAI and Gemini into production systems — bulk PDF extraction pipelines and automated reporting that removes manual data entry.",
      icon: "bi:cpu",
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
        { name: "JavaScript (ES6+)", icon: "logos:javascript" },
        { name: "Redux", icon: "logos:redux" },
        { name: "Zustand", icon: "devicon:zustand" },
        { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
        { name: "AG Grid", icon: "carbon:data-table" },
      ],
    },
    {
      title: "Backend",
      items: [
        { name: "Node.js", icon: "logos:nodejs-icon" },
        { name: "Express.js", icon: "simple-icons:express" },
        { name: "NestJS", icon: "logos:nestjs" },
        { name: ".NET Core", icon: "logos:dotnet" },
        { name: ".NET Web API", icon: "logos:dotnet" },
        { name: "Prisma ORM", icon: "skill-icons:prisma" },
        { name: "REST APIs", icon: "carbon:api" },
        { name: "WebSockets", icon: "mdi:web-sync" },
        { name: "Socket.io", icon: "logos:socket-io" },
        { name: "JWT Auth", icon: "mdi:shield-key-outline" },
      ],
    },
    {
      title: "Databases & AI",
      items: [
        { name: "PostgreSQL", icon: "logos:postgresql" },
        { name: "SQL Server", icon: "devicon:microsoftsqlserver" },
        { name: "MongoDB", icon: "logos:mongodb-icon" },
        { name: "OpenAI", icon: "simple-icons:openai" },
        { name: "Gemini", icon: "simple-icons:googlegemini" },
        { name: "Bulk PDF Extraction", icon: "mdi:file-pdf-box" },
        { name: "Automation Pipelines", icon: "mdi:robot-outline" },
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
        { name: "Performance Optimization", icon: "mdi:speedometer" },
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
      duration: "MAY 2023 – PRESENT",
      jobType: "Full time",
      companyTitle: "My Role & Responsibilities",
      companyDescription:
        "Ship full-stack features across 7+ enterprise ERP systems for international clients in supply-chain and quality inspection, working from React/Next.js frontends through to Node.js/NestJS backend APIs.<br><br>Design scalable backend APIs with NestJS and Prisma ORM — authentication, RBAC, and multi-module business logic. Migrated 3 legacy VB.NET systems to React + Node.js + PostgreSQL, cutting UI load times by 40%. Built Excel Genie, a reporting engine reused across 10+ modules, and reusable React component libraries and NestJS service patterns that cut per-module development time by 30%. Independently ship production endpoints and Docker-based services through CI/CD.",
    },
    {
      designation: "Full Stack Developer",
      company: "Freelance · Upwork",
      duration: "MAR 2023 – PRESENT",
      jobType: "Part time · Remote",
      companyTitle: "My Role & Responsibilities",
      companyDescription:
        "Deliver full-stack freelance projects with React.js, Next.js, and Node.js — responsive web apps, REST APIs, and client features from requirements through to deployment.<br><br>Work directly with clients on scope, performance, and maintainable production-ready solutions.",
    },
  ],
};

export const education = {
  sectionHeading: {
    miniTitle: "Education",
    title: "Education & <span>Certifications</span>",
  },
  items: [
    {
      title: "BS Software Engineering",
      institution: "Virtual University of Pakistan",
      duration: "OCT 2023 – OCT 2027",
      type: "Degree",
      icon: "mdi:school-outline",
    },
    {
      title: "MERN Stack Development",
      institution: "Jawan Pakistan",
      duration: "JAN – JUN 2023",
      type: "Certification",
      icon: "mdi:certificate-outline",
    },
    {
      title: "Frontend Development",
      institution: "Jawan Pakistan",
      duration: "JUN – DEC 2022",
      type: "Certification",
      icon: "mdi:certificate-outline",
    },
  ],
};

export const contact = {
  sectionHeading: {
    title: "Let's Discuss Your Project",
    subTitle:
      "Open to full-time roles and freelance projects, remote or Karachi-based. Most of my work is under NDA — happy to walk through the architecture and code on a call. I typically respond within 24 hours.",
  },
  contactImg: "/images/hammad.png",
  contactInfo: [
    { title: "Write an e-mail", email: "ch.hammad2914@gmail.com" },
    { title: "Based in", text: site.location },
    { title: "Availability", text: site.availability },
  ],
};
