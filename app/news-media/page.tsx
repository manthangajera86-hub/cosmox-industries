import ButtonLink from "@/components/ButtonLink";
import FeatureBanner from "@/components/FeatureBanner";
import Hero from "@/components/Hero";
import NewsList from "@/components/NewsList";
import NumberedGrid from "@/components/NumberedGrid";
import SplitFeature from "@/components/SplitFeature";
import Statement from "@/components/Statement";
import { news, newsCategories } from "@/lib/news";
import { photos } from "@/lib/photos";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "News & Media",
  description:
    "Official announcements, press releases, company news and media resources from Cosmox Industries.",
  path: "/news-media",
});

export default function NewsMediaPage() {
  return (
    <>
      <Hero
        eyebrow="News & Media"
        title="The Latest From Cosmox Industries"
        photo={photos.heroNews}
        actions={
          <>
            <ButtonLink href="#latest-news">Explore Latest News</ButtonLink>
            <ButtonLink href="#media-kit" variant="ghost">Explore Media Resources</ButtonLink>
          </>
        }
      >
        <p>Welcome to the News & Media center of Cosmox Industries.</p>
      </Hero>
      <Statement
        id="news-and-media"
        title="Company developments, in one place."
        label="News & Media"
        lead="Business updates, technology advancements, manufacturing milestones, partnerships, global expansion and sustainability initiatives, all shared here as we grow."
      >
        <p>This is the central source of company information for customers, partners, suppliers, investors, employees and other stakeholders.</p>
        <p>Official announcements published here are kept distinct from third-party media coverage, commentary and industry analysis. For the latest official information, please refer to this website.</p>
      </Statement>
      <NewsList
        id="latest-news"
        title="Latest news"
        categories={newsCategories}
        items={news}
        emptyText="There are no announcements here yet. Official news and press releases will appear here as they are published."
      />
      <NumberedGrid
        id="what-we-cover"
        label="What We Cover"
        title="Following our journey"
        lead="From new technologies and manufacturing capabilities to international expansion, partnerships and sustainability, across all twelve business divisions."
        items={[
          {
            id: "press-releases",
            title: "Press Releases",
            text: <p>Formal announcements for media, customers, partners and investors: partnerships, facilities, expansion and milestones.</p>,
          },
          { title: "Company News", text: <p>New markets, capabilities, leadership, people and organizational milestones.</p> },
          { title: "Technology & Innovation", text: <p>New platforms, advanced materials, AI, automation, energy technologies and research collaborations.</p> },
          { title: "Products & Business", text: <p>New products, grades, applications, market entries and capacity additions.</p> },
          { title: "Manufacturing", text: <p>Facility development, capacity expansion, production technologies and quality initiatives.</p> },
          { title: "Global Business", text: <p>New export markets, international customers, distribution partnerships and regional expansion.</p> },
          { title: "Partnerships", text: <p>Collaborations with customers, suppliers, universities, technology companies and startups.</p> },
          { title: "Sustainability & ESG", text: <p>Energy, circularity, safety, responsible sourcing, community and governance initiatives.</p> },
          { title: "Insights & Stories", text: <p>Industry, technology and market perspectives, plus customer and supplier stories where confidentiality permits.</p> },
        ]}
      />
      <NumberedGrid
        id="media-kit"
        label="Media Center"
        title="Resources for journalists and media professionals"
        lead="Approved company resources for media use. For interviews, company information or specific assets, contact our communications team."
        tone="dark"
        items={[
          { title: "Media Kit", text: <p>Company overview, corporate description, executive biographies, approved logos and brand assets.</p> },
          { title: "Photo & Video Library", text: <p>Approved images and video of manufacturing, research, facilities, products, people and events.</p> },
          { title: "Publications", text: <p>Technology papers, industry reports, sustainability publications and corporate presentations.</p> },
          { title: "Events & Conferences", text: <p>Industry events, exhibitions and forums where you can meet our teams.</p> },
          { title: "Webinars & Presentations", text: <p>Recordings and materials on technology, manufacturing, markets and supply chains.</p> },
          { title: "Leadership Voices", text: <p>Perspectives on strategy, innovation, global markets, sustainability and long-term growth.</p> },
        ]}
        action={{ href: "/contact#media-contact", label: "Submit a Media Inquiry" }}
      />
      <SplitFeature
        id="newsletter"
        label="Stay Connected"
        title="Receive updates from Cosmox Industries"
        photo={photos.digital}
        action={{ href: "/contact#send-us-an-inquiry", label: "Subscribe to Updates" }}
        reverse
      >
        <p>Company news, technology updates, industry insights, product developments, sustainability news and event announcements.</p>
      </SplitFeature>
      <FeatureBanner
        title="Discover what’s next."
        photo={photos.heroContact}
        action={{ href: "/about", label: "About Cosmox Industries" }}
      >
        <p>Follow our progress across technology, manufacturing, global commerce, sustainability and our twelve business divisions.</p>
      </FeatureBanner>
    </>
  );
}
