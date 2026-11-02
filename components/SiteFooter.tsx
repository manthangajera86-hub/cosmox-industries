import Link from "next/link";
import FooterNav, { type FooterColumn } from "@/components/FooterNav";
import Logo from "@/components/Logo";
import { footerQuickLinks, legalLinks, megaMenu } from "@/lib/navigation";
import { contact, telHref } from "@/lib/site";

const columns: FooterColumn[] = megaMenu.map((group) => ({
  label: group.label,
  overview: group.overview,
  links: group.links,
}));

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <div>
            <Link className="brand footer-logo" href="/" aria-label="Cosmox Industries home">
              <Logo />
            </Link>
            <p className="footer-tagline">
              Building businesses.
              <br />
              Connecting industries.
            </p>
          </div>
          <p className="footer-statement">
            <strong>12</strong>
            business divisions.
            <br />
            One enterprise.
          </p>
        </div>

        <FooterNav columns={columns} />
      </div>

      <section className="footer-contact" aria-labelledby="footer-contact-title">
        <div className="container footer-contact-inner">
          <h2 id="footer-contact-title" className="footer-contact-title">
            Contact
          </h2>
          {contact.offices.map((office) => (
            <div className="footer-contact-item" key={office.label}>
              <h3>{office.label}</h3>
              <address>
                {office.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </div>
          ))}
          <div className="footer-contact-item">
            <h3>Phone &amp; Email</h3>
            <ul>
              {contact.phones.map((phone) => (
                <li key={phone}>
                  <a href={telHref(phone)}>{phone}</a>
                </li>
              ))}
              <li>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className="footer-bar">
        <div className="container footer-bar-inner">
          <ul className="footer-links">
            {footerQuickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
          <a className="footer-top-link" href="#main">
            Back to top
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="10.5" />
              <path d="M12 16.5v-9M8 11l4-4 4 4" />
            </svg>
          </a>
        </div>
      </div>

      <div className="container footer-legal">
        <p>&copy; {new Date().getFullYear()} Cosmox Industries. All rights reserved.</p>
        <ul className="footer-legal-links">
          {legalLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
        <p>
          Photography courtesy of{" "}
          <a href="https://unsplash.com" target="_blank" rel="noreferrer">
            Unsplash
          </a>
        </p>
      </div>
    </footer>
  );
}
