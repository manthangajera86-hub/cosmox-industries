import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Sustainability & ESG | Cosmox Industries";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    label: "Sustainability & ESG",
    title: "Building Industry for the Long Term",
    photo: "hero-sustainability.jpg",
  });
}
