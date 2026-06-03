import type { PullResult } from "../data/videoStates";
import { BoogerReveal } from "./BoogerReveal";

interface ResultPanelProps {
  result: PullResult;
  canPullAgain: boolean;
  onPullAgain: () => void;
}

export function ResultPanel({ result, canPullAgain, onPullAgain }: ResultPanelProps) {
  if (!result) return null;

  const isWin = result === "win";

  return (
    <div className={`result-panel ${isWin ? "result-panel--win" : "result-panel--lose"}`}>
      <p className="result-panel__message">
        {isWin ? "You pulled a fresh Booger." : "Just tissue. Try again."}
      </p>

      {isWin && <BoogerReveal />}

      <button
        type="button"
        className="button button--secondary"
        onClick={onPullAgain}
        disabled={!canPullAgain}
      >
        Pull Again
      </button>
    </div>
  );
}
