import { photos, type Photo } from "@/lib/photos";

export type Division = {
  number: string;
  name: string;
  /** Anchor of the division's section on the Business Divisions page. */
  id: string;
  /** One line, used on cards. */
  summary: string;
  /** A little more detail, used where there is room. */
  detail: string;
  /** Where links to the division go: its product pages (lib/catalogue) if it has them, otherwise its section. */
  href: string;
  photo: Photo;
};

/** The twelve business divisions, in the order used across the site. */
export const divisions: Division[] = [
  {
    number: "01",
    name: "Pharmaceuticals",
    id: "pharmaceuticals",
    summary: "Building capabilities across pharmaceutical products, ingredients, intermediates, specialty materials, manufacturing and supporting technologies.",
    detail: "Our pharmaceutical activities are focused on serving the needs of pharmaceutical manufacturers, healthcare-related industries and specialized industrial customers.",
    href: "/business-divisions/pharmaceuticals",
    photo: photos.pharma,
  },
  {
    number: "02",
    name: "Food & Beverage",
    id: "food-and-beverage",
    summary: "Developing products, ingredients, materials and technologies supporting modern food and beverage production.",
    detail: "Our activities can span ingredients, processing inputs, functional materials, packaging-related solutions and industrial technologies.",
    href: "/business-divisions/food-beverage",
    photo: photos.food,
  },
  {
    number: "03",
    name: "Energy",
    id: "energy",
    summary: "Building capabilities around the transformation of the global energy system.",
    detail: "Our focus includes materials, technologies, components and industrial solutions supporting energy generation, storage, electrification and energy efficiency.",
    href: "/business-divisions/energy",
    photo: photos.energy,
  },
  {
    number: "04",
    name: "Semiconductor & Electronics",
    id: "semiconductor-and-electronics",
    summary: "Supporting the technologies behind modern electronics.",
    detail: "Our capabilities can include advanced materials, electronic chemicals, manufacturing inputs, components and technologies supporting semiconductor and electronics applications.",
    href: "/business-divisions/semiconductor-electronics",
    photo: photos.semiconductor,
  },
  {
    number: "05",
    name: "Automotive & Autoparts",
    id: "automotive-and-autoparts",
    summary: "Supporting the transformation of mobility and automotive manufacturing.",
    detail: "Our activities include materials, components, specialty products, manufacturing capabilities and technologies supporting conventional and next-generation automotive applications.",
    href: "/business-divisions/automotive-autoparts",
    photo: photos.automotive,
  },
  {
    number: "06",
    name: "Machinery",
    id: "machinery",
    summary: "Developing and connecting capabilities across industrial equipment, components, automation and engineering.",
    detail: "Our machinery platform is focused on improving industrial productivity, reliability and manufacturing performance.",
    href: "/business-divisions/machinery",
    photo: photos.machinery,
  },
  {
    number: "07",
    name: "Metal & Mining",
    id: "metal-and-mining",
    summary: "Supporting the industries responsible for producing and processing critical materials.",
    detail: "Our capabilities span materials, industrial inputs, technologies, equipment and solutions connected to metal and mining value chains.",
    href: "/business-divisions/metal-mining",
    photo: photos.metal,
  },
  {
    number: "08",
    name: "Fashion & Textile",
    id: "fashion-and-textile",
    summary: "Serving the evolving textile and fashion ecosystem through materials, chemicals, technologies, components and manufacturing capabilities.",
    detail: "We focus on opportunities created by advanced materials, functional textiles, sustainable production and modern manufacturing.",
    href: "/business-divisions/fashion-textile",
    photo: photos.textile,
  },
  {
    number: "09",
    name: "Packaging",
    id: "packaging",
    summary: "Developing materials, products and technologies supporting modern packaging requirements.",
    detail: "Our focus includes performance, protection, efficiency, sustainability and evolving packaging technologies.",
    href: "/business-divisions/packaging",
    photo: photos.packaging,
  },
  {
    number: "10",
    name: "Construction Materials",
    id: "construction-materials",
    summary: "Supporting construction and infrastructure through advanced materials, additives, chemicals, technologies and industrial products.",
    detail: "We focus on materials and technologies that can improve performance, durability, efficiency and productivity.",
    href: "/business-divisions/construction-materials",
    photo: photos.construction,
  },
  {
    number: "11",
    name: "Aerospace & Defence",
    id: "aerospace-and-defence",
    summary: "Developing specialized industrial capabilities for high-performance aerospace and defence applications, subject to applicable laws, regulations and authorization requirements.",
    detail: "Our focus includes advanced materials, precision manufacturing, engineering capabilities and specialized industrial technologies.",
    href: "/business-divisions/aerospace-defence",
    photo: photos.aerospace,
  },
  {
    number: "12",
    name: "Jewellery",
    id: "jewellery",
    summary: "Building capabilities serving the jewellery value chain through materials, precision manufacturing, specialized technologies and industrial solutions.",
    detail: "Our activities can span manufacturing inputs, processing technologies, finishing solutions and specialized production capabilities.",
    href: "/business-divisions/jewellery",
    photo: photos.jewellery,
  },
];
