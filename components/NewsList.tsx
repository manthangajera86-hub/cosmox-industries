"use client";

import Link from "next/link";
import { useId, useState } from "react";
import type { NewsCategory, NewsItem } from "@/lib/news";

type NewsListProps = {
  /** Anchor for in-page links. */
  id?: string;
  title: string;
  categories: readonly NewsCategory[];
  items: NewsItem[];
  /** Shown when there is nothing to list (in total, or in the chosen category). */
  emptyText: string;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

/** Title beside category filters and a dated list of announcements. */
export default function NewsList({ id, title, categories, items, emptyText }: NewsListProps) {
  const titleId = useId();
  const [category, setCategory] = useState<NewsCategory | null>(null);
  const shown = category ? items.filter((item) => item.category === category) : items;

  return (
    <section id={id} className="news-list" aria-labelledby={titleId}>
      <div className="container news-list-inner">
        <h2 className="news-list-title" id={titleId}>
          {title}
        </h2>
        <div>
          {items.length > 0 && (
            <div className="news-list-filters" role="group" aria-label="Filter by category">
              {[null, ...categories].map((value) => (
                <button
                  key={value ?? "all"}
                  type="button"
                  aria-pressed={category === value}
                  onClick={() => setCategory(value)}
                >
                  {value ?? "All"}
                </button>
              ))}
            </div>
          )}

          {shown.length > 0 ? (
            <ul className="news-list-items">
              {shown.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <time dateTime={item.date}>{formatDate(item.date)}</time>
                    <span className="news-list-tag">{item.category}</span>
                    <span className="news-list-headline">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="news-list-empty" role="status">
              {emptyText}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
