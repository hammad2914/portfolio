"use client";

import { Icon } from "@iconify/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Hero visual: a panel that types out code, then flips to the interface that
 * code actually produces. Three scenes, each drawn from a system described
 * further down the page. Decorative — the hero copy carries the message.
 */

type Scene = {
  file: string;
  lines: string[];
  app: "extract" | "grid" | "register";
};

const SCENES: Scene[] = [
  {
    file: "extraction.service.ts",
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
const HOLD_CODE_MS = 850;
const HOLD_APP_MS = 3400;

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
  { name: "Ayesha K.", state: "present" },
  { name: "Bilal R.", state: "present" },
  { name: "Fatima S.", state: "absent", edited: true },
  { name: "Hamza T.", state: "present" },
];

function AppFace({ app }: { app: Scene["app"] }) {
  if (app === "extract") {
    return (
      <div className="c2a-app">
        <div className="c2a-app__bar">
          <span className="c2a-app__doc">
            <Icon icon="mdi:file-pdf-box" />
            invoice-8842.pdf
          </span>
          <span className="c2a-pill c2a-pill--info">Extracted</span>
        </div>
        <div className="c2a-app__body">
          {EXTRACT_FIELDS.map((f, i) => {
            const low = f.score < 0.7;
            return (
              <div
                className="c2a-field"
                key={f.label}
                style={{ animationDelay: `${0.12 * i}s` }}
              >
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
        </div>
        <div className="c2a-app__foot">
          <Icon icon="mdi:shield-check-outline" />3 committed · 1 held for
          review
        </div>
      </div>
    );
  }

  if (app === "grid") {
    return (
      <div className="c2a-app">
        <div className="c2a-app__bar">
          <span className="c2a-app__doc">
            <Icon icon="mdi:table-large" />
            Purchase Orders
          </span>
          <span className="c2a-live">
            <i />
            50,000 rows
          </span>
        </div>
        <div className="c2a-app__body c2a-app__body--grid">
          <div className="c2a-row c2a-row--head">
            <span>PO</span>
            <span>Vendor</span>
            <span>Qty</span>
            <span>Status</span>
          </div>
          {GRID_ROWS.map((r, i) => (
            <div
              className={`c2a-row${i === 1 ? " is-updating" : ""}`}
              key={r.po}
              style={{ animationDelay: `${0.1 * i}s` }}
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
        </div>
        <div className="c2a-app__foot">
          <Icon icon="mdi:lightning-bolt-outline" />
          live over websocket · no refetch
        </div>
      </div>
    );
  }

  return (
    <div className="c2a-app">
      <div className="c2a-app__bar">
        <span className="c2a-app__doc">
          <Icon icon="mdi:clipboard-check-outline" />
          Class 7-B · Today
        </span>
        <span className="c2a-pill c2a-pill--info">Branch: Clifton</span>
      </div>
      <div className="c2a-app__body">
        {REGISTER_ROWS.map((r, i) => (
          <div
            className="c2a-field"
            key={r.name}
            style={{ animationDelay: `${0.12 * i}s` }}
          >
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
      </div>
      <div className="c2a-app__foot">
        <Icon icon="mdi:history" />
        every correction keeps its trail
      </div>
    </div>
  );
}

/* ---------------- the panel ---------------- */

export function CodeToApp() {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState(0);
  const [flipped, setFlipped] = useState(false);
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
    setFlipped(false);

    // Reduced motion: hold each side, no typing and no flip animation.
    if (!animate) {
      setTyped(fullText.length);
      timers.current.push(
        setTimeout(() => setFlipped(true), HOLD_APP_MS),
        setTimeout(
          () => setIndex((i) => (i + 1) % SCENES.length),
          HOLD_APP_MS * 2,
        ),
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
        // code is written -> run it -> show what it renders -> next scene
        timers.current.push(
          setTimeout(() => setFlipped(true), HOLD_CODE_MS),
          setTimeout(
            () => setIndex((i) => (i + 1) % SCENES.length),
            HOLD_CODE_MS + HOLD_APP_MS,
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
    <div className="c2a" aria-hidden="true">
      <div className={`c2a__stage${flipped ? " is-flipped" : ""}`}>
        {/* front: the code */}
        <div className="c2a__face c2a__face--code">
          <div className="c2a__chrome">
            <span className="c2a__dots">
              <i style={{ background: "#ff5f57" }} />
              <i style={{ background: "#febc2e" }} />
              <i style={{ background: "#28c840" }} />
            </span>
            <span className="c2a__file">{scene.file}</span>
          </div>
          <pre className="c2a__code">
            {Array.from({ length: MAX_LINES }, (_, i) => {
              const text = visible[i];
              const isCaretLine = !done && i === visible.length - 1;
              return (
                <span className="c2a__line" key={i}>
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
        </div>

        {/* back: what it renders */}
        <div className="c2a__face c2a__face--app">
          <AppFace app={scene.app} />
        </div>
      </div>
    </div>
  );
}
