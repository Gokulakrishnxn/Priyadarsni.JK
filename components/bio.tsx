/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";
import { orgs, projects, site, type OrgId } from "@/lib/data";
import { OrgMark, ProjectMark } from "./icon";

const project = (slug: string) => projects.find((p) => p.slug === slug)!;

/**
 * A name in running text with its logo in front. Only the logo and the first
 * word are glued together, so long names can still wrap on narrow screens.
 */
function Named({ mark, children }: { mark: ReactNode; children: string }) {
  const [first, ...rest] = children.split(" ");
  return (
    <>
      <span className="named">
        {mark}
        {first}
      </span>
      {rest.length ? ` ${rest.join(" ")}` : null}
    </>
  );
}

function OrgName({ id, short }: { id: OrgId; short?: string }) {
  const org = orgs[id];
  return (
    <a href={org.url} target="_blank" rel="noreferrer" className="plain">
      <Named mark={<OrgMark id={id} size={16} />}>{short ?? org.name}</Named>
    </a>
  );
}

function ProjectName({ slug }: { slug: string }) {
  const p = project(slug);
  const inner = (
    <Named mark={<ProjectMark name={p.name} accent={p.accent} />}>
      {p.name}
    </Named>
  );
  return p.repo ? (
    <a href={p.repo} target="_blank" rel="noreferrer" className="plain">
      {inner}
    </a>
  ) : (
    inner
  );
}

function Social({
  href,
  icon,
  mono,
  children,
}: {
  href: string;
  icon: string;
  mono?: boolean;
  children: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className="plain"
      {...(external ? { target: "_blank", rel: "noreferrer me" } : {})}
    >
      <Named
        mark={
          <img
            src={icon}
            alt=""
            width={16}
            height={16}
            className={mono ? "ico mono" : "ico"}
          />
        }
      >
        {children}
      </Named>
    </a>
  );
}

/** The opening paragraphs: who, where, what. */
export function Bio() {
  return (
    <div className="bio reveal" style={{ "--d": "60ms" } as React.CSSProperties}>
      <p>
        I live in <span className="dotted">{site.city}</span>, {site.country}.
      </p>
      <p>
        I did my B.Tech in Computer Science at{" "}
        <OrgName id="hits" />, specialising in Artificial Intelligence and Data
        Science. I work mostly in Python, on data analytics, machine learning
        and generative AI.
      </p>
      <p>
        I have interned at <OrgName id="cognifyz" /> in data science and at{" "}
        <OrgName id="internshipStudio" /> in Java, and completed{" "}
        <OrgName id="cognizant" short="Cognizant's" /> AI and data analytics
        programme on Forage.
      </p>
      <p>
        On the side, I build with LLMs. <ProjectName slug="praxis" />, my
        capstone, puts chat, voice, image generation and document Q&amp;A in
        one app, and <ProjectName slug="aura-ai" /> is an assistant that runs
        fully on-device.
      </p>
      <p>
        You can find me on{" "}
        <Social href={site.github} icon="/icons/github.svg" mono>
          GitHub
        </Social>
        ,{" "}
        <Social href={site.linkedin} icon="/icons/linkedin.svg">
          LinkedIn
        </Social>
        , or reach me via{" "}
        <Social href={`mailto:${site.email}`} icon="/icons/gmail.svg">
          email
        </Social>
        .
      </p>
    </div>
  );
}
