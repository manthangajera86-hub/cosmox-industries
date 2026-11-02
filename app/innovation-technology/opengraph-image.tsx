import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Innovation & Technology | Cosmox Industries";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    label: "Innovation & Technology",
    title: "Engineering What Comes Next",
    photo: "hero-innovation.jpg",
  });
}
