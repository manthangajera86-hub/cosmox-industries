import { useId } from "react";
import SiteSearch from "@/components/SiteSearch";

type ProductSearchProps = {
  id?: string;
  title: string;
  lead: string;
  /** Division id (lib/divisions) the finder starts filtered to. */
  division?: string;
};

/** Product finder section: searches products, categories and divisions, with type and division filters. */
export default function ProductSearch({ id = "find-a-product", title, lead, division }: ProductSearchProps) {
  const titleId = useId();
  return (
    <section id={id} className="numbered-grid is-alt product-search" aria-labelledby={titleId}>
      <div className="container">
        <div className="numbered-grid-head">
          <div>
            <p className="statement-label">Product Finder</p>
            <h2 className="numbered-grid-title" id={titleId}>
              {title}
            </h2>
          </div>
          <p className="numbered-grid-lead">{lead}</p>
        </div>
        <SiteSearch scope="catalogue" division={division} />
      </div>
    </section>
  );
}
