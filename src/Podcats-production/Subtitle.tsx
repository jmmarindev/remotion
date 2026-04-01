import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { WordTiming } from "./episode-schema";

const SPEAKER_THEME = {
  0: {
    fill: "#0D1282",
    accent: "#4facfe",
    accentSecondary: "#00f2fe",
    glow: "rgba(79,172,254,0.55)",
  },
  1: {
    fill: "#4a0e6e",
    accent: "#f093fb",
    accentSecondary: "#f5576c",
    glow: "rgba(240,147,251,0.55)",
  },
} as const;

const DialogBoxSVG: React.FC<{
  fill: string;
  accent: string;
  accentSecondary: string;
  side: "left" | "right";
}> = ({ fill, accent, accentSecondary, side }) => {
  const isLeft = side === "left";
  const mainBody = "40,0 960,0 1000,40 1000,960 960,1000 40,1000 0,960 0,40";
  const speedLines = Array.from({ length: 6 }, (_, i) => {
    const x = isLeft ? 80 + i * 65 : 920 - i * 65;
    return `M${x},0 L${x - 45},70 L${x - 20},70 L${x + 25},0 Z`;
  }).join(" ");

  return (
    <svg
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <defs>
        <linearGradient
          id={`dialogGrad-${side}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={fill} />
          <stop offset="100%" stopColor={fill} stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <polygon points={mainBody} fill={`url(#dialogGrad-${side})`} />
      <polygon
        points={mainBody}
        fill="none"
        stroke={accent}
        strokeWidth="2.5"
        strokeOpacity="0.6"
      />
      <path d={speedLines} fill={accentSecondary} fillOpacity="0.7" />
      <polygon
        points={mainBody}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1"
        transform="scale(0.985) translate(7.5, 7.5)"
      />
    </svg>
  );
};

export const Subtitle: React.FC<{
  text: string;
  speakerId: 0 | 1;
  durationFrames: number;
  /** Per-word timestamps from the JSON source (absolute seconds in audio) */
  words?: WordTiming[];
  /** Absolute start time of this segment in seconds — needed to compute relative word offsets */
  segmentStartSeconds?: number;
}> = ({ text, speakerId, durationFrames, words, segmentStartSeconds = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = SPEAKER_THEME[speakerId];
  const side = speakerId === 0 ? "left" : "right";

  // Current time position relative to segment start
  const currentSeconds = frame / fps + segmentStartSeconds;

  // Split text into displayable words (non-empty tokens)
  const textWords = text.split(/\s+/).filter(Boolean);

  // Determine how many words are visible.
  // Mode A: if per-word timestamps are available, use them for exact sync.
  // Mode B: fallback to linear interpolation across segment duration.
  let wordsToShow: number;
  if (words && words.length > 0) {
    // Count words whose start_time has been reached
    wordsToShow = words.filter((w) => w.start_time <= currentSeconds).length;
    // Clamp to the number of rendered words in case word counts diverge
    wordsToShow = Math.min(wordsToShow, textWords.length);
  } else {
    const revealEnd = Math.max(durationFrames * 0.85, 30);
    wordsToShow = Math.floor(
      interpolate(frame, [10, revealEnd], [0, textWords.length], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    );
  }

  // Container entrance spring
  const containerSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 18, stiffness: 120 },
  });
  const containerY = interpolate(containerSpring, [0, 1], [40, 0]);
  const containerOpacity = containerSpring;

  // Exit fade
  const exitOpacity = interpolate(
    frame,
    [durationFrames - 10, durationFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom: 40,
        left: 0,
        right: 0,
        transform: `translateY(${containerY}px)`,
        opacity: containerOpacity * exitOpacity,
      }}
    >
      <div
        style={{
          position: "relative",
          filter: `drop-shadow(0 0 22px ${theme.glow}) drop-shadow(0 10px 40px rgba(0,0,0,0.7))`,
        }}
      >
        <DialogBoxSVG
          fill={theme.fill}
          accent={theme.accent}
          accentSecondary={theme.accentSecondary}
          side={side}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            padding: "36px 80px",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            minHeight: 180,
          }}
        >
          <div
            style={{
              fontFamily: '"Courier New", "JetBrains Mono", monospace',
              fontSize: 30,
              color: "white",
              lineHeight: 1.55,
              display: "flex",
              flexWrap: "wrap",
              gap: "0 8px",
            }}
          >
            {textWords.map((word, i) => {
              const isVisible = i < wordsToShow;
              const isJustAppeared = i === wordsToShow - 1;
              return (
                <span
                  key={i}
                  style={{
                    opacity: isVisible ? 1 : 0.18,
                    color: isVisible
                      ? isJustAppeared
                        ? theme.accent
                        : "rgba(255,255,255,0.97)"
                      : "rgba(255,255,255,0.1)",
                    fontWeight: isJustAppeared ? 700 : 500,
                    textShadow: isJustAppeared
                      ? `0 0 12px ${theme.accent}, 0 0 24px ${theme.accent}66`
                      : "none",
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
