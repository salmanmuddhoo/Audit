import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#073665", borderRadius: 14 }}>
        <div style={{ width: 40, height: 40, borderRadius: 999, border: "7px solid #00afc3", borderRightColor: "transparent", transform: "rotate(-30deg)" }} />
      </div>
    ),
    size,
  );
}
