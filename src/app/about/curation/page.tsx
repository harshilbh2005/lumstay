import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CurationPage } from "@/features/curation";

export const metadata: Metadata = {
  title: "How We Curate",
  description:
    "Read the LumaStay curation philosophy: a clear editorial standard for place, character, room truth, and practical detail.",
};

export default function CurationRoute() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-brand-paper">
        <CurationPage />
      </main>
      <SiteFooter />
    </>
  );
}
