"use client";

import {
  ArrowRight,
  Bed,
  CalendarBlank,
  CheckCircle,
  CreditCard,
  EnvelopeSimple,
  ForkKnife,
  MapPin,
  Ruler,
  UsersThree,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

import { useBookingStore } from "@/components/providers/booking-store-provider";
import { getMediaById } from "@/data/mock";
import { BookingFlowHeader } from "@/features/booking/components/booking-flow-header";
import { BookingPriceBreakdown } from "@/features/booking/components/booking-price-breakdown";
import {
  formatMoney,
  formatStayDate,
  getGuestLabel,
  getRoomLabel,
  getStayQuery,
  hasCompleteGuestDetails,
} from "@/features/booking/lib/booking-flow";
import { hasCompleteBookingPriceSummary } from "@/stores/booking-store";

export function BookingConfirmation() {
  const confirmation = useBookingStore((state) => state.confirmation);
  const property = useBookingStore((state) => state.property);
  const room = useBookingStore((state) => state.room);
  const dates = useBookingStore((state) => state.dates);
  const guestDetails = useBookingStore((state) => state.guestDetails);
  const priceSummary = useBookingStore((state) => state.priceSummary);
  const canReturnToPayment = Boolean(
    property &&
      room &&
      dates.checkIn &&
      dates.checkOut &&
      hasCompleteBookingPriceSummary(priceSummary) &&
      hasCompleteGuestDetails(guestDetails),
  );

  if (!confirmation) {
    return (
      <main id="main-content" tabIndex={-1}>
        <BookingFlowHeader
          activeStep={4}
          completedThrough={canReturnToPayment ? 2 : 0}
          title="Keep the stay in view."
          description="A mock itinerary appears here only after a prepared test payment creates it in this browser session."
        />

        <section aria-labelledby="missing-confirmation-title" className="bg-brand-paper">
          <div className="container-luma py-[var(--space-section)]">
            <div className="grid gap-8 border-y border-brand-forest-deep/24 py-8 sm:py-10 lg:grid-cols-12 lg:gap-x-8">
              <div className="lg:col-span-3">
                <p className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-brass-dark uppercase">
                  Session record
                </p>
              </div>
              <div className="lg:col-span-5">
                <h2
                  id="missing-confirmation-title"
                  className="max-w-[11ch] font-display text-[clamp(2.75rem,5vw,5rem)] leading-[0.94] tracking-[-0.05em] text-brand-forest-deep"
                >
                  No mock itinerary in this session.
                </h2>
              </div>
              <div className="lg:col-span-4">
                <p className="max-w-[32rem] text-base leading-7 text-foreground/72">
                  The prototype does not save confirmations to your device or a
                  server. Complete the prepared mock-payment state again, or
                  return to discovery to shape another stay.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href={canReturnToPayment ? "/booking/payment" : "/search"}
                    className="group inline-flex min-h-12 items-center justify-between gap-6 rounded-full border border-brand-forest-deep bg-brand-forest-deep px-6 py-3 text-sm font-semibold text-brand-paper transition-colors duration-200 hover:bg-brand-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
                  >
                    {canReturnToPayment
                      ? "Return to mock payment"
                      : "Explore stays"}
                    <ArrowRight
                      aria-hidden="true"
                      size={16}
                      className="transition-transform duration-200 ease-luma group-hover:translate-x-0.5 motion-reduce:transition-none"
                    />
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex min-h-12 items-center px-3 text-sm font-semibold text-brand-forest-deep underline decoration-brand-brass/70 underline-offset-4 transition-colors duration-200 hover:text-brand-brass-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
                  >
                    Return home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const {
    dates: confirmedDates,
    guestDetails: confirmedGuest,
    guests: confirmedGuests,
    maskedPayment,
    priceSummary: confirmedPrice,
    property: confirmedProperty,
    reference,
    room: confirmedRoom,
  } = confirmation;
  const media = getMediaById(
    confirmedRoom.mediaId ?? confirmedProperty.mediaId,
  );
  const searchQuery = getStayQuery(
    confirmedProperty,
    confirmedDates,
    confirmedGuests,
  );
  const exploreHref = `/search?${searchQuery}`;
  const roomSubtotalLabel = `${formatMoney(confirmedPrice.nightlyRate)} × ${confirmedPrice.nightCount} ${
    confirmedPrice.nightCount === 1 ? "night" : "nights"
  } × ${confirmedPrice.roomCount} ${
    confirmedPrice.roomCount === 1 ? "room" : "rooms"
  }`;

  return (
    <main id="main-content" tabIndex={-1}>
      <BookingFlowHeader
        activeStep={4}
        completedThrough={3}
        title="Keep the stay in view."
        description="Your interface-only itinerary gathers the selected stay, guest, masked test payment, and complete mock total in one place."
      />

      <section aria-labelledby="confirmation-title" className="bg-brand-paper">
        <div className="container-luma py-[var(--space-section)]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-8">
            <article className="lg:col-span-8">
              <div className="border-t border-brand-forest-deep/24 pt-6">
                <div className="grid gap-5 sm:grid-cols-12 sm:gap-x-7">
                  <div className="sm:col-span-7">
                    <p className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-brass-dark uppercase">
                      Prototype record created
                    </p>
                    <h2
                      id="confirmation-title"
                      className="mt-3 max-w-[10ch] font-display text-[clamp(2.75rem,5vw,5.25rem)] leading-[0.92] font-medium tracking-[-0.05em] text-brand-forest-deep"
                    >
                      Your mock itinerary is ready.
                    </h2>
                  </div>
                  <p className="max-w-[30rem] text-base leading-7 text-foreground/72 sm:col-span-5 sm:pt-7">
                    This record exists only in memory for the current browser
                    session. It is not a hotel reservation, payment receipt, or
                    promise of availability.
                  </p>
                </div>
              </div>

              <div className="mt-10 grid gap-4 border-y border-brand-forest-deep/24 bg-brand-linen px-5 py-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center sm:px-6">
                <CheckCircle
                  aria-hidden="true"
                  size={24}
                  weight="fill"
                  className="text-brand-brass-dark"
                />
                <dl>
                  <dt className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-stone uppercase">
                    Mock itinerary reference
                  </dt>
                  <dd className="mt-2 break-all font-mono text-lg font-semibold tracking-[0.02em] text-brand-forest-deep tabular-nums sm:text-xl">
                    {reference}
                  </dd>
                </dl>
              </div>

              <section
                aria-labelledby="itinerary-title"
                className="mt-12 border-t border-brand-forest-deep/24 pt-7 sm:mt-16"
              >
                <div className="grid gap-7 sm:grid-cols-12 sm:gap-x-7">
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
                      <span>Selected room</span>
                      <span>{media?.title ?? confirmedProperty.name}</span>
                    </figcaption>
                  </figure>

                  <div className="sm:col-span-7">
                    <p className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-brass-dark uppercase">
                      Itinerary
                    </p>
                    <h3
                      id="itinerary-title"
                      className="mt-3 font-display text-[clamp(2.25rem,4vw,4rem)] leading-[0.96] tracking-[-0.045em] text-brand-forest-deep"
                    >
                      {confirmedProperty.name}
                    </h3>
                    <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-foreground/68">
                      <MapPin
                        aria-hidden="true"
                        size={16}
                        className="mt-1 shrink-0 text-brand-brass"
                      />
                      {confirmedProperty.location.region
                        ? `${confirmedProperty.location.region}, ${confirmedProperty.location.country}`
                        : `${confirmedProperty.location.city}, ${confirmedProperty.location.country}`}
                    </p>
                    <dl className="mt-7 border-y border-brand-forest-deep/18">
                      <div className="border-b border-brand-forest-deep/18 py-4">
                        <dt className="flex items-center gap-2 font-mono text-[0.5625rem] tracking-[0.11em] text-brand-stone uppercase">
                          <Bed aria-hidden="true" size={15} className="text-brand-brass" />
                          Room
                        </dt>
                        <dd className="mt-2 text-base font-semibold text-brand-forest-deep">
                          {confirmedRoom.name}
                        </dd>
                        <dd className="mt-1 text-sm leading-6 text-foreground/64">
                          {confirmedRoom.bedConfiguration} · {confirmedRoom.sizeSquareMetres} m²
                        </dd>
                      </div>
                      <div className="py-4">
                        <dt className="flex items-center gap-2 font-mono text-[0.5625rem] tracking-[0.11em] text-brand-stone uppercase">
                          <ForkKnife aria-hidden="true" size={15} className="text-brand-brass" />
                          Breakfast
                        </dt>
                        <dd className="mt-2 text-sm font-semibold text-brand-forest-deep">
                          {confirmedRoom.breakfastIncluded
                            ? "Included in this mock rate"
                            : "Not included in this mock rate"}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <dl className="mt-10 grid border-y border-brand-forest-deep/18 sm:grid-cols-2">
                  <div className="border-b border-brand-forest-deep/18 py-5 sm:border-r sm:px-5 sm:first:pl-0">
                    <dt className="flex items-center gap-2 font-mono text-[0.5625rem] tracking-[0.11em] text-brand-stone uppercase">
                      <CalendarBlank aria-hidden="true" size={15} className="text-brand-brass" />
                      Check-in
                    </dt>
                    <dd className="mt-2 font-display text-2xl leading-tight tracking-[-0.025em] text-brand-forest-deep">
                      {formatStayDate(confirmedDates.checkIn)}
                    </dd>
                  </div>
                  <div className="border-b border-brand-forest-deep/18 py-5 sm:px-5 sm:last:pr-0">
                    <dt className="flex items-center gap-2 font-mono text-[0.5625rem] tracking-[0.11em] text-brand-stone uppercase">
                      <CalendarBlank aria-hidden="true" size={15} className="text-brand-brass" />
                      Check-out
                    </dt>
                    <dd className="mt-2 font-display text-2xl leading-tight tracking-[-0.025em] text-brand-forest-deep">
                      {formatStayDate(confirmedDates.checkOut)}
                    </dd>
                  </div>
                  <div className="border-b border-brand-forest-deep/18 py-5 sm:border-r sm:border-b-0 sm:px-5 sm:first:pl-0">
                    <dt className="flex items-center gap-2 font-mono text-[0.5625rem] tracking-[0.11em] text-brand-stone uppercase">
                      <UsersThree aria-hidden="true" size={15} className="text-brand-brass" />
                      Party
                    </dt>
                    <dd className="mt-2 text-base font-semibold text-brand-forest-deep">
                      {getGuestLabel(confirmedGuests)} · {getRoomLabel(confirmedGuests.rooms)}
                    </dd>
                    <dd className="mt-1 text-sm leading-6 text-foreground/64">
                      {confirmedGuests.adults} {confirmedGuests.adults === 1 ? "adult" : "adults"}
                      {confirmedGuests.children > 0
                        ? ` · ${confirmedGuests.children} ${
                            confirmedGuests.children === 1 ? "child" : "children"
                          }`
                        : ""}
                    </dd>
                  </div>
                  <div className="py-5 sm:px-5 sm:last:pr-0">
                    <dt className="flex items-center gap-2 font-mono text-[0.5625rem] tracking-[0.11em] text-brand-stone uppercase">
                      <Ruler aria-hidden="true" size={15} className="text-brand-brass" />
                      Duration
                    </dt>
                    <dd className="mt-2 text-base font-semibold text-brand-forest-deep">
                      {confirmedPrice.nightCount} {confirmedPrice.nightCount === 1 ? "night" : "nights"}
                    </dd>
                    <dd className="mt-1 text-sm leading-6 text-foreground/64">
                      No inventory has been held for these dates.
                    </dd>
                  </div>
                </dl>
              </section>

              <section
                aria-labelledby="record-details-title"
                className="mt-12 border-t border-brand-forest-deep/24 pt-7 sm:mt-16"
              >
                <p className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-brass-dark uppercase">
                  Session details
                </p>
                <h3
                  id="record-details-title"
                  className="mt-3 font-display text-4xl leading-none tracking-[-0.04em] text-brand-forest-deep sm:text-5xl"
                >
                  Guest and test payment.
                </h3>
                <div className="mt-8 grid border-y border-brand-forest-deep/18 sm:grid-cols-2">
                  <dl className="border-b border-brand-forest-deep/18 py-6 sm:border-r sm:border-b-0 sm:pr-7">
                    <div>
                      <dt className="flex items-center gap-2 font-mono text-[0.5625rem] tracking-[0.11em] text-brand-stone uppercase">
                        <EnvelopeSimple aria-hidden="true" size={15} className="text-brand-brass" />
                        Lead guest
                      </dt>
                      <dd className="mt-3 text-base font-semibold text-brand-forest-deep">
                        {confirmedGuest.firstName} {confirmedGuest.lastName}
                      </dd>
                      <dd className="mt-1 break-all text-sm leading-6 text-foreground/66">
                        {confirmedGuest.email}
                      </dd>
                      <dd className="mt-1 text-sm leading-6 text-foreground/66">
                        {confirmedGuest.phone}
                      </dd>
                    </div>
                  </dl>
                  <dl className="py-6 sm:pl-7">
                    <div>
                      <dt className="flex items-center gap-2 font-mono text-[0.5625rem] tracking-[0.11em] text-brand-stone uppercase">
                        <CreditCard aria-hidden="true" size={15} className="text-brand-brass" />
                        Masked test card
                      </dt>
                      <dd className="mt-3 text-base font-semibold text-brand-forest-deep">
                        Card ending in {maskedPayment.lastFour}
                      </dd>
                      <dd className="mt-1 text-sm leading-6 text-foreground/66">
                        {maskedPayment.cardholderName} · expires {maskedPayment.expiry}
                      </dd>
                      <dd className="mt-2 text-xs leading-5 text-muted-foreground">
                        Display only. No authorization, token, or charge exists.
                      </dd>
                    </div>
                  </dl>
                </div>
              </section>
            </article>

            <aside aria-labelledby="confirmation-price-title" className="lg:col-span-4">
              <div className="border-y border-brand-brass/48 bg-brand-forest-deep px-5 py-7 text-brand-paper sm:px-7 sm:py-8 lg:sticky lg:top-[7.5rem]">
                <BookingPriceBreakdown
                  headingLevel={2}
                  idPrefix="confirmation"
                  presentation="feature"
                  priceSummary={confirmedPrice}
                  property={confirmedProperty}
                  room={confirmedRoom}
                  roomSubtotalLabel={roomSubtotalLabel}
                />

                <div className="mt-6 border-t border-brand-paper/18 pt-5">
                  <p className="font-mono text-[0.5625rem] tracking-[0.11em] text-brand-brass uppercase">
                    Interface record only
                  </p>
                  <p className="mt-2 text-xs leading-5 text-brand-paper/68">
                    No reservation was sent to the property, no email was sent,
                    and this itinerary will not appear in Trips.
                  </p>
                </div>

                <Link
                  href={exploreHref}
                  className="group mt-6 inline-flex min-h-12 w-full items-center justify-between gap-5 rounded-full border border-brand-paper bg-brand-paper px-6 py-3 text-sm font-semibold text-brand-forest-deep transition-colors duration-200 hover:bg-brand-linen focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass focus-visible:ring-offset-4 focus-visible:ring-offset-brand-forest-deep"
                >
                  Explore more stays
                  <ArrowRight
                    aria-hidden="true"
                    size={16}
                    className="transition-transform duration-200 ease-luma group-hover:translate-x-0.5 motion-reduce:transition-none"
                  />
                </Link>
                <Link
                  href="/"
                  className="mt-3 inline-flex min-h-11 w-full items-center justify-center text-xs font-semibold text-brand-paper underline decoration-brand-brass/75 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass focus-visible:ring-offset-4 focus-visible:ring-offset-brand-forest-deep"
                >
                  Return to the LumaStay home page
                </Link>
              </div>
            </aside>
          </div>

          <p className="mt-12 max-w-[62rem] border-l border-brand-brass/65 pl-4 text-xs leading-5 text-muted-foreground">
            Prototype confirmation only. The reference, itinerary, price,
            guest, and masked test-payment details are deterministic interface
            data held in memory for this session. Reloading clears the record;
            no real booking, payment, inventory hold, message, or trip-history
            entry exists.
          </p>
        </div>
      </section>
    </main>
  );
}
