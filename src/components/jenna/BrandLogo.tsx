"use client";

import Image from "next/image";

export function BrandLogo() {
  return (
    <Image
      src="/images/favicon.png"
      alt="Home"
      width={48}
      height={48}
      priority
      className="brand-logo"
    />
  );
}
