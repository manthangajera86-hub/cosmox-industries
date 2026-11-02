import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Suppliers & Procurement | Cosmox Industries";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    label: "Suppliers & Procurement",
    title: "Building a Stronger Global Supply Network",
    photo: "hero-suppliers.jpg",
  });
}
