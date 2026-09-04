"use client";

import { Icon } from "@iconify/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Hero visual: a dark code editor that builds and turns into the real, light
 * web app that code produces — browser bar, sidebar and all. Stack logos orbit
 * the panel. Decorative — the hero copy carries the message.
 */

type Stage = "writing" | "building" | "running";

type Scene = {
  file: string;
  url: string;
  appTitle: string;
  appIcon: string;
  lines: string[];
  app: "extract" | "grid" | "register";
};

const SCENES: Scene[] = [
  {
    file: "extraction.service.ts",
    url: "cortex.app/invoices/8842",
    appTitle: "Invoice intake",
    appIcon: "mdi:file-document-check-outline",
    app: "extract",
    lines: [
      "async extract(doc: Buffer, client: string) {",
      "  const tpl = await this.templates.for(client);",
      "  const fields = await this.ai.parse(doc, tpl);",
      "",
      "  // a low-confidence read never reaches the ledger",
      "  return fields.some((f) => f.score < 0.7)",
      "    ? this.queueForReview(fields)",
      "    : this.commit(fields);",
      "}",
    ],
  },
  {
    file: "useGridSync.ts",
    url: "cortex.app/purchase-orders",
    appTitle: "Purchase orders",
    appIcon: "mdi:table-large",
    app: "grid",
    lines: [
      "export function useGridSync(module: string) {",
      "  const [rows, setRows] = useState<Row[]>([]);",
      "",
      "  // 50k rows stay live without a refetch",
      "  socket.on('row:update', (row) => {",
      "    setRows((prev) => merge(prev, row));",
      "  });",
      "",
      "  return rows;",
      "}",
    ],
  },
  {
    file: "attendance.query.ts",
    url: "okulium.app/attendance/7-B",
    appTitle: "Class 7-B · Today",
    appIcon: "mdi:clipboard-check-outline",
    app: "register",
    lines: [
      "const register = await prisma.attendance.findMany({",
      "  where: { branchId, date: today },",
      "  include: {",
      "    // a corrected register keeps its history",
      "    edits: { orderBy: { changedAt: 'desc' } },",
      "  },",
      "});",
    ],
  },
];

/** Logos orbiting the panel. */
const ORBIT = [
  { name: "React", icon: "logos:react", x: 0, y: 44, size: 3.1, dur: 5 },
  {
    name: "PostgreSQL",
    icon: "logos:postgresql",
    x: 95,
    y: 4,
    size: 2.9,
    dur: 6,
  },
  {
    name: "Next.js",
    icon: "logos:nextjs-icon",
    x: 47,
    y: 100,
    size: 2.7,
    dur: 5.5,
  },
  {
    name: "TypeScript",
    icon: "logos:typescript-icon",
    x: 8,
    y: 96,
    size: 2.4,
    dur: 6.5,
  },
  { name: "NestJS", icon: "logos:nestjs", x: 100, y: 72, size: 2.5, dur: 5.2 },
];

const MAX_LINES = Math.max(...SCENES.map((s) => s.lines.length));
const TYPE_MS = 15;
const SETTLE_MS = 500;
const BUILD_MS = 1300;
const RUN_MS = 4200;

const TOKEN_PATTERN = new RegExp(
  [
    "(\\/\\/[^\\n]*)",
    "(`[^`]*`|\"[^\"]*\"|'[^']*')",
    "\\b(export|const|let|async|await|return|function|class|new|if|else|true|false|null|undefined)\\b",
    "\\b(\\d+(?:\\.\\d+)?)\\b",
    "\\b([A-Z][A-Za-z0-9_]*)\\b",
    "\\b([a-zA-Z_$][\\w$]*)(?=\\()",
  ].join("|"),
  "g",
);

const CLASS_BY_GROUP = [
  "",
  "tok-comment",
  "tok-string",
  "tok-keyword",
  "tok-number",
  "tok-type",
  "tok-fn",
];

function highlight(line: string, keyPrefix: string) {
  const out: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;

  TOKEN_PATTERN.lastIndex = 0;
  while ((match = TOKEN_PATTERN.exec(line)) !== null) {
    if (match.index > last) out.push(line.slice(last, match.index));
    const group = match.findIndex((v, i) => i > 0 && v !== undefined);
    out.push(
      <span
        key={`${keyPrefix}-${match.index}`}
        className={CLASS_BY_GROUP[group] ?? ""}
      >
        {match[0]}
      </span>,
    );
    last = match.index + match[0].length;
  }
  if (last < line.length) out.push(line.slice(last));
  return out;
}

