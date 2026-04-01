import type { PodcastDebateData } from "./episode-schema";
import { debateData as velocidadOCalidadEpisode } from "./vibe-coding/assets/data";

const EPISODES = {
  "velocidad-o-calidad": velocidadOCalidadEpisode,
} satisfies Record<string, PodcastDebateData>;

export const ACTIVE_PODCAST_EPISODE_SLUG = "velocidad-o-calidad" as const;

export const currentPodcastEpisode = {
  slug: ACTIVE_PODCAST_EPISODE_SLUG,
  data: EPISODES[ACTIVE_PODCAST_EPISODE_SLUG],
};
