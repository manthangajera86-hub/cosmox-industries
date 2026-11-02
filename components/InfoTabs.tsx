"use client";

import Image from "next/image";
import Link from "next/link";
import { useId } from "react";
import { ChevronIcon } from "@/components/icons";
import { useTabs } from "@/hooks/useTabs";
import type { Photo } from "@/lib/photos";

export type InfoTab = { tab: string; title: string; text: string; href: string; action: string; photo: Photo };

type InfoTabsProps = {
  /** Anchor for in-page links. */
  id?: string;
  /** Small bulleted label above the headline. */
  label: string;
  title: string;
  tabs: InfoTab[];
};

/**
 * Headline, then an inset photo card with pill tabs; the selected tab's title, text and link
 * sit on the card. All panels stay in the DOM (only the selected one shows) so translation
 * tools see every panel's text.
 */
export default function InfoTabs({ id, label, title, tabs }: InfoTabsProps) {
  const baseId = useId();
  const { active, seen, select, onKeyDown, tabRef } = useTabs(tabs.length);

  return (
    <section id={id} className="info-tabs" aria-labelledby={`${baseId}-title`}>
      <div className="container">
        <div className="info-tabs-head">
          <p className="statement-label">{label}</p>
          <h2 className="info-tabs-title" id={`${baseId}-title`}>
            {title}
          </h2>
        </div>

        <div className="info-tabs-card">
          {seen.map((index) => (
            <Image
              key={tabs[index].href}
              className="info-tabs-image"
              data-active={index === active}
              src={tabs[index].photo.src}
              alt=""
              fill
              placeholder="blur"
              sizes="(max-width: 1320px) 100vw, 1240px"
            />
          ))}
          <div className="info-tabs-overlay" aria-hidden="true" />

          <div className="info-tabs-list" role="tablist" aria-label={label} onKeyDown={onKeyDown}>
            {tabs.map((item, index) => (
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
                {item.tab}
              </button>
            ))}
          </div>

          <div className="info-tabs-panels">
            {tabs.map((item, index) => (
              <div
                key={item.href}
                className="info-tabs-panel"
                role="tabpanel"
                id={`${baseId}-panel-${index}`}
                aria-labelledby={`${baseId}-tab-${index}`}
                data-active={index === active}
                inert={index !== active}
              >
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <Link className="pill-link pill-link-light" href={item.href}>
                  {item.action}
                  <ChevronIcon />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
