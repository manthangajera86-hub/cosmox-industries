import Image from "next/image";
import type { ReactNode } from "react";
import HeroVideo from "@/components/HeroVideo";
import type { HeroVideoSources } from "@/lib/hero-video";
import type { Photo } from "@/lib/photos";

type Fact = { value: string; label: string };

type HeroProps = {
  eyebrow: string;
  title: string;
  photo: Photo;
  /** Muted background video over the photo, for the main section pages. */
  video?: HeroVideoSources;
  /** Full-height hero, used on the home page. */
  large?: boolean;
  /** Smaller headline on a wider measure, for long titles such as product category names. */
  compact?: boolean;
  facts?: Fact[];
  actions?: ReactNode;
  children?: ReactNode;
};

export default function Hero({
  eyebrow,
  title,
  photo,
  video,
  large = false,
  compact = false,
  facts,
  actions,
  children,
}: HeroProps) {
  return (
    <section className={["hero", large && "hero-large", compact && "hero-compact"].filter(Boolean).join(" ")}>
      <Image
        className="hero-image"
        src={photo.src}
        alt={photo.alt}
        fill
        // The header photo is the page's main content, so fetch it ahead of fonts and scripts.
        loading="eager"
        fetchPriority="high"
        placeholder="blur"
        sizes="100vw"
        style={photo.position ? { objectPosition: photo.position } : undefined}
      />
      {video && <HeroVideo video={video} />}
      <div className="hero-overlay" aria-hidden="true" />
      <div className="container hero-inner">
        <p className="eyebrow eyebrow-light">{eyebrow}</p>
        <h1>{title}</h1>
        {children && <div className="hero-lead">{children}</div>}
        {actions && <div className="cta-row">{actions}</div>}
      </div>
      {facts && (
        <div className="hero-facts">
          <dl className="container hero-facts-inner">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}
