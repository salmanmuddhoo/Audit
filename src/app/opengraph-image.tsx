import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} – ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 24,
          background: "linear-gradient(135deg, #041f3d 0%, #073665 55%, #0a4a84 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ width: 140, height: 140, borderRadius: 999, border: "20px solid #00afc3", borderRightColor: "transparent", transform: "rotate(-30deg)" }} />
        <div style={{ display: "flex", fontSize: 88, fontWeight: 800, letterSpacing: -2 }}>
          Insight<span style={{ color: "#00afc3" }}>.360°</span>
        </div>
        <div style={{ fontSize: 34, color: "rgba(255,255,255,0.8)" }}>{siteConfig.tagline}</div>
        <div style={{ fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "#2ec4d4", marginTop: 12 }}>
          Business Advisory · Governance · Risk · Compliance
        </div>
      </div>
    ),
    size,
  );
}
