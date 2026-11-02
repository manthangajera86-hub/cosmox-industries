import type { MetadataRoute } from "next";
import { catalogues, categoryPath, productPath } from "@/lib/catalogue";
import { megaMenu } from "@/lib/navigation";
import { sitePages, siteUrl } from "@/lib/site";
import { topicPath, topicSections } from "@/lib/topics";

// Each division's product landing page, category pages and product pages, read from lib/catalogue.
const productPages = catalogues.flatMap((catalogue) => [
  { path: catalogue.path, priority: 0.8 },
  ...catalogue.categories.flatMap((category) => [
    { path: categoryPath(catalogue, category), priority: 0.7 },
    ...category.products.map((product) => ({ path: productPath(catalogue, category, product), priority: 0.6 })),
  ]),
]);

// The topic pages under the main sections (lib/topics), one per header-menu entry.
const topicPages = topicSections.flatMap((section) =>
  section.topics.map((topic) => ({ path: topicPath(section, topic), priority: 0.7 })),
);

const pages = [...sitePages, ...productPages, ...topicPages];

// The header menu is written by hand; fail the build if one of its links leads nowhere.
const known = new Set(pages.map((page) => page.path));
for (const group of megaMenu) {
  for (const link of [group.overview, ...group.links, ...group.featured]) {
    const path = link.href.split("#")[0];
    if (!known.has(path)) throw new Error(`lib/navigation.ts: the menu link "${link.href}" has no page.`);
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: new URL(page.path, siteUrl).href,
    priority: page.priority,
  }));
}
