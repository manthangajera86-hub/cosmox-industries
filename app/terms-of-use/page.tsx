import Link from "next/link";
import LegalDocument from "@/components/LegalDocument";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description:
    "The terms that apply when you use the Cosmox Industries website.",
  path: "/terms-of-use",
});

export default function TermsOfUsePage() {
  return (
    <LegalDocument
      title="Terms of Use"
      updated="28 September 2026"
      intro={<p>By using this website, you agree to these terms. If you do not agree, please do not use the site.</p>}
      sections={[
        {
          id: "information-only",
          heading: "Information only",
          body: (
            <p>
              The content on this website is general information about Cosmox Industries and its business activities. It
              is not an offer to sell, a binding commitment or professional advice. Product availability, specifications
              and terms are confirmed only in a written agreement.
            </p>
          ),
        },
        {
          id: "accuracy",
          heading: "Accuracy",
          body: (
            <p>
              We work to keep the website accurate and up to date, but we do not guarantee that all information is
              complete, current or error-free, and we may change it at any time without notice.
            </p>
          ),
        },
        {
          id: "translations",
          heading: "Machine translations",
          body: (
            <p>
              Translations offered through the language picker are produced automatically by Google Translate and may
              contain errors. The English version of this website is the authoritative version.
            </p>
          ),
        },
        {
          id: "intellectual-property",
          heading: "Intellectual property",
          body: (
            <p>
              The Cosmox Industries name, logo and website content belong to Cosmox Industries or are used with
              permission. Photographs are licensed from Unsplash. You may view and share pages for personal or internal
              business reference, but you may not copy, modify or republish the content for commercial use without our
              written permission.
            </p>
          ),
        },
        {
          id: "acceptable-use",
          heading: "Acceptable use",
          body: (
            <p>
              Please do not misuse the website, including by attempting to disrupt it, gain unauthorized access, or submit
              false, unlawful or harmful content through the contact form.
            </p>
          ),
        },
        {
          id: "external-links",
          heading: "External links",
          body: <p>Links to other websites are provided for convenience. We are not responsible for their content or practices.</p>,
        },
        {
          id: "liability",
          heading: "Limitation of liability",
          body: (
            <p>
              To the extent permitted by law, Cosmox Industries is not liable for any loss arising from the use of, or
              reliance on, this website or its content.
            </p>
          ),
        },
        {
          id: "privacy",
          heading: "Privacy",
          body: (
            <p>
              How we handle information you send us is described in our <Link href="/privacy-policy">Privacy Policy</Link>{" "}
              and <Link href="/cookie-policy">Cookie Policy</Link>.
            </p>
          ),
        },
        {
          id: "changes",
          heading: "Changes to these terms",
          body: <p>We may update these terms from time to time. The date at the top shows when they were last updated.</p>,
        },
      ]}
    />
  );
}
