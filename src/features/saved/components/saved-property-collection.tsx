"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowCounterClockwise,
  ArrowRight,
  HeartBreak,
  Star,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";

import { useSavedStaysStore } from "@/features/saved";
import { cn } from "@/lib/utils";

import type {
  SavedEmptyStateMedia,
  SavedPropertyEntry,
} from "../types";

const priceFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

interface PendingFocus {
  id: string;
  delay: number;
  allowedSourceId?: string;
}

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
  onRemove,
}: {
  property: SavedPropertyEntry;
  index: number;
  onRemove: (property: SavedPropertyEntry, index: number) => void;
}) {
  const propertyHref = `/properties/${property.slug}`;
  const imageOnRight = index % 2 === 1;

  return (
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
              loading={index === 0 ? "eager" : "lazy"}
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

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <button
              id={`remove-saved-${property.id}`}
              type="button"
              onClick={() => onRemove(property, index)}
              className="group/remove inline-flex min-h-11 items-center gap-2 rounded-sm font-mono text-[0.625rem] tracking-[0.12em] text-brand-stone uppercase transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-brand-linen active:translate-y-px motion-reduce:transition-none"
            >
              <HeartBreak
                aria-hidden="true"
                size={15}
                className="transition-transform duration-200 ease-luma group-hover/remove:-rotate-6 motion-reduce:transition-none"
              />
              Remove
            </button>

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
      </div>
    </article>
  );
}

function SavedRemovalNotice({
  propertyName,
  toastId,
  onUndo,
}: {
  propertyName: string;
  toastId: number | string;
  onUndo: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 360, damping: 28 }}
      className="luma-save-notice relative grid min-h-[4.75rem] w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 overflow-hidden rounded-[1.1rem] border border-white/14 px-3.5 py-3 text-brand-paper"
    >
      <span className="flex size-11 items-center justify-center rounded-full border border-white/14 bg-white/8 text-brand-paper/72 shadow-[inset_0_1px_0_rgb(255_255_255/0.12)]">
        <HeartBreak aria-hidden="true" size={19} />
      </span>

      <span className="min-w-0">
        <span className="block font-mono text-[0.5625rem] tracking-[0.14em] text-brand-paper/56 uppercase">
          Removed from your Luma list
        </span>
        <span className="mt-1 block truncate text-[0.9375rem] leading-none font-semibold tracking-[0.01em]">
          {propertyName}
        </span>
      </span>

      <button
        type="button"
        aria-label={`Undo removal of ${propertyName}`}
        onClick={() => {
          onUndo();
          toast.dismiss(toastId);
        }}
        className="group/undo flex min-h-11 items-center gap-2 rounded-full border border-white/16 bg-white/8 px-3.5 text-xs font-semibold text-brand-paper/88 transition-[background-color,border-color,color] duration-200 hover:border-brand-brass/48 hover:bg-white/12 hover:text-brand-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass"
      >
        <ArrowCounterClockwise
          aria-hidden="true"
          size={15}
          className="transition-transform duration-200 ease-luma group-hover/undo:-rotate-12 motion-reduce:transition-none"
        />
        Undo
      </button>

      <motion.span
        aria-hidden="true"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 6.4, ease: "linear" }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-brand-brass"
      />
    </motion.div>
  );
}

