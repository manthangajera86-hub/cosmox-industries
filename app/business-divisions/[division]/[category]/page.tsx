import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import ButtonLink from "@/components/ButtonLink";
import FeatureBanner from "@/components/FeatureBanner";
import Hero from "@/components/Hero";
import NumberedGrid from "@/components/NumberedGrid";
import ProductList from "@/components/ProductList";
import { catalogues, categoryPath, findCatalogue, findCategory, productPath, productSlug } from "@/lib/catalogue";
import { quoteRequestHref } from "@/lib/inquiry";
import { photos } from "@/lib/photos";
import { pageMetadata } from "@/lib/site";

type Props = PageProps<"/business-divisions/[division]/[category]">;

// Only the categories in lib/catalogue have pages; any other address is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return catalogues.flatMap((catalogue) =>
    catalogue.categories.map((category) => ({ division: catalogue.slug, category: category.slug })),
  );
}

async function find(params: Props["params"]) {
  const { division, category: slug } = await params;
  const catalogue = findCatalogue(division);
  const category = catalogue && findCategory(catalogue, slug);
  return catalogue && category ? { catalogue, category } : undefined;
}

export async function generateMetadata({ params }: Props) {
  const found = await find(params);
  if (!found) return {};
  const { catalogue, category } = found;
  return pageMetadata({
    title: category.name,
    description: `${category.lead} Part of the ${catalogue.division.name} division of Cosmox Industries.`,
    path: categoryPath(catalogue, category),
  });
}

/** One product category of a division: its product families and products, each linking to its own page. */
export default async function ProductCategoryPage({ params }: Props) {
  const found = await find(params);
  if (!found) notFound();
  const { catalogue, category } = found;
  const { division } = catalogue;
  const position = catalogue.categories.indexOf(category) + 1;

  return (
    <>
      <Hero
        compact
        eyebrow={`${division.name} · Category ${String(position).padStart(2, "0")}`}
        title={category.name}
        photo={category.photo}
        actions={
          <>
            <ButtonLink href="#products">View Products</ButtonLink>
            <ButtonLink href={quoteRequestHref({ division: division.name })} variant="ghost">Request a Quote</ButtonLink>
          </>
        }
      >
        <p>{category.lead}</p>
      </Hero>
      <Breadcrumbs
        trail={[
          { href: "/business-divisions", label: "Business Divisions" },
          { href: catalogue.path, label: division.name },
        ]}
        current={{ href: categoryPath(catalogue, category), label: category.name }}
      />
      <ProductList
        id="products"
        label="Product Range"
        title="Product families and products"
        lead="Specifications, grades, packaging, documentation and lead times are confirmed with each quotation. Supply is subject to regulatory and trade requirements."
        families={category.families}
        action="View product"
        products={category.products.map((product) => ({
          name: product,
          id: productSlug(product),
          href: productPath(catalogue, category, product),
        }))}
      />
      <NumberedGrid
        id="more-categories"
        label="Product Portfolio"
        title={`More ${division.name} categories`}
        columns={4}
        items={catalogue.categories
          .filter((other) => other !== category)
          .map((other) => ({
            title: other.shortName,
            text: <p>{other.summary}</p>,
            href: categoryPath(catalogue, other),
          }))}
      />
      <FeatureBanner
        title="Tell us what you need"
        photo={photos.heroCommerce}
        action={{ href: quoteRequestHref({ division: division.name }), label: "Request a Quote" }}
      >
        <p>Send us the product, grade or specification, quantity and delivery destination, and we will route your inquiry to the {division.name} team.</p>
      </FeatureBanner>
    </>
  );
}
