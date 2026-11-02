import { notFound } from "next/navigation";
import { catalogues, findCatalogue, findCategory, findProduct, productSlug } from "@/lib/catalogue";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Product of a Cosmox Industries business division";
export const size = ogSize;
export const contentType = ogContentType;

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

export default async function Image({
  params,
}: {
  params: Promise<{ division: string; category: string; product: string }>;
}) {
  const { division, category: categorySlug, product: slug } = await params;
  const catalogue = findCatalogue(division);
  const category = catalogue && findCategory(catalogue, categorySlug);
  const product = category && findProduct(category, slug);
  if (!catalogue || !category || !product) notFound();
  return renderOgImage({
    label: `${catalogue.division.name} · ${category.shortName}`,
    title: product,
    photo: catalogue.cardPhoto,
  });
}
