/** Career start — used to derive years of experience so it never goes stale. */
const CAREER_START = new Date("2023-05-01T00:00:00Z");

export const yearsOfExperience = Math.floor(
  (Date.now() - CAREER_START.getTime()) / (365.25 * 24 * 60 * 60 * 1000),
);

export const siteUrl = "https://hammad-ali-dev.vercel.app";

export const site = {
  title: "Hammad Ali | Full Stack Software Engineer",
  description:
    "Full Stack Software Engineer in Karachi, Pakistan building scalable ERP, SaaS, and supply-chain systems with React.js, Next.js, NestJS, .NET Core, and PostgreSQL.",
  author: "Hammad Ali",
  location: "Karachi, Pakistan",
  availability: "Open to full-time and freelance work",
};

export const hero = {
  name: "Hammad Ali",
  heading: "Hi, I'm Hammad",
  // Each of these lands under `heading` ("Hi, I'm Hammad"), so every phrase has
  // to read as a person — a title, or what he's doing. A bare product noun
  // ("Real-time ERP") reads as if he were the software.
  // Verified to wrap to at most two lines from 375 to 1920; note that the full
  // "Full Stack Software Engineer" takes three at almost every width, which is
  // why the title is abbreviated here and left intact in `description`.
  typingText: [
    "Full Stack Engineer",
    1500,
    "Building ERP Systems",
    1500,
    "Shipping SaaS Products",
    1500,
  ] as (string | number)[],
  focus: "ERP · SaaS · Supply-chain systems",
  description: `Results-driven Full Stack Software Engineer with ${yearsOfExperience}+ years of experience designing and delivering enterprise-grade ERP, SaaS, and supply-chain systems. I lead end-to-end development — frontend architecture, backend APIs, real-time data, AI integrations, and production deployments.`,
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

export type ProjectLink = {
  label: string;
  url: string;
  /** Iconify name; defaults to the GitHub mark. */
  icon?: string;
};

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
  /** No public source. Defaults to the client-NDA wording. */
  confidential?: boolean;
  /** Overrides the default NDA wording when the reason isn't a client NDA. */
  privacyNote?: string;
  /** Set while the project is still being built, so impact reads as expected, not delivered. */
  inProgress?: boolean;
  /** Public source, when it exists. */
  links?: ProjectLink[];
  /** Live product URL — a working SaaS beats a repo as proof. */
  liveUrl?: string;
  details: ProjectDetails;
};

