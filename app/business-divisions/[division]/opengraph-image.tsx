import { notFound } from "next/navigation";
import { catalogues, findCatalogue } from "@/lib/catalogue";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Product portfolio of a Cosmox Industries business division";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return catalogues.map((catalogue) => ({ division: catalogue.slug }));
}

export default async function Image({ params }: { params: Promise<{ division: string }> }) {
  const catalogue = findCatalogue((await params).division);
  if (!catalogue) notFound();
  return renderOgImage({
    label: `${catalogue.division.name} Division`,
    title: catalogue.title,
    photo: catalogue.cardPhoto,
  });
}