/* ---------------- the app the code produces ---------------- */

const EXTRACT_FIELDS = [
  { label: "Vendor", value: "Meridian Textiles", score: 0.98 },
  { label: "Invoice no.", value: "INV-8842", score: 0.96 },
  { label: "Date", value: "12 Aug 2026", score: 0.94 },
  { label: "Total", value: "€ 14,208.50", score: 0.62 },
];

const GRID_ROWS = [
  { po: "PO-4471", vendor: "Meridian", qty: 1200, status: "Approved" },
  { po: "PO-4472", vendor: "Halcyon", qty: 340, status: "In review" },
  { po: "PO-4473", vendor: "Northbay", qty: 980, status: "Approved" },
  { po: "PO-4474", vendor: "Meridian", qty: 75, status: "Draft" },
];

const REGISTER_ROWS = [
  { name: "Ayesha Khan", state: "present", edited: false },
  { name: "Bilal Raza", state: "present", edited: false },
  { name: "Fatima Sheikh", state: "absent", edited: true },
  { name: "Hamza Tariq", state: "present", edited: false },
];

const row = (i: number) => ({ "--i": i }) as React.CSSProperties;

function AppBody({ scene }: { scene: Scene }) {
  if (scene.app === "extract") {
    return (
      <>
        {EXTRACT_FIELDS.map((f, i) => {
          const low = f.score < 0.7;
          return (
            <div
              className={`web-row web-row--field${low ? " is-flagged" : ""}`}
              key={f.label}
              style={row(i + 1)}
            >
              <span className="web-row__label">{f.label}</span>
              <span className="web-row__value">{f.value}</span>
              <span className={`web-pill ${low ? "is-warn" : "is-ok"}`}>
                {low ? "needs review" : f.score.toFixed(2)}
              </span>
            </div>
          );
        })}
        <div className="web-foot" style={row(EXTRACT_FIELDS.length + 1)}>
          <Icon icon="mdi:shield-check-outline" />3 fields committed · 1 held
          for review
        </div>
      </>
    );
  }

  if (scene.app === "grid") {
    return (
      <>
        <div className="web-row web-row--head web-row--grid" style={row(1)}>
          <span>PO</span>
          <span>Vendor</span>
          <span>Qty</span>
          <span>Status</span>
        </div>
        {GRID_ROWS.map((r, i) => (
          <div
            className={`web-row web-row--grid${i === 1 ? " is-updating" : ""}`}
            key={r.po}
            style={row(i + 2)}
          >
            <span className="web-row__value">{r.po}</span>
            <span>{r.vendor}</span>
            <span className="web-num">{r.qty.toLocaleString()}</span>
            <span
              className={`web-pill ${
                r.status === "Approved"
                  ? "is-ok"
                  : r.status === "In review"
                    ? "is-warn"
                    : "is-mute"
              }`}
            >
              {r.status}
            </span>
          </div>
        ))}
        <div className="web-foot" style={row(GRID_ROWS.length + 2)}>
          <Icon icon="mdi:lightning-bolt-outline" />
          live over websocket · no refetch
        </div>
      </>
    );
  }

  return (
    <>
      {REGISTER_ROWS.map((r, i) => (
        <div className="web-row web-row--field" key={r.name} style={row(i + 1)}>
          <span className="web-row__value">{r.name}</span>
          <span className="web-row__label">
            {r.edited ? (
              <span className="web-edited">
                <Icon icon="mdi:history" />
                edited 09:14
              </span>
            ) : null}
          </span>
          <span
            className={`web-pill ${r.state === "present" ? "is-ok" : "is-warn"}`}
          >
            {r.state}
          </span>
        </div>
      ))}
      <div className="web-foot" style={row(REGISTER_ROWS.length + 1)}>
        <Icon icon="mdi:history" />
        every correction keeps its trail
      </div>
    </>
  );
}

/* ---------------- the panel ---------------- */

