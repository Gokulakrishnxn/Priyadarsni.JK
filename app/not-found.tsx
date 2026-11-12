import Link from "next/link";
import { Header } from "@/components/header";

export default function NotFound() {
  return (
    <main className="page">
      <Header page="other" />
      <div className="lost reveal">
        <p>This page does not exist.</p>
        <p className="muted">
          Head back{" "}
          <Link href="/" className="dotted">
            home
          </Link>{" "}
          or open the{" "}
          <Link href="/resume" className="dotted">
            resume
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
