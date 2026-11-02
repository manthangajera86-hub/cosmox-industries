import DivisionProfileSection from "@/components/DivisionProfileSection";
import FeatureBanner from "@/components/FeatureBanner";
import Hero from "@/components/Hero";
import InfoTabs from "@/components/InfoTabs";
import NumberedGrid from "@/components/NumberedGrid";
import ProductSearch from "@/components/ProductSearch";
import SplitFeature from "@/components/SplitFeature";
import Statement from "@/components/Statement";
import { catalogues } from "@/lib/catalogue";
import { divisionProfiles } from "@/lib/division-profiles";
import { divisions } from "@/lib/divisions";
import { pageVideo } from "@/lib/hero-video";
import { photos } from "@/lib/photos";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Business Divisions",
  description:
    "Twelve specialized business divisions, from pharmaceuticals and energy to semiconductors, aerospace and jewellery, connected by shared manufacturing, sourcing and global commerce capabilities.",
  path: "/business-divisions",
});

const productCount = catalogues.reduce(
  (sum, catalogue) => sum + catalogue.categories.reduce((n, category) => n + category.products.length, 0),
  0,
);

export default function BusinessDivisionsPage() {
  return (
    <>
      <Hero
        eyebrow="Business Divisions"
        title="12 Specialized Businesses. One Connected Industrial Enterprise."
        photo={photos.heroDivisions}
        video={pageVideo("business")}
      >
        <p>Cosmox Industries operates through twelve specialized business divisions serving industries that are fundamental to the global economy.</p>
      </Hero>
      <ProductSearch
        title="Find a product"
        lead={`Search ${productCount.toLocaleString("en")} products in ${catalogues.length} divisions. Narrow the results to products, categories or divisions, or pick a division to browse everything in it.`}
      />
      <Statement
        title="Deep industry knowledge. Shared industrial strength."
        label="Overview"
        lead="Each division is built around a distinct market, while drawing on our broader capabilities in technology, manufacturing, global sourcing, supply chain and global commerce."
      >
        <p>Our objective is to develop businesses with deep industry knowledge, strong technical capabilities and the ability to serve customers across domestic and international markets.</p>
        <p>Across our divisions, we connect <strong>products with markets, technology with manufacturing, suppliers with customers and India with the world.</strong></p>
      </Statement>

      {divisions.map((division) => (
        <DivisionProfileSection
          key={division.id}
          id={division.id}
          division={division}
          profile={divisionProfiles[division.id]}
          action={
            catalogues.some((catalogue) => catalogue.division === division)
              ? { href: division.href, label: `Explore ${division.name} Products` }
              : { href: "/contact#product-and-sales-inquiries", label: `Enquire about ${division.name}` }
          }
        />
      ))}

      <NumberedGrid
        id="connected-capabilities"
        label="One Industrial Platform"
        title="Deep expertise. Global reach. Connected capabilities."
        lead="Every division combines depth in its industry, the scale to serve growing markets, and the ability to connect products, technology, suppliers and customers across the value chain."
        tone="dark"
        items={[
          { title: "Technology", text: <p>Research, engineering, digitalization and advanced technologies that create new industrial opportunities.</p> },
          { title: "Products", text: <p>Specialized products, materials, components and industrial solutions serving specific market requirements.</p> },
          { title: "Manufacturing", text: <p>Production, process development, scale-up and operational capabilities.</p> },
          { title: "Global Sourcing", text: <p>Connecting customers with qualified manufacturers and suppliers across international markets.</p> },
          { title: "Import", text: <p>Bringing selected products, materials, technologies and capabilities into India.</p> },
          { title: "Export", text: <p>Connecting Indian products and manufacturing capabilities with international customers.</p> },
          { title: "Supply Chain", text: <p>Sourcing, procurement, supplier management, logistics, warehousing and distribution.</p> },
          { title: "Global Commerce", text: <p>International trade, market development and cross-border business.</p> },
          { title: "Partnerships", text: <p>Customers, suppliers, manufacturers, technology companies, distributors and research institutions.</p> },
        ]}
      />
      <NumberedGrid
        id="industries-of-tomorrow"
        label="Industries of Tomorrow"
        title="Where our capabilities meet global opportunity"
        lead="The industries we serve are undergoing fundamental transformation, creating new requirements for products, materials and technology."
        tone="alt"
        columns={4}
        items={[
          { title: "Healthcare", text: <p>Demand for advanced pharmaceutical products, ingredients, materials and healthcare technologies continues to evolve.</p> },
          { title: "Energy", text: <p>Electrification, energy storage and renewable technologies are reshaping global energy systems.</p> },
          { title: "Electronics", text: <p>Semiconductors and advanced electronics are becoming important across virtually every major industry.</p> },
          { title: "Mobility", text: <p>Electric vehicles, advanced materials and intelligent transportation are transforming mobility.</p> },
          { title: "Manufacturing", text: <p>Automation, robotics, AI and digital manufacturing are changing industrial production.</p> },
          { title: "Resources", text: <p>Critical minerals and secure resource supply chains are becoming increasingly strategic.</p> },
          { title: "Infrastructure", text: <p>Urbanization and industrial development are creating demand for advanced construction materials.</p> },
          { title: "Aerospace & Defence", text: <p>Specialized materials and precision manufacturing are expanding aerospace and defence capabilities.</p> },
        ]}
      />
      <SplitFeature
        label="From Product to Global Business"
        title="Building beyond the product"
        photo={photos.global}
        action={{ href: "/global-commerce", label: "Explore Global Commerce" }}
        reverse
      >
        <p>A product can become a manufacturing opportunity, a manufacturing capability an export business, and an export relationship a distribution network, connecting India with the world.</p>
      </SplitFeature>
      <InfoTabs
        id="work-with-us"
        label="Work With Us"
        title="Multiple ways to connect with our business divisions."
        tabs={[
          {
            tab: "Products",
            title: "Looking for a Product?",
            text: "Tell us what you need and we will connect you with the relevant business division.",
            href: "/contact#product-and-sales-inquiries",
            action: "Submit a Product Inquiry",
            photo: photos.machinery,
          },
          {
            tab: "Manufacturing",
            title: "Looking for Manufacturing?",
            text: "Discuss your manufacturing requirements, from process development and scale-up to contract manufacturing.",
            href: "/contact#manufacturing-inquiries",
            action: "Discuss Manufacturing",
            photo: photos.heroManufacturing,
          },
          {
            tab: "Sourcing",
            title: "Looking for Global Sourcing?",
            text: "Tell us what product, material or capability you need, and we will find qualified sources across international markets.",
            href: "/global-commerce#global-sourcing",
            action: "Explore Global Sourcing",
            photo: photos.packaging,
          },
          {
            tab: "Technology",
            title: "Interested in Technology Collaboration?",
            text: "Explore research, technology and commercialization opportunities with our divisions.",
            href: "/partnerships",
            action: "Explore Partnerships",
            photo: photos.heroInnovation,
          },
          {
            tab: "Suppliers",
            title: "Want to Become a Supplier?",
            text: "Introduce your products, materials and manufacturing capabilities to our procurement team.",
            href: "/suppliers-procurement",
            action: "Suppliers & Procurement",
            photo: photos.heroSuppliers,
          },
          {
            tab: "Trade",
            title: "Looking for Distribution or Trade?",
            text: "Explore international business, distribution and market-development opportunities.",
            href: "/global-commerce#global-distribution",
            action: "Explore Global Business",
            photo: photos.heroCommerce,
          },
        ]}
      />
      <FeatureBanner
        title="Building the next generation of industry"
        photo={photos.heroHome}
        action={{ href: "/contact", label: "Connect With Us" }}
      >
        <p>We connect innovation with industry, technology with manufacturing, suppliers with customers and India with the world.</p>
      </FeatureBanner>
    </>
  );
}
