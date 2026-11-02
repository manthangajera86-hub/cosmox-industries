import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Cookie Policy | Cosmox Industries";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ label: "Legal", title: "Cookie Policy", photo: "hero-home.jpg" });
}
