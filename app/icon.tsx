import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 18,
        background: "#0a0a0a",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#f97316",
        fontWeight: 700,
        fontFamily: "system-ui, sans-serif",
        letterSpacing: -1,
        borderRadius: 6,
      }}
    >
      AS
    </div>,
    { ...size },
  );
}
