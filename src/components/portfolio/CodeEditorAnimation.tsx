"use client";

import { Icon } from "@iconify/react";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Hero visual: an editor that types out snippets from the systems described
 * further down the page, ringed by floating stack marks that drift with the
 * pointer. Decorative — the hero copy carries the message.
 */

type Snippet = {
  file: string;
  icon: string;
  lang: string;
  lines: string[];
};

const SNIPPETS: Snippet[] = [
  {
    file: "extraction.service.ts",
    icon: "logos:nestjs",
    lang: "TypeScript",
    lines: [
      "@Injectable()",
      "export class ExtractionService {",
      "  async extract(doc: Buffer, client: string) {",
      "    const tpl = await this.templates.for(client);",
      "    const fields = await this.ai.parse(doc, tpl);",
      "",
      "    // a low-confidence read never reaches the ledger",
      "    return fields.some((f) => f.score < 0.7)",
      "      ? this.queueForReview(fields)",
      "      : this.commit(fields);",
      "  }",
      "}",
    ],
  },
  {
    file: "useGridSync.ts",
    icon: "logos:react",
    lang: "TypeScript React",
    lines: [
      "export function useGridSync(module: string) {",
      "  const [rows, setRows] = useState<Row[]>([]);",
      "",
      "  useEffect(() => {",
      "    const socket = connect(`/ws/${module}`);",
      "    // 50k rows stay live without a refetch",
      "    socket.on('row:update', (row) => {",
      "      setRows((prev) => merge(prev, row));",
      "    });",
      "    return () => socket.close();",
      "  }, [module]);",
      "",
      "  return rows;",
      "}",
    ],
  },
  {
    file: "attendance.query.ts",
    icon: "skill-icons:prisma",
    lang: "TypeScript",
    lines: [
      "// attendance is scoped to a branch,",
      "// never across the whole school group",
      "const register = await prisma.attendance.findMany({",
      "  where: { branchId, date: today },",
      "  include: {",
      "    edits: {",
      "      orderBy: { changedAt: 'desc' },",
      "      select: { changedBy: true, reason: true },",
      "    },",
      "  },",
      "});",
    ],
  },
];

/** Scattered around the frame, each with its own parallax depth and size. */
const FLOATS = [
  { name: "React", icon: "logos:react", x: 0, y: 20, depth: 2.4, size: 3.1 },
  {
    name: "Next.js",
    icon: "logos:nextjs-icon",
    x: 72,
    y: 0,
    depth: 1.5,
    size: 2.5,
  },
  {
    name: "TypeScript",
    icon: "logos:typescript-icon",
    x: 100,
    y: 38,
    depth: 3,
    size: 2.8,
  },
  { name: "NestJS", icon: "logos:nestjs", x: 0, y: 70, depth: 1.8, size: 2.6 },
  {
    name: "PostgreSQL",
    icon: "logos:postgresql",
    x: 100,
    y: 82,
    depth: 2.6,
    size: 3,
  },
  {
    name: "Docker",
    icon: "logos:docker-icon",
    x: 30,
    y: 100,
    depth: 1.4,
    size: 2.4,
  },
];

const MAX_LINES = Math.max(...SNIPPETS.map((s) => s.lines.length));
const TYPE_MS = 18;
const HOLD_MS = 2600;

