"use client";

import { useRef, useState, type KeyboardEvent } from "react";

/**
 * State and keyboard handling for an accessible tab list: arrow keys (either axis), Home and
 * End move between tabs. `seen` lists the tabs opened so far, so panels with heavy media can
 * mount lazily and then stay mounted for smooth crossfades.
 */
export function useTabs(count: number) {
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState<number[]>([0]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number, focus = false) => {
    setActive(index);
    setSeen((list) => (list.includes(index) ? list : [...list, index]));
    if (focus) tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const last = count - 1;
    const keys: Record<string, number> = {
      ArrowDown: active === last ? 0 : active + 1,
      ArrowRight: active === last ? 0 : active + 1,
      ArrowUp: active === 0 ? last : active - 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    select(keys[event.key], true);
  };

  const tabRef = (index: number) => (node: HTMLButtonElement | null) => {
    tabRefs.current[index] = node;
  };

  return { active, seen, select, onKeyDown, tabRef };
}
