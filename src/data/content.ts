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
  description: `I'm a Full Stack Software Engineer based in Karachi, Pakistan with ${yearsOfExperience}+ years delivering production ERP, SaaS, and supply-chain platforms for international clients. I work across React.js, Next.js, NestJS, .NET Core, Prisma, and PostgreSQL — from reusable frontend architecture and high-performance AG Grid interfaces to backend APIs, WebSocket synchronization, Docker deployments, and AI-powered document extraction.<br><br>Most of my work is proprietary client software, so the source code is private, and a few of my own projects are open source. I'm always happy to walk through the architecture and trade-offs on a call.`,
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
  /** What the project is and what it does. */
  overview: string;
  /** Outcomes. */
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
  /** The headline builds, shown large; everything else is a compact row. */
  featured?: boolean;
  /** One line on what the project is, shown on its card. */
  oneLiner?: string;
  /** Iconify names for the logos that float over the panel, as in the hero. */
  marks?: string[];
  /** No public source. Defaults to the client-NDA wording. */
  confidential?: boolean;
  /** Overrides the default NDA wording when the reason isn't a client NDA. */
  privacyNote?: string;
  /** Set while the project is still being built, so impact reads as expected, not delivered. */
  inProgress?: boolean;
  /** My own public project: listed in its own group, with no private-source note. */
  openSource?: boolean;
  /** Public source, when it exists. */
  links?: ProjectLink[];
  /** Live product URL — a working SaaS beats a repo as proof. */
  liveUrl?: string;
  details: ProjectDetails;
};

