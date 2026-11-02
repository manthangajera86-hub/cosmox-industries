import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Terms of Use | Cosmox Industries";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ label: "Legal", title: "Terms of Use", photo: "hero-home.jpg" });
}
