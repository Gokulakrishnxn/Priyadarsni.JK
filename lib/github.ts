import { cacheLife } from "next/cache";

export type ContributionDay = {
  /** YYYY-MM-DD */
  date: string;
  count: number;
  /** GitHub's own 0-4 intensity bucket. */
  level: 0 | 1 | 2 | 3 | 4;
};

const attr = (tag: string, name: string) =>
  tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];

/**
 * GitHub serves the public contribution calendar as an HTML fragment, with no
 * token needed. Each day is a <td data-date data-level> and its exact count
 * lives in a sibling <tool-tip for="that td's id">.
 */
export function parseContributions(html: string): ContributionDay[] {
  const counts = new Map<string, number>();
  for (const m of html.matchAll(
    /<tool-tip[^>]*\sfor="([^"]+)"[^>]*>\s*([^<]*)</g,
  )) {
    const n = m[2].match(/^(\d[\d,]*)\s+contribution/);
    counts.set(m[1], n ? Number(n[1].replace(/,/g, "")) : 0);
  }

  const days: ContributionDay[] = [];
  for (const m of html.matchAll(/<td[^>]*\sdata-date="[^"]*"[^>]*>/g)) {
    const tag = m[0];
    const date = attr(tag, "data-date");
    const id = attr(tag, "id");
    const level = Number(attr(tag, "data-level") ?? 0);
    if (!date) continue;
    days.push({
      date,
      count: (id && counts.get(id)) || 0,
      level: Math.min(4, Math.max(0, level)) as ContributionDay["level"],
    });
  }
  return days.sort((a, b) => a.date.localeCompare(b.date));
}

async function fetchContributions(user: string): Promise<ContributionDay[]> {
  "use cache";
  cacheLife("days");

  const res = await fetch(`https://github.com/users/${user}/contributions`, {
    headers: { "x-requested-with": "XMLHttpRequest" },
  });
  if (!res.ok) throw new Error(`GitHub responded ${res.status}`);
  const days = parseContributions(await res.text());
  if (days.length === 0) throw new Error("No contribution days found");
  return days;
}

/** A year of contribution days, or null when GitHub cannot be reached. */
export async function getContributions(
  user: string,
): Promise<ContributionDay[] | null> {
  try {
    return await fetchContributions(user);
  } catch {
    return null;
  }
}
