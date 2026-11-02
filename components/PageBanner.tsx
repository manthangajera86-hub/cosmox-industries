import type { ReactNode } from "react";

type PageBannerProps = {
  /** Small bulleted label above the title. */
  label: string;
  title: string;
  children?: ReactNode;
};

/** Dark title band for pages without a photo header, such as legal pages and the 404 page. */
export default function PageBanner({ label, title, children }: PageBannerProps) {
  return (
    <section className="page-banner">
      <div className="container">
        <p className="statement-label">{label}</p>
        <h1>{title}</h1>
        {children && <div className="page-banner-text">{children}</div>}
      </div>
    </section>
  );
}
