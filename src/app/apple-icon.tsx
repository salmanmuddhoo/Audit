import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#073665" }}>
        <div style={{ width: 112, height: 112, borderRadius: 999, border: "18px solid #00afc3", borderRightColor: "transparent", transform: "rotate(-30deg)" }} />
      </div>
    ),
    size,
  );
}
