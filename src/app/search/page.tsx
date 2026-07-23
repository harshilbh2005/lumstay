import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SearchResults } from "@/features/search";
import {
  getSearchContext,
  type SearchParamValue,
} from "@/features/search/lib/search-context";

export const metadata: Metadata = {
  title: "Search stays",
  description:
    "Explore LumaStay's considered collection of singular hotels across coast, city, mountain, and desert.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, SearchParamValue>>;
}) {
  const context = getSearchContext(await searchParams);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-brand-paper">
        <SearchResults context={context} />
      </main>
      <SiteFooter />
    </>
  );
}
