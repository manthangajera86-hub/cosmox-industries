import Image from "next/image";
import Link from "next/link";
import { useId, type ReactNode } from "react";
import { ChevronIcon } from "@/components/icons";
import type { Photo } from "@/lib/photos";

type SplitFeatureProps = {
  /** Anchor for in-page links. */
  id?: string;
  /** Small bulleted label above the headline. */
  label: string;
  title: string;
  /** Large lead text under the headline. */
  children: ReactNode;
  action: { href: string; label: string };
  photo: Photo;
  /** Put the photo on the left instead of the right. */
  reverse?: boolean;
};

/** Text on one side (label, headline, lead, call to action), a large photo on the other. */
export default function SplitFeature({ id, label, title, children, action, photo, reverse = false }: SplitFeatureProps) {
  const titleId = useId();
  return (
    <section id={id} className={reverse ? "split-feature is-reverse" : "split-feature"} aria-labelledby={titleId}>
      <div className="container split-feature-inner">
        <div className="split-feature-text">
          <p className="statement-label">{label}</p>
          <h2 className="split-feature-title" id={titleId}>
            {title}
          </h2>
          <div className="split-feature-lead">{children}</div>
          <Link className="pill-link" href={action.href}>
            {action.label}
            <ChevronIcon />
          </Link>
        </div>
        <div className="split-feature-media">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            placeholder="blur"
            sizes="(max-width: 860px) 100vw, 45vw"
            style={photo.position ? { objectPosition: photo.position } : undefined}
          />
        </div>
      </div>
    </section>
  );
}
