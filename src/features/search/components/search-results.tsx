import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarBlank,
  MapPin,
  Star,
  UsersThree,
} from "@phosphor-icons/react/ssr";

import { getMediaById, mockProperties } from "@/data/mock";
import type { PropertySummary } from "@/types/domain";

import { SaveStayButton } from "@/features/properties/components/save-stay-button";

const priceFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

const searchContext = [
  {
    label: "Where",
    value: "Across the LumaStay world",
    icon: MapPin,
  },
  {
    label: "When",
    value: "Any dates",
    icon: CalendarBlank,
  },
  {
    label: "Who",
    value: "2 guests · 1 room",
    icon: UsersThree,
  },
] as const;

function ResultRow({
  property,
  index,
}: {
  property: PropertySummary;
  index: number;
}) {
  const media = getMediaById(property.mediaId);

  if (!media) {
    return null;
  }

  return (
    <article className="group grid min-w-0 gap-5 py-8 sm:gap-7 sm:py-10 xl:grid-cols-[minmax(18rem,0.95fr)_minmax(0,1.05fr)] xl:gap-10">
      <div className="relative aspect-[4/3] min-w-0 overflow-hidden bg-muted">
        <Link
          href={`/properties/${property.slug}`}
          prefetch={false}
          aria-label={`View ${property.name}`}
          className="absolute inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass focus-visible:ring-inset"
        >
          <Image
            fill
            src={media.src}
            alt={media.alt}
            sizes="(max-width: 1279px) calc(100vw - 2.5rem), 36vw"
            priority={index === 0}
            className="object-cover transition-transform duration-500 ease-luma group-hover:scale-[1.018]"
            style={{ objectPosition: media.focalPoint }}
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-brand-forest-deep/22 via-transparent to-transparent"
          />
        </Link>

        <div className="pointer-events-none absolute inset-x-4 top-4 flex items-start justify-between gap-4">
          <span className="flex min-h-8 items-center border border-white/34 bg-brand-forest-deep/66 px-3 font-mono text-[0.625rem] tracking-[0.13em] text-white uppercase backdrop-blur-md">
            {property.isNew
              ? "Just added"
              : property.isLumaPick
                ? "Luma pick"
                : "Considered stay"}
          </span>
          <SaveStayButton
            propertyName={property.name}
            className="pointer-events-auto shrink-0"
          />
        </div>

        <span className="absolute right-4 bottom-4 font-mono text-[0.625rem] tracking-[0.14em] text-white/84">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex min-w-0 flex-col xl:py-1">
        <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 font-mono text-[0.625rem] tracking-[0.11em] text-muted-foreground uppercase">
          <span>
            {property.location.city} · {property.location.country}
          </span>
          <span className="flex items-center gap-1.5 text-foreground">
            <Star aria-hidden="true" size={11} weight="fill" />
            {property.rating.toFixed(2)}
            <span className="text-muted-foreground">
              · {property.reviewCount} notes
            </span>
          </span>
        </div>

        <Link
          href={`/properties/${property.slug}`}
          prefetch={false}
          className="mt-2 inline-flex min-h-11 w-fit items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
        >
          <h3 className="font-sans text-[clamp(2rem,3vw,3.25rem)] leading-[0.98] font-bold tracking-[-0.05em] text-brand-forest-deep">
            {property.name}
          </h3>
        </Link>

        <p className="mt-4 max-w-[54ch] text-base leading-7 text-muted-foreground">
          {property.description}
        </p>

        <dl className="mt-7 grid gap-5 border-t border-border/85 pt-5 sm:grid-cols-2">
          <div>
            <dt className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-stone uppercase">
              The feeling
            </dt>
            <dd className="mt-2 text-sm leading-6 text-foreground">
              {property.atmosphere.join(" · ")}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-stone uppercase">
              Worth knowing
            </dt>
            <dd className="mt-2 text-sm leading-6 text-foreground">
              {property.facilities.join(" · ")}
            </dd>
          </div>
        </dl>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-5 pt-8">
          <p className="text-sm text-muted-foreground">
            From{" "}
            <span className="font-mono text-base font-medium text-foreground tabular-nums">
              ₹{priceFormatter.format(property.priceFrom.amount)}
            </span>{" "}
            / night
          </p>
          <Link
            href={`/properties/${property.slug}`}
            prefetch={false}
            className="group/link inline-flex min-h-11 items-center gap-3 border-b border-brand-forest-deep/45 text-sm font-semibold text-brand-forest-deep transition-colors duration-200 hover:border-brand-brass hover:text-brand-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
          >
            View the stay
            <ArrowRight
              aria-hidden="true"
              size={16}
              className="transition-transform duration-200 ease-luma group-hover/link:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function SearchResults() {
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
                  <ResultRow property={property} index={index} />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
