import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const SPEAKER_BORDER_COLORS = {
  0: "#4facfe",
  1: "#f093fb",
} as const;

export const Subtitle: React.FC<{
  text: string;
  speakerId: 0 | 1;
  durationFrames: number;
}> = ({ text, speakerId, durationFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Split text into words
  const words = text.split(/\s+/);
  const totalWords = words.length;

  // Calculate how many words should be visible at the current frame.
  // Start revealing at frame 10, finish at 85% of the segment duration
  // to give time for reading the last words.
  const revealEnd = Math.max(durationFrames * 0.85, 30);
  const wordsToShow = Math.floor(
    interpolate(frame, [10, revealEnd], [0, totalWords], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

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

  const borderColor = SPEAKER_BORDER_COLORS[speakerId];

  return (
    <div
      style={{
        position: "absolute",
        bottom: 60,
        left: 60,
        right: 60,
        transform: `translateY(${containerY}px)`,
        opacity: containerOpacity * exitOpacity,
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(4, 7, 18, 0.82)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderRadius: 16,
          padding: "28px 36px",
          borderLeft: `6px solid ${borderColor}`,
          boxShadow: `0 0 30px ${borderColor}33, 0 8px 32px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.06)`,
          position: "relative",
        }}
      >
        {/* Corner brackets in speaker color */}
        {(
          [
            {
              top: 8,
              left: 8,
              borderTop: `2px solid ${borderColor}cc`,
              borderLeft: `2px solid ${borderColor}cc`,
            },
            {
              top: 8,
              right: 8,
              borderTop: `2px solid ${borderColor}cc`,
              borderRight: `2px solid ${borderColor}cc`,
            },
            {
              bottom: 8,
              left: 8,
              borderBottom: `2px solid ${borderColor}cc`,
              borderLeft: `2px solid ${borderColor}cc`,
            },
            {
              bottom: 8,
              right: 8,
              borderBottom: `2px solid ${borderColor}cc`,
              borderRight: `2px solid ${borderColor}cc`,
            },
          ] as React.CSSProperties[]
        ).map((bracketStyle, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 20,
              height: 20,
              filter: `drop-shadow(0 0 4px ${borderColor}99)`,
              ...bracketStyle,
            }}
          />
        ))}
        <div
          style={{
            fontFamily: '"Courier New", "JetBrains Mono", monospace',
            fontSize: 34,
            color: "white",
            lineHeight: 1.6,
            display: "flex",
            flexWrap: "wrap",
            gap: "0 8px",
          }}
        >
          {words.map((word, i) => {
            const isVisible = i < wordsToShow;
            const isJustAppeared = i === wordsToShow - 1;

            return (
              <span
                key={i}
                style={{
                  opacity: isVisible ? 1 : 0.12,
                  color: isVisible
                    ? isJustAppeared
                      ? borderColor
                      : "rgba(255,255,255,0.95)"
                    : "rgba(255,255,255,0.1)",
                  fontWeight: isJustAppeared ? 700 : 500,
                  textShadow: isJustAppeared
                    ? `0 0 12px ${borderColor}, 0 0 24px ${borderColor}66`
                    : "none",
                  transition: "color 0.1s",
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
