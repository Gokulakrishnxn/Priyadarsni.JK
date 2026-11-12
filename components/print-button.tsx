"use client";

import { PrintGlyph } from "./icon";

/** Opens the browser's print dialog, where the resume saves as a PDF. */
export function PrintButton() {
  return (
    <button
      type="button"
      className="pill-link"
      onClick={() => window.print()}
      title="Print or save as PDF"
    >
      <PrintGlyph />
      <span>save PDF</span>
    </button>
  );
}
