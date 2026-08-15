import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bed,
  Check,
  CreditCard,
  MapPin,
  Receipt,
  X,
} from "@phosphor-icons/react/ssr";

import { getMediaById } from "@/data/mock";
import type { CancelledBooking, ConfirmedBooking } from "@/types/domain";

import {
  formatTripDate,
  formatTripEventDate,
  formatTripMoney,
  getRepeatSearchHref,
  getTripGuestLabel,
  getTripLocationLabel,
  getTripRoomLabel,
} from "../lib/trips-formatters";

type ReservationBooking = ConfirmedBooking | CancelledBooking;

const statusContent = {
  upcoming: {
    eyebrow: "Upcoming stay",
    title: "The itinerary ahead.",
    summary:
      "A paid prototype reservation, held here as a clear record of the stay selected.",
  },
  completed: {
    eyebrow: "Completed stay",
    title: "A journey kept on record.",
    summary:
      "The dates have passed, while the room, party, and original price remain preserved.",
  },
  cancelled: {
    eyebrow: "Cancelled stay",
    title: "Closed, fully accounted for.",
    summary:
      "The reservation was cancelled and its mock payment outcome is recorded below.",
  },
} as const;

function BookingStatusMark({ booking }: { booking: ReservationBooking }) {
  return (
    <span className="inline-flex min-h-8 items-center gap-2 rounded-full border border-brand-forest-deep/20 px-3 font-mono text-[0.625rem] tracking-[0.12em] text-brand-forest-deep uppercase">
      <span
        aria-hidden="true"
        className={`size-1.5 rounded-full ${
          booking.status === "cancelled"
            ? "bg-brand-stone"
            : "bg-brand-brass"
        }`}
      />
      {statusContent[booking.status].eyebrow}
    </span>
  );
}

function DetailItem({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail?: string;
}) {
  return (
    <div className="border-t border-brand-forest-deep/16 pt-4">
      <dt className="font-mono text-[0.625rem] tracking-[0.12em] text-brand-stone uppercase">
        {label}
      </dt>
      <dd className="mt-2 text-base font-semibold text-brand-forest-deep">
        {value}
      </dd>
      {detail ? (
        <dd className="mt-1 text-sm leading-6 text-foreground/64">{detail}</dd>
      ) : null}
    </div>
  );
}

function PriceRow({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail?: string;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-1 border-t border-white/14 py-4">
      <dt className="text-sm leading-6 text-brand-paper/72">{label}</dt>
      <dd className="text-right font-mono text-sm text-brand-paper tabular-nums">
        {value}
      </dd>
      {detail ? (
        <dd className="col-span-2 text-xs leading-5 text-brand-paper/54">
          {detail}
        </dd>
      ) : null}
    </div>
  );
}

