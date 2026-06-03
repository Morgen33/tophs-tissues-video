import { useEffect, useRef } from "react";

interface VideoStatePlayerProps {
  src: string;
  stateName: string;
  loop?: boolean;
  onEnded?: () => void;
  className?: string;
}

/**
 * Reusable video player for state-driven tissue box animations.
 *
 * Production workflow for final assets:
 * 1. Generate videos on pure white background in Grok
 * 2. Remove white background externally
 * 3. Export transparent WebM or PNG sequence
 * 4. Replace placeholder MP4 files in /public/videos/
 *
 * TODO: Swap MP4 placeholders for transparent WebM when assets are ready.
 * TODO: Optional canvas-based white background removal via .chroma-prep class.
 */
export function VideoStatePlayer({
  src,
  stateName,
  loop = false,
  onEnded,
  className = "",
}: VideoStatePlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay may be blocked until user interaction; safe to ignore here.
      });
    }
  }, [src, stateName]);

  return (
    <div className={`video-shell chroma-prep ${className}`.trim()}>
      <video
        ref={videoRef}
        key={`${stateName}-${src}`}
        className="video-player"
        src={src}
        muted
        playsInline
        autoPlay
        preload="auto"
        loop={loop}
        onEnded={loop ? undefined : onEnded}
        aria-label={`Tissue box animation: ${stateName}`}
      />
    </div>
  );
}
