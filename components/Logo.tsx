import Image from "next/image";
import logoOnDark from "@/assets/brand/logo-horizontal-dark.png";
import logoOnLight from "@/assets/brand/logo-horizontal-light.png";

/** Rendered height in px; the width follows the artwork's proportions. */
const HEIGHT = 48;

/**
 * The brand logo, drawn in two versions: `logo-light` (deeper gold wordmark) for light backgrounds
 * and `logo-dark` (original colours) for dark ones. CSS shows one of them: the light version by
 * default, the dark one inside the clear header over a dark hero.
 * All logo files are built from assets/brand/logo-original.jpeg by scripts/build-logo.mjs.
 *
 * `eager` loads both versions up front. The header needs that: it swaps versions as soon as the
 * page scrolls, and a lazy image would leave a gap while it downloads. Elsewhere only the version
 * on show loads.
 */
export default function Logo({ eager = false }: { eager?: boolean }) {
  return (
    <span className="logo">
      {[
        { src: logoOnLight, className: "logo-light" },
        { src: logoOnDark, className: "logo-dark" },
      ].map(({ src, className }) => (
        <Image
          key={className}
          className={className}
          src={src}
          alt=""
          loading={eager ? "eager" : "lazy"}
          height={HEIGHT}
          width={Math.round((src.width * HEIGHT) / src.height)}
        />
      ))}
    </span>
  );
}
