"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { ChevronIcon } from "@/components/icons";
import { divisions } from "@/lib/divisions";
import type { SearchEntry, SearchKind, SearchOptions } from "@/lib/search-index";

type SiteSearchProps = {
  /** Called when a result is chosen, so the surrounding menu can close. */
  onNavigate?: () => void;
  /**
   * `site` (the header) searches everything; `catalogue` (the Business Divisions pages) only
   * divisions, product categories and products.
   */
  scope?: "site" | "catalogue";
  /** Division id (lib/divisions) the division filter starts on. */
  division?: string;
  /** Focus the box on mount; for the header panel, which opens on request. */
  autoFocus?: boolean;
};

type SearchFn = (query: string, options?: SearchOptions) => SearchEntry[];

/** The result-type filters, in order. `null` kinds means every kind in scope. */
type Filter = { label: string; kinds: SearchKind[] | null };

const CATALOGUE_KINDS: SearchKind[] = ["Product", "Category", "Division"];

const FILTERS: Record<NonNullable<SiteSearchProps["scope"]>, Filter[]> = {
  site: [
    { label: "All", kinds: null },
    { label: "Products", kinds: ["Product"] },
    { label: "Categories", kinds: ["Category"] },
    { label: "Divisions", kinds: ["Division"] },
    { label: "Services", kinds: ["Service"] },
    { label: "Pages", kinds: ["Page"] },
  ],
  catalogue: [
    { label: "All", kinds: null },
    { label: "Products", kinds: ["Product"] },
    { label: "Categories", kinds: ["Category"] },
    { label: "Divisions", kinds: ["Division"] },
  ],
};

const SUGGESTIONS: Record<NonNullable<SiteSearchProps["scope"]>, string[]> = {
  site: ["Battery materials", "Pharmaceutical ingredients", "Contract manufacturing", "Import", "Advanced materials", "Supplier registration"],
  catalogue: ["Battery materials", "Pharmaceutical ingredients", "Fasteners", "Steel", "Flexible packaging", "Sensors"],
};

/** Results shown at first, and added by each "Show more". */
const PAGE = 24;

export function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 5 5" />
    </svg>
  );
}

/**
 * Search box with instant results, filtered by result type (product, category, division…) and by
 * business division. Used in the header panel and as the product finder on the Business Divisions pages.
 */
