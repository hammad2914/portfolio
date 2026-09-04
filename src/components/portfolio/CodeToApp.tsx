"use client";

import { Icon } from "@iconify/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Hero visual: one panel that walks a journey — the code is written, it
 * builds, and the same panel becomes the running interface that code
 * produces. Decorative — the hero copy carries the message.
 */

type Stage = "writing" | "building" | "running";

type Scene = {
  file: string;
  appTitle: string;
  appIcon: string;
  lines: string[];
  app: "extract" | "grid" | "register";
};

const SCENES: Scene[] = [
  {
    file: "extraction.service.ts",
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

const MAX_LINES = Math.max(...SCENES.map((s) => s.lines.length));
const TYPE_MS = 15;
const SETTLE_MS = 550;
const BUILD_MS = 1400;
const RUN_MS = 3800;

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

/* ---------------- the interfaces the code produces ---------------- */

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
  { name: "Ayesha K.", state: "present", edited: false },
  { name: "Bilal R.", state: "present", edited: false },
  { name: "Fatima S.", state: "absent", edited: true },
  { name: "Hamza T.", state: "present", edited: false },
];

function AppFace({ scene }: { scene: Scene }) {
  const rowStyle = (i: number) => ({ "--i": i }) as React.CSSProperties;

  if (scene.app === "extract") {
    return (
      <div className="c2a-app__rows">
        {EXTRACT_FIELDS.map((f, i) => {
          const low = f.score < 0.7;
          return (
            <div className="c2a-field" key={f.label} style={rowStyle(i)}>
              <span className="c2a-field__label">{f.label}</span>
              <span className="c2a-field__value">{f.value}</span>
              <span
                className={`c2a-pill ${low ? "c2a-pill--warn" : "c2a-pill--ok"}`}
              >
                {low ? "review" : f.score.toFixed(2)}
              </span>
            </div>
          );
        })}
        <div className="c2a-app__foot" style={rowStyle(EXTRACT_FIELDS.length)}>
          <Icon icon="mdi:shield-check-outline" />3 committed · 1 held for
          review
        </div>
      </div>
    );
  }

  if (scene.app === "grid") {
    return (
      <div className="c2a-app__rows">
        <div className="c2a-row c2a-row--head" style={rowStyle(0)}>
          <span>PO</span>
          <span>Vendor</span>
          <span>Qty</span>
          <span>Status</span>
        </div>
        {GRID_ROWS.map((r, i) => (
          <div
            className={`c2a-row${i === 1 ? " is-updating" : ""}`}
            key={r.po}
            style={rowStyle(i + 1)}
          >
            <span>{r.po}</span>
            <span>{r.vendor}</span>
            <span className="c2a-num">{r.qty.toLocaleString()}</span>
            <span
              className={`c2a-pill ${
                r.status === "Approved"
                  ? "c2a-pill--ok"
                  : r.status === "In review"
                    ? "c2a-pill--warn"
                    : "c2a-pill--mute"
              }`}
            >
              {r.status}
            </span>
          </div>
        ))}
        <div className="c2a-app__foot" style={rowStyle(GRID_ROWS.length + 1)}>
          <Icon icon="mdi:lightning-bolt-outline" />
          live over websocket · no refetch
        </div>
      </div>
    );
  }

  return (
    <div className="c2a-app__rows">
      {REGISTER_ROWS.map((r, i) => (
        <div className="c2a-field" key={r.name} style={rowStyle(i)}>
          <span className="c2a-field__label">{r.name}</span>
          <span className="c2a-field__value">
            {r.edited ? (
              <span className="c2a-edited">
                <Icon icon="mdi:history" />
                edited 09:14
              </span>
            ) : null}
          </span>
          <span
            className={`c2a-pill ${
              r.state === "present" ? "c2a-pill--ok" : "c2a-pill--warn"
            }`}
          >
            {r.state}
          </span>
        </div>
      ))}
      <div className="c2a-app__foot" style={rowStyle(REGISTER_ROWS.length)}>
        <Icon icon="mdi:history" />
        every correction keeps its trail
      </div>
    </div>
  );
}

/* ---------------- the panel ---------------- */

const STAGE_LABEL: Record<Stage, string> = {
  writing: "writing",
  building: "building",
  running: "live",
};

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

    // Reduced motion: hold each stage, no typing and no transitions.
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
        // written -> builds -> the same panel becomes the running app
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
  const running = stage === "running";

  return (
    <div className={`c2a is-${stage}`} aria-hidden="true">
      <div className="c2a__panel">
        <div className="c2a__chrome">
          <span className="c2a__dots">
            <i style={{ background: "#ff5f57" }} />
            <i style={{ background: "#febc2e" }} />
            <i style={{ background: "#28c840" }} />
          </span>

          <span className="c2a__titles">
            <span className="c2a__title c2a__title--file">{scene.file}</span>
            <span className="c2a__title c2a__title--app">
              <Icon icon={scene.appIcon} />
              {scene.appTitle}
            </span>
          </span>

          <span className={`c2a__stage-tag is-${stage}`}>
            {running ? <i className="c2a__live-dot" /> : null}
            {STAGE_LABEL[stage]}
          </span>
        </div>

        {/* the build sweep that carries code across into interface */}
        <span className="c2a__progress" />

        <div className="c2a__body">
          <pre className="c2a__code">
            {Array.from({ length: MAX_LINES }, (_, i) => {
              const text = visible[i];
              const isCaretLine = !done && i === visible.length - 1;
              return (
                <span
                  className="c2a__line"
                  key={i}
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <span className="c2a__ln">
                    {text !== undefined ? i + 1 : ""}
                  </span>
                  <code>
                    {text !== undefined ? highlight(text, `${index}-${i}`) : ""}
                    {isCaretLine ? <span className="c2a__caret" /> : null}
                  </code>
                </span>
              );
            })}
          </pre>

          <div className="c2a__app">
            <AppFace scene={scene} />
          </div>
        </div>
      </div>
    </div>
  );
}
