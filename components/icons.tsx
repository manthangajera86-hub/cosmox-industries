/** Small right chevron used in pill links and linked rows. */
export function ChevronIcon() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true">
      <path d="m4.5 2.5 3.5 3.5-3.5 3.5" />
    </svg>
  );
}

/** Pause and play symbols, for media controls. */
export function PauseIcon() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true">
      <path d="M3 2h2v8H3zM7 2h2v8H7z" />
    </svg>
  );
}

export function PlayIcon() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true">
      <path d="M3.5 2 10 6l-6.5 4z" />
    </svg>
  );
}

/** Arrow in a circle, used on menu titles and photo cards. */
export function CircleArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10.5" />
      <path d="M9 7.5 16 12l-7 4.5 1.6-4.5Z" />
    </svg>
  );
}
