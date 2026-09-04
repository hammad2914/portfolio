"use client";

import { Icon } from "@iconify/react";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Hero visual: the code is written, a terminal builds and deploys it, and the
 * panel opens on the running product. Decorative — the hero copy carries the
 * message.
 *
 * Every class is `hj`-prefixed: the natural names here (btn, nav, app, main,
 * side, row, p) all collide with Bootstrap or the base template stylesheet.
 *
 * The screen is dense on purpose — a nav, KPIs, filters, selection and
 * pagination are what make it read as real software rather than a mockup — so
 * it is authored at a fixed design size and scaled to fit its column.
 */

const DESIGN_W = 620;
const DESIGN_H = 434;

const CODE = [
  "export function useGridSync(module: string) {",
  "  const [rows, setRows] = useState<Row[]>([]);",
  "",
  "  useEffect(() => {",
  "    const socket = connect(`/ws/${module}`);",
  "",
  "    // 50k rows stay live without a refetch",
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

const TERMINAL = [
  { text: "$ npm run build", tone: "prompt" },
  { text: "  ✓ compiled 9 modules in 1.2s", tone: "ok" },
  { text: "  ✓ bundle 41.2 kB gzipped", tone: "ok" },
  { text: "$ deploy --prod", tone: "prompt" },
  { text: "  ✓ live at cortex.app", tone: "ok" },
];

const ROWS = [
  {
    po: "PO-4471",
    vendor: "Meridian Textiles",
    initial: "M",
    colour: "#7c3aed",
    qty: "1,200",
    value: "€84,120",
    status: "Approved",
    tone: "ok",
    selected: true,
  },
  {
    po: "PO-4472",
    vendor: "Halcyon Mills",
    initial: "H",
    colour: "#0891b2",
    qty: "340",
    value: "€22,780",
    status: "In review",
    tone: "wa",
  },
  {
    po: "PO-4473",
    vendor: "Northbay Supply",
    initial: "N",
    colour: "#c2410c",
    qty: "980",
    value: "€61,405",
    status: "Approved",
    tone: "ok",
  },
  {
    po: "PO-4474",
    vendor: "Meridian Textiles",
    initial: "M",
    colour: "#7c3aed",
    qty: "75",
    value: "€5,240",
    status: "Draft",
    tone: "mu",
  },
];

const NAV = [
  { label: "Dashboard", icon: "mdi:view-grid-outline" },
  { label: "Orders", icon: "mdi:cart-outline", active: true },
  { label: "Vendors", icon: "mdi:account-group-outline" },
  { label: "Reports", icon: "mdi:chart-bar" },
  { label: "Settings", icon: "mdi:cog-outline" },
];

const TILES = [
  {
    label: "Open",
    value: "1,284",
    delta: "+4.1%",
    up: true,
    points: [4, 6, 5, 8, 7, 11, 13],
    colour: "#0f7ae5",
  },
  {
    label: "Awaiting approval",
    value: "96",
    delta: "−12%",
    up: false,
    points: [9, 8, 9, 6, 7, 5, 4],
    colour: "#d97706",
  },
  {
    label: "Value this month",
    value: "€4.2M",
    delta: "+12.4%",
    up: true,
    points: [3, 5, 4, 6, 8, 9, 12],
    colour: "#16a34a",
  },
];

const TYPE_MS = 13;
const SETTLE_MS = 380;
const LOG_STEP_MS = 320;
const DEPLOY_PAUSE_MS = 420;
const LIVE_MS = 5200;

type Stage = "editing" | "building" | "live";

const TOKEN_PATTERN =
  /(\/\/[^\n]*)|('[^']*'|"[^"]*")|\b(export|const|function|return|new)\b|\b(\d+)\b|\b([A-Z][A-Za-z0-9]*)\b|\b([a-zA-Z_$][\w$]*)(?=\()/g;

const TOKEN_CLASS = ["", "hj-c", "hj-s", "hj-k", "hj-nu", "hj-ty", "hj-fn"];

function highlight(line: string, keyPrefix: string) {
  const out: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;

  TOKEN_PATTERN.lastIndex = 0;
  while ((match = TOKEN_PATTERN.exec(line)) !== null) {
    if (match.index > last) out.push(line.slice(last, match.index));
    const group = match.findIndex((v, i) => i > 0 && v !== undefined);
    out.push(
      <span key={`${keyPrefix}-${match.index}`} className={TOKEN_CLASS[group]}>
        {match[0]}
      </span>,
    );
    last = match.index + match[0].length;
  }
  if (last < line.length) out.push(line.slice(last));
  return out;
}

function Sparkline({ points, colour }: { points: number[]; colour: string }) {
  const w = 58;
  const h = 14;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const span = max - min || 1;
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / span) * h;
      return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <path
        d={d}
        stroke={colour}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CodeToApp() {
  const [typed, setTyped] = useState(0);
  const [stage, setStage] = useState<Stage>("editing");
  const [logs, setLogs] = useState(0);
  const [revealed, setRevealed] = useState(0);
  const [flash, setFlash] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [animate, setAnimate] = useState(true);

  const fitRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  // Scale the fixed-size screen down to whatever the hero column gives us.
  useEffect(() => {
    const node = fitRef.current;
    if (!node) return;

    const apply = () => {
      const scale = Math.min(1, node.clientWidth / DESIGN_W);
      node.style.setProperty("--hj-fit", String(scale));
      node.style.height = `${DESIGN_H * scale}px`;
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(node);
    return () => observer.disconnect();
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
    setStage("editing");
    setLogs(0);
    setRevealed(0);
    setFlash(false);

    const full = CODE.join("\n");

    // Reduced motion: rest on the finished product, no typing or build.
    if (!animate) {
      setTyped(full.length);
      setStage("live");
      setRevealed(99);
      return clearTimers;
    }

    setTyped(0);
    let raf = 0;
    let startedAt: number | null = null;
    let shown = -1;

    const runBuild = () => {
      timers.current.push(
        setTimeout(() => setStage("building"), SETTLE_MS),
        ...TERMINAL.map((_, i) =>
          setTimeout(() => setLogs(i + 1), SETTLE_MS + 200 + i * LOG_STEP_MS),
        ),
      );

      const deployAt =
        SETTLE_MS + 200 + TERMINAL.length * LOG_STEP_MS + DEPLOY_PAUSE_MS;

      timers.current.push(
        setTimeout(() => setStage("live"), deployAt),
        ...Array.from({ length: 11 }, (_, i) =>
          setTimeout(() => setRevealed(i + 1), deployAt + 60 * i),
        ),
        setTimeout(() => setFlash(true), deployAt + 1500),
        setTimeout(() => setCycle((c) => c + 1), deployAt + LIVE_MS),
      );
    };

    const step = (ts: number) => {
      if (startedAt === null) startedAt = ts;
      const chars = Math.min(
        Math.floor((ts - startedAt) / TYPE_MS),
        full.length,
      );
      if (chars !== shown) {
        shown = chars;
        setTyped(chars);
      }
      if (chars >= full.length) {
        runBuild();
        return;
      }
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      clearTimers();
    };
  }, [cycle, animate, clearTimers]);

  const full = CODE.join("\n");
  const visible = full.slice(0, typed).split("\n");
  const typing = typed < full.length;
  const live = stage === "live";

  const seen = (order: number) => (revealed > order ? " hj-in" : "");

  return (
    <div className="hj" ref={fitRef} aria-hidden="true">
      <div className={`hj__screen hj--${stage}`}>
        <div className="hj__bar">
          <span className="hj__dots">
            <i style={{ background: "#ff5f57" }} />
            <i style={{ background: "#febc2e" }} />
            <i style={{ background: "#28c840" }} />
          </span>

          <span className="hj__slot">
            <span className="hj__file">useGridSync.ts</span>
            <span className="hj__url">
              <Icon icon="mdi:lock" />
              <b>cortex.app</b>/purchase-orders
            </span>
          </span>

          <span className="hj__tag">
            {live ? <i className="hj__pulse" /> : null}
            {stage === "editing"
              ? "editing"
              : stage === "building"
                ? "building"
                : "live"}
          </span>
        </div>

        <div className="hj__body">
          {/* the editor */}
          <pre className="hj__code">
            {CODE.map((_, i) => {
              const text = visible[i];
              const caret = typing && i === visible.length - 1;
              return (
                <span className="hj__line" key={i}>
                  <span className="hj__ln">
                    {text !== undefined ? i + 1 : ""}
                  </span>
                  <span className="hj__src">
                    {text !== undefined ? highlight(text, `${cycle}-${i}`) : ""}
                    {caret ? <span className="hj__caret" /> : null}
                  </span>
                </span>
              );
            })}
          </pre>

          {/* the build */}
          <div className={`hj__term${stage === "building" ? " hj-up" : ""}`}>
            {TERMINAL.map((l, i) => (
              <div
                className={`hj__log hj-${l.tone}${i < logs ? " hj-in" : ""}`}
                key={l.text}
              >
                {l.text}
              </div>
            ))}
          </div>

          {/* the product */}
          <div className={`hj__app${live ? " hj-on" : ""}`}>
            <aside className="hj-side">
              <div className="hj-brand">
                <span className="hj-brand__sq">C</span>
                <span>Cortex</span>
              </div>
              {NAV.map((n) => (
                <span
                  className={`hj-nav${n.active ? " hj-act" : ""}`}
                  key={n.label}
                >
                  <Icon icon={n.icon} />
                  {n.label}
                </span>
              ))}
              <span className="hj-side__gap" />
              <div className="hj-quota">
                <b>Sync 68%</b>
                <span className="hj-quota__track">
                  <span className="hj-quota__fill" />
                </span>
              </div>
            </aside>

            <div className="hj-main">
              <div className={`hj-topbar${seen(0)}`}>
                <span className="hj-crumb">
                  Procurement / <b>Purchase orders</b>
                </span>
                <span className="hj-tools">
                  <span className="hj-search">
                    <Icon icon="mdi:magnify" />
                    Search orders
                  </span>
                  <span className="hj-iconbtn">
                    <Icon icon="mdi:bell-outline" />
                  </span>
                  <span className="hj-av">HA</span>
                </span>
              </div>

              <div className={`hj-pagehead${seen(1)}`}>
                <h3>Purchase orders</h3>
                <span className="hj-btn">
                  <Icon icon="mdi:plus" />
                  New order
                </span>
              </div>

              <div className="hj-tiles">
                {TILES.map((t, i) => (
                  <div className={`hj-tile${seen(2 + i)}`} key={t.label}>
                    <span className="hj-tile__lbl">{t.label}</span>
                    <span className="hj-tile__val">
                      {t.value}
                      <em className={t.up ? "hj-up" : "hj-dn"}>{t.delta}</em>
                    </span>
                    <Sparkline points={t.points} colour={t.colour} />
                  </div>
                ))}
              </div>

              <div className={`hj-tabs${seen(5)}`}>
                <span className="hj-act">
                  All<em>50,000</em>
                </span>
                <span>Approved</span>
                <span>In review</span>
                <span>Draft</span>
              </div>

              <div className="hj-table">
                <div className={`hj-r hj-r--head${seen(5)}`}>
                  <span />
                  <span>PO</span>
                  <span>Vendor</span>
                  <span className="hj-num">Qty</span>
                  <span className="hj-num">Value</span>
                  <span>Status</span>
                  <span />
                </div>
                {ROWS.map((r, i) => (
                  <div
                    className={`hj-r${r.selected ? " hj-sel" : ""}${seen(
                      6 + i,
                    )}${flash && i === 1 ? " hj-flash" : ""}`}
                    key={r.po}
                  >
                    <span className="hj-cbx" />
                    <span>
                      <b>{r.po}</b>
                    </span>
                    <span className="hj-vend">
                      <span
                        className="hj-vend__ini"
                        style={{ background: r.colour }}
                      >
                        {r.initial}
                      </span>
                      <span>{r.vendor}</span>
                    </span>
                    <span className="hj-num">{r.qty}</span>
                    <span className="hj-num">
                      <b>{r.value}</b>
                    </span>
                    <span className={`hj-p hj-${r.tone}`}>
                      <i />
                      {r.status}
                    </span>
                    <span className="hj-more">⋯</span>
                  </div>
                ))}
              </div>

              <div className={`hj-tfoot${seen(10)}`}>
                <span>Showing 1–4 of 50,000</span>
                <span className="hj-livechip">
                  <i />
                  live over websocket
                </span>
                <span className="hj-pages">
                  <em>‹</em>
                  <b>1</b>
                  <em>2</em>
                  <em>3</em>
                  <em>›</em>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
