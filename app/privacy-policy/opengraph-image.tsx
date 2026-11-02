import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Privacy Policy | Cosmox Industries";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ label: "Legal", title: "Privacy Policy", photo: "hero-home.jpg" });
}
