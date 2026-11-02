import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Business Divisions | Cosmox Industries";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    label: "Business Divisions",
    title: "12 Specialized Businesses. One Connected Industrial Enterprise.",
    photo: "hero-divisions.jpg",
  });
}
