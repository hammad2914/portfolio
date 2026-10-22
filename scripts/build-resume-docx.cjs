/**
 * Writes Hammad_Ali_Resume.docx from the same content object the HTML/PDF uses,
 * so the two can never disagree.
 *
 *   node scripts/build-resume-docx.cjs Hammad_Ali_Resume.docx
 *
 * A .docx is a zip of OOXML parts. Everything here is plain paragraphs and
 * runs - no tables, text boxes or columns - because that is what keeps the
 * document readable to the parsers that strip it back down to text.
 */
const fs = require("fs");
const zlib = require("zlib");
const { CONTENT: C, VARIANTS } = require("./build-resume.cjs");

// matches the PDF: same document, one different location line
const variant = VARIANTS[process.argv[3]] ? process.argv[3] : "karachi";
const location = VARIANTS[variant].location;

const NAVY = "1F497D";
const BODY = "000000";

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/** One run. Sizes are half-points, matching the PDF's 10pt body. */
function run(text, { b = false, i = false, color = BODY, size = 20 } = {}) {
  const props =
    `<w:rPr><w:rFonts w:ascii="Segoe UI" w:hAnsi="Segoe UI" w:cs="Segoe UI"/>` +
    (b ? "<w:b/>" : "") +
    (i ? "<w:i/>" : "") +
    `<w:color w:val="${color}"/><w:sz w:val="${size}"/><w:szCs w:val="${size}"/></w:rPr>`;
  return `<w:r>${props}<w:t xml:space="preserve">${esc(text)}</w:t></w:r>`;
}

/** A tab has to be its own element; a tab character inside <w:t> is ignored. */
const tabRun = () => `<w:r><w:tab/></w:r>`;

/**
 * External links live in word/_rels/document.xml.rels and are referenced by id,
 * so each one has to be registered before it can be used.
 */
const rels = [];
function link(url, runs) {
  const id = `rId${rels.length + 2}`; // rId1 is the document part itself
  rels.push({ id, url });
  return `<w:hyperlink r:id="${id}">${runs}</w:hyperlink>`;
}

/**
 * One paragraph. `tab` puts a right-aligned tab stop at the text margin so
 * dates sit on the right edge the way they do in the PDF.
 */
function para(
  runs,
  { before = 0, after = 0, tab = false, rule = false, indent = 0, left = 0, center = false } = {},
) {
  const spacing = `<w:spacing w:before="${before}" w:after="${after}" w:line="276" w:lineRule="auto"/>`;
  const tabs = tab ? `<w:tabs><w:tab w:val="right" w:pos="10080"/></w:tabs>` : "";
  const border = rule
    ? `<w:pBdr><w:bottom w:val="single" w:sz="6" w:space="2" w:color="C8D4DE"/></w:pBdr>`
    : "";
  // a bullet hangs its mark; a heading just shifts right, so they differ
  const ind = indent
    ? `<w:ind w:left="${indent}" w:hanging="${indent}"/>`
    : left
      ? `<w:ind w:left="${left}"/>`
      : "";
  const jc = center ? `<w:jc w:val="center"/>` : "";
  return `<w:p><w:pPr>${spacing}${tabs}${border}${ind}${jc}</w:pPr>${runs}</w:p>`;
}

const body = [];

/* header - centred, as in the PDF */
body.push(para(run(C.name.toUpperCase(), { b: true, size: 44 }), { after: 0, center: true }));
body.push(para(run(C.role, { b: true, size: 28 }), { after: 60, center: true }));
body.push(
  para(
    C.contacts
      .map((c) => {
        const r = run(c.icon === "pin" ? location : c.label, { size: 19 });
        return c.href ? link(c.href, r) : r;
      })
      .join(run("  |  ", { size: 19 })),
    { after: 120, center: true },
  ),
);

const heading = (text) =>
  body.push(
    para(run(text.toUpperCase(), { b: true, color: NAVY, size: 24 }), {
      before: 220,
      after: 80,
      rule: true,
    }),
  );

/**
 * **double asterisks** become bold runs, matching the HTML renderer. Splitting
 * on the delimiter keeps the visible text identical either way.
 */
const richRuns = (text, opts = {}) =>
  String(text)
    .split(/\*\*(.+?)\*\*/g)
    .map((part, i) => (i % 2 ? run(part, { ...opts, b: true }) : run(part, opts)))
    .join("");

/* a bullet is a literal mark plus a hanging indent, which survives a text
   extraction better than Word's numbering definitions do */
const bullet = (text) =>
  body.push(para(run("•   ") + richRuns(text), { after: 40, indent: 284, left: 0 }));

/* a title line with the dates on the right margin */
const titled = (left, dates) =>
  body.push(para(left + tabRun() + run(dates), { before: 120, after: 0, tab: true }));

