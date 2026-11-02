import Image from "next/image";
import Link from "next/link";
import { useId } from "react";
import { CircleArrowIcon } from "@/components/icons";
import type { Division } from "@/lib/divisions";
import type { Photo } from "@/lib/photos";

type BusinessShowcaseProps = {
  eyebrow: string;
  /** Headline; each entry renders on its own line on wide screens. */
  titleLines: string[];
  /** Shown as a round "globe" under the headline. */
  globe: Photo;
  items: Division[];
  action: { href: string; label: string };
};

export default function BusinessShowcase({ eyebrow, titleLines, globe, items, action }: BusinessShowcaseProps) {
  const titleId = useId();
  return (
    <section className="showcase" aria-labelledby={titleId}>
      <div className="container showcase-wrap">
        {/* Pinned while the cards scroll past on wide screens. */}
        <div className="showcase-side">
          <p className="showcase-eyebrow">{eyebrow}</p>
          <h2 className="showcase-title" id={titleId}>
            {titleLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <div className="showcase-globe">
            <Image
              src={globe.src}
              alt={globe.alt}
              fill
              placeholder="blur"
              sizes="(max-width: 900px) 60vw, 26vw"
              style={globe.position ? { objectPosition: globe.position } : undefined}
            />
          </div>
        </div>

        <ul className="showcase-cards">
          {items.map((item) => (
            <li key={item.href} className="showcase-card">
              <Link href={item.href}>
                <span className="showcase-media">
                  <Image src={item.photo.src} alt="" fill placeholder="blur" sizes="(max-width: 900px) 100vw, 40vw" />
                  <CircleArrowIcon className="showcase-arrow" />
                </span>
                <span className="showcase-category">
                  {item.number} · {item.name}
                </span>
                <h3 className="showcase-card-title">{item.summary}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="showcase-cta-dock">
        <Link className="showcase-cta" href={action.href}>
          {action.label}
          <CircleArrowIcon />
        </Link>
      </div>
    </section>
  );
}
