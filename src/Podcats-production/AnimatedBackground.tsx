import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

/**
 * 4 gradient palettes that cycle based on segmentIndex.
 * Each has 3 stops for a rich mesh-like feel.
 */
const PALETTES = [
  { a: "#0f0c29", b: "#302b63", c: "#24243e", accent: "rgba(79,172,254,0.15)" },
  { a: "#0a1628", b: "#1a3a5c", c: "#0d2137", accent: "rgba(0,242,254,0.12)" },
  { a: "#1a0a2e", b: "#3d1c5c", c: "#2d1b4e", accent: "rgba(240,147,251,0.15)" },
  { a: "#1c1417", b: "#2d1f2b", c: "#1a1225", accent: "rgba(245,87,108,0.12)" },
];

export const AnimatedBackground: React.FC<{
  segmentIndex: number;
}> = ({ segmentIndex }) => {
  const frame = useCurrentFrame();
  const palette = PALETTES[segmentIndex % PALETTES.length];

  // Fade in from black on segment entrance
  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle floating orb positions (driven by frame, no CSS animations)
  const orb1X = 30 + Math.sin(frame * 0.015) * 15;
  const orb1Y = 25 + Math.cos(frame * 0.012) * 10;
  const orb2X = 70 + Math.sin(frame * 0.01 + 2) * 12;
  const orb2Y = 65 + Math.cos(frame * 0.014 + 1) * 15;
  const orb3X = 50 + Math.sin(frame * 0.008 + 4) * 20;
  const orb3Y = 45 + Math.cos(frame * 0.011 + 3) * 12;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(135deg, ${palette.a} 0%, ${palette.b} 50%, ${palette.c} 100%)`,
        opacity: fadeIn,
        overflow: "hidden",
      }}
    >
      {/* Floating orb 1 */}
      <div
        style={{
          position: "absolute",
          left: `${orb1X}%`,
          top: `${orb1Y}%`,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: palette.accent,
          filter: "blur(80px)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Floating orb 2 */}
      <div
        style={{
          position: "absolute",
          left: `${orb2X}%`,
          top: `${orb2Y}%`,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: palette.accent,
          filter: "blur(100px)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Floating orb 3 — smaller accent */}
      <div
        style={{
          position: "absolute",
          left: `${orb3X}%`,
          top: `${orb3Y}%`,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: `rgba(255,255,255,0.04)`,
          filter: "blur(60px)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Subtle grid overlay for depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: 0.5,
        }}
      />
    </div>
  );
};
