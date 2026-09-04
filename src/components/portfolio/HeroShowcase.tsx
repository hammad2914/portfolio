"use client";

import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

/**
 * Hero visual, staged the way a product site presents a screenshot: the editor
 * is tilted in perspective and bled off the right edge, stat cards float over
 * it, stack marks sit at the corners. Flat, centred, fully-contained versions
 * of this read as a pasted screenshot rather than a composition.
 *
 * The code has a left gutter so the cards overlay the window without ever
 * covering a line — the code is the interesting part of the picture.
 *
 * hx- prefixed: hs-* already belongs to the template (hs-text-box, hs-banner)
 * and btn/nav/card collide with Bootstrap.
 */

const CODE = [
  "export function useGridSync(module: string) {",
  "  const [rows, setRows] = useState<Row[]>([]);",
  "",
  "  useEffect(() => {",
  "    const socket = connect(`/ws/${module}`);",
  "",
  "    // 50k rows stay live, no refetch",
  "    socket.on('row:update', (row) => {",
  "      setRows((prev) => merge(prev, row));",
  "    });",
  "",
  "    return () => socket.close();",
  "  }, [module]);",
  "",
  "  return rows;",
  "}",
];

/** Facts, phrased so they can't be mistaken for placeholder data. */
const CARDS = [
  {
    label: "Production systems",
    value: "8",
    note: "shipped since 2023",
    modifier: "hx-card--one",
  },
  {
    label: "Live products",
    value: "2",
    note: "Okulium · Law in Action",
    modifier: "hx-card--two",
  },
  {
    label: "Largest dataset",
    value: "50,000",
    note: "rows, no UI lag",
    modifier: "hx-card--three",
  },
];

/** Core stack, matching the skills section and the résumé. */
const MARKS = [
  { icon: "logos:react", name: "React", modifier: "hx-mark--a" },
  { icon: "logos:nodejs-icon", name: "Node.js", modifier: "hx-mark--b" },
  { icon: "logos:postgresql", name: "PostgreSQL", modifier: "hx-mark--c" },
  { icon: "logos:typescript-icon", name: "TypeScript", modifier: "hx-mark--d" },
  { icon: "logos:nestjs", name: "NestJS", modifier: "hx-mark--e" },
];

const TYPE_MS = 22;
const HOLD_MS = 5000;

const escapeHtml = (t: string) =>
  t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Small tokenizer — a highlighting library isn't worth its weight here. */
function paint(line: string) {
  return escapeHtml(line)
    .replace(/(\/\/.*)$/, '<i class="hx-cm">$1</i>')
    .replace(
      /\b(export|function|const|return|new)\b/g,
      '<i class="hx-kw">$1</i>',
    )
    .replace(/('[^']*'|`[^`]*`)/g, '<i class="hx-st">$1</i>')
    .replace(/\b(\d[\d,]*k?)\b/g, '<i class="hx-nu">$1</i>')
    .replace(/\b([A-Z][A-Za-z0-9]*)\b/g, '<i class="hx-ty">$1</i>');
}

const FULL = CODE.join("\n");

export function HeroShowcase() {
  // Start on the first line rather than empty, so the panel is never blank —
  // a bare frame is what a thumbnail and a skimming visitor would catch.
  const [typed, setTyped] = useState(CODE[0].length);
  const [cycle, setCycle] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setAnimate(!query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!animate) {
      setTyped(FULL.length);
      return;
    }

    setTyped(0);
    let raf = 0;
    let startedAt: number | null = null;
    let shown = -1;
    let restart: ReturnType<typeof setTimeout> | undefined;

    // Time-driven: rAF pauses outright in a hidden tab where setInterval only
    // throttles, and elapsed-time progress stays correct on return.
    const step = (ts: number) => {
      if (startedAt === null) startedAt = ts;
      const chars = Math.min(
        Math.floor((ts - startedAt) / TYPE_MS),
        FULL.length,
      );
      if (chars !== shown) {
        shown = chars;
        setTyped(chars);
      }
      if (chars >= FULL.length) {
        restart = setTimeout(() => setCycle((c) => c + 1), HOLD_MS);
        return;
      }
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      if (restart) clearTimeout(restart);
    };
  }, [animate, cycle]);

  const visible = FULL.slice(0, typed).split("\n");
  const typing = typed < FULL.length;

  return (
    <div className="hx" aria-hidden="true">
      <span className="hx-glow" />

      <div className="hx-stage">
        <div className="hx-win">
          <div className="hx-bar">
            <span className="hx-dots">
              <i />
              <i />
              <i />
            </span>
            <span className="hx-file">useGridSync.ts</span>
          </div>

          <pre className="hx-code">
            {CODE.map((_, i) => {
              const text = visible[i];
              return (
                <span className="hx-line" key={i}>
                  <span className="hx-ln">
                    {text !== undefined ? i + 1 : ""}
                  </span>
                  <code
                    dangerouslySetInnerHTML={{
                      __html: text !== undefined ? paint(text) : "",
                    }}
                  />
                  {typing && i === visible.length - 1 ? (
                    <span className="hx-caret" />
                  ) : null}
                </span>
              );
            })}
          </pre>
        </div>
      </div>

      {CARDS.map((c, i) => (
        <div
          className={`hx-card ${c.modifier}`}
          key={c.label}
          style={{ animationDelay: `${i * 0.8}s` }}
        >
          <span className="hx-card__label">{c.label}</span>
          <strong>{c.value}</strong>
          <span className="hx-card__note">{c.note}</span>
        </div>
      ))}

      {MARKS.map((m, i) => (
        <span
          className={`hx-mark ${m.modifier}`}
          key={m.name}
          title={m.name}
          style={{ animationDelay: `${i * 0.5}s` }}
        >
          <Icon icon={m.icon} />
        </span>
      ))}
    </div>
  );
}
