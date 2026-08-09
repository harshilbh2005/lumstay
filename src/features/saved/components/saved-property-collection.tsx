"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "@phosphor-icons/react";

import { useSavedStaysStore } from "@/features/saved";
import { cn } from "@/lib/utils";

import type { SavedPropertyEntry } from "../types";

const priceFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

function SavedCollectionSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="border-t border-brand-forest-deep/16"
    >
      {[0, 1].map((index) => (
        <div
          key={index}
          className="grid gap-7 border-b border-brand-forest-deep/16 py-10 sm:py-14 lg:grid-cols-12 lg:items-center lg:gap-x-8 lg:py-20"
        >
          <div
            className={cn(
              "aspect-[16/10] animate-pulse bg-brand-forest-deep/8 sm:aspect-[7/5] lg:row-start-1",
              index % 2 === 0
                ? "lg:col-span-7"
                : "lg:col-start-6 lg:col-span-7",
            )}
          />
          <div
            className={cn(
              "lg:row-start-1",
              index % 2 === 0
                ? "lg:col-start-9 lg:col-span-4"
                : "lg:col-span-4",
            )}
          >
            <div className="h-3 w-36 animate-pulse bg-brand-forest-deep/8" />
            <div className="mt-6 h-11 w-4/5 animate-pulse bg-brand-forest-deep/8 sm:h-14" />
            <div className="mt-7 space-y-2.5">
              <div className="h-3 w-full animate-pulse bg-brand-forest-deep/8" />
              <div className="h-3 w-11/12 animate-pulse bg-brand-forest-deep/8" />
              <div className="h-3 w-3/5 animate-pulse bg-brand-forest-deep/8" />
            </div>
            <div className="mt-8 h-16 animate-pulse border-y border-brand-forest-deep/10 bg-brand-paper/35" />
          </div>
        </div>
      ))}
    </div>
  );
}

function SavedPropertyRow({
  property,
  index,
}: {
  property: SavedPropertyEntry;
  index: number;
}) {
  const propertyHref = `/properties/${property.slug}`;
  const imageOnRight = index % 2 === 1;

  return (
    <li className="border-b border-brand-forest-deep/16">
      <article className="grid gap-7 py-10 sm:py-14 lg:grid-cols-12 lg:items-center lg:gap-x-8 lg:py-20">
        <figure
          className={cn(
            "min-w-0 lg:row-start-1",
            imageOnRight
              ? "lg:col-start-6 lg:col-span-7"
              : "lg:col-span-7",
          )}
        >
          <Link
            href={propertyHref}
            prefetch={false}
            aria-label={`View ${property.name}`}
            className="group/image block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-brand-linen"
          >
            <span className="relative block aspect-[16/10] overflow-hidden bg-brand-forest-deep/8 sm:aspect-[7/5]">
              <Image
                fill
                src={property.media.src}
                alt={property.media.alt}
                sizes="(max-width: 1023px) calc(100vw - 2.5rem), 55vw"
                fetchPriority={index === 0 ? "high" : "auto"}
                className="object-cover transition-transform duration-500 ease-luma group-hover/image:scale-[1.018] motion-reduce:transition-none"
                style={{ objectPosition: property.media.focalPoint }}
              />
            </span>
          </Link>
          <figcaption className="mt-3 flex items-start justify-between gap-4 font-mono text-[0.625rem] leading-5 tracking-[0.11em] text-brand-stone uppercase">
            <span>{property.location.city}</span>
            <span className="text-right">Held in your Luma list</span>
          </figcaption>
        </figure>

        <div
          className={cn(
            "min-w-0 lg:row-start-1",
            imageOnRight
              ? "lg:col-span-4"
              : "lg:col-start-9 lg:col-span-4",
          )}
        >
          <div className="flex items-center justify-between gap-5 border-b border-brand-forest-deep/16 pb-4 font-mono text-[0.625rem] tracking-[0.12em] text-brand-stone uppercase">
            <span>{String(index + 1).padStart(2, "0")} / Saved</span>
            <span className="flex items-center gap-1.5 text-foreground">
              <Star aria-hidden="true" size={11} weight="fill" />
              {property.rating.toFixed(2)}
              <span className="text-brand-stone">
                · {property.reviewCount} notes
              </span>
            </span>
          </div>

          <Link
            href={propertyHref}
            prefetch={false}
            className="mt-5 inline-flex min-h-11 w-fit items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-brand-linen"
          >
            <h3 className="text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[0.9] font-bold tracking-[-0.055em] text-brand-forest-deep">
              {property.name}
            </h3>
          </Link>

          <p className="mt-5 max-w-[46ch] text-base leading-7 text-foreground/70">
            {property.description}
          </p>

          <dl className="mt-7 grid grid-cols-2 border-y border-brand-forest-deep/16">
            <div className="py-4 pr-4">
              <dt className="font-mono text-[0.625rem] tracking-[0.12em] text-brand-stone uppercase">
                The feeling
              </dt>
              <dd className="mt-2 text-sm leading-6 text-foreground/78">
                {property.atmosphere.slice(0, 2).join(" · ")}
              </dd>
            </div>
            <div className="border-l border-brand-forest-deep/16 py-4 pl-4">
              <dt className="font-mono text-[0.625rem] tracking-[0.12em] text-brand-stone uppercase">
                Worth knowing
              </dt>
              <dd className="mt-2 text-sm leading-6 text-foreground/78">
                {property.facilities.slice(0, 2).join(" · ")}
              </dd>
            </div>
          </dl>

          <div className="mt-7 flex flex-wrap items-end justify-between gap-5">
            <p className="text-sm text-brand-stone">
              <span className="mb-1 block font-mono text-[0.625rem] tracking-[0.12em] uppercase">
                From
              </span>
              <span className="font-mono text-base font-medium text-foreground tabular-nums">
                ₹{priceFormatter.format(property.priceFrom.amount)}
              </span>{" "}
              / night
            </p>

            <Link
              href={propertyHref}
              prefetch={false}
              className="group/link inline-flex min-h-11 items-center gap-3 border-b border-brand-forest-deep/45 text-sm font-semibold text-brand-forest-deep transition-colors duration-200 hover:border-brand-brass hover:text-brand-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-brand-linen active:translate-y-px motion-reduce:transition-none"
            >
              View the stay
              <ArrowRight
                aria-hidden="true"
                size={16}
                className="transition-transform duration-200 ease-luma group-hover/link:translate-x-1 motion-reduce:transition-none"
              />
            </Link>
          </div>
        </div>
      </article>
    </li>
  );
}

