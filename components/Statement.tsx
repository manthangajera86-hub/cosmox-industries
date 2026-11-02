import Image from "next/image";
import Link from "next/link";
import { useId, type ReactNode } from "react";
import { ChevronIcon } from "@/components/icons";
import type { Photo } from "@/lib/photos";

type StatementProps = {
  /** Anchor for in-page links. */
  id?: string;
  /** Large headline across the full width. */
  title: string;
  /** Small bulleted label in the left column. */
  label: string;
  /** Large lead paragraph in the middle column. */
  lead: ReactNode;
  /** Optional smaller supporting text under the lead. */
  children?: ReactNode;
  action?: { href: string; label: string };
  photo?: Photo;
};

export default function Statement({ id, title, label, lead, children, action, photo }: StatementProps) {
  const titleId = useId();
  return (
    <section id={id} className="statement" aria-labelledby={titleId}>
      <div className="container">
        <h2 className="statement-title" id={titleId}>
          {title}
        </h2>
        <div className={photo ? "statement-body" : "statement-body statement-body-no-media"}>
          <p className="statement-label">{label}</p>
          <div className="statement-text">
            <p className="statement-lead">{lead}</p>
            {children && <div className="statement-support">{children}</div>}
            {action && (
              <Link className="pill-link" href={action.href}>
                {action.label}
                <ChevronIcon />
              </Link>
            )}
          </div>
          {photo && (
            <div className="statement-media">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                placeholder="blur"
                sizes="(max-width: 760px) 100vw, (max-width: 1080px) 40vw, 360px"
                style={photo.position ? { objectPosition: photo.position } : undefined}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
