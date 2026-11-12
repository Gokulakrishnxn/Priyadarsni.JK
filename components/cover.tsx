import type { ReactNode } from "react";
import type { CoverKind } from "@/lib/data";

/*
 * Project covers are small drawings, not screenshots: one motif per project,
 * painted with the project's accent (--cv) and the theme's neutral tokens.
 * Classes: cv-a accent fill, cv-as accent stroke, cv-f neutral fill,
 * cv-s neutral stroke, cv-m muted fill.
 */

const waveHeights = [
  18, 34, 56, 28, 70, 96, 52, 30, 78, 110, 64, 38, 84, 58, 26, 66, 44, 22, 36,
  16,
];

const barHeights = [44, 62, 38, 96, 54, 72, 30];

const drawings: Record<CoverKind, ReactNode> = {
  chat: (
    <>
      <rect className="cv-f" x="44" y="34" width="156" height="34" rx="17" />
      <rect className="cv-m" x="60" y="48" width="92" height="6" rx="3" />
      <rect className="cv-a" x="120" y="80" width="156" height="34" rx="17" />
      <rect className="cv-on" x="138" y="94" width="104" height="6" rx="3" />
      <rect className="cv-f" x="44" y="126" width="118" height="34" rx="17" />
      <rect className="cv-m" x="60" y="140" width="58" height="6" rx="3" />
      <circle className="cv-a" cx="238" cy="150" r="7" />
      <circle className="cv-a" cx="258" cy="150" r="7" opacity=".6" />
      <circle className="cv-a" cx="278" cy="150" r="7" opacity=".3" />
    </>
  ),
  route: (
    <>
      <path className="cv-s" d="M92 100C140 100 150 46 214 46" />
      <path className="cv-as" d="M92 100H214" />
      <path className="cv-s" d="M92 100C140 100 150 154 214 154" />
      <rect className="cv-f" x="40" y="80" width="56" height="40" rx="12" />
      <rect className="cv-m" x="54" y="97" width="28" height="6" rx="3" />
      <rect className="cv-f" x="214" y="30" width="66" height="32" rx="10" />
      <rect className="cv-a" x="214" y="84" width="66" height="32" rx="10" />
      <rect className="cv-f" x="214" y="138" width="66" height="32" rx="10" />
      <rect className="cv-m" x="228" y="43" width="38" height="6" rx="3" />
      <rect className="cv-on" x="228" y="97" width="38" height="6" rx="3" />
      <rect className="cv-m" x="228" y="151" width="38" height="6" rx="3" />
      <circle className="cv-a" cx="154" cy="100" r="5" />
    </>
  ),
  chip: (
    <>
      {[84, 100, 116].map((v) => (
        <g key={v} className="cv-s">
          <path d={`M96 ${v}h20M204 ${v}h20`} />
          <path d={`M${v + 60} 36v20M${v + 60} 144v20`} />
        </g>
      ))}
      <rect className="cv-f cv-so" x="116" y="56" width="88" height="88" rx="16" />
      <rect className="cv-a" x="138" y="78" width="44" height="44" rx="10" />
      <path className="cv-ons" d="M151 100l7 7 12-14" />
    </>
  ),
  wave: (
    <>
      {waveHeights.map((h, i) => (
        <rect
          key={i}
          className={i > 4 && i < 14 ? "cv-a" : "cv-m"}
          x={54 + i * 11}
          y={100 - h / 2}
          width="5"
          height={h}
          rx="2.5"
        />
      ))}
    </>
  ),
  scan: (
    <>
      <path
        className="cv-as"
        d="M86 68V52a10 10 0 0 1 10-10h16M208 42h16a10 10 0 0 1 10 10v16M234 132v16a10 10 0 0 1-10 10h-16M112 158H96a10 10 0 0 1-10-10v-16"
      />
      <rect className="cv-f" x="106" y="60" width="108" height="80" rx="12" />
      <path className="cv-a" d="M150 84v32l28-16z" />
      <circle className="cv-a" cx="226" cy="54" r="15" />
      <path className="cv-ons" d="M219 54l5 5 9-10" />
    </>
  ),
  grid: (
    <>
      {Array.from({ length: 15 }, (_, i) => {
        const col = i % 5;
        const row = Math.floor(i / 5);
        const hit = [1, 7, 8, 13].includes(i);
        return (
          <rect
            key={i}
            className={hit ? "cv-a" : "cv-f"}
            opacity={hit ? 1 - ((i * 7) % 5) * 0.12 : 1}
            x={52 + col * 45}
            y={38 + row * 44}
            width="36"
            height="36"
            rx="8"
          />
        );
      })}
      <rect className="cv-as" x="48" y="78" width="44" height="44" rx="11" />
    </>
  ),
  pipeline: (
    <>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect
            className={i === 1 ? "cv-a" : "cv-f"}
            x={40 + i * 88}
            y="72"
            width="64"
            height="56"
            rx="14"
          />
          <circle
            className={i === 1 ? "cv-on" : "cv-m"}
            cx={72 + i * 88}
            cy="92"
            r="7"
          />
          <rect
            className={i === 1 ? "cv-on" : "cv-m"}
            x={56 + i * 88}
            y="108"
            width="32"
            height="6"
            rx="3"
          />
        </g>
      ))}
      <path className="cv-as" d="M108 100h16m-6-6 6 6-6 6M196 100h16m-6-6 6 6-6 6" />
    </>
  ),
  bars: (
    <>
      <path className="cv-s" d="M56 152h208" />
      {barHeights.map((h, i) => (
        <rect
          key={i}
          className={i === 3 ? "cv-a" : "cv-f"}
          x={68 + i * 27}
          y={148 - h}
          width="18"
          height={h}
          rx="5"
        />
      ))}
      <path className="cv-as" d="M68 70c40 0 60 26 96 26s48-14 82-14" strokeDasharray="1 7" />
    </>
  ),
  line: (
    <>
      <path className="cv-s" d="M48 152h224M48 112h224M48 72h224" strokeDasharray="1 7" />
      <path
        className="cv-area"
        d="M48 138l26-14 22 8 24-34 22 16 26-40 22 18v60H48z"
      />
      <path
        className="cv-ms"
        d="M48 138l26-14 22 8 24-34 22 16 26-40 22 18"
      />
      <path className="cv-as" d="M190 92l26-30 24 12 32-28" strokeDasharray="5 6" />
      <circle className="cv-a" cx="190" cy="92" r="5" />
    </>
  ),
  receipt: (
    <>
      <path
        className="cv-f cv-so"
        d="M108 28h104v136l-13-9-13 9-13-9-13 9-13-9-13 9-13-9-13 9z"
      />
      <circle className="cv-a" cx="160" cy="54" r="11" />
      {[82, 98, 114].map((y, i) => (
        <g key={y}>
          <rect className="cv-m" x="124" y={y} width={44 - i * 8} height="5" rx="2.5" />
          <rect className="cv-m" x="180" y={y} width="16" height="5" rx="2.5" />
        </g>
      ))}
      <path className="cv-s" d="M124 130h72" strokeDasharray="1 6" />
      <rect className="cv-a" x="172" y="138" width="24" height="7" rx="3.5" />
    </>
  ),
  frames: (
    <>
      <rect className="cv-f" x="52" y="62" width="72" height="56" rx="10" transform="rotate(-8 88 90)" />
      <rect className="cv-f cv-so" x="66" y="72" width="72" height="56" rx="10" />
      <circle className="cv-m" cx="86" cy="90" r="6" />
      <path className="cv-m" d="M72 122l18-18 12 10 14-16 16 24z" />
      <path className="cv-as" d="M154 100h26m-8-8 8 8-8 8" />
      <rect className="cv-a" x="196" y="68" width="76" height="64" rx="12" />
      <text className="cv-text" x="234" y="107" textAnchor="middle">
        GIF
      </text>
    </>
  ),
};

export function Cover({ kind }: { kind: CoverKind }) {
  return (
    <svg
      className="cover-art"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {drawings[kind]}
    </svg>
  );
}
