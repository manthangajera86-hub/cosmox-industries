/** `translate` is the Google Translate language code used to machine-translate the page. */
export type Language = { lang: string; label: string; translate: string };
export type Region = { code: string; country: string; languages: Language[] };

export const regions: Region[] = [
  { code: "GL", country: "Global", languages: [{ lang: "en", label: "English", translate: "en" }] },
  {
    code: "IN",
    country: "India",
    languages: [
      { lang: "en-IN", label: "English", translate: "en" },
      { lang: "hi-IN", label: "हिन्दी", translate: "hi" },
    ],
  },
  {
    code: "AE",
    country: "United Arab Emirates",
    languages: [
      { lang: "en-AE", label: "English", translate: "en" },
      { lang: "ar-AE", label: "العربية", translate: "ar" },
    ],
  },
  { code: "US", country: "United States", languages: [{ lang: "en-US", label: "English", translate: "en" }] },
  { code: "GB", country: "United Kingdom", languages: [{ lang: "en-GB", label: "English", translate: "en" }] },
  { code: "DE", country: "Germany", languages: [{ lang: "de-DE", label: "Deutsch", translate: "de" }] },
  { code: "FR", country: "France", languages: [{ lang: "fr-FR", label: "Français", translate: "fr" }] },
  { code: "ES", country: "Spain", languages: [{ lang: "es-ES", label: "Español", translate: "es" }] },
  { code: "BR", country: "Brazil", languages: [{ lang: "pt-BR", label: "Português", translate: "pt" }] },
  { code: "JP", country: "Japan", languages: [{ lang: "ja-JP", label: "日本語", translate: "ja" }] },
  { code: "CN", country: "China", languages: [{ lang: "zh-CN", label: "简体中文", translate: "zh-CN" }] },
];

/** Languages the page can be machine-translated into, besides the English original. */
export const translationTargets = [
  ...new Set(regions.flatMap((region) => region.languages.map((language) => language.translate))),
].filter((code) => code !== "en");

/** A choice is stored as "<region code>:<lang>", e.g. "IN:hi-IN". */
export const defaultLocale = "GL:en";

export function parseLocale(value: string | null) {
  const [code, lang] = (value ?? defaultLocale).split(":");
  const region = regions.find((item) => item.code === code);
  const language = region?.languages.find((item) => item.lang === lang);
  if (!region || !language) return { region: regions[0], language: regions[0].languages[0] };
  return { region, language };
}
