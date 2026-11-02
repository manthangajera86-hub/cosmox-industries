import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Global Commerce | Cosmox Industries";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    label: "Global Commerce",
    title: "Connecting Products, Markets and Opportunities Across Borders",
    photo: "hero-commerce.jpg",
  });
}
