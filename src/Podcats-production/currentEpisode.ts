import type { PodcastDebateData } from "./episode-schema";
import { debateData as vibeCodingEpisode } from "./vibe-coding/assets/data";

const EPISODES = {
  "vibe-coding": vibeCodingEpisode,
} satisfies Record<string, PodcastDebateData>;

export const ACTIVE_PODCAST_EPISODE_SLUG = "vibe-coding" as const;

export const currentPodcastEpisode = {
  slug: ACTIVE_PODCAST_EPISODE_SLUG,
  data: EPISODES[ACTIVE_PODCAST_EPISODE_SLUG],
};
