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
  title: "Innovation & Technology",
  description:
    "Research, engineering, advanced materials, AI, automation and energy technologies, taking ideas from the laboratory to manufacturing and global markets.",
  path: "/innovation-technology",
});

export default function InnovationTechnologyPage() {
  return (
    <>
      <Hero
        eyebrow="Innovation & Technology"
        title="Engineering What Comes Next"
        photo={photos.heroInnovation}
        video={pageVideo("innovation")}
        actions={
          <>
            <ButtonLink href="#global-innovation-and-research-center">Explore Our Technology Platform</ButtonLink>
            <ButtonLink href="#innovate-with-cosmox" variant="ghost">Partner With Our Innovation Team</ButtonLink>
          </>
        }
      >
        <p>Innovation is at the heart of Cosmox Industries.</p>
      </Hero>
      <TopicNav section={topicSection("innovation")} label="In This Section" title={topicSection("innovation").navTitle} tone="alt" />
      <Statement
        id="innovation-at-cosmox-industries"
        title="Innovation with purpose."
        label="Innovation at Cosmox Industries"
        lead="We focus on innovation that creates measurable industrial value: better performance, greater efficiency, improved reliability, new products and stronger supply chains."
      >
        <p>Innovation begins with understanding a problem. We work with customers, engineers, scientists, manufacturers and technology partners to identify challenges that new products, processes, materials and technologies can solve.</p>
        <p>We combine scientific curiosity with commercial discipline, so ideas move beyond theoretical research into practical, scalable industrial applications.</p>
      </Statement>
      <NumberedGrid
        id="research-and-development"
        label="From Research to Market"
        title="A connected innovation journey"
        lead="Programs may start from a customer requirement, a manufacturing challenge or a new scientific development. Knowledge then moves across R&D, engineering, manufacturing and all twelve divisions."
        tone="alt"
        columns={4}
        items={[
          { title: "Discover", text: <p>Identify market needs, scientific opportunities and industrial challenges.</p> },
          { title: "Research", text: <p>Investigate scientific principles, materials and technologies.</p> },
          { title: "Develop", text: <p>Create products, processes and technical solutions, prototyping through repeated cycles.</p> },
          { title: "Engineer", text: <p>Convert concepts into scalable industrial systems through process design and plant integration.</p> },
          { title: "Validate", text: <p>Test performance, reliability, durability and manufacturability against defined requirements.</p> },
          { title: "Scale", text: <p>Move successful technologies from laboratory and pilot scale toward commercial production.</p> },
          { title: "Commercialize", text: <p>Connect products and technologies with customers and markets, protecting the know-how they create.</p> },
          { title: "Improve", text: <p>Continuously optimize the technology throughout its lifecycle.</p> },
        ]}
      />
      <SplitFeature
        id="global-innovation-and-research-center"
        label="Global Innovation & Research Center"
        title="A bridge between scientific discovery and industrial application"
        photo={photos.pharma}
        action={{ href: "/partnerships#research-partnerships", label: "Explore Research Collaboration" }}
        reverse
      >
        <p>Our central platform for research, engineering, product development and industrial collaboration across every business division.</p>
      </SplitFeature>
      <NumberedGrid
        id="technology-areas"
        label="Technology Areas"
        title="Where we focus our technology"
        lead="We explore established and emerging technologies wherever science, engineering and commercial execution can create new industrial value."
        tone="dark"
        items={[
          {
            id: "advanced-materials",
            title: "Advanced Materials",
            text: <p>Materials with better mechanical, thermal, chemical, electrical and barrier performance, for electronics, energy, automotive, aerospace and more.</p>,
          },
          {
            title: "Process Technology",
            text: <p>Process optimization, yield, energy efficiency, safety and waste reduction for reliable, competitive manufacturing.</p>,
          },
          {
            id: "digital-industry",
            title: "Digital Industry",
            text: <p>Industrial data, digital manufacturing, predictive systems and digital supply chains connecting machines, processes and decisions.</p>,
          },
          {
            id: "artificial-intelligence",
            title: "Artificial Intelligence",
            text: <p>Forecasting, supply-chain and process optimization, quality analytics, predictive maintenance and market intelligence.</p>,
          },
          {
            id: "automation-and-robotics",
            title: "Automation & Robotics",
            text: <p>Automation across manufacturing, handling, packaging, inspection, warehousing and process control, combined with human expertise.</p>,
          },
          {
            title: "Energy & Electrochemical",
            text: <p>Battery, electrochemical and energy-storage materials, energy conversion, thermal management and future energy systems.</p>,
          },
          {
            title: "Electronics & Semiconductors",
            text: <p>Electronic chemicals, high-purity and semiconductor materials, advanced coatings and next-generation electronic materials.</p>,
          },
          {
            title: "Biotechnology & Life Sciences",
            text: <p>Pharmaceutical development, specialty ingredients, bioprocessing and sustainable bio-based production.</p>,
          },
          {
            title: "Sustainable Technology",
            text: <p>Resource and energy efficiency, recycling, circular and alternative materials, and low-impact processes.</p>,
          },
        ]}
      />
      <SplitFeature
        id="customer-driven-innovation"
        label="Customer-Driven Innovation"
        title="Solving problems together"
        photo={photos.machinery}
        action={{ href: "/contact#research-and-innovation", label: "Submit an Innovation Challenge" }}
      >
        <p>Some of the most valuable innovations begin with a customer challenge, whether it is performance, cost, supply or regulation, so we develop solutions alongside you.</p>
      </SplitFeature>
      <NumberedGrid
        id="our-technology-ecosystem"
        label="Open Innovation"
        title="Building beyond our own boundaries"
        lead="Valuable ideas can emerge anywhere. We collaborate with universities, research institutions, startups and technology companies developing work relevant to our industries."
        tone="alt"
        columns={4}
        items={[
          { title: "Scientists", text: <p>Research and scientific expertise.</p> },
          { title: "Engineers", text: <p>Industrialization and technical development.</p> },
          { title: "Manufacturers", text: <p>Scale-up and production expertise.</p> },
          { title: "Customers", text: <p>Real-world requirements and application knowledge.</p> },
          { title: "Suppliers", text: <p>Materials, components and specialized technologies.</p> },
          { title: "Startups", text: <p>AI, robotics, energy, materials and other emerging technologies.</p> },
          { title: "Universities", text: <p>Applied research, materials science and advanced knowledge.</p> },
          { title: "Strategic Partners", text: <p>Complementary capabilities and market access.</p> },
        ]}
      />
      <InfoTabs
        id="innovate-with-cosmox"
        label="Innovate With Us"
        title="Have a technology, research idea or industrial challenge?"
        tabs={[
          {
            tab: "Technology Companies",
            title: "Take Your Technology to Industry",
            text: "Propose a technology for industrial commercialization, manufacturing and international markets.",
            href: "/partnerships#technology-partnerships",
            action: "Submit Technology Proposal",
            photo: photos.digital,
          },
          {
            tab: "Research Institutions",
            title: "Connect Science With Industry",
            text: "Collaborate on applied research, materials science, process technology, energy, electronics and sustainable technologies.",
            href: "/partnerships#research-partnerships",
            action: "Explore Research Collaboration",
            photo: photos.semiconductor,
          },
          {
            tab: "Startups",
            title: "Work With the Next Generation",
            text: "Startups developing technologies relevant to our businesses can explore pilots, partnerships and routes to market.",
            href: "/partnerships",
            action: "Explore Startup Partnership",
            photo: photos.heroInnovation,
          },
          {
            tab: "Customers",
            title: "Bring Us Your Challenge",
            text: "Tell us about performance requirements, manufacturing challenges, cost pressures or future technology needs.",
            href: "/contact#research-and-innovation",
            action: "Submit Innovation Challenge",
            photo: photos.heroManufacturing,
          },
          {
            tab: "Strategic Partners",
            title: "Build Something Together",
            text: "Combine complementary capabilities, technology and market access for long-term collaboration.",
            href: "/partnerships#strategic-partnerships",
            action: "Discuss Collaboration",
            photo: photos.heroPartnerships,
          },
        ]}
      />
      <FeatureBanner
        title="From scientific possibility to industrial reality"
        photo={photos.semiconductor}
        action={{ href: "/contact", label: "Connect With Us" }}
      >
        <p>Research, technology, engineering, manufacturing and markets. Together, they create industrial progress.</p>
      </FeatureBanner>
    </>
  );
}
