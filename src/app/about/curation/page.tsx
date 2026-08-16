import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { createPageMetadata } from "@/config/metadata";
import { CurationPage } from "@/features/curation";

export const metadata = createPageMetadata({
  title: "How We Curate",
  description:
    "Read the LumaStay curation philosophy: a clear editorial standard for place, character, room truth, and practical detail.",
  path: "/about/curation",
  eyebrow: "Editorial standard",
});

export default function CurationRoute() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-brand-paper">
        <CurationPage />
      </main>
      <SiteFooter />
    </>
  );
}