const allProjects: ProjectItem[] = [
  {
    thumbUrl: "/images/integra.png",
    title: "Integra",
    oneLiner:
      "Factory inspections from booking to signed report, with offline working, KPI dashboards and third-party lab reports.",
    subTitle: "Apparel Quality Inspection Platform",
    collageSize: "featured",
    confidential: true,
    details: {
      title: "Integra – Apparel Quality Inspection Platform",
      overview:
        "A quality management platform for apparel inspections, from booking and assigning inspectors through to the final report. It covers pre-production meetings, initial line and product checks, mid-production checks and final random inspections, along with measurements, a defects dictionary and pictorial reviews, with on-screen signatures from the factory and QA and automatic PDF reports. Inspectors can work with no network and send everything when the connection returns. It also has customer, supplier and internal KPI dashboards, storage for reports from outside labs such as SGS and Intertek, conveyance claims with approvals, and email notifications.",
      impact: [
        "Lets inspectors finish inspections on weak factory networks, with work sent automatically when the connection returns and no duplicate records",
        "Replaced typed-up reports with signed PDF reports generated automatically",
        "Saves inspections step by step, so work isn't lost halfway through",
        "Gives managers live quality KPIs by customer, supplier and inspector, instead of waiting for periodic reviews",
        "Keeps third-party lab reports in one place, instead of scattered across email",
        "Moved conveyance claims from paper to a tracked approval process",
      ],
      type: "Enterprise Web Platform",
      technologies: "React, Material UI, ApexCharts, React PDF",
      platform: "Web",
    },
  },
  {
    thumbUrl: "/images/cortex.png",
    title: "Cortex",
    featured: true,
    oneLiner:
      "One system for apparel orders, from booking and purchase order to shipment, invoicing and payment, with AI extraction of purchase orders, invoices and other business documents.",
    marks: ["logos:react", "logos:nestjs", "logos:postgresql"],
    subTitle: "AI-Powered Apparel Sourcing & Export ERP",
    collageSize: "featured",
    confidential: true,
    details: {
      title: "Cortex – AI-Powered Apparel Sourcing & Export ERP",
      overview:
        "An ERP for apparel sourcing and export, where I worked as a full-stack developer. It takes an order from booking and purchase order through time-and-action planning, sales contract approvals, shipment and payment documents (LC, DA, DP, TT), along with claims. Its vendor portal adds a document hub organised by customer and folder, commercial invoice and packing list creation in different formats, debit notes, and vendor onboarding. Staff and vendors use one login, and each role sees its own portal. It also includes AI extraction for bulk document uploads with a review step before saving, around 35 business reports, and an AI assistant that answers questions in plain English with tables and charts.",
      impact: [
        "Replaced manual entry of purchase orders with bulk AI extraction from PDF and Excel files, cutting processing time by around 70%",
        "Improved overall order processing time by at least 40%",
        "Catches extraction errors in review, before they become wrong records",
        "Gave vendors one login and a single hub for documents, invoices, packing lists and debit notes, in place of scattered files",
        "Handles 50,000+ row grids with no UI lag, with dashboards updating live over WebSockets",
        "Lets staff get answers and reports from business data by asking in plain English",
      ],
      type: "AI-Powered ERP",
      technologies: "React.js, NestJS, PostgreSQL, WebSockets, OpenAI, AG Grid",
      platform: "Web",
    },
  },
  {
    thumbUrl: "/images/okulium.png",
    title: "Okulium",
    featured: true,
    oneLiner:
      "One platform for running a school: attendance, exams, fees, payroll and a parent app, with AI built in.",
    marks: ["logos:react", "logos:nestjs", "logos:prisma"],
    subTitle: "AI-Powered School Management SaaS",
    collageSize: "featured",
    confidential: true,
    privacyNote:
      "Commercial SaaS — the source is private, but the product is live.",
    liveUrl: "https://okulium.pk",
    details: {
      title: "Okulium – AI-Powered School Management SaaS",
      overview:
        "A multi-tenant school management SaaS built for Pakistan, serving single schools and multi-branch groups, where I was lead developer in a team of 4. It covers QR attendance, a digital class diary, exams and report cards, fee collection with bank challans, timetables, announcements, student ID cards, and staff HR with leave, salaries and payslips. Parents sign in with their mobile number to see only their own children, through an app that installs from the browser. Staff can ask questions about their school in plain words, and AI helps import existing student and staff records.",
      impact: [
        "Replaces paper registers and spreadsheets with one set of records for the office, teachers, owner and parents",
        "Gives multi-branch school groups a single view across every branch",
        "Turns mark entry into finished report cards automatically",
        "Feeds staff attendance and leave directly into monthly payroll and payslips",
        "Keeps parents informed automatically, with no app store download",
        "Records who changed an attendance entry and when, and handles result disputes with a reviewable trail",
      ],
      type: "Multi-Tenant SaaS",
      technologies: "React, NestJS, Prisma, PostgreSQL, Turborepo, PWA, Gemini",
      platform: "Web (installable PWA)",
    },
  },
  {
    thumbUrl: "/images/vista.png",
    title: "Vista",
    oneLiner:
      "A 3D smog map of Lahore built on real sensor readings, with AQI by area, forecasts, health advice and phone alerts.",
    marks: ["logos:nextjs-icon", "logos:postgresql", "logos:github-actions"],
    subTitle: "3D Air Quality Map for Lahore",
    collageSize: "featured",
    confidential: true,
    privacyNote: "My own project. The source is private for now, but the site is public.",
    liveUrl: "https://vista-air.vercel.app",
    details: {
      title: "Vista – 3D Air Quality Map for Lahore",
      overview:
        "A public air quality app for Lahore. Through the day it collects readings from about 50 low-cost sensors and the government's monitors, removes readings it can't trust, and estimates the air between sensors. The result is drawn as 3D smog over satellite photos of the city, with the AQI for Lahore or any of its 19 areas, a timeline that goes back 7 days and forward into the forecast, and health advice in English and Urdu.",
      impact: [
        "Turns scattered sensor networks into one clear AQI for the city or your own area, instead of a single citywide figure",
        "Alerts people by phone when their area's air turns unhealthy, so they don't have to keep checking; tested end to end on Android",
        "Roughly halved forecast errors 1 to 12 hours ahead in a backtest, by correcting a broad city-wide forecast with real readings",
        "Shows when the air is usually cleanest, based on the last 7 days of readings, so people can plan time outdoors",
        "Shows how many sensors are behind each number and how old the readings are, so people know how far to trust it",
        "City PM2.5 tracked Punjab EPA's readings closely over 156 hours (r = 0.98), reading about 15% lower",
      ],
      type: "Public Web App",
      technologies: "Next.js, WebGL, MapLibre, Neon, Drizzle, GitHub Actions, Web Push",
      platform: "Web",
    },
  },
  {
    thumbUrl: "/images/lawintoaction.png",
    title: "Law into Action",
    oneLiner:
      "A subscription platform showing businesses which regulations apply to them, what they require and what to do next.",
    subTitle: "Global Regulations Compliance Platform",
    collageSize: "featured",
    confidential: true,
    privacyNote:
      "Client product — the source is private, but the platform is public.",
    liveUrl: "https://lawintoaction.com",
    details: {
      title: "Law into Action – Global Regulations Compliance Platform",
      overview:
        "A subscription platform that helps companies understand the regulations affecting their business, built full stack including its AI features. A four-step check asks about location, product type, business role and company size, then lists the laws that apply. Each regulation sets out its obligations, thresholds, key dates, penalties, exemptions and source documents, in English and German. The platform also includes an HS code lookup covering the full UN Comtrade classification, a CBAM carbon cost calculator, an AI assistant, expert consultations, and weekly newsletters with PDF editions branded for partner associations. Companies subscribe through Stripe plans, and an API connects regulation data to other systems.",
      impact: [
        "Gives businesses one place for regulations that were scattered across government sites, trade bodies and consultants",
        "Shows a company which laws apply to it in four steps, instead of it having to work that out law by law",
        "Sets out obligations, key dates and penalties for each law, so companies can find compliance gaps before deadlines",
        "Lets companies look up HS codes and estimate CBAM carbon costs in the same place as the regulations",
        "Lets businesses pull regulation data into their own systems through an API, with each client's access and fields controlled by key",
        "Controls AI costs with a token allowance on each plan, so heavy use can't run up an open-ended bill",
        "Keeps members up to date with weekly newsletters, drafted by AI and reviewed before publishing, with source links checked automatically",
      ],
      type: "Regulatory Intelligence SaaS",
      technologies: "React, TypeScript, Tailwind CSS, Express, Prisma, PostgreSQL, Stripe, DeepL, React PDF",
      platform: "Web",
    },
  },
  {
    thumbUrl: "/images/inked.png",
    title: "Inked",
    openSource: true,
    oneLiner:
      "A project planner where a task's dates lock once the person doing the work agrees to them.",
    subTitle: "Project Planner with Locked Deadlines",
    collageSize: "featured",
    liveUrl: "https://inked-seven.vercel.app",
    links: [{ label: "View the code", url: "https://github.com/hammad2914/Inked" }],
    details: {
      title: "Inked – Project Planner with Locked Deadlines",
      overview:
        "A multi-company project planner built around agreed deadlines. A manager proposes a task's start date and deadline, and the assignee either agrees, which locks the dates, or requests a change. It includes company, project and member roles, email invitations, employee import from an HR system, a planner view across all projects, live notifications, an activity log, automatic overdue tracking, and AI-written project reports with PDF export. A one-click demo company lets anyone try it without signing up.",
      impact: [
        "Stops deadlines being moved quietly: once agreed, dates are locked on the server, even for admins",
        "Means people commit to their own dates, instead of having deadlines handed down without their input",
        "Ends \"who said what\" arguments, because every change is recorded in an activity log",
        "Saves managers writing status reports by hand, with AI-written reports and PDF export, and a plain template if AI isn't available",
        "Marks late tasks automatically, so nobody has to chase them by hand",
        "Saves setting up a team one person at a time, by inviting everyone from the company's HR employee list",
      ],
      type: "Full-Stack Web App",
      technologies: "React, TypeScript, Tailwind CSS, Express, Prisma, PostgreSQL, Socket.io, Gemini, Puppeteer",
      platform: "Web",
    },
  },
  {
    thumbUrl: "/images/wayn.png",
    title: "Wayn",
    openSource: true,
    oneLiner:
      "Turns free-text Arabic and English delivery addresses into map locations and shorter routes.",
    subTitle: "Last-Mile Dispatch for the Gulf",
    collageSize: "featured",
    liveUrl: "https://wayn-app.vercel.app",
    links: [{ label: "View the code", url: "https://github.com/hammad2914/wayn" }],
    details: {
      title: "Wayn – Last-Mile Dispatch for the Gulf",
      overview:
        "An address cleaning and route planning app for last-mile delivery in the Gulf. It reads free-text Arabic and English addresses, places them on the map, assigns stops to vans and orders each route. Drivers get their own page showing the clean address beside the customer's original words. Locations are approximate, and each one is labelled by how precise it is.",
      impact: [
        "Cut one real Riyadh day from 207 km to 117 km with one van, saving 73 minutes against driving in arrival order",
        "Placed 11 of 12 messy addresses on the map and flagged the unclear one for a customer pin",
        "Solves district names that map search misses: 1,633 districts across 12 Gulf cities, in Arabic and English",
        "Helps drivers find the door by showing the clean address beside the customer's own words",
      ],
      type: "Full-Stack Web App",
      technologies: "React, Vite, Express, Prisma, PostgreSQL, OSRM, Nominatim",
      platform: "Web",
    },
  },
  {
    thumbUrl: "/images/saraya.png",
    title: "Saraya",
    openSource: true,
    oneLiner:
      "A luxury Dubai real-estate concept with an interactive map, calculators and a property marketplace.",
    subTitle: "Real-Estate Design Concept",
    collageSize: "featured",
    liveUrl: "https://saraya-lac.vercel.app",
    links: [{ label: "View the code", url: "https://github.com/hammad2914/saraya" }],
    details: {
      title: "Saraya – Real-Estate Design Concept",
      overview:
        "A front-end design concept, not a client project. It takes a buyer from a scroll-driven view of Dubai through to booking a viewing, with a live price map, an area finder ranked by commute, a buying-cost calculator, a sale estimate from comparable listings, and a filterable marketplace with a page for each home. Listings, agents and prices are examples. The opening sequence is modelled on the LUXHABITAT site and rebuilt in my own code; photos are from Unsplash and the hero view was generated with Gemini.",
      impact: [
        "Replaces brochure text with working tools: a price map, an area finder and a buying-cost calculator",
        "Lets a buyer compare areas and costs and book a viewing in one place",
        "Makes any property search shareable by link, on desktop and phone",
      ],
      type: "Front-End Design Concept",
      technologies: "Next.js, React, TypeScript, Tailwind CSS, GSAP, MapLibre",
      platform: "Web",
    },
  },
];

