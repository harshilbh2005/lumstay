import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SavedPropertiesPage } from "@/features/saved/components/saved-properties-page";

export const metadata: Metadata = {
  title: "Saved stays",
  description:
    "Return to the considered hotels, cabins, lodges, and retreats saved to your private LumaStay list.",
};

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
