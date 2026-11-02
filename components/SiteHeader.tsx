"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useRef, useState, useSyncExternalStore, type KeyboardEvent, type PointerEvent } from "react";
import LanguagePicker from "@/components/LanguagePicker";
import Logo from "@/components/Logo";
import SiteSearch, { SearchIcon } from "@/components/SiteSearch";
import { CircleArrowIcon } from "@/components/icons";
import { useDismiss } from "@/hooks/useDismiss";
import { heroVideoPlaying, subscribeToHeroVideo } from "@/lib/hero-video";
import { contactLink, megaMenu, partnerLink, type MegaGroup } from "@/lib/navigation";

type MenuState = { path: string; mobile: boolean; group: string | null };

/** `group` value while the search panel is open (it shares the slot with the mega menus). */
const SEARCH = "search";

/** How long the pointer rests on a menu label before its panel opens, so crossing the bar opens nothing. */
const HOVER_OPEN_MS = 120;
/** Grace period after the pointer leaves the header before a panel it opened closes. */
const HOVER_CLOSE_MS = 250;

const panelId = (group: MegaGroup) => `mega-${group.label.toLowerCase().replace(/[^a-z]+/g, "-")}`;

/** Where a long label breaks onto a second line in the bar: after its "&", otherwise at its first space. */
function splitLabel(label: string) {
  const at = label.includes(" & ") ? label.indexOf(" & ") + 2 : label.indexOf(" ");
  return at < 0 ? [label] : [label.slice(0, at), label.slice(at + 1)];
}

/** Label that rolls up to a copy of itself on hover. */
function RollText({ children }: { children: string }) {
  const [first, second] = splitLabel(children);
  const text = second ? (
    <>
      {first}
      <br className="nav-br" /> {second}
    </>
  ) : (
    first
  );
  return (
    <span className="roll">
      <span>{text}</span>
      <span aria-hidden="true">{text}</span>
    </span>
  );
}

function Arrow() {
  return (
    <svg className="mega-arrow" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2 1.5 10.5 6 2 10.5 4 6Z" />
    </svg>
  );
}

function PartnerIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="9" cy="8.5" r="3" />
      <circle cx="16.5" cy="9.5" r="2.5" />
      <path d="M3.5 19c.6-3 2.8-5 5.5-5s4.9 2 5.5 5M14.5 14.3c.6-.2 1.3-.3 2-.3 2.2 0 4 1.6 4.5 4" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </svg>
  );
}

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

