import { ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";

import { getStayQuery, roomSelectionSectionId } from "@/features/booking/lib/booking-flow";
import type {
  BookingDateRange,
  BookingGuests,
  BookingProperty,
} from "@/stores/booking-store";

export function IncompleteBookingState({
  property,
  dates,
  guests,
}: {
  property: BookingProperty | null;
  dates: BookingDateRange;
  guests: BookingGuests;
}) {
  const searchQuery = getStayQuery(property, dates, guests);
  const searchHref = `/search?${searchQuery}`;
  const propertyHref = property
    ? `/properties/${property.slug}?${searchQuery}#${roomSelectionSectionId}`
    : null;
  const hasDates = Boolean(dates.checkIn && dates.checkOut);
  const eyebrow = !property
    ? "No stay in progress"
    : !hasDates
      ? "Dates need attention"
      : "Room selection needed";
  const title = !property
    ? "Begin with a stay worth keeping."
    : !hasDates
      ? "Choose the nights before you continue."
      : `Choose a room at ${property.name}.`;
  const description = !property
    ? "This booking path is held only while you move through LumaStay. Start from search, then open a property and choose a room."
    : !hasDates
      ? "We have the property in hand, but a complete check-in and check-out range is required before the booking path can continue."
      : "Your property and stay dates are ready. Select one available room to continue the booking path.";
  const primaryHref = !property || !hasDates ? searchHref : propertyHref!;
  const primaryLabel = !property
    ? "Explore stays"
    : !hasDates
      ? "Choose dates"
      : "Choose a room";

  return (
    <section aria-labelledby="incomplete-booking-title" className="bg-brand-paper">
      <div className="container-luma py-[var(--space-section)]">
        <div className="grid border-y border-brand-forest-deep/22 lg:grid-cols-12">
          <div className="border-b border-brand-forest-deep/22 bg-brand-forest-deep px-5 py-8 text-brand-paper lg:col-span-3 lg:border-r lg:border-b-0 lg:px-7 lg:py-10">
            <p className="font-mono text-[0.625rem] tracking-[0.14em] text-brand-brass uppercase">
              Booking status
            </p>
            <p className="mt-4 max-w-[16rem] font-display text-3xl leading-[1.02] tracking-[-0.035em]">
              {eyebrow}
            </p>
          </div>

          <div className="px-5 py-10 sm:px-8 sm:py-14 lg:col-span-6 lg:px-12 lg:py-16">
            <h2
              id="incomplete-booking-title"
              className="max-w-[13ch] font-display text-[clamp(2.5rem,5vw,5.25rem)] leading-[0.94] font-medium tracking-[-0.05em] text-brand-forest-deep"
            >
              {title}
            </h2>
            <p className="mt-6 max-w-[37rem] text-base leading-7 text-foreground/72">
              {description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={primaryHref}
                className="group inline-flex min-h-12 items-center justify-between gap-5 rounded-full border border-brand-forest-deep bg-brand-forest-deep px-6 py-3 text-sm font-semibold text-brand-paper transition-colors duration-200 hover:bg-brand-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
              >
                {primaryLabel}
                <ArrowRight
                  aria-hidden="true"
                  size={16}
                  className="transition-transform duration-200 ease-luma group-hover:translate-x-0.5 motion-reduce:transition-none"
                />
              </Link>
              {property && propertyHref && primaryHref !== propertyHref ? (
                <Link
                  href={propertyHref}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-forest-deep/36 px-6 py-3 text-sm font-semibold text-brand-forest-deep transition-colors duration-200 hover:border-brand-forest-deep hover:bg-brand-linen focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
                >
                  Return to {property.name}
                </Link>
              ) : null}
            </div>
          </div>

          <div className="border-t border-brand-forest-deep/22 px-5 py-8 lg:col-span-3 lg:border-t-0 lg:border-l lg:px-7 lg:py-10">
            <p className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-stone uppercase">
              Why this happened
            </p>
            <p className="mt-4 text-sm leading-6 text-foreground/68">
              Booking data is memory-only in this prototype. Reloading the page
              clears the selected room by design.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
