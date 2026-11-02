import BusinessShowcase from "@/components/BusinessShowcase";
import CapabilityList from "@/components/CapabilityList";
import DivisionTabs from "@/components/DivisionTabs";
import ExploreDivisions from "@/components/ExploreDivisions";
import FeatureBanner from "@/components/FeatureBanner";
import InfoTabs from "@/components/InfoTabs";
import HomeHero from "@/components/HomeHero";
import NumberedGrid from "@/components/NumberedGrid";
import Statement from "@/components/Statement";
import SplitFeature from "@/components/SplitFeature";
import { divisions } from "@/lib/divisions";
import { photos } from "@/lib/photos";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Cosmox Industries | Building the Industrial Future",
  description:
    "Cosmox Industries is a diversified industrial enterprise building twelve specialized businesses, from pharmaceuticals and energy to semiconductors, aerospace and jewellery, connected by manufacturing, global sourcing, technology and global commerce.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <HomeHero
        titleLines={["Building the", "Industrial Future."]}
        photo={{ ...photos.heroSustainability, position: "70% center" }}
        meta="12 Business Divisions · India → World"
        slides={[
          { title: "Twelve specialized businesses working across the industrial value chain", href: "/business-divisions", photo: photos.heroDivisions, video: { landscape: "/videos/home/industry.mp4", portrait: "/videos/home/industry-portrait.mp4" } },
          { title: "Connecting products to global markets through sourcing, import and export", href: "/global-commerce", photo: photos.heroCommerce, video: { landscape: "/videos/home/commerce.mp4", portrait: "/videos/home/commerce-portrait.mp4" } },
          { title: "Research, engineering and advanced materials for the next generation of industry", href: "/innovation-technology", photo: photos.heroInnovation, video: { landscape: "/videos/home/innovation.mp4", portrait: "/videos/home/innovation-portrait.mp4" } },
          { title: "From industrial capability to reliable, resilient supply", href: "/manufacturing-supply-chain", photo: photos.heroManufacturing, video: { landscape: "/videos/home/manufacturing.mp4", portrait: "/videos/home/manufacturing-portrait.mp4" } },
          { title: "Building stronger industrial ecosystems with partners worldwide", href: "/partnerships", photo: photos.heroPartnerships, video: { landscape: "/videos/home/partnerships.mp4", portrait: "/videos/home/partnerships-portrait.mp4" } },
        ]}
      />
      {/* Everything after the hero slides up over it while the hero stays pinned. */}
      <div className="home-cover">
        <Statement
          title="Twelve specialized businesses. One connected enterprise."
          label="Who We Are"
          lead="We operate at the intersection of industries, technologies and global commerce, developing industrial capabilities that can serve customers, partners and markets across India and the world."
          action={{ href: "/about", label: "About Us" }}
          photo={photos.heroContact}
        >
          <p>Our business combines <strong>manufacturing, global sourcing, import, export, distribution, supply-chain capabilities, technology and strategic partnerships</strong> to build and develop businesses across the industrial value chain.</p>
          <p>From pharmaceuticals and food & beverage to energy, semiconductors, automotive, machinery, metals & mining, textiles, packaging, construction materials, aerospace & defence, and jewellery, our platform is designed to create businesses that can grow from specialized capabilities into globally connected industrial enterprises.</p>
        </Statement>
        <BusinessShowcase
          eyebrow="One industrial platform."
          titleLines={["Building businesses", "across essential and", "emerging industries."]}
          globe={{ ...photos.global, position: "58% 42%" }}
          items={divisions}
          action={{ href: "/business-divisions", label: "All Business Divisions" }}
        />
        <FeatureBanner
          title="Connecting Markets Across Borders"
          photo={photos.heroCommerce}
          action={{ href: "/global-commerce", label: "Learn More", context: "about Global Commerce" }}
        >
          <p>Cosmox Industries operates with a global commercial outlook, connecting products, manufacturers, suppliers, customers and industrial markets across international borders.</p>
        </FeatureBanner>
        <SplitFeature
          label="Partnerships"
          title="Stronger industrial ecosystems, together"
          photo={photos.people}
          action={{ href: "/partnerships", label: "Partner with us" }}
        >
          <p>At Cosmox Industries, we believe the most meaningful industrial progress is created through collaboration.</p>
        </SplitFeature>
        <DivisionTabs label="Our business divisions" items={divisions} />
        <ExploreDivisions
          title="Explore Our Business Divisions"
          menuLabel="Business Divisions"
          items={divisions}
          allLink={{ href: "/business-divisions", label: "All Business Divisions" }}
        />
        <NumberedGrid
          label="Our Business Model"
          title="From industrial opportunity to global business"
          lead="We do not look at industry as a collection of isolated products. We look at the entire industrial value chain, and take part wherever we can build lasting capability."
          tone="alt"
          items={[
            { title: "Discover", text: <p>We identify industrial problems, market opportunities, emerging technologies and changing customer requirements.</p> },
            { title: "Research", text: <p>We investigate technologies, materials, processes and applications.</p> },
            { title: "Develop", text: <p>We convert technical concepts and market requirements into commercially relevant products and solutions.</p> },
            { title: "Source", text: <p>We establish access to raw materials, components, equipment, products, technologies and qualified suppliers.</p> },
            { title: "Import", text: <p>We connect selected international products and technologies with Indian customers and markets.</p> },
            { title: "Manufacture", text: <p>We develop scalable, quality-focused manufacturing capabilities in India.</p> },
            { title: "Distribute", text: <p>We establish routes to market through direct customers, distributors and strategic partners.</p> },
            { title: "Export", text: <p>We connect Indian products and manufacturing capabilities with international markets.</p> },
            { title: "Scale", text: <p>We expand successful products, capabilities, partnerships and businesses across industries and geographies.</p> },
          ]}
        />
        <CapabilityList
          label="Capabilities"
          title="Where industrial ideas become real capabilities"
          lead="Technology, manufacturing and supply work as one system, so a promising idea can become a product customers rely on."
          items={[
            {
              title: "Innovation & Technology",
              text: "Advanced materials, industrial chemistry, AI, automation, energy and semiconductor technologies, focused on solving real industrial problems.",
              href: "/innovation-technology",
              photo: photos.heroInnovation,
            },
            {
              title: "Global Innovation & Research",
              text: "Collaboration with universities, laboratories, startups and technology companies to turn scientific progress into scalable products.",
              href: "/innovation-technology#global-innovation-and-research-center",
              photo: photos.semiconductor,
            },
            {
              title: "Manufacturing",
              text: "Quality-focused, scalable production in India, built on modern equipment, automation and safe, controlled operations.",
              href: "/manufacturing-supply-chain",
              photo: photos.heroManufacturing,
            },
            {
              title: "Supply Chain",
              text: "Reliable, transparent networks from raw material to customer: sourcing, warehousing, logistics and distribution.",
              href: "/manufacturing-supply-chain#from-raw-material-to-customer",
              photo: photos.heroSuppliers,
            },
            {
              title: "Quality",
              text: "Quality systems, testing, traceability and technical documentation across the complete chain, from supplier to customer.",
              href: "/manufacturing-supply-chain#quality-management",
              photo: photos.quality,
            },
            {
              title: "Digital Industry",
              text: "Industrial analytics, predictive systems, supply-chain visibility and connected operations, used where they create measurable value.",
              href: "/innovation-technology#digital-industry",
              photo: photos.digital,
            },
          ]}
        />
        <Statement
          title="Start with the problem. Build the right solution."
          label="For Customers"
          lead="Every customer has different requirements. We begin with the actual industrial challenge, then connect the right products, technologies, manufacturing and supply."
          action={{ href: "/contact", label: "Discuss Your Requirement" }}
        >
          <p>We consider the application, technical specification, performance, quantity, quality, regulatory requirements, delivery, cost and supply continuity.</p>
          <p>Where standard products are not enough, we evaluate customized products, specialized materials, OEM and contract manufacturing, and process development.</p>
          <p>Our aim is to move from product, to solution, to a <strong>long-term industrial partnership</strong> built on quality, supply reliability, technical support and responsiveness.</p>
        </Statement>
        <SplitFeature
          label="Sustainability & ESG"
          title="Growing with purpose"
          photo={photos.energy}
          action={{ href: "/sustainability-esg", label: "Explore Sustainability & ESG" }}
          reverse
        >
          <p>Responsible operations build stronger businesses, through resource efficiency, circular production, safe workplaces and strong governance.</p>
        </SplitFeature>
        <NumberedGrid
          label="Why Cosmox Industries"
          title="Built differently, built to last"
          lead="Twelve divisions, one integrated value chain and a long-term view make a business that can adapt to changing markets, supply disruptions and new technology."
          items={[
            { title: "Diversified Platform", text: <p>Twelve business divisions create a broad, resilient industrial foundation.</p> },
            { title: "Technology-Driven", text: <p>We connect technology and innovation with commercial opportunities.</p> },
            { title: "Manufacturing Focus", text: <p>We build real industrial capabilities rather than operate solely as an intermediary.</p> },
            { title: "Global Outlook", text: <p>We build connections between India and international markets.</p> },
            { title: "Integrated Value Chain", text: <p>We connect sourcing, manufacturing, supply chain and market access.</p> },
            { title: "Customer-Centric", text: <p>We start with customer requirements and industrial problems.</p> },
            { title: "Partnership-Led", text: <p>We collaborate with organizations that bring complementary capabilities.</p> },
            { title: "Long-Term", text: <p>We prioritize sustainable industrial capability over short-term transactions.</p> },
            { title: "Responsible", text: <p>We integrate ESG and responsible business principles into our growth strategy.</p> },
          ]}
          action={{ href: "/about", label: "About Cosmox Industries" }}
        />
        <NumberedGrid
          label="Our Purpose"
          title="Create. Manufacture. Connect. Grow."
          lead="Our vision is to build a globally connected industrial enterprise, capable of creating, manufacturing and distributing products and technologies across major industries."
          tone="dark"
          columns={4}
          items={[
            { title: "Create", text: <p>Develop products, technologies and industrial capabilities that address real market needs.</p> },
            { title: "Manufacture", text: <p>Build efficient, scalable and reliable manufacturing capabilities.</p> },
            { title: "Connect", text: <p>Connect suppliers, technologies, customers, partners and markets.</p> },
            { title: "Grow", text: <p>Create long-term value for customers, employees, partners and stakeholders.</p> },
          ]}
          action={{ href: "/about#our-purpose", label: "Our Vision & Values" }}
        >
          <p className="tag-row-label">Our values</p>
          <ul className="tag-row">
            <li>Integrity</li>
            <li>Customer Focus</li>
            <li>Innovation</li>
            <li>Excellence</li>
            <li>Collaboration</li>
            <li>Responsibility</li>
            <li>Long-Term Thinking</li>
          </ul>
        </NumberedGrid>
        <InfoTabs
          label="Work With Us"
          title="Find the right way to build a business relationship with Cosmox."
          tabs={[
            {
              tab: "Suppliers",
              title: "Suppliers & Procurement",
              text: "At Cosmox Industries, suppliers are an essential part of our ability to deliver reliable products, technologies and solutions to customers around the world.",
              href: "/suppliers-procurement",
              action: "Become a Supplier",
              photo: photos.heroSuppliers,
            },
            {
              tab: "Partners",
              title: "Partnerships",
              text: "We seek partnerships that create long-term value, complementary capabilities and measurable industrial outcomes.",
              href: "/partnerships#who-we-partner-with",
              action: "Explore Partnerships",
              photo: photos.heroPartnerships,
            },
            {
              tab: "Careers",
              title: "Build Your Career With Cosmox Industries",
              text: "If you are interested in opportunities at Cosmox Industries, explore our current positions and career programs.",
              href: "/contact#careers",
              action: "Explore Careers",
              photo: photos.quality,
            },
            {
              tab: "News & Media",
              title: "The Latest From Cosmox Industries",
              text: "Company developments, business updates, technology advancements, manufacturing milestones, partnerships, sustainability initiatives and industry insights.",
              href: "/news-media",
              action: "Read More",
              photo: photos.heroNews,
            },
          ]}
        />
        <FeatureBanner
          title="Let’s build the industrial future together"
          photo={photos.heroContact}
          action={{ href: "/contact", label: "Connect With Us" }}
        >
          <p>Whether you are a customer, supplier, technology company, manufacturer, distributor, research institution, investor or partner, we will connect you with the right team.</p>
        </FeatureBanner>
      </div>
    </>
  );
}
