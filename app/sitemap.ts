import type { MetadataRoute } from "next";
import { site } from "@/lib/data";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${site.updated}T00:00:00Z`);
  return [
    { url: siteUrl, lastModified, priority: 1 },
    { url: `${siteUrl}/resume`, lastModified, priority: 0.8 },
  ];
}
