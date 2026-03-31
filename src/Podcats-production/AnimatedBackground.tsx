import React from "react";
import { staticFile } from "remotion";
import { Video } from "remotion";
import { STUDIO_ASSETS } from "./studioAssets";

export const AnimatedBackground: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
      }}
    >
      {/* ── Looping cityscape video ───────────────────────────────── */}
      <Video
        src={staticFile(STUDIO_ASSETS.backgroundVideo)}
        loop
        muted
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* ── Dark overlay so foreground elements stay legible ─────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.38)",
        }}
      />

      {/* ── CRT scanlines ────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)",
          pointerEvents: "none",
        }}
      />

      {/* ── Vignette ─────────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0,0,0,0.50) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
