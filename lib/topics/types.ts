import type { Photo } from "@/lib/photos";

/** One piece of a topic section, in the order the brief gives it. */
export type TopicChunk =
  | { kind: "p"; text: string }
  /** Short points, optionally introduced by a line ending in a colon. */
  | { kind: "list"; label?: string; items: string[] }
  /** Named points with a sentence each, shown as a numbered grid. */
  | { kind: "items"; items: { title: string; text: string }[] }
  /** Named points that carry their own list, shown as cards. */
  | { kind: "groups"; items: { title: string; text?: string; label?: string; list?: string[] }[] }
  /** Steps of a process or chain, shown as a row of steps. `joiner` replaces the arrow. */
  | { kind: "flow"; steps: string[]; joiner?: string };

/** One section of a topic page: a section of the brief. */
export type TopicBlock = { label: string; title: string; content: TopicChunk[] };

/** A page of its own for one entry of a header menu, under its section's overview page. */
export type Topic = {
  /** URL segment under the section's overview page. */
  slug: string;
  /** Name in the header menu and the page's label. */
  label: string;
  /** Headline of the photo header. */
  title: string;
  /** Opening paragraph under the headline. */
  lead: string;
  photo: Photo;
  /** The same photo's file in assets/photos, for the sharing card. */
  ogPhoto: string;
  /** The first block's headline is the page headline, so it isn't repeated. */
  blocks: TopicBlock[];
};

/** A main section of the site whose menu entries have topic pages. */
export type TopicSection = {
  id: "company" | "manufacturing" | "commerce" | "innovation" | "sustainability";
  /** Name in the header menu and on the topic pages' label. */
  name: string;
  /** Overview page, and the breadcrumb leading back to it. */
  overview: { href: string; label: string };
  topics: Topic[];
  /** Headline of the cards linking to every topic page. */
  navTitle: string;
  /** The overview page's header photo, behind the call to action on each topic page. */
  photo: Photo;
  /** Call to action closing every topic page of the section. */
  action: { href: string; label: string; title: string; text: string };
};
