import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Manufacturing & Supply Chain | Cosmox Industries";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    label: "Manufacturing & Supply Chain",
    title: "From Industrial Capability to Reliable Supply",
    photo: "hero-manufacturing.jpg",
  });
}
