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
 * ATS-safe on purpose: one column, real selectable text, standard section
 * headings, no tables, no graphics, no icon fonts, plain ASCII punctuation.
 * Ligatures are off because a broken fi/fl mapping turns "workflows" into
 * "workows" in the extracted text, which no keyword match will survive.
 *
 * Bullets use **double asterisks** for emphasis; both renderers turn those
 * into bold runs, and the visible text is identical either way.
 */
const fs = require("fs");
const path = require("path");

const C = {
  name: "Hammad Ali",
  role: "Full Stack Software Engineer",
  badges: ["React", "Next.js", "TypeScript", "NestJS", ".NET Core", "PostgreSQL"],
  contacts: [
    { icon: "pin", label: "Karachi, Pakistan" },
    { icon: "phone", label: "+92 349 187 2526", href: "tel:+923491872526" },
    { icon: "mail", label: "ch.hammad2914@gmail.com", href: "mailto:ch.hammad2914@gmail.com" },
    { icon: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/hammad-ali-1a4631255" },
    { icon: "github", label: "GitHub", href: "https://github.com/hammad2914" },
    { icon: "globe", label: "Portfolio", href: "https://hammad-ali-dev.vercel.app" },
  ],

  summary:
    "Full Stack Software Engineer specializing in **React**, **Next.js**, **TypeScript** and " +
    "**NestJS**, with 3+ years delivering enterprise ERP, SaaS and supply-chain platforms across " +
    "the full development lifecycle. Owned end-to-end delivery across **7+ production systems**, " +
    "migrated **3 legacy VB.NET systems** to a modern stack, and built a document extraction " +
    "pipeline on the **OpenAI API** that cut processing time by **70%**. Experienced in requirements " +
    "analysis, testing, code review, production support and mentoring junior developers.",

  roles: [
    {
      org: "Interactive Technologies Gateway",
      title: "Software Engineer",
      dates: "May 2023 - Present",
      bullets: [
        "Own end-to-end delivery across **7+ enterprise systems** for supply-chain and quality-inspection clients, from React/Next.js frontends to Node.js/NestJS APIs.",
        "Design backend APIs in **NestJS** and **Prisma ORM** covering authentication, **RBAC**, and multi-module business logic for ERP platforms.",
        "Migrated **3 legacy VB.NET systems** to React + Node.js + PostgreSQL, cutting **UI load times by 40%** and retiring an unmaintainable codebase.",
        "Built **Excel Genie**, a reporting engine reused across **10+ ERP modules** in place of per-module reporting code.",
        "Engineered **AG Grid** interfaces over **50,000+ row datasets** with real-time **WebSocket** synchronization and zero UI lag.",
        "Created reusable **React component libraries** and NestJS service patterns, cutting **per-module development time by 30%**.",
        "Ship production endpoints and **Docker**-based services independently through **CI/CD** pipelines.",
        "Write **unit and integration tests** with **Vitest**, and run **code reviews** across the team before work is merged.",
        "Own **requirements analysis, estimation and planning** for assigned modules, working directly with business stakeholders.",
        "Mentor **3-5 junior developers** in application architecture, debugging and code quality.",
        "Investigate and resolve **production issues** across frontend, API, database and deployment layers, from logs and traces to root cause.",
      ],
      projects: [
        {
          name: "Cortex",
          sub: "AI-Powered ERP System",
          stack: "React.js, NestJS, PostgreSQL, WebSockets, OpenAI, AG Grid",
          bullets: [
            "Led full-stack delivery across **8 interconnected modules** serving **100+ users across 7+ permission roles**, with admin panels, permission flows and real-time 50,000+ row data grids.",
            "Built a bulk **PDF extraction pipeline on the OpenAI API** with a per-client template covering **8-12 document formats**, routed through human review before commit: **~70% less processing time**.",
            "Moved the pipeline off **Azure Document Intelligence** after custom-model training per document type failed to reach usable accuracy.",
          ],
        },
        {
          name: "Integra",
          sub: "Quality Inspection Platform",
          stack: "React.js, Node.js, PostgreSQL, WebSockets, PDF Generation",
          bullets: [
            "Built **7 end-to-end inspection workflows** with approvals modelled as an explicit **state machine**, real-time status updates, server-side PDF reports and live KPI dashboards.",
            "Modelled the full reporting hierarchy for **50+ inspectors** through their managers and department head, including finance sign-off on **conveyance claims**.",
          ],
        },
        {
          name: "Vendor Portal",
          sub: "Supplier Invoicing",
          stack: "React, .NET Core Web API, SQL Server, PDF Automation",
          bullets: [
            "Replaced emailed supplier PDFs with direct uploads, automated extraction and a validation step before commit: **10,000+ documents a year**, **70% less manual effort**.",
          ],
        },
      ],
    },
    {
      org: "Consulting Service International Ltd",
      title: "Full Stack Developer (Remote)",
      dates: "Jun 2025 - Feb 2026",
      bullets: [
        "Built client websites, portals and a live subscription platform in **React**, **Next.js** and **Express**, working remotely from requirements through to deployment.",
      ],
      projects: [
        {
          name: "Law in Action",
          sub: "Global Regulations Platform",
          stack: "React, Express, Prisma, PostgreSQL",
          url: "lawintoaction.com",
          bullets: [
            "Built a live subscription compliance platform with regulation tracking, **HS-code classification** over the **10,300-entry UN Comtrade set** held in memory, and a metered external API clients pull into their own ERPs.",
            "Put translation behind a **provider abstraction** over DeepL, Azure, Google and MyMemory with automatic fallback, so one provider's outage never stalls compliance work.",
          ],
        },
      ],
    },
  ],

  projects: [
    {
      name: "Okulium",
      sub: "Multi-Tenant School Management SaaS",
      stack: "React, Vite, NestJS, Prisma, PostgreSQL, PWA",
      url: "okulium-web.onrender.com",
      bullets: [
        "Shipped a live multi-tenant platform for school groups: attendance, exams and results, fees, timetabling, staff and reporting, as an **installable PWA**.",
        "Attendance edits write to an **edit-history table** and result disputes are a separate model, so corrections stay auditable.",
      ],
    },
  ],

  skills: [
    ["Frontend", "React.js, Next.js, React Native, TypeScript, JavaScript (ES6+), Redux, Zustand, Tailwind CSS, AG Grid"],
    ["Backend & APIs", "Node.js, NestJS, Express.js, .NET Core Web API, Prisma ORM, REST APIs, WebSockets, JWT, RBAC"],
    ["Databases & Caching", "PostgreSQL, Microsoft SQL Server, MongoDB, Redis"],
    ["Testing & DevOps", "Vitest, unit & integration testing, Docker, CI/CD, Git, GitHub, Vercel"],
    ["Engineering Practices", "Requirements analysis, estimation, code reviews, debugging, production support, mentoring"],
    ["AI & Automation", "OpenAI API, Gemini, bulk PDF extraction, document intelligence, automation pipelines"],
  ],

  education: [
    ["BS Software Engineering", "Virtual University of Pakistan", "Oct 2021 - Oct 2025"],
    ["MERN Stack & Frontend Development", "Jawan Pakistan", "Jun 2022 - Jun 2023"],
  ],
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

/**
 * Turns the pipe-separated contact line into links. Chrome's print-to-PDF
 * carries anchors through as real link annotations, so the portfolio and the
 * repo are clickable. The visible text is unchanged.
 */
const linkify = (line) =>
  line
    .split(" | ")
    .map((part) => {
      const t = esc(part.trim());
      if (t.includes("@")) return `<a href="mailto:${t}">${t}</a>`;
      if (/^[a-z0-9.-]+\.[a-z]{2,}(\/|$)/i.test(t)) return `<a href="https://${t}">${t}</a>`;
      return t;
    })
    .join(" | ");

const bullets = (list) =>
  `<ul>\n${list.map((b) => `  <li>${rich(b)}</li>`).join("\n")}\n</ul>`;

const projectBlock = (p, cls) => `
<div class="${cls}">
  <span class="pname">${esc(p.name)}</span>
  <span class="psub">${esc(p.sub)}</span>
  <span class="pstack">| ${esc(p.stack)}</span>${
    p.url
      ? ` <a class="plink" href="https://${esc(p.url)}" title="${esc(p.url)}">${icon("link")}${esc(p.url)}</a>`
      : ""
  }
</div>
${bullets(p.bullets)}`;

function build() {
  const roles = C.roles
    .map(
      (r) => `
<div class="head row">
  <span class="title">${esc(r.title)}</span>
  <span class="dates">${esc(r.dates)}</span>
</div>
<div class="org">${esc(r.org)}</div>
${bullets(r.bullets)}
${(r.projects || []).map((p) => projectBlock(p, "proj")).join("\n")}`,
    )
    .join("\n");

  return `<!doctype html>
<meta charset="utf-8">
<title>${esc(C.name)} - ${esc(C.role)}</title>
<style>
  @page { size: letter; margin: 0.45in 0.5in; }
  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font: 9.7pt/1.33 "Segoe UI", Calibri, Arial, sans-serif;
    color: #1d242b;
    letter-spacing: normal;
    font-kerning: none;
    /* a broken fi/fl mapping turns "workflows" into "workows" when parsed */
    font-variant-ligatures: none;
  }

  a { color: inherit; text-decoration: none; }
  b { font-weight: 600; color: #11324d; }

  header { text-align: center; }
  .name {
    font-size: 23pt;
    font-weight: 700;
    color: #11324d;
    line-height: 1.05;
    text-transform: uppercase;
  }
  .role { font-size: 12pt; font-weight: 600; color: #0f6fc6; margin-top: 1pt; }

  /* the stack at a glance, before anyone reads a word of prose */
  .badges { margin: 5pt 0 4pt; }
  .badges span {
    display: inline-block;
    margin: 0 4pt 3pt 0;
    padding: 1.5pt 6pt;
    border: 0.75pt solid rgba(15, 111, 198, 0.4);
    border-radius: 9pt;
    font-size: 8.4pt;
    font-weight: 600;
    color: #0f6fc6;
  }

  /* one centred row; icons are SVG so they add no text to the extraction */
  .contact {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2pt 11pt;
    font-size: 9pt;
    color: #56646f;
  }

  .contact a,
  .contact .ci {
    display: inline-flex;
    align-items: center;
    gap: 3.5pt;
  }

  .contact svg {
    width: 8.6pt;
    height: 8.6pt;
    flex: 0 0 auto;
    color: #0f6fc6;
  }

  h2 {
    font-size: 10.4pt;
    font-weight: 700;
    text-transform: uppercase;
    color: #11324d;
    margin: 8pt 0 3.5pt;
    padding-bottom: 1.5pt;
    border-bottom: 1pt solid rgba(17, 50, 77, 0.3);
  }

  .row { display: flex; justify-content: space-between; align-items: baseline; gap: 10pt; }

  .head { margin-top: 3pt; }
  .title { font-weight: 700; color: #11324d; font-size: 10.8pt; }
  .org { font-weight: 600; color: #0f6fc6; font-size: 9.9pt; margin-bottom: 0.5pt; }
  .dates { color: #6b7883; font-size: 9.3pt; white-space: nowrap; }

  /* projects sit inside the job they were built in, indented to show it */
  .proj { margin: 3.5pt 0 0 11pt; }
  .proj + ul { margin-left: 11pt; }
  .pname { font-weight: 700; color: #11324d; }
  .psub, .pstack { color: #0f6fc6; font-weight: 400; }
  .pstack { font-size: 9.2pt; }
  .plink { display: inline-flex; align-items: center; gap: 2.5pt; color: #0f6fc6; font-size: 9pt; }
  .plink svg { width: 8pt; height: 8pt; }

  .own { margin-top: 2pt; }

  ul { list-style: none; margin-top: 1pt; }
  li { position: relative; padding-left: 10pt; }
  li::before { content: "\\2022"; position: absolute; left: 1.5pt; color: #0f6fc6; }

  .skills div, .edu div { margin-bottom: 1pt; }
  .lbl { font-weight: 700; color: #11324d; }
</style>

<header>
  <div class="name">${esc(C.name)}</div>
  <div class="role">${esc(C.role)}</div>
  <div class="badges">${C.badges.map((b) => `<span>${esc(b)}</span>`).join("")}</div>
  <div class="contact">${C.contacts
    .map((c) => {
      const inner = `${icon(c.icon)}<span>${esc(c.label)}</span>`;
      return c.href ? `<a href="${esc(c.href)}">${inner}</a>` : `<span class="ci">${inner}</span>`;
    })
    .join("")}</div>
</header>

<h2>Professional Summary</h2>
<p>${rich(C.summary)}</p>

<h2>Experience</h2>${roles}

<h2>Personal Projects</h2>
${C.projects.map((p) => projectBlock(p, "proj own")).join("\n")}

<h2>Technical Skills</h2>
<div class="skills">
${C.skills.map(([k, v]) => `  <div><span class="lbl">${esc(k)}:</span> ${esc(v)}</div>`).join("\n")}
</div>

<h2>Education &amp; Certifications</h2>
<div class="edu">
${C.education
  .map(
    ([a, b, c]) =>
      `  <div class="row"><span><span class="lbl">${esc(a)}</span> - ${esc(b)}</span><span class="dates">${esc(c)}</span></div>`,
  )
  .join("\n")}
</div>
`;
}

/* The .docx builder reads the same content object, so the two outputs
   cannot drift apart. */
module.exports = { CONTENT: C, build };

if (require.main === module) {
  const file = path.join(process.argv[2] || ".", "resume.html");
  fs.writeFileSync(file, build());
  console.log(file);
}
