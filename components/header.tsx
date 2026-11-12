import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/data";
import { ArrowLeft, FileGlyph } from "./icon";
import { PrintButton } from "./print-button";

const updated = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
}).format(new Date(`${site.updated}T00:00:00Z`));

/** Avatar, name and the pill of page actions. */
export function Header({ page }: { page: "home" | "resume" | "other" }) {
  return (
    <header className="top reveal">
      <div className="who">
        <Image
          src="/profile.jpg"
          alt={`Portrait of ${site.name}`}
          width={44}
          height={44}
          className="avatar"
          priority
        />
        <div>
          <h1>{site.name}</h1>
          <p className="muted">
            {page === "home" ? `Updated ${updated}` : site.role}
          </p>
        </div>
      </div>

      <nav className="pill" aria-label="Page">
        {page === "home" ? (
          <Link href="/resume" className="pill-link">
            resume
            <FileGlyph />
          </Link>
        ) : (
          <>
            <Link href="/" className="pill-link">
              <ArrowLeft />
              home
            </Link>
            {page === "resume" ? (
              <>
                <span className="pill-sep" aria-hidden="true" />
                <PrintButton />
              </>
            ) : null}
          </>
        )}
      </nav>
    </header>
  );
}
