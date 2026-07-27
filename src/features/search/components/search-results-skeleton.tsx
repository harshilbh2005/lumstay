import {
  CalendarBlank,
  MapPin,
  UsersThree,
} from "@phosphor-icons/react/ssr";

import { Skeleton } from "@/components/ui/skeleton";
import { SearchResultsIntro } from "@/features/search/components/search-results-intro";
import { cn } from "@/lib/utils";

const contextItems = [
  { label: "Where", icon: MapPin, width: "w-28" },
  { label: "When", icon: CalendarBlank, width: "w-36" },
  { label: "Who", icon: UsersThree, width: "w-24" },
] as const;

const filterGroups = [
  { labelWidth: "w-20", options: 3 },
  { labelWidth: "w-24", options: 2 },
  { labelWidth: "w-24", options: 4 },
  { labelWidth: "w-16", options: 5 },
] as const;

const resultPlaceholders = ["01", "02", "03", "04", "05", "06"] as const;

function QuietSkeleton({ className }: { className: string }) {
  return (
    <Skeleton
      aria-hidden="true"
      className={cn("rounded-none bg-muted", className)}
    />
  );
}

function SearchContextSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="mt-12 grid border-y border-brand-forest-deep/18 bg-brand-linen lg:mt-16 lg:grid-cols-[1fr_1fr_1fr_auto]"
    >
      {contextItems.map((item) => {
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
              className="shrink-0 text-brand-brass/55"
            />
            <span>
              <span className="block font-mono text-[0.625rem] tracking-[0.14em] text-brand-stone uppercase">
                {item.label}
              </span>
              <QuietSkeleton className={cn("mt-2 h-3", item.width)} />
            </span>
          </div>
        );
      })}

      <div className="flex min-h-14 items-center justify-between gap-4 px-5 sm:px-6 lg:min-w-48">
        <QuietSkeleton className="h-3 w-24" />
        <QuietSkeleton className="size-4" />
      </div>
    </div>
  );
}

