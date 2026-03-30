import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { currentPodcastEpisode } from "./currentEpisode";
import { prepareSegments } from "./episode-schema";
import { DebateSegment } from "./DebateSegment";
import { HookBanner } from "./HookBanner";
import { OutroBanner } from "./OutroBanner";

export const VibeCodingDebate: React.FC<{
  type?: "full" | "insight" | "atomic";
  startFrame?: number;
}> = ({ type = "full", startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const debateData = currentPodcastEpisode.data;

  // Convert timestamps to frame numbers
  const segments = prepareSegments(debateData, fps);
  const distributionTargets = debateData.metadata.distribution_targets;
  const isShortClip = type === "insight" || type === "atomic";

  // Intro Hook logic
  const HOOK_DURATION_FPS = fps * 3;
  const hookText =
    type === "insight"
      ? distributionTargets.linkedin_hook
      : type === "atomic"
        ? distributionTargets.tiktok_hook
        : null;
  const outroText = isShortClip ? distributionTargets.short_outro_cta : null;
  const outroDurationFrames = isShortClip
    ? Math.round(distributionTargets.short_outro_duration_seconds * fps)
    : 0;
  const outroStartFrame = Math.max(durationInFrames - outroDurationFrames, 0);
  const outroOverlapFrames = isShortClip ? Math.round(fps * 0.4) : 0;
  const contentOffsetFrames = hookText ? HOOK_DURATION_FPS : 0;
  const audioDurationFrames = Math.max(
    durationInFrames - contentOffsetFrames,
    0,
  );
  const visualDurationFrames = isShortClip
    ? Math.max(
        audioDurationFrames - outroDurationFrames + outroOverlapFrames,
        0,
      )
    : audioDurationFrames;
  const visualOpacity = isShortClip
    ? interpolate(
        frame,
        [outroStartFrame, outroStartFrame + outroOverlapFrames],
        [1, 0],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        },
      )
    : 1;
  const audioVolume = isShortClip
    ? interpolate(frame, [outroStartFrame, durationInFrames - 1], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {/* 1. The Hook Intro (only for social media clips) */}
      {hookText && (
        <Sequence durationInFrames={HOOK_DURATION_FPS}>
          <HookBanner
            text={hookText}
            type={type === "insight" ? "insight" : "atomic"}
          />
        </Sequence>
      )}

      {/* 2. Audio continues through the final fade-out of the short clip */}
      <Sequence
        from={contentOffsetFrames}
        durationInFrames={audioDurationFrames}
      >
        <Sequence from={-startFrame}>
          {/* Play the podcast audio track — continuous, uninterrupted */}
          <Audio
            src={staticFile(debateData.metadata.audio_file)}
            volume={audioVolume}
          />
        </Sequence>
      </Sequence>

      {/* 3. The Main Conversation visuals stop before the final outro */}
      <Sequence
        from={contentOffsetFrames}
        durationInFrames={visualDurationFrames}
      >
        <AbsoluteFill style={{ opacity: visualOpacity }}>
          <Sequence from={-startFrame}>
            {/* Position each segment at its ABSOLUTE frame position */}
            {segments.map((segment, i: number) => (
              <Sequence
                key={i}
                from={segment.startFrame}
                durationInFrames={segment.durationFrames}
                premountFor={10}
              >
                <DebateSegment
                  segmentProps={segment}
                  segmentIndex={i}
                  type={type}
                />
              </Sequence>
            ))}
          </Sequence>
        </AbsoluteFill>
      </Sequence>

      {outroText && outroDurationFrames > 0 && (
        <Sequence from={outroStartFrame} durationInFrames={outroDurationFrames}>
          <OutroBanner
            text={outroText}
            type={type === "insight" ? "insight" : "atomic"}
          />
        </Sequence>
      )}
    </AbsoluteFill>
  );
};
