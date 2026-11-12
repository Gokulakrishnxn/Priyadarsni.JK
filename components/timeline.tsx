import {
  certificateCount,
  certifications,
  education,
  experience,
  orgs,
} from "@/lib/data";
import { FileGlyph, FolderGlyph, OrgMark } from "./icon";
import { MarkStack, Section } from "./section";

/** Internships, newest first. */
export function Experience() {
  return (
    <Section
      id="experience"
      title="Experience"
      note="internships"
      noteShape="loop"
      delay={300}
      aside={
        <MarkStack
          marks={experience.map((r) => (
            <OrgMark key={r.org} id={r.org} size={14} />
          ))}
          fact="since 2023"
        />
      }
    >
      <div className="xp">
        {experience.map((role) => (
          <article key={role.org}>
            <div className="xp-head">
              <h3 className="xp-org">
                <OrgMark id={role.org} />
                {orgs[role.org].name}
              </h3>
              <span className="xp-when">{role.when}</span>
            </div>
            <p className="xp-role">{role.title}</p>
            <ul className="xp-lines">
              {role.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}

/** The degree, with the grade circled by hand. */
export function Education() {
  return (
    <Section
      id="education"
      title="Education"
      note="four years"
      noteShape="squiggle"
      delay={360}
      aside={
        <MarkStack
          marks={[<OrgMark key="hits" id={education.org} size={14} />]}
          fact={education.when}
        />
      }
    >
      <div className="xp">
        <article>
          <div className="xp-head">
            <h3 className="xp-org">
              <OrgMark id={education.org} />
              {orgs[education.org].name}
            </h3>
            <span className="xp-when">{education.when}</span>
          </div>
          <p className="xp-role">
            {education.degree}, {education.place}
          </p>
          <ul className="xp-lines">
            <li>Specialization in {education.specialization}.</li>
            <li>
              CGPA{" "}
              <span className="circled">
                {education.cgpa}
                <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
                  <path
                    pathLength={1}
                    d="M52 4C28 3 5 9 4 20c-1 11 22 17 48 16 26-1 45-7 44-18C95 8 70 2 40 5"
                  />
                </svg>
              </span>{" "}
              of 10.
            </li>
            <li>
              Capstone: Praxis, a multi-LLM conversational and productivity
              app.
            </li>
          </ul>
        </article>
      </div>
    </Section>
  );
}

/** Certificates as a little file tree, one folder per issuer. */
export function Certifications() {
  return (
    <Section
      id="certifications"
      title="Certifications"
      note="certs"
      delay={420}
      aside={
        <MarkStack
          marks={certifications.map((g) => (
            <OrgMark key={g.dir} id={g.org} size={14} />
          ))}
          fact={`${certificateCount} certificates`}
        />
      }
    >
      <div className="ftree">
        <p className="ftree-dir">
          <FolderGlyph />
          <span className="hl">certifications/</span>
        </p>
        <ul className="ftree-list">
          {certifications.map((group) => (
            <li key={group.dir}>
              <p className="ftree-dir">
                <OrgMark id={group.org} size={14} />
                {group.dir}/
              </p>
              <ul className="ftree-list">
                {group.files.map((file) => (
                  <li className="ftree-file" key={file.name}>
                    <span>
                      <FileGlyph size={13} />
                      <span className="ftree-name">{file.name}</span>
                    </span>
                    {file.note ? (
                      <span className="ftree-date">{file.note}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
