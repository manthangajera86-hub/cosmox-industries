# Cosmox Industries website

Corporate website for Cosmox Industries, built with Next.js 16 (App Router) and TypeScript. Every page is statically prerendered.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
npm run lint
```

## Project structure

| Path | What it holds |
| --- | --- |
| `app/<page>/page.tsx` | One file per page with its content (the home page is `app/page.tsx`) |
| `app/layout.tsx` | Shared layout: fonts, header, footer and site-wide metadata |
| `app/globals.css` | Design system: colours, typography and all component styles |
| `components/` | Building blocks used by the pages (see below) |
| `lib/navigation.ts` | Header dropdown menus and footer links |
| `lib/catalogue/` | Product pages: one file per division with its categories, product families, products and quotation fields (see Product pages) |
| `lib/photos.ts` | Photo registry: every image with its alt text |
| `assets/photos/` | Photo files and `CREDITS.md` |
| `assets/brand/` | Logo artwork and the logo files built from it (see Logo) |

## Page building blocks

Every page follows the home page's pattern: a photo header, then a sequence of the sections below, ending with a full-width photo banner. Most sections take an optional `id` so the header menu and links from other pages can jump to them.

- `HomeHero` — the home page's pinned full-screen header with rotating feature cards
- `Hero` — photo header for the other pages, with title, lead paragraph and buttons (`compact` sets a smaller headline for long titles)
- `Statement` — large headline, then a label, lead paragraph, supporting text and optional photo
- `SplitFeature` — label, headline and lead beside a large photo (`reverse` puts the photo on the left)
- `FeatureBanner` — full-width photo with a headline, short text and one call to action
- `NumberedGrid` — headline and lead, then numbered items in 3 or 4 columns; `tone="alt" | "dark"` sets the background. Items can carry an `id` or an `href` (the whole item becomes a link), and children (such as a `tag-row` list) go under the grid
- `CapabilityList` — dark section with a pinned headline and photo beside linked rows; the photo follows the hovered or focused row
- `InfoTabs` — headline, then a photo card with pill tabs, each with its own text and link
- `BusinessShowcase`, `DivisionTabs`, `ExploreDivisions` — home-page showcases of the twelve divisions (`lib/divisions.ts`)
- `DivisionProfileSection` — one business division in full (pinned name and photo, overview, focus areas, applications, capabilities); content lives in `lib/division-profiles.ts`
- `ProductList` — one product category: its product families as tags, then numbered products, each linking to its own page
- `ProductSheet` — one product's details: pinned headline beside its catalogue facts and the details each quotation confirms
- `Breadcrumbs` — trail of links under the photo header of the product pages (also given to search engines)
- `NewsList` — dated announcements with category filters; add items to `lib/news.ts` (it shows an empty-state message until then)
- `Faq` — headline beside questions that expand to show their answers
- `PageBanner` — dark title band for pages without a photo header (legal pages, 404)
- `LegalDocument` — policy page layout: title band, contents list and numbered sections
- `InquiryForm` — the contact form (see below)
- `SiteSearch` — the header search panel (see below)
- `ButtonLink` — primary or ghost button, used in the photo headers

## Product pages

Divisions listed in `lib/catalogue/index.ts` have product pages under `/business-divisions/<division>`: a landing page with the division's product categories, one page per category with its product families and products, and one page per product at `/business-divisions/<division>/<category>/<product>`. Everything on them is read from the division's file in `lib/catalogue/`.

- To change a product, family or description, edit that file. Pages, the sitemap, sharing cards and search follow automatically.
- To give another division product pages, add a file like the existing ones, add it to the list in `lib/catalogue/index.ts`, and set that division's `href` in `lib/divisions.ts` to `/business-divisions/<slug>` (the build stops with a message if they differ). The header menu and home page then link to the product pages instead of the division's section on `/business-divisions`.
- A product's page carries the quote form with the inquiry type, division and product filled in; the other quote links open the contact form the same way (`quoteRequestHref` in `lib/inquiry.ts`).
- A product's address comes from its name (`productSlug`), so renaming a product changes its address.
- Product pages list what each quotation confirms (`productFields`, one list per division) instead of figures. Add specifications, certifications, origin or stock claims only once they are verified for that product.

## Site search

The search icon in the header opens instant search across products, services, divisions and pages. Its index is `lib/search-index.ts`, which downloads only when someone opens search:

- Products are every category, product family and product in `lib/catalogue/`, plus each division's "areas of focus" from `lib/division-profiles.ts`, so new products appear automatically. A product's result opens its category page at that product.
- Services and pages are listed by hand in the same file. When you add a page or section, add an entry whose `href` points at a real page or section id.
- `ABBREVIATIONS` maps short forms buyers type (e.g. "API") to the product they mean.

## Language picker

The globe menu in the header machine-translates the page with Google Translate. Google's script is only loaded once a visitor picks a language other than English; regions and languages are listed in `lib/locales.ts`. The cookies it uses are documented on `/cookie-policy`, so update that page if you add tracking or other storage.

## Legal pages

`/privacy-policy`, `/terms-of-use` and `/cookie-policy` describe what the site actually does today (contact form, language preference, Google Translate, no analytics). Have them reviewed by your legal adviser before launch, and keep them in step with the site.

## Search engines and sharing

- Each page sets its title, description, canonical URL and sharing details with `pageMetadata()` from `lib/site.ts`.
- Sharing cards (1200×630 JPEG) are generated at build time by `opengraph-image.tsx` in each page folder, using `lib/og.tsx`, the page's photo and the Barlow font in `assets/fonts/` (SIL Open Font License).
- `app/sitemap.ts` lists the pages in `sitePages` (`lib/site.ts`); add new pages there. Product pages are added from `lib/catalogue/` automatically. `app/robots.ts` points search engines to it.
- The layout adds Organization structured data. Keep it to facts that are true.

## Deploying

Set these environment variables in your hosting provider (for Vercel: Project → Settings → Environment Variables):

| Variable | Needed for |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Your public domain, e.g. `https://www.example.com` (`www.example.com` also works), used in canonical links, the sitemap and sharing previews. On Vercel it falls back to the production domain; elsewhere the build warns and uses `http://localhost:3000`. An invalid value stops the build with an explanation. |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Optional. Replaces the built-in Web3Forms key so inquiries go to another inbox (see below). |

