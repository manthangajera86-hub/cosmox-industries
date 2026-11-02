import Breadcrumbs from "@/components/Breadcrumbs";
import ButtonLink from "@/components/ButtonLink";
import FeatureBanner from "@/components/FeatureBanner";
import Hero from "@/components/Hero";
import TopicBlocks from "@/components/TopicBlocks";
import TopicNav from "@/components/TopicNav";
import { topicPath, type Topic, type TopicSection } from "@/lib/topics";

/**
 * A page of its own for one header-menu entry, e.g. /about/who-we-are: a photo header (never a
 * video; those are for the overview pages), the brief's sections for the topic, links to the
 * section's other topic pages and a call to action.
 */
export default function TopicPage({ section, topic }: { section: TopicSection; topic: Topic }) {
  return (
    <>
      <Hero
        eyebrow={`${section.name} · ${topic.label}`}
        title={topic.title}
        photo={topic.photo}
        compact={topic.title.length > 48}
        actions={
          <>
            <ButtonLink href={section.action.href}>{section.action.label}</ButtonLink>
            <ButtonLink href={section.overview.href} variant="ghost">{`${section.overview.label} Overview`}</ButtonLink>
          </>
        }
      >
        <p>{topic.lead}</p>
      </Hero>
      <Breadcrumbs
        trail={[section.overview]}
        current={{ href: topicPath(section, topic), label: topic.label }}
      />
      <TopicBlocks blocks={topic.blocks} />
      <TopicNav
        section={section}
        current={topic.slug}
        label={`More in ${section.name}`}
        title={section.navTitle}
        tone={topic.blocks.length % 2 ? "alt" : "light"}
      />
      <FeatureBanner title={section.action.title} photo={section.photo} action={section.action}>
        <p>{section.action.text}</p>
      </FeatureBanner>
    </>
  );
}