function FilterRailSkeleton() {
  return (
    <aside aria-hidden="true" className="lg:col-span-3">
      <div className="border-t border-brand-forest-deep/18 lg:hidden">
        <div className="flex min-h-14 items-center justify-between gap-4 border-b border-brand-forest-deep/18 py-3">
          <QuietSkeleton className="h-4 w-40" />
          <QuietSkeleton className="size-4" />
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="border-t border-brand-forest-deep/18 pt-5">
          <QuietSkeleton className="h-2.5 w-24" />
          <div className="mt-5 space-y-2">
            <QuietSkeleton className="h-7 w-48" />
            <QuietSkeleton className="h-7 w-36" />
          </div>
          <div className="mt-5 space-y-2">
            <QuietSkeleton className="h-3 w-full" />
            <QuietSkeleton className="h-3 w-[88%]" />
            <QuietSkeleton className="h-3 w-[72%]" />
          </div>
        </div>

        <div className="mt-8">
          {filterGroups.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="border-t border-brand-forest-deep/16 py-5"
            >
              <QuietSkeleton className={cn("h-2.5", group.labelWidth)} />
              <div className="mt-5 space-y-3">
                {Array.from({ length: group.options }).map((_, optionIndex) => (
                  <div
                    key={optionIndex}
                    className="flex min-h-8 items-center justify-between gap-3"
                  >
                    <span className="flex items-center gap-3">
                      <QuietSkeleton className="size-[1.125rem]" />
                      <QuietSkeleton
                        className={cn(
                          "h-3",
                          optionIndex % 2 === 0 ? "w-28" : "w-20",
                        )}
                      />
                    </span>
                    <QuietSkeleton className="h-2.5 w-4" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

function ResultsToolbarSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="border-t border-brand-forest-deep/18 pt-5"
    >
      <div className="grid items-end gap-5 sm:grid-cols-[minmax(0,1fr)_auto]">
        <QuietSkeleton className="h-8 w-52 sm:h-9 sm:w-64" />
        <div className="grid gap-2 sm:justify-items-end">
          <QuietSkeleton className="h-2.5 w-24" />
          <QuietSkeleton className="h-11 w-full sm:w-52" />
        </div>
      </div>
    </div>
  );
}

function PropertyResultSkeleton({
  featured = false,
}: {
  featured?: boolean;
}) {
  return (
    <article
      aria-hidden="true"
      className={cn(
        "py-8 sm:py-10 lg:py-12",
        featured && "lg:py-14",
      )}
    >
      <div
        className={cn(
          "grid min-w-0 gap-5 sm:gap-7 md:grid-cols-[minmax(15rem,0.82fr)_minmax(0,1.18fr)] md:gap-8",
          featured
            ? "lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)] lg:gap-12"
            : "lg:grid-cols-[minmax(17rem,0.78fr)_minmax(0,1.22fr)] lg:gap-10",
        )}
      >
        <QuietSkeleton
          className={cn(
            "aspect-[16/10] min-w-0 sm:aspect-[4/3] md:aspect-auto md:min-h-[23rem]",
            featured && "lg:min-h-[31rem]",
          )}
        />

        <div
          className={cn(
            "flex min-w-0 flex-col md:py-1",
            featured && "lg:py-3",
          )}
        >
          <div className="flex items-center justify-between gap-5">
            <QuietSkeleton className="h-2.5 w-28" />
            <QuietSkeleton className="h-2.5 w-24" />
          </div>

          <QuietSkeleton
            className={cn(
              "mt-5",
              featured ? "h-12 w-[72%] lg:h-16" : "h-11 w-[64%] lg:h-13",
            )}
          />

          <div className="mt-5 space-y-2.5">
            <QuietSkeleton className="h-3.5 w-full" />
            <QuietSkeleton className="h-3.5 w-[94%]" />
            <QuietSkeleton className="h-3.5 w-[68%]" />
          </div>

          <div className="mt-6 grid grid-cols-2 border-y border-brand-forest-deep/14">
            <div className="py-4 pr-3 sm:pr-5">
              <QuietSkeleton className="h-2.5 w-20" />
              <QuietSkeleton className="mt-3 h-3 w-[88%]" />
              <QuietSkeleton className="mt-2 h-3 w-[64%]" />
            </div>
            <div className="border-l border-brand-forest-deep/14 py-4 pl-3 sm:pl-5">
              <QuietSkeleton className="h-2.5 w-24" />
              <QuietSkeleton className="mt-3 h-3 w-full" />
              <QuietSkeleton className="mt-2 h-3 w-[72%]" />
            </div>
          </div>

          <div className="mt-5 flex items-end justify-between gap-5 md:mt-auto md:pt-7">
            <div>
              <QuietSkeleton className="h-2.5 w-8" />
              <QuietSkeleton className="mt-2 h-4 w-28" />
            </div>
            <QuietSkeleton className="h-11 w-28" />
          </div>
        </div>
      </div>
    </article>
  );
}

export function SearchResultsSkeleton() {
  return (
    <section
      aria-labelledby="search-results-title"
      aria-busy="true"
      className="bg-brand-paper pb-[var(--space-section)]"
    >
      <span className="sr-only" role="status" aria-live="polite">
        Loading search results
      </span>

      <div className="container-luma pt-10 sm:pt-14 lg:pt-20">
        <SearchResultsIntro />
        <SearchContextSkeleton />

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-x-8 xl:gap-x-12">
          <FilterRailSkeleton />

          <div className="min-w-0 lg:col-span-9">
            <ResultsToolbarSkeleton />
            <div className="mt-3 divide-y divide-brand-forest-deep/16">
              {resultPlaceholders.map((placeholder, index) => (
                <PropertyResultSkeleton
                  key={placeholder}
                  featured={index === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
