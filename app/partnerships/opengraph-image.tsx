import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Partnerships | Cosmox Industries";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    label: "Partnerships",
    title: "Building Stronger Industrial Ecosystems Together",
    photo: "hero-partnerships.jpg",
  });
}
