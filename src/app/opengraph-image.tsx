import { ImageResponse } from "next/og";
import { site } from "@/data/content";

export const alt = "Hammad Ali — Full Stack Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "linear-gradient(135deg, #0e1112 0%, #1a2224 100%)",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 26,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: "#0788ff",
          marginBottom: 24,
        }}
      >
        Full Stack Software Engineer
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 88,
          fontWeight: 700,
          color: "#ffffff",
          lineHeight: 1.1,
        }}
      >
        Hammad Ali
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 32,
          color: "#9ca8ac",
          marginTop: 28,
          maxWidth: 900,
          lineHeight: 1.4,
        }}
      >
        Enterprise ERP, SaaS & supply-chain systems — React, Next.js, NestJS,
        PostgreSQL
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 56,
          fontSize: 26,
          color: "#6b7679",
        }}
      >
        {site.location}
      </div>
    </div>,
    size,
  );
}
