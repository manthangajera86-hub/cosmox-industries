import { useId } from "react";
import type { TopicBlock, TopicChunk } from "@/lib/topics";

const pad = (n: number) => String(n + 1).padStart(2, "0");

function Chunk({ chunk }: { chunk: TopicChunk }) {
  switch (chunk.kind) {
    case "p":
      return <p className="topic-text">{chunk.text}</p>;
    case "list":
      return (
        <div className="topic-list-wrap">
          {chunk.label && <p className="topic-list-label">{chunk.label}</p>}
          <ul className="topic-list">
            {chunk.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      );
    case "items": {
      const columns = chunk.items.length >= 8 && chunk.items.length % 4 === 0 ? "cols-4" : "cols-3";
      return (
        <ol className={`numbered-grid-list ${columns} topic-items`}>
          {chunk.items.map((item, index) => (
            <li key={item.title}>
              <span className="numbered-grid-number" aria-hidden="true">
                {pad(index)}
              </span>
              <h3>{item.title}</h3>
              <div className="numbered-grid-text">
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      );
    }
    case "groups":
      return (
        <ul className="topic-groups">
          {chunk.items.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              {item.text && <p>{item.text}</p>}
              {item.label && <p className="topic-list-label">{item.label}</p>}
              {item.list && (
                <ul className="topic-list topic-list-compact">
                  {item.list.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      );
    case "flow":
      return (
        <ol className="topic-flow" data-joiner={chunk.joiner ?? "→"}>
          {chunk.steps.map((step) => (
            <li key={step}>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      );
  }
}

function Block({ block, index }: { block: TopicBlock; index: number }) {
  const titleId = useId();
  const first = index === 0;
  // A later block's opening sentence sits beside its headline, as on the overview pages.
  const [opening, ...rest] = block.content;
  const lead = !first && opening?.kind === "p" && !opening.text.endsWith(":") ? opening.text : null;
  const body = lead ? rest : block.content;

  return (
    <section
      className={`numbered-grid ${index % 2 ? "is-alt" : "is-light"} topic-block${first ? " topic-block-first" : ""}`}
      aria-labelledby={titleId}
    >
      <div className="container">
        {first ? (
          // The page headline is this block's headline, so the block shows only its label.
          <h2 className="statement-label topic-block-label" id={titleId}>
            {block.label}
          </h2>
        ) : (
          <div className="numbered-grid-head">
            <div>
              <p className="statement-label">{block.label}</p>
              <h2 className="numbered-grid-title" id={titleId}>
                {block.title}
              </h2>
            </div>
            {lead && <p className="numbered-grid-lead">{lead}</p>}
          </div>
        )}
        <div className="topic-body">
          {body.map((chunk, i) => (
            <Chunk key={i} chunk={chunk} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** The sections of a topic page, alternating white and panel grey. */
export default function TopicBlocks({ blocks }: { blocks: TopicBlock[] }) {
  return blocks.map((block, index) => <Block key={block.label} block={block} index={index} />);
}
