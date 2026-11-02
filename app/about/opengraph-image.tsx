import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "About Us | Cosmox Industries";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    label: "About Us",
    title: "Building Businesses. Connecting Industries. Creating Long-Term Value.",
    photo: "hero-about.jpg",
  });
}
