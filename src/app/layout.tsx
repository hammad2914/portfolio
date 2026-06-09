import type { Metadata } from "next";
import { site } from "@/data/jenna";
import { ThemeProvider } from "@/components/jenna/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);}else{document.documentElement.setAttribute("data-theme","dark");}}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`,
          }}
        />
        <link rel="stylesheet" href="/css/main.css" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
