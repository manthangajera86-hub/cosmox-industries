import Link from "next/link";
import { useId, type ReactNode } from "react";
import { ChevronIcon } from "@/components/icons";

/** `id` lets links from other pages land on one item; `href` makes the whole item a link. */
export type NumberedItem = { title: string; text: ReactNode; id?: string; href?: string };

type NumberedGridProps = {
  /** Anchor for in-page links. */
  id?: string;
  /** Small bulleted label above the headline. */
  label: string;
  title: string;
  /** Large lead text beside the headline. */
  lead?: ReactNode;
  items: NumberedItem[];
  columns?: 3 | 4;
  tone?: "light" | "alt" | "dark";
  action?: { href: string; label: string };
  /** Extra content under the grid, such as a closing line. */
  children?: ReactNode;
};

/** Headline and lead, then a grid of numbered items divided by hairlines. */
export default function NumberedGrid({
  id,
  label,
  title,
  lead,
  items,
  columns = 3,
  tone = "light",
  action,
  children,
}: NumberedGridProps) {
  const titleId = useId();
  return (
    <section id={id} className={`numbered-grid is-${tone}`} aria-labelledby={titleId}>
      <div className="container">
        <div className="numbered-grid-head">
          <div>
            <p className="statement-label">{label}</p>
            <h2 className="numbered-grid-title" id={titleId}>
              {title}
            </h2>
          </div>
          {lead && <p className="numbered-grid-lead">{lead}</p>}
        </div>

        <ol className={`numbered-grid-list cols-${columns}`}>
          {items.map((item, index) => (
            <li key={item.title} id={item.id} className={item.href ? "is-link" : undefined}>
              <span className="numbered-grid-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{item.href ? <Link href={item.href}>{item.title}</Link> : item.title}</h3>
              <div className="numbered-grid-text">{item.text}</div>
            </li>
          ))}
        </ol>

        {children && <div className="numbered-grid-foot">{children}</div>}
        {action && (
          <Link className={tone === "dark" ? "pill-link pill-link-light" : "pill-link"} href={action.href}>
            {action.label}
            <ChevronIcon />
          </Link>
        )}
      </div>
    </section>
  );
}
