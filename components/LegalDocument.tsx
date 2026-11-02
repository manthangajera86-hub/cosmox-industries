import type { ReactNode } from "react";
import PageBanner from "@/components/PageBanner";

export type LegalSection = { id: string; heading: string; body: ReactNode };

type LegalDocumentProps = {
  title: string;
  /** Human-readable date the document was last changed, e.g. "28 September 2026". */
  updated: string;
  intro: ReactNode;
  sections: LegalSection[];
};

/** A policy page: dark title band, then a contents list beside the numbered sections. */
export default function LegalDocument({ title, updated, intro, sections }: LegalDocumentProps) {
  return (
    <>
      <PageBanner label="Legal" title={title}>
        <p>Last updated {updated}</p>
      </PageBanner>
      <div className="legal">
        <div className="container legal-inner">
          <nav className="legal-contents" aria-label="Contents">
            <p className="statement-label">Contents</p>
            <ol>
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.heading}</a>
                </li>
              ))}
            </ol>
          </nav>
          <article className="legal-body">
            <div className="legal-intro">{intro}</div>
            {sections.map((section, index) => (
              <section key={section.id} id={section.id}>
                <h2>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  {section.heading}
                </h2>
                {section.body}
              </section>
            ))}
          </article>
        </div>
      </div>
    </>
  );
}
