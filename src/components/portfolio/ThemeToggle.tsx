"use client";

import { Icon } from "@iconify/react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      title={theme === "dark" ? "Light mode" : "Dark mode"}
    >
      <Icon icon={theme === "dark" ? "bi:sun-fill" : "bi:moon-stars-fill"} />
    </button>
  );
}
