import Image from "next/image";
import Link from "next/link";
import { useId, type ReactNode } from "react";
import { ChevronIcon } from "@/components/icons";
import type { Photo } from "@/lib/photos";

type FeatureBannerProps = {
  /** Anchor for in-page links. */
  id?: string;
  title: string;
  children: ReactNode;
  /** `context` is read only by screen readers and search engines, to make a short label like "Learn More" specific. */
  action: { href: string; label: string; context?: string };
  photo: Photo;
};

/** Full-bleed photo banner with a large headline, short text and one call to action. */
export default function FeatureBanner({ id, title, children, action, photo }: FeatureBannerProps) {
  const titleId = useId();
  return (
    <section id={id} className="feature-banner" aria-labelledby={titleId}>
      <Image
        className="feature-banner-image"
        src={photo.src}
        alt={photo.alt}
        fill
        placeholder="blur"
        sizes="100vw"
        style={photo.position ? { objectPosition: photo.position } : undefined}
      />
      <div className="feature-banner-overlay" aria-hidden="true" />
      <div className="container feature-banner-inner">
        <h2 className="feature-banner-title" id={titleId}>
          {title}
        </h2>
        <div className="feature-banner-text">{children}</div>
        <Link className="pill-link pill-link-light" href={action.href}>
          {action.label}
          {action.context && <span className="sr-only"> {action.context}</span>}
          <ChevronIcon />
        </Link>
      </div>
    </section>
  );
}
