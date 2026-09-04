"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Hero visual: code is written, it builds, and the panel resolves into the
 * system it produced. Decorative — the hero copy carries the message.
 *
 * Built from the template's own vocabulary rather than a foreign UI:
 *   .ex-box   translucent blue panel, 10px radius, 25px padding
 *   .ex-left  solid blue block, 8px radius
 *   .r-box    white-alpha stat card, 1px border, 8px radius
 * Type is Space Grotesk inherited from the page, labels uppercase with the
 * wide tracking the section mini-titles use. No window chrome anywhere.
 *
 * hj- prefixed because btn/nav/app/main/side/row/p all collide with Bootstrap
 * or the base template stylesheet, which loads after ours.
 */

const CODE = [
  "socket.on('row:update', (row) => {",
  "  setRows((prev) => merge(prev, row));",
  "});",
];

const BUILD = ["npm run build", "compiled 8 modules", "deployed to production"];

const STATS = [
  { value: "50,000", label: "Rows, zero lag" },
  { value: "8", label: "Modules synced" },
  { value: "70%", label: "Less processing" },
];

const TYPE_MS = 26;
const SETTLE_MS = 500;
const BUILD_STEP_MS = 620;
const LIVE_MS = 4200;

type Stage = "writing" | "building" | "live";

export function CodeToApp() {
  const [typed, setTyped] = useState(0);
  const [stage, setStage] = useState<Stage>("writing");
  const [steps, setSteps] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [animate, setAnimate] = useState(true);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

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
    setSteps(0);

    const full = CODE.join("\n");

    // Reduced motion: rest on the finished system.
    if (!animate) {
      setTyped(full.length);
      setStage("live");
      return clearTimers;
    }

    setTyped(0);
    let raf = 0;
    let startedAt: number | null = null;
    let shown = -1;

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
        timers.current.push(
          setTimeout(() => setStage("building"), SETTLE_MS),
          ...BUILD.map((_, i) =>
            setTimeout(() => setSteps(i + 1), SETTLE_MS + i * BUILD_STEP_MS),
          ),
        );
        const liveAt = SETTLE_MS + BUILD.length * BUILD_STEP_MS + 260;
        timers.current.push(
          setTimeout(() => setStage("live"), liveAt),
          setTimeout(() => setCycle((c) => c + 1), liveAt + LIVE_MS),
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
  }, [cycle, animate, clearTimers]);

  const full = CODE.join("\n");
  const visible = full.slice(0, typed).split("\n");
  const typing = typed < full.length;

  const caption =
    stage === "writing"
      ? "Writing"
      : stage === "building"
        ? "Building"
        : "In production";

  return (
    <div className={`hj hj--${stage}`} aria-hidden="true">
      <span className="hj__eyebrow">{caption}</span>

      <div className="hj__panel">
        {/* the solid blue block, the same one the experience cards use */}
        <div className="hj__mark">
          <strong>Cortex</strong>
          <span>AI-powered ERP</span>
          <em className="hj__live">Live</em>
        </div>

        <div className="hj__stack">
          {/* writing */}
          <pre className="hj__code">
            {CODE.map((_, i) => {
              const text = visible[i];
              return (
                <span className="hj__line" key={i}>
                  {text ?? ""}
                  {typing && i === visible.length - 1 ? (
                    <span className="hj__caret" />
                  ) : null}
                </span>
              );
            })}
          </pre>

          {/* building */}
          <ul className="hj__build">
            {BUILD.map((b, i) => (
              <li className={i < steps ? "hj-on" : ""} key={b}>
                <span className="hj__tick" />
                {b}
              </li>
            ))}
          </ul>

          {/* live */}
          <div className="hj__stats">
            {STATS.map((s, i) => (
              <div
                className="hj__stat"
                key={s.label}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
