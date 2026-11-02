import ButtonLink from "@/components/ButtonLink";
import Faq from "@/components/Faq";
import FeatureBanner from "@/components/FeatureBanner";
import Hero from "@/components/Hero";
import InquiryForm from "@/components/InquiryForm";
import NumberedGrid from "@/components/NumberedGrid";
import SplitFeature from "@/components/SplitFeature";
import Statement from "@/components/Statement";
import { photos } from "@/lib/photos";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Contact Cosmox Industries about products, manufacturing, sourcing, supply, partnerships, research, media or careers, and we will route your inquiry to the right team.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Hero
        eyebrow="Contact Us"
        title="Connect With Cosmox Industries"
        photo={photos.heroContact}
        actions={
          <>
            <ButtonLink href="#send-us-an-inquiry">Start a Conversation</ButtonLink>
            <ButtonLink href="#how-can-we-help" variant="ghost">Find the Right Contact</ButtonLink>
          </>
        }
      >
        <p>Whether you are a customer, supplier, technology company, manufacturer, distributor, research institution, investor, partner or prospective employee, we will connect you with the right team.</p>
      </Hero>
      <NumberedGrid
        id="how-can-we-help"
        label="How Can We Help"
        title="Choose the right path"
        lead="Tell us what you need and we will route your inquiry to the right business or functional team. Including these details helps us respond faster."
        items={[
          {
            id: "product-and-sales-inquiries",
            title: "Product & Sales",
            text: <p>Products, specifications, availability, samples, volumes and export. Include the exact product name or requirement.</p>,
          },
          {
            id: "technical-inquiries",
            title: "Technical Inquiries",
            text: <p>Specifications, grades, applications, performance, testing, documentation and handling requirements.</p>,
          },
          {
            id: "custom-requirements",
            title: "Custom Requirements",
            text: <p>Custom specifications or grades, application-specific materials, OEM needs and product development.</p>,
          },
          {
            id: "manufacturing-inquiries",
            title: "Manufacturing",
            text: <p>Contract, OEM and custom manufacturing, capacity partnerships, process development and technology transfer.</p>,
          },
          {
            id: "supplier-and-procurement",
            title: "Suppliers & Procurement",
            text: <p>Supplier registration, product introductions, RFQs, raw materials, components, equipment and services.</p>,
          },
          {
            id: "partnership-inquiries",
            title: "Partnerships",
            text: <p>Technology, manufacturing, research, distribution and strategic alliances, including startups and universities.</p>,
          },
          {
            id: "global-business",
            title: "Global Business",
            text: <p>Export, import, distribution, international sourcing, market entry and cross-border supply.</p>,
          },
          {
            id: "research-and-innovation",
            title: "Research & Innovation",
            text: <p>Joint and applied research, technology development and transfer, and industrial collaboration.</p>,
          },
          {
            id: "media-contact",
            title: "Media",
            text: <p>Company information, press releases, interviews, executive information and approved media assets.</p>,
          },
        ]}
        action={{ href: "#send-us-an-inquiry", label: "Send Us an Inquiry" }}
      />
      <InquiryForm id="send-us-an-inquiry" label="Send Us an Inquiry" title="Tell us what you need">
        <p>Give us as much relevant detail as you can: product, specification, quantity, application, destination and timeline.</p>
        <p>What happens next:</p>
        <ol>
          <li>Your inquiry is received and reviewed</li>
          <li>It is routed to the relevant team</li>
          <li>The team evaluates your requirement</li>
          <li>We contact you with next steps</li>
        </ol>
        <p>Please don’t send confidential technical information, trade secrets or identity documents unless we request them through a secure process. Information you submit is handled according to applicable data-protection requirements.</p>
      </InquiryForm>
      <NumberedGrid
        id="existing-relationships"
        label="Existing Customers & Suppliers"
        title="Already working with us?"
        lead="Choose the matching inquiry type in the form and include your company name, product, and order or batch reference so the right team can act quickly."
        tone="dark"
        items={[
          {
            id: "existing-customers",
            title: "Existing Customers",
            text: <p>Orders, product documentation, technical support, delivery, quality, supply planning and new requirements.</p>,
          },
          {
            id: "existing-suppliers",
            title: "Existing Suppliers",
            text: <p>Purchase orders, delivery schedules, documentation, quality matters, capacity and new opportunities.</p>,
          },
          {
            id: "emergency-and-quality-matters",
            title: "Quality & Safety Matters",
            text: <p>For urgent quality, safety or supply issues, describe the product, batch or order, the issue, its date and the action needed.</p>,
          },
        ]}
      />
      <SplitFeature
        id="careers"
        label="Careers"
        title="Build your career with Cosmox Industries"
        photo={photos.people}
        action={{ href: "#send-us-an-inquiry", label: "Get in Touch About Careers" }}
        reverse
      >
        <p>We welcome professionals across engineering, manufacturing, R&D, technology, sales, supply chain, finance, quality and global business. Choose “Careers” in the inquiry form.</p>
      </SplitFeature>
      <Faq
        id="frequently-asked-questions"
        label="Before You Contact Us"
        title="Frequently asked questions"
        items={[
          { question: "How do I request a product quotation?", answer: "Send a Product & Sales inquiry with the product name, specification, quantity and destination." },
          { question: "How can I become a supplier?", answer: "Visit Suppliers & Procurement and complete the supplier-registration process, or choose “Supplier & Procurement” in the form." },
          {
            question: "Can you develop customized products?",
            answer: "Selected requirements can be evaluated depending on technical feasibility, application and manufacturing capabilities.",
          },
          {
            question: "Can I propose a technology partnership?",
            answer: "Yes. Technology companies, startups, universities and research organizations can submit partnership or innovation proposals.",
          },
          { question: "Do you work with international customers?", answer: "Yes. We are developing global business and trade capabilities across international markets." },
          {
            question: "How can I contact the right business division?",
            answer: "Select the relevant business division in the inquiry form and describe your requirement.",
          },
        ]}
      />
      <Statement
        id="corporate-office"
        title="Corporate headquarters, India."
        label="Corporate Office"
        lead="Our corporate organization coordinates business development, technology, manufacturing, global commerce, supply chain and corporate functions across the Cosmox Industries platform."
        action={{ href: "/global-commerce", label: "Explore Our Global Network" }}
      >
        <p>From India, our teams work across markets to support international customers, partners and suppliers. For specific business inquiries, please use the inquiry form so your request reaches the right team.</p>
      </Statement>
      <FeatureBanner
        title="Let’s build the next industrial opportunity together."
        photo={photos.heroHome}
        action={{ href: "#send-us-an-inquiry", label: "Contact Cosmox Industries" }}
      >
        <p>Have a requirement, idea, technology, product or partnership in mind? Tell us what you want to achieve.</p>
      </FeatureBanner>
    </>
  );
}
