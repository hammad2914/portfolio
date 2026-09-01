"use client";

import { Link } from "react-scroll";
import { contact, site, socialLinks } from "@/data/content";
import { SocialIcons } from "./Shared";

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

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h5>{site.author}</h5>
            <p>Full Stack Software Engineer</p>
            <p className="footer-meta">
              {site.location} · {site.availability}
            </p>
            {email ? (
              <a className="footer-email" href={`mailto:${email}`}>
                {email}
              </a>
            ) : null}
          </div>

          <nav className="footer-nav" aria-label="Footer">
            <ul>
              {footerNav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} spy smooth offset={-80} duration={500}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-social">
            <SocialIcons socialBtns={socialLinks} />
          </div>
        </div>

        <p className="footer-copy m-0">
          © {new Date().getFullYear()} {site.author}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
