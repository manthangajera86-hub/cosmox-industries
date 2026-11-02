import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import ButtonLink from "@/components/ButtonLink";
import Hero from "@/components/Hero";
import InquiryForm from "@/components/InquiryForm";
import ProductList from "@/components/ProductList";
import ProductSheet from "@/components/ProductSheet";
import {
  catalogues,
  categoryPath,
  findCatalogue,
  findCategory,
  findProduct,
  productPath,
  productSlug,
} from "@/lib/catalogue";
import { pageMetadata } from "@/lib/site";

type Props = PageProps<"/business-divisions/[division]/[category]/[product]">;

// Only the products in lib/catalogue have pages; any other address is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return catalogues.flatMap((catalogue) =>
    catalogue.categories.flatMap((category) =>
      category.products.map((product) => ({
        division: catalogue.slug,
        category: category.slug,
        product: productSlug(product),
      })),
    ),
  );
}

async function find(params: Props["params"]) {
  const { division, category: categorySlug, product: slug } = await params;
  const catalogue = findCatalogue(division);
  const category = catalogue && findCategory(catalogue, categorySlug);
  const product = category && findProduct(category, slug);
  return catalogue && category && product ? { catalogue, category, product } : undefined;
}

export async function generateMetadata({ params }: Props) {
  const found = await find(params);
  if (!found) return {};
  const { catalogue, category, product } = found;
  return pageMetadata({
    title: `${product} | ${category.shortName}`,
    description: `Request a quote for ${product} from the ${category.name} range of the ${catalogue.division.name} division of Cosmox Industries. Specification, documentation and availability are confirmed with each quotation.`,
    path: productPath(catalogue, category, product),
  });
}

/**
 * One product: where it sits in the catalogue, what each quotation confirms for it, a quote
 * request started for it, and the other products of its category.
 */
export default async function ProductPage({ params }: Props) {
  const found = await find(params);
  if (!found) notFound();
  const { catalogue, category, product } = found;
  const { division } = catalogue;
  const path = productPath(catalogue, category, product);

  return (
    <>
      <Hero
        compact
        eyebrow={`${division.name} · ${category.shortName}`}
        title={product}
        photo={category.photo}
        actions={
          <>
            <ButtonLink href="#request-a-quote">Request a Quote</ButtonLink>
            <ButtonLink href={categoryPath(catalogue, category)} variant="ghost">
              All {category.shortName}
            </ButtonLink>
          </>
        }
      >
        <p>{category.lead}</p>
      </Hero>
      <Breadcrumbs
        trail={[
          { href: "/business-divisions", label: "Business Divisions" },
          { href: catalogue.path, label: division.name },
          { href: categoryPath(catalogue, category), label: category.shortName },
        ]}
        current={{ href: path, label: product }}
      />
      <ProductSheet
        id="product-details"
        label="Product Details"
        title="Specified with every quotation"
        lead={`Grades, specifications and documentation for ${product} vary by supplier and order, so we confirm them with each quotation rather than publish general figures.`}
        action={{ href: "#request-a-quote", label: "Request a Quote" }}
        facts={[
          { label: "Product", value: product },
          { label: "Category", value: <Link href={categoryPath(catalogue, category)}>{category.name}</Link> },
          { label: "Division", value: <Link href={catalogue.path}>{division.name}</Link> },
          { label: "Category covers", value: category.families.join(", ") },
        ]}
        fieldsTitle="Confirmed with your quotation"
        fields={catalogue.productFields}
      />
      <InquiryForm
        id="request-a-quote"
        label="Request a Quote"
        title="Tell us what you need"
        quote={{ division: division.name, category: category.name, product }}
      >
        <p>
          Your request for <strong>{product}</strong> is started below. Add the quantity and unit, grade or
          specification, delivery destination and timeline, and we will route it to the {division.name} team.
        </p>
        <p>What happens next:</p>
        <ol>
          <li>Your inquiry is received and reviewed</li>
          <li>It is routed to the relevant team</li>
          <li>The team evaluates your requirement</li>
          <li>We contact you with next steps</li>
        </ol>
        <p>Please don’t send confidential technical information, trade secrets or identity documents unless we request them through a secure process. Information you submit is handled according to applicable data-protection requirements.</p>
      </InquiryForm>
      <ProductList
        id="more-products"
        label="Product Range"
        title={`More in ${category.shortName}`}
        lead={category.summary}
        tone="light"
        action="View product"
        products={category.products.map((other) => ({
          name: other,
          id: productSlug(other),
          href: productPath(catalogue, category, other),
          current: other === product,
        }))}
      />
    </>
  );
}
