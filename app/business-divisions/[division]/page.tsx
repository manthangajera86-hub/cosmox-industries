import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import ButtonLink from "@/components/ButtonLink";
import CapabilityList from "@/components/CapabilityList";
import FeatureBanner from "@/components/FeatureBanner";
import Hero from "@/components/Hero";
import ProductSearch from "@/components/ProductSearch";
import Statement from "@/components/Statement";
import { catalogues, categoryPath, findCatalogue } from "@/lib/catalogue";
import { divisionProfiles } from "@/lib/division-profiles";
import { quoteRequestHref } from "@/lib/inquiry";
import { photos } from "@/lib/photos";
import { pageMetadata } from "@/lib/site";

type Props = PageProps<"/business-divisions/[division]">;

// Only the divisions in lib/catalogue have product pages; any other address is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return catalogues.map((catalogue) => ({ division: catalogue.slug }));
}

export async function generateMetadata({ params }: Props) {
  const catalogue = findCatalogue((await params).division);
  if (!catalogue) return {};
  return pageMetadata({ title: catalogue.title, description: catalogue.lead, path: catalogue.path });
}

/** A division's product landing page: its product categories, each linking to its own page. */
export default async function DivisionProductsPage({ params }: Props) {
  const catalogue = findCatalogue((await params).division);
  if (!catalogue) notFound();
  const { division } = catalogue;
  const quoteHref = quoteRequestHref({ division: division.name });

  return (
    <>
      <Hero
        eyebrow={`${division.name} Division`}
        title={catalogue.title}
        photo={division.photo}
        actions={
          <>
            <ButtonLink href="#categories">Explore Products</ButtonLink>
            <ButtonLink href={quoteHref} variant="ghost">Request a Quote</ButtonLink>
          </>
        }
      >
        <p>{catalogue.lead}</p>
      </Hero>
      <Breadcrumbs
        trail={[{ href: "/business-divisions", label: "Business Divisions" }]}
        current={{ href: catalogue.path, label: division.name }}
      />
      <CapabilityList
        id="categories"
        label="Product Portfolio"
        title="Explore our product portfolio"
        lead={catalogue.serves ?? "Open a category to see its product families and products, and request a quote for any of them."}
        items={catalogue.categories.map((category) => ({
          title: category.shortName,
          text: category.summary,
          href: categoryPath(catalogue, category),
          photo: category.photo,
        }))}
      />
      <ProductSearch
        title={`Search ${division.name} products`}
        lead={`Search this division's products, product families and categories, or switch the division filter to search every division.`}
        division={division.id}
      />
      <Statement
        title={divisionProfiles[division.id].title}
        label={`About ${division.name}`}
        lead={division.summary}
        action={{ href: `/business-divisions#${division.id}`, label: "Division Overview" }}
      >
        <p>{division.detail}</p>
      </Statement>
      <FeatureBanner
        title="Tell us what you need"
        photo={photos.heroCommerce}
        action={{ href: quoteHref, label: "Request a Quote" }}
      >
        <p>Send us the product, grade or specification, quantity and delivery destination, and we will route your inquiry to the {division.name} team.</p>
      </FeatureBanner>
    </>
  );
}