function RateList({
  title,
  items,
  excluded = false,
}: {
  title: string;
  items: readonly string[];
  excluded?: boolean;
}) {
  const Icon = excluded ? X : Check;

  return (
    <div>
      <h3 className="font-mono text-[0.6875rem] tracking-[0.13em] text-brand-brass-dark uppercase">
        {title}
      </h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-sm leading-6 text-foreground/72"
          >
            <Icon
              aria-hidden="true"
              size={15}
              className="mt-1 shrink-0 text-brand-brass-dark"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TripDetailPage({ booking }: { booking: ReservationBooking }) {
  const media =
    getMediaById(booking.room.mediaId) ??
    getMediaById(booking.property.mediaId);
  const status = statusContent[booking.status];
  const paymentOutcome =
    booking.status === "cancelled"
      ? `Refunded ${formatTripEventDate(booking.payment.refundedAt)}`
      : `Paid ${formatTripEventDate(booking.payment.paidAt)}`;

  return (
    <main id="main-content" className="min-h-screen bg-brand-paper">
      <section
        aria-labelledby="trip-detail-heading"
        className="container-luma pt-10 pb-16 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-28"
      >
        <Link
          href="/trips"
          className="group inline-flex min-h-11 items-center gap-3 rounded-sm px-1 text-sm font-semibold text-brand-forest-deep underline decoration-brand-forest-deep/30 underline-offset-4 transition-colors duration-200 hover:text-brand-brass-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-brand-paper motion-reduce:transition-none"
        >
          <ArrowLeft
            aria-hidden="true"
            size={15}
            className="transition-transform duration-200 ease-luma group-hover:-translate-x-1 motion-reduce:transition-none"
          />
          All trips
        </Link>

        <div className="mt-8 grid gap-10 border-t border-brand-forest-deep/16 pt-8 lg:grid-cols-12 lg:gap-x-8 lg:pt-12">
          <div className="lg:col-span-8">
            <BookingStatusMark booking={booking} />
            <h1
              id="trip-detail-heading"
              className="mt-6 max-w-[10ch] text-[clamp(3.5rem,7.4vw,7.25rem)] leading-[0.88] font-semibold tracking-[-0.055em] text-brand-forest-deep"
            >
              {booking.property.name}
            </h1>
            <p className="mt-6 flex items-start gap-2 text-sm leading-6 text-foreground/68 sm:text-base">
              <MapPin
                aria-hidden="true"
                size={17}
                className="mt-1 shrink-0 text-brand-brass-dark"
              />
              {getTripLocationLabel(booking)}
            </p>
          </div>

          <div className="max-w-[32rem] lg:col-start-10 lg:col-span-3 lg:self-end">
            <p className="font-display text-[2rem] leading-[1.05] font-semibold tracking-[-0.025em] text-brand-forest-deep sm:text-[2.35rem]">
              {status.title}
            </p>
            <p className="mt-4 text-base leading-7 text-foreground/68">
              {status.summary}
            </p>
          </div>
        </div>

        <dl className="mt-12 grid border-t border-l border-brand-forest-deep/16 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          <div className="border-r border-b border-brand-forest-deep/16 p-5">
            <dt className="font-mono text-[0.625rem] tracking-[0.12em] text-brand-stone uppercase">
              Reservation
            </dt>
            <dd className="mt-3 break-words font-mono text-xs leading-5 text-brand-forest-deep">
              {booking.reference}
            </dd>
          </div>
          <div className="border-r border-b border-brand-forest-deep/16 p-5">
            <dt className="font-mono text-[0.625rem] tracking-[0.12em] text-brand-stone uppercase">
              Booked
            </dt>
            <dd className="mt-3 text-sm font-semibold text-brand-forest-deep">
              {formatTripEventDate(booking.createdAt)}
            </dd>
          </div>
          <div className="border-r border-b border-brand-forest-deep/16 p-5">
            <dt className="font-mono text-[0.625rem] tracking-[0.12em] text-brand-stone uppercase">
              Payment
            </dt>
            <dd className="mt-3 text-sm font-semibold text-brand-forest-deep">
              {paymentOutcome}
            </dd>
          </div>
          <div className="border-r border-b border-brand-forest-deep/16 p-5">
            <dt className="font-mono text-[0.625rem] tracking-[0.12em] text-brand-stone uppercase">
              Test card
            </dt>
            <dd className="mt-3 text-sm font-semibold text-brand-forest-deep">
              Ending {booking.payment.lastFour}
            </dd>
          </div>
        </dl>
      </section>

      <section
        aria-labelledby="stay-arrangement-heading"
        className="bg-brand-linen"
      >
        <div className="container-luma grid gap-12 py-[var(--space-section)] lg:grid-cols-12 lg:gap-x-8">
          <figure className="min-w-0 lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden bg-brand-forest-deep/10 sm:aspect-[7/5]">
              {media ? (
                <Image
                  fill
                  preload
                  src={media.src}
                  alt={media.alt}
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: media.focalPoint }}
                />
              ) : (
                <div className="absolute inset-0 bg-brand-forest-deep" />
              )}
            </div>
            <figcaption className="mt-3 flex items-start justify-between gap-4 font-mono text-[0.625rem] leading-5 tracking-[0.11em] text-brand-stone uppercase">
              <span>{booking.property.location.city}</span>
              <span className="text-right">{booking.room.name}</span>
            </figcaption>
          </figure>

          <div className="lg:col-start-9 lg:col-span-4 lg:self-center">
            <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-brand-forest-deep uppercase">
              Stay arrangement
            </p>
            <h2
              id="stay-arrangement-heading"
              className="mt-5 max-w-[9ch] text-[clamp(2.85rem,5vw,5.25rem)] leading-[0.9] font-semibold tracking-[-0.05em] text-brand-forest-deep"
            >
              A room, dates, and company.
            </h2>

            <dl className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <DetailItem
                label="Arrival"
                value={formatTripDate(booking.checkIn)}
                detail="Check-in date"
              />
              <DetailItem
                label="Departure"
                value={formatTripDate(booking.checkOut)}
                detail={`${booking.price.nightCount} ${booking.price.nightCount === 1 ? "night" : "nights"}`}
              />
              <DetailItem
                label="Party"
                value={getTripGuestLabel(booking.guests)}
                detail={`${booking.guests.adults} adult${booking.guests.adults === 1 ? "" : "s"}${booking.guests.children > 0 ? `, ${booking.guests.children} child${booking.guests.children === 1 ? "" : "ren"}` : ""}`}
              />
              <DetailItem
                label="Rooms"
                value={getTripRoomLabel(booking.guests.rooms)}
                detail={booking.room.name}
              />
              <DetailItem
                label="Lead guest"
                value={booking.leadGuestName}
                detail="Name on the mock record"
              />
            </dl>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="rate-plan-heading"
        className="container-luma py-[var(--space-section)]"
      >
        <div className="grid gap-10 border-b border-brand-forest-deep/16 pb-12 lg:grid-cols-12 lg:gap-x-8 lg:pb-16">
          <div className="lg:col-span-7">
            <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-brand-brass-dark uppercase">
              Rate as captured
            </p>
            <h2
              id="rate-plan-heading"
              className="mt-5 max-w-[11ch] text-[clamp(2.85rem,5vw,5.25rem)] leading-[0.9] font-semibold tracking-[-0.05em] text-brand-forest-deep"
            >
              The stay behind the total.
            </h2>
          </div>
          <p className="max-w-[31rem] text-base leading-7 text-foreground/68 lg:col-start-9 lg:col-span-4 lg:self-end">
            This is the exact room and rate-plan snapshot stored with the mock
            reservation—not current availability or a newly quoted price.
          </p>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-x-8 lg:mt-14">
          <div className="lg:col-span-3">
            <Bed aria-hidden="true" size={24} className="text-brand-brass-dark" />
            <p className="mt-5 font-mono text-[0.625rem] tracking-[0.12em] text-brand-stone uppercase">
              Room selected
            </p>
            <p className="mt-3 font-display text-[1.8rem] leading-tight font-semibold text-brand-forest-deep">
              {booking.room.name}
            </p>
            <p className="mt-3 text-sm leading-6 text-foreground/66">
              {booking.room.bedConfiguration} · {booking.room.sizeSquareMetres} m²
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground/66">
              Breakfast {booking.room.breakfastIncluded ? "included" : "not included"}
            </p>
          </div>

          <div className="lg:col-start-5 lg:col-span-3">
            <RateList title="Included" items={booking.room.ratePlan.inclusions} />
          </div>

          <div className="lg:col-start-9 lg:col-span-4">
            <RateList
              title="Not included"
              items={booking.room.ratePlan.exclusions}
              excluded
            />
            <div className="mt-9 border-l border-brand-brass/60 pl-4">
              <p className="font-mono text-[0.625rem] tracking-[0.12em] text-brand-stone uppercase">
                {booking.room.cancellationPolicy.label} cancellation
              </p>
              <p className="mt-3 text-sm leading-6 text-foreground/72">
                {booking.room.cancellationPolicy.summary}
              </p>
            </div>
          </div>
        </div>
      </section>

      {booking.status === "cancelled" ? (
        <section
          aria-labelledby="cancellation-outcome-heading"
          className="bg-brand-linen"
        >
          <div className="container-luma grid gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5">
              <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-brand-stone uppercase">
                Cancellation outcome
              </p>
              <h2
                id="cancellation-outcome-heading"
                className="mt-4 max-w-[11ch] text-[clamp(2.5rem,4.5vw,4.5rem)] leading-none font-semibold tracking-[-0.045em] text-brand-forest-deep"
              >
                Nothing left unresolved.
              </h2>
            </div>
            <dl className="grid gap-5 sm:grid-cols-2 lg:col-start-7 lg:col-span-6">
              <DetailItem
                label="Cancelled"
                value={formatTripEventDate(booking.cancellation.cancelledAt)}
                detail={booking.cancellation.reason}
              />
              <DetailItem
                label="Cancellation fee"
                value={formatTripMoney(booking.cancellation.fee)}
                detail="No mock fee was retained"
              />
              <DetailItem
                label="Refunded"
                value={formatTripEventDate(booking.payment.refundedAt)}
                detail="Returned to the test card"
              />
              <DetailItem
                label="Refund amount"
                value={formatTripMoney(booking.payment.refundAmount)}
                detail={`Test card ending ${booking.payment.lastFour}`}
              />
            </dl>
          </div>
        </section>
      ) : null}

      <section
        aria-labelledby="price-record-heading"
        className="bg-brand-forest-deep text-brand-paper"
      >
        <div className="container-luma grid gap-12 py-[var(--space-section)] lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5">
            <Receipt aria-hidden="true" size={28} className="text-brand-brass" />
            <p className="mt-6 font-mono text-[0.6875rem] tracking-[0.14em] text-brand-brass uppercase">
              Price record
            </p>
            <h2
              id="price-record-heading"
              className="mt-5 max-w-[9ch] text-[clamp(3rem,5.6vw,5.75rem)] leading-[0.9] font-semibold tracking-[-0.05em] text-brand-paper"
            >
              Every line, in view.
            </h2>
            <p className="mt-6 max-w-[30rem] text-base leading-7 text-brand-paper/66">
              A deterministic interface total recorded at booking time. No
              money was charged, held, or returned.
            </p>
          </div>

          <div className="lg:col-start-7 lg:col-span-6">
            <dl>
              <PriceRow
                label="Nightly rate"
                value={formatTripMoney(booking.price.nightlyRate)}
                detail="Per room, per night"
              />
              <PriceRow
                label={`${booking.price.roomCount} ${booking.price.roomCount === 1 ? "room" : "rooms"} × ${booking.price.nightCount} ${booking.price.nightCount === 1 ? "night" : "nights"}`}
                value={formatTripMoney(booking.price.accommodationSubtotal)}
                detail="Accommodation subtotal"
              />
              <PriceRow
                label={booking.price.estimatedTax.label}
                value={formatTripMoney(booking.price.estimatedTax.amount)}
                detail={`${booking.price.estimatedTax.rateBasisPoints / 100}% of accommodation subtotal`}
              />
              <PriceRow
                label={booking.price.serviceFee.label}
                value={formatTripMoney(booking.price.serviceFee.amount)}
                detail={`${formatTripMoney(booking.price.serviceFee.amountPerRoom)} per room`}
              />
              <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-6 border-y border-brand-brass/55 py-6">
                <dt className="font-display text-2xl font-semibold text-brand-paper">
                  Total recorded
                </dt>
                <dd className="text-right font-mono text-xl text-brand-paper tabular-nums sm:text-2xl">
                  {formatTripMoney(booking.price.total)}
                </dd>
              </div>
            </dl>

            <div className="mt-8 grid gap-5 border-l border-brand-brass/60 pl-5 sm:grid-cols-[auto_1fr] sm:items-start">
              <CreditCard
                aria-hidden="true"
                size={23}
                className="text-brand-brass"
              />
              <div>
                <p className="font-mono text-[0.6875rem] tracking-[0.13em] text-brand-brass uppercase">
                  {booking.status === "cancelled"
                    ? "Mock refund recorded"
                    : "Mock payment recorded"}
                </p>
                <p className="mt-3 text-sm leading-6 text-brand-paper/72">
                  {booking.status === "cancelled"
                    ? `${formatTripMoney(booking.payment.refundAmount)} marked refunded on ${formatTripEventDate(booking.payment.refundedAt)} to test card ending ${booking.payment.lastFour}.`
                    : `${formatTripMoney(booking.price.total)} marked paid on ${formatTripEventDate(booking.payment.paidAt)} with test card ending ${booking.payment.lastFour}.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-luma py-14 sm:py-20">
        <div className="grid gap-9 border-y border-brand-forest-deep/16 py-9 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 font-mono text-[0.625rem] tracking-[0.13em] text-brand-brass-dark uppercase">
              <span className="h-px w-7 bg-brand-brass" aria-hidden="true" />
              Prototype disclosure
            </div>
            <p className="mt-5 max-w-[48rem] text-sm leading-6 text-foreground/68">
              This page is a read-only interface record built from local mock
              data. It is not connected to a traveler account, property,
              payment provider, reservation system, support desk, or live
              inventory.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 sm:flex-row lg:col-start-9 lg:col-span-4 lg:justify-end lg:self-center">
            <Link
              href="/trips"
              className="group inline-flex min-h-11 items-center gap-3 rounded-sm px-2 text-sm font-semibold text-brand-forest-deep underline decoration-brand-forest-deep/30 underline-offset-4 transition-colors duration-200 hover:text-brand-brass-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-brand-paper motion-reduce:transition-none"
            >
              <ArrowLeft
                aria-hidden="true"
                size={15}
                className="transition-transform duration-200 ease-luma group-hover:-translate-x-1 motion-reduce:transition-none"
              />
              All trips
            </Link>
            <Link
              href={getRepeatSearchHref(booking)}
              className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-brand-forest-deep px-5 py-3 text-sm font-semibold text-brand-paper transition-colors duration-200 hover:bg-brand-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-brand-paper active:translate-y-px motion-reduce:transition-none"
            >
              Explore a similar stay
              <ArrowRight
                aria-hidden="true"
                size={16}
                className="transition-transform duration-200 ease-luma group-hover:translate-x-1 motion-reduce:transition-none"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
