import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const SPEAKER_COLORS = {
  0: { primary: "#4facfe", secondary: "#00f2fe", glow: "rgba(79, 172, 254, 0.6)" },
  1: { primary: "#f093fb", secondary: "#f5576c", glow: "rgba(240, 147, 251, 0.6)" },
} as const;

export const Avatar: React.FC<{
  speakerId: 0 | 1;
  isActive: boolean;
  side: "left" | "right" | "center";
  type?: "full" | "insight" | "atomic";
}> = ({ speakerId, isActive, side, type = "full" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const colors = SPEAKER_COLORS[speakerId];

  // Scale bounce when speaker starts talking
  const scaleSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 150 },
  });
  
  // Make the active avatar slightly larger on atomic format
  const activeMaxScale = type === "atomic" ? 1.2 : 1.05;
  const scale = isActive
    ? interpolate(scaleSpring, [0, 1], [0.95, activeMaxScale])
    : interpolate(scaleSpring, [0, 1], [1, 0.9]);

  // Pulsing glow when active
  const glowPulse = isActive
    ? interpolate(
        Math.sin(frame * 0.12),
        [-1, 1],
        [0.4, 1],
      )
    : 0;

  // Opacity: bright when active, dimmed when not
  const opacity = isActive ? 1 : 0.35;

  // Mic icon bars animation (3 bars that bounce when active)
  const barHeights = [0.5, 0.8, 0.6].map((baseH, i) => {
    if (!isActive) return baseH * 14;
    const wave = Math.sin(frame * 0.2 + i * 1.5);
    return interpolate(wave, [-1, 1], [8, 24]);
  });

  const getPositionStyles = (): React.CSSProperties => {
    if (side === "center") {
      return {
        left: "50%",
        top: "42%",
        transform: `translate(-50%, -50%) scale(${scale})`,
        zIndex: 10,
      };
    }
    return {
      [side]: 80,
      top: "50%",
      transform: `translateY(-50%) scale(${scale})`,
    };
  };

  return (
    <div
      style={{
        position: "absolute",
        ...getPositionStyles(),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        opacity,
      }}
    >
      {/* Glow ring */}
      <div
        style={{
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: `conic-gradient(from ${frame * 2}deg, ${colors.primary}, ${colors.secondary}, ${colors.primary})`,
          padding: 4,
          boxShadow: `0 0 ${30 + glowPulse * 40}px ${10 + glowPulse * 20}px ${colors.glow}`,
        }}
      >
        {/* Inner circle with mic icon */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "linear-gradient(145deg, #1a1a2e, #16213e)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
          }}
        >
          {/* Mic bars */}
          {barHeights.map((h, i) => (
            <div
              key={i}
              style={{
                width: 8,
                height: h,
                borderRadius: 4,
                background: `linear-gradient(to top, ${colors.primary}, ${colors.secondary})`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Speaker label */}
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 18,
          fontWeight: 700,
          color: colors.primary,
          textTransform: "uppercase",
          letterSpacing: 3,
          textShadow: `0 0 10px ${colors.glow}`,
        }}
      >
        {speakerId === 0 ? "Speaker A" : "Speaker B"}
      </div>
    </div>
  );
};
