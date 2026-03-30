export interface TimelineSegment {
  start_time: string;
  end_time: string;
  speaker_id: number;
  text_content: string;
  visual_strategy?: {
    asset_type: string;
    freepik_api_params: {
      query: string;
      content_type: string;
    };
    composition_note: string;
    asset_file: string;
  };
  overlay_ui: {
    headline: string;
  };
}

export interface DistributionTargets {
  linkedin_start: string;
  linkedin_end: string;
  linkedin_hook: string;
  tiktok_start: string;
  tiktok_end: string;
  tiktok_hook: string;
  short_outro_cta: string;
  short_outro_duration_seconds: number;
}

export interface PodcastEpisodeMetadata {
  episode_slug: string;
  episode_title: string;
  audio_file: string;
  vibe_theme: string;
  channel_name?: string;
  channel_tagline?: string;
  editorial_pillar?: string;
  distribution_targets: DistributionTargets;
}

export interface PodcastDebateData {
  metadata: PodcastEpisodeMetadata;
  timeline: TimelineSegment[];
}

export interface PreparedTimelineSegment extends TimelineSegment {
  startFrame: number;
  endFrame: number;
  durationFrames: number;
}

export function timeToSeconds(timeStr: string): number {
  const [hms, ms] = timeStr.split(",");
  const [h, m, s] = hms.split(":").map(Number);
  return h * 3600 + m * 60 + s + parseInt(ms || "0", 10) / 1000;
}

export function prepareSegments(
  debateData: PodcastDebateData,
  fps: number = 30,
): PreparedTimelineSegment[] {
  return debateData.timeline.map((segment) => {
    const startSecs = timeToSeconds(segment.start_time);
    const endSecs = timeToSeconds(segment.end_time);

    const startFrame = Math.round(startSecs * fps);
    const endFrame = Math.round(endSecs * fps);
    const durationFrames = endFrame - startFrame;

    return {
      ...segment,
      startFrame,
      endFrame,
      durationFrames,
    };
  });
}

export function getEpisodeDurationInFrames(
  debateData: PodcastDebateData,
  fps: number = 30,
): number {
  const lastSegment = debateData.timeline.at(-1);
  if (!lastSegment) {
    return 0;
  }

  return Math.round(timeToSeconds(lastSegment.end_time) * fps);
}
