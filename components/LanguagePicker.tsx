"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { useDismiss } from "@/hooks/useDismiss";
import { defaultLocale, parseLocale, regions, translationTargets } from "@/lib/locales";
import { translatePage } from "@/lib/translate";

const STORAGE_KEY = "cosmox-locale";
const CHANGE_EVENT = "cosmox-locale-change";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

// The choice is kept in local storage (which also syncs open tabs), in the `locale` cookie,
// and in memory for when a browser blocks both, so the picker always responds.
let memoryLocale: string | null = null;

function readCookie() {
  try {
    const match = document.cookie.match(/(?:^|;\s*)locale=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
  } catch {
    return null;
  }
}

function readLocale() {
  let stored: string | null = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch {
    // Storage blocked: fall back to the cookie or memory.
  }
  return stored ?? readCookie() ?? memoryLocale ?? defaultLocale;
}

function saveLocale(value: string) {
  memoryLocale = value;
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Storage blocked: the cookie and memory still record the choice.
  }
  try {
    document.cookie = `locale=${encodeURIComponent(value)}; path=/; max-age=31536000; samesite=lax`;
  } catch {
    // Cookies blocked too: memory keeps the choice for this page view.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

// False while React hydrates the server HTML, true afterwards.
const subscribeNever = () => () => {};
function useHydrated() {
  return useSyncExternalStore(subscribeNever, () => true, () => false);
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
    </svg>
  );
}

type LanguagePickerProps = {
  /** "popover" floats under the header icon; "inline" expands in place (mobile menu). */
  variant?: "popover" | "inline";
};

export default function LanguagePicker({ variant = "popover" }: LanguagePickerProps) {
  const locale = useSyncExternalStore(subscribe, readLocale, () => defaultLocale);
  const hydrated = useHydrated();
  const { region, language } = parseLocale(locale);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const short = language.lang.split("-")[0].toUpperCase();

  // Only the header instance applies the choice; the mobile-menu copy just edits it.
  const applies = variant === "popover";

  useEffect(() => {
    // During hydration `locale` is still the server's default (English), not the visitor's
    // choice. Acting on it would reload translated pages, so wait for the real value.
    if (!applies || !hydrated) return;
    let current = true;
    translatePage(language.translate, translationTargets)
      .then((shown) => {
        // Only label the page with the new language once it is actually showing it.
        if (current && shown) document.documentElement.lang = language.lang;
      })
      .catch(() => {
        // Translation is best effort: if Google's script is blocked the page stays as it is.
      });
    return () => {
      current = false;
    };
  }, [applies, hydrated, language.lang, language.translate]);

  useDismiss(rootRef, open, () => setOpen(false));

  return (
    <div ref={rootRef} className={`lang-picker lang-picker-${variant}`}>
      <button
        type="button"
        className={variant === "popover" ? "header-icon lang-trigger" : "header-icon-link lang-trigger"}
        aria-expanded={open}
        aria-controls={panelId}
        title="Region & language"
        onClick={() => setOpen(!open)}
      >
        <GlobeIcon />
        {variant === "popover" ? (
          <>
            <span className="lang-code notranslate" translate="no" aria-hidden="true">
              {short}
            </span>
            <span className="sr-only">
              Region and language: {region.country}, {language.label}
            </span>
          </>
        ) : (
          <span className="notranslate" translate="no">
            {region.country} · {language.label}
          </span>
        )}
      </button>

      {open && (
        <div className="lang-panel" id={panelId} role="group" aria-label="Choose region and language">
          <p className="lang-title">Region &amp; language</p>
          <ul className="lang-list">
            {regions.map((item) => (
              <li key={item.code} className="lang-row">
                <span className="lang-country">
                  <span className="lang-flag" aria-hidden="true">
                    {item.code}
                  </span>
                  {item.country}
                </span>
                <span className="lang-options">
                  {item.languages.map((option) => {
                    const value = `${item.code}:${option.lang}`;
                    const selected = item.code === region.code && option.lang === language.lang;
                    return (
                      <button
                        key={value}
                        type="button"
                        lang={option.lang}
                        className="notranslate"
                        translate="no"
                        aria-pressed={selected}
                        aria-label={`${item.country}, ${option.label}`}
                        onClick={() => {
                          saveLocale(value);
                          setOpen(false);
                        }}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
