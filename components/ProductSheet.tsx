import Link from "next/link";
import { useId, type ReactNode } from "react";
import { ChevronIcon } from "@/components/icons";
import type { ProductField } from "@/lib/catalogue";

type Fact = { label: string; value: ReactNode };

type ProductSheetProps = {
  /** Anchor for in-page links. */
  id?: string;
  /** Small bulleted label above the headline. */
  label: string;
  title: string;
  lead: ReactNode;
  action: { href: string; label: string };
  /** What is known about the product: its name and where it sits in the catalogue. */
  facts: Fact[];
  /** Heading over `fields`. */
  fieldsTitle: string;
  /** What each quotation confirms, numbered. */
  fields: ProductField[];
};

/**
 * One product's details: pinned headline, lead and call to action on one side; on the other, a
 * table of catalogue facts, then the details each quotation confirms.
 */
export default function ProductSheet({ id, label, title, lead, action, facts, fieldsTitle, fields }: ProductSheetProps) {
  const titleId = useId();
  return (
    <section id={id} className="product-sheet" aria-labelledby={titleId}>
      <div className="container product-sheet-inner">
        <div className="product-sheet-side">
          <p className="statement-label">{label}</p>
          <h2 className="product-sheet-title" id={titleId}>
            {title}
          </h2>
          <p className="product-sheet-lead">{lead}</p>
          <Link className="pill-link" href={action.href}>
            {action.label}
            <ChevronIcon />
          </Link>
        </div>

        <div className="product-sheet-main">
          <dl className="product-sheet-facts">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>

          <h3 className="product-list-subhead">{fieldsTitle}</h3>
          {/* Numbered by a CSS counter: a <dl> row may hold only its <dt> and <dd>. */}
          <dl className="product-sheet-fields">
            {fields.map((field) => (
              <div key={field.label}>
                <dt>{field.label}</dt>
                <dd>{field.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
