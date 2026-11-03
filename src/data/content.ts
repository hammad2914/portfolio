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
  description: `I'm a Full Stack Software Engineer based in Karachi, Pakistan with ${yearsOfExperience}+ years delivering production ERP, SaaS, and supply-chain platforms for international clients. I work across React.js, Next.js, NestJS, .NET Core, Prisma, and PostgreSQL — from reusable frontend architecture and high-performance AG Grid interfaces to backend APIs, WebSocket synchronization, Docker deployments, and AI-powered document extraction.<br><br>Most of my work is proprietary client software, so the detail lives in the case studies below, and a few of my own projects are open source. I'm always happy to walk through the architecture and trade-offs on a call.`,
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
  /** The headline builds, shown large; everything else is a compact row. */
  featured?: boolean;
  /** The single decision worth knowing — carries the card on its own. */
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
    oneLiner: "Approvals modelled as a state machine, because inspections bounce backwards on rejection.",
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
    thumbUrl: "/images/cortex.png",
    title: "Cortex",
    featured: true,
    oneLiner:
      "Extraction goes to human review before commit, so a wrong read never becomes a wrong record.",
    marks: ["logos:react", "logos:nestjs", "logos:postgresql"],
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
    featured: true,
    oneLiner:
      "Attendance edits write to a history table instead of overwriting the register.",
    marks: ["logos:react", "logos:nestjs", "logos:prisma"],
    subTitle: "School Management SaaS",
    collageSize: "featured",
    confidential: true,
    privacyNote:
      "Commercial SaaS — the source is private, but the product is live.",
    liveUrl: "https://okulium.pk",
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
    thumbUrl: "/images/vista.png",
    title: "Vista",
    oneLiner:
      "Every air reading says how many sensors are behind it and how old they are.",
    marks: ["logos:nextjs-icon", "logos:postgresql", "logos:github-actions"],
    subTitle: "Lahore Smog Map",
    collageSize: "featured",
    confidential: true,
    privacyNote: "My own project. The source is private for now, but the site is public.",
    liveUrl: "https://vista-air.vercel.app",
    details: {
      title: "Vista – Lahore Smog Map",
      challenge:
        "Lahore's smog can change the right decision for a family within hours: whether to go outside, wear a mask or keep the windows shut. The readings exist, but they're scattered across sensor networks of mixed quality, and a single city number hides how much is known and how old it is.",
      approach:
        "A 3D map of Lahore with a smog layer I wrote in WebGL, drawn from real sensor readings collected through OpenAQ and WAQI. It shows the AQI for the city or your area, a forecast timeline, health advice in English and Urdu, the hours the air is usually cleanest, and phone alerts when your area turns dangerous.",
      decisions:
        "I tested my assumptions and changed course when they failed. A leave-one-out test showed that filling gaps between sensors barely beats the city median, so the map is presented as a guide, and each number shows its sensor count and age. GitHub's scheduled runs fired only about 5 of 20 times a day, so an external job now triggers the collector. A replay showed the forecast-based \"best time to go out\" lost to simply picking 2 to 4 pm, so that line now uses the last 7 days of real readings. Correcting the forecast with the last 6 hours of measurements roughly halved errors 1 to 12 hours ahead in a backtest.",
      impact: [
        "Over 156 hours, its city PM2.5 tracked Punjab EPA's closely (r = 0.98), reading about 15% lower",
        "Phone alerts for your area, tested end to end on Android",
        "Readings run 2 to 3 hours behind, and the site says so beside each number",
      ],
      type: "Public Web App",
      technologies: "Next.js, WebGL, MapLibre, Neon, Drizzle, GitHub Actions, Web Push",
      platform: "Web",
    },
  },
  {
    thumbUrl: "/images/lawintoaction.png",
    title: "Law in Action",
    oneLiner: "Translation fails over across four providers so compliance work never stalls.",
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
    thumbUrl: "/images/inked.png",
    title: "Inked",
    openSource: true,
    oneLiner: "Task dates stay in pencil until the assignee agrees. Then nobody can move them.",
    subTitle: "Project Planner",
    collageSize: "featured",
    liveUrl: "https://inked-seven.vercel.app",
    links: [{ label: "View the code", url: "https://github.com/hammad2914/Inked" }],
    details: {
      title: "Inked – Project Planner",
      challenge:
        "In most task tools, anyone with edit rights can quietly move a deadline. When work runs late, nobody can tell whether a date was ever agreed, and the conversation turns into who said what.",
      approach:
        "A multi-company project planner where a manager pencils in a task's dates and the assignee either agrees, which locks them, or asks for different ones. It covers roles, email invitations, a planner view across every project, live notifications, an activity log, and project reports written by Gemini with PDF export. The demo login rebuilds a fresh company each time.",
      decisions:
        "Agreed dates stay locked even for admins, and changing them takes a revision request, because a rule with an admin bypass wouldn't mean much. The web app reaches the API through a Vercel rewrite rather than directly, which keeps the refresh cookie first-party, so reloading the page doesn't sign you out. Chrome for report PDFs is installed inside the project folder, because Render reuses node_modules and doesn't carry the default browser cache over to the running server. Reports fall back to a plain template when no Gemini key is set.",
      impact: [
        "Live demo with one-click sign-in, so you can try it without an account",
        "Dates are proposed, agreed and locked, with every change recorded",
        "Open source, with setup and deployment notes in the README",
      ],
      type: "Full-Stack Web App",
      technologies: "React, Express, Prisma, PostgreSQL, Socket.io, Gemini, Puppeteer",
      platform: "Web",
    },
  },
  {
    thumbUrl: "/images/wayn.png",
    title: "Wayn",
    openSource: true,
    oneLiner: "Turns \"behind the mosque\" into a place on the map, then plans a shorter run.",
    subTitle: "Last-Mile Dispatch for the Gulf",
    collageSize: "featured",
    liveUrl: "https://wayn-app.vercel.app",
    links: [{ label: "View the code", url: "https://github.com/hammad2914/wayn" }],
    details: {
      title: "Wayn – Last-Mile Dispatch for the Gulf",
      challenge:
        "Delivery addresses in the Gulf often arrive as messages in Arabic or English that describe a landmark, not a street number. Drivers lose time finding the door, and vans get run in whatever order the orders came in.",
      approach:
        "An address cleaner and route planner with a dispatch dashboard. It reads messy Arabic and English addresses, places them on the map, splits the stops between vans and orders each run. Drivers get their own page showing the clean address beside the customer's original words.",
      decisions:
        "Built on free map services, Nominatim and OSRM, so it runs without a paid mapping bill. Their search misses many district names, so OSM districts for 12 Gulf cities are saved into the app and matched fuzzily, which handles spellings like Malqa and Malga. Stop order comes from sweep, nearest-neighbour and 2-opt, so it finds a good route without promising the mathematically shortest one. OSM's Arabic coverage is patchy, so results are approximate, and each one is labelled by how precise it is.",
      impact: [
        "On one real Riyadh day of 12 orders, with one van: 117 km, against 207 km in arrival order",
        "11 of those 12 messy addresses placed on the map",
        "1,633 saved districts across 12 Gulf cities, in Arabic and English",
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
    oneLiner: "A Dubai property site where every section is something you use, not something you read.",
    subTitle: "Real-Estate Design Concept",
    collageSize: "featured",
    liveUrl: "https://saraya-lac.vercel.app",
    links: [{ label: "View the code", url: "https://github.com/hammad2914/saraya" }],
    details: {
      title: "Saraya – Real-Estate Design Concept",
      challenge:
        "A concept, not a client project: could a luxury property site take a buyer from a first look at the city to booking a viewing using working tools rather than brochure text? The listings, agents and prices are examples, and nothing you submit is sent anywhere.",
      approach:
        "A scroll-driven opening through a window towards the Burj Khalifa, then a live map of Dubai's areas with price pins, an area finder ranked by commute, a buying-cost calculator, a sale estimate from comparable listings, viewing booking in the buyer's own time zone, and a filterable marketplace with a page for each home. There is no backend: all the maths runs in the browser.",
      decisions:
        "The opening sequence follows a video of the LUXHABITAT site, rebuilt in my own code with a redesigned room. The scroll animation was heavy on weak graphics cards, so the image effects are baked into the files, and the browser's compositing hint is only switched on while scrolling, because leaving it on made the headline blurry. Overlapping map pins merge into a single count so they don't pile up, and marketplace filters live in the URL so any search can be shared. Commute times are estimates, and the page says so.",
      impact: [
        "Full concept from opening animation to marketplace and home pages",
        "Works on desktop and phone, with a custom phone menu and filter sheets",
        "Photos from Unsplash, map tiles from OpenFreeMap, hero view generated with Gemini",
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
  note: "Mostly client systems, so the source stays private. The decisions behind them don't.",
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
        "Built client websites and web portals in React.js and Next.js, working remotely from requirements through to deployment.<br><br>Delivered Law in Action, a live subscription platform where member businesses see the regulations that apply to them, with HS-code classification across the UN Comtrade dataset and a metered API clients pull into their own ERP systems.",
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
