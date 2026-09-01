"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const sm = useRef<HTMLDivElement>(null);
  const lg = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const state = useRef({
    mouseX: 0,
    mouseY: 0,
    destinationX: 0,
    destinationY: 0,
    distanceX: 0,
    distanceY: 0,
    key: -1,
  });

  // Only run on devices with a real pointer — on touch it does nothing but burn
  // a rAF loop, and users who ask for reduced motion shouldn't get a trailing dot.
  useEffect(() => {
    const query = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const sync = () => setEnabled(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const cursorState = state.current;

    const onMove = (e: MouseEvent) => {
      const s = cursorState;
      if (!lg.current) return;
      s.mouseX = e.clientX - lg.current.clientWidth / 2;
      s.mouseY = e.clientY - lg.current.clientHeight / 2;
    };

    document.addEventListener("mousemove", onMove);

    const tick = () => {
      cursorState.key = requestAnimationFrame(tick);
      const s = cursorState;
      if (!sm.current || !lg.current) return;

      if (s.destinationX && s.destinationY) {
        s.distanceX = 0.1 * (s.mouseX - s.destinationX);
        s.distanceY = 0.1 * (s.mouseY - s.destinationY);
        if (Math.abs(s.distanceX) + Math.abs(s.distanceY) < 0.1) {
          s.destinationX = s.mouseX;
          s.destinationY = s.mouseY;
        } else {
          s.destinationX += s.distanceX;
          s.destinationY += s.distanceY;
        }
      } else {
        s.destinationX = s.mouseX;
        s.destinationY = s.mouseY;
      }

      const transform = `translate3d(${s.destinationX}px, ${s.destinationY}px, 0)`;
      sm.current.style.transform = transform;
      lg.current.style.transform = transform;
    };

    tick();

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(cursorState.key);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div className="cs-cursor_lg" ref={lg} aria-hidden="true" />
      <div className="cs-cursor_sm" ref={sm} aria-hidden="true" />
    </>
  );
}
