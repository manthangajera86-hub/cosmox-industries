import Image from "next/image";
import Link from "next/link";
import { ChevronIcon } from "@/components/icons";
import type { DivisionProfile } from "@/lib/division-profiles";
import type { Division } from "@/lib/divisions";

type DivisionProfileSectionProps = {
  division: Division;
  profile: DivisionProfile;
  /** Anchor for the header menu and links from other pages. */
  id: string;
  action: { href: string; label: string };
};

/**
 * One business division in full: pinned name, headline and photo beside the overview,
 * focus areas, applications and business capabilities.
 */
export default function DivisionProfileSection({ division, profile, id, action }: DivisionProfileSectionProps) {
  const [lead, ...support] = profile.intro;
  return (
    <section id={id} className="division-profile" aria-labelledby={`${id}-title`}>
      <div className="container division-profile-inner">
        <div className="division-profile-side">
          <p className="division-profile-index">
            <span>{division.number}</span> / 12
          </p>
          <p className="statement-label">{division.name}</p>
          <h2 className="division-profile-title" id={`${id}-title`}>
            {profile.title}
          </h2>
          <div className="division-profile-media">
            <Image
              src={division.photo.src}
              alt={division.photo.alt}
              fill
              placeholder="blur"
              sizes="(max-width: 960px) 100vw, 40vw"
              style={division.photo.position ? { objectPosition: division.photo.position } : undefined}
            />
          </div>
        </div>

        <div className="division-profile-main">
          <p className="division-profile-lead">{lead}</p>
          {support.map((text) => (
            <p key={text}>{text}</p>
          ))}

          <div className="division-profile-lists">
            <div>
              <h3>Areas of focus</h3>
              <ul>
                {profile.focus.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Applications</h3>
              <ul>
                {profile.applications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <h3 className="division-profile-subhead">Business capabilities</h3>
          <ul className="division-profile-tags">
            {profile.capabilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <Link className="pill-link" href={action.href}>
            {action.label}
            <ChevronIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
