"use client";

import type { SearchSortOrder } from "@/features/search/lib/search-filters";

export function SearchSortSelect({
  defaultValue,
  children,
}: {
  defaultValue: SearchSortOrder;
  children: React.ReactNode;
}) {
  return (
    <select
      name="sort"
      defaultValue={defaultValue}
      aria-label="Sort stays"
      onChange={(event) => event.currentTarget.form?.requestSubmit()}
      className="min-h-11 w-full cursor-pointer appearance-none border border-brand-forest-deep/32 bg-brand-paper py-2 pr-10 pl-3 text-sm font-semibold text-brand-forest-deep transition-colors duration-200 hover:border-brand-forest-deep/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-52"
    >
      {children}
    </select>
  );
}
