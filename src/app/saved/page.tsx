import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { createPageMetadata } from "@/config/metadata";
import { SavedPropertiesPage } from "@/features/saved/components/saved-properties-page";

export const metadata = createPageMetadata({
  title: "Saved stays",
  description:
    "Return to the fictional stays saved in this browser-local LumaStay prototype collection.",
  path: "/saved",
  eyebrow: "Browser-local collection",
  detail: "Local saved state · Not a user account",
  indexing: "noindex-nofollow",
});

export default function SavedPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-brand-paper">
        <SavedPropertiesPage />
      </main>
      <SiteFooter />
    </>
  );
}