export function SavedPropertyCollection({
  properties,
}: {
  properties: readonly SavedPropertyEntry[];
}) {
  const hydrationStatus = useSavedStaysStore(
    (state) => state.hydrationStatus,
  );
  const savedPropertyIds = useSavedStaysStore(
    (state) => state.savedPropertyIds,
  );
  const propertyById = new Map(
    properties.map((property) => [property.id, property]),
  );
  const savedProperties = savedPropertyIds.flatMap((propertyId) => {
    const property = propertyById.get(propertyId);
    return property ? [property] : [];
  });
  const isHydrated = hydrationStatus === "hydrated";
  const countLabel = `${String(savedProperties.length).padStart(2, "0")} ${
    savedProperties.length === 1 ? "stay" : "stays"
  }`;

  return (
    <section
      aria-labelledby="saved-collection-heading"
      aria-busy={!isHydrated}
      className="bg-brand-linen py-16 sm:py-20 lg:py-28"
    >
      <div className="container-luma">
        <header className="grid gap-5 pb-8 sm:grid-cols-[1fr_auto] sm:items-end sm:pb-10">
          <div>
            <p className="font-mono text-[0.6875rem] tracking-[0.15em] text-brand-stone uppercase">
              Your collection
            </p>
            <h2
              id="saved-collection-heading"
              className="mt-3 text-[clamp(2.5rem,4.5vw,4.75rem)] leading-[0.94] font-bold tracking-[-0.045em] text-brand-forest-deep"
            >
              The stays you kept.
            </h2>
          </div>
          <p
            aria-live="polite"
            className="font-mono text-[0.6875rem] tracking-[0.14em] text-brand-stone uppercase sm:pb-1 sm:text-right"
          >
            {isHydrated ? countLabel : "Reading your list"}
          </p>
        </header>

        {!isHydrated ? <SavedCollectionSkeleton /> : null}

        {isHydrated && savedProperties.length > 0 ? (
          <ol className="border-t border-brand-forest-deep/16">
            {savedProperties.map((property, index) => (
              <SavedPropertyRow
                key={property.id}
                property={property}
                index={index}
              />
            ))}
          </ol>
        ) : null}

        {isHydrated && savedProperties.length === 0 ? (
          <div className="grid gap-6 border-y border-brand-forest-deep/16 py-10 sm:grid-cols-[1fr_auto] sm:items-center sm:py-12">
            <div>
              <h3 className="text-2xl font-bold tracking-[-0.035em] text-brand-forest-deep">
                Nothing saved yet.
              </h3>
              <p className="mt-2 max-w-xl text-base leading-7 text-foreground/68">
                Keep a stay from the Luma edit and it will appear here on this
                browser.
              </p>
            </div>
            <Link
              href="/search"
              className="group/link inline-flex min-h-11 w-fit items-center gap-3 border-b border-brand-forest-deep/45 text-sm font-semibold text-brand-forest-deep transition-colors duration-200 hover:border-brand-brass hover:text-brand-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-brand-linen motion-reduce:transition-none"
            >
              Browse the stays
              <ArrowRight
                aria-hidden="true"
                size={16}
                className="transition-transform duration-200 ease-luma group-hover/link:translate-x-1 motion-reduce:transition-none"
              />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
