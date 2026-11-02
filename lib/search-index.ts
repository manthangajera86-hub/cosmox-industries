import { catalogues, categoryPath, productPath } from "@/lib/catalogue";
import { divisionProfiles } from "@/lib/division-profiles";
import { divisions } from "@/lib/divisions";
import { topicSearchEntries } from "@/lib/topics/search";

/**
 * Everything the header search can find. Loaded only when the search opens, so it adds nothing
 * to normal page loads. Every `href` must point at a real page or section id.
 */
export type SearchKind = "Product" | "Category" | "Service" | "Division" | "Page";
export type SearchEntry = {
  kind: SearchKind;
  title: string;
  /** Where the result lives, shown under the title. */
  context: string;
  href: string;
  /** Extra words that should find this entry but aren't shown. */
  keywords?: string;
  /** Id of the business division the entry belongs to (lib/divisions), for the division filter. */
  division?: string;
};

const divisionEntries: SearchEntry[] = divisions.map((division) => {
  const profile = divisionProfiles[division.id];
  return {
    kind: "Division",
    title: division.name,
    context: division.summary,
    href: division.href,
    keywords: [profile.title, ...profile.applications, ...profile.capabilities].join(" "),
    division: division.id,
  };
});

// Common abbreviations buyers search for, keyed by the product name they stand for.
const ABBREVIATIONS: Record<string, string> = {
  "Active pharmaceutical ingredients": "api apis",
  "EV materials": "electric vehicle",
};

// Each division's areas of focus are its products and materials, listed in its section of the overview.
const focusEntries: SearchEntry[] = divisions.flatMap((division) =>
  divisionProfiles[division.id].focus.map((item) => ({
    kind: "Product" as const,
    title: item,
    context: `${division.name} division`,
    href: `/business-divisions#${division.id}`,
    keywords: `${division.name} ${ABBREVIATIONS[item] ?? ""}`,
    division: division.id,
  })),
);

// Product pages (lib/catalogue): every category, product family and product. A product family's
// result opens its category page at the product list.
const catalogueEntries: SearchEntry[] = catalogues.flatMap((catalogue) =>
  catalogue.categories.flatMap((category) => {
    const href = categoryPath(catalogue, category);
    const context = `${catalogue.division.name} · ${category.shortName}`;
    const division = catalogue.division.id;
    return [
      {
        kind: "Category" as const,
        title: category.name,
        context: `${catalogue.division.name} · ${category.summary}`,
        href,
        keywords: category.shortName,
        division,
      },
      ...category.families.map((family) => ({
        kind: "Product" as const,
        title: family,
        context: `Product family · ${context}`,
        href: `${href}#products`,
        division,
      })),
      ...category.products.map((product) => ({
        kind: "Product" as const,
        title: product,
        context,
        href: productPath(catalogue, category, product),
        division,
      })),
    ];
  }),
);

const productEntries = [...catalogueEntries, ...focusEntries];

const service = (title: string, context: string, href: string, keywords = ""): SearchEntry => ({
  kind: "Service",
  title,
  context,
  href,
  keywords,
});

const MANUFACTURING = "Manufacturing & Supply Chain";
const COMMERCE = "Global Commerce";
const INNOVATION = "Innovation & Technology";
const PARTNERS = "Partnerships";
const SUPPLIERS = "Suppliers & Procurement";
const CONTACT = "Contact Us";
const ESG = "Sustainability & ESG";

