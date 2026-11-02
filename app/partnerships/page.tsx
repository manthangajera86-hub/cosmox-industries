import ButtonLink from "@/components/ButtonLink";
import FeatureBanner from "@/components/FeatureBanner";
import Hero from "@/components/Hero";
import InfoTabs from "@/components/InfoTabs";
import NumberedGrid from "@/components/NumberedGrid";
import SplitFeature from "@/components/SplitFeature";
import Statement from "@/components/Statement";
import { photos } from "@/lib/photos";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Partnerships",
  description:
    "Strategic, technology, research, manufacturing, commercial and supply-chain partnerships that combine complementary capabilities to build industrial value.",
  path: "/partnerships",
});

export default function PartnershipsPage() {
  return (
    <>
      <Hero
        eyebrow="Partnerships"
        title="Building Stronger Industrial Ecosystems Together"
        photo={photos.heroPartnerships}
        actions={
          <>
            <ButtonLink href="#who-we-partner-with">Explore Partnership Opportunities</ButtonLink>
            <ButtonLink href="#partnership-inquiry" variant="ghost">Start a Partnership Conversation</ButtonLink>
          </>
        }
      >
        <p>At Cosmox Industries, we believe the most meaningful industrial progress is created through collaboration.</p>
      </Hero>
      <Statement
        id="our-partnership-philosophy"
        title="Better together."
        label="Our Partnership Philosophy"
        lead="No single organization can develop every technology, manufacture every product or serve every market alone. The right partnership combines complementary strengths."
      >
        <p>We bring together customers, suppliers, manufacturers, technology companies, universities, startups, distributors, investors and strategic organizations to create new capabilities, enter new markets and solve complex industrial challenges.</p>
        <p>We look for partners who can help us develop technologies and products, build manufacturing capability, improve supply chains, accelerate commercialization and reach customers worldwide, with <strong>long-term value and measurable industrial outcomes</strong>.</p>
      </Statement>
      <NumberedGrid
        id="who-we-partner-with"
        label="Who We Partner With"
        title="Connections across the industrial ecosystem"
        lead="Partners contribute technology, production, research, market access or supply, and many relationships span several of our twelve divisions."
        tone="alt"
        items={[
          { title: "Customers", text: <p>Product development, technical requirements and long-term supply solutions.</p> },
          { title: "Suppliers", text: <p>Reliable, strategically important supply relationships beyond the purchase order.</p> },
          { title: "Manufacturers", text: <p>Contract manufacturing, OEM and capacity partnerships.</p> },
          { title: "Technology Companies", text: <p>Integrating emerging technologies into industrial applications.</p> },
          { title: "Startups", text: <p>New technologies, products and business models.</p> },
          { title: "Universities & Research", text: <p>Connecting scientific research with industrial application.</p> },
          { title: "Distributors", text: <p>Regional market reach and customer access.</p> },
          { title: "Logistics Partners", text: <p>Efficient domestic and international supply networks.</p> },
          { title: "Strategic Organizations", text: <p>Broader commercial, industrial, technology and capital relationships.</p> },
        ]}
      />
      <NumberedGrid
        id="ways-to-partner"
        label="Ways to Partner"
        title="Partnership models built around the opportunity"
        lead="Each collaboration is structured around its objectives, from a single technology pilot to long-term alliances spanning several divisions and markets."
        tone="dark"
        items={[
          {
            id: "strategic-partnerships",
            title: "Strategic Partnerships",
            text: <p>Market entry, capacity creation, global distribution and joint commercialization around complementary capabilities.</p>,
          },
          {
            id: "technology-partnerships",
            title: "Technology Partnerships",
            text: <p>Industrial applications for AI, automation, robotics, advanced materials, energy, semiconductors and industrial software.</p>,
          },
          {
            id: "research-partnerships",
            title: "Research & University",
            text: <p>Joint, applied and sponsored research, technology transfer, internships and student projects with universities and laboratories.</p>,
          },
          {
            title: "Startup Partnerships",
            text: <p>Industrial AI, robotics, materials, energy, electronics, sustainability and industrial software startups.</p>,
          },
          {
            title: "Manufacturing Partnerships",
            text: <p>Contract, OEM, joint, toll and capacity manufacturing, evaluated for feasibility, quality, capacity and fit.</p>,
          },
          {
            title: "Joint & Co-Development",
            text: <p>Concept, prototyping, testing, validation and launch for challenges no standard product can solve.</p>,
          },
          {
            title: "Commercial & Distribution",
            text: <p>Distribution, representation, licensing and international sales with partners who know their markets.</p>,
          },
          {
            title: "Supply-Chain & Supplier",
            text: <p>Long-term supply agreements, joint planning, capacity development and quality improvement.</p>,
          },
          {
            title: "Licensing, IP & Capital",
            text: <p>Technology licensing and transfer, clear IP arrangements, and strategic capital aligned with long-term value.</p>,
          },
        ]}
      />
      <SplitFeature
        id="esg-partnerships"
        label="Sustainability Partnerships"
        title="Collaborating for sustainable industrial growth"
        photo={photos.heroSustainability}
        action={{ href: "/sustainability-esg", label: "Explore Sustainability & ESG" }}
        reverse
      >
        <p>Renewable energy, recycling, circular materials, water efficiency and responsible sourcing often need cooperation across the whole value chain.</p>
      </SplitFeature>
      <NumberedGrid
        id="partnership-development-process"
        label="How We Partner"
        title="From first conversation to long-term collaboration"
        lead="We value partners who bring technical expertise, manufacturing capability, market access, innovation, quality, global reach and a commitment to responsible, long-term relationships."
        tone="alt"
        columns={4}
        items={[
          { title: "Introduction", text: <p>Understand the organization and its capabilities.</p> },
          { title: "Opportunity", text: <p>Identify the potential area of collaboration.</p> },
          { title: "Evaluation", text: <p>Assess technical, commercial and strategic fit.</p> },
          { title: "Discussion", text: <p>Define objectives, responsibilities and potential structure.</p> },
          { title: "Due Diligence", text: <p>Conduct technical, commercial and compliance review.</p> },
          { title: "Agreement", text: <p>Establish the commercial or strategic framework, including IP and rights.</p> },
          { title: "Development", text: <p>Begin the agreed collaboration.</p> },
          { title: "Scale", text: <p>Expand successful partnerships into larger opportunities.</p> },
        ]}
      >
        <p className="tag-row-label">Our partnership principles</p>
        <ul className="tag-row">
          <li>Mutual Value</li>
          <li>Transparency</li>
          <li>Trust</li>
          <li>Complementary Capabilities</li>
          <li>Long-Term Thinking</li>
          <li>Responsible Business</li>
        </ul>
      </NumberedGrid>
      <InfoTabs
        id="partnership-inquiry"
        label="Start a Conversation"
        title="Let’s explore what we can build together."
        tabs={[
          {
            tab: "Technology Companies",
            title: "Bring Your Technology to Industry",
            text: "Tell us about the technology, its maturity, applications, IP position, manufacturing needs and target industries.",
            href: "/contact#partnership-inquiries",
            action: "Submit Technology Partnership",
            photo: photos.heroInnovation,
          },
          {
            tab: "Universities",
            title: "Turn Research Into Industrial Impact",
            text: "Discuss joint and applied research, technology transfer, commercialization, industrial projects and student collaboration.",
            href: "/contact#research-and-innovation",
            action: "Start a Research Partnership",
            photo: photos.semiconductor,
          },
          {
            tab: "Startups",
            title: "Build the Future With Us",
            text: "Introduce your company if you work on AI, robotics, materials, energy, electronics, manufacturing, biotech or sustainability.",
            href: "/contact#send-us-an-inquiry",
            action: "Submit Your Startup",
            photo: photos.digital,
          },
          {
            tab: "Manufacturers",
            title: "Expand Your Production Opportunities",
            text: "Explore contract manufacturing, OEM, custom production, capacity partnerships and international supply.",
            href: "/contact#manufacturing-inquiries",
            action: "Start a Manufacturing Partnership",
            photo: photos.heroManufacturing,
          },
          {
            tab: "Distributors",
            title: "Expand Market Reach",
            text: "Regional and international distributors can represent and distribute relevant Cosmox Industries products.",
            href: "/contact#global-business",
            action: "Become a Distribution Partner",
            photo: photos.heroSuppliers,
          },
          {
            tab: "Customers",
            title: "Solve Your Next Industrial Challenge",
            text: "New product development, custom manufacturing, technology solutions, global sourcing and long-term supply.",
            href: "/contact#product-and-sales-inquiries",
            action: "Start a Customer Partnership",
            photo: photos.machinery,
          },
        ]}
      />
      <FeatureBanner
        title="Together, we build what comes next."
        photo={photos.global}
        action={{ href: "/contact#partnership-inquiries", label: "Partner With Cosmox Industries" }}
      >
        <p>We invite organizations with complementary capabilities to join an ecosystem where research, technology, manufacturing and markets connect.</p>
      </FeatureBanner>
    </>
  );
}