export default function SiteSearch({ onNavigate, scope = "site", division: initialDivision = "", autoFocus = false }: SiteSearchProps) {
  const router = useRouter();
  const inputId = useId();
  const resultsId = useId();
  const divisionId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [division, setDivision] = useState(initialDivision);
  // How many results are shown, for the search it was set on; a new search starts again at PAGE.
  const [shown, setShown] = useState({ for: "", count: PAGE });
  const [search, setSearch] = useState<SearchFn | null>(null);

  // The index is loaded when the search first shows rather than with every page.
  useEffect(() => {
    let current = true;
    import("@/lib/search-index").then((module) => {
      if (current) setSearch(() => module.searchSite);
    });
    return () => {
      current = false;
    };
  }, []);

  const filters = FILTERS[scope];
  const trimmed = query.trim();
  const active = Boolean(trimmed || division);
  const matches = search && active ? search(trimmed, { division: division || undefined, kinds: scope === "catalogue" ? CATALOGUE_KINDS : undefined }) : [];
  const count = (item: Filter) => (item.kinds ? matches.filter((entry) => item.kinds!.includes(entry.kind)).length : matches.length);
  const current = filters.find((item) => item.label === filter) ?? filters[0];
  const results = current.kinds ? matches.filter((entry) => current.kinds!.includes(entry.kind)) : matches;
  const signature = `${trimmed}|${division}|${current.label}`;
  const limit = shown.for === signature ? shown.count : PAGE;
  const visible = results.slice(0, limit);
  const divisionName = divisions.find((item) => item.id === division)?.name;

  const go = (href: string) => {
    onNavigate?.();
    router.push(href);
  };

  // Up and Down move between the box and the results; Enter in the box opens the top result.
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    const items = [
      inputRef.current,
      ...(rootRef.current?.querySelectorAll<HTMLElement>(".site-search-results a") ?? []),
    ].filter((item): item is HTMLInputElement | HTMLElement => Boolean(item));
    const index = items.indexOf(document.activeElement as HTMLElement);
    if (index === -1) return;
    event.preventDefault();
    const next = event.key === "ArrowDown" ? Math.min(index + 1, items.length - 1) : Math.max(index - 1, 0);
    items[next].focus();
  };

  const label = scope === "catalogue" ? "Search products, categories and divisions" : "Search products, services and pages";
  const where = divisionName ? ` in ${divisionName}` : "";

  let status = "";
  if (search && active) {
    if (results.length === 0) status = trimmed ? `No ${current.kinds ? current.label.toLowerCase() : "matches"} for “${trimmed}”${where}.` : `No ${current.label.toLowerCase()}${where}.`;
    else if (trimmed) status = `${results.length} result${results.length === 1 ? "" : "s"} for “${trimmed}”${where}`;
    else status = `${results.length} ${current.kinds ? current.label.toLowerCase() : "items"}${where}`;
  }

  return (
    <div ref={rootRef} className={scope === "catalogue" ? "site-search is-catalogue" : "site-search"} onKeyDown={onKeyDown}>
      <form
        role="search"
        className="site-search-form"
        onSubmit={(event) => {
          event.preventDefault();
          if (visible[0]) go(visible[0].href);
        }}
      >
        <label className="sr-only" htmlFor={inputId}>
          {label}
        </label>
        <SearchIcon />
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          autoFocus={autoFocus}
          autoComplete="off"
          spellCheck={false}
          placeholder={label}
          aria-controls={resultsId}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {query && (
          <button
            type="button"
            className="site-search-clear"
            aria-label="Clear search"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        )}
      </form>

      <div className="site-search-filters">
        <div className="site-search-types" role="group" aria-label="Type of result">
          {filters.map((item) => (
            <button
              key={item.label}
              type="button"
              aria-pressed={item.label === current.label}
              aria-controls={resultsId}
              onClick={() => setFilter(item.label)}
            >
              {item.label}
              {search && active && <span className="site-search-count">{count(item)}</span>}
            </button>
          ))}
        </div>
        <div className="site-search-division">
          <label htmlFor={divisionId}>Division</label>
          <select id={divisionId} value={division} aria-controls={resultsId} onChange={(event) => setDivision(event.target.value)}>
            <option value="">All divisions</option>
            {divisions.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="site-search-meta" role="status" aria-live="polite">
        {status}
      </p>

      {!active && (
        <div className="site-search-suggest">
          <p>{scope === "catalogue" ? "Try searching for" : "Popular searches"}</p>
          <ul>
            {SUGGESTIONS[scope].map((suggestion) => (
              <li key={suggestion}>
                <button type="button" onClick={() => setQuery(suggestion)}>
                  {suggestion}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {search && active && results.length === 0 && (
        <p className="site-search-empty">
          {matches.length > 0 ? "Try another type of result above, " : "Try a product, material or service, such as “packaging”, “export” or “quality”, "}
          {divisionName && "search all divisions, "}
          or{" "}
          <Link href="/contact#send-us-an-inquiry" onClick={onNavigate}>
            send us your requirement
          </Link>
          .
        </p>
      )}

      <ul className="site-search-results" id={resultsId}>
        {visible.map((result) => (
          <li key={`${result.kind}-${result.title}-${result.href}`}>
            <Link href={result.href} onClick={onNavigate}>
              <span className="site-search-kind">{result.kind}</span>
              <span>
                <span className="site-search-title">{result.title}</span>
                <span className="site-search-context">{result.context}</span>
              </span>
              <ChevronIcon />
            </Link>
          </li>
        ))}
      </ul>

      {results.length > limit && (
        <button type="button" className="site-search-more" onClick={() => setShown({ for: signature, count: limit + PAGE })}>
          Show more ({results.length - limit} left)
        </button>
      )}
    </div>
  );
}
