import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "News & Media | Cosmox Industries";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    label: "News & Media",
    title: "The Latest From Cosmox Industries",
    photo: "hero-news.jpg",
  });
}
