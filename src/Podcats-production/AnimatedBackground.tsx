import React from "react";
import { staticFile } from "remotion";
import { Video } from "remotion";
import { STUDIO_ASSETS } from "./studioAssets";

export const AnimatedBackground: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
      }}
    >
      {/* ── Looping cityscape video ───────────────────────────────── */}
      <Video
        src={staticFile(STUDIO_ASSETS.backgroundVideo)}
        loop
        muted
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
};
