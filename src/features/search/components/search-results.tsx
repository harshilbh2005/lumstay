import Link from "next/link";
import {
  ArrowRight,
  CalendarBlank,
  MapPin,
  UsersThree,
} from "@phosphor-icons/react/ssr";

import { MobileSearchSheet } from "@/features/search/components/mobile-search-sheet";
import { SearchFilterPanel } from "@/features/search/components/search-filter-panel";
import { PropertyResultCard } from "@/features/search/components/property-result-card";
import { SearchResultsIntro } from "@/features/search/components/search-results-intro";
import {
  SearchResultsState,
  SearchStateRail,
} from "@/features/search/components/search-results-state";
import { SearchResultsToolbar } from "@/features/search/components/search-results-toolbar";
import { getSearchData } from "@/features/search/lib/search-data";
import {
  filterProperties,
  getAppliedFilterEntries,
  getCanonicalSearchHref,
  getClearFiltersHref,
  getPreservedSortEntries,
  getSearchFilters,
  getSearchSort,
  sortProperties,
} from "@/features/search/lib/search-filters";
import {
  getSearchFormValues,
  type SearchContext,
  type SearchParamValue,
} from "@/features/search/lib/search-context";

export function SearchResults({
  context,
  searchParams,
}: {
  context: SearchContext;
  searchParams: Record<string, SearchParamValue>;
}) {
  const filters = getSearchFilters(searchParams);
  const sortOrder = getSearchSort(searchParams);
  const searchData = getSearchData(searchParams);
  const availableProperties =
    searchData.status === "ready" ? searchData.properties : [];
  const filteredProperties = filterProperties(availableProperties, filters);
  const sortedProperties = sortProperties(filteredProperties, sortOrder);
  const resultsState =
    searchData.status === "error"
      ? "error"
      : availableProperties.length === 0
        ? "empty"
        : sortedProperties.length === 0
          ? "no-results"
          : null;
  const searchFormValues = getSearchFormValues(searchParams);
  const mobileSearchPreservedEntries = [
    ...getAppliedFilterEntries(filters),
    ...getPreservedSortEntries(searchParams),
  ];
  const mobileSearchKey = [
    searchFormValues.destination,
    searchFormValues.checkIn,
    searchFormValues.checkOut,
    searchFormValues.adults,
    searchFormValues.children,
    searchFormValues.rooms,
  ].join("|");
  const resultOrderLabel =
    sortOrder === "luma-edit"
      ? null
      : sortOrder === "rating-descending"
        ? "Rating order"
        : "Price order";
  const searchContext = [
    {
      label: "Where",
      value: context.destination,
      icon: MapPin,
    },
    {
      label: "When",
      value: context.dates,
      icon: CalendarBlank,
    },
    {
      label: "Who",
      value: context.guests,
      icon: UsersThree,
    },
  ] as const;

  return (
    <section
      aria-labelledby="search-results-title"
      className="bg-brand-paper pb-[var(--space-section)]"
    >
      <div className="container-luma pt-10 sm:pt-14 lg:pt-20">
        <SearchResultsIntro />

        <div
          aria-label="Current search"
          className="mt-12 grid border-y border-brand-forest-deep/18 bg-brand-linen lg:mt-16 lg:grid-cols-[1fr_1fr_1fr_auto]"
        >
          {searchContext.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex min-h-20 items-center gap-3 border-b border-brand-forest-deep/12 px-5 last:border-b-0 sm:px-6 lg:border-r lg:border-b-0"
              >
                <Icon
                  aria-hidden="true"
                  size={19}
                  weight="duotone"
                  className="shrink-0 text-brand-brass"
                />
                <span>
                  <span className="block font-mono text-[0.625rem] tracking-[0.14em] text-brand-stone uppercase">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-brand-forest-deep">
                    {item.value}
                  </span>
                </span>
              </div>
            );
          })}

          <MobileSearchSheet
            key={mobileSearchKey}
            initialValues={searchFormValues}
            preservedEntries={mobileSearchPreservedEntries}
          />

          <Link
            href="/#stay-search"
            className="group/change hidden min-h-14 items-center justify-between gap-4 px-5 text-sm font-semibold text-brand-forest-deep transition-colors duration-200 hover:bg-brand-forest-deep hover:text-brand-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset sm:px-6 lg:flex lg:min-w-48"
          >
            Change search
            <ArrowRight
              aria-hidden="true"
              size={16}
              className="transition-transform duration-200 ease-luma group-hover/change:translate-x-1"
            />
          </Link>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-x-8 xl:gap-x-12">
          {resultsState === "empty" || resultsState === "error" ? (
            <SearchStateRail variant={resultsState} />
          ) : (
            <SearchFilterPanel
              filters={filters}
              searchParams={searchParams}
              properties={availableProperties}
            />
          )}

          <div className="min-w-0 lg:col-span-9">
            {resultsState === "empty" || resultsState === "error" ? (
              <SearchResultsState
                variant={resultsState}
                primaryHref={getCanonicalSearchHref(searchParams)}
              />
            ) : (
              <>
                <SearchResultsToolbar
                  resultCount={sortedProperties.length}
                  filters={filters}
                  sortOrder={sortOrder}
                  searchParams={searchParams}
                />

                {resultsState === "no-results" ? (
                  <div className="mt-3">
                    <SearchResultsState
                      variant="no-results"
                      primaryHref={getClearFiltersHref(searchParams)}
                    />
                  </div>
                ) : (
                  <ol className="mt-3 divide-y divide-brand-forest-deep/16">
                    {sortedProperties.map((property, index) => (
                      <li key={property.id}>
                        <PropertyResultCard
                          property={property}
                          index={index}
                          featured={index === 0}
                          orderLabel={resultOrderLabel ?? undefined}
                        />
                      </li>
                    ))}
                  </ol>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
