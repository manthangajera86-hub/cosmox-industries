import Image from "next/image";
import Link from "next/link";
import { useId } from "react";
import { ChevronIcon } from "@/components/icons";
import { topicPath, type TopicSection } from "@/lib/topics";

type TopicNavProps = {
  section: TopicSection;
  label: string;
  title: string;
  /** Slug of the topic page this sits on, marked as the current page. */
  current?: string;
  tone?: "light" | "alt";
};

/** Photo cards linking to every topic page of a section: on its overview page and under each topic page. */
export default function TopicNav({ section, label, title, current, tone = "light" }: TopicNavProps) {
  const titleId = useId();
  return (
    <section className={`topic-nav is-${tone}`} aria-labelledby={titleId}>
      <div className="container">
        <div className="topic-nav-head">
          <p className="statement-label">{label}</p>
          <h2 className="topic-nav-title" id={titleId}>
            {title}
          </h2>
        </div>
        <ol className="topic-nav-list">
          {section.topics.map((topic, index) => (
            <li key={topic.slug}>
              <Link href={topicPath(section, topic)} aria-current={topic.slug === current ? "page" : undefined}>
                <span className="topic-nav-media">
                  <Image
                    src={topic.photo.src}
                    alt=""
                    fill
                    placeholder="blur"
                    sizes="(max-width: 560px) 50vw, (max-width: 1080px) 33vw, 300px"
                    style={topic.photo.position ? { objectPosition: topic.photo.position } : undefined}
                  />
                </span>
                <span className="topic-nav-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="topic-nav-name">
                  {topic.label}
                  <ChevronIcon />
                </span>
                {topic.slug === current && <span className="topic-nav-here">You are here</span>}
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
