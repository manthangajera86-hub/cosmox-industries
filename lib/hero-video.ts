/**
 * Whether the home hero's background video is on screen. The hero turns dark while it plays,
 * so the clear header above it switches to light text too.
 */
let playing = false;
const listeners = new Set<() => void>();

export function subscribeToHeroVideo(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

export const heroVideoPlaying = () => playing;

export function setHeroVideoPlaying(value: boolean) {
  if (value === playing) return;
  playing = value;
  listeners.forEach((onChange) => onChange());
}

/** A muted background video: a Full HD file for wide screens and a tall centre crop for phones. */
export type HeroVideoSources = { landscape: string; portrait: string };

const reducedMotion = "(prefers-reduced-motion: reduce)";

export function subscribeToMotion(onChange: () => void) {
  const query = window.matchMedia(reducedMotion);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** Videos play only for visitors who allow motion and have not turned on data saving. */
export const videosAllowed = () =>
  !window.matchMedia(reducedMotion).matches &&
  !(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;

export const prefersReducedMotion = () => window.matchMedia(reducedMotion).matches;

/**
 * Background video of a main section page's hero (public/videos/pages, from Mixkit; see
 * assets/photos/CREDITS.md).
 */
export const pageVideo = (name: "company" | "business" | "manufacturing" | "commerce" | "innovation" | "sustainability"): HeroVideoSources => ({
  landscape: `/videos/pages/${name}.mp4`,
  portrait: `/videos/pages/${name}-portrait.mp4`,
});
