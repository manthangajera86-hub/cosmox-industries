import { notFound } from "next/navigation";
import TopicPage from "@/components/TopicPage";
import { findTopic, topicPath, topicSection } from "@/lib/topics";
import { pageMetadata } from "@/lib/site";

const section = topicSection("company");

// Only the topics in lib/topics have pages; any other address is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return section.topics.map((topic) => ({ topic: topic.slug }));
}

export async function generateMetadata({ params }: PageProps<"/about/[topic]">) {
  const topic = findTopic(section, (await params).topic);
  if (!topic) return {};
  return pageMetadata({ title: `${topic.label} | ${section.name}`, description: topic.lead, path: topicPath(section, topic) });
}

export default async function Page({ params }: PageProps<"/about/[topic]">) {
  const topic = findTopic(section, (await params).topic);
  if (!topic) notFound();
  return <TopicPage section={section} topic={topic} />;
}
