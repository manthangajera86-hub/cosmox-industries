import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Contact Us | Cosmox Industries";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    label: "Contact Us",
    title: "Connect With Cosmox Industries",
    photo: "hero-contact.jpg",
  });
}