export const projects = {
  sectionHeading: {
    miniTitle: "My Work",
    title: "Selected <span>projects</span>",
  },
  /** Shown under the section heading to pre-empt "where's the code?". */
  note: "Most of this work is client software, so the source code is private.",
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
        { name: ".NET Core Web API", icon: "logos:dotnet" },
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
        "Ship full-stack features across 7+ enterprise systems for international clients in supply-chain and quality inspection, working from React/Next.js frontends through to Node.js/NestJS backend APIs.<br><br>Design scalable backend APIs with NestJS and Prisma ORM — authentication, RBAC, and multi-module business logic. Migrated 3 legacy VB.NET systems to React + Node.js + PostgreSQL, cutting UI load times by 40%. Built Excel Genie, a reporting engine reused across 10+ modules, and reusable React component libraries and NestJS service patterns that cut per-module development time by 30%. Independently ship production endpoints and Docker-based services through CI/CD.",
    },
    {
      designation: "Full Stack Developer",
      company: "Consulting Service International Ltd",
      duration: "JUN 2025 – FEB 2026",
      jobType: "Remote",
      companyTitle: "My Role & Responsibilities",
      companyDescription:
        "Built client websites and web portals in React.js and Next.js, working remotely from requirements through to deployment.<br><br>Delivered Law into Action, a live subscription platform where member businesses see the regulations that apply to them, with HS-code classification across the UN Comtrade dataset and an API clients pull into their own systems.",
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
      duration: "OCT 2021 – OCT 2025",
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
