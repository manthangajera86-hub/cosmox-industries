import Link from "next/link";
import { useId, type ReactNode } from "react";
import { ChevronIcon } from "@/components/icons";

/** `id` is the row's anchor; `current` marks the product whose page this is. */
export type ProductRow = { name: string; id: string; href: string; current?: boolean };

type ProductListProps = {
  /** Anchor for in-page links. */
  id?: string;
  /** Small bulleted label above the headline. */
  label: string;
  title: string;
  /** Large lead text beside the headline. */
  lead?: ReactNode;
  /** Product families the category covers, shown as tags. */
  families?: string[];
  products: ProductRow[];
  /** Link text on each row, e.g. "View product". */
  action: string;
  tone?: "light" | "alt";
};

/**
 * One product category: headline and lead, its product families as tags, then a numbered list
 * of products, each linking to its own page.
 */
export default function ProductList({ id, label, title, lead, families, products, action, tone = "alt" }: ProductListProps) {
  const titleId = useId();
  return (
    <section id={id} className={`numbered-grid is-${tone}`} aria-labelledby={titleId}>
      <div className="container">
        <div className="numbered-grid-head">
          <div>
            <p className="statement-label">{label}</p>
            <h2 className="numbered-grid-title" id={titleId}>
              {title}
            </h2>
          </div>
          {lead && <p className="numbered-grid-lead">{lead}</p>}
        </div>

        {families && (
          <>
            <h3 className="product-list-subhead">Product families</h3>
            <ul className="tag-row product-families">
              {families.map((family) => (
                <li key={family}>{family}</li>
              ))}
            </ul>
          </>
        )}

        <h3 className="product-list-subhead">Products</h3>
        <ol className="product-list">
          {products.map((product, index) => (
            <li key={product.id} id={product.id}>
              {/* Twenty rows would otherwise prefetch twenty product pages on every visit. */}
              <Link href={product.href} prefetch={false} aria-current={product.current ? "page" : undefined}>
                <span className="product-list-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="product-list-name">{product.name}</span>
                <span className="product-list-action">
                  {product.current ? "Viewing now" : action}
                  {!product.current && <ChevronIcon />}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
