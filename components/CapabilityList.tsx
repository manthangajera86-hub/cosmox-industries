"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { ChevronIcon } from "@/components/icons";
import type { Photo } from "@/lib/photos";

export type Capability = { title: string; text: string; href: string; photo: Photo };

type CapabilityListProps = {
  /** Anchor for in-page links. */
  id?: string;
  /** Small bulleted label above the headline. */
  label: string;
  title: string;
  lead: string;
  items: Capability[];
};

/**
 * Dark section: pinned headline and photo on one side, a list of linked capabilities on the
 * other. Hovering or focusing a row crossfades the photo to that capability.
 */
export default function CapabilityList({ id, label, title, lead, items }: CapabilityListProps) {
  const titleId = useId();
  const [active, setActive] = useState(0);
  // Rows may share a photo; each photo is mounted once so moving between those rows doesn't flicker.
  const shown = [...new Map(items.map((item) => [item.photo.src.src, item.photo])).values()];

  return (
    <section id={id} className="capabilities" aria-labelledby={titleId}>
      <div className="container capabilities-inner">
        <div className="capabilities-side">
          <p className="statement-label">{label}</p>
          <h2 className="capabilities-title" id={titleId}>
            {title}
          </h2>
          <p className="capabilities-lead">{lead}</p>
          <div className="capabilities-media" aria-hidden="true">
            {shown.map((photo) => (
              <Image
                key={photo.src.src}
                src={photo.src}
                alt=""
                fill
                placeholder="blur"
                sizes="(max-width: 960px) 100vw, 40vw"
                data-active={photo.src.src === items[active].photo.src.src}
                style={photo.position ? { objectPosition: photo.position } : undefined}
              />
            ))}
          </div>
        </div>

        <ol className="capabilities-list">
          {items.map((item, index) => (
            <li key={item.href}>
              <Link
                href={item.href}
                data-active={index === active}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
              >
                <span className="capabilities-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="capabilities-text">
                  <span className="capabilities-name">{item.title}</span>
                  <span className="capabilities-desc">{item.text}</span>
                </span>
                <ChevronIcon />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
