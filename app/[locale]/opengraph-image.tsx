import { ImageResponse } from "next/og";
import { siteConfig } from "../_data/site";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        fontFamily: "system-ui, sans-serif",
        color: "#f5f5f5",
        position: "relative",
      }}
    >
      {/* Dot grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.5,
        }}
      />
      {/* Orange glow */}
      <div
        style={{
          position: "absolute",
          top: -200,
          left: 400,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "rgba(249, 115, 22, 0.18)",
          filter: "blur(120px)",
        }}
      />

      {/* Top: availability badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "10px 20px",
          border: "1px solid #262626",
          borderRadius: 9999,
          background: "rgba(23, 23, 23, 0.6)",
          fontSize: 22,
          color: "#a3a3a3",
          alignSelf: "flex-start",
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#10b981",
          }}
        />
        Available for Freelance & Full-time
      </div>

      {/* Middle: name + short role */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            fontSize: 90,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1.05,
            color: "#ffffff",
            display: "flex",
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#a3a3a3",
            lineHeight: 1.2,
            display: "flex",
          }}
        >
          DevOps & Backend Engineer
        </div>
      </div>

      {/* Bottom: url only */}
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            color: "#f97316",
            fontWeight: 700,
            fontSize: 24,
          }}
        >
          abdelrazig.me
        </div>
      </div>
    </div>,
    { ...size },
  );
}
