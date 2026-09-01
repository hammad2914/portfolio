import type { Metadata, Viewport } from "next";
import { site, siteUrl, socialLinks } from "@/data/content";
import { ThemeProvider } from "@/components/portfolio/ThemeProvider";
import "./globals.css";
import "./portfolio.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: site.title,
  description: site.description,
  applicationName: site.title,
  authors: [{ name: site.author, url: siteUrl }],
  creator: site.author,
  keywords: [
    "Hammad Ali",
    "Full Stack Software Engineer",
    "React developer",
    "Next.js developer",
    "NestJS",
    "Node.js",
    "PostgreSQL",
    "ERP developer",
    "SaaS developer",
    "Karachi",
    "Pakistan",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: site.title,
    title: site.title,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1112" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.author,
  url: siteUrl,
  jobTitle: "Full Stack Software Engineer",
  description: site.description,
  email: "mailto:ch.hammad2914@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressCountry: "PK",
  },
  worksFor: {
    "@type": "Organization",
    name: "Interactive Technologies Gateway",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Virtual University of Pakistan",
  },
  knowsAbout: [
    "React.js",
    "Next.js",
    "TypeScript",
    "Node.js",
    "NestJS",
    ".NET Core",
    "PostgreSQL",
    "ERP Systems",
    "SaaS Architecture",
  ],
  sameAs: socialLinks
    .filter((link) => link.href.startsWith("http"))
    .map((link) => link.href),
};

const THEME_SCRIPT =
  '(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);}else{document.documentElement.setAttribute("data-theme","dark");}}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        {/* Base theme CSS is served from /public so its relative url() asset
            paths keep resolving; deliberately not bundled through webpack. */}
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/css/main.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <a href="#home" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
