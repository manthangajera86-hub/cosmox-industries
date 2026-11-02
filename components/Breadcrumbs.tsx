import Link from "next/link";
import { siteUrl } from "@/lib/site";

type Crumb = { href: string; label: string };

type BreadcrumbsProps = {
  /** The pages above this one, after Home. */
  trail: Crumb[];
  /** This page's name and address. */
  current: Crumb;
};

/** Trail of links back up the site, shown under the photo header of the product pages. */
export default function Breadcrumbs({ trail, current }: BreadcrumbsProps) {
  const links = [{ href: "/", label: "Home" }, ...trail];
  // The same trail for search engines, which show it in place of the page's address.
  const structured = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [...links, current].map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: new URL(crumb.href, siteUrl).href,
    })),
  };

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="container">
        {links.map((crumb) => (
          <li key={crumb.href}>
            <Link href={crumb.href}>{crumb.label}</Link>
          </li>
        ))}
        <li aria-current="page">{current.label}</li>
      </ol>
      <script
        type="application/ld+json"
        // Serialized from the site's own page names; "<" is escaped so no name can close the tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }}
      />
    </nav>
  );
}
