"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const sm = useRef<HTMLDivElement>(null);
  const lg = useRef<HTMLDivElement>(null);
  const state = useRef({
    mouseX: 0,
    mouseY: 0,
    destinationX: 0,
    destinationY: 0,
    distanceX: 0,
    distanceY: 0,
    key: -1,
  });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const s = state.current;
      if (!sm.current || !lg.current) return;
      s.mouseX = e.clientX - sm.current.clientWidth / 2;
      s.mouseY = e.clientY - sm.current.clientHeight / 2;
      s.mouseX = e.clientX - lg.current.clientWidth / 2;
      s.mouseY = e.clientY - lg.current.clientHeight / 2;
    };

    document.addEventListener("mousemove", onMove);

    const tick = () => {
      state.current.key = requestAnimationFrame(tick);
      const s = state.current;
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

      sm.current.style.transform = `translate3d(${s.destinationX}px, ${s.destinationY}px, 0)`;
      lg.current.style.transform = `translate3d(${s.destinationX}px, ${s.destinationY}px, 0)`;
    };

    tick();

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(state.current.key);
    };
  }, []);

  return (
    <>
      <div className="cs-cursor_lg" ref={lg} />
      <div className="cs-cursor_sm" ref={sm} />
    </>
  );
}