const TOKEN_PATTERN = new RegExp(
  [
    "(\\/\\/[^\\n]*)",
    "(`[^`]*`|\"[^\"]*\"|'[^']*')",
    "(@\\w+)",
    "\\b(export|const|let|async|await|return|function|class|new|import|from|if|else|true|false|null|undefined)\\b",
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
  "tok-decorator",
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

export function CodeEditorAnimation() {
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [typed, setTyped] = useState(0);
  const [animate, setAnimate] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  const snippet = SNIPPETS[snippetIndex];
  const fullText = useMemo(() => snippet.lines.join("\n"), [snippet]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setAnimate(!query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Pointer parallax written straight to CSS variables, so drifting the marks
  // never triggers a React render.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !animate) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;

    let raf = 0;
    let px = 0;
    let py = 0;

    const onMove = (e: PointerEvent) => {
      const box = root.getBoundingClientRect();
      const nx = (e.clientX - (box.left + box.width / 2)) / (box.width / 2);
      const ny = (e.clientY - (box.top + box.height / 2)) / (box.height / 2);
      px = Math.max(-1, Math.min(1, nx));
      py = Math.max(-1, Math.min(1, ny));
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          root.style.setProperty("--par-x", px.toFixed(3));
          root.style.setProperty("--par-y", py.toFixed(3));
        });
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [animate]);

  useEffect(() => {
    if (!animate) {
      setTyped(fullText.length);
      const t = setTimeout(
        () => setSnippetIndex((i) => (i + 1) % SNIPPETS.length),
        HOLD_MS * 2,
      );
      return () => clearTimeout(t);
    }

    // Time-driven: rAF pauses outright in a hidden tab where setInterval only
    // throttles, and elapsed-time progress stays correct on return.
    setTyped(0);
    let raf = 0;
    let startedAt: number | null = null;
    let finishedAt: number | null = null;
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
        if (finishedAt === null) finishedAt = ts;
        if (ts - finishedAt >= HOLD_MS) {
          setSnippetIndex((i) => (i + 1) % SNIPPETS.length);
          return;
        }
      }
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [fullText, animate]);

  const visible = fullText.slice(0, typed).split("\n");
  const done = typed >= fullText.length;
  const caretLine = visible.length;
  const caretCol = (visible[visible.length - 1]?.length ?? 0) + 1;

  return (
    <div className="code-hero" ref={rootRef} aria-hidden="true">
      <span className="code-hero__aura" />

      {FLOATS.map((f, i) => (
        <span
          key={f.name}
          className="code-hero__float"
          style={
            {
              "--fx": f.x,
              "--fy": f.y,
              "--depth": f.depth,
              "--size": `${f.size}rem`,
            } as React.CSSProperties
          }
        >
          <span
            className="code-hero__float-inner"
            style={{
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${5 + (i % 3)}s`,
            }}
            title={f.name}
          >
            <Icon icon={f.icon} />
          </span>
        </span>
      ))}

      <div className="code-hero__frame">
        <div className="code-hero__window">
          <div className="code-hero__chrome">
            <span className="code-hero__dots">
              <i style={{ background: "#ff5f57" }} />
              <i style={{ background: "#febc2e" }} />
              <i style={{ background: "#28c840" }} />
            </span>
            <div className="code-hero__tabs">
              {SNIPPETS.map((s, i) => (
                <span
                  key={s.file}
                  className={`code-hero__tab${i === snippetIndex ? " is-active" : ""}`}
                >
                  <Icon icon={s.icon} />
                  <em>{s.file}</em>
                </span>
              ))}
            </div>
          </div>

          <div className="code-hero__body">
            <div className="code-hero__rail">
              <Icon icon="mdi:file-document-multiple-outline" />
              <Icon icon="mdi:magnify" />
              <Icon icon="mdi:source-branch" />
              <Icon icon="mdi:puzzle-outline" />
            </div>

            <pre
              className="code-hero__code"
              style={{ minHeight: `${MAX_LINES * 1.6}em` }}
            >
              {Array.from({ length: MAX_LINES }, (_, i) => {
                const text = visible[i];
                const isCaretLine = !done && i === visible.length - 1;
                return (
                  <span
                    className={`code-hero__line${isCaretLine ? " is-current" : ""}`}
                    key={i}
                  >
                    <span className="code-hero__ln">
                      {text !== undefined ? i + 1 : ""}
                    </span>
                    <code>
                      {text !== undefined
                        ? highlight(text, `${snippetIndex}-${i}`)
                        : ""}
                      {isCaretLine ? (
                        <span className="code-hero__caret" />
                      ) : null}
                    </code>
                  </span>
                );
              })}
            </pre>
          </div>

          <div className="code-hero__status">
            <span className="code-hero__status-group">
              <span className="code-hero__branch">
                <Icon icon="mdi:source-branch" />
                main
              </span>
              <span className="code-hero__ok">
                <Icon icon="mdi:check-circle-outline" />0 problems
              </span>
            </span>
            <span className="code-hero__status-group">
              <span>
                Ln {caretLine}, Col {caretCol}
              </span>
              <span className="code-hero__lang">{snippet.lang}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
