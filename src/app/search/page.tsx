import { createPageMetadata } from "@/config/metadata";
import { SearchResults } from "@/features/search";
import {
  getSearchContext,
  type SearchParamValue,
} from "@/features/search/lib/search-context";

export const metadata = createPageMetadata({
  title: "Search stays",
  description:
    "Explore LumaStay's considered collection of singular hotels across coast, city, mountain, and desert.",
  path: "/search",
  eyebrow: "Stay discovery",
  detail: "Query variants excluded from indexing",
  indexing: "noindex-follow",
});

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, SearchParamValue>>;
}) {
  const resolvedSearchParams = await searchParams;
  const context = getSearchContext(resolvedSearchParams);

  return (
    <SearchResults
      context={context}
      searchParams={resolvedSearchParams}
    />
  );
}