export function CodeToApp() {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState(0);
  const [stage, setStage] = useState<Stage>("writing");
  const [animate, setAnimate] = useState(true);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const scene = SCENES[index];
  const fullText = useMemo(() => scene.lines.join("\n"), [scene]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setAnimate(!query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    clearTimers();
    setStage("writing");

    if (!animate) {
      setTyped(fullText.length);
      timers.current.push(
        setTimeout(() => setStage("running"), RUN_MS),
        setTimeout(() => setIndex((i) => (i + 1) % SCENES.length), RUN_MS * 2),
      );
      return clearTimers;
    }

    // Time-driven: rAF pauses outright in a hidden tab where setInterval only
    // throttles, and elapsed-time progress stays correct on return.
    setTyped(0);
    let raf = 0;
    let startedAt: number | null = null;
    let shown = -1;

    const step = (ts: number) => {
      if (startedAt === null) startedAt = ts;
      const chars = Math.min(
        Math.floor((ts - startedAt) / TYPE_MS),
        fullText.length,
      );
      if (chars !== shown) {
        shown = chars;
        setTyped(chars);
      }
      if (chars >= fullText.length) {
        timers.current.push(
          setTimeout(() => setStage("building"), SETTLE_MS),
          setTimeout(() => setStage("running"), SETTLE_MS + BUILD_MS),
          setTimeout(
            () => setIndex((i) => (i + 1) % SCENES.length),
            SETTLE_MS + BUILD_MS + RUN_MS,
          ),
        );
        return;
      }
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      clearTimers();
    };
  }, [fullText, animate, clearTimers]);

  const visible = fullText.slice(0, typed).split("\n");
  const done = typed >= fullText.length;

  return (
    <div className={`c2a is-${stage}`} aria-hidden="true">
      {ORBIT.map((o, i) => (
        <span
          className="c2a__orbit"
          key={o.name}
          style={
            {
              "--x": o.x,
              "--y": o.y,
              "--size": `${o.size}rem`,
              animationDuration: `${o.dur}s`,
              animationDelay: `${i * 0.6}s`,
            } as React.CSSProperties
          }
        >
          <Icon icon={o.icon} />
        </span>
      ))}

      <div className="c2a__panel">
        <div className="c2a__chrome">
          <span className="c2a__dots">
            <i style={{ background: "#ff5f57" }} />
            <i style={{ background: "#febc2e" }} />
            <i style={{ background: "#28c840" }} />
          </span>

          <span className="c2a__slot">
            <span className="c2a__file">{scene.file}</span>
            <span className="c2a__url">
              <Icon icon="mdi:lock" />
              {scene.url}
            </span>
          </span>

          <span className="c2a__tag">
            {stage === "running" ? <i className="c2a__dot" /> : null}
            {stage === "running" ? "live" : stage}
          </span>
        </div>

        <span className="c2a__progress" />

        <div className="c2a__body">
          {/* the editor */}
          <pre className="c2a__code">
            {Array.from({ length: MAX_LINES }, (_, i) => {
              const text = visible[i];
              const caret = !done && i === visible.length - 1;
              return (
                <span className="c2a__line" key={i} style={row(i)}>
                  <span className="c2a__ln">
                    {text !== undefined ? i + 1 : ""}
                  </span>
                  <code>
                    {text !== undefined ? highlight(text, `${index}-${i}`) : ""}
                    {caret ? <span className="c2a__caret" /> : null}
                  </code>
                </span>
              );
            })}
          </pre>

          {/* the running web app */}
          <div className="c2a__web">
            <aside className="web-side">
              <span className="web-side__mark" style={row(0)} />
              <span className="web-side__item is-active" style={row(1)}>
                <Icon icon="mdi:view-grid-outline" />
              </span>
              <span className="web-side__item" style={row(2)}>
                <Icon icon="mdi:file-document-outline" />
              </span>
              <span className="web-side__item" style={row(3)}>
                <Icon icon="mdi:chart-line" />
              </span>
              <span className="web-side__item" style={row(4)}>
                <Icon icon="mdi:cog-outline" />
              </span>
            </aside>

            <div className="web-main">
              <header className="web-head" style={row(0)}>
                <span className="web-head__title">
                  <Icon icon={scene.appIcon} />
                  {scene.appTitle}
                </span>
                <span className="web-head__tools">
                  <span className="web-search">
                    <Icon icon="mdi:magnify" />
                    Search
                  </span>
                  <span className="web-avatar">HA</span>
                </span>
              </header>

              <div className="web-rows">
                <AppBody scene={scene} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
