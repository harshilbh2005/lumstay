import Form from "next/form";
import Link from "next/link";
import { CaretDown, X } from "@phosphor-icons/react/ssr";

import { SearchSortSelect } from "@/features/search/components/search-sort-select";
import {
  getAppliedFilterChips,
  getAppliedFilterEntries,
  getClearFiltersHref,
  getSearchIntentEntries,
  sortOptions,
  type SearchFilters,
  type SearchSortOrder,
} from "@/features/search/lib/search-filters";
import type { SearchParamValue } from "@/features/search/lib/search-context";

export function SearchResultsToolbar({
  resultCount,
  filters,
  sortOrder,
  searchParams,
}: {
  resultCount: number;
  filters: SearchFilters;
  sortOrder: SearchSortOrder;
  searchParams: Record<string, SearchParamValue>;
}) {
  const appliedFilters = getAppliedFilterChips(
    searchParams,
    filters,
    sortOrder,
  );
  const sortFormEntries = [
    ...getSearchIntentEntries(searchParams),
    ...getAppliedFilterEntries(filters),
  ];

  return (
    <div className="border-t border-brand-forest-deep/18 pt-5">
      <div className="grid items-end gap-5 sm:grid-cols-[minmax(0,1fr)_auto]">
        <h2
          id="filtered-results-count"
          aria-live="polite"
          className="font-sans text-2xl font-bold tracking-[-0.035em] text-brand-forest-deep sm:text-3xl"
        >
          {resultCount} considered {resultCount === 1 ? "stay" : "stays"}
        </h2>

        <Form
          action="/search"
          scroll={false}
          aria-label="Sort search results"
          className="grid gap-2 sm:justify-items-end"
        >
          {sortFormEntries.map(([name, value], index) => (
            <input
              key={`${name}-${value}-${index}`}
              type="hidden"
              name={name}
              value={value}
            />
          ))}

          <label className="w-full sm:w-auto">
            <span className="mb-2 block font-mono text-[0.625rem] tracking-[0.13em] text-brand-stone uppercase">
              Order the stays
            </span>
            <span className="relative block">
              <SearchSortSelect key={sortOrder} defaultValue={sortOrder}>
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </SearchSortSelect>
              <CaretDown
                aria-hidden="true"
                size={15}
                className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-brand-forest-deep"
              />
            </span>
          </label>

          <noscript>
            <button
              type="submit"
              className="min-h-11 border border-brand-forest-deep bg-brand-forest-deep px-4 text-sm font-semibold text-brand-paper"
            >
              Apply order
            </button>
          </noscript>
        </Form>
      </div>

      {appliedFilters.length > 0 ? (
        <nav
          aria-label="Applied filters"
          className="mt-5 border-t border-brand-forest-deep/14 pt-4"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 font-mono text-[0.625rem] tracking-[0.13em] text-brand-stone uppercase">
              Applied
            </span>
            {appliedFilters.map((filter) => (
              <Link
                key={filter.key}
                href={filter.href}
                scroll={false}
                aria-label={`Remove filter: ${filter.label}`}
                className="group/filter inline-flex min-h-11 items-center gap-2 border border-brand-forest-deep/24 bg-brand-linen px-3 text-sm font-medium text-brand-forest-deep transition-colors duration-200 hover:border-brand-forest-deep hover:bg-brand-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:translate-y-px"
              >
                {filter.label}
                <X
                  aria-hidden="true"
                  size={13}
                  className="text-brand-stone transition-colors duration-200 group-hover/filter:text-brand-brass"
                />
              </Link>
            ))}
            <Link
              href={getClearFiltersHref(searchParams)}
              scroll={false}
              className="inline-flex min-h-11 items-center px-2 text-sm font-semibold text-brand-forest-deep underline decoration-brand-forest-deep/35 underline-offset-4 transition-colors duration-200 hover:text-brand-brass-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Clear filters
            </Link>
          </div>
        </nav>
      ) : null}
    </div>
  );
}
