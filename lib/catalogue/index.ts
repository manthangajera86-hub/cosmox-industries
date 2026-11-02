import { aerospaceDefence } from "@/lib/catalogue/aerospace-defence";
import { automotiveAutoparts } from "@/lib/catalogue/automotive-autoparts";
import { constructionMaterials } from "@/lib/catalogue/construction-materials";
import { energy } from "@/lib/catalogue/energy";
import { fashionTextile } from "@/lib/catalogue/fashion-textile";
import { foodBeverage } from "@/lib/catalogue/food-beverage";
import { jewellery } from "@/lib/catalogue/jewellery";
import { machinery } from "@/lib/catalogue/machinery";
import { metalMining } from "@/lib/catalogue/metal-mining";
import { packaging } from "@/lib/catalogue/packaging";
import { pharmaceuticals } from "@/lib/catalogue/pharmaceuticals";
import { semiconductorElectronics } from "@/lib/catalogue/semiconductor-electronics";
import { divisions, type Division } from "@/lib/divisions";
import type { Photo } from "@/lib/photos";

/** One product category of a division, shown on its own page. */
export type ProductCategory = {
  /** URL segment under the division's product pages. */
  slug: string;
  name: string;
  /** Shorter name, used on cards. */
  shortName: string;
  /** One line, used on cards. */
  summary: string;
  /** Introduction on the category's page. */
  lead: string;
  photo: Photo;
  /** Product families the category covers. */
  families: string[];
  /** Products listed on the category's page, in order. */
  products: string[];
};

/** A detail a quotation confirms for a product, shown on every product page of a division. */
export type ProductField = { label: string; text: string };

/** The product pages of one business division: a landing page, one page per category and one per product. */
export type DivisionCatalogue = {
  /** `id` of the division in lib/divisions.ts. */
  divisionId: string;
  /** URL segment under /business-divisions. */
  slug: string;
  /** Headline and lead of the landing page. */
  title: string;
  lead: string;
  /** The industries and customers the division serves, as a sentence. */
  serves?: string;
  /** File name in `assets/photos/`, for sharing cards. */
  cardPhoto: string;
  /**
   * What each quotation confirms for a product of this division, in order. Product pages list
   * these instead of figures, which are published only once verified for a product and supplier.
   */
  productFields: ProductField[];
  categories: ProductCategory[];
};

export type Catalogue = DivisionCatalogue & {
  division: Division;
  /** Address of the landing page. */
  path: string;
};

/** Divisions with product pages, in the order of lib/divisions.ts. Add a division by adding its file here. */
export const catalogues: Catalogue[] = [
  pharmaceuticals,
  foodBeverage,
  energy,
  semiconductorElectronics,
  automotiveAutoparts,
  machinery,
  metalMining,
  fashionTextile,
  packaging,
  constructionMaterials,
  aerospaceDefence,
  jewellery,
].map((catalogue) => {
  const division = divisions.find((item) => item.id === catalogue.divisionId);
  const path = `/business-divisions/${catalogue.slug}`;
  // Links across the site use the division's `href`, so it has to be this landing page.
  if (division?.href !== path) {
    throw new Error(`lib/divisions.ts: the division "${catalogue.divisionId}" needs href "${path}".`);
  }
  return { ...catalogue, division, path };
});

export const findCatalogue = (slug: string) => catalogues.find((catalogue) => catalogue.slug === slug);

export const findCategory = (catalogue: Catalogue, slug: string) =>
  catalogue.categories.find((category) => category.slug === slug);

export const categoryPath = (catalogue: Catalogue, category: ProductCategory) => `${catalogue.path}/${category.slug}`;

/**
 * URL segment of a product's page, also the anchor of its row on the category page,
 * e.g. "PET/PE Laminate" → "pet-pe-laminate".
 */
export const productSlug = (name: string) =>
  name
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const findProduct = (category: ProductCategory, slug: string) =>
  category.products.find((product) => productSlug(product) === slug);

export const productPath = (catalogue: Catalogue, category: ProductCategory, product: string) =>
  `${categoryPath(catalogue, category)}/${productSlug(product)}`;

/** A product category's photo, for reuse elsewhere on the site. Throws if the address is wrong. */
export function categoryPhoto(divisionSlug: string, categorySlug: string) {
  const catalogue = findCatalogue(divisionSlug);
  const category = catalogue && findCategory(catalogue, categorySlug);
  if (!category) throw new Error(`No product category ${divisionSlug}/${categorySlug}.`);
  return category.photo;
}
