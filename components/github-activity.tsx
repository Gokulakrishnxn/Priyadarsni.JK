import { site } from "@/lib/data";
import { getContributions } from "@/lib/github";
import { Heatmap } from "./heatmap";

/** Loads the contribution year on the server; renders nothing if it fails. */
export async function GithubActivity() {
  const days = await getContributions(site.githubUser);
  if (!days) return null;
  return <Heatmap days={days} />;
}
