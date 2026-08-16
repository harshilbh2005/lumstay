import Form from "next/form";
import Link from "next/link";

import { SearchFilterDisclosure } from "@/features/search/components/search-filter-disclosure";
import {
  atmosphereOptions,
  facilityOptions,
  getClearFiltersHref,
  getPreservedSortEntries,
  getSearchIntentEntries,
  priceOptions,
  propertyTypeOptions,
  ratingOptions,
  type SearchFilters,
} from "@/features/search/lib/search-filters";
import type { SearchParamValue } from "@/features/search/lib/search-context";
import type {
  PropertyAtmosphere,
  PropertyFacility,
  PropertySummary,
  PropertyType,
} from "@/types/domain";

const checkboxClassName =
  "relative size-[1.125rem] shrink-0 appearance-none border border-brand-forest-deep/45 bg-brand-paper transition-colors duration-200 after:absolute after:top-[0.125rem] after:left-[0.34rem] after:hidden after:h-2 after:w-1 after:rotate-45 after:border-r-2 after:border-b-2 after:border-brand-paper checked:border-brand-forest-deep checked:bg-brand-forest-deep checked:after:block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const radioClassName =
  "size-[1.125rem] shrink-0 appearance-none rounded-full border border-brand-forest-deep/45 bg-brand-paper transition-colors duration-200 checked:border-[0.3rem] checked:border-brand-forest-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

function FilterOption({
  name,
  value,
  label,
  count,
  checked,
  type = "checkbox",
}: {
  name: string;
  value: string;
  label: string;
  count: number;
  checked: boolean;
  type?: "checkbox" | "radio";
}) {
  return (
    <label className="group flex min-h-11 cursor-pointer items-center justify-between gap-3 text-sm text-foreground">
      <span className="flex min-w-0 items-center gap-3">
        <input
          key={checked ? "selected" : "available"}
          type={type}
          name={name}
          value={value}
          defaultChecked={checked}
          className={type === "radio" ? radioClassName : checkboxClassName}
        />
        <span className="transition-colors duration-200 group-hover:text-brand-forest">
          {label}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="shrink-0 font-mono text-[0.625rem] tabular-nums text-brand-stone"
      >
        {String(count).padStart(2, "0")}
      </span>
    </label>
  );
}

function FilterGroup({
  legend,
  hint,
  children,
}: {
  legend: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="border-t border-brand-forest-deep/16 py-5">
      <legend className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-forest-deep uppercase">
        {legend}
      </legend>
      {hint ? (
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{hint}</p>
      ) : null}
      <div className="mt-3">{children}</div>
    </fieldset>
  );
}

export function SearchFilterPanel({
  filters,
  searchParams,
  properties,
}: {
  filters: SearchFilters;
  searchParams: Record<string, SearchParamValue>;
  properties: readonly PropertySummary[];
}) {
  const clearHref = getClearFiltersHref(searchParams);
  const preservedSearchEntries = [
    ...getSearchIntentEntries(searchParams),
    ...getPreservedSortEntries(searchParams),
  ];

  const countPropertyType = (value: PropertyType) =>
    properties.filter((property) => property.propertyType === value).length;
  const countFacility = (value: PropertyFacility) =>
    properties.filter((property) => property.facilityTags.includes(value))
      .length;
  const countAtmosphere = (value: PropertyAtmosphere) =>
    properties.filter((property) => property.atmosphereTags.includes(value))
      .length;

  return (
    <aside aria-label="Search filters" className="lg:col-span-3">
      <SearchFilterDisclosure activeCount={filters.activeCount}>
        <>
          <div className="hidden border-t border-brand-forest-deep/18 pt-5 lg:block">
            <p className="font-mono text-[0.625rem] tracking-[0.14em] text-brand-brass-dark uppercase">
              Refine the edit
            </p>
            <h2 className="mt-4 max-w-[10ch] font-sans text-3xl leading-none font-bold tracking-[-0.045em] text-brand-forest-deep">
              Find your kind of stay.
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Narrow the collection by the details that shape a day there.
              Your chosen order stays with the search.
            </p>
          </div>

          <Form
            action="/search"
            scroll={false}
            aria-label="Refine search results"
            className="lg:mt-8"
          >
            {preservedSearchEntries.map(([name, value], index) => (
              <input
                key={`${name}-${value}-${index}`}
                type="hidden"
                name={name}
                value={value}
              />
            ))}

            <FilterGroup
              legend="Nightly rate"
              hint="Choose one ceiling; leave blank for any rate."
            >
              {priceOptions.map((option) => (
                <FilterOption
                  key={option.value}
                  name="maxPrice"
                  value={option.value}
                  label={option.label}
                  count={
                    properties.filter(
                      (property) =>
                        property.priceFrom.amount <= option.maximum,
                    ).length
                  }
                  checked={filters.maxPrice === option.maximum}
                  type="radio"
                />
              ))}
            </FilterGroup>

            <FilterGroup
              legend="Guest rating"
              hint="Based on notes from previous guests."
            >
              {ratingOptions.map((option) => (
                <FilterOption
                  key={option.value}
                  name="minRating"
                  value={option.value}
                  label={option.label}
                  count={
                    properties.filter(
                      (property) => property.rating >= option.minimum,
                    ).length
                  }
                  checked={filters.minRating === option.minimum}
                  type="radio"
                />
              ))}
            </FilterGroup>

            <FilterGroup legend="Property type">
              {propertyTypeOptions.map((option) => (
                <FilterOption
                  key={option.value}
                  name="propertyType"
                  value={option.value}
                  label={option.label}
                  count={countPropertyType(option.value)}
                  checked={filters.propertyTypes.includes(option.value)}
                />
              ))}
            </FilterGroup>

            <FilterGroup legend="Facilities">
              {facilityOptions.map((option) => (
                <FilterOption
                  key={option.value}
                  name="facility"
                  value={option.value}
                  label={option.label}
                  count={countFacility(option.value)}
                  checked={filters.facilities.includes(option.value)}
                />
              ))}
            </FilterGroup>

            <FilterGroup legend="Atmosphere">
              {atmosphereOptions.map((option) => (
                <FilterOption
                  key={option.value}
                  name="atmosphere"
                  value={option.value}
                  label={option.label}
                  count={countAtmosphere(option.value)}
                  checked={filters.atmospheres.includes(option.value)}
                />
              ))}
            </FilterGroup>

            <div className="sticky bottom-0 -mx-5 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 border-t border-brand-forest-deep/16 bg-brand-paper px-5 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] lg:static lg:mx-0 lg:grid-cols-1 lg:gap-2 lg:bg-transparent lg:px-0 lg:pt-5 lg:pb-0">
              {filters.activeCount > 0 ? (
                <Link
                  href={clearHref}
                  scroll={false}
                  className="inline-flex min-h-12 items-center justify-center px-1 text-sm font-semibold text-brand-forest-deep underline decoration-brand-forest-deep/35 underline-offset-4 transition-colors duration-200 hover:text-brand-brass-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:order-2 lg:min-h-11"
                >
                  Reset filters
                </Link>
              ) : (
                <span aria-hidden="true" className="lg:hidden" />
              )}
              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center rounded-pill border border-brand-forest-deep bg-brand-forest-deep px-5 text-sm font-semibold text-brand-paper transition-colors duration-200 hover:bg-brand-forest hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:translate-y-px lg:order-1 lg:rounded-none"
              >
                Apply filters
              </button>
            </div>
          </Form>
        </>
      </SearchFilterDisclosure>
    </aside>
  );
}
