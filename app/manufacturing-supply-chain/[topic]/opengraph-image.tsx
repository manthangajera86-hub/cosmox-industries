import { notFound } from "next/navigation";
import { findTopic, topicSection } from "@/lib/topics";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

const section = topicSection("manufacturing");

export const alt = `${section.name} | Cosmox Industries`;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return section.topics.map((topic) => ({ topic: topic.slug }));
}

export default async function Image({ params }: { params: Promise<{ topic: string }> }) {
  const topic = findTopic(section, (await params).topic);
  if (!topic) notFound();
  return renderOgImage({ label: `${section.name} · ${topic.label}`, title: topic.title, photo: topic.ogPhoto });
}