const serviceEntries: SearchEntry[] = [
  service("Specialty & Process Manufacturing", MANUFACTURING, "/manufacturing-supply-chain/manufacturing-capabilities", "batch continuous pilot commercial scale production plant"),
  service("Process Development", MANUFACTURING, "/manufacturing-supply-chain/manufacturing-capabilities", "process engineering lab plant transfer"),
  service("Scale-Up", MANUFACTURING, "/manufacturing-supply-chain/manufacturing-capabilities", "pilot commercial scale optimization yield"),
  service("Custom Manufacturing", MANUFACTURING, "/manufacturing-supply-chain/custom-manufacturing", "custom specification formulation grade purity dedicated production packaging"),
  service("Contract & OEM Manufacturing", MANUFACTURING, "/manufacturing-supply-chain/manufacturing-capabilities", "contract manufacturing oem private label toll capacity"),
  service("Customer-Specific Supply", MANUFACTURING, "/manufacturing-supply-chain/manufacturing-capabilities", "recurring supply long term contract scheduled delivery safety stock"),
  service("Quality Management & Testing", MANUFACTURING, "/manufacturing-supply-chain/quality-management", "quality control testing inspection traceability batch documentation certificate"),
  service("Supply Chain Management", MANUFACTURING, "/manufacturing-supply-chain/supply-chain", "supplier management planning inventory resilience"),
  service("Warehousing & Logistics", MANUFACTURING, "/manufacturing-supply-chain/supply-chain", "storage freight transport road ocean air shipping"),
  service("Automation & Digital Manufacturing", MANUFACTURING, "/manufacturing-supply-chain/responsible-operations", "robotics automation predictive maintenance analytics"),
  service("Export", COMMERCE, "/global-commerce/global-trade", "international sales export markets"),
  service("Import", COMMERCE, "/global-commerce/global-trade", "import india international products technologies"),
  service("International Trading", COMMERCE, "/global-commerce/global-trade", "trade buyers sellers"),
  service("Distribution", COMMERCE, "/global-commerce/global-distribution", "distributor regional inventory market coverage delivery"),
  service("Global Sourcing & Procurement", COMMERCE, "/global-commerce/global-sourcing", "sourcing supplier procurement qualification buy"),
  service("Cross-Border Supply & Trade Compliance", COMMERCE, "/global-commerce/cross-border-supply", "customs documentation compliance certificate origin shipping"),
  service("Market Development", COMMERCE, "/global-commerce/global-trade", "market entry business development intelligence"),
  service("Regional Markets", COMMERCE, "/global-commerce/regional-markets", "north america europe asia pacific middle east africa latin america"),
  service("Research & Development", INNOVATION, "/innovation-technology/research-and-development", "r&d prototyping validation testing commercialization"),
  service("Global Innovation & Research Center", INNOVATION, "/innovation-technology/global-innovation-and-research-center", "research center laboratory"),
  service("Advanced Materials", INNOVATION, "/innovation-technology/advanced-materials", "material thermal chemical electrical barrier lightweight"),
  service("Artificial Intelligence", INNOVATION, "/innovation-technology/artificial-intelligence", "ai machine learning forecasting analytics"),
  service("Automation & Robotics", INNOVATION, "/innovation-technology/automation-and-robotics", "robot automation"),
  service("Digital Industry", INNOVATION, "/innovation-technology/digital-industry", "industrial data digital manufacturing predictive"),
  service("Energy & Electrochemical Technology", INNOVATION, "/innovation-technology/technology-areas", "battery energy storage electrochemical"),
  service("Electronics & Semiconductor Technology", INNOVATION, "/innovation-technology/technology-areas", "semiconductor electronic chemical high purity"),
  service("Biotechnology & Life Sciences", INNOVATION, "/innovation-technology/technology-areas", "biotech bioprocessing pharmaceutical"),
  service("Sustainable Technology", INNOVATION, "/innovation-technology/technology-areas", "recycling circular efficiency"),
  service("Customer-Driven Innovation", INNOVATION, "/innovation-technology/customer-driven-innovation", "innovation challenge co-development"),
  service("Strategic Partnerships", PARTNERS, "/partnerships#strategic-partnerships", "alliance joint venture market entry"),
  service("Technology Partnerships", PARTNERS, "/partnerships#technology-partnerships", "technology company startup"),
  service("Research & University Partnerships", PARTNERS, "/partnerships#research-partnerships", "university research institution collaboration"),
  service("Manufacturing, Distribution & Licensing Partnerships", PARTNERS, "/partnerships#ways-to-partner", "joint development co-development licensing startup capital distributor"),
  service("Supplier Registration", SUPPLIERS, "/suppliers-procurement#supplier-registration", "become supplier register vendor"),
  service("Supplier Qualification & Onboarding", SUPPLIERS, "/suppliers-procurement#supplier-onboarding", "qualification due diligence onboarding approved supplier"),
  service("Requests for Quotation (RFQ)", SUPPLIERS, "/suppliers-procurement#request-for-quotation", "rfq rfi tender quote procurement"),
  service("What We Source", SUPPLIERS, "/suppliers-procurement#what-we-source", "raw material component technology service"),
  service("Product & Sales Inquiry", CONTACT, "/contact#product-and-sales-inquiries", "quotation quote price sample buy order"),
  service("Technical Inquiry", CONTACT, "/contact#technical-inquiries", "specification documentation grade"),
  service("Send an Inquiry", CONTACT, "/contact#send-us-an-inquiry", "contact form message enquiry"),
  service("Careers", CONTACT, "/contact#careers", "job career employment vacancy"),
  service("Media Inquiry", CONTACT, "/contact#media-contact", "press journalist media kit"),
  service("Energy & Climate", ESG, "/sustainability-esg/energy-and-climate", "emissions renewable energy efficiency"),
  service("Circular Economy", ESG, "/sustainability-esg/circular-economy", "recycling reuse recovery circularity"),
];

const page = (title: string, context: string, href: string, keywords = ""): SearchEntry => ({
  kind: "Page",
  title,
  context,
  href,
  keywords,
});

