/**
 * Builds the resume from one copy of the content, so the words can't drift
 * between the PDF and the .docx.
 *
 * To rebuild public/resume/Hammad_Ali_Resume.pdf:
 *
 *   node scripts/build-resume.cjs .
 *   chrome --headless=new --no-pdf-header-footer
 *     --print-to-pdf=public/resume/Hammad_Ali_Resume.pdf
 *     file:///ABSOLUTE/PATH/resume.html
 *
 * The .docx version is built from the same content by build-resume-docx.cjs.
 *
 * Layout follows a classic single-column resume: small-caps name and section
 * headings, the summary straight under the contact line, and Experience and
 * Projects as separate sections rather than projects nested inside the job.
 * Nesting put four levels of hierarchy on one page, which is what made the
 * previous version read as crowded.
 *
 * ATS-safe on purpose: one column, real selectable text, standard section
 * headings, no tables, no icon fonts (icons are inline SVG, which adds no
 * text). Ligatures are off because a broken fi/fl mapping turns "workflows"
 * into "workows" in the extracted text.
 *
 * **double asterisks** mark bold; both renderers turn them into bold runs.
 */
const fs = require("fs");
const path = require("path");

const C = {
  name: "Hammad Ali",
  role: "Full Stack Software Engineer",
  contacts: [
    { icon: "pin", label: "Karachi, Pakistan" },
    { icon: "phone", label: "+92 349 187 2526", href: "tel:+923491872526" },
    { icon: "mail", label: "ch.hammad2914@gmail.com", href: "mailto:ch.hammad2914@gmail.com" },
    { icon: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/hammad-ali-1a4631255" },
    { icon: "github", label: "GitHub", href: "https://github.com/hammad2914" },
    { icon: "globe", label: "Portfolio", href: "https://hammad-ali-dev.vercel.app" },
  ],

  summary:
    "Full Stack Software Engineer with 3+ years of experience building enterprise ERP, SaaS and " +
    "supply-chain platforms. Proficient in **React**, **Next.js**, **TypeScript**, **Node.js** and " +
    "**NestJS**, with PostgreSQL and SQL Server on the backend. Delivered 7+ production systems end " +
    "to end, built an AI document extraction pipeline that cut processing time by 70%, and mentor " +
    "junior developers. Currently deepening agentic AI skills through a year-long program at SMIT.",

  roles: [
    {
      org: "Interactive Technologies Gateway",
      title: "Software Engineer",
      dates: "May 2023 - Present",
      bullets: [
        "Own end-to-end delivery across **7+ enterprise systems** for supply-chain and quality-inspection clients, from React/Next.js frontends to Node.js/NestJS APIs.",
        "Design backend APIs in NestJS and Prisma ORM covering authentication, role-based access control and multi-module business logic.",
        "Migrated **3 legacy VB.NET systems** to React, Node.js and PostgreSQL, cutting UI load times by **40%**.",
        "Built Excel Genie, a reporting engine reused across **10+ ERP modules** in place of per-module reporting code.",
        "Created reusable React component libraries and NestJS service patterns, cutting per-module development time by **30%**.",
        "Write unit and integration tests with Vitest, run code reviews, and ship Docker-based services through CI/CD.",
        "Mentor **4 junior developers** and own requirements analysis, estimation and planning with business stakeholders.",
      ],
    },
    {
      org: "Consulting Service International Ltd",
      title: "Full Stack Developer (Remote)",
      dates: "Jun 2025 - Feb 2026",
      bullets: [
        "Built client websites and web portals in React and Next.js, working remotely from requirements through to deployment.",
        "Delivered Law in Action, a live subscription regulations platform, across the full stack (see Projects).",
      ],
    },
  ],

  projects: [
    {
      name: "Cortex",
      sub: "AI-Powered ERP System",
      stack: "React, NestJS, PostgreSQL, WebSockets, OpenAI, AG Grid",
      bullets: [
        "Led full-stack delivery of an ERP across **8 interconnected modules** serving **100+ users** across 7+ permission roles.",
        "Built a bulk document extraction pipeline on the OpenAI API covering 8-12 client document formats, with human review before commit, cutting processing time by **~70%**.",
        "Engineered AG Grid interfaces over **50,000+ row datasets** with real-time WebSocket synchronization and no UI lag.",
      ],
    },
    {
      name: "Okulium",
      sub: "Multi-Tenant School Management SaaS",
      stack: "React, Vite, NestJS, Prisma, PostgreSQL, PWA",
      url: "okulium.pk",
      bullets: [
        "Shipped a live multi-tenant platform spanning **9 modules**: attendance, exams and results, fees and payments, students, parents, staff, timetabling, announcements and reporting.",
        "Modelled tenancy as school groups containing branches, so records scope to a branch while a group administrator still sees across all of them.",
        "Attendance edits and exam result disputes keep a full audit trail, so corrections stay reviewable instead of overwriting the record.",
        "Built the dashboard as an installable PWA with a separate public landing site alongside it.",
      ],
    },
    {
      name: "Integra",
      sub: "Quality Inspection Platform",
      stack: "React, Node.js, PostgreSQL, WebSockets, PDF Generation",
      bullets: [
        "Built **7 end-to-end inspection workflows** with multi-stage approvals, real-time status updates, automated PDF reports and live KPI dashboards.",
        "Modelled the full reporting hierarchy for **50+ inspectors** through their managers and department head, including finance sign-off on conveyance claims.",
      ],
    },
    {
      name: "Vendor Portal",
      sub: "Supplier Invoicing",
      stack: "React, .NET Core Web API, SQL Server",
      bullets: [
        "Replaced emailed supplier PDFs with direct uploads, automated extraction and validation before commit: **10,000+ documents a year** and **70% less manual effort**.",
        "Automated the path from extraction through to logistics invoice and debit note generation, with human verification before any document is issued.",
      ],
    },
    {
      name: "Law in Action",
      sub: "Global Regulations Platform",
      stack: "React, Express, Prisma, PostgreSQL",
      url: "lawintoaction.com",
      bullets: [
        "Built a live subscription platform where member businesses see the regulations that apply to them, the penalties attached and the recommended next steps.",
        "Added HS-code classification across the **10,300-entry** UN Comtrade dataset, and a metered API that lets clients pull regulation data into their own ERP systems.",
      ],
    },
  ],

  skills: [
    ["Languages", "JavaScript, TypeScript, C#, SQL, HTML5, CSS3"],
    ["Frameworks", "React, Next.js, Node.js, NestJS, Express, .NET Core Web API, React Native, Tailwind CSS"],
    ["Libraries", "Redux, Zustand, Prisma ORM, AG Grid, Socket.io"],
    ["Databases", "PostgreSQL, Microsoft SQL Server, MongoDB, Redis"],
    ["AI & Automation", "OpenAI API, Gemini, agentic AI, Claude Code, document extraction pipelines"],
    ["Tools & Testing", "Vitest, Docker, CI/CD, Git, GitHub, Vercel"],
  ],

  education: [
    {
      school: "Virtual University of Pakistan",
      degree: "Bachelor of Science in Software Engineering",
      dates: "Oct 2021 - Oct 2025",
    },
  ],

  certifications: [
    {
      name: "Agentic AI & FDE",
      detail: "Saylani Mass IT Training (SMIT) - year-long program, in progress",
      dates: "Aug 2026 - Jul 2027",
    },
    {
      name: "MERN Stack & Frontend Development",
      detail: "Jawan Pakistan",
      dates: "Jun 2022 - Jun 2023",
    },
  ],
};

/**
 * Two versions ship: the default one for Karachi employers, and one for
 * Lahore applications that says the move up front. Only the location line
 * differs, so the two can never disagree about anything else.
 */
const VARIANTS = {
  karachi: { suffix: "", location: "Karachi, Pakistan" },
  lahore: { suffix: "-lahore", location: "Relocating to Lahore" },
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");

const ICONS = {
  pin: '<path d="M8 1.6a4.4 4.4 0 0 0-4.4 4.4c0 3.3 4.4 8.4 4.4 8.4s4.4-5.1 4.4-8.4A4.4 4.4 0 0 0 8 1.6z"/><circle cx="8" cy="6" r="1.6" fill="#fff"/>',
  phone: '<path d="M3.2 2.2h2.4l1 2.6-1.4 1a8.4 8.4 0 0 0 4 4l1-1.4 2.6 1v2.4a1 1 0 0 1-1.1 1A11.6 11.6 0 0 1 2.2 3.3a1 1 0 0 1 1-1.1z"/>',
  mail: '<path d="M1.6 3.4h12.8v9.2H1.6z" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M1.9 3.9 8 8.8l6.1-4.9" fill="none" stroke="currentColor" stroke-width="1.4"/>',
  linkedin: '<path d="M3.4 6.1h2.2v7.4H3.4zM4.5 2.4a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6zM7.2 6.1h2.1v1c.3-.6 1.1-1.2 2.2-1.2 2.1 0 2.6 1.3 2.6 3.1v4.5h-2.2V9.5c0-.9-.2-1.6-1.2-1.6s-1.3.7-1.3 1.6v4H7.2z"/>',
  github: '<path d="M8 1.3a6.7 6.7 0 0 0-2.1 13c.3.1.5-.1.5-.3v-1.2c-1.9.4-2.3-.8-2.3-.8-.3-.8-.8-1-.8-1-.6-.4 0-.4 0-.4.7 0 1 .7 1 .7.6 1 1.6.7 2 .6 0-.5.2-.8.4-1-1.5-.2-3.1-.8-3.1-3.4 0-.8.3-1.4.7-1.9 0-.2-.3-.9.1-1.8 0 0 .6-.2 1.9.7a6.4 6.4 0 0 1 3.4 0c1.3-.9 1.9-.7 1.9-.7.4.9.1 1.6.1 1.8.4.5.7 1.1.7 1.9 0 2.6-1.6 3.2-3.1 3.4.2.2.5.7.5 1.4V14c0 .2.1.4.5.3A6.7 6.7 0 0 0 8 1.3z"/>',
  globe: '<circle cx="8" cy="8" r="6.3" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M1.7 8h12.6M8 1.7c3.4 3.6 3.4 9 0 12.6M8 1.7c-3.4 3.6-3.4 9 0 12.6" fill="none" stroke="currentColor" stroke-width="1.4"/>',
  link: '<path d="M6.6 9.4a2.6 2.6 0 0 0 3.7 0l2.2-2.2a2.6 2.6 0 0 0-3.7-3.7l-1 1" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M9.4 6.6a2.6 2.6 0 0 0-3.7 0L3.5 8.8a2.6 2.6 0 0 0 3.7 3.7l1-1" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
};

const icon = (name) =>
  `<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">${ICONS[name]}</svg>`;

/** **bold** -> <b>bold</b>, applied after escaping so markup can't be injected. */
const rich = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");

const bullets = (list) =>
  `<ul>\n${list.map((b) => `  <li>${rich(b)}</li>`).join("\n")}\n</ul>`;

function build(variant = "karachi") {
  const { location } = VARIANTS[variant] || VARIANTS.karachi;

  const contact = C.contacts
    .map((c) => {
      const label = c.icon === "pin" ? location : c.label;
      const inner = `${icon(c.icon)}<span>${esc(label)}</span>`;
      return c.href ? `<a href="${esc(c.href)}">${inner}</a>` : `<span class="ci">${inner}</span>`;
    })
    .join(`<span class="sep">|</span>`);

  const roles = C.roles
    .map(
      (r) => `
<div class="entry">
  <div class="row"><span class="title">${esc(r.title)}</span><span class="dates">${esc(r.dates)}</span></div>
  <div class="org">${esc(r.org)}</div>
  ${bullets(r.bullets)}
</div>`,
    )
    .join("");

  const projects = C.projects
    .map(
      (p) => `
<div class="entry">
  <div class="row">
    <span><span class="pname">${esc(p.name)}</span> <span class="psub">- ${esc(p.sub)}</span> <span class="pstack">| ${esc(p.stack)}</span></span>${
      p.url
        ? `<a class="plink" href="https://${esc(p.url)}" title="${esc(p.url)}">${icon("link")}${esc(p.url)}</a>`
        : ""
    }
  </div>
  ${bullets(p.bullets)}
</div>`,
    )
    .join("");

  const education = C.education
    .map(
      (e) => `
<div class="entry">
  <div class="row"><span class="title">${esc(e.school)}</span><span class="dates">${esc(e.dates)}</span></div>
  <div class="org">${esc(e.degree)}</div>
</div>`,
    )
    .join("");

  const certs = C.certifications
    .map(
      (c) => `
<div class="row cert"><span><b>${esc(c.name)}</b> : ${esc(c.detail)}</span><span class="dates">${esc(c.dates)}</span></div>`,
    )
    .join("");

  return `<!doctype html>
<meta charset="utf-8">
<title>${esc(C.name)} - ${esc(C.role)}</title>
<style>
  @page { size: letter; margin: 0.5in 0.5in 0.45in; }
  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font: 10pt/1.32 Helvetica, Arial, sans-serif;
    color: #000;
    letter-spacing: normal;
    font-kerning: none;
    font-variant-ligatures: none;
  }

  a { color: inherit; text-decoration: none; }
  b { font-weight: 700; }

  header { text-align: center; margin-bottom: 8pt; }
  .name { font-size: 24pt; font-weight: 700; font-variant: small-caps; line-height: 1.05; }
  .role { font-size: 14pt; font-weight: 700; margin-top: 1pt; }

  .contact {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 2pt 5pt;
    margin-top: 6pt;
    font-size: 9.4pt;
  }
  .contact a, .contact .ci { display: inline-flex; align-items: center; gap: 3pt; }
  .contact svg { width: 8.6pt; height: 8.6pt; flex: 0 0 auto; }
  .sep { color: #000; }

  .summary { margin-top: 8pt; }

  h2 {
    font-size: 13pt;
    font-weight: 700;
    font-variant: small-caps;
    color: #1f497d;
    margin: 12pt 0 5pt;
    padding-bottom: 1.5pt;
    border-bottom: 0.8pt solid #333;
  }

  .entry { margin: 0 0 6pt 11pt; break-inside: avoid; }
  .row { display: flex; justify-content: space-between; align-items: baseline; gap: 10pt; }
  .title, .pname { font-weight: 700; }
  .org { margin-top: 0.5pt; }
  .dates { white-space: nowrap; }
  .psub { font-weight: 400; }
  .pstack { font-style: italic; color: #1f497d; }
  .plink { display: inline-flex; align-items: center; gap: 2.5pt; white-space: nowrap; color: #1f497d; font-size: 9.4pt; }
  .plink svg { width: 8pt; height: 8pt; }

  ul { list-style: none; margin: 2pt 0 0 15pt; }
  li { position: relative; padding-left: 10pt; margin-bottom: 1.5pt; }
  li::before { content: "\\2022"; position: absolute; left: 0; }

  .skills { margin-left: 11pt; }
  .skills div { margin-bottom: 2pt; }
  .cert { margin: 0 0 3pt 11pt; }
</style>

<header>
  <div class="name">${esc(C.name)}</div>
  <div class="role">${esc(C.role)}</div>
  <div class="contact">${contact}</div>
</header>

<p class="summary">${rich(C.summary)}</p>

<h2>Experience</h2>${roles}

<h2>Projects</h2>${projects}

<h2>Technical Skills</h2>
<div class="skills">
${C.skills.map(([k, v]) => `  <div><b>${esc(k)}</b> : ${esc(v)}</div>`).join("\n")}
</div>

<h2>Education</h2>${education}

<h2>Certifications</h2>${certs}
`;
}

/* The .docx builder reads the same content object, so the two outputs
   cannot drift apart. */
module.exports = { CONTENT: C, VARIANTS, build };

if (require.main === module) {
  const dir = process.argv[2] || ".";
  for (const [key, v] of Object.entries(VARIANTS)) {
    const file = path.join(dir, `resume${v.suffix}.html`);
    fs.writeFileSync(file, build(key));
    console.log(`${file}  (${v.location})`);
  }
}
