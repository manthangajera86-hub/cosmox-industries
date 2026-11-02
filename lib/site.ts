import type { Metadata } from "next";

const LOCAL_URL = "http://localhost:3000";

/**
 * The site's public address, used for canonical links, the sitemap and sharing previews.
 * Set NEXT_PUBLIC_SITE_URL (e.g. https://www.cosmoxindustries.com) once the domain is known;
 * on Vercel it falls back to the project's production domain.
 */
function resolveSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const raw = configured || (vercel ? `https://${vercel}` : "");

  if (!raw) {
    if (process.env.NODE_ENV === "production") {
      console.warn(
        `[site] NEXT_PUBLIC_SITE_URL is not set, so canonical links, the sitemap and sharing previews point at ${LOCAL_URL}. Set it to the public domain before deploying.`,
      );
    }
    return new URL(LOCAL_URL);
  }

  // Accept "www.example.com" as well as "https://www.example.com".
  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(withScheme);
  } catch {
    throw new Error(`NEXT_PUBLIC_SITE_URL must be a web address such as https://www.example.com (got "${raw}").`);
  }
}

export const siteUrl = resolveSiteUrl();

export const siteName = "Cosmox Industries";

export const siteDescription =
  "Cosmox Industries is a diversified industrial enterprise building twelve specialized businesses, connected by manufacturing, global sourcing, technology and global commerce.";

/** Every page, for the sitemap. Keep in step with the folders in `app/`. */
export const sitePages = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/business-divisions", priority: 0.9 },
  { path: "/global-commerce", priority: 0.8 },
  { path: "/manufacturing-supply-chain", priority: 0.8 },
  { path: "/innovation-technology", priority: 0.8 },
  { path: "/partnerships", priority: 0.7 },
  { path: "/suppliers-procurement", priority: 0.7 },
  { path: "/sustainability-esg", priority: 0.7 },
  { path: "/news-media", priority: 0.6 },
  { path: "/contact", priority: 0.7 },
  { path: "/privacy-policy", priority: 0.2 },
  { path: "/terms-of-use", priority: 0.2 },
  { path: "/cookie-policy", priority: 0.2 },
];

type PageMetadataOptions = {
  title: string;
  description: string;
  /** The page's path, e.g. "/about", for its canonical URL. */
  path: string;
  /** Use the title as-is instead of appending the site name (the home page). */
  absoluteTitle?: boolean;
};

/**
 * Title, description, canonical URL and sharing details for one page. Pages set their own
 * `openGraph` so previews show the page's title, not the site default.
 */
export function pageMetadata({ title, description, path, absoluteTitle = false }: PageMetadataOptions): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteName}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName, url: path, title: fullTitle, description },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}

export type Office = {
  label: string;
  /** Address lines as printed. */
  lines: string[];
  locality: string;
  region: string;
  postalCode: string;
};

/** Contact details shown in the footer and given to search engines. */
export const contact = {
  email: "info@cosmoxindustries.com",
  phones: ["+91 92659 43799", "+91 87581 94050", "+91 92650 18813"],
  offices: [
    {
      label: "Mumbai Office",
      lines: ["402, Sarita-B, Prabhat Ind. Estate,", "W.E. Highway, Nr. Check Post,", "Dahisar (E), Mumbai – 400068"],
      locality: "Mumbai",
      region: "Maharashtra",
      postalCode: "400068",
    },
    {
      label: "Surat Office",
      lines: ["A-108, Sec-2, Dwarkesh Industry,", "Umaragam Char Rasta, Rangoli Chowkdi,", "Velenja, Surat, Gujarat – 394130"],
      locality: "Surat",
      region: "Gujarat",
      postalCode: "394130",
    },
    {
      label: "Surat, Pipodara",
      lines: [
        "A2/N-59, 18/A,B,C/1, C/2, B/5, B/6,",
        "Ekta Industrial Estate, Tempa Gali,",
        "N.H. 8, Mangrol, Pipodara,",
        "Surat, Gujarat 394110, India",
      ],
      locality: "Surat",
      region: "Gujarat",
      postalCode: "394110",
    },
  ] satisfies Office[],
};

/** "+91 92659 43799" → "tel:+919265943799" */
export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
