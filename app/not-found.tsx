import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import { ChevronIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Page Not Found",
};

const destinations = [
  { href: "/", label: "Home" },
  { href: "/business-divisions", label: "Business Divisions" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export default function NotFound() {
  return (
    <PageBanner label="404" title="We couldn’t find that page.">
      <p>The page may have moved, or the address may be mistyped. These pages are a good place to continue.</p>
      <div className="not-found-links">
        {destinations.map((destination) => (
          <Link key={destination.href} className="pill-link pill-link-light" href={destination.href}>
            {destination.label}
            <ChevronIcon />
          </Link>
        ))}
      </div>
    </PageBanner>
  );
}
