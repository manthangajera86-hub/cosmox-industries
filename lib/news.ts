export const newsCategories = [
  "Press Releases",
  "Company News",
  "Technology",
  "Manufacturing",
  "Global Business",
  "Sustainability",
] as const;

export type NewsCategory = (typeof newsCategories)[number];

export type NewsItem = {
  /** ISO date, e.g. "2026-09-11". */
  date: string;
  category: NewsCategory;
  title: string;
  /** Link to the full story: an internal page or an external article. */
  href: string;
};

/**
 * Official announcements, newest first. Add real items here as they are published, e.g.
 * { date: "2026-09-11", category: "Press Releases", title: "…", href: "/news-media/…" }.
 */
export const news: NewsItem[] = [];
