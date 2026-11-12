import type { Metadata, Viewport } from "next";
import { Caveat, Inter } from "next/font/google";
import { site } from "@/lib/data";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

/** Only the handwritten margin notes use this. */
const hand = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: "500",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name}, ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.name, url: site.linkedin }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    title: `${site.name}, ${site.role}`,
    description: site.description,
    url: "/",
    siteName: site.name,
    images: [{ url: "/priyadarsni.webp", width: 800, height: 800 }],
  },
  twitter: { card: "summary" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0e" },
  ],
};

/**
 * Runs before first paint so a saved theme never flashes the wrong colours.
 * The footer's switch keeps data-theme in sync afterwards.
 */
const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.dataset.theme=d?"dark":"light"}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${hand.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