const allProjects: ProjectItem[] = [
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
      technologies: "React.js, Node.js, WebSockets, PDF Generation, PostgreSQL",
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
        "Led full-stack development across 8 modules with complex admin panels and permission flows. Built a bulk PDF extraction pipeline on OpenAI with a per-client template covering 8–12 document formats, feeding a review step before anything is committed, plus AG Grid interfaces over 50,000+ row datasets with live WebSocket synchronization.",
      decisions:
        "This started on Azure Document Intelligence and moved off it — training custom models per document type did not reach accuracy we could rely on. OpenAI with a template per client beat a single generalized prompt, because any one client's layout is stable even though layouts vary widely between clients; a per-client template encodes that structure instead of asking the model to rediscover it every time. Extraction is still imperfect, so the pipeline is designed around correction rather than trust: extracted values are surfaced for a person to fix before they are committed, which keeps a wrong read from silently becoming a wrong record. AG Grid's server-side row model over a custom table, because at 50k rows the work is virtualization and that is a solved problem. WebSockets because 8 modules share state — a purchase order updated in one module has to be correct everywhere without a refresh.",
      impact: [
        "Removed the long manual entry form merchants previously filled in for every document — around 70% less processing time",
        "Invoice and purchase-order data now extracted then reviewed, instead of keyed in from scratch",
        "Zero UI lag on 50,000+ row grids with live data consistency",
      ],
      type: "AI-Powered ERP",
      technologies: "React.js, NestJS, PostgreSQL, WebSockets, OpenAI, AG Grid",
      platform: "Web",
    },
  },
  {
    thumbUrl: "/images/okulium.png",
    title: "Okulium",
    subTitle: "School Management SaaS",
    collageSize: "featured",
    confidential: true,
    privacyNote:
      "Commercial SaaS — the source is private, but the product is live.",
    liveUrl: "https://skolar-landing.vercel.app",
    links: [
      {
        label: "Open the app",
        url: "https://skolar-web-app.vercel.app",
        icon: "mdi:login-variant",
      },
    ],
    details: {
      title: "Okulium – School Management SaaS",
      challenge:
        "Pakistani schools run attendance registers, exam results, and fee ledgers on paper and spreadsheets. Multi-branch school groups have the same problem multiplied — no shared view across branches, and no reliable record of who changed a mark or an attendance entry after the fact.",
      approach:
        "Multi-tenant school platform covering attendance, exams and results, fees and payments, students, parents, staff, timetabling, announcements and reporting. Built as a Turborepo monorepo: a NestJS API, a React PWA dashboard, a separate landing site, and shared type and UI packages. Built with one other engineer, split roughly half the system each.",
      decisions:
        "Tenancy is a school group containing branches, so records scope to a branch while a group administrator can still see across them. Attendance changes are written to a separate edit-history table rather than overwriting the record, so a corrected register keeps who changed what and when. Result disputes are their own model with their own states rather than an in-place mark correction, which keeps a challenged grade reviewable. The dashboard ships as an installable PWA with its own service worker and manifest.",
      impact: [
        "Deployed and live — landing site and web app both public",
        "Attendance, exams and results, fees, timetabling and reporting in one system",
        "Attendance edits and result disputes each keep a reviewable trail",
      ],
      type: "Multi-Tenant SaaS",
      technologies: "React, Vite, NestJS, Prisma, PostgreSQL, Turborepo, PWA",
      platform: "Web (installable PWA)",
    },
  },
  {
    thumbUrl: "/images/lia.png",
    title: "Law in Action",
    subTitle: "Global Regulations Platform",
    collageSize: "featured",
    confidential: true,
    privacyNote:
      "Client product — the source is private, but the platform is public.",
    liveUrl: "https://lawintoaction.com",
    details: {
      title: "Law in Action – Global Regulations Platform",
      challenge:
        "A business has no single place to find out which regulations actually apply to it, what the penalties are, and what to do next. That knowledge is scattered across government sites, trade bodies and consultants, in several languages, and it changes constantly — so most companies find out they are non-compliant late and expensively.",
      approach:
        "A centralized regulations platform businesses subscribe to. Members see the regulations that apply to them, the penalties attached, and recommended next steps, with consultation and an AI agent alongside. Regulation tracking with source documents, HS code classification over the full UN Comtrade dataset, German/English translation, weekly newsletters, and a metered external API so businesses can pull the regulation data straight into their own ERPs.",
      decisions:
        "Translation sits behind a provider abstraction over DeepL, Azure, Google and MyMemory with automatic fallback, so one provider's quota or outage doesn't stall compliance work. The ~10,300-entry UN Comtrade HS classification is fetched once at startup and held in memory rather than queried per request — it's a reference set that changes rarely, so the round trip buys nothing. External API access is keyed per organization with usage metered, because the data itself is a product businesses license into their own systems, and that has to be rate-limited and billed separately from the app.",
      impact: [
        "Live subscription platform — businesses sign up and see the regulations that apply to them",
        "Weekly compliance newsletters, AI-drafted and consultant-reviewed before publishing — the AI pipeline was another developer's work",
        "Regulation data licensed through a metered API for businesses to pull into their own ERP systems",
      ],
      type: "Regulatory Intelligence SaaS",
      technologies:
        "React, Express, Prisma, PostgreSQL, DeepL/Azure Translate, React PDF",
      platform: "Web",
    },
  },
  {
    thumbUrl: "/images/vp.png",
    title: "Vendor Portal",
    subTitle: "B2B Supply Chain Management",
    collageSize: "featured",
    confidential: true,
    details: {
      title: "Vendor Portal – Supplier Invoicing",
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
    thumbUrl: "/images/hotelkey.png",
    title: "HotelKey",
    subTitle: "Hotel & Guest Services App",
    collageSize: "featured",
    confidential: true,
    privacyNote: "Client demo build — the source is not public.",
    details: {
      title: "HotelKey – Hotel & Guest Services App",
      challenge:
        "A client wanted to see a guest-services app before committing to building one: hotels, reservations and the services around a stay, all in one place rather than scattered across separate booking sites.",
      approach:
        "A 30-screen React Native app for iOS and Android covering hotel browsing and detail pages, reservations with current and past booking history, and service categories around the stay — cars, activities, pharmacy and supermarkets. Full auth flow with email signup, login, forgot and change password, plus Google and Apple sign-in, and profile, settings and notification screens. Built as a client demo against sample data, and taken as far as a signed release build.",
      decisions:
        "Navigation is split across a bottom tab bar with nested stacks, so each service category keeps its own history and a guest can move between hotels and reservations without losing their place. Connectivity is checked explicitly with a dedicated offline screen rather than letting requests fail silently — the app is aimed at travellers, who are the users most likely to be on bad hotel wifi or roaming.",
      impact: [
        "30 screens covering the full guest journey, from signup to booking history",
        "Single React Native codebase targeting both iOS and Android",
        "Demo build only — it was never deployed to production",
      ],
      type: "Mobile Application",
      technologies:
        "React Native, React Navigation, Google & Apple Sign-In, Axios",
      platform: "Android & iOS",
    },
  },
];

export const projects = {
  sectionHeading: {
    miniTitle: "My Work",
    title: "SELECTED PROJECTS",
  },
  /** Shown under the section heading to pre-empt "where's the code?". */
  note: "Most of these are proprietary client systems, so the source isn't public. Each case study covers the problem, the architecture, and why I made the calls I did — and I'm happy to walk through the code on a call.",
  allProjects,
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
