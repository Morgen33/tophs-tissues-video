import { useCallback, useMemo, useRef, useState } from "react";
import {
  USE_RESET_STATE,
  VIDEO_STATES,
  type PullResult,
  type VideoState,
} from "../data/videoStates";
import { rollForBooger } from "../utils/random";
import { ResultPanel } from "./ResultPanel";
import { VideoStatePlayer } from "./VideoStatePlayer";

function getStatusText(videoState: VideoState, result: PullResult): string {
  switch (videoState) {
    case "idle":
      return result ? "Ready for another pull." : "Pull a tissue to begin.";
    case "pulling":
      return "Pulling...";
    case "win":
      return "You pulled a fresh Booger.";
    case "lose":
      return "Just tissue. Try again.";
    case "resetting":
      return "Resetting...";
    default:
      return "";
  }
}

/**
 * Main tissue box interaction and video state machine.
 *
 * TODO: Wallet connect before allowing pulls.
 * TODO: NFT ownership check and free claim eligibility.
 * TODO: Claim cooldown timer between pulls.
 * TODO: Analytics event tracking for pulls, wins, and claims.
 * TODO: Add drag-based tissue pulling interaction.
 * TODO: Add sound effects for pull / win / lose.
 * TODO: Add Three.js version later if needed.
 */
export function TissueBoxExperience() {
  const [videoState, setVideoState] = useState<VideoState>("idle");
  const [result, setResult] = useState<PullResult>(null);
  const [canPullAgain, setCanPullAgain] = useState(false);
  const pendingResultRef = useRef<PullResult>(null);

  const isBusy = videoState !== "idle" || (result !== null && !canPullAgain);
  const currentConfig = VIDEO_STATES[videoState];
  const statusText = useMemo(
    () => getStatusText(videoState, result),
    [videoState, result],
  );

  const startPull = useCallback(() => {
    if (isBusy) return;

    // TODO: Require wallet connection before starting a pull.
    // TODO: Check if wallet has already pulled / claimed today.

    pendingResultRef.current = null;
    setResult(null);
    setCanPullAgain(false);
    setVideoState("pulling");
  }, [isBusy]);

  const handlePullingEnded = useCallback(() => {
    const didWin = rollForBooger();
    pendingResultRef.current = didWin ? "win" : "lose";
    setVideoState(didWin ? "win" : "lose");
  }, []);

  const handleResultEnded = useCallback(() => {
    const finalResult = pendingResultRef.current;
    setResult(finalResult);

    if (USE_RESET_STATE) {
      setVideoState("resetting");
      return;
    }

    setCanPullAgain(true);
    setVideoState("idle");
  }, []);

  const handleResetEnded = useCallback(() => {
    setCanPullAgain(true);
    setVideoState("idle");
  }, []);

  const handlePullAgain = useCallback(() => {
    if (!canPullAgain) return;
    startPull();
  }, [canPullAgain, startPull]);

  const handleVideoEnded = useCallback(() => {
    if (videoState === "pulling") {
      handlePullingEnded();
      return;
    }

    if (videoState === "win" || videoState === "lose") {
      handleResultEnded();
      return;
    }

    if (videoState === "resetting") {
      handleResetEnded();
    }
  }, [videoState, handlePullingEnded, handleResultEnded, handleResetEnded]);

  return (
    <section className="tissue-experience">
      <div className="tissue-experience__stage">
        <div className="tissue-experience__glow" aria-hidden="true" />
        <button
          type="button"
          className="tissue-experience__box-hitbox"
          onClick={startPull}
          disabled={isBusy}
          aria-label="Pull a tissue"
        >
          <VideoStatePlayer
            src={currentConfig.src}
            stateName={videoState}
            loop={currentConfig.loop}
            onEnded={currentConfig.loop ? undefined : handleVideoEnded}
            className="tissue-experience__video"
          />
        </button>
      </div>

      <p className="tissue-experience__status" aria-live="polite">
        {statusText}
      </p>

      <button
        type="button"
        className="button button--primary"
        onClick={startPull}
        disabled={isBusy}
      >
        {videoState === "pulling" ? "Pulling..." : "Pull a Tissue"}
      </button>

      <ResultPanel
        result={result}
        canPullAgain={canPullAgain}
        onPullAgain={handlePullAgain}
      />
    </section>
  );
}
