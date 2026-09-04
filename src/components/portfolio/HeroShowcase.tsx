"use client";

import { Icon } from "@iconify/react";

/**
 * Hero visual, staged the way a product site presents a screenshot: the editor
 * is tilted in perspective and bled off the right edge, stat cards float over
 * it, stack marks sit at the corners. Flat, centred, fully-contained versions
 * of this read as a pasted screenshot rather than a composition.
 *
 * The code renders in full rather than typing in — a typed reveal leaves the
 * panel blank on load, which is what a thumbnail and a skimming visitor see.
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

const CARDS = [
  {
    label: "In production",
    value: "8",
    note: "systems shipped",
    modifier: "hx-card--one",
  },
  {
    label: "Live now",
    value: "2",
    note: "Okulium · Law in Action",
    modifier: "hx-card--two",
  },
  {
    label: "AG Grid",
    value: "50,000",
    note: "rows, zero lag",
    modifier: "hx-card--three",
  },
];

const MARKS = [
  { icon: "logos:react", modifier: "hx-mark--a" },
  { icon: "logos:nestjs", modifier: "hx-mark--b" },
  { icon: "logos:postgresql", modifier: "hx-mark--c" },
  { icon: "logos:docker-icon", modifier: "hx-mark--d" },
];

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

export function HeroShowcase() {
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
            {CODE.map((line, i) => (
              <span className="hx-line" key={i}>
                <span className="hx-ln">{i + 1}</span>
                <code dangerouslySetInnerHTML={{ __html: paint(line) }} />
              </span>
            ))}
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
          key={m.icon}
          style={{ animationDelay: `${i * 0.6}s` }}
        >
          <Icon icon={m.icon} />
        </span>
      ))}
    </div>
  );
}
