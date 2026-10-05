"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { animateScroll, Link } from "react-scroll";
import { contact, site, socialLinks } from "@/data/content";

const footerNav = [
  { to: "about", label: "About" },
  { to: "project", label: "Projects" },
  { to: "skills", label: "Skills" },
  { to: "education", label: "Education" },
  { to: "contactus", label: "Contact" },
];

const email = contact.contactInfo.find(
  (i): i is { title: string; email: string } => "email" in i,
)?.email;

/** Local time where he is, so "respond within 24 hours" has a clock behind it. */
function useKarachiTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Karachi",
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export function Footer() {
  const time = useKarachiTime();

  return (
    <footer className="footer ft">
      <div className="container">
        <div className="ft-call">
          <p className="ft-status">
            <i aria-hidden="true" />
            {site.availability}
          </p>
          <h2 className="ft-lead">
            Have something <span>worth building?</span>
          </h2>
          {email ? (
            <a className="ft-mail" href={`mailto:${email}`}>
              <span>{email}</span>
              <Icon icon="bi:arrow-up-right" aria-hidden="true" />
            </a>
          ) : null}
        </div>

        <div className="ft-bar">
          <div className="ft-who">
            <strong>{site.author}</strong>
            <span>
              {site.location}
              {/* rendered after mount; the server has no business guessing a clock */}
              {time ? ` · ${time} local` : ""}
            </span>
          </div>

          <nav className="ft-nav" aria-label="Footer">
            {footerNav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                spy
                smooth
                offset={-80}
                duration={500}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ft-side">
            <div className="ft-social">
              {socialLinks.map((btn) => {
                const external = btn.href.startsWith("http");
                return (
                  <a
                    key={btn.href}
                    href={btn.href}
                    aria-label={btn.label}
                    title={btn.label}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer noopener" : undefined}
                  >
                    <Icon icon={btn.icon} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
            <button
              type="button"
              className="ft-top"
              onClick={() => animateScroll.scrollToTop({ duration: 500 })}
              aria-label="Back to top"
            >
              <Icon icon="bi:arrow-up" aria-hidden="true" />
            </button>
          </div>
        </div>

        <p className="ft-copy">
          © {new Date().getFullYear()} {site.author}
        </p>
      </div>
    </footer>
  );
}
