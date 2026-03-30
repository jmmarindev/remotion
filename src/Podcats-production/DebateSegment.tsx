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
  type?: "full" | "insight" | "atomic";
}> = ({ segmentProps, segmentIndex, type = "full" }) => {
  const speakerId = segmentProps.speaker_id as 0 | 1;

  // Decide how to render Avatars based on the format
  const renderAvatars = () => {
    if (type === "atomic") {
      // TikTok/Vertical: only show the active speaker, centered and larger
      return <Avatar speakerId={speakerId} isActive={true} side="center" type={type} />;
    }
    // YouTube / LinkedIn: show both on left/right
    return (
      <>
        <Avatar speakerId={0} isActive={speakerId === 0} side="left" type={type} />
        <Avatar speakerId={1} isActive={speakerId === 1} side="right" type={type} />
      </>
    );
  };

  return (
    <AbsoluteFill>
      {/* Layer 1: Animated gradient background — continuous, no cuts */}
      <AnimatedBackground />

      {/* Layer 2: Avatars */}
      {renderAvatars()}

      {/* Layer 3: Quote card + fun tags in the center */}
      <CenterContent
        textContent={segmentProps.text_content}
        speakerId={speakerId}
        durationFrames={segmentProps.durationFrames}
        segmentIndex={segmentIndex}
        type={type}
      />

      {/* Layer 4: Headline in the upper-center area */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: type === "atomic" ? 120 : 80,
        }}
      >
        <Headline
          text={segmentProps.overlay_ui.headline}
          segmentIndex={segmentIndex}
          durationFrames={segmentProps.durationFrames}
          type={type}
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
