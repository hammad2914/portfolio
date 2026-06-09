"use client";

import { Icon } from "@iconify/react";

type SocialBtn = {
  icon: string;
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
      {socialBtns.map((btn) => (
        <a
          key={btn.href}
          className={btn.iconBgClass}
          href={btn.href}
          target={btn.href.startsWith("http") ? "_blank" : undefined}
          rel={btn.href.startsWith("http") ? "noreferrer noopener" : undefined}
        >
          <Icon icon={btn.icon} />
        </a>
      ))}
    </div>
  );
}

export function StarRating({ ratings }: { ratings: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => (
    <i key={i}>
      <Icon icon="bi:star" />
    </i>
  ));
  const filled = Array.from({ length: 5 }, (_, i) => (
    <i key={i}>
      <Icon icon="bi:star-fill" />
    </i>
  ));

  return (
    <div className="ratings">
      <div className="rating">{stars}</div>
      <div className="rating" style={{ width: `${20 * ratings}%` }}>
        {filled}
      </div>
    </div>
  );
}
