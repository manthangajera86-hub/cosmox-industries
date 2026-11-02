// Machine translation through the Google Translate website widget. The widget's own UI is
// hidden (see globals.css); the site's language picker drives it. Google's script is only
// loaded once a visitor picks a language other than English.

const SOURCE = "en";
const CONTAINER_ID = "google_translate_element";

type GoogleTranslate = {
  translate: {
    TranslateElement: new (options: Record<string, unknown>, containerId: string) => unknown;
  };
};

declare global {
  interface Window {
    google?: GoogleTranslate;
    googleTranslateElementInit?: () => void;
  }
}

let loading: Promise<void> | null = null;

/**
 * Google Translate detaches the text nodes React rendered and puts its own <font> elements in
 * their place, so React throws when it later removes or inserts next to those nodes. Skip only
 * those operations, on nodes that are detached or inside Google's <font> wrappers (the approach
 * from facebook/react#11538, narrowed); any other mismatch still throws, so real bugs stay visible.
 */
function displacedByTranslation(node: Node) {
  return node.parentNode === null || node.parentNode.nodeName === "FONT";
}

function patchDomForTranslation() {
  const proto = Node.prototype as Node & { __translatePatched?: boolean };
  if (proto.__translatePatched) return;
  proto.__translatePatched = true;

  const removeChild = proto.removeChild;
  proto.removeChild = function <T extends Node>(this: Node, child: T): T {
    if (child.parentNode !== this && displacedByTranslation(child)) return child;
    return removeChild.call(this, child) as T;
  };

  const insertBefore = proto.insertBefore;
  proto.insertBefore = function <T extends Node>(this: Node, node: T, reference: Node | null): T {
    if (reference && reference.parentNode !== this && displacedByTranslation(reference)) return node;
    return insertBefore.call(this, node, reference) as T;
  };
}

function loadWidget(languages: string[]) {
  if (loading) return loading;
  patchDomForTranslation();

  loading = new Promise<void>((resolve, reject) => {
    const container = document.createElement("div");
    container.id = CONTAINER_ID;
    container.hidden = true;
    document.body.appendChild(container);

    window.googleTranslateElementInit = () => {
      new window.google!.translate.TranslateElement(
        { pageLanguage: SOURCE, includedLanguages: languages.join(","), autoDisplay: false },
        CONTAINER_ID,
      );
      resolve();
    };

    const script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.onerror = () => {
      loading = null;
      reject(new Error("Google Translate could not be loaded"));
    };
    document.head.appendChild(script);
  });
  return loading;
}

function setGoogleCookie(target: string | null) {
  try {
    writeGoogleCookie(target);
  } catch {
    // Cookies unavailable: the widget's own selection still applies the language.
  }
}

function writeGoogleCookie(target: string | null) {
  const hosts = ["", `; domain=${location.hostname}`, `; domain=.${location.hostname}`];
  for (const host of hosts) {
    document.cookie = target
      ? `googtrans=/${SOURCE}/${target}; path=/${host}`
      : `googtrans=; path=/; max-age=0${host}`;
  }
  if (target) return;
  // Google's script may also set the cookie on a parent domain (".example.com" for
  // "www.example.com"), so clear it there too.
  const labels = location.hostname.split(".");
  for (let i = 1; i < labels.length - 1; i++) {
    document.cookie = `googtrans=; path=/; max-age=0; domain=.${labels.slice(i).join(".")}`;
  }
}

// Set just before the reload that returns the page to English. If the cookie is still there
// after that reload it could not be deleted, and reloading again would loop forever.
const RELOAD_FLAG = "cosmox-untranslate-reload";

function reloadFlag(action: "read" | "set" | "clear") {
  try {
    if (action === "read") return sessionStorage.getItem(RELOAD_FLAG) === "1";
    if (action === "set") sessionStorage.setItem(RELOAD_FLAG, "1");
    else sessionStorage.removeItem(RELOAD_FLAG);
    return true;
  } catch {
    return false;
  }
}

function currentGoogleTarget() {
  try {
    const match = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]+\/([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
  } catch {
    // Cookies unavailable (e.g. a sandboxed frame).
    return null;
  }
}

/**
 * The widget renders a hidden <select>; changing it is how a language is applied. Stops early,
 * without touching the widget, once a newer language choice has been made.
 */
async function selectInWidget(target: string, isCurrent: () => boolean) {
  for (let attempt = 0; attempt < 50; attempt++) {
    if (!isCurrent()) return false;
    const combo = document.querySelector<HTMLSelectElement>("select.goog-te-combo");
    if (combo && combo.options.length > 1) {
      combo.value = target;
      combo.dispatchEvent(new Event("change"));
      return true;
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  return false;
}

/** Google marks the page while it shows a translation, whatever the cookie says. */
function pageIsTranslated() {
  const classes = document.documentElement.classList;
  return classes.contains("translated-ltr") || classes.contains("translated-rtl");
}

// Each call gets a number; only the latest may apply its language, so quick successive
// choices can't finish out of order.
let latestRequest = 0;

/**
 * Translate the page into `target` (a Google language code such as "hi" or "zh-CN"), or back
 * to the original English. Resolves to whether the page now shows `target`: false when the
 * page is reloading, a newer choice took over, or the widget never became ready.
 */
export async function translatePage(target: string, languages: string[]) {
  const request = ++latestRequest;
  const isCurrent = () => request === latestRequest;

  if (target === SOURCE) {
    // Check the page too: another tab may already have deleted the shared cookie while this
    // page still shows its translation.
    if (!currentGoogleTarget() && !pageIsTranslated()) {
      reloadFlag("clear");
      return true;
    }
    setGoogleCookie(null);
    // Already reloaded once and the cookie survived: stop instead of reloading forever.
    if (reloadFlag("read")) {
      reloadFlag("clear");
      return false;
    }
    // Google cannot reliably undo a translation in place, so reload the original page, but
    // only when the guard above can be recorded.
    if (reloadFlag("set")) location.reload();
    return false;
  }
  reloadFlag("clear");
  setGoogleCookie(target);
  await loadWidget(languages);
  if (!isCurrent()) return false;
  return selectInWidget(target, isCurrent);
}
