import type { StaticImageData } from "next/image";
import aerospace from "@/assets/photos/aerospace.jpg";
import automotive from "@/assets/photos/automotive.jpg";
import construction from "@/assets/photos/construction.jpg";
import digital from "@/assets/photos/digital.jpg";
import energy from "@/assets/photos/energy.jpg";
import food from "@/assets/photos/food.jpg";
import global from "@/assets/photos/global.jpg";
import heroAbout from "@/assets/photos/hero-about.jpg";
import heroCommerce from "@/assets/photos/hero-commerce.jpg";
import heroContact from "@/assets/photos/hero-contact.jpg";
import heroDivisions from "@/assets/photos/hero-divisions.jpg";
import heroHome from "@/assets/photos/hero-home.jpg";
import heroInnovation from "@/assets/photos/hero-innovation.jpg";
import heroManufacturing from "@/assets/photos/hero-manufacturing.jpg";
import heroNews from "@/assets/photos/hero-news.jpg";
import heroPartnerships from "@/assets/photos/hero-partnerships.jpg";
import heroSuppliers from "@/assets/photos/hero-suppliers.jpg";
import heroSustainability from "@/assets/photos/hero-sustainability.jpg";
import jewellery from "@/assets/photos/jewellery.jpg";
import machinery from "@/assets/photos/machinery.jpg";
import metal from "@/assets/photos/metal.jpg";
import packaging from "@/assets/photos/packaging.jpg";
import people from "@/assets/photos/people.jpg";
import pharma from "@/assets/photos/pharma.jpg";
import quality from "@/assets/photos/quality.jpg";
import semiconductor from "@/assets/photos/semiconductor.jpg";
import textile from "@/assets/photos/textile.jpg";

export type Photo = {
  src: StaticImageData;
  alt: string;
  /** CSS object-position, for photos whose subject is off-centre. */
  position?: string;
};

// Stock photography from Unsplash — see assets/photos/CREDITS.md. Swap in company photos as they become available.
export const photos = {
  heroHome: { src: heroHome, alt: "Industrial processing plant illuminated at night" },
  heroAbout: { src: heroAbout, alt: "Machinist in a blue hard hat operating a lathe" },
  heroDivisions: { src: heroDivisions, alt: "Aerial view of an industrial facility with pipework and rooftop equipment" },
  heroCommerce: { src: heroCommerce, alt: "Aerial view of a container ship docked at a port terminal" },
  heroInnovation: { src: heroInnovation, alt: "Researcher's gloved hands drawing liquid from a vial in a laboratory" },
  heroManufacturing: { src: heroManufacturing, alt: "Robotic arms working along an automated production line" },
  heroSuppliers: { src: heroSuppliers, alt: "Warehouse racks stacked with boxed goods" },
  heroPartnerships: { src: heroPartnerships, alt: "Two business partners shaking hands" },
  heroSustainability: { src: heroSustainability, alt: "Offshore wind turbines rising from the sea" },
  heroNews: { src: heroNews, alt: "City skyline lit up at night across the water" },
  heroContact: { src: heroContact, alt: "Modern office building facade at dusk" },
  pharma: { src: pharma, alt: "Technicians in protective clothing on a pharmaceutical production line" },
  food: { src: food, alt: "Workers on a food processing line" },
  energy: { src: energy, alt: "Aerial view of a solar farm among green fields" },
  semiconductor: { src: semiconductor, alt: "Close-up of a silicon wafer patterned with microchips" },
  automotive: { src: automotive, alt: "Car moving through an automated assembly line" },
  machinery: { src: machinery, alt: "CNC machine cutting a metal workpiece" },
  metal: { src: metal, alt: "Molten metal glowing in a steel foundry" },
  textile: { src: textile, alt: "Industrial textile machinery in a modern mill" },
  packaging: { src: packaging, alt: "Rows of open cardboard boxes" },
  construction: { src: construction, alt: "Tower cranes above a building under construction" },
  aerospace: { src: aerospace, alt: "Jet engine on a stand in an aircraft hangar" },
  jewellery: { src: jewellery, alt: "Handcrafted gold necklace and earrings" },
  people: { src: people, alt: "Team of engineers in hard hats and high-visibility workwear" },
  quality: { src: quality, alt: "Inspector measuring a metal part with a digital caliper" },
  digital: { src: digital, alt: "Corridor of server racks in a data centre" },
  global: { src: global, alt: "Earth seen from space with India in view" },
} satisfies Record<string, Photo>;
