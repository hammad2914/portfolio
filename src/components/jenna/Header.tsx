"use client";

import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { socialLinks } from "@/data/jenna";
import { BrandLogo } from "./BrandLogo";
import { ThemeToggle } from "./ThemeToggle";

const nav = [
  { to: "home", label: "Home" },
  { to: "about", label: "About Me" },
  { to: "project", label: "Projects" },
  { to: "services", label: "Services" },
  { to: "skills", label: "Skills" },
  { to: "contactus", label: "Contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [fixed, setFixed] = useState(false);

  useEffect(() => {
    const onScroll = () => setFixed(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div
      className={`header-top-fixed one-page-nav ${menuOpen ? "menu-open menu-open-desk" : ""} ${fixed ? "fixed-header" : ""}`}
    >
      <div className="container">
        <div className="logo">
          <Link
            className="navbar-brand"
            to="home"
            spy
            smooth
            offset={-80}
            duration={500}
          >
            <BrandLogo />
          </Link>
        </div>

        <ul className="main-menu">
          {nav.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                spy
                smooth
                offset={-80}
                duration={500}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="d-flex align-items-center gap-2 gap-lg-3">
          <ThemeToggle />
          <Link
            to="contactus"
            spy
            smooth
            offset={-80}
            duration={500}
            onClick={closeMenu}
            className="px-btn d-none d-lg-inline-flex"
          >
            Let&apos;s Talk
          </Link>
          <button
            type="button"
            className="toggler-menu d-lg-none"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span />
          </button>
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="m-0 text-center">© 2026 copyright all right reserved</p>
      </div>
    </footer>
  );
}

export { socialLinks };
