"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { site } from "@/lib/data";
import { MoonGlyph, SunGlyph, SystemGlyph } from "./icon";

type Pref = "light" | "dark" | "system";

const KEY = "theme";
const EVENT = "themechange";

function readPref(): Pref {
  try {
    const v = localStorage.getItem(KEY);
    return v === "light" || v === "dark" ? v : "system";
  } catch {
    return "system";
  }
}

function apply(pref: Pref) {
  const dark =
    pref === "dark" ||
    (pref === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.dataset.theme = dark ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  const media = matchMedia("(prefers-color-scheme: dark)");
  const sync = () => {
    apply(readPref());
    onChange();
  };
  window.addEventListener(EVENT, sync);
  window.addEventListener("storage", sync);
  media.addEventListener("change", sync);
  return () => {
    window.removeEventListener(EVENT, sync);
    window.removeEventListener("storage", sync);
    media.removeEventListener("change", sync);
  };
}

function setPref(pref: Pref) {
  try {
    if (pref === "system") localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, pref);
  } catch {
    /* private mode: the choice just lasts for this page */
  }
  apply(pref);
  window.dispatchEvent(new Event(EVENT));
}

const options: { id: Pref; label: string; icon: React.ReactNode }[] = [
  { id: "light", label: "Light theme", icon: <SunGlyph /> },
  { id: "dark", label: "Dark theme", icon: <MoonGlyph /> },
  { id: "system", label: "Follow the system theme", icon: <SystemGlyph /> },
];

function ThemeSwitch() {
  // The server cannot know the saved choice, so it renders "system".
  const pref = useSyncExternalStore<Pref>(subscribe, readPref, () => "system");

  return (
    <div className="seg theme" role="group" aria-label="Theme">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          className={`icon-btn${o.id === pref ? " is-on" : ""}`}
          aria-pressed={o.id === pref}
          aria-label={o.label}
          title={o.label}
          onClick={() => setPref(o.id)}
        >
          {o.icon}
        </button>
      ))}
    </div>
  );
}

const clock = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: site.timeZone,
});

function LocalTime() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setNow(clock.format(new Date()).replace(" ", "").toLowerCase());
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="nowrap">
      {now ? <span className="tnum">{now} in </span> : null}
      {site.city}, {site.country}
    </span>
  );
}

/** The local time where she is, and the theme switch. */
export function Footer() {
  return (
    <footer className="site-foot reveal" style={{ "--d": "480ms" } as React.CSSProperties}>
      <LocalTime />
      <ThemeSwitch />
    </footer>
  );
}
