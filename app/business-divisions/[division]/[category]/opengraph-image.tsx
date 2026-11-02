import { notFound } from "next/navigation";
import { catalogues, findCatalogue, findCategory } from "@/lib/catalogue";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Product category of a Cosmox Industries business division";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return catalogues.flatMap((catalogue) =>
    catalogue.categories.map((category) => ({ division: catalogue.slug, category: category.slug })),
  );
}

export default async function Image({ params }: { params: Promise<{ division: string; category: string }> }) {
  const { division, category: slug } = await params;
  const catalogue = findCatalogue(division);
  const category = catalogue && findCategory(catalogue, slug);
  if (!catalogue || !category) notFound();
  return renderOgImage({
    label: catalogue.division.name,
    title: category.name,
    photo: catalogue.cardPhoto,
  });
}
