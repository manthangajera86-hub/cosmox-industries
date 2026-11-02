import ButtonLink from "@/components/ButtonLink";
import FeatureBanner from "@/components/FeatureBanner";
import Hero from "@/components/Hero";
import InfoTabs from "@/components/InfoTabs";
import NumberedGrid from "@/components/NumberedGrid";
import SplitFeature from "@/components/SplitFeature";
import Statement from "@/components/Statement";
import TopicNav from "@/components/TopicNav";
import { pageVideo } from "@/lib/hero-video";
import { photos } from "@/lib/photos";
import { pageMetadata } from "@/lib/site";
import { topicSection } from "@/lib/topics";

export const metadata = pageMetadata({
  title: "Global Commerce",
  description:
    "International trade, global sourcing, procurement, logistics and market development connecting industrial products, suppliers and customers across borders.",
  path: "/global-commerce",
});

export default function GlobalCommercePage() {
  return (
    <>
      <Hero
        eyebrow="Global Commerce"
        title="Connecting Products, Markets and Opportunities Across Borders"
        photo={photos.heroCommerce}
        video={pageVideo("commerce")}
        actions={
          <>
            <ButtonLink href="#global-trade">Explore Global Trade</ButtonLink>
            <ButtonLink href="/contact" variant="ghost">Start a Business Inquiry</ButtonLink>
          </>
        }
      >
        <p>Cosmox Industries operates with a global commercial outlook, connecting products, manufacturers, suppliers, customers and industrial markets across international borders.</p>
      </Hero>
      <TopicNav section={topicSection("commerce")} label="In This Section" title={topicSection("commerce").navTitle} tone="alt" />
      <Statement
        id="a-global-industrial-network"
        title="Industrial supply chains rarely exist within a single country."
        label="A Global Industrial Network"
        lead="Our Global Commerce platform brings together international trade, sourcing, procurement, distribution and market development to create reliable connections across the industrial value chain."
      >
        <p>Raw materials may originate in one region, manufacturing may take place in another, and the final customer may operate on the other side of the world. We connect these participants through one coordinated commercial platform.</p>
        <p>We make it easier for customers to access the products and capabilities they need, while helping qualified manufacturers and suppliers reach new markets, with strong standards for quality, reliability, compliance and responsible business.</p>
      </Statement>
      <NumberedGrid
        id="global-trade"
        label="Global Trade"
        title="Moving products across markets"
        lead="We work across international markets to find opportunities for products, materials, components, technologies and industrial solutions."
        tone="alt"
        items={[
          { title: "Export", text: <p>Connecting products manufactured or sourced through our network with customers in international markets.</p> },
          { title: "Import", text: <p>Accessing specialized products, raw materials, components and technologies required by customers and businesses.</p> },
          { title: "International Trading", text: <p>Connecting buyers and sellers across markets where our commercial and technical capabilities create value.</p> },
          {
            id: "global-distribution",
            title: "Distribution",
            text: <p>Distribution networks that improve product availability, regional inventory, market coverage and reliable delivery.</p>,
          },
          {
            title: "Market Development",
            text: <p>Entering new markets with an understanding of customers, regulation, competition, pricing and local business practice, informed by ongoing market and trade intelligence.</p>,
          },
          {
            title: "Global Logistics",
            text: <p>Ocean, air and road freight, warehousing, consolidation and customs, planned around each product, destination and customer.</p>,
          },
        ]}
      />
      <SplitFeature
        id="global-sourcing"
        label="Global Sourcing & Procurement"
        title="Finding the right products and suppliers"
        photo={photos.packaging}
        action={{ href: "/suppliers-procurement", label: "Submit a Sourcing Requirement" }}
        reverse
      >
        <p>We qualify manufacturers and suppliers on quality, capability, capacity, compliance and reliability, including custom grades, specifications and contract manufacturing, to build long-term supply rather than one-off transactions.</p>
      </SplitFeature>
      <NumberedGrid
        id="cross-border-supply"
        label="From Source to Customer"
        title="How we coordinate cross-border supply"
        lead="Every stage is coordinated, with trade compliance, restricted-party screening and accurate documentation built in, according to the product, industry and destination market."
        tone="dark"
        items={[
          { title: "Source", text: <p>Understand the requirement, then identify qualified suppliers and products.</p> },
          { title: "Qualify", text: <p>Evaluate quality, technical capability and compliance, with samples and validation where needed.</p> },
          { title: "Procure", text: <p>Compare pricing, capacity and supply conditions, and establish commercial arrangements.</p> },
          { title: "Consolidate", text: <p>Coordinate products and shipments where appropriate.</p> },
          { title: "Export", text: <p>Manage international documentation and shipment requirements.</p> },
          { title: "Transport", text: <p>Coordinate international logistics with qualified partners.</p> },
          { title: "Import", text: <p>Support customs and destination-market requirements.</p> },
          { title: "Distribute", text: <p>Deliver products through appropriate channels.</p> },
          { title: "Customer", text: <p>Provide reliable, continuing supply to the final customer.</p> },
        ]}
      >
        <p className="tag-row-label">Documentation we coordinate</p>
        <ul className="tag-row">
          <li>Technical specifications</li>
          <li>Safety documentation</li>
          <li>Certificates</li>
          <li>Quality documentation</li>
          <li>Origin documentation</li>
          <li>Shipping documentation</li>
          <li>Regulatory documentation</li>
        </ul>
      </NumberedGrid>
      <NumberedGrid
        id="regional-markets"
        label="Regional Markets"
        title="Building global reach"
        lead="We develop commercial relationships across major economic regions, according to each market’s requirements and applicable laws and regulations."
        tone="alt"
        items={[
          { title: "North America", text: <p>Advanced manufacturing, pharmaceuticals, energy, electronics, automotive, aerospace and industrial markets.</p> },
          { title: "Europe", text: <p>Pharmaceuticals, automotive, chemicals, advanced manufacturing, energy, electronics and sustainability-focused industries.</p> },
          { title: "Asia-Pacific", text: <p>Manufacturing, electronics, energy, automotive, pharmaceuticals, textiles and industrial supply chains.</p> },
          { title: "Middle East", text: <p>Energy, infrastructure, construction, industrial development and international trade.</p> },
          { title: "Africa", text: <p>Mining, resources, infrastructure, manufacturing and emerging industrial markets.</p> },
          { title: "Latin America", text: <p>Mining, energy, agriculture, manufacturing and industrial markets.</p> },
        ]}
      />
      <Statement
        id="responsible-trade"
        title="Supply chains we can stand behind."
        label="Responsible & Resilient Trade"
        lead="Global commerce is ultimately about trust. We build supply networks that are diversified, transparent, flexible, reliable and responsible."
        action={{ href: "/sustainability-esg", label: "Explore Sustainability & ESG" }}
      >
        <p>We seek suppliers with appropriate standards for quality, worker safety, environmental responsibility, ethical conduct, legal compliance and supply-chain transparency.</p>
        <p>Changing markets, transport disruptions and resource constraints make resilience essential, so we avoid unnecessary dependence on a single source and improve visibility across the chain.</p>
        <p>Because we understand the industries and applications behind the products we commercialize, we aim to be <strong>more than a trading relationship</strong>.</p>
      </Statement>
      <InfoTabs
        id="work-with-us"
        label="Work With Us"
        title="Tell us what you need, or where you want to grow."
        tabs={[
          {
            tab: "Customers",
            title: "Tell Us What You Need",
            text: "Send us the product, specification, quantity, application, destination, certifications and timeline, and our commercial team will evaluate your requirement.",
            href: "/contact#product-and-sales-inquiries",
            action: "Submit Business Inquiry",
            photo: photos.heroCommerce,
          },
          {
            tab: "Suppliers",
            title: "Expand Your Global Market Reach",
            text: "If you make products, materials, components or technologies relevant to our divisions, we can connect you with new industrial customers and markets.",
            href: "/suppliers-procurement#supplier-registration",
            action: "Become a Supplier",
            photo: photos.heroSuppliers,
          },
          {
            tab: "Manufacturers",
            title: "Build New Commercial Opportunities",
            text: "Explore contract and OEM manufacturing, international distribution, export partnerships and joint commercial development.",
            href: "/partnerships",
            action: "Explore Manufacturing Partnerships",
            photo: photos.heroManufacturing,
          },
          {
            tab: "Distributors",
            title: "Expand Your Product Portfolio",
            text: "Help bring specialized products closer to customers through regional distribution, technical sales, warehousing and customer support.",
            href: "/contact#global-business",
            action: "Become a Distribution Partner",
            photo: photos.heroDivisions,
          },
          {
            tab: "Technology",
            title: "Take Technology Into Global Markets",
            text: "Explore industrial commercialization, manufacturing, sourcing, distribution and international market opportunities.",
            href: "/partnerships#technology-partnerships",
            action: "Explore Technology Partnerships",
            photo: photos.heroInnovation,
          },
        ]}
      />
      <FeatureBanner
        title="Source globally. Trade responsibly. Grow internationally."
        photo={photos.global}
        action={{ href: "/contact", label: "Start a Business Inquiry" }}
      >
        <p>From sourcing a specialized material to developing a new international market, we connect industrial businesses across borders.</p>
      </FeatureBanner>
    </>
  );
}
