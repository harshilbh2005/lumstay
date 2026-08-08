"use client";

import { format, parseISO } from "date-fns";
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
import { getSearchIntentQueryString } from "@/features/search/lib/search-context";
import type {
  BookingDateRange,
  BookingGuests,
  BookingProperty,
} from "@/stores/booking-store";
import type { Money } from "@/types/domain";

const roomSelectionSectionId = "casa-serein-room-selection";

const bookingSteps = [
  { number: "01", label: "Review", detail: "Your stay" },
  { number: "02", label: "Guest details", detail: "Next" },
  { number: "03", label: "Payment", detail: "Later" },
  { number: "04", label: "Confirm", detail: "Final" },
] as const;

function formatMoney(money: Money) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: money.currency,
    maximumFractionDigits: 0,
  }).format(money.amount);
}

function formatStayDate(date: string) {
  return format(parseISO(date), "EEE, dd MMM yyyy");
}

function getGuestLabel(guests: BookingGuests) {
  const guestCount = guests.adults + guests.children;

  return `${guestCount} ${guestCount === 1 ? "guest" : "guests"}`;
}

function getRoomLabel(roomCount: number) {
  return `${roomCount} ${roomCount === 1 ? "room" : "rooms"}`;
}

function getStayQuery(
  property: BookingProperty | null,
  dates: BookingDateRange,
  guests: BookingGuests,
) {
  return getSearchIntentQueryString({
    destination: property
      ? `${property.location.city}, ${property.location.country}`
      : "",
    checkIn: dates.checkIn ?? "",
    checkOut: dates.checkOut ?? "",
    adults: guests.adults,
    children: guests.children,
    rooms: guests.rooms,
  });
}

