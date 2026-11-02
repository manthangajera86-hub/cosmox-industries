import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Cosmox Industries";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    label: "Cosmox Industries",
    title: "Building the Industrial Future.",
    photo: "hero-home.jpg",
  });
}
