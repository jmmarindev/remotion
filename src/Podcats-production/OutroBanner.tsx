import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AnimatedBackground } from "./AnimatedBackground";

export const OutroBanner: React.FC<{
  text: string;
  type: "insight" | "atomic";
}> = ({ text, type }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const backgroundOpacity = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const entryFrame = Math.max(frame - 4, 0);

  const entry = spring({
    frame: entryFrame,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  const isTikTok = type === "atomic";
  const textOpacity = interpolate(entry, [0, 0.45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const panelOpacity = interpolate(frame, [3, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const panelTranslate = interpolate(entry, [0, 1], [40, 0]);
  const glowScale = interpolate(entry, [0, 1], [0.8, 1.15]);

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      <AbsoluteFill style={{ opacity: backgroundOpacity }}>
        <AnimatedBackground />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: isTikTok ? "0 72px" : "0 120px",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: isTikTok ? "82%" : "62%",
            height: isTikTok ? "42%" : "34%",
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(240,147,251,0.28) 0%, rgba(79,172,254,0.18) 45%, transparent 72%)",
            filter: "blur(70px)",
            opacity: textOpacity,
            transform: `scale(${glowScale})`,
          }}
        />

        <div
          style={{
            width: isTikTok ? "100%" : "min(1100px, 100%)",
            padding: isTikTok ? "46px 38px" : "42px 54px",
            borderRadius: 36,
            background: "rgba(10, 10, 30, 0.58)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.38)",
            backdropFilter: "blur(24px)",
            opacity: panelOpacity,
            transform: `translateY(${panelTranslate}px)`,
            display: "flex",
            flexDirection: "column",
            gap: isTikTok ? 28 : 24,
            alignItems: isTikTok ? "stretch" : "center",
            textAlign: isTikTok ? "left" : "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignSelf: isTikTok ? "flex-start" : "center",
              padding: isTikTok ? "10px 16px" : "10px 18px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.86)",
              fontSize: isTikTok ? 26 : 24,
              letterSpacing: "0.16em",
              fontWeight: 700,
              textTransform: "uppercase",
              fontFamily: "Outfit, Inter, system-ui",
            }}
          >
            Sigue el debate
          </div>

          <div
            style={{
              color: "rgba(255,255,255,0.96)",
              fontSize: isTikTok ? 92 : 70,
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: "-0.045em",
              fontFamily: "Outfit, Inter, system-ui",
              textTransform: "uppercase",
              opacity: textOpacity,
              textShadow: "0 14px 32px rgba(0,0,0,0.4)",
            }}
          >
            {text}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: isTikTok ? "flex-start" : "center",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 14,
                padding: isTikTok ? "16px 24px" : "15px 22px",
                borderRadius: 999,
                background:
                  "linear-gradient(90deg, rgba(79,172,254,0.95) 0%, rgba(240,147,251,0.95) 100%)",
                color: "#07101f",
                fontSize: isTikTok ? 28 : 24,
                fontWeight: 800,
                letterSpacing: "-0.02em",
                fontFamily: "Outfit, Inter, system-ui",
                boxShadow: "0 16px 40px rgba(79,172,254,0.28)",
              }}
            >
              <span>Canal oficial</span>
              <span style={{ fontSize: isTikTok ? 30 : 26 }}>→</span>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
