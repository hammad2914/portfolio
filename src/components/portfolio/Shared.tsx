"use client";

import { Icon } from "@iconify/react";

type SocialBtn = {
  icon: string;
  label: string;
  iconBgClass: string;
  href: string;
};

export function SocialIcons({
  socialBtns,
  variant,
}: {
  socialBtns: SocialBtn[];
  variant?: string;
}) {
  return (
    <div
      className={`social-icon ${variant || ""}`}
      data-aos="zoom-in"
      data-aos-duration="1200"
      data-aos-delay="300"
    >
      {socialBtns.map((btn) => {
        const external = btn.href.startsWith("http");
        return (
          <a
            key={btn.href}
            className={btn.iconBgClass}
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
  );
}
