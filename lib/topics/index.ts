import { commerceTopics } from "@/lib/topics/commerce";
import { companyTopics } from "@/lib/topics/company";
import { innovationTopics } from "@/lib/topics/innovation";
import { manufacturingTopics } from "@/lib/topics/manufacturing";
import { photos } from "@/lib/photos";
import { sustainabilityTopics } from "@/lib/topics/sustainability";
import type { Topic, TopicSection } from "@/lib/topics/types";

export type { Topic, TopicBlock, TopicChunk, TopicSection } from "@/lib/topics/types";

/**
 * The main sections whose header-menu entries each have a page of their own, e.g.
 * /about/who-we-are. The overview pages stay as they are and link to these pages.
 * Business Divisions has its own pages in lib/catalogue.
 */
export const topicSections: TopicSection[] = [
  {
    id: "company",
    name: "Company",
    overview: { href: "/about", label: "About Us" },
    topics: companyTopics,
    navTitle: "Get to know Cosmox Industries",
    photo: photos.heroAbout,
    action: {
      href: "/contact",
      label: "Connect With Us",
      title: "Let's build the future together",
      text: "Whether you are a customer, a supplier, a technology company, a manufacturer or a strategic partner, we welcome the opportunity to connect.",
    },
  },
  {
    id: "manufacturing",
    name: "Manufacturing & Supply Chain",
    overview: { href: "/manufacturing-supply-chain", label: "Manufacturing & Supply Chain" },
    topics: manufacturingTopics,
    navTitle: "Explore manufacturing & supply chain",
    photo: photos.heroManufacturing,
    action: {
      href: "/contact#manufacturing-inquiries",
      label: "Submit a Manufacturing Inquiry",
      title: "Build better. Supply reliably. Grow globally.",
      text: "From source to production, from production to market, and from market to customer.",
    },
  },
  {
    id: "commerce",
    name: "Global Commerce",
    overview: { href: "/global-commerce", label: "Global Commerce" },
    topics: commerceTopics,
    navTitle: "Explore global commerce",
    photo: photos.heroCommerce,
    action: {
      href: "/contact#product-and-sales-inquiries",
      label: "Start a Business Inquiry",
      title: "Connect to the world",
      text: "Source globally. Manufacture reliably. Trade responsibly. Grow internationally.",
    },
  },
  {
    id: "innovation",
    name: "Innovation & Technology",
    overview: { href: "/innovation-technology", label: "Innovation & Technology" },
    topics: innovationTopics,
    navTitle: "Explore innovation & technology",
    photo: photos.heroInnovation,
    action: {
      href: "/partnerships#technology-partnerships",
      label: "Explore Technology Partnerships",
      title: "Innovate with Cosmox",
      text: "We welcome conversations with organizations developing technologies or facing technical challenges that align with our industries.",
    },
  },
  {
    id: "sustainability",
    name: "Sustainability",
    overview: { href: "/sustainability-esg", label: "Sustainability & ESG" },
    topics: sustainabilityTopics,
    navTitle: "Explore sustainability & ESG",
    photo: photos.heroSustainability,
    action: {
      href: "/contact",
      label: "Connect With Us",
      title: "Building a responsible industrial future",
      text: "Responsible growth. Industrial innovation. Long-term impact.",
    },
  },
];

export const topicSection = (id: TopicSection["id"]) => topicSections.find((section) => section.id === id)!;

export const topicPath = (section: TopicSection, topic: Topic) => `${section.overview.href}/${topic.slug}`;

export const findTopic = (section: TopicSection, slug: string) => section.topics.find((topic) => topic.slug === slug);