## Contact form

The inquiry form (on `/contact`, `/business-divisions` and each division page) is sent through [Web3Forms](https://web3forms.com), which emails each inquiry to the inbox its access key belongs to.

The access key is set in `lib/send-inquiry.ts`, so the form works on any host with no setup. To send inquiries to a different inbox (for example from a test deployment), create a key at https://web3forms.com for that inbox and set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=the-key` in `.env.local` or your hosting provider's environment variables. It is read at build time, so rebuild or redeploy after changing it.

The key is meant to be public; it only lets people send email to that one inbox. The form is checked in the browser (`validateInquiry` in `lib/inquiry.ts`) and sent from the browser (`lib/send-inquiry.ts`), because Web3Forms' free plan refuses submissions sent from a server. Note that inquiries sent while testing locally are real and arrive in the inbox too.

Each email's subject names the inquiry type, division and sender, and replying answers the sender directly. When a hidden field that people never see was filled in (usually a bot), the subject starts with "[Possible spam]"; the inquiry is still delivered in case a browser's autofill filled the field for a real visitor. Delivery gives up after 15 seconds and asks the visitor to try again or email instead.

## Logo

The logo artwork is `assets/brand/logo-original.jpeg` (the logo on black). `node scripts/build-logo.mjs` builds every logo file from it:

| File | Used for |
| --- | --- |
| `assets/brand/logo-horizontal-light.png` | Header on light backgrounds (scrolled header, home page, open menus) and the footer. The wordmark is a deeper gold so it reads on white. |
| `assets/brand/logo-horizontal-dark.png` | Header while it is clear over a dark page hero. Original colours. |
| `assets/brand/logo-light.png`, `logo-dark.png` | The full stacked logo for light and dark backgrounds, for use outside the site |
| `assets/brand/logo-mark.png` | The mark alone, on the sharing cards |
| `app/icon.png`, `app/apple-icon.png` | Favicon and phone home-screen icon |

To change the logo, replace `logo-original.jpeg` with new artwork on a black background and run the script again. `components/Logo.tsx` picks the light or dark version.

## Photos

The photos are stock images from [Unsplash](https://unsplash.com), free to use under the Unsplash License. Credits are listed in `assets/photos/CREDITS.md`.

To use your own photography, replace a file in `assets/photos/` (keeping its name), or add a new import to `lib/photos.ts`, and update the `alt` text. If the subject of a photo is off-centre, set `position` (for example `"70% center"`) so it stays in frame when cropped.
