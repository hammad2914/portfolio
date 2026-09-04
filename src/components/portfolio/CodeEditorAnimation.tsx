"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * Hero visual: one restrained editor window that types out snippets from the
 * systems described further down the page. Decorative — the hero copy carries
 * the message.
 */

type Snippet = {
  file: string;
  lines: string[];
};

const SNIPPETS: Snippet[] = [
  {
    file: "extraction.service.ts",
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

const MAX_LINES = Math.max(...SNIPPETS.map((s) => s.lines.length));
const TYPE_MS = 20;
const HOLD_MS = 2800;

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

  const snippet = SNIPPETS[snippetIndex];
  const fullText = useMemo(() => snippet.lines.join("\n"), [snippet]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setAnimate(!query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

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

  return (
    <div className="code-hero" aria-hidden="true">
      <div className="code-hero__window">
        <div className="code-hero__chrome">
          <span className="code-hero__dots">
            <i style={{ background: "#ff5f57" }} />
            <i style={{ background: "#febc2e" }} />
            <i style={{ background: "#28c840" }} />
          </span>
          <span className="code-hero__file">{snippet.file}</span>
        </div>

        <pre
          className="code-hero__code"
          style={{ minHeight: `${MAX_LINES * 1.6}em` }}
        >
          {Array.from({ length: MAX_LINES }, (_, i) => {
            const text = visible[i];
            const isCaretLine = !done && i === visible.length - 1;
            return (
              <span className="code-hero__line" key={i}>
                <span className="code-hero__ln">
                  {text !== undefined ? i + 1 : ""}
                </span>
                <code>
                  {text !== undefined
                    ? highlight(text, `${snippetIndex}-${i}`)
                    : ""}
                  {isCaretLine ? <span className="code-hero__caret" /> : null}
                </code>
              </span>
            );
          })}
        </pre>
      </div>
    </div>
  );
}
