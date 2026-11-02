import ButtonLink from "@/components/ButtonLink";
import CapabilityList from "@/components/CapabilityList";
import FeatureBanner from "@/components/FeatureBanner";
import Hero from "@/components/Hero";
import NumberedGrid from "@/components/NumberedGrid";
import SplitFeature from "@/components/SplitFeature";
import Statement from "@/components/Statement";
import TopicNav from "@/components/TopicNav";
import { pageVideo } from "@/lib/hero-video";
import { photos } from "@/lib/photos";
import { pageMetadata } from "@/lib/site";
import { topicSection } from "@/lib/topics";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Cosmox Industries is a diversified industrial enterprise building businesses across twelve divisions through manufacturing, global trade, sourcing, technology, supply chains and strategic partnerships.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Hero
        eyebrow="About Cosmox Industries"
        title="Building Businesses. Connecting Industries. Creating Long-Term Value."
        photo={photos.heroAbout}
        video={pageVideo("company")}
        actions={
          <>
            <ButtonLink href="/business-divisions">Explore Our Business Divisions</ButtonLink>
            <ButtonLink href="/partnerships" variant="ghost">Partner With Us</ButtonLink>
          </>
        }
      >
        <p>Cosmox Industries is a diversified industrial enterprise building businesses across essential and emerging industries through <strong>manufacturing, global trade, sourcing, technology, supply chains and strategic partnerships</strong>.</p>
      </Hero>
      <TopicNav section={topicSection("company")} label="In This Section" title={topicSection("company").navTitle} tone="alt" />
      <Statement
        id="who-we-are"
        title="A diversified industrial enterprise built around real-world industry."
        label="Who We Are"
        lead="What connects our businesses is one approach: understand the market, build capability, connect the value chain and create long-term value."
      >
        <p>We operate across twelve business divisions spanning Pharmaceuticals, Food & Beverage, Energy, Semiconductor & Electronics, Automotive & Autoparts, Machinery, Metal & Mining, Fashion & Textile, Packaging, Construction Materials, Aerospace & Defence, and Jewellery.</p>
        <p>We participate across multiple stages of the industrial ecosystem, from product development and sourcing to manufacturing, trading, distribution and market development.</p>
        <p>A strong industrial enterprise is not created simply by adding more products or entering more markets. It is created by developing <strong>deep knowledge, strong relationships, reliable operations and differentiated capabilities</strong> within the markets it serves.</p>
      </Statement>
      <NumberedGrid
        id="our-purpose"
        label="Our Purpose"
        title="Enabling progress through industry"
        lead="We make products, technologies and resources more accessible, strengthen supply networks, develop manufacturing capabilities and connect businesses with opportunities across global markets."
        tone="dark"
        items={[
          { title: "Build", text: <p>Build specialized businesses around meaningful markets, customer requirements and long-term opportunities.</p> },
          { title: "Innovate", text: <p>Invest in research, technology, engineering and new approaches that improve products, processes and capabilities.</p> },
          { title: "Manufacture", text: <p>Develop reliable, scalable manufacturing focused on quality, efficiency, consistency and operational excellence.</p> },
          { title: "Connect", text: <p>Connect customers, suppliers, manufacturers, technology companies, markets and partners across the value chain.</p> },
          { title: "Grow Responsibly", text: <p>Create sustainable long-term value with high standards of governance, responsibility and integrity.</p> },
        ]}
      >
        <div className="text-pair">
          <div id="our-vision">
            <h3>Our vision</h3>
            <p>To build Cosmox Industries into a globally respected industrial enterprise with deep expertise across multiple industries and strong capabilities in manufacturing, technology, supply chains and global commerce.</p>
            <p>We aim to be recognized for technical depth, manufacturing strength, resilient supply networks, innovation, long-term partnerships and responsible growth.</p>
            <p><strong>Our ambition is not simply to become larger. It is to become more capable.</strong></p>
          </div>
          <div id="our-mission">
            <h3>Our mission</h3>
            <p>To identify meaningful industrial opportunities and transform them into enduring businesses, products, technologies, manufacturing platforms and commercial networks.</p>
            <p>We pursue it by understanding industries and customers, investing in technology and manufacturing, strengthening global supply chains and trade, building long-term relationships and partnerships, and developing our people, always operating with integrity, discipline and accountability.</p>
          </div>
        </div>
      </NumberedGrid>
      <NumberedGrid
        id="our-business-model"
        label="Our Business Model"
        title="From products to platforms"
        lead="A product depends on raw materials, technology, suppliers, manufacturing, quality, logistics and market access. So we operate not only as a manufacturer or trader, but as a connected industrial enterprise."
        tone="alt"
        items={[
          { title: "Market", text: <p>We identify customer needs, industry trends, structural changes and opportunities for long-term growth.</p> },
          { title: "Source", text: <p>We develop relationships with qualified suppliers and global sources of materials, components, products and technologies.</p> },
          { title: "Develop", text: <p>We develop products, solutions, technologies and commercial propositions around market requirements.</p> },
          { title: "Manufacture", text: <p>Where manufacturing creates strategic value, we build or partner with production capabilities for quality, reliability and scale.</p> },
          { title: "Trade", text: <p>We connect products and resources across markets through import, export and international trading.</p> },
          { title: "Distribute", text: <p>We establish channels that connect products and capabilities with customers and markets.</p> },
          { title: "Invest", text: <p>We evaluate opportunities to develop, support or expand businesses with strong industrial potential.</p> },
          { title: "Partner", text: <p>We collaborate with customers, suppliers, manufacturers, technology companies and research institutions.</p> },
          { title: "Scale", text: <p>We build businesses capable of expanding across products, geographies and value chains.</p> },
        ]}
      />
      <CapabilityList
        id="our-capabilities"
        label="Our Industrial Capabilities"
        title="Connecting the entire value chain"
        lead="Customers and partners can work with Cosmox Industries at multiple points, from product development to global trade."
        items={[
          {
            title: "Twelve Business Divisions",
            text: "Specialized businesses from pharmaceuticals and energy to semiconductors, aerospace and jewellery, sharing one industrial platform.",
            href: "/business-divisions",
            photo: photos.heroDivisions,
          },
          {
            title: "Research & Product Development",
            text: "New products, materials and processes, translating scientific and technical knowledge into practical industrial applications.",
            href: "/innovation-technology",
            photo: photos.semiconductor,
          },
          {
            title: "Manufacturing",
            text: "Specialty, custom and contract manufacturing, scale-up and automation, built around quality, efficiency and flexibility.",
            href: "/manufacturing-supply-chain",
            photo: photos.machinery,
          },
          {
            title: "Quality & Excellence",
            text: "Consistency, traceability, process discipline and compliance across sourcing, production, testing and delivery.",
            href: "/manufacturing-supply-chain#quality-management",
            photo: photos.quality,
          },
          {
            title: "Sourcing & Supply Chain",
            text: "Qualified suppliers, responsible sourcing and integrated procurement, warehousing, logistics and distribution.",
            href: "/suppliers-procurement",
            photo: photos.heroSuppliers,
          },
          {
            title: "Global Commerce",
            text: "International sourcing, import, export, trading, distribution and market development across borders.",
            href: "/global-commerce",
            photo: photos.heroCommerce,
          },
          {
            title: "Strategic Partnerships",
            text: "Organizations bringing complementary technology, manufacturing capability, resources, expertise and market access.",
            href: "/partnerships",
            photo: photos.heroPartnerships,
          },
        ]}
      />
      <SplitFeature
        id="our-people"
        label="Our People"
        title="Building capability through people"
        photo={photos.people}
        action={{ href: "/contact#careers", label: "Explore Careers" }}
      >
        <p>Strong businesses require strong people. We are building an organization where expertise and entrepreneurship grow together.</p>
      </SplitFeature>
      <NumberedGrid
        id="our-values"
        label="Values & Culture"
        title="The principles behind how we work"
        lead="Our culture combines ambition with discipline and long-term thinking."
        tone="alt"
        columns={4}
        items={[
          { title: "Integrity", text: <p>We conduct business honestly, transparently and responsibly.</p> },
          { title: "Innovation", text: <p>We challenge established approaches and seek better solutions.</p> },
          { title: "Excellence", text: <p>We pursue high standards across products, operations and relationships.</p> },
          { title: "Customer Focus", text: <p>We build around genuine customer requirements.</p> },
          { title: "Collaboration", text: <p>We create stronger outcomes through partnership and teamwork.</p> },
          { title: "Responsibility", text: <p>We consider our impact on people, communities, resources and the environment.</p> },
          { title: "Entrepreneurship", text: <p>We encourage initiative, ownership and the pursuit of meaningful opportunities.</p> },
          { title: "Long-Term Thinking", text: <p>We prioritize lasting capabilities over short-term gains.</p> },
        ]}
      >
        <p className="tag-row-label">How we work</p>
        <ul className="tag-row">
          <li>Think Long Term</li>
          <li>Stay Curious</li>
          <li>Take Ownership</li>
          <li>Work Together</li>
          <li>Respect Quality</li>
          <li>Act with Integrity</li>
        </ul>
      </NumberedGrid>
      <Statement
        id="leadership-and-governance"
        title="Leadership and governance with a long-term perspective."
        label="Leadership & Governance"
        lead="We combine strategic vision with operational discipline, and build trust through accountability, transparency and ethical conduct."
        action={{ href: "/sustainability-esg", label: "Explore Sustainability & ESG" }}
      >
        <p>Our leadership brings together experience in industrial strategy, technology, manufacturing, research, global trade, supply chain, finance and operations.</p>
        <p>Our governance is built on regulatory compliance, risk management, responsible decision-making and stakeholder protection, and will develop with the scale and international reach of our businesses.</p>
        <p>We aim to create lasting value for customers, suppliers, partners, employees, communities and investors, integrating responsible business into how we select partners, operate facilities and make long-term decisions.</p>
      </Statement>
      <NumberedGrid
        id="strategic-priorities"
        label="Strategic Priorities"
        title="Build deep. Think global. Grow responsibly."
        lead="We look for markets where needs are meaningful, demand is durable and expertise, manufacturing and partnerships create differentiation, so we can build businesses with genuine capabilities and defensible positions."
        tone="alt"
        columns={4}
        items={[
          { title: "Specialized Businesses", text: <p>Develop focused businesses within each of our twelve divisions.</p> },
          { title: "Expand Manufacturing", text: <p>Develop reliable and scalable production capabilities.</p> },
          { title: "Strengthen Global Trade", text: <p>Expand sourcing, import, export, trading, distribution and market development.</p> },
          { title: "Invest in Technology", text: <p>Build research, engineering, digital and advanced technology capabilities.</p> },
          { title: "Develop People", text: <p>Build teams with deep technical, commercial and operational expertise.</p> },
          { title: "Resilient Supply Chains", text: <p>Create diversified, resilient and responsible supply networks.</p> },
          { title: "Strategic Partnerships", text: <p>Work with customers, suppliers, manufacturers and technology companies for mutual value.</p> },
          { title: "Responsible Growth", text: <p>Integrate sustainability, governance and responsible business into long-term decisions.</p> },
        ]}
      />
      <FeatureBanner
        title="Building what comes next"
        photo={photos.heroNews}
        action={{ href: "/contact", label: "Connect With Us" }}
      >
        <p>We are building an enterprise capable of evolving with the global economy, and we welcome the opportunity to build it with you.</p>
      </FeatureBanner>
    </>
  );
}
