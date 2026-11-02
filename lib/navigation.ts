import { divisions as businessDivisions } from "@/lib/divisions";
import { type Photo, photos } from "@/lib/photos";

export type NavLink = { href: string; label: string; description?: string };

const about: NavLink = {
  href: "/about",
  label: "About Us",
  description: "Our story, vision and the way we build",
};
const news: NavLink = {
  href: "/news-media",
  label: "News & Media",
  description: "Announcements, milestones and insights",
};
const divisions: NavLink = {
  href: "/business-divisions",
  label: "Business Divisions",
  description: "Twelve specialized industrial businesses",
};
const commerce: NavLink = {
  href: "/global-commerce",
  label: "Global Commerce",
  description: "Trade, sourcing, import and export",
};
const innovation: NavLink = {
  href: "/innovation-technology",
  label: "Innovation & Technology",
  description: "Research, engineering and advanced materials",
};
const manufacturing: NavLink = {
  href: "/manufacturing-supply-chain",
  label: "Manufacturing & Supply Chain",
  description: "From industrial capability to reliable supply",
};
const suppliers: NavLink = {
  href: "/suppliers-procurement",
  label: "Suppliers & Procurement",
  description: "Join our global supplier network",
};
const partnerships: NavLink = {
  href: "/partnerships",
  label: "Partnerships",
  description: "Build stronger industrial ecosystems with us",
};
const careers: NavLink = {
  href: "/contact#careers",
  label: "Careers",
  description: "Build a meaningful industrial career",
};

export const contactLink: NavLink = { href: "/contact", label: "Connect With Us" };
export const partnerLink: NavLink = { href: "/partnerships", label: "Partner With Us" };

export type MegaFeature = { href: string; label: string; photo: Photo };
/**
 * The menu links to anchors of the overview pages became topic pages of their own (lib/topics);
 * app/sitemap.ts fails the build if a menu link points at a page that doesn't exist.
 */
export type MegaGroup = {
  label: string;
  /** Overview page the menu label and the panel title link to. */
  overview: NavLink;
  links: NavLink[];
  featured: MegaFeature[];
};

