/**
 * Builds the resume in several visual treatments from one copy of the content,
 * so the words can't drift between variants. Every theme stays single column
 * with real text and no letter-spacing, which is what an ATS parser needs.
 *
 * Theme "b" is the one that ships. To rebuild public/resume/Hammad_Ali_Resume.pdf:
 *
 *   node scripts/build-resume.cjs .
 *   chrome --headless=new --no-pdf-header-footer
 *     --print-to-pdf=public/resume/Hammad_Ali_Resume.pdf
 *     file:///ABSOLUTE/PATH/resume-b.html
 *
 * The .docx version is built from the same content by build-resume-docx.cjs.
 */
const fs = require("fs");
const path = require("path");

const C = {
  name: "Hammad Ali",
  role: "Full Stack Software Engineer",
  contact1: "ch.hammad2914@gmail.com | +92 349 187 2526 | Karachi, Pakistan",
  contact2: "hammad-ali-dev.vercel.app | linkedin.com/in/hammad-ali-1a4631255 | github.com/hammad2914",
  summary:
    "Full Stack Software Engineer with 3+ years shipping production ERP, SaaS, and supply-chain systems in React.js, " +
    "Next.js, Node.js, NestJS, and PostgreSQL. Owned end-to-end delivery across 7+ production systems: frontend " +
    "architecture, backend APIs, real-time data, AI document-extraction pipelines, and deployment. Migrated legacy " +
    "systems and set reusable patterns that cut per-module development time by 30%.",
  skills: [
    ["Frontend", "React.js, Next.js, React Native, TypeScript, JavaScript (ES6+), Redux, Zustand, AG Grid, Tailwind CSS"],
    ["Backend", "Node.js, Express.js, NestJS, .NET Core Web API, Prisma ORM, REST APIs, WebSockets (Socket.io), JWT, RBAC"],
    ["Databases", "PostgreSQL, SQL Server, MongoDB, Redis"],
    ["AI & Automation", "OpenAI, Gemini, bulk PDF extraction, document-processing pipelines"],
    ["DevOps & Tools", "Docker, CI/CD, Git, GitHub, code review, performance optimization"],
  ],
  roles: [
    {
      org: "Interactive Technologies Gateway",
      title: "Software Engineer",
      dates: "May 2023 - Present",
      bullets: [
        "Ship full-stack features across 7+ enterprise systems for supply-chain and quality-inspection clients, from React/Next.js frontends to Node.js/NestJS APIs.",
        "Design NestJS and Prisma ORM backend APIs with authentication, RBAC, and multi-module ERP business logic.",
        "Migrated 3 legacy VB.NET systems to React + Node.js + PostgreSQL, cutting UI load times by 40%.",
        "Built Excel Genie, a reporting engine reused across 10+ ERP modules in place of per-module reporting code.",
        "Engineered AG Grid interfaces over 50,000+ row datasets with real-time WebSocket sync and zero UI lag.",
      ],
    },
  ],
  projects: [
    {
      name: "Cortex",
      sub: "AI-Powered ERP System",
      stack: "React.js, NestJS, PostgreSQL, WebSockets, OpenAI, AG Grid",
      bullets: [
        "Led full-stack delivery across 8 interconnected modules with admin panels, permission flows, and 50,000+ row live grids.",
        "Built a bulk PDF extraction pipeline on OpenAI with per-client templates for 8-12 document formats and human review before commit: 70% faster processing.",
      ],
    },
    {
      name: "Okulium",
      sub: "School Management SaaS",
      // the URL says "live" better than the word does, and it is clickable
      url: "okulium-web.onrender.com",
      stack: "React, Vite, NestJS, Prisma, PostgreSQL, PWA",
      bullets: [
        "Multi-tenant platform for multi-branch school groups: attendance, exams and results, fees, timetabling, staff and reporting, as an installable PWA.",
        "Attendance edits write to an edit-history table and result disputes are a separate reviewable model, so corrections stay auditable.",
      ],
    },
    {
      name: "Integra",
      sub: "Quality Inspection Platform",
      stack: "React.js, Node.js, PostgreSQL, WebSockets, PDF Generation",
      bullets: [
        "Built 7 inspection workflows with approvals as a state machine, real-time updates, server-side PDF reports, and KPI dashboards.",
      ],
    },
    {
      name: "Vendor Portal",
      sub: "Supplier Invoicing",
      stack: "React, .NET Core, SQL Server, PDF Automation",
      bullets: [
        "Direct supplier uploads with automated extraction and validation before commit: 10,000+ documents a year, 70% less manual effort.",
      ],
    },
  ],
  education: [
    ["BS Software Engineering", "Virtual University of Pakistan", "Oct 2021 - Oct 2025"],
    ["MERN Stack Development", "Jawan Pakistan", "Jan - Jun 2023"],
    ["Frontend Development", "Jawan Pakistan", "Jun - Dec 2022"],
  ],
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

/**
 * Turns the pipe-separated contact line into links. Chrome's print-to-PDF
 * carries anchors through as real link annotations, so a recruiter can click
 * the portfolio or the repo straight out of the document. The visible text is
 * unchanged, so nothing about extraction changes.
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

/* Each theme supplies only its own look; the markup below is shared. */
const THEMES = {
  a: {
    label: "Classic navy",
    css: `
  body { font: 9.3pt/1.36 Calibri, Carlito, Arial, sans-serif; color: #22282e; }
  .name { font-family: Georgia, "Times New Roman", serif; font-size: 23pt; font-weight: 700;
          color: #1f3a5f; line-height: 1.05; }
  .role { font-family: Georgia, serif; font-size: 11.5pt; color: #4a5a6b; margin-top: 1pt; }
  .contact { font-size: 8.7pt; color: #4a5a6b; margin-top: 4pt; }
  .hdr { border-bottom: 1.8pt solid #1f3a5f; padding-bottom: 6pt; }
  h2 { font-family: Georgia, serif; font-size: 10.5pt; font-weight: 700; color: #1f3a5f;
       margin: 9pt 0 4pt; border-bottom: 0.6pt solid #c3cedb; padding-bottom: 2pt; }
  .org { font-weight: 700; color: #22282e; }
  .dates { color: #6b7a89; font-size: 8.7pt; }
  .stack, .sub, .url { color: #52657a; font-weight: 400; }
  li::before { color: #1f3a5f; }
  .lbl { font-weight: 700; color: #1f3a5f; }`,
  },
  b: {
    label: "Modern blue",
    css: `
  body { font: 10.0pt/1.36 "Segoe UI", Calibri, Arial, sans-serif; color: #1d242b; }
  .name { font-size: 25pt; font-weight: 600; color: #11324d; line-height: 1.02; }
  .role { font-size: 12.5pt; font-weight: 600; color: #0f6fc6; margin-top: 1pt; }
  .contact { font-size: 9.6pt; color: #56646f; margin-top: 4pt; }
  .hdr { padding-bottom: 6pt; }
  h2 { font-size: 10.8pt; font-weight: 700; text-transform: uppercase; color: #11324d;
       margin: 9pt 0 4pt; padding-left: 6pt; border-left: 3pt solid #0f6fc6; }
  .org { font-weight: 600; color: #11324d; }
  .dates { color: #6b7883; font-size: 9.6pt; }
  .stack, .sub, .url { color: #0f6fc6; font-weight: 400; }
  li::before { color: #0f6fc6; }
  .lbl { font-weight: 600; color: #11324d; }`,
  },
  c: {
    label: "Editorial mono",
    css: `
  body { font: 8.9pt/1.3 Cambria, Georgia, serif; color: #1a1a1a; }
  .name { font-family: "Segoe UI", Calibri, sans-serif; font-size: 23pt; font-weight: 600;
          color: #111; line-height: 1.04; }
  .role { font-family: "Segoe UI", Calibri, sans-serif; font-size: 11pt; color: #55595d;
          margin-top: 2pt; }
  .contact { font-family: "Segoe UI", Calibri, sans-serif; font-size: 8.6pt; color: #55595d;
             margin-top: 4pt; }
  .hdr { border-bottom: 0.8pt solid #1a1a1a; padding-bottom: 7pt; }
  h2 { font-family: "Segoe UI", Calibri, sans-serif; font-size: 9pt; font-weight: 700;
       text-transform: uppercase; color: #111; margin: 8.5pt 0 3.5pt;
       border-bottom: 0.6pt solid #cfcfcf; padding-bottom: 2pt; }
  .org { font-weight: 700; }
  .dates { color: #6d7276; font-size: 8.6pt; font-family: "Segoe UI", Calibri, sans-serif; }
  .stack, .sub, .url { color: #5c6166; font-weight: 400; font-style: italic; }
  li::before { color: #8a8f94; }
  .lbl { font-weight: 700; }`,
  },
};

const BASE = `
  @page { size: letter; margin: 0.45in 0.52in; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  /* kerning and ligatures off: both fragment words when a parser reads the PDF */
  body { letter-spacing: normal; font-kerning: none; font-variant-ligatures: none; }
  .row { display: flex; justify-content: space-between; align-items: baseline; gap: 10pt; }
  .head { margin-top: 5pt; }
  .head.first { margin-top: 0; }
  ul { list-style: none; margin-top: 1.5pt; }
  li { position: relative; padding-left: 10pt; }
  li::before { content: "\\2022"; position: absolute; left: 1.5pt; }
  .skills div, .edu div { margin-bottom: 1.5pt; }
  a { color: inherit; text-decoration: none; }
`;

function build(theme) {
  const t = THEMES[theme];
  const roles = C.roles
    .map(
      (r, i) => `
<div class="head${i === 0 ? " first" : ""} row">
  <span><span class="org">${esc(r.org)}</span> | ${esc(r.title)}</span>
  <span class="dates">${esc(r.dates)}</span>
</div>
<ul>
${r.bullets.map((b) => `  <li>${esc(b)}</li>`).join("\n")}
</ul>`,
    )
    .join("\n");

  const projects = C.projects
    .map(
      (p, i) => `
<div class="head${i === 0 ? " first" : ""}">
  <span class="org">${esc(p.name)}</span> <span class="sub">${esc(p.sub)}</span>${
    p.url
      ? ` <a class="url" href="https://${esc(p.url)}" title="${esc(p.url)}">↗</a>`
      : ""
  }
  <span class="stack">| ${esc(p.stack)}</span>
</div>
<ul>
${p.bullets.map((b) => `  <li>${esc(b)}</li>`).join("\n")}
</ul>`,
    )
    .join("\n");

  return `<!doctype html>
<meta charset="utf-8">
<title>${esc(C.name)} - ${esc(C.role)}</title>
<style>${BASE}${t.css}</style>

<div class="hdr">
  <div class="name">${esc(C.name)}</div>
  <div class="role">${esc(C.role)}</div>
  <div class="contact">${linkify(C.contact1)}<br>${linkify(C.contact2)}</div>
</div>

<h2>Professional Summary</h2>
<p>${esc(C.summary)}</p>

<h2>Technical Skills</h2>
<div class="skills">
${C.skills.map(([k, v]) => `  <div><span class="lbl">${esc(k)}:</span> ${esc(v)}</div>`).join("\n")}
</div>

<h2>Professional Experience</h2>${roles}

<h2>Key Projects</h2>${projects}

<h2>Education &amp; Certifications</h2>
<div class="edu">
${C.education
  .map(([a, b, c]) => `  <div class="row"><span><span class="lbl">${esc(a)}</span> - ${esc(b)}</span><span class="dates">${esc(c)}</span></div>`)
  .join("\n")}
</div>
`;
}

/* The .docx builder reads the same content object, so the two outputs
   cannot drift apart. */
module.exports = { CONTENT: C, THEMES, build };

if (require.main === module) {
  const outDir = process.argv[2] || ".";
  for (const k of Object.keys(THEMES)) {
    const file = path.join(outDir, `resume-${k}.html`);
    fs.writeFileSync(file, build(k));
    console.log(`${file}  (${THEMES[k].label})`);
  }
}
