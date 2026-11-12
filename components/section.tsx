import type { CSSProperties, ReactNode } from "react";

type NoteShape = "arrow" | "loop" | "squiggle";

const shapes: Record<NoteShape, ReactNode> = {
  arrow: (
    <svg viewBox="0 0 110 44" width="110" height="44" aria-hidden="true">
      <path pathLength={1} d="M30 4c2 18 20 30 72 22" />
      <path pathLength={1} d="M90 17l13 9-13 10" />
    </svg>
  ),
  loop: (
    <svg viewBox="0 0 110 44" width="110" height="44" aria-hidden="true">
      <path
        pathLength={1}
        d="M26 6c-2 14 6 24 20 24 8 0 12-5 11-10-1-6-9-7-13-2-5 6 0 15 14 16 14 1 30-3 44-8"
      />
      <path pathLength={1} d="M90 17l13 9-12 10" />
    </svg>
  ),
  squiggle: (
    <svg viewBox="0 0 110 20" width="110" height="20" aria-hidden="true">
      <path
        pathLength={1}
        d="M6 10c8-7 12 7 20 0s12 7 20 0 12 7 20 0 12 7 20 0 10 5 16 1"
      />
    </svg>
  ),
};

/**
 * A page section with the house heading row: title on the left, a short fact
 * on the right, and a handwritten note in the margin on wide screens.
 */
export function Section({
  id,
  title,
  note,
  noteShape = "arrow",
  aside,
  delay = 0,
  children,
}: {
  id: string;
  title: string;
  note?: string;
  noteShape?: NoteShape;
  aside?: ReactNode;
  delay?: number;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="section reveal"
      style={{ "--d": `${delay}ms` } as CSSProperties}
      aria-labelledby={`${id}-title`}
    >
      {note ? (
        <span className="margin-note" aria-hidden="true">
          <span className="margin-note-text">{note}</span>
          {shapes[noteShape]}
        </span>
      ) : null}
      <div className="sec-head">
        <h2 id={`${id}-title`}>{title}</h2>
        {aside ? <div className="sec-aside">{aside}</div> : null}
      </div>
      {children}
    </section>
  );
}

/** Overlapping round marks followed by a mono caption, used in heading rows. */
export function MarkStack({
  marks,
  more,
  fact,
}: {
  marks: ReactNode[];
  more?: number;
  fact?: string;
}) {
  return (
    <span className="lstack">
      <span className="lstack-marks" aria-hidden="true">
        {marks.map((m, i) => (
          <span className="lstack-mark" key={i}>
            {m}
          </span>
        ))}
        {more ? (
          <span className="lstack-mark lstack-more">+{more}</span>
        ) : null}
      </span>
      {fact ? <span className="lstack-fact">{fact}</span> : null}
    </span>
  );
}
