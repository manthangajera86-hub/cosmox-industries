import ButtonLink from "@/components/ButtonLink";
import Faq from "@/components/Faq";
import FeatureBanner from "@/components/FeatureBanner";
import Hero from "@/components/Hero";
import InfoTabs from "@/components/InfoTabs";
import NumberedGrid from "@/components/NumberedGrid";
import SplitFeature from "@/components/SplitFeature";
import Statement from "@/components/Statement";
import { photos } from "@/lib/photos";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Suppliers & Procurement",
  description:
    "Become a Cosmox Industries supplier: what we source, how suppliers are qualified and onboarded, how we buy, and what we expect from responsible partners.",
  path: "/suppliers-procurement",
});

export default function SuppliersProcurementPage() {
  return (
    <>
      <Hero
        eyebrow="Suppliers & Procurement"
        title="Building a Stronger Global Supply Network"
        photo={photos.heroSuppliers}
        actions={
          <>
            <ButtonLink href="#supplier-registration">Become a Supplier</ButtonLink>
            <ButtonLink href="#request-for-quotation" variant="ghost">Explore Procurement Opportunities</ButtonLink>
          </>
        }
      >
        <p>At Cosmox Industries, suppliers are an essential part of our ability to deliver reliable products, technologies and solutions to customers around the world.</p>
      </Hero>
      <Statement
        id="our-procurement-philosophy"
        title="Strategic procurement, not simply purchasing."
        label="Our Procurement Philosophy"
        lead="We evaluate suppliers on quality, reliability, capacity, cost, technology, compliance and sustainability, and on their ability to support long-term industrial requirements, not on price alone."
      >
        <p>We build long-term relationships with qualified manufacturers, raw-material producers, technology providers, distributors and service partners, combining strategic sourcing, qualification, quality management and responsible sourcing.</p>
        <p>Our procurement teams work closely with our business divisions, manufacturing, R&D, quality, supply chain, global commerce and customers, so every decision reflects wider business needs.</p>
      </Statement>
      <NumberedGrid
        id="what-we-source"
        label="What We Source"
        title="Products, materials, components and capabilities"
        lead="Requirements span all twelve business divisions, including specialized products for R&D programs. If you already make something that fits one of our divisions, we want to hear from you."
        tone="alt"
        columns={4}
        items={[
          { title: "Raw Materials", text: <p>Industrial and specialty materials, chemicals, minerals, metals, ingredients and functional materials.</p> },
          { title: "Components", text: <p>Industrial, electronic, automotive, machinery and packaging components, and specialized parts.</p> },
          { title: "Technology", text: <p>Manufacturing technologies, automation, robotics, digital systems, advanced materials and engineering technologies.</p> },
          { title: "Services", text: <p>Logistics, warehousing, testing, engineering, contract manufacturing, maintenance and technical services.</p> },
        ]}
      >
        <p className="tag-row-label">Who can work with us</p>
        <ul className="tag-row">
          <li>Manufacturers</li>
          <li>Raw-Material Producers</li>
          <li>Technology Providers</li>
          <li>Contract Manufacturers</li>
          <li>OEM Suppliers</li>
          <li>Distributors</li>
          <li>Logistics Providers</li>
          <li>Engineering Companies</li>
        </ul>
      </NumberedGrid>
      <NumberedGrid
        id="supplier-onboarding"
        label="Becoming a Supplier"
        title="From application to approved supplier"
        lead="Qualification and due diligence are proportionate to the product, industry, market and risk, and critical materials may need additional validation."
        tone="dark"
        columns={4}
        items={[
          { title: "Registration", text: <p>You submit company and product information.</p> },
          { title: "Initial Review", text: <p>Our team evaluates basic suitability.</p> },
          { title: "Technical Review", text: <p>Products, specifications and documentation are evaluated against requirements.</p> },
          { title: "Quality Review", text: <p>Quality systems, testing, batch consistency, traceability and certificates are reviewed.</p> },
          { title: "Commercial Evaluation", text: <p>Pricing, capacity, lead times and commercial terms are assessed.</p> },
          {
            id: "supplier-qualification",
            title: "Qualification",
            text: <p>Company, products, manufacturing, quality, compliance, supply, commercial and responsible-business review.</p>,
          },
          { title: "Onboarding", text: <p>Approved suppliers join the relevant procurement system.</p> },
          { title: "Performance", text: <p>Quality, delivery, capacity, service and compliance are monitored over time.</p> },
        ]}
      />
      <SplitFeature
        id="supplier-registration"
        label="Supplier Registration"
        title="Become a Cosmox Industries supplier"
        photo={photos.metal}
        action={{ href: "/contact#supplier-and-procurement", label: "Register as a Supplier" }}
        reverse
      >
        <p>Share your company profile, locations, products, capacity, certifications, markets and sustainability practices, and our procurement team will review the fit.</p>
      </SplitFeature>
      <NumberedGrid
        id="request-for-quotation"
        label="How We Buy"
        title="Our procurement process"
        lead="Qualified suppliers may be invited to quote. An RFQ sets out the product, specification, quantity, packaging, delivery, documentation, quality and commercial terms, so please respond completely and accurately."
        tone="alt"
        columns={4}
        items={[
          { title: "Requirement", text: <p>Understand product, technical, quantity and delivery requirements.</p> },
          { title: "Market Search", text: <p>Identify potential domestic and international suppliers.</p> },
          { title: "Request for Information", text: <p>Collect technical and company information.</p> },
          { title: "Request for Quotation", text: <p>Obtain commercial proposals.</p> },
          { title: "Evaluation", text: <p>Review products against specifications and compare commercial terms.</p> },
          { title: "Qualification", text: <p>Complete the applicable qualification requirements.</p> },
          { title: "Purchase & Delivery", text: <p>Establish the order or agreement and coordinate supply and logistics.</p> },
          { title: "Performance Review", text: <p>Evaluate the supplier’s performance and improve together.</p> },
        ]}
      />
      <NumberedGrid
        id="growing-together"
        label="Growing Together"
        title="Strong suppliers, stronger supply networks"
        lead="Supplier relationships do not end at onboarding. We invest in the suppliers and networks that support long-term growth."
        tone="dark"
        items={[
          { title: "Strategic Suppliers", text: <p>Long-term agreements, joint development, capacity planning and forecast sharing for critical suppliers.</p> },
          { title: "Supplier Development", text: <p>Improving quality, capacity, delivery, documentation, sustainability and resilience together.</p> },
          { title: "Global Opportunities", text: <p>Export programs, international customer supply, regional distribution and strategic manufacturing.</p> },
          { title: "Local & Regional Sourcing", text: <p>Shorter lead times, local technical support and more flexible supply alongside global sources.</p> },
          { title: "Supply Resilience", text: <p>Alternative and multi-source strategies, critical-material planning and business continuity.</p> },
          { title: "Digital Procurement", text: <p>Supplier discovery, RFQ workflows, spend analysis and performance data for a more transparent ecosystem.</p> },
        ]}
      />
      <Statement
        id="responsible-procurement"
        title="Business with integrity."
        label="Responsible Procurement"
        lead="We expect suppliers to comply with applicable laws and uphold safe workplaces, fair treatment, ethical conduct and environmental responsibility."
        action={{ href: "/sustainability-esg", label: "Explore Sustainability & ESG" }}
      >
        <p><strong>People:</strong> workplace safety, worker dignity, non-discrimination, legal employment, and the prevention of child and forced labour.</p>
        <p><strong>Ethics:</strong> anti-bribery, anti-corruption, conflicts of interest, accurate documentation, fair competition and confidentiality.</p>
        <p><strong>Environment:</strong> energy and resource efficiency, waste, water, emissions, recycling and sustainable materials. We encourage suppliers to keep improving.</p>
      </Statement>
      <Faq
        id="supplier-faq"
        label="Supplier FAQ"
        title="Frequently asked questions"
        items={[
          { question: "How can my company become a supplier?", answer: "Submit your company and product information through the supplier-registration process." },
          {
            question: "What types of suppliers are you looking for?",
            answer: "Manufacturers, raw-material producers, technology companies, component suppliers, distributors, logistics providers and specialized service providers.",
          },
          { question: "Can international suppliers apply?", answer: "Yes. We develop both domestic and international supplier relationships according to business requirements." },
          { question: "Do suppliers need certifications?", answer: "Certification requirements depend on the product, industry and application." },
          { question: "Can startups become suppliers?", answer: "Yes, where the startup has a relevant technology, product or capability that meets our requirements." },
          { question: "Can suppliers propose new products?", answer: "Yes. Suppliers can introduce products and technologies relevant to our business divisions." },
          {
            question: "How are suppliers evaluated?",
            answer: "On technical capability, quality, capacity, commercial competitiveness, compliance, reliability and responsible business practices.",
          },
        ]}
      />
      <InfoTabs
        id="supplier-support"
        label="Work With Us"
        title="Start or grow your relationship with our procurement team."
        tabs={[
          {
            tab: "New Suppliers",
            title: "Start a Relationship With Us",
            text: "Send your company profile, locations, catalogue, capacity, capabilities, certifications, export markets and sustainability information.",
            href: "/contact#supplier-and-procurement",
            action: "Register Your Company",
            photo: photos.heroSuppliers,
          },
          {
            tab: "Existing Suppliers",
            title: "Continue Growing With Us",
            text: "Work with our procurement teams on new products, capacity expansion, new markets, quality improvement and strategic partnerships.",
            href: "/contact#existing-suppliers",
            action: "Supplier Support",
            photo: photos.packaging,
          },
          {
            tab: "Technology Suppliers",
            title: "Bring New Capabilities to Our Platform",
            text: "Introduce solutions in AI, robotics, automation, energy, materials, electronics, digital procurement and sustainability.",
            href: "/partnerships#technology-partnerships",
            action: "Submit Technology Capability",
            photo: photos.digital,
          },
          {
            tab: "Manufacturers",
            title: "Expand Your Manufacturing Opportunities",
            text: "Explore contract, OEM, custom and private-label production, capacity partnerships and international distribution.",
            href: "/partnerships",
            action: "Explore Manufacturing Partnerships",
            photo: photos.heroManufacturing,
          },
        ]}
      />
      <FeatureBanner
        title="Strong suppliers. Stronger industry."
        photo={photos.heroCommerce}
        action={{ href: "/contact#supplier-and-procurement", label: "Become a Supplier" }}
      >
        <p>Find the right supplier. Build the right relationship. Create reliable supply. Grow together.</p>
      </FeatureBanner>
    </>
  );
}
