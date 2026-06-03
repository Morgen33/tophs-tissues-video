export type VideoState = "idle" | "pulling" | "win" | "lose" | "resetting";

export type PullResult = "win" | "lose" | null;

export interface VideoStateConfig {
  src: string;
  loop: boolean;
}

export const VIDEO_STATES: Record<VideoState, VideoStateConfig> = {
  idle: {
    src: "/videos/tissue-idle.mp4",
    loop: true,
  },
  pulling: {
    src: "/videos/tissue-pull.mp4",
    loop: false,
  },
  win: {
    src: "/videos/tissue-win.mp4",
    loop: false,
  },
  lose: {
    src: "/videos/tissue-lose.mp4",
    loop: false,
  },
  resetting: {
    src: "/videos/tissue-reset.mp4",
    loop: false,
  },
};

/** Set true to play reset clip before returning to idle after a result. */
export const USE_RESET_STATE = false;
