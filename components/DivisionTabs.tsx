"use client";

import Image from "next/image";
import Link from "next/link";
import { useId } from "react";
import { ChevronIcon } from "@/components/icons";
import { useTabs } from "@/hooks/useTabs";
import type { Division } from "@/lib/divisions";

type DivisionTabsProps = {
  /** Accessible name for the tab list. */
  label: string;
  items: Division[];
  actionLabel?: string;
};

/**
 * Full-screen tabbed showcase: pill tabs on the left, the selected item's name, text and link
 * on the right, over its photo. All panels stay in the DOM (only the selected one shows) so
 * translation tools see every panel's text.
 */
export default function DivisionTabs({ label, items, actionLabel = "Learn More" }: DivisionTabsProps) {
  const baseId = useId();
  const { active, seen, select, onKeyDown, tabRef } = useTabs(items.length);

  return (
    <section className="division-tabs" aria-label={label}>
      {seen.map((index) => (
        <Image
          key={items[index].href}
          className="division-tabs-image"
          data-active={index === active}
          src={items[index].photo.src}
          alt=""
          fill
          placeholder="blur"
          sizes="100vw"
        />
      ))}
      <div className="division-tabs-overlay" aria-hidden="true" />

      <div className="container division-tabs-inner">
        <div
          className="division-tabs-list"
          role="tablist"
          aria-label={label}
          aria-orientation="vertical"
          onKeyDown={onKeyDown}
        >
          {items.map((item, index) => (
            <button
              key={item.href}
              ref={tabRef(index)}
              type="button"
              role="tab"
              id={`${baseId}-tab-${index}`}
              aria-selected={index === active}
              aria-controls={`${baseId}-panel-${index}`}
              tabIndex={index === active ? 0 : -1}
              onClick={() => select(index)}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="division-tabs-panels">
          {items.map((item, index) => (
            <div
              key={item.href}
              className="division-tabs-panel"
              role="tabpanel"
              id={`${baseId}-panel-${index}`}
              aria-labelledby={`${baseId}-tab-${index}`}
              data-active={index === active}
              inert={index !== active}
            >
              <h3 className="division-tabs-title">{item.name}</h3>
              <div className="division-tabs-body">
                <p>
                  {item.summary} {item.detail}
                </p>
                <Link className="pill-link pill-link-light" href={item.href}>
                  {actionLabel}
                  <span className="sr-only"> about {item.name}</span>
                  <ChevronIcon />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
