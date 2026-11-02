import Link from "next/link";
import LegalDocument from "@/components/LegalDocument";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Cosmox Industries collects, uses and protects information submitted through this website.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      updated="28 September 2026"
      intro={
        <p>
          This policy explains what information Cosmox Industries collects through this website, how we use it and the
          choices you have. We collect as little as we need to respond to you.
        </p>
      }
      sections={[
        {
          id: "information-we-collect",
          heading: "Information we collect",
          body: (
            <>
              <p>
                <strong>Information you give us.</strong> When you send an inquiry through our{" "}
                <Link href="/contact#send-us-an-inquiry">contact form</Link>, we receive your name, company, business
                email, phone number, country or region, the inquiry type, the business division you choose and your
                message.
              </p>
              <p>
                <strong>Technical information.</strong> Like most websites, the servers that host this site record basic
                request information, such as your IP address, browser type, the pages requested and the time of the
                request, to deliver the site securely and reliably.
              </p>
              <p>
                <strong>Preferences stored on your device.</strong> If you choose a region or language, that choice is
                stored in your browser. See our <Link href="/cookie-policy">Cookie Policy</Link>.
              </p>
              <p>We do not use analytics, advertising or tracking tools on this website.</p>
            </>
          ),
        },
        {
          id: "how-we-use-information",
          heading: "How we use information",
          body: (
            <ul>
              <li>To respond to your inquiry and route it to the relevant business or functional team.</li>
              <li>To follow up on a business relationship you have started with us.</li>
              <li>To keep the website secure and working properly.</li>
              <li>To meet our legal and regulatory obligations.</li>
            </ul>
          ),
        },
        {
          id: "sharing",
          heading: "When information is shared",
          body: (
            <>
              <p>We do not sell your information. We share it only where needed:</p>
              <ul>
                <li>
                  <strong>Service providers</strong> that host this website and deliver contact-form submissions to our
                  teams, acting on our instructions.
                </li>
                <li>
                  <strong>Google</strong>, only if you choose a language other than English. The page is then
                  machine-translated by Google Translate, which receives the page content and your IP address.
                </li>
                <li>
                  <strong>Authorities or advisers</strong>, where required by law or to protect our rights.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "retention",
          heading: "How long we keep information",
          body: (
            <p>
              We keep inquiry information for as long as needed to handle your inquiry and any resulting business
              relationship, and afterwards only as long as the law requires or allows.
            </p>
          ),
        },
        {
          id: "your-rights",
          heading: "Your rights",
          body: (
            <p>
              Depending on the law that applies to you, you may be able to ask us to access, correct or delete your
              information, or to object to how we use it. To make a request, <Link href="/contact#send-us-an-inquiry">contact us</Link>{" "}
              and choose “General Inquiry”.
            </p>
          ),
        },
        {
          id: "security",
          heading: "Security",
          body: (
            <p>
              We use reasonable measures to protect information sent through this website. Please do not send
              confidential technical information, trade secrets or identity documents through the contact form unless we
              ask for them through a secure process.
            </p>
          ),
        },
        {
          id: "changes",
          heading: "Changes to this policy",
          body: <p>We may update this policy as the website changes. The date at the top shows when it was last updated.</p>,
        },
      ]}
    />
  );
}
