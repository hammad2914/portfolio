"use client";

import { useEffect } from "react";
import AOS from "aos";

export function AosInit() {
  useEffect(() => {
    AOS.init({ once: true });
    const refresh = () => AOS.refresh();
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      AOS.refreshHard();
    };
  }, []);

  return null;
}
