import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { prepareSegments, TimelineSegment } from "./data";
import { DebateSegment } from "./DebateSegment";

export const VibeCodingDebate: React.FC = () => {
  const { fps } = useVideoConfig();
  
  // Convert timestamps to frame numbers
  const segments = prepareSegments(fps);

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {/* Play the podcast audio track — continuous, uninterrupted */}
      <Audio src={staticFile("Vibe_coding_frente_al_rigor_técnico.m4a")} />

      {/* Position each segment at its ABSOLUTE frame position.
          This prevents accumulated rounding drift that <Series> causes,
          keeping visuals perfectly synced with the continuous audio. */}
      {segments.map((segment: TimelineSegment & { startFrame: number; endFrame: number; durationFrames: number }, i: number) => (
        <Sequence
          key={i}
          from={segment.startFrame}
          durationInFrames={segment.durationFrames}
          premountFor={10}
        >
          <DebateSegment segmentProps={segment} segmentIndex={i} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
