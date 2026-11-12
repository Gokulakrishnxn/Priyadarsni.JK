"use client";

import { useMemo, useState } from "react";
import type { ContributionDay } from "@/lib/github";

const RANGES = [
  { id: "7d", days: 7, label: "the last 7 days" },
  { id: "30d", days: 30, label: "the last 30 days" },
  { id: "90d", days: 90, label: "the last 90 days" },
  { id: "1y", days: Infinity, label: "the last year" },
] as const;

type RangeId = (typeof RANGES)[number]["id"];

const CELL = 10;
const STEP = 13;

const dayLabel = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/** GitHub's contribution calendar, redrawn, with a range switch. */
export function Heatmap({ days }: { days: ContributionDay[] }) {
  const [range, setRange] = useState<RangeId>("1y");
  const [tip, setTip] = useState<{ x: number; y: number; text: string } | null>(
    null,
  );

  const { cells, weeks } = useMemo(() => {
    const offset = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
    const placed = days.map((d, i) => ({
      ...d,
      col: Math.floor((i + offset) / 7),
      row: (i + offset) % 7,
    }));
    return { cells: placed, weeks: placed[placed.length - 1].col + 1 };
  }, [days]);

  const active = RANGES.find((r) => r.id === range)!;
  const firstIn = Math.max(0, days.length - active.days);
  const total = days.slice(firstIn).reduce((n, d) => n + d.count, 0);

  const width = weeks * STEP - (STEP - CELL);
  const height = 7 * STEP - (STEP - CELL);

  return (
    <div className="heat reveal" style={{ "--d": "120ms" } as React.CSSProperties}>
      <div className="heat-cells">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`${total.toLocaleString("en-US")} contributions on GitHub in ${active.label}`}
          onPointerLeave={() => setTip(null)}
        >
          {cells.map((d, i) => (
            <rect
              key={d.date}
              x={d.col * STEP}
              y={d.row * STEP}
              width={CELL}
              height={CELL}
              rx={2.5}
              className={`heat-l${d.level}${i < firstIn ? " heat-out" : ""}`}
              onPointerEnter={() =>
                setTip({
                  x: ((d.col * STEP + CELL / 2) / width) * 100,
                  y: ((d.row * STEP) / height) * 100,
                  text: `${d.count === 0 ? "No" : d.count} contribution${
                    d.count === 1 ? "" : "s"
                  } on ${dayLabel.format(new Date(`${d.date}T00:00:00Z`))}`,
                })
              }
            />
          ))}
        </svg>
        {tip ? (
          <span
            className="heat-tip"
            style={
              { "--x": `${tip.x}%`, "--y": `${tip.y}%` } as React.CSSProperties
            }
          >
            {tip.text}
          </span>
        ) : null}
      </div>

      <div className="heat-foot">
        <span>
          {total.toLocaleString("en-US")} contribution{total === 1 ? "" : "s"}{" "}
          on GitHub in {active.label}
        </span>
        <div className="tabs" role="group" aria-label="Range">
          {RANGES.map((r) => (
            <button
              key={r.id}
              type="button"
              className={`tab${r.id === range ? " is-on" : ""}`}
              aria-pressed={r.id === range}
              onClick={() => setRange(r.id)}
            >
              {r.id}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