/** The header menu, in the order the bar shows it. */
export const megaMenu: MegaGroup[] = [
  {
    label: "Company",
    overview: about,
    links: [
      { href: "/about/who-we-are", label: "Who We Are" },
      { href: "/about/our-purpose", label: "Our Purpose" },
      { href: "/about/our-vision", label: "Our Vision" },
      { href: "/about/our-mission", label: "Our Mission" },
      { href: "/about/our-business-model", label: "Our Business Model" },
      { href: "/about/our-people", label: "Our People" },
      { href: "/about/values-and-culture", label: "Values & Culture" },
      { href: "/about/leadership-and-governance", label: "Leadership & Governance" },
      news,
      partnerships,
      careers,
      { href: "/contact", label: "Contact" },
    ],
    featured: [
      { href: "/about", label: "About Cosmox Industries", photo: photos.heroAbout },
      { href: "/news-media", label: "Latest News", photo: photos.heroNews },
    ],
  },
  {
    label: "Business Divisions",
    overview: divisions,
    // Divisions with product pages link to them; the rest link to their section of the overview.
    links: businessDivisions.map((division) => ({ href: division.href, label: division.name })),
    featured: [
      { href: "/business-divisions", label: "Our 12 Business Divisions", photo: photos.heroDivisions },
      { href: "/business-divisions#industries-of-tomorrow", label: "Industries of Tomorrow", photo: photos.semiconductor },
    ],
  },
  {
    label: "Manufacturing & Supply Chain",
    overview: manufacturing,
    links: [
      { href: "/manufacturing-supply-chain/our-manufacturing-philosophy", label: "Our Manufacturing Philosophy" },
      { href: "/manufacturing-supply-chain/from-raw-material-to-customer", label: "From Raw Material to Customer" },
      { href: "/manufacturing-supply-chain/manufacturing-capabilities", label: "Manufacturing Capabilities" },
      { href: "/manufacturing-supply-chain/custom-manufacturing", label: "Custom Manufacturing" },
      { href: "/manufacturing-supply-chain/quality-management", label: "Quality Management" },
      { href: "/manufacturing-supply-chain/supply-chain", label: "Supply Chain" },
      { href: "/manufacturing-supply-chain/responsible-operations", label: "Responsible Operations" },
      suppliers,
      { href: "/suppliers-procurement#supplier-registration", label: "Supplier Registration" },
    ],
    featured: [
      { href: "/manufacturing-supply-chain", label: "Manufacturing & Supply Chain", photo: photos.heroManufacturing },
      { href: "/suppliers-procurement", label: "Become a Supplier", photo: photos.heroSuppliers },
    ],
  },
  {
    label: "Global Commerce",
    overview: commerce,
    links: [
      { href: "/global-commerce/a-global-industrial-network", label: "A Global Industrial Network" },
      { href: "/global-commerce/global-trade", label: "Global Trade" },
      { href: "/global-commerce/global-distribution", label: "Global Distribution" },
      { href: "/global-commerce/global-sourcing", label: "Global Sourcing" },
      { href: "/global-commerce/cross-border-supply", label: "Cross-Border Supply" },
      { href: "/global-commerce/regional-markets", label: "Regional Markets" },
      { href: "/global-commerce/responsible-trade", label: "Responsible Trade" },
    ],
    featured: [
      { href: "/global-commerce", label: "Global Commerce", photo: photos.heroCommerce },
      { href: "/global-commerce/regional-markets", label: "Regional Markets", photo: photos.global },
    ],
  },
  {
    label: "Innovation & Technology",
    overview: innovation,
    links: [
      { href: "/innovation-technology/research-and-development", label: "Research & Development" },
      { href: "/innovation-technology/global-innovation-and-research-center", label: "Innovation & Research Center" },
      { href: "/innovation-technology/technology-areas", label: "Technology Areas" },
      { href: "/innovation-technology/advanced-materials", label: "Advanced Materials" },
      { href: "/innovation-technology/automation-and-robotics", label: "Automation & Robotics" },
      { href: "/innovation-technology/artificial-intelligence", label: "Artificial Intelligence" },
      { href: "/innovation-technology/digital-industry", label: "Digital Industry" },
      { href: "/innovation-technology/customer-driven-innovation", label: "Customer-Driven Innovation" },
      { href: "/innovation-technology/open-innovation", label: "Open Innovation" },
    ],
    featured: [
      { href: "/innovation-technology", label: "Innovation & Technology", photo: photos.heroInnovation },
      { href: "/innovation-technology/digital-industry", label: "Digital Industry", photo: photos.digital },
    ],
  },
  {
    label: "Sustainability",
    overview: { href: "/sustainability-esg", label: "Sustainability & ESG", description: "Responsible growth across our value chain" },
    links: [
      { href: "/sustainability-esg/our-sustainability-vision", label: "Our Sustainability Vision" },
      { href: "/sustainability-esg/our-esg-framework", label: "Our ESG Framework" },
      { href: "/sustainability-esg/environment", label: "Environment" },
      { href: "/sustainability-esg/energy-and-climate", label: "Energy & Climate" },
      { href: "/sustainability-esg/circular-economy", label: "Circular Economy" },
      { href: "/sustainability-esg/social-responsibility", label: "Social Responsibility" },
      { href: "/sustainability-esg/governance", label: "Governance & Ethics" },
      { href: "/sustainability-esg/our-esg-priorities", label: "Our ESG Priorities" },
    ],
    featured: [
      { href: "/sustainability-esg", label: "Sustainability & ESG", photo: photos.heroSustainability },
      { href: "/business-divisions/energy", label: "Energy Division", photo: photos.energy },
    ],
  },
];

export const footerQuickLinks: NavLink[] = [
  { href: "/news-media", label: "News & Media" },
  { href: "/news-media#press-releases", label: "Press Releases" },
  { href: "/suppliers-procurement", label: "Suppliers" },
  { href: "/contact", label: "Contact" },
];

/** Legal pages, linked from the bottom of the footer. */
export const legalLinks: NavLink[] = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-use", label: "Terms of Use" },
  { href: "/cookie-policy", label: "Cookie Policy" },
];
