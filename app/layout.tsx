import type { Metadata } from "next";
import { Barlow_Semi_Condensed, Inter, Libre_Baskerville, Sora } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { contact, siteDescription, siteName, siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const barlow = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
// Headings. next/font serves Google's Libre Baskerville from this site, so no request goes to Google.
const baskerville = Libre_Baskerville({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-baskerville",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    template: `%s | ${siteName}`,
    default: siteName,
  },
  description: siteDescription,
  applicationName: siteName,
};

// Tells search engines who publishes the site. Keep it to facts that are true today.
const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl.href,
  logo: new URL("/icon.png", siteUrl).href,
  description: siteDescription,
  email: contact.email,
  telephone: contact.phones[0],
  contactPoint: contact.phones.map((telephone) => ({ "@type": "ContactPoint", telephone, contactType: "customer service" })),
  address: contact.offices.map((office) => ({
    "@type": "PostalAddress",
    streetAddress: office.lines.slice(0, -1).join(" ").replace(/,$/, ""),
    addressLocality: office.locality,
    addressRegion: office.region,
    postalCode: office.postalCode,
    addressCountry: "IN",
  })),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${barlow.variable} ${sora.variable} ${baskerville.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          // Serialized from a constant above, so there is no user input to escape.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
      </body>
    </html>
  );
}