const pageEntries: SearchEntry[] = [
  page("Home", "Cosmox Industries overview", "/"),
  page("About Us", "Who we are, purpose, values and leadership", "/about", "company vision mission governance people"),
  page("Business Divisions", "Twelve specialized industrial businesses", "/business-divisions", "industries products"),
  page("Global Commerce", "Trade, sourcing, import and export", "/global-commerce"),
  page("Manufacturing & Supply Chain", "From industrial capability to reliable supply", "/manufacturing-supply-chain"),
  page("Innovation & Technology", "Research, engineering and advanced materials", "/innovation-technology"),
  page("Partnerships", "Build stronger industrial ecosystems with us", "/partnerships"),
  page("Suppliers & Procurement", "Join our global supplier network", "/suppliers-procurement", "vendor"),
  page("Sustainability & ESG", "Responsible growth across our value chain", "/sustainability-esg", "environment social governance"),
  page("News & Media", "Announcements, press releases and media resources", "/news-media", "press"),
  page("Contact Us", "Inquiries, careers and corporate office", "/contact", "enquiry"),
  page("Privacy Policy", "How we handle your information", "/privacy-policy", "data protection"),
  page("Terms of Use", "Terms for using this website", "/terms-of-use"),
  page("Cookie Policy", "Cookies and browser storage", "/cookie-policy"),
];

// The topic pages under the main sections (lib/topics), found by their own name and section names.
const topicEntries: SearchEntry[] = topicSearchEntries.map((topic) => ({
  kind: "Page",
  title: topic.label,
  context: `${topic.section} · ${topic.title}`,
  href: topic.href,
  keywords: topic.keywords,
}));

export const searchEntries: SearchEntry[] = [
  ...productEntries,
  ...serviceEntries,
  ...divisionEntries,
  ...pageEntries,
  ...topicEntries,
];

// ---------- matching ----------

const STOP_WORDS = new Set(["a", "an", "and", "for", "in", "of", "on", "or", "the", "to", "with"]);

/** Lowercase, strip accents and punctuation, and reduce simple plurals ("batteries" → "battery"). */
function words(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => {
      if (word.length > 4 && word.endsWith("ies")) return `${word.slice(0, -3)}y`;
      if (word.length > 3 && word.endsWith("s") && !word.endsWith("ss")) return word.slice(0, -1);
      return word;
    });
}

const KIND_WEIGHT: Record<SearchKind, number> = { Division: 4, Category: 4, Service: 3, Product: 3, Page: 2 };

const prepared = searchEntries.map((entry) => ({
  entry,
  title: words(entry.title),
  all: words(`${entry.title} ${entry.context} ${entry.keywords ?? ""}`),
}));

export type SearchOptions = {
  /** Only these kinds of entry. */
  kinds?: SearchKind[];
  /** Only entries of this business division (its id in lib/divisions). */
  division?: string;
};

// With no query, a chosen division lists its own pages in this order: itself, then its
// categories, then its products.
const BROWSE_ORDER: SearchKind[] = ["Division", "Category", "Product"];

/**
 * Entries whose words start with every word of the query, best first: title matches beat
 * context and keyword matches, and a title that starts with the query ranks highest.
 * With an empty query and a division chosen, returns everything in that division.
 */
export function searchSite(query: string, { kinds, division }: SearchOptions = {}): SearchEntry[] {
  const pool = prepared.filter(
    (item) => (!kinds || kinds.includes(item.entry.kind)) && (!division || item.entry.division === division),
  );
  const all = words(query);
  const tokens = all.filter((token) => !STOP_WORDS.has(token));
  const terms = tokens.length > 0 ? tokens : all;
  if (terms.length === 0) {
    if (!division) return [];
    return BROWSE_ORDER.flatMap((kind) => pool.filter((item) => item.entry.kind === kind).map((item) => item.entry));
  }
  const phrase = terms.join(" ");

  const matches: { entry: SearchEntry; score: number }[] = [];
  for (const item of pool) {
    let score = 0;
    let matched = true;
    for (const term of terms) {
      // One- and two-letter terms ("ev", "ai") match whole words only, not every word they start.
      const hit = term.length < 3 ? (word: string) => word === term : (word: string) => word.startsWith(term);
      if (item.title.some(hit)) score += item.title.includes(term) ? 12 : 9;
      else if (item.all.some(hit)) score += 3;
      else {
        matched = false;
        break;
      }
    }
    if (!matched) continue;
    const title = item.title.join(" ");
    if (title === phrase) score += 60;
    else if (title.startsWith(phrase)) score += 30;
    matches.push({ entry: item.entry, score: score + KIND_WEIGHT[item.entry.kind] });
  }

  return matches
    .sort((a, b) => b.score - a.score || a.entry.title.length - b.entry.title.length)
    .map((match) => match.entry);
}