function BookingReviewHeader() {
  return (
    <section className="border-b border-brand-forest-deep/18 bg-brand-linen">
      <div className="container-luma py-12 sm:py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-3">
            <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-brand-stone uppercase">
              <span className="mr-3 text-brand-brass">Booking</span>
              Step 01
            </p>
          </div>

          <div className="lg:col-span-6">
            <h1 className="max-w-[12ch] font-display text-[clamp(3rem,6.4vw,6.5rem)] leading-[0.9] font-medium tracking-[-0.055em] text-brand-forest-deep">
              Review the shape of your stay.
            </h1>
          </div>

          <div className="lg:col-span-3 lg:pt-1">
            <p className="max-w-[28rem] text-base leading-7 text-foreground/72">
              Check the room, dates, party, and provisional accommodation
              subtotal before guest details.
            </p>
          </div>
        </div>

        <ol
          aria-label="Booking progress"
          className="mt-10 grid grid-cols-2 border-t border-brand-forest-deep/22 sm:mt-14 sm:grid-cols-4"
        >
          {bookingSteps.map((step, index) => (
            <li
              key={step.number}
              aria-current={index === 0 ? "step" : undefined}
              className={`grid min-h-20 grid-cols-[auto_1fr] content-center gap-x-3 border-b border-brand-forest-deep/22 px-3 py-4 sm:min-h-24 sm:border-b-0 sm:border-r sm:px-4 sm:last:border-r-0 ${
                index % 2 === 0 ? "border-r" : ""
              } ${index === 0 ? "bg-brand-forest-deep text-brand-paper" : ""}`}
            >
              <span
                className={`font-mono text-[0.625rem] tracking-[0.12em] uppercase ${
                  index === 0 ? "text-brand-brass" : "text-brand-stone"
                }`}
              >
                {step.number}
              </span>
              <span>
                <span className="block text-sm font-semibold">{step.label}</span>
                <span
                  className={`mt-1 block font-mono text-[0.5625rem] tracking-[0.1em] uppercase ${
                    index === 0 ? "text-brand-paper/52" : "text-brand-stone"
                  }`}
                >
                  {step.detail}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function IncompleteBookingReview({
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
    ? "No stay in review"
    : !hasDates
      ? "Dates need attention"
      : "Room selection needed";
  const title = !property
    ? "Begin with a stay worth keeping."
    : !hasDates
      ? "Choose the nights before you review."
      : `Choose a room at ${property.name}.`;
  const description = !property
    ? "This review is held only while you move through LumaStay. Start from search, then open a property and choose a room."
    : !hasDates
      ? "We have the property in hand, but a complete check-in and check-out range is required to calculate the accommodation subtotal."
      : "Your property and stay dates are ready. Select one available room to complete this review.";
  const primaryHref = !property || !hasDates ? searchHref : propertyHref!;
  const primaryLabel = !property
    ? "Explore stays"
    : !hasDates
      ? "Choose dates"
      : "Choose a room";

  return (
    <section
      aria-labelledby="incomplete-review-title"
      className="bg-brand-paper"
    >
      <div className="container-luma py-[var(--space-section)]">
        <div className="grid border-y border-brand-forest-deep/22 lg:grid-cols-12">
          <div className="border-b border-brand-forest-deep/22 bg-brand-forest-deep px-5 py-8 text-brand-paper lg:col-span-3 lg:border-r lg:border-b-0 lg:px-7 lg:py-10">
            <p className="font-mono text-[0.625rem] tracking-[0.14em] text-brand-brass uppercase">
              Review status
            </p>
            <p className="mt-4 max-w-[16rem] font-display text-3xl leading-[1.02] tracking-[-0.035em]">
              {eyebrow}
            </p>
          </div>

          <div className="px-5 py-10 sm:px-8 sm:py-14 lg:col-span-6 lg:px-12 lg:py-16">
            <h2
              id="incomplete-review-title"
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
              Booking review data is memory-only in this prototype. Reloading
              the page clears the selected room by design.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

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
    !priceSummary.nightlyRate ||
    !priceSummary.nightCount ||
    !priceSummary.accommodationSubtotal
  ) {
    return (
      <main id="main-content">
        <BookingReviewHeader />
        <IncompleteBookingReview
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
      <BookingReviewHeader />

      <section aria-labelledby="stay-review-title" className="bg-brand-paper">
        <div className="container-luma py-[var(--space-section)]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-8">
            <article className="lg:col-span-8">
              <div className="flex flex-col gap-5 border-t border-brand-forest-deep/24 pt-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-brass uppercase">
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
                    <div className="grid grid-cols-[1.75rem_1fr] gap-3 border-b border-brand-forest-deep/18 py-3.5">
                      <Bed
                        aria-hidden="true"
                        size={17}
                        className="mt-0.5 text-brand-brass"
                      />
                      <div>
                        <dt className="font-mono text-[0.5625rem] tracking-[0.11em] text-brand-stone uppercase">
                          Beds
                        </dt>
                        <dd className="mt-1 text-sm leading-6 font-medium text-brand-forest-deep">
                          {room.bedConfiguration}
                        </dd>
                      </div>
                    </div>
                    <div className="grid grid-cols-[1.75rem_1fr] gap-3 border-b border-brand-forest-deep/18 py-3.5">
                      <Ruler
                        aria-hidden="true"
                        size={17}
                        className="mt-0.5 text-brand-brass"
                      />
                      <div>
                        <dt className="font-mono text-[0.5625rem] tracking-[0.11em] text-brand-stone uppercase">
                          Room size
                        </dt>
                        <dd className="mt-1 text-sm leading-6 font-medium text-brand-forest-deep">
                          {room.sizeSquareMetres} m²
                        </dd>
                      </div>
                    </div>
                    <div className="grid grid-cols-[1.75rem_1fr] gap-3 py-3.5">
                      <ForkKnife
                        aria-hidden="true"
                        size={17}
                        className="mt-0.5 text-brand-brass"
                      />
                      <div>
                        <dt className="font-mono text-[0.5625rem] tracking-[0.11em] text-brand-stone uppercase">
                          Breakfast
                        </dt>
                        <dd className="mt-1 text-sm leading-6 font-medium text-brand-forest-deep">
                          {room.breakfastIncluded
                            ? "Included in this room rate"
                            : "Available separately"}
                        </dd>
                      </div>
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
                    <p className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-brass uppercase">
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
                    <p className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-brass uppercase">
                      Cancellation
                    </p>
                    <h3
                      id="cancellation-title"
                      className="mt-3 font-display text-4xl leading-none tracking-[-0.04em] text-brand-forest-deep"
                    >
                      {room.cancellationPolicy.label}
                    </h3>
                  </div>
                  <div className="border-l border-brand-brass/60 pl-5 sm:col-span-8 sm:pl-7">
                    <p className="text-base leading-7 font-medium text-brand-forest-deep">
                      {room.cancellationPolicy.summary}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-foreground/64">
                      Full cancellation charges and binding terms are reviewed
                      before payment. This interface does not hold inventory.
                    </p>
                  </div>
                </div>
              </section>
            </article>

            <aside
              aria-labelledby="price-summary-title"
              className="lg:col-span-4"
            >
              <div className="border-y border-brand-brass/48 bg-brand-forest-deep px-5 py-7 text-brand-paper sm:px-7 sm:py-8 lg:sticky lg:top-[7.5rem]">
                <p className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-brass uppercase">
                  Provisional price
                </p>
                <h2
                  id="price-summary-title"
                  className="mt-3 max-w-[10ch] font-display text-[clamp(2.5rem,4vw,4.5rem)] leading-[0.94] tracking-[-0.045em]"
                >
                  Accommodation only.
                </h2>

                <dl className="mt-8 border-t border-brand-paper/18">
                  <div className="grid grid-cols-[1fr_auto] gap-5 border-b border-brand-paper/18 py-4">
                    <dt>
                      <span className="block text-sm font-semibold text-brand-paper">
                        Room subtotal
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-brand-paper/58">
                        {roomSubtotalLabel}
                      </span>
                    </dt>
                    <dd className="font-mono text-sm font-medium text-brand-paper tabular-nums">
                      {formatMoney(priceSummary.accommodationSubtotal)}
                    </dd>
                  </div>
                  <div className="grid grid-cols-[1fr_auto] gap-5 border-b border-brand-paper/18 py-4 text-sm">
                    <dt className="text-brand-paper/68">Taxes and fees</dt>
                    <dd className="font-mono text-xs tracking-[0.06em] text-brand-brass uppercase">
                      Not calculated
                    </dd>
                  </div>
                  <div className="grid grid-cols-[1fr_auto] items-end gap-5 py-5">
                    <dt>
                      <span className="block font-display text-2xl tracking-[-0.025em]">
                        Accommodation subtotal
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-brand-paper/52">
                        No charge is made on this step.
                      </span>
                    </dt>
                    <dd className="font-mono text-xl font-medium text-brand-paper tabular-nums">
                      {formatMoney(priceSummary.accommodationSubtotal)}
                    </dd>
                  </div>
                </dl>

                <button
                  type="button"
                  disabled
                  aria-describedby="guest-details-status"
                  className="mt-4 inline-flex min-h-12 w-full cursor-not-allowed items-center justify-between gap-5 rounded-full border border-brand-paper/28 bg-brand-paper/10 px-6 py-3 text-sm font-semibold text-brand-paper/58"
                >
                  Continue to guest details
                  <ArrowRight aria-hidden="true" size={16} />
                </button>
                <p
                  id="guest-details-status"
                  className="mt-3 text-xs leading-5 text-brand-paper/52"
                >
                  Guest details are the next interface step and are not
                  collected on this review page.
                </p>
              </div>
            </aside>
          </div>

          <p className="mt-12 max-w-[58rem] border-l border-brand-brass/65 pl-4 text-xs leading-5 text-muted-foreground">
            Prototype review only. Rates, room availability, taxes, fees,
            cancellation calculations, and reservation status are not live.
            The selected room remains in memory while you navigate and clears
            on reload.
          </p>
        </div>
      </section>
    </main>
  );
}
