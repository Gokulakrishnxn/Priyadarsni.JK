"use client";

import { useState, type CSSProperties } from "react";
import { projectGroups, projects, type Project } from "@/lib/data";
import { Cover } from "./cover";
import {
  ArrowUpRight,
  CarouselGlyph,
  GridGlyph,
  ProjectMark,
  TechIcon,
} from "./icon";
import { Section } from "./section";

type View = "carousel" | "grid";

function Card({ project }: { project: Project }) {
  const body = (
    <>
      <div className="cover">
        <Cover kind={project.cover} />
        <span className="cover-stack" aria-hidden="true">
          {project.stack.slice(0, 4).map((id) => (
            <span className="cover-tech" key={id}>
              <TechIcon id={id} size={13} />
            </span>
          ))}
        </span>
        {project.repo ? (
          <span className="cover-cta">
            View on GitHub
            <ArrowUpRight size={12} />
          </span>
        ) : (
          <span className="cover-cta">Capstone project</span>
        )}
      </div>
      <div className="card-meta">
        <h3>{project.name}</h3>
        <p>{project.tagline}</p>
      </div>
    </>
  );

  const style = { "--cv": project.accent } as CSSProperties;

  return project.repo ? (
    <a
      className="card"
      style={style}
      href={project.repo}
      target="_blank"
      rel="noreferrer"
    >
      {body}
    </a>
  ) : (
    <div className="card" style={style}>
      {body}
    </div>
  );
}

/** Project covers as a swipeable row or a grid, then every project by group. */
export function Work() {
  const [view, setView] = useState<View>("carousel");

  return (
    <Section
      id="work"
      title="Work"
      note="projects"
      delay={180}
      aside={
        <>
          <span className="sec-count">{projects.length} projects</span>
          <div className="seg" role="group" aria-label="Layout">
            <button
              type="button"
              className={`icon-btn${view === "carousel" ? " is-on" : ""}`}
              aria-pressed={view === "carousel"}
              aria-label="Show as a carousel"
              title="Carousel"
              onClick={() => setView("carousel")}
            >
              <CarouselGlyph />
            </button>
            <button
              type="button"
              className={`icon-btn${view === "grid" ? " is-on" : ""}`}
              aria-pressed={view === "grid"}
              aria-label="Show as a grid"
              title="Grid"
              onClick={() => setView("grid")}
            >
              <GridGlyph />
            </button>
          </div>
        </>
      }
    >
      <div className={view === "carousel" ? "work-track" : "work-grid"}>
        {projects.map((p) => (
          <Card key={p.slug} project={p} />
        ))}
      </div>

      <dl className="index">
        {projectGroups.map((group) => (
          <div className="index-row" key={group}>
            <dt>{group}</dt>
            <dd>
              {projects
                .filter((p) => p.group === group)
                .map((p) => {
                  const inner = (
                    <>
                      <ProjectMark name={p.name} accent={p.accent} />
                      {p.name}
                    </>
                  );
                  return p.repo ? (
                    <a
                      key={p.slug}
                      className="index-item"
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {inner}
                    </a>
                  ) : (
                    <span key={p.slug} className="index-item">
                      {inner}
                    </span>
                  );
                })}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
