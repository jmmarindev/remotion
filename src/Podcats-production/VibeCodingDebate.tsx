import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { debateData, prepareSegments } from "./data";
import { DebateSegment } from "./DebateSegment";
import { HookBanner } from "./HookBanner";

export const VibeCodingDebate: React.FC<{ type?: "full" | "insight" | "atomic"; startFrame?: number }> = ({ 
  type = "full", 
  startFrame = 0 
}) => {
  const { fps } = useVideoConfig();
  
  // Convert timestamps to frame numbers
  const segments = prepareSegments(fps);

  // Intro Hook logic
  const HOOK_DURATION_FPS = fps * 3;
  const hookText = type === "insight" 
    ? (debateData.metadata.distribution_targets as any).linkedin_hook 
    : type === "atomic" 
    ? (debateData.metadata.distribution_targets as any).tiktok_hook 
    : null;

  console.log("VibeCodingDebate Render:", { type, hookText, startFrame });

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {/* 1. The Hook Intro (only for social media clips) */}
      {hookText && (
        <Sequence durationInFrames={HOOK_DURATION_FPS}>
           <HookBanner text={hookText} type={type === "insight" ? "insight" : "atomic"} />
        </Sequence>
      )}

      {/* 2. The Main Conversation Sequence (offset by hook duration if applicable) */}
      <Sequence from={hookText ? HOOK_DURATION_FPS : 0}>
        <Sequence from={-startFrame}>
          {/* Play the podcast audio track — continuous, uninterrupted */}
          <Audio src={staticFile("Vibe_coding_frente_al_rigor_técnico.m4a")} />

          {/* Position each segment at its ABSOLUTE frame position */}
          {segments.map((segment: any, i: number) => (
            <Sequence
              key={i}
              from={segment.startFrame}
              durationInFrames={segment.durationFrames}
              premountFor={10}
            >
              <DebateSegment segmentProps={segment} segmentIndex={i} type={type} />
            </Sequence>
          ))}
        </Sequence>
      </Sequence>
    </AbsoluteFill>
  );
};
