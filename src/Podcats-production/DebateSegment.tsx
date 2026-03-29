import React from "react";
import { AbsoluteFill } from "remotion";
import { TimelineSegment } from "./data";
import { AnimatedBackground } from "./AnimatedBackground";
import { Avatar } from "./Avatar";
import { Headline } from "./Headline";
import { CenterContent } from "./KeywordHighlight";
import { Subtitle } from "./Subtitle";

export const DebateSegment: React.FC<{
  segmentProps: TimelineSegment & { durationFrames: number };
  segmentIndex: number;
}> = ({ segmentProps, segmentIndex }) => {
  const speakerId = segmentProps.speaker_id as 0 | 1;

  return (
    <AbsoluteFill>
      {/* Layer 1: Animated gradient background */}
      <AnimatedBackground segmentIndex={segmentIndex} />

      {/* Layer 2: Avatars on both sides */}
      <Avatar speakerId={0} isActive={speakerId === 0} side="left" />
      <Avatar speakerId={1} isActive={speakerId === 1} side="right" />

      {/* Layer 3: Quote card + fun tags in the center */}
      <CenterContent
        textContent={segmentProps.text_content}
        speakerId={speakerId}
        durationFrames={segmentProps.durationFrames}
        segmentIndex={segmentIndex}
      />

      {/* Layer 4: Headline in the upper-center area */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: 80,
        }}
      >
        <Headline
          text={segmentProps.overlay_ui.headline}
          segmentIndex={segmentIndex}
          durationFrames={segmentProps.durationFrames}
        />
      </AbsoluteFill>

      {/* Layer 5: Word-by-word subtitle at the bottom */}
      <Subtitle
        text={segmentProps.text_content}
        speakerId={speakerId}
        durationFrames={segmentProps.durationFrames}
      />
    </AbsoluteFill>
  );
};
