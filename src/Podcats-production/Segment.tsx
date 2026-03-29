import React from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TimelineSegment } from "./data";

export const Segment: React.FC<{
  segmentProps: TimelineSegment;
}> = ({ segmentProps }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Try to require the image statically if possible, otherwise rely on dynamic require
  // Webpack will bundle the whole assets directory because of this signature
  let imageSrc;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    imageSrc = require(`./assets/${segmentProps.visual_strategy.asset_file}`);
  } catch (err) {
    // If not found, ignore to allow fallback
    imageSrc = null;
  }

  // Fade in animation
  const opacity = interpolate(
    frame,
    [0, 15],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Subtle scale
  const scale = interpolate(
    frame,
    [0, 300],
    [1.05, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Spring headline
  const headlineY = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, mass: 0.5 },
  });
  
  const headlineOpacity = interpolate(
    frame,
    [10, 25],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#1a1a1a", opacity }}>
      {imageSrc ? (
        <Img
          src={imageSrc}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${scale})`,
            filter: "brightness(0.6)"
          }}
        />
      ) : (
        <AbsoluteFill style={{ 
          background: "linear-gradient(135deg, #2b5876 0%, #4e4376 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          {/* Fallback gradient if image requires fail */}
          <div style={{ color: "rgba(255,255,255,0.1)", fontSize: "40px", fontWeight: "bold" }}>
            {segmentProps.visual_strategy.asset_file}
          </div>
        </AbsoluteFill>
      )}

      {/* Main Overlay */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        {segmentProps.overlay_ui.headline && (
          <h1
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "120px",
              fontWeight: 900,
              color: "white",
              textAlign: "center",
              textShadow: "0px 10px 30px rgba(0,0,0,0.8)",
              transform: `translateY(${100 - headlineY * 100}px)`,
              opacity: headlineOpacity,
              margin: "0 100px",
              lineHeight: 1.1
            }}
          >
            {segmentProps.overlay_ui.headline}
          </h1>
        )}
      </AbsoluteFill>

      {/* Speaker Subtitle / Text content */}
      <AbsoluteFill style={{ justifyContent: "flex-end", padding: "80px" }}>
         <div style={{
           backgroundColor: "rgba(0,0,0,0.6)",
           backdropFilter: "blur(10px)",
           borderRadius: "20px",
           padding: "40px",
           borderLeft: `10px solid ${segmentProps.speaker_id === 0 ? "#4facfe" : "#f093fb"}`
         }}>
           <p style={{
             fontFamily: "Inter, sans-serif",
             fontSize: "40px",
             color: "white",
             lineHeight: 1.5,
             margin: 0
           }}>
             {segmentProps.text_content}
           </p>
         </div>
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
