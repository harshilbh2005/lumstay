"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bed,
  CalendarBlank,
  ForkKnife,
  MapPin,
  Ruler,
  UsersThree,
} from "@phosphor-icons/react";

import { useBookingStore } from "@/components/providers/booking-store-provider";
import { getMediaById } from "@/data/mock";
import { BookingFlowHeader } from "@/features/booking/components/booking-flow-header";
import { BookingPriceBreakdown } from "@/features/booking/components/booking-price-breakdown";
import { IncompleteBookingState } from "@/features/booking/components/incomplete-booking-state";
import {
  formatMoney,
  formatStayDate,
  getGuestLabel,
  getRoomLabel,
  getStayQuery,
  roomSelectionSectionId,
} from "@/features/booking/lib/booking-flow";
import { hasCompleteBookingPriceSummary } from "@/stores/booking-store";

export function BookingReview() {
  const property = useBookingStore((state) => state.property);
  const room = useBookingStore((state) => state.room);
  const dates = useBookingStore((state) => state.dates);
  const guests = useBookingStore((state) => state.guests);
  const priceSummary = useBookingStore((state) => state.priceSummary);
  const searchQuery = getStayQuery(property, dates, guests);

  if (
    !property ||
    !room ||
    !dates.checkIn ||
    !dates.checkOut ||
    !hasCompleteBookingPriceSummary(priceSummary)
  ) {
    return (
      <main id="main-content">
        <BookingFlowHeader
          activeStep={1}
          title="Review the shape of your stay."
          description="Check the room, dates, party, inclusions, cancellation terms, and complete mock total before guest details."
        />
        <IncompleteBookingState
          property={property}
          dates={dates}
          guests={guests}
        />
      </main>
    );
  }

  const media = getMediaById(room.mediaId ?? property.mediaId);
  const propertyHref = `/properties/${property.slug}?${searchQuery}#${roomSelectionSectionId}`;
  const searchHref = `/search?${searchQuery}`;
  const roomSubtotalLabel = `${formatMoney(priceSummary.nightlyRate)} × ${priceSummary.nightCount} ${
    priceSummary.nightCount === 1 ? "night" : "nights"
  } × ${priceSummary.roomCount} ${
    priceSummary.roomCount === 1 ? "room" : "rooms"
  }`;

  return (
    <main id="main-content">
      <BookingFlowHeader
        activeStep={1}
        title="Review the shape of your stay."
        description="Check the room, dates, party, inclusions, cancellation terms, and complete mock total before guest details."
      />

      <section aria-labelledby="stay-review-title" className="bg-brand-paper">
        <div className="container-luma py-[var(--space-section)]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-8">
            <article className="lg:col-span-8">
              <div className="flex flex-col gap-5 border-t border-brand-forest-deep/24 pt-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-brass-dark uppercase">
                    Selected stay
                  </p>
                  <h2
                    id="stay-review-title"
                    className="mt-3 font-display text-[clamp(2.75rem,5vw,5.25rem)] leading-[0.92] font-medium tracking-[-0.05em] text-brand-forest-deep"
                  >
                    {property.name}
                  </h2>
                  <p className="mt-3 flex items-center gap-2 text-sm text-foreground/68">
                    <MapPin
                      aria-hidden="true"
                      size={16}
                      className="text-brand-brass"
                    />
                    {property.location.region
                      ? `${property.location.region}, ${property.location.country}`
                      : `${property.location.city}, ${property.location.country}`}
                  </p>
                </div>
                <Link
                  href={propertyHref}
                  className="inline-flex min-h-11 w-fit items-center gap-2 rounded-sm px-2 text-sm font-semibold text-brand-forest-deep underline decoration-brand-brass/65 underline-offset-4 transition-colors duration-200 hover:text-brand-brass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
                >
                  <ArrowLeft aria-hidden="true" size={15} />
                  Change room
                </Link>
              </div>

              <div className="mt-8 grid gap-7 sm:grid-cols-12 sm:gap-x-7">
                <figure className="sm:col-span-5">
                  <div className="relative aspect-[4/3] overflow-hidden bg-brand-linen">
                    {media ? (
                      <Image
                        src={media.src}
                        alt={media.alt}
                        fill
                        sizes="(max-width: 639px) calc(100vw - 2.5rem), (max-width: 1023px) 40vw, 27vw"
                        className="object-cover"
                        style={{ objectPosition: media.focalPoint }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-brand-forest-deep" />
                    )}
                  </div>
                  <figcaption className="mt-3 flex items-center justify-between gap-4 font-mono text-[0.5625rem] tracking-[0.1em] text-brand-stone uppercase">
                    <span>Room study</span>
                    <span>{media?.title ?? property.name}</span>
                  </figcaption>
                </figure>

                <div className="sm:col-span-7">
                  <p className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-stone uppercase">
                    Your room
                  </p>
                  <h3 className="mt-3 font-display text-[clamp(2.25rem,4vw,4rem)] leading-[0.96] font-medium tracking-[-0.045em] text-brand-forest-deep">
                    {room.name}
                  </h3>
                  <dl className="mt-7 border-y border-brand-forest-deep/18">
                    <div className="border-b border-brand-forest-deep/18 py-3.5">
                      <dt className="flex items-center gap-3 font-mono text-[0.5625rem] tracking-[0.11em] text-brand-stone uppercase">
                        <Bed
                          aria-hidden="true"
                          size={17}
                          className="text-brand-brass"
                        />
                        Beds
                      </dt>
                      <dd className="mt-1 pl-7 text-sm leading-6 font-medium text-brand-forest-deep">
                        {room.bedConfiguration}
                      </dd>
                    </div>
                    <div className="border-b border-brand-forest-deep/18 py-3.5">
                      <dt className="flex items-center gap-3 font-mono text-[0.5625rem] tracking-[0.11em] text-brand-stone uppercase">
                        <Ruler
                          aria-hidden="true"
                          size={17}
                          className="text-brand-brass"
                        />
                        Room size
                      </dt>
                      <dd className="mt-1 pl-7 text-sm leading-6 font-medium text-brand-forest-deep">
                        {room.sizeSquareMetres} m²
                      </dd>
                    </div>
                    <div className="py-3.5">
                      <dt className="flex items-center gap-3 font-mono text-[0.5625rem] tracking-[0.11em] text-brand-stone uppercase">
                        <ForkKnife
                          aria-hidden="true"
                          size={17}
                          className="text-brand-brass"
                        />
                        Breakfast
                      </dt>
                      <dd className="mt-1 pl-7 text-sm leading-6 font-medium text-brand-forest-deep">
                        {room.breakfastIncluded
                          ? "Included in this room rate"
                          : "Available separately"}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <section
                aria-labelledby="stay-details-title"
                className="mt-12 border-t border-brand-forest-deep/24 pt-7 sm:mt-16"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-brass-dark uppercase">
                      Stay details
                    </p>
                    <h3
                      id="stay-details-title"
                      className="mt-3 font-display text-4xl leading-none tracking-[-0.04em] text-brand-forest-deep sm:text-5xl"
                    >
                      The practical shape.
                    </h3>
                  </div>
                  <Link
                    href={searchHref}
                    className="inline-flex min-h-11 w-fit items-center rounded-sm px-2 text-sm font-semibold text-brand-forest-deep underline decoration-brand-brass/65 underline-offset-4 transition-colors duration-200 hover:text-brand-brass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
                  >
                    Edit dates or guests
                  </Link>
                </div>

                <dl className="mt-8 grid border-y border-brand-forest-deep/18 sm:grid-cols-2">
                  <div className="border-b border-brand-forest-deep/18 py-5 sm:border-r sm:px-5 sm:first:pl-0">
                    <dt className="flex items-center gap-2 font-mono text-[0.5625rem] tracking-[0.11em] text-brand-stone uppercase">
                      <CalendarBlank
                        aria-hidden="true"
                        size={15}
                        className="text-brand-brass"
                      />
                      Check-in
                    </dt>
                    <dd className="mt-2 font-display text-2xl leading-tight tracking-[-0.025em] text-brand-forest-deep">
                      {formatStayDate(dates.checkIn)}
                    </dd>
                  </div>
                  <div className="border-b border-brand-forest-deep/18 py-5 sm:px-5 sm:last:pr-0">
                    <dt className="flex items-center gap-2 font-mono text-[0.5625rem] tracking-[0.11em] text-brand-stone uppercase">
                      <CalendarBlank
                        aria-hidden="true"
                        size={15}
                        className="text-brand-brass"
                      />
                      Check-out
                    </dt>
                    <dd className="mt-2 font-display text-2xl leading-tight tracking-[-0.025em] text-brand-forest-deep">
                      {formatStayDate(dates.checkOut)}
                    </dd>
                  </div>
                  <div className="border-b border-brand-forest-deep/18 py-5 sm:border-r sm:border-b-0 sm:px-5 sm:first:pl-0">
                    <dt className="flex items-center gap-2 font-mono text-[0.5625rem] tracking-[0.11em] text-brand-stone uppercase">
                      <UsersThree
                        aria-hidden="true"
                        size={15}
                        className="text-brand-brass"
                      />
                      Party
                    </dt>
                    <dd className="mt-2 text-base font-semibold text-brand-forest-deep">
                      {getGuestLabel(guests)} · {getRoomLabel(guests.rooms)}
                    </dd>
                    <dd className="mt-1 text-sm leading-6 text-foreground/64">
                      {guests.adults} {guests.adults === 1 ? "adult" : "adults"}
                      {guests.children > 0
                        ? ` · ${guests.children} ${
                            guests.children === 1 ? "child" : "children"
                          }`
                        : ""}
                    </dd>
                  </div>
                  <div className="py-5 sm:px-5 sm:last:pr-0">
                    <dt className="font-mono text-[0.5625rem] tracking-[0.11em] text-brand-stone uppercase">
                      Duration
                    </dt>
                    <dd className="mt-2 text-base font-semibold text-brand-forest-deep">
                      {priceSummary.nightCount}{" "}
                      {priceSummary.nightCount === 1 ? "night" : "nights"}
                    </dd>
                    <dd className="mt-1 text-sm leading-6 text-foreground/64">
                      Check-in and check-out times follow the property policy.
                    </dd>
                  </div>
                </dl>
              </section>

              <section
                aria-labelledby="cancellation-title"
                className="mt-12 border-t border-brand-forest-deep/24 pt-7 sm:mt-16"
              >
                <div className="grid gap-6 sm:grid-cols-12 sm:gap-x-7">
                  <div className="sm:col-span-4">
                    <p className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-brass-dark uppercase">
                      Cancellation
                    </p>
                    <h3
                      id="cancellation-title"
                      className="mt-3 scroll-mt-32 font-display text-4xl leading-none tracking-[-0.04em] text-brand-forest-deep"
                    >
                      {room.cancellationPolicy.label}
                    </h3>
                  </div>
                  <div className="border-l border-brand-brass/60 pl-5 sm:col-span-8 sm:pl-7">
                    <p className="text-base leading-7 font-medium text-brand-forest-deep">
                      {room.cancellationPolicy.summary}
                    </p>
                    <dl className="mt-5 border-y border-brand-forest-deep/18">
                      {priceSummary.cancellationCharges.map((charge) => (
                        <div
                          key={charge.timing}
                          className="grid grid-cols-[minmax(0,1fr)_auto] gap-5 border-b border-brand-forest-deep/18 py-4 last:border-b-0"
                        >
                          <dt>
                            <span className="block text-sm font-medium text-brand-forest-deep">
                              {charge.timing}
                            </span>
                            <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                              {charge.chargeBasisPoints / 100}% of the room
                              subtotal
                            </span>
                          </dt>
                          <dd className="font-mono text-sm font-medium text-brand-forest-deep tabular-nums">
                            {charge.chargeBasisPoints === 0
                              ? "No charge"
                              : formatMoney(charge.amount)}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <p className="mt-4 text-sm leading-6 text-foreground/64">
                      These prototype charges exclude estimated taxes and the
                      Luma service fee. No inventory is held and no binding
                      cancellation clock is running.
                    </p>
                  </div>
                </div>
              </section>
            </article>

            <aside
              aria-labelledby="review-price-title"
              className="lg:col-span-4"
            >
              <div className="border-y border-brand-brass/48 bg-brand-forest-deep px-5 py-7 text-brand-paper sm:px-7 sm:py-8 lg:sticky lg:top-[7.5rem]">
                <BookingPriceBreakdown
                  headingLevel={2}
                  idPrefix="review"
                  presentation="feature"
                  priceSummary={priceSummary}
                  property={property}
                  room={room}
                  roomSubtotalLabel={roomSubtotalLabel}
                />

                <Link
                  href="/booking/guest-details"
                  aria-describedby="guest-details-status"
                  className="group mt-4 inline-flex min-h-12 w-full items-center justify-between gap-5 rounded-full border border-brand-paper bg-brand-paper px-6 py-3 text-sm font-semibold text-brand-forest-deep transition-colors duration-200 hover:bg-brand-linen focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass focus-visible:ring-offset-4 focus-visible:ring-offset-brand-forest-deep"
                >
                  Continue to guest details
                  <ArrowRight
                    aria-hidden="true"
                    size={16}
                    className="transition-transform duration-200 ease-luma group-hover:translate-x-0.5 motion-reduce:transition-none"
                  />
                </Link>
                <p
                  id="guest-details-status"
                  className="mt-3 text-xs leading-5 text-brand-paper/52"
                >
                  Add the lead guest and booking contact details next. No
                  reservation or charge is created on that step.
                </p>
              </div>
            </aside>
          </div>

          <p className="mt-12 max-w-[58rem] border-l border-brand-brass/65 pl-4 text-xs leading-5 text-muted-foreground">
            Prototype review only. Rates, room availability, the displayed tax
            and fee model, cancellation charges, and reservation status are
            deterministic interface fixtures rather than live terms. The
            selected room remains in memory while you navigate and clears on
            reload.
          </p>
        </div>
      </section>
    </main>
  );
}
