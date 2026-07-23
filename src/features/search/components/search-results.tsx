import Link from "next/link";
import {
  ArrowRight,
  CalendarBlank,
  MapPin,
  UsersThree,
} from "@phosphor-icons/react/ssr";

import { mockProperties } from "@/data/mock";
import { PropertyResultCard } from "@/features/search/components/property-result-card";
import type { SearchContext } from "@/features/search/lib/search-context";

export function SearchResults({ context }: { context: SearchContext }) {
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
        <header className="grid gap-8 border-t border-brand-forest-deep/20 pt-6 lg:grid-cols-12 lg:gap-x-8 lg:pt-8">
          <p className="flex items-start gap-3 font-mono text-[0.6875rem] tracking-[0.15em] text-brand-stone uppercase lg:col-span-3">
            <span className="text-brand-brass">01</span>
            Search the edit
          </p>

          <div className="lg:col-span-6">
            <h1
              id="search-results-title"
              className="max-w-[12ch] font-sans text-[clamp(3rem,6vw,6.6rem)] leading-[0.9] font-bold tracking-[-0.065em] text-brand-forest-deep"
            >
              Six stays, each with a reason to go.
            </h1>
          </div>

          <p className="max-w-[30rem] text-base leading-7 text-muted-foreground lg:col-span-3 lg:pt-1">
            A first pass across coast, city, mountain, and desert—ordered by
            character rather than commission.
          </p>
        </header>

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

          <Link
            href="/#stay-search"
            className="group/change flex min-h-14 items-center justify-between gap-4 px-5 text-sm font-semibold text-brand-forest-deep transition-colors duration-200 hover:bg-brand-forest-deep hover:text-brand-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset sm:px-6 lg:min-w-48"
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
          <aside
            aria-labelledby="search-order-title"
            className="border-t border-brand-forest-deep/18 pt-5 lg:col-span-3"
          >
            <div className="lg:sticky lg:top-28">
              <p className="font-mono text-[0.625rem] tracking-[0.14em] text-brand-brass uppercase">
                Luma order
              </p>
              <h2
                id="search-order-title"
                className="mt-4 max-w-[12ch] font-sans text-3xl leading-none font-bold tracking-[-0.045em] text-brand-forest-deep"
              >
                Chosen for more than a room.
              </h2>
              <p className="mt-4 max-w-[29rem] text-base leading-7 text-muted-foreground">
                We look first at how a stay belongs to its setting, then at the
                details that shape a day there.
              </p>

              <ol className="mt-7 grid border-t border-border/85 sm:grid-cols-3 lg:grid-cols-1">
                {["Architecture", "Atmosphere", "Sense of place"].map(
                  (criterion, index) => (
                    <li
                      key={criterion}
                      className="flex min-h-12 items-center gap-3 border-b border-border/85 py-2 font-mono text-[0.625rem] tracking-[0.12em] text-brand-stone uppercase"
                    >
                      <span className="text-brand-brass">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {criterion}
                    </li>
                  ),
                )}
              </ol>
            </div>
          </aside>

          <div className="min-w-0 lg:col-span-9">
            <div className="flex flex-wrap items-end justify-between gap-4 border-t border-brand-forest-deep/18 pt-5">
              <h2 className="font-sans text-2xl font-bold tracking-[-0.035em] text-brand-forest-deep sm:text-3xl">
                {mockProperties.length} considered stays
              </h2>
              <p className="font-mono text-[0.625rem] tracking-[0.12em] text-brand-stone uppercase">
                Ordered by the Luma edit
              </p>
            </div>

            <ol className="mt-3 divide-y divide-brand-forest-deep/16">
              {mockProperties.map((property, index) => (
                <li key={property.id}>
                  <PropertyResultCard
                    property={property}
                    index={index}
                    featured={index === 0}
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
