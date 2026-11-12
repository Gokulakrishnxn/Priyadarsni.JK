/**
 * The public origin, used for canonical links, Open Graph and the sitemap.
 * Set NEXT_PUBLIC_SITE_URL for a custom domain; otherwise Vercel's production
 * hostname is used, and localhost during development.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");