function SavedCollectionEmptyState({
  media,
}: {
  media: SavedEmptyStateMedia | null;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="border-y border-brand-forest-deep/16 py-10 sm:py-14 lg:py-16"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-x-8">
        <div className="flex min-w-0 flex-col justify-between lg:col-start-8 lg:col-span-5 lg:row-start-1">
          <div>
            <p className="flex items-center gap-3 font-mono text-[0.625rem] tracking-[0.14em] text-brand-brass-dark uppercase">
              <span aria-hidden="true">00</span>
              <span className="h-px w-6 bg-brand-brass" aria-hidden="true" />
              Nothing held yet
            </p>
            <h3 className="mt-5 max-w-[10ch] text-[clamp(2.85rem,6vw,5.75rem)] leading-[0.89] font-bold tracking-[-0.055em] text-brand-forest-deep">
              Your next place is still out there.
            </h3>
            <p className="mt-6 max-w-[34rem] text-base leading-7 text-foreground/70 sm:text-lg sm:leading-8">
              Browse the Luma edit and use the heart on any stay. It will
              return here, privately saved to this browser.
            </p>
          </div>

          <Link
            id="saved-empty-browse"
            href="/search"
            className="group/empty-cta mt-9 inline-flex min-h-12 w-fit items-center gap-3 rounded-full bg-brand-forest-deep px-5 text-sm font-semibold text-brand-paper transition-[background-color,transform] duration-200 hover:bg-brand-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-brand-linen active:translate-y-px motion-reduce:transition-none lg:mt-12"
          >
            Find a stay to save
            <ArrowRight
              aria-hidden="true"
              size={16}
              className="transition-transform duration-200 ease-luma group-hover/empty-cta:translate-x-1 motion-reduce:transition-none"
            />
          </Link>
        </div>

        {media ? (
          <figure className="min-w-0 lg:col-span-6 lg:row-start-1">
            <div className="relative aspect-[4/3] overflow-hidden bg-brand-forest-deep/8 sm:aspect-[7/5] lg:h-full lg:min-h-[34rem] lg:aspect-auto">
              <Image
                fill
                src={media.src}
                alt={media.alt}
                sizes="(max-width: 1023px) calc(100vw - 2.5rem), 48vw"
                loading="eager"
                className="object-cover"
                style={{ objectPosition: media.focalPoint }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-brand-forest-deep/20 via-transparent to-transparent"
              />
            </div>
            <figcaption className="mt-3 flex items-start justify-between gap-4 font-mono text-[0.625rem] leading-5 tracking-[0.11em] text-brand-stone uppercase">
              <span>{media.title}</span>
              <span className="text-right">From the Luma atlas</span>
            </figcaption>
          </figure>
        ) : null}
      </div>
    </motion.div>
  );
}

export function SavedPropertyCollection({
  properties,
  emptyStateMedia,
}: {
  properties: readonly SavedPropertyEntry[];
  emptyStateMedia: SavedEmptyStateMedia | null;
}) {
  const hydrationStatus = useSavedStaysStore(
    (state) => state.hydrationStatus,
  );
  const savedPropertyIds = useSavedStaysStore(
    (state) => state.savedPropertyIds,
  );
  const removeSavedStay = useSavedStaysStore(
    (state) => state.removeSavedStay,
  );
  const restoreSavedStay = useSavedStaysStore(
    (state) => state.restoreSavedStay,
  );
  const [pendingFocus, setPendingFocus] = useState<PendingFocus | null>(null);
  const propertyById = useMemo(
    () => new Map(properties.map((property) => [property.id, property])),
    [properties],
  );
  const savedProperties = savedPropertyIds.flatMap((propertyId) => {
    const property = propertyById.get(propertyId);
    return property ? [property] : [];
  });
  const isHydrated = hydrationStatus === "hydrated";
  const countLabel = `${String(savedProperties.length).padStart(2, "0")} ${
    savedProperties.length === 1 ? "stay" : "stays"
  }`;

  useEffect(() => {
    if (!pendingFocus) {
      return;
    }

    let animationFrame = 0;
    const timeout = window.setTimeout(() => {
      animationFrame = window.requestAnimationFrame(() => {
        const activeElement = document.activeElement;
        const focusStillBelongsToInteraction =
          activeElement === document.body ||
          activeElement?.id === pendingFocus.allowedSourceId ||
          activeElement?.closest("[data-sonner-toast]");

        if (focusStillBelongsToInteraction) {
          document.getElementById(pendingFocus.id)?.focus();
        }

        setPendingFocus(null);
      });
    }, pendingFocus.delay);

    return () => {
      window.clearTimeout(timeout);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [pendingFocus, savedPropertyIds]);

  function handleRemove(property: SavedPropertyEntry, index: number) {
    const nextFocusProperty =
      savedProperties[index + 1] ?? savedProperties[index - 1];
    const savedPropertyIndex = savedPropertyIds.indexOf(property.id);
    const nextFocusId = nextFocusProperty
      ? `remove-saved-${nextFocusProperty.id}`
      : "saved-empty-browse";

    setPendingFocus({
      id: nextFocusId,
      delay: 0,
      allowedSourceId: `remove-saved-${property.id}`,
    });
    removeSavedStay(property.id);

    toast.custom(
      (toastId) => (
        <SavedRemovalNotice
          propertyName={property.name}
          toastId={toastId}
          onUndo={() => {
            setPendingFocus({
              id: `remove-saved-${property.id}`,
              delay: 360,
              allowedSourceId: nextFocusId,
            });
            restoreSavedStay(property.id, savedPropertyIndex);
          }}
        />
      ),
      {
        id: "saved-collection-removal",
        duration: 6400,
        position: "top-center",
        unstyled: true,
      },
    );
  }

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

        {isHydrated ? (
          <>
            <ol
              className={cn(
                "relative",
                savedProperties.length > 0 &&
                  "border-t border-brand-forest-deep/16",
              )}
            >
              {savedProperties.map((property, index) => (
                <motion.li
                  key={property.id}
                  layout="position"
                  transition={{
                    layout: {
                      duration: 0.22,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }}
                  className="border-b border-brand-forest-deep/16"
                >
                  <SavedPropertyRow
                    property={property}
                    index={index}
                    onRemove={handleRemove}
                  />
                </motion.li>
              ))}
            </ol>

            <AnimatePresence initial={false}>
              {savedProperties.length === 0 ? (
                <SavedCollectionEmptyState media={emptyStateMedia} />
              ) : null}
            </AnimatePresence>
          </>
        ) : null}
      </div>
    </section>
  );
}
