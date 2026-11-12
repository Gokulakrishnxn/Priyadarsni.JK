/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { OrgMark, TechIcon } from "@/components/icon";
import {
  certifications,
  education,
  experience,
  orgs,
  projects,
  site,
  stack,
  tech,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${site.name}: education, internships, projects, skills and certificates.`,
  alternates: { canonical: "/resume" },
};

const capstone = projects.find((p) => p.slug === "praxis")!;
const listed = projects.filter((p) => p.slug !== "praxis");

function Row({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="cv-row">
      <h2>{title}</h2>
      <div className="cv-body">{children}</div>
    </section>
  );
}

/** The resume as a page: same content as the PDF, laid out to read and print. */
export default function Resume() {
  return (
    <main className="page">
      <Header page="resume" />

      <div className="cv-contact reveal" style={{ "--d": "60ms" } as React.CSSProperties}>
        <span className="chip">{site.city}, Tamil Nadu</span>
        <a className="chip" href={`mailto:${site.email}`}>
          <img src="/icons/gmail.svg" alt="" width={15} height={15} className="ico" />
          {site.email}
        </a>
        <a className="chip" href={site.linkedin} target="_blank" rel="noreferrer">
          <img src="/icons/linkedin.svg" alt="" width={15} height={15} className="ico" />
          linkedin.com/in/priyadarsni-jk
        </a>
        <a className="chip" href={site.github} target="_blank" rel="noreferrer">
          <img src="/icons/github.svg" alt="" width={15} height={15} className="ico mono" />
          github.com/{site.githubUser}
        </a>
      </div>

      <div className="cv reveal" style={{ "--d": "120ms" } as React.CSSProperties}>
        <Row title="Summary">
          <p>{site.summary}</p>
        </Row>

        <Row title="Education">
          <div className="cv-item">
            <div className="xp-head">
              <h3 className="xp-org">
                <OrgMark id={education.org} />
                {orgs[education.org].name}
              </h3>
              <span className="xp-when">{education.when}</span>
            </div>
            <p>
              {education.degree}, specialization in {education.specialization}
            </p>
            <p>CGPA {education.cgpa} of 10</p>
          </div>
        </Row>

        <Row title="Capstone">
          <div className="cv-item">
            <h3>{capstone.name}</h3>
            <p>{capstone.description.replace(/^Capstone project\. /, "")}</p>
          </div>
        </Row>

        <Row title="Experience">
          {experience.map((role) => (
            <div className="cv-item" key={role.org}>
              <div className="xp-head">
                <h3 className="xp-org">
                  <OrgMark id={role.org} />
                  {orgs[role.org].name}
                </h3>
                <span className="xp-when">{role.when}</span>
              </div>
              <p>{role.title}</p>
            </div>
          ))}
        </Row>

        <Row title="Projects">
          {listed.map((p) => (
            <div className="cv-item" key={p.slug}>
              <h3>
                {p.repo ? (
                  <a href={p.repo} target="_blank" rel="noreferrer" className="plain">
                    {p.name}
                  </a>
                ) : (
                  p.name
                )}
              </h3>
              <p>{p.description}</p>
            </div>
          ))}
        </Row>

        <Row title="Skills">
          <dl className="cv-skills">
            {stack.map((row) => (
              <div className="cv-skill" key={row.label}>
                <dt>{row.label}</dt>
                <dd>
                  {row.items.map((id) => (
                    <span className="chip" key={id}>
                      <TechIcon id={id} />
                      {tech[id].name}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Row>

        <Row title="Certificates">
          {certifications.flatMap((group) =>
            group.files.map((file) => (
              <div className="cv-item" key={file.name}>
                <h3 className="xp-org">
                  <OrgMark id={group.org} />
                  {file.name}
                </h3>
                <p>
                  {orgs[group.org].name}
                  {file.note ? `, ${file.note}` : ""}
                </p>
              </div>
            )),
          )}
        </Row>
      </div>

      <Footer />
    </main>
  );
}
