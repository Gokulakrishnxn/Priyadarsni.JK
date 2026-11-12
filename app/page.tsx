import { Bio } from "@/components/bio";
import { Footer } from "@/components/footer";
import { GithubActivity } from "@/components/github-activity";
import { Header } from "@/components/header";
import { Stack } from "@/components/stack";
import {
  Certifications,
  Education,
  Experience,
} from "@/components/timeline";
import { Work } from "@/components/work";
import { orgs, site, stack, tech } from "@/lib/data";
import { siteUrl } from "@/lib/site-url";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: siteUrl,
  dateModified: site.updated,
  mainEntity: {
    "@type": "Person",
    name: site.name,
    description: site.description,
    url: siteUrl,
    image: `${siteUrl}/priyadarsni.webp`,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressCountry: "IN",
    },
    sameAs: [site.github, site.linkedin],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: orgs.hits.name,
      url: orgs.hits.url,
    },
    knowsAbout: stack.flatMap((row) => row.items.map((id) => tech[id].name)),
  },
};

export default function Home() {
  return (
    <main className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Header page="home" />
      <Bio />
      <GithubActivity />
      <Work />
      <Stack />
      <Experience />
      <Education />
      <Certifications />
      <Footer />
    </main>
  );
}
