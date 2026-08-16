import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "@phosphor-icons/react/ssr";

import { getMediaById, mockProperties } from "@/data/mock";
import { BookingIntentPropertyLink } from "@/features/booking/components/booking-intent-property-link";
import type { PropertySummary } from "@/types/domain";

import { SaveStayButton } from "./save-stay-button";

const priceFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

function PropertyCard({
  property,
  index,
  featured = false,
}: {
  property: PropertySummary;
  index: number;
  featured?: boolean;
}) {
  const media = getMediaById(property.mediaId);

  if (!media) {
    return null;
  }

  const bookingDestination = `${property.location.city}, ${property.location.country}`;

  return (
    <article className="group min-w-0">
      <div
        className={
          featured
            ? "relative aspect-[4/5] overflow-hidden bg-muted sm:aspect-[5/4] lg:aspect-auto lg:min-h-[42rem]"
            : "relative aspect-[4/5] overflow-hidden bg-muted sm:aspect-[5/4] lg:aspect-[16/9]"
        }
      >
        <BookingIntentPropertyLink
          slug={property.slug}
          destination={bookingDestination}
          prefetch={false}
          aria-label={`View ${property.name}`}
          className="absolute inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass focus-visible:ring-inset"
        >
          <Image
            fill
            src={media.src}
            alt={media.alt}
            fetchPriority="low"
            sizes={
              featured
                ? "(max-width: 1023px) 86vw, 62vw"
                : "(max-width: 1023px) 86vw, 34vw"
            }
            className="object-cover transition-transform duration-500 ease-luma group-hover:scale-[1.018]"
          />
          <span
            className="absolute inset-0 bg-gradient-to-t from-brand-forest-deep/78 via-brand-forest-deep/8 to-transparent"
            aria-hidden="true"
          />
        </BookingIntentPropertyLink>

        <div className="pointer-events-none absolute inset-x-4 top-4 flex items-start justify-between gap-4 sm:inset-x-5 sm:top-5">
          <div className="flex min-h-8 items-center border border-white/34 bg-brand-forest-deep/88 px-3 font-mono text-[0.625rem] tracking-[0.13em] text-white uppercase backdrop-blur-md">
            {property.isNew ? "Just added" : property.isLumaPick ? "Luma pick" : "Considered stay"}
          </div>
          <SaveStayButton
            propertyId={property.id}
            propertyName={property.name}
            className="pointer-events-auto shrink-0"
          />
        </div>

        <span className="absolute right-5 bottom-4 font-mono text-[0.625rem] tracking-[0.14em] text-white/82 sm:bottom-5">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className={featured ? "pt-5 sm:pt-6" : "pt-4 sm:pt-5"}>
        <div className="flex items-center justify-between gap-4 font-mono text-[0.625rem] tracking-[0.11em] text-muted-foreground uppercase">
          <span>
            {property.location.city} · {property.location.country}
          </span>
          <span className="flex shrink-0 items-center gap-1.5 text-foreground">
            <Star aria-hidden="true" size={11} weight="fill" />
            {property.rating.toFixed(2)}
          </span>
        </div>

        <BookingIntentPropertyLink
          slug={property.slug}
          destination={bookingDestination}
          prefetch={false}
          className="mt-2 inline-flex rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
        >
          <h3
            className={
              featured
                ? "font-sans text-[clamp(2rem,4vw,3.6rem)] leading-[0.98] font-bold tracking-[-0.055em] text-brand-forest-deep"
                : "font-sans text-[1.65rem] leading-none font-bold tracking-[-0.04em] text-brand-forest-deep"
            }
          >
            {property.name}
          </h3>
        </BookingIntentPropertyLink>

        <p
          className={
            featured
              ? "mt-4 max-w-[52ch] text-base leading-7 text-muted-foreground"
              : "mt-3 line-clamp-2 max-w-[48ch] text-sm leading-6 text-muted-foreground"
          }
        >
          {property.description}
        </p>

        <div className="mt-5 flex items-end justify-between gap-5 border-t border-border/80 pt-4">
          <p className="text-sm text-muted-foreground">
            From{" "}
            <span className="font-mono font-medium text-foreground tabular-nums">
              ₹{priceFormatter.format(property.priceFrom.amount)}
            </span>{" "}
            / night
          </p>
          <span className="hidden text-right text-[0.6875rem] font-semibold tracking-[0.08em] text-brand-stone uppercase sm:block">
            {property.atmosphere[0]}
          </span>
        </div>
      </div>
    </article>
  );
}

export function CuratedStays() {
  return (
    <section
      aria-labelledby="curated-stays-title"
      className="overflow-hidden bg-brand-paper py-[var(--space-section)]"
    >
      <div className="container-luma">
        <div className="grid gap-8 border-t border-brand-forest-deep/18 pt-6 lg:grid-cols-12 lg:gap-x-8 lg:pt-8">
          <p className="flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.15em] text-brand-stone uppercase lg:col-span-3">
            <span className="text-brand-brass-dark">01</span>
            The LumaStay edit
          </p>

          <div className="lg:col-span-6">
            <h2
              id="curated-stays-title"
              className="max-w-[11ch] font-sans text-[clamp(2.75rem,5.3vw,5.5rem)] leading-[0.92] font-bold tracking-[-0.06em] text-brand-forest-deep"
            >
              Stays we would cross a map for.
            </h2>
          </div>

          <div className="flex max-w-[28rem] flex-col items-start lg:col-span-3 lg:pt-1">
            <p className="text-base leading-7 text-muted-foreground">
              Three singular addresses, selected for their architecture, atmosphere, and
              the way they make a place feel.
            </p>
            <Link
              href="/edit"
              className="group/link mt-6 inline-flex min-h-11 items-center gap-3 border-b border-brand-forest-deep/45 text-sm font-semibold text-brand-forest-deep transition-colors duration-200 hover:border-brand-brass hover:text-brand-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
            >
              Explore the full edit
              <ArrowRight
                aria-hidden="true"
                size={16}
                className="transition-transform duration-200 ease-luma group-hover/link:translate-x-1"
              />
            </Link>
          </div>
        </div>

        <ol className="-mx-5 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-5 [scrollbar-width:none] sm:-mx-10 sm:px-10 lg:mx-0 lg:mt-20 lg:grid lg:grid-cols-[minmax(0,1.35fr)_minmax(22rem,0.78fr)] lg:grid-rows-2 lg:gap-x-10 lg:gap-y-12 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
          {mockProperties.slice(0, 3).map((property, index) => (
            <li
              key={property.id}
              className={
                index === 0
                  ? "w-[86vw] max-w-[28rem] shrink-0 snap-center lg:row-span-2 lg:w-auto lg:max-w-none"
                  : "w-[86vw] max-w-[28rem] shrink-0 snap-center lg:w-auto lg:max-w-none"
              }
            >
              <PropertyCard property={property} index={index} featured={index === 0} />
            </li>
          ))}
        </ol>

        <p className="mt-3 flex items-center gap-3 font-mono text-[0.625rem] tracking-[0.12em] text-muted-foreground uppercase lg:hidden">
          <span className="h-px w-8 bg-brand-brass" aria-hidden="true" />
          Swipe to wander
        </p>
      </div>
    </section>
  );
}
