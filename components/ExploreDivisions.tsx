"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { useDismiss } from "@/hooks/useDismiss";
import type { Division } from "@/lib/divisions";

type ExploreDivisionsProps = {
  title: string;
  /** Label on the dropdown button. */
  menuLabel: string;
  items: Division[];
  allLink: { href: string; label: string };
  /** Milliseconds each background photo stays before crossfading to the next. */
  interval?: number;
};

/**
 * Large title over a full-width stage of slowly crossfading photos, with a floating
 * dropdown that lists every item.
 */
export default function ExploreDivisions({ title, menuLabel, items, allLink, interval = 5000 }: ExploreDivisionsProps) {
  const titleId = useId();
  const menuId = useId();
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const previous = (index - 1 + items.length) % items.length;
  const next = (index + 1) % items.length;

  // Rotate only while the stage is on screen.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || open || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % items.length), interval);
    return () => window.clearTimeout(id);
  }, [index, open, visible, items.length, interval]);

  useDismiss(dockRef, open, () => setOpen(false));

  return (
    <section className="explore" aria-labelledby={titleId}>
      <div className="container">
        <h2 className="explore-title" id={titleId}>
          {title}
        </h2>
      </div>

      <div className="explore-stage" ref={stageRef}>
        {/* Only the previous, current and next photos are mounted: the previous fades out,
            the current fades in, and the next preloads unseen. */}
        {[previous, index, next].map((i) => (
          <Image
            key={items[i].href}
            className="explore-image"
            data-active={i === index}
            src={items[i].photo.src}
            alt=""
            fill
            sizes="100vw"
          />
        ))}
        <div className="explore-overlay" aria-hidden="true" />

        <div className="explore-dock" ref={dockRef}>
          <button
            type="button"
            className="explore-toggle"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen(!open)}
          >
            {menuLabel}
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="10.5" />
              <path d="M7.5 12h9M12 7.5v9" />
            </svg>
          </button>
          <div className="explore-menu" id={menuId} hidden={!open}>
            <ul>
              {items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setOpen(false)}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link className="explore-menu-all" href={allLink.href} onClick={() => setOpen(false)}>
              {allLink.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
