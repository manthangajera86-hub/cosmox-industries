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
  title: "Manufacturing & Supply Chain",
  description:
    "Specialty, custom and contract manufacturing, quality management and resilient supply chains, from raw material to customer.",
  path: "/manufacturing-supply-chain",
});

export default function ManufacturingSupplyChainPage() {
  return (
    <>
      <Hero
        eyebrow="Manufacturing & Supply Chain"
        title="From Industrial Capability to Reliable Supply"
        photo={photos.heroManufacturing}
        video={pageVideo("manufacturing")}
        actions={
          <>
            <ButtonLink href="#manufacturing-capabilities">Explore Manufacturing Capabilities</ButtonLink>
            <ButtonLink href="/contact#manufacturing-inquiries" variant="ghost">Submit a Manufacturing Inquiry</ButtonLink>
          </>
        }
      >
        <p>At Cosmox Industries, manufacturing and supply chain are fundamental to how we create value.</p>
      </Hero>
      <TopicNav section={topicSection("manufacturing")} label="In This Section" title={topicSection("manufacturing").navTitle} tone="alt" />
      <Statement
        id="our-manufacturing-philosophy"
        title="Build with precision. Scale with discipline."
        label="Our Manufacturing Philosophy"
        lead="A strong industrial business needs more than a product: dependable inputs, controlled processes, skilled people, rigorous quality and an efficient path from factory to customer."
      >
        <p>We integrate <strong>people, process, technology, quality and supply chain</strong> into one operating model, linking R&D, process engineering, manufacturing, procurement and global commerce in a continuous feedback loop between markets, products and operations.</p>
        <p>That model is built around four objectives: <strong>quality</strong> that meets defined requirements consistently, <strong>reliability</strong> of supply, <strong>efficiency</strong> that keeps improving, and <strong>continuity</strong> as market conditions change.</p>
      </Statement>
      <NumberedGrid
        id="from-raw-material-to-customer"
        label="From Raw Material to Customer"
        title="An integrated industrial value chain"
        lead="Our operating model connects every major stage of supply, with traceability from supplier and batch through to shipment and customer."
        tone="dark"
        items={[
          { title: "Raw Materials", text: <p>Identify reliable sources of raw materials, ingredients, components and industrial inputs.</p> },
          { title: "Sourcing", text: <p>Evaluate qualified domestic and international suppliers.</p> },
          { title: "Procurement", text: <p>Manage commercial purchasing and supply agreements.</p> },
          { title: "Quality", text: <p>Verify materials and suppliers, then test products for quality, performance and consistency.</p> },
          { title: "Manufacturing", text: <p>Convert materials into finished products through controlled production processes.</p> },
          { title: "Packaging", text: <p>Prepare products according to product and customer requirements.</p> },
          { title: "Warehousing", text: <p>Store products safely, with accurate inventory and batch management.</p> },
          { title: "Logistics", text: <p>Coordinate domestic and international transportation.</p> },
          { title: "Customer", text: <p>Deliver products reliably to customers and markets.</p> },
        ]}
      />
      <NumberedGrid
        id="manufacturing-capabilities"
        label="Manufacturing Capabilities"
        title="Production platforms for specialized industries"
        lead="Developed around each division’s technical and commercial requirements, supporting established products and new ones moving from development to commercial scale."
        tone="alt"
        items={[
          {
            title: "Specialty & Process Manufacturing",
            text: <p>Batch and continuous manufacturing, from pilot-scale to commercial-scale production.</p>,
          },
          {
            title: "Process Development",
            text: <p>Understanding how materials, equipment and parameters shape the product, so processes transfer from lab to plant consistently.</p>,
          },
          {
            title: "Scale-Up",
            text: <p>Laboratory, pilot, engineering and commercial scale, then optimization of yield, efficiency, quality and economics.</p>,
          },
          {
            id: "custom-manufacturing",
            title: "Custom Manufacturing",
            text: <p>Custom specifications, formulations, grades, purity, dedicated production and packaging, evaluated for technical and commercial feasibility.</p>,
          },
          {
            title: "Contract & OEM Manufacturing",
            text: <p>Extra capacity for specialty products, materials, components and ingredients, with confidentiality, quality and reliable delivery.</p>,
          },
          {
            title: "Customer-Specific Supply",
            text: <p>Recurring supply, long-term contracts, scheduled or multi-location delivery, safety stock and customized packaging.</p>,
          },
        ]}
        action={{ href: "/contact#manufacturing-inquiries", label: "Discuss a Manufacturing Requirement" }}
      />
      <SplitFeature
        id="quality-management"
        label="Quality Management"
        title="Quality from the beginning"
        photo={photos.quality}
        action={{ href: "/contact#technical-inquiries", label: "Discuss Your Specifications" }}
        reverse
      >
        <p>From raw-material inspection and supplier qualification to in-process testing, batch documentation and traceability, quality is built into every step.</p>
      </SplitFeature>
      <NumberedGrid
        id="supply-chain"
        label="Supply Chain"
        title="Matching supply with demand, reliably"
        lead="Changing demand, transport constraints and market volatility make resilience essential, so we diversify sources, improve visibility and plan for continuity."
        tone="alt"
        items={[
          { title: "Supplier Management", text: <p>Suppliers qualified through technical, quality, commercial and compliance reviews, then monitored over time.</p> },
          { title: "Strategic Sourcing", text: <p>Multiple sourcing options and geographic diversification, balanced against lead times, cost and quality.</p> },
          { title: "Procurement", text: <p>RFQs, negotiation, contracts and supplier performance, creating value beyond purchase price.</p> },
          { title: "Planning & Inventory", text: <p>Demand, supply, production and capacity planning, balancing availability with working capital.</p> },
          { title: "Warehousing", text: <p>Raw-material and finished-goods storage, controlled storage, batch management and dispatch.</p> },
          { title: "Logistics", text: <p>Road, ocean and air freight, domestic and international, chosen for product, destination and urgency.</p> },
        ]}
      >
        <p className="tag-row-label">How we build resilience</p>
        <ul className="tag-row">
          <li>Diversification</li>
          <li>Visibility</li>
          <li>Flexibility</li>
          <li>Inventory Discipline</li>
          <li>Supplier Development</li>
          <li>Continuity Planning</li>
        </ul>
      </NumberedGrid>
      <NumberedGrid
        id="responsible-operations"
        label="Responsible Operations"
        title="Safe, efficient and connected operations"
        lead="We apply technology where it creates measurable improvement, and treat safety and sustainability as part of operational excellence."
        tone="dark"
        items={[
          { title: "Safety", text: <p>Safe operating procedures, process and equipment safety, training, risk assessment and emergency preparedness.</p> },
          { title: "Sustainable Manufacturing", text: <p>Less energy, water, material and packaging waste, with resource-efficient processes and renewable energy.</p> },
          { title: "Circular Materials", text: <p>Recycling, circular materials and sustainable packaging wherever they fit the product.</p> },
          { title: "Digital Manufacturing", text: <p>Production monitoring, process analytics, digital quality systems and predictive maintenance.</p> },
          { title: "Automation", text: <p>Automated production, material handling, inspection, packaging and robotics for consistency and precision.</p> },
          { title: "Continuous Improvement", text: <p>Quality, yield, energy, material use, equipment performance and customer feedback, evaluated every cycle.</p> },
        ]}
      />
      <InfoTabs
        id="work-with-us"
        label="Work With Us"
        title="Build, supply or innovate with our manufacturing teams."
        tabs={[
          {
            tab: "Customers",
            title: "Looking for a Manufacturing Partner?",
            text: "Tell us your product requirements, specifications, volumes, quality and regulatory needs, packaging and delivery expectations.",
            href: "/contact#manufacturing-inquiries",
            action: "Submit a Manufacturing Inquiry",
            photo: photos.machinery,
          },
          {
            tab: "Suppliers",
            title: "Join Our Supply Network",
            text: "Manufacturers and suppliers with strong technical and operational capabilities are invited to connect with our procurement teams.",
            href: "/suppliers-procurement#supplier-registration",
            action: "Become a Supplier",
            photo: photos.heroSuppliers,
          },
          {
            tab: "Technology Partners",
            title: "Build the Factory of the Future With Us",
            text: "We are interested in automation, robotics, AI, digital manufacturing, process control, energy efficiency and supply-chain technology.",
            href: "/partnerships#technology-partnerships",
            action: "Explore Technology Partnerships",
            photo: photos.digital,
          },
        ]}
      />
      <FeatureBanner
        title="Build better. Supply reliably. Grow globally."
        photo={photos.metal}
        action={{ href: "/contact", label: "Contact Cosmox Industries" }}
      >
        <p>From source to production, from production to market, and from market to customer.</p>
      </FeatureBanner>
    </>
  );
}
