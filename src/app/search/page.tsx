import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SearchResults } from "@/features/search";

export const metadata: Metadata = {
  title: "Search stays",
  description:
    "Explore LumaStay's considered collection of singular hotels across coast, city, mountain, and desert.",
};

export default function SearchPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-brand-paper">
        <SearchResults />
      </main>
      <SiteFooter />
    </>
  );
}
