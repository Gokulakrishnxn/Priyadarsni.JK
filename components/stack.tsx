import {
  projects,
  projectsUsing,
  stack,
  tech,
  type TechId,
} from "@/lib/data";
import { ProjectMark, TechIcon } from "./icon";
import { MarkStack, Section } from "./section";

const all = stack.flatMap((row) => row.items);
const lead: TechId[] = ["python", "pandas", "numpy", "jupyter", "gemini", "git"];

function Chip({ id }: { id: TechId }) {
  const used = projectsUsing(id);
  return (
    <span className="chip-wrap">
      <span className="chip" tabIndex={used.length ? 0 : undefined}>
        <TechIcon id={id} />
        {tech[id].name}
      </span>
      {used.length ? (
        <span className="used" role="tooltip">
          <span className="used-title">
            Used in {used.length} of {projects.length}
          </span>
          {used.map((p) => (
            <span className="used-item" key={p.slug}>
              <ProjectMark name={p.name} accent={p.accent} />
              {p.name}
            </span>
          ))}
        </span>
      ) : null}
    </span>
  );
}

/** Everything in the toolbox, grouped; hovering a chip lists where it was used. */
export function Stack() {
  return (
    <Section
      id="stack"
      title="Stack"
      note="what I use"
      delay={240}
      aside={
        <MarkStack
          marks={lead.map((id) => (
            <TechIcon key={id} id={id} size={13} />
          ))}
          more={all.length - lead.length}
        />
      }
    >
      <dl className="stack">
        {stack.map((row) => (
          <div className="stack-row" key={row.label}>
            <dt>{row.label}</dt>
            <dd>
              {row.items.map((id) => (
                <Chip key={id} id={id} />
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
