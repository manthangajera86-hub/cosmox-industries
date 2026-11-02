"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { PauseIcon, PlayIcon } from "@/components/icons";
import { type HeroVideoSources, subscribeToMotion, videosAllowed } from "@/lib/hero-video";

/**
 * Muted background video for an inner-page hero. The hero photo stays as the first paint and the
 * video fades in over it once playing. Not shown with reduced motion or data saving; a button
 * pauses it (WCAG 2.2.2).
 */
export default function HeroVideo({ video }: { video: HeroVideoSources }) {
  const allowed = useSyncExternalStore(subscribeToMotion, videosAllowed, () => false);
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (stopped) element.pause();
    // Browsers may refuse to play (e.g. low-power mode); the photo then stays in view.
    else element.play().catch(() => {});
  }, [allowed, stopped]);

  if (!allowed) return null;

  return (
    <>
      <video
        ref={ref}
        className="hero-video"
        data-playing={playing}
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
        onPlaying={() => setPlaying(true)}
      >
        {/* Browsers that ignore `media` take the first source, the landscape one. */}
        <source src={video.landscape} type="video/mp4" media="(min-aspect-ratio: 4/5)" />
        <source src={video.portrait} type="video/mp4" />
      </video>
      <button
        type="button"
        className="hero-video-toggle"
        aria-label={stopped ? "Play background video" : "Pause background video"}
        onClick={() => setStopped((value) => !value)}
      >
        {stopped ? <PlayIcon /> : <PauseIcon />}
      </button>
    </>
  );
}
