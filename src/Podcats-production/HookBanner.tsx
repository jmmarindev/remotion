import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { AnimatedBackground } from "./AnimatedBackground";

export const HookBanner: React.FC<{ text: string; type: "insight" | "atomic" }> = ({ text, type }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animations
  const entry = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const float = Math.sin(frame / 10) * 10;
  
  const textScale = interpolate(entry, [0, 1], [0.8, 1]);
  const textOpacity = interpolate(entry, [0, 0.5], [0, 1]);

  const isTikTok = type === "atomic";

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <AnimatedBackground />
      
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: isTikTok ? "0 80px" : "0 120px",
          textAlign: "center",
        }}
      >
        {/* Glow effect back the text */}
        <div
          style={{
            position: "absolute",
            width: "60%",
            height: "40%",
            background: "radial-gradient(circle, rgba(79,172,254,0.4) 0%, transparent 70%)",
            filter: "blur(60px)",
            opacity: textOpacity,
          }}
        />

        <h1
          style={{
            color: "white",
            fontSize: isTikTok ? 120 : 80,
            fontWeight: 900,
            lineHeight: 1.1,
            textTransform: "uppercase",
            fontFamily: "Outfit, Inter, system-ui",
            transform: `scale(${textScale}) translateY(${float}px)`,
            opacity: textOpacity,
            textShadow: "0 10px 30px rgba(0,0,0,0.5)",
            letterSpacing: "-0.04em",
          }}
        >
          {text}
        </h1>

        {/* Decorative elements */}
        <div
          style={{
            marginTop: 40,
            height: 6,
            width: 100 * entry,
            background: "linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)",
            borderRadius: 3,
            boxShadow: "0 0 20px rgba(79,172,254,0.8)",
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
