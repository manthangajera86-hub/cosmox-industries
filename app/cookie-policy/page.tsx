import Link from "next/link";
import LegalDocument from "@/components/LegalDocument";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Cookie Policy",
  description:
    "The cookies and browser storage this website uses, and how to control them.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <LegalDocument
      title="Cookie Policy"
      updated="28 September 2026"
      intro={
        <p>
          This website uses only a few small pieces of browser storage, all to remember your language choice. We do not
          use analytics, advertising or tracking cookies.
        </p>
      }
      sections={[
        {
          id: "what-we-store",
          heading: "What we store",
          body: (
            <table className="legal-table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Purpose</th>
                  <th scope="col">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>locale</code>
                  </td>
                  <td>Cookie</td>
                  <td>Remembers the region and language you chose in the language picker.</td>
                  <td>1 year</td>
                </tr>
                <tr>
                  <td>
                    <code>cosmox-locale</code>
                  </td>
                  <td>Local storage</td>
                  <td>The same choice, so every open tab shows the same language.</td>
                  <td>Until you clear it</td>
                </tr>
                <tr>
                  <td>
                    <code>googtrans</code>
                  </td>
                  <td>Cookie</td>
                  <td>Set only when you choose a language other than English; tells Google Translate which language to show.</td>
                  <td>Until you close the browser</td>
                </tr>
              </tbody>
            </table>
          ),
        },
        {
          id: "google-translate",
          heading: "Google Translate",
          body: (
            <p>
              When you choose a language other than English, the site loads Google Translate to machine-translate the
              page. Google may set its own cookies and receives the page content and your IP address, under Google’s own
              privacy terms. Nothing is loaded from Google while you browse in English.
            </p>
          ),
        },
        {
          id: "your-choices",
          heading: "Your choices",
          body: (
            <>
              <p>
                Choosing English in the language picker removes the <code>googtrans</code> cookie. You can also delete or
                block cookies and site storage in your browser settings; the site will then show in English.
              </p>
              <p>
                For more about how we handle information, see our <Link href="/privacy-policy">Privacy Policy</Link>.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
