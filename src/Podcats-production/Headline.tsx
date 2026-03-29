import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Headline variations cycle through different entrance animations
 * to keep the video visually interesting across 27+ segments.
 */

const HEADLINE_VARIANTS = [
  "slide-up",
  "fade-scale",
  "slide-left",
  "typewriter",
] as const;

type HeadlineVariant = (typeof HEADLINE_VARIANTS)[number];

export const Headline: React.FC<{
  text: string;
  segmentIndex: number;
  durationFrames: number;
}> = ({ text, segmentIndex, durationFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const variant: HeadlineVariant = HEADLINE_VARIANTS[segmentIndex % HEADLINE_VARIANTS.length];

  // Entrance spring (delay 5 frames)
  const entranceSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  // Exit fade (last 15 frames of segment)
  const exitOpacity = interpolate(
    frame,
    [durationFrames - 15, durationFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Calculate variant-specific styles
  let variantStyle: React.CSSProperties = {};

  switch (variant) {
    case "slide-up":
      variantStyle = {
        transform: `translateY(${interpolate(entranceSpring, [0, 1], [60, 0])}px)`,
        opacity: entranceSpring * exitOpacity,
      };
      break;

    case "fade-scale":
      variantStyle = {
        transform: `scale(${interpolate(entranceSpring, [0, 1], [0.7, 1])})`,
        opacity: entranceSpring * exitOpacity,
      };
      break;

    case "slide-left":
      variantStyle = {
        transform: `translateX(${interpolate(entranceSpring, [0, 1], [80, 0])}px)`,
        opacity: entranceSpring * exitOpacity,
      };
      break;

    case "typewriter": {
      const charsToShow = Math.floor(
        interpolate(frame, [5, 5 + text.length * 1.5], [0, text.length], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      );
      variantStyle = {
        opacity: exitOpacity,
      };
      // Override the text content via a different approach below
      return (
        <div style={{ ...baseStyle, ...variantStyle }}>
          {text.slice(0, charsToShow)}
          {charsToShow < text.length && (
            <span
              style={{
                borderRight: frame % 15 < 8 ? "3px solid white" : "3px solid transparent",
                marginLeft: 2,
              }}
            />
          )}
        </div>
      );
    }
  }

  return <div style={{ ...baseStyle, ...variantStyle }}>{text}</div>;
};

const baseStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: 72,
  fontWeight: 900,
  color: "white",
  textAlign: "center",
  textShadow: "0 4px 30px rgba(0,0,0,0.8), 0 0 60px rgba(79,172,254,0.3)",
  lineHeight: 1.15,
  padding: "0 120px",
  letterSpacing: -1,
};
