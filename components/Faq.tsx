import { useId } from "react";

export type FaqItem = { question: string; answer: string };

type FaqProps = {
  /** Anchor for in-page links. */
  id?: string;
  /** Small bulleted label above the headline. */
  label: string;
  title: string;
  items: FaqItem[];
};

/** Headline beside a list of questions that expand to show their answers. */
export default function Faq({ id, label, title, items }: FaqProps) {
  const titleId = useId();
  return (
    <section id={id} className="faq" aria-labelledby={titleId}>
      <div className="container faq-inner">
        <div>
          <p className="statement-label">{label}</p>
          <h2 className="faq-title" id={titleId}>
            {title}
          </h2>
        </div>
        <div className="faq-list">
          {items.map((item) => (
            <details key={item.question}>
              <summary>
                {item.question}
                <svg viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M6 2v8M2 6h8" />
                </svg>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
