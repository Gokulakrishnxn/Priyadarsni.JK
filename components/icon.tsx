/* Brand marks are small local SVG/PNG files, so a plain <img> is the right tool. */
/* eslint-disable @next/next/no-img-element */
import { orgs, tech, type OrgId, type Tech, type TechId } from "@/lib/data";

type Size = { size?: number };

/** A technology's own logo, switching artwork for the dark theme when needed. */
export function TechIcon({ id, size = 16 }: { id: TechId } & Size) {
  const t: Tech = tech[id];
  const common = {
    width: size,
    height: size,
    loading: "lazy" as const,
    decoding: "async" as const,
  };

  if (t.iconDark) {
    return (
      <>
        <img {...common} alt="" src={t.icon} className="ico only-light" />
        <img {...common} alt="" src={t.iconDark} className="ico only-dark" />
      </>
    );
  }
  return (
    <img
      {...common}
      alt=""
      src={t.icon}
      className={t.mono ? "ico mono" : "ico"}
    />
  );
}

/** An organisation's logo on a small rounded tile. */
export function OrgMark({ id, size = 18 }: { id: OrgId } & Size) {
  return (
    <span className="pico" style={{ width: size, height: size }}>
      <img
        src={orgs[id].logo}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
      />
    </span>
  );
}

/** A project's mark: its initial on the project's accent colour. */
export function ProjectMark({
  name,
  accent,
  size = 16,
}: { name: string; accent: string } & Size) {
  return (
    <span
      className="pico pico-letter"
      style={{ width: size, height: size, background: accent }}
      aria-hidden="true"
    >
      {name[0]}
    </span>
  );
}

/* ---- Interface glyphs (stroke icons drawn for this site) ---- */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

type GlyphProps = { size?: number };

const svg = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
  ...stroke,
});

export const FileGlyph = ({ size = 15 }: GlyphProps) => (
  <svg {...svg(size)}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </svg>
);

export const FolderGlyph = ({ size = 14 }: GlyphProps) => (
  <svg {...svg(size)}>
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
);

export const ArrowUpRight = ({ size = 13 }: GlyphProps) => (
  <svg {...svg(size)}>
    <path d="M7 17 17 7M8.5 7H17v8.5" />
  </svg>
);

export const ArrowLeft = ({ size = 14 }: GlyphProps) => (
  <svg {...svg(size)}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

export const PrintGlyph = ({ size = 15 }: GlyphProps) => (
  <svg {...svg(size)}>
    <path d="M7 9V4h10v5M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
    <path d="M7 14h10v6H7z" />
  </svg>
);

export const CarouselGlyph = ({ size = 15 }: GlyphProps) => (
  <svg {...svg(size)}>
    <rect x="7.5" y="5" width="9" height="14" rx="2" />
    <path d="M3.5 8v8M20.5 8v8" />
  </svg>
);

export const GridGlyph = ({ size = 15 }: GlyphProps) => (
  <svg {...svg(size)}>
    <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
    <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
    <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
    <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
  </svg>
);

export const SunGlyph = ({ size = 14 }: GlyphProps) => (
  <svg {...svg(size)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
  </svg>
);

export const MoonGlyph = ({ size = 14 }: GlyphProps) => (
  <svg {...svg(size)}>
    <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />
  </svg>
);

export const SystemGlyph = ({ size = 14 }: GlyphProps) => (
  <svg {...svg(size)}>
    <rect x="3" y="4.5" width="18" height="12" rx="2" />
    <path d="M8.5 20h7M12 16.5V20" />
  </svg>
);