// summary sits straight under the contact line, with no heading
body.push(para(richRuns(C.summary), { after: 60 }));

heading("Experience");
for (const r of C.roles) {
  titled(run(r.title, { b: true }), r.dates);
  body.push(para(run(r.org), { after: 40 }));
  r.bullets.forEach(bullet);
}

heading("Projects");
for (const p of C.projects) {
  body.push(
    para(
      run(p.name, { b: true }) +
        run(` - ${p.sub} `) +
        run(`| ${p.stack}`, { i: true, color: NAVY }) +
        (p.url ? tabRun() + link(`https://${p.url}`, run(p.url, { color: NAVY })) : ""),
      { before: 110, after: 30, tab: Boolean(p.url) },
    ),
  );
  p.bullets.forEach(bullet);
}

heading("Technical Skills");
for (const [k, v] of C.skills) {
  body.push(para(run(`${k} : `, { b: true }) + run(v), { after: 40 }));
}

heading("Education");
for (const e of C.education) {
  titled(run(e.school, { b: true }), e.dates);
  body.push(para(run(e.degree), { after: 40 }));
}

heading("Certifications");
for (const c of C.certifications) {
  body.push(
    para(run(c.name, { b: true }) + run(` : ${c.detail}`) + tabRun() + run(c.dates), {
      after: 40,
      tab: true,
    }),
  );
}

const documentXml =
  `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
  `<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"` +
  ` xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">` +
  `<w:body>${body.join("")}` +
  `<w:sectPr><w:pgSz w:w="12240" w:h="15840"/>` +
  `<w:pgMar w:top="648" w:right="1080" w:bottom="648" w:left="1080" w:header="0" w:footer="0" w:gutter="0"/>` +
  `</w:sectPr></w:body></w:document>`;

const CONTENT_TYPES =
  `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
  `<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">` +
  `<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>` +
  `<Default Extension="xml" ContentType="application/xml"/>` +
  `<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>` +
  `</Types>`;

const RELS =
  `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
  `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
  `<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>` +
  `</Relationships>`;

/* ---- minimal zip writer (deflate), so no dependency is needed ---- */
const CRC = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return (buf) => {
    let c = -1;
    for (const b of buf) c = t[(c ^ b) & 0xff] ^ (c >>> 8);
    return (c ^ -1) >>> 0;
  };
})();

function zip(entries) {
  const locals = [];
  const central = [];
  let offset = 0;

  for (const [name, text] of entries) {
    const raw = Buffer.from(text, "utf8");
    const deflated = zlib.deflateRawSync(raw, { level: 9 });
    const nameBuf = Buffer.from(name, "utf8");
    const crc = CRC(raw);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4); // version needed
    local.writeUInt16LE(0, 6); // flags
    local.writeUInt16LE(8, 8); // deflate
    local.writeUInt32LE(0, 10); // time + date
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(deflated.length, 18);
    local.writeUInt32LE(raw.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    local.writeUInt16LE(0, 28);
    locals.push(local, nameBuf, deflated);

    const dir = Buffer.alloc(46);
    dir.writeUInt32LE(0x02014b50, 0);
    dir.writeUInt16LE(20, 4); // version made by
    dir.writeUInt16LE(20, 6); // version needed
    dir.writeUInt16LE(0, 8);
    dir.writeUInt16LE(8, 10);
    dir.writeUInt32LE(0, 12);
    dir.writeUInt32LE(crc, 16);
    dir.writeUInt32LE(deflated.length, 20);
    dir.writeUInt32LE(raw.length, 24);
    dir.writeUInt16LE(nameBuf.length, 28);
    dir.writeUInt32LE(0, 38); // external attrs
    dir.writeUInt32LE(offset, 42);
    central.push(dir, nameBuf);

    offset += local.length + nameBuf.length + deflated.length;
  }

  const centralBuf = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(centralBuf.length, 12);
  end.writeUInt32LE(offset, 16);

  return Buffer.concat([...locals, centralBuf, end]);
}

const DOC_RELS =
  `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
  `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
  rels
    .map(
      (r) =>
        `<Relationship Id="${r.id}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="${esc(r.url)}" TargetMode="External"/>`,
    )
    .join("") +
  `</Relationships>`;

const out = process.argv[2] || "Hammad_Ali_Resume.docx";
fs.writeFileSync(
  out,
  zip([
    ["[Content_Types].xml", CONTENT_TYPES],
    ["_rels/.rels", RELS],
    ["word/document.xml", documentXml],
    ["word/_rels/document.xml.rels", DOC_RELS],
  ]),
);
console.log(`${out} written (${body.length} paragraphs, ${rels.length} links)`);
