import "./index.css";
import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import { ScaneraPromo } from "./Scanera";
import { SmilebabyVideo } from "./smilebaby/SmilebabyVideo";
import { VibeCodingDebate } from "./Podcats-production/VibeCodingDebate";
import {
  getEpisodeDurationInFrames,
  timeToSeconds,
} from "./Podcats-production/episode-schema";
import { currentPodcastEpisode } from "./Podcats-production/currentEpisode";

const fps = 30;
const debateData = currentPodcastEpisode.data;
const linkedinStartSeconds = timeToSeconds(
  debateData.metadata.distribution_targets.linkedin_start,
);
const linkedinEndSeconds = timeToSeconds(
  debateData.metadata.distribution_targets.linkedin_end,
);
const tiktokStartSeconds = timeToSeconds(
  debateData.metadata.distribution_targets.tiktok_start,
);
const tiktokEndSeconds = timeToSeconds(
  debateData.metadata.distribution_targets.tiktok_end,
);

const HOOK_DURATION_FPS = fps * 3; // 3 second intro hook

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        // You can take the "id" to render a video:
        // npx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />

      {/* Mount any React component to make it show up in the sidebar and work on it individually! */}
      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />
      <Composition
        id="ScaneraPromo"
        component={ScaneraPromo}
        durationInFrames={1300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="SmilebabyVideo"
        component={SmilebabyVideo}
        durationInFrames={1455} // 210 (Intro) + 390 (Problem) + 405 (Solution) + 210 (Outro) + 240 (Download) = 1455
        fps={30}
        width={1080}
        height={1920}
      />

      {/* --- Podcast Video Creator Productions --- */}

      {/* 1. YouTube: Episodio Completo (16:9) */}
      <Composition
        id="FullEpisode"
        component={VibeCodingDebate}
        durationInFrames={getEpisodeDurationInFrames(debateData, fps)}
        fps={fps}
        width={1920}
        height={1080}
        defaultProps={{ type: "full" as const, startFrame: 0 }}
      />

      {/* 2. LinkedIn: The Insight (Nativo 16:9, ~120s) */}
      <Composition
        id="LinkedInInsight"
        component={VibeCodingDebate}
        durationInFrames={
          Math.round((linkedinEndSeconds - linkedinStartSeconds) * fps) +
          HOOK_DURATION_FPS
        }
        fps={fps}
        width={1920}
        height={1080}
        defaultProps={{
          type: "insight" as const,
          startFrame: Math.round(linkedinStartSeconds * fps),
        }}
      />

      {/* 3. TikTok/Reels: Atomic (Vertical 9:16, ~60s) */}
      <Composition
        id="TikTokViral"
        component={VibeCodingDebate}
        durationInFrames={
          Math.round((tiktokEndSeconds - tiktokStartSeconds) * fps) +
          HOOK_DURATION_FPS
        }
        fps={fps}
        width={1080}
        height={1920}
        defaultProps={{
          type: "atomic" as const,
          startFrame: Math.round(tiktokStartSeconds * fps),
        }}
      />
    </>
  );
};
