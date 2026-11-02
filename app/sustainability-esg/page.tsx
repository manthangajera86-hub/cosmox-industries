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
  title: "Sustainability & ESG",
  description:
    "Our environmental, social and governance approach: resource efficiency, circularity, safety, people, ethics and measurable progress across the value chain.",
  path: "/sustainability-esg",
});

export default function SustainabilityEsgPage() {
  return (
    <>
      <Hero
        eyebrow="Sustainability & ESG"
        title="Building Industry for the Long Term"
        photo={photos.heroSustainability}
        video={pageVideo("sustainability")}
        actions={
          <>
            <ButtonLink href="#our-esg-framework">Explore Our Sustainability Approach</ButtonLink>
            <ButtonLink href="#our-long-term-commitment" variant="ghost">Read Our ESG Commitments</ButtonLink>
          </>
        }
      >
        <p>At Cosmox Industries, we believe long-term industrial growth must be built responsibly.</p>
      </Hero>
      <TopicNav section={topicSection("sustainability")} label="In This Section" title={topicSection("sustainability").navTitle} tone="alt" />
      <Statement
        id="our-sustainability-vision"
        title="Responsible growth. Measurable progress. Long-term value."
        label="Our Sustainability Vision"
        lead="Sustainability is not separate from our strategy. It shapes how we design products, develop technologies, run manufacturing, manage supply chains and create value for customers."
      >
        <p>We aim to build businesses that are economically strong, environmentally responsible, socially conscious and governed with integrity, creating lasting value for customers, employees, partners, communities and shareholders.</p>
        <p>The future of industry will be defined not only by what companies produce, but <strong>by how they produce it</strong>.</p>
      </Statement>
      <NumberedGrid
        id="our-esg-framework"
        label="Our ESG Framework"
        title="Three pillars of responsible business"
        lead="Three interconnected priorities guide our decisions, from the factory floor to the boardroom."
        tone="alt"
        items={[
          {
            title: "Environmental",
            text: <p>Energy efficiency, renewable energy, emissions, water, waste, recycling, sustainable materials and pollution prevention.</p>,
          },
          {
            title: "Social",
            text: <p>Health and safety, employee development, diversity and inclusion, human rights, responsible sourcing and communities.</p>,
          },
          {
            title: "Governance",
            text: <p>Business ethics, compliance, transparency, risk management, data responsibility, supplier governance and internal controls.</p>,
          },
        ]}
      />
      <NumberedGrid
        id="environment"
        label="Environment"
        title="More resource-efficient operations"
        lead="Industry depends on energy, materials and natural resources. We aim to use them more efficiently, improving continuously rather than treating sustainability as a one-time initiative."
        tone="dark"
        items={[
          {
            id: "energy-and-climate",
            title: "Energy & Climate",
            text: <p>Efficient equipment, heat recovery, energy monitoring and renewable energy, reducing emissions across operations, transport and supply.</p>,
          },
          {
            title: "Water Stewardship",
            text: <p>Efficient use, recycling and reuse, leak reduction and responsible wastewater management, adapted to local conditions.</p>,
          },
          {
            title: "Waste Management",
            text: <p>Reduce, reuse, recycle, recover, and responsibly manage what remains.</p>,
          },
          {
            id: "circular-economy",
            title: "Circular Economy",
            text: <p>Moving from extract-produce-dispose to recover, reuse and recycle, with recycled materials and longer product lifecycles.</p>,
          },
          {
            title: "Sustainable Materials & Products",
            text: <p>Recycled, bio-based, lightweight and recyclable materials, designed with the full product lifecycle in mind.</p>,
          },
          {
            title: "Sustainable Manufacturing",
            text: <p>Better process efficiency, fewer material losses and optimized energy and water use, improving productivity too.</p>,
          },
        ]}
      />
      <SplitFeature
        id="social-responsibility"
        label="Social Responsibility"
        title="People are at the center of our business"
        photo={photos.people}
        action={{ href: "/contact#careers", label: "Explore Careers" }}
        reverse
      >
        <p>We build safe, respectful and inclusive workplaces where people can develop their skills, contribute meaningfully and build long-term careers.</p>
      </SplitFeature>
      <NumberedGrid
        id="governance"
        label="Social & Governance"
        title="Integrity in how we operate"
        lead="Trust is fundamental to long-term industrial relationships, and our standards extend to the suppliers and partners we work with."
        tone="alt"
        items={[
          { title: "Health & Safety", text: <p>Risk identification, safe procedures, training, protective equipment and emergency preparedness. Safety comes first.</p> },
          { title: "Employee Development", text: <p>Technical, engineering, digital, safety and leadership development with growing responsibility.</p> },
          { title: "Diversity & Inclusion", text: <p>Fair, respectful treatment with opportunities based on capability, performance and contribution.</p> },
          { title: "Human Rights", text: <p>Worker safety, fair treatment and dignity, and no forced or child labour, across our value chain.</p> },
          { title: "Community Development", text: <p>Education, skills, employment, local infrastructure and environmental awareness, reflecting local needs.</p> },
          { title: "Ethics & Anti-Corruption", text: <p>Integrity, fair dealing and zero tolerance for bribery, backed by controls, due diligence and reporting.</p> },
          { title: "Risk Management", text: <p>Supply-chain, operational, regulatory, environmental and cyber risks identified early and mitigated.</p> },
          { title: "Data Responsibility", text: <p>Data security, access controls, cybersecurity and digital resilience in a connected industry.</p> },
          { title: "Product Responsibility", text: <p>Product quality, safety, documentation and the information customers need for responsible use.</p> },
        ]}
      />
      <CapabilityList
        id="esg-across-the-value-chain"
        label="ESG Across the Value Chain"
        title="Responsibility beyond our own operations"
        lead="Sustainability runs through our innovation, supply chain, customer work and global trade, and across all twelve business divisions."
        items={[
          {
            title: "ESG & Innovation",
            text: "Technologies for energy and water efficiency, material utilization, waste recovery and recycling, developed to be commercially viable.",
            href: "/innovation-technology",
            photo: photos.heroInnovation,
          },
          {
            title: "ESG & Supply Chain",
            text: "Selecting, qualifying and developing responsible suppliers, with better visibility of important supply relationships.",
            href: "/suppliers-procurement",
            photo: photos.heroSuppliers,
          },
          {
            title: "ESG & Customers",
            text: "Sustainable, resource-efficient and recyclable products where environmental and commercial performance reinforce each other.",
            href: "/business-divisions",
            photo: photos.packaging,
          },
          {
            title: "ESG & Global Commerce",
            text: "Trade compliance, supplier due diligence, accurate documentation and ethical, responsible international business.",
            href: "/global-commerce",
            photo: photos.heroCommerce,
          },
        ]}
      />
      <NumberedGrid
        id="our-long-term-commitment"
        label="The Road Ahead"
        title="ESG is a journey, not a destination"
        lead="As regulations, technologies and expectations evolve, we will keep measuring, understanding, improving, innovating and scaling what works."
        columns={4}
        items={[
          { title: "Resource Efficiency", text: <p>Using energy, water and materials more efficiently.</p> },
          { title: "Cleaner Technology", text: <p>Developing and adopting technologies that improve environmental performance.</p> },
          { title: "Circularity", text: <p>Increasing opportunities for reuse, recovery and recycling.</p> },
          { title: "Safe Operations", text: <p>Strengthening workplace and process safety.</p> },
          { title: "Responsible Sourcing", text: <p>Building more transparent and responsible supply networks.</p> },
          { title: "People Development", text: <p>Investing in skills, careers and leadership.</p> },
          { title: "Ethical Governance", text: <p>Maintaining strong standards of integrity and accountability.</p> },
          { title: "Measurable Progress", text: <p>Developing stronger systems for ESG measurement and reporting.</p> },
        ]}
      >
        <p className="tag-row-label">What we aim to measure</p>
        <ul className="tag-row">
          <li>Energy</li>
          <li>Emissions</li>
          <li>Water</li>
          <li>Waste</li>
          <li>Safety</li>
          <li>Workforce Development</li>
          <li>Supplier Performance</li>
          <li>Governance</li>
        </ul>
      </NumberedGrid>
      <FeatureBanner
        title="Responsible growth. Industrial innovation. Long-term impact."
        photo={photos.energy}
        action={{ href: "/contact", label: "Connect With Us" }}
      >
        <p>We are building businesses that grow with purpose, innovate responsibly and create value beyond a single business cycle.</p>
      </FeatureBanner>
    </>
  );
}