export default function SiteHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  // Each menu item is a link to its overview page and a "+" button that opens its panel.
  const labelRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  // The search button that opened the panel, so Escape can hand focus back to it.
  const searchTriggerRef = useRef<HTMLButtonElement | null>(null);
  const scrolled = useSyncExternalStore(subscribeToScroll, () => window.scrollY > 12, () => false);
  const overVideo = useSyncExternalStore(subscribeToHeroVideo, heroVideoPlaying, () => false);
  const [menu, setMenu] = useState<MenuState>({ path: pathname, mobile: false, group: null });
  // Menus belong to the page they were opened on, so navigating closes them.
  const { mobile, group } = menu.path === pathname ? menu : { mobile: false, group: null };
  const anyOpen = mobile || group !== null;
  const openGroup = megaMenu.find((item) => item.label === group);

  // The pending hover open or close, and whether the pointer opened the current panel: only then
  // does moving the pointer away close it. One opened by click or keyboard stays until dismissed.
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const hoverOpened = useRef(false);
  const cancelHover = () => clearTimeout(hoverTimer.current);

  const close = () => {
    cancelHover();
    hoverOpened.current = false;
    setMenu({ path: pathname, mobile: false, group: null });
  };
  const searchOpen = group === SEARCH;
  const toggleSearch = (trigger: HTMLButtonElement) => {
    cancelHover();
    hoverOpened.current = false;
    searchTriggerRef.current = trigger;
    setMenu({ path: pathname, mobile: false, group: searchOpen ? null : SEARCH });
  };
  const setGroup = (label: string | null) => setMenu({ path: pathname, mobile, group: label });

  const onTriggerClick = (label: string) => {
    cancelHover();
    // Clicking a panel the pointer has just opened keeps it open rather than closing it.
    const keep = group === label && hoverOpened.current;
    hoverOpened.current = false;
    if (!keep) setGroup(group === label ? null : label);
  };

  // Hover is for the mouse only: a touch or pen press opens the panel with its click.
  const onTriggerEnter = (event: PointerEvent, label: string) => {
    if (event.pointerType !== "mouse" || searchOpen) return;
    cancelHover();
    if (group === label) return;
    hoverTimer.current = setTimeout(() => {
      hoverOpened.current = true;
      setMenu({ path: pathname, mobile: false, group: label });
    }, HOVER_OPEN_MS);
  };

  const onShellLeave = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    cancelHover();
    if (openGroup && hoverOpened.current) hoverTimer.current = setTimeout(close, HOVER_CLOSE_MS);
  };

  useDismiss(headerRef, anyOpen, close);

  // The open panel sits after the whole bar in the DOM, so keep keyboard focus moving between a
  // "+" button and its panel: Tab from an open one enters the panel, Shift+Tab from the first link
  // returns to the button, and Tab past the last link closes it and moves to the next menu label.
  const panelLinks = () => [...(panelRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? [])];

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>, label: string) => {
    if (event.key !== "Tab" || event.shiftKey || group !== label) return;
    const first = panelLinks()[0];
    if (!first) return;
    event.preventDefault();
    first.focus();
  };

  const onPanelKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !openGroup) return;
    const links = panelLinks();
    const index = megaMenu.indexOf(openGroup);
    if (event.shiftKey && document.activeElement === links[0]) {
      event.preventDefault();
      triggerRefs.current[index]?.focus();
    } else if (!event.shiftKey && document.activeElement === links[links.length - 1]) {
      const next = labelRefs.current[index + 1] ?? headerRef.current?.querySelector<HTMLElement>(".header-actions button, .header-actions a");
      if (!next) return;
      event.preventDefault();
      setGroup(null);
      next.focus();
    }
  };

  const headerClass = [
    "site-header",
    // Transparent at the top of the page until it scrolls or a menu opens.
    !scrolled && !anyOpen && "is-clear",
    // The home hero is light, so the clear header keeps dark text there, until its video plays.
    pathname === "/" && !overVideo && "is-light",
    scrolled && "is-scrolled",
    anyOpen && "is-open",
    openGroup && !mobile && "is-mega",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header ref={headerRef} className={headerClass}>
      <div className="header-shell" onPointerEnter={cancelHover} onPointerLeave={onShellLeave}>
        <div className="header-bar">
          <Link className="brand" href="/" onClick={close} aria-label="Cosmox Industries home">
            <Logo eager />
          </Link>

          <nav className="site-nav" aria-label="Main">
            <ul className="nav-list">
              {megaMenu.map((item, index) => {
                const open = group === item.label;
                const active = [item.overview, ...item.links].some((link) => link.href === pathname);
                return (
                  <li
                    key={item.label}
                    className="nav-item"
                    onPointerEnter={(event) => onTriggerEnter(event, item.label)}
                    onPointerLeave={cancelHover}
                  >
                    <Link
                      ref={(node) => {
                        labelRefs.current[index] = node;
                      }}
                      className={active ? "nav-trigger is-active" : "nav-trigger"}
                      href={item.overview.href}
                      aria-current={item.overview.href === pathname ? "page" : undefined}
                      onClick={close}
                    >
                      <RollText>{item.label}</RollText>
                    </Link>
                    <button
                      type="button"
                      ref={(node) => {
                        triggerRefs.current[index] = node;
                      }}
                      className="nav-expand"
                      aria-expanded={open}
                      aria-controls={panelId(item)}
                      aria-label={`${item.label} menu`}
                      onClick={() => onTriggerClick(item.label)}
                      onKeyDown={(event) => onTriggerKeyDown(event, item.label)}
                    >
                      <span className="nav-plus" aria-hidden="true" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="header-icon"
              aria-expanded={searchOpen}
              aria-controls="site-search"
              title="Search"
              onClick={(event) => toggleSearch(event.currentTarget)}
            >
              <SearchIcon />
              <span className="sr-only">Search</span>
            </button>
            <LanguagePicker />
            <Link className="header-icon" href={partnerLink.href} onClick={close} title={partnerLink.label}>
              <PartnerIcon />
              <span className="sr-only">{partnerLink.label}</span>
            </Link>
            <Link className="header-icon" href={contactLink.href} onClick={close} title={contactLink.label}>
              <MailIcon />
              <span className="sr-only">{contactLink.label}</span>
            </Link>
          </div>

          <button
            type="button"
            className="header-icon search-toggle-mobile"
            aria-expanded={searchOpen}
            aria-controls="site-search"
            title="Search"
            onClick={(event) => toggleSearch(event.currentTarget)}
          >
            <SearchIcon />
            <span className="sr-only">Search</span>
          </button>

          <button
            type="button"
            className="nav-toggle"
            aria-controls="mobile-menu"
            aria-expanded={mobile}
            aria-label={mobile ? "Close menu" : "Open menu"}
            onClick={() => setMenu({ path: pathname, mobile: !mobile, group: null })}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Desktop mega menu: one panel for the open group, attached under the bar. */}
        {openGroup && !mobile && (
          <div className="mega" id={panelId(openGroup)} ref={panelRef} onKeyDown={onPanelKeyDown}>
            {/* The panel stays put between menus; only its contents are swapped and fade in. */}
            <Fragment key={openGroup.label}>
              <div className="mega-aside">
                <Link className="mega-title" href={openGroup.overview.href} onClick={close}>
                  {openGroup.label}
                  <CircleArrowIcon className="mega-circle" />
                </Link>
                {openGroup.overview.description && <p>{openGroup.overview.description}</p>}
              </div>
              <div className="mega-main">
                <ul className="mega-links">
                  {openGroup.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} onClick={close} aria-current={link.href === pathname ? "page" : undefined}>
                        {link.label}
                        <Arrow />
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="mega-features">
                  {openGroup.featured.map((feature) => (
                    <li key={feature.href}>
                      <Link href={feature.href} onClick={close}>
                        <span className="mega-feature-media">
                          <Image src={feature.photo.src} alt="" fill placeholder="blur" sizes="260px" />
                          <CircleArrowIcon className="mega-circle" />
                        </span>
                        <span className="mega-feature-label">{feature.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Fragment>
          </div>
        )}

        {/* Search: shares the space under the bar with the mega menus, at every width. */}
        {searchOpen && (
          <div
            className="search-panel"
            id="site-search"
            onKeyDown={(event) => {
              if (event.key === "Escape") searchTriggerRef.current?.focus();
            }}
          >
            <div className="search-panel-inner">
              <SiteSearch onNavigate={close} autoFocus />
            </div>
          </div>
        )}

        {/* Mobile menu: the same groups as an accordion. */}
        {mobile && (
          <div className="mobile-menu" id="mobile-menu">
            <ul className="mobile-groups">
              {megaMenu.map((item) => {
                const open = group === item.label;
                return (
                  <li key={item.label}>
                    <div className="mobile-row">
                      <Link
                        href={item.overview.href}
                        onClick={close}
                        aria-current={item.overview.href === pathname ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        className="mobile-trigger"
                        aria-expanded={open}
                        aria-controls={`${panelId(item)}-mobile`}
                        aria-label={`${item.label} menu`}
                        onClick={() => setGroup(open ? null : item.label)}
                      >
                        <span className="nav-plus" aria-hidden="true" />
                      </button>
                    </div>
                    {open && (
                      <ul className="mobile-links" id={`${panelId(item)}-mobile`}>
                        {item.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={close}
                              aria-current={link.href === pathname ? "page" : undefined}
                            >
                              {link.label}
                              <Arrow />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="mobile-actions">
              <LanguagePicker variant="inline" />
              <Link className="header-icon-link" href={partnerLink.href} onClick={close}>
                <PartnerIcon />
                {partnerLink.label}
              </Link>
              <Link className="header-icon-link" href={contactLink.href} onClick={close}>
                <MailIcon />
                {contactLink.label}
              </Link>
            </div>
          </div>
        )}
      </div>

      {anyOpen && <div className="header-scrim" aria-hidden="true" onClick={close} />}
    </header>
  );
}
