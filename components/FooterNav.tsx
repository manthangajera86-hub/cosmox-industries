"use client";

import Link from "next/link";
import { useId, useState } from "react";
import type { NavLink } from "@/lib/navigation";

export type FooterColumn = {
  label: string;
  /** The group's overview page: the heading links to it, and on phones it leads the list. */
  overview?: NavLink;
  links: NavLink[];
};

/**
 * The footer's link columns. On wide screens every column shows its links under its heading. On
 * phones each heading becomes a toggle for its links, like the header's mobile menu, so the footer
 * isn't several screens long.
 */
export default function FooterNav({ columns }: { columns: FooterColumn[] }) {
  const baseId = useId();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <nav className="footer-nav" aria-label="Footer">
      {columns.map((column, index) => {
        const expanded = open === column.label;
        const listId = `${baseId}-${index}`;
        return (
          <div className={expanded ? "footer-col is-open" : "footer-col"} key={column.label}>
            <h2>
              {column.overview ? (
                <Link className="footer-col-title" href={column.overview.href}>
                  {column.label}
                </Link>
              ) : (
                <span className="footer-col-title">{column.label}</span>
              )}
              <button
                type="button"
                className="footer-col-toggle"
                aria-expanded={expanded}
                aria-controls={listId}
                onClick={() => setOpen(expanded ? null : column.label)}
              >
                {column.label}
                <span className="nav-plus" aria-hidden="true" />
              </button>
            </h2>
            <ul id={listId}>
              {column.overview && (
                <li className="footer-col-overview">
                  <Link href={column.overview.href}>{column.overview.label}</Link>
                </li>
              )}
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}
