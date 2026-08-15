import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bed,
  CalendarBlank,
  CheckCircle,
  CreditCard,
  MapPin,
  Receipt,
  UsersThree,
  WarningCircle,
  XCircle,
} from "@phosphor-icons/react/ssr";

import { getMediaById } from "@/data/mock";
import { cn } from "@/lib/utils";
import type {
  Booking,
  CancelledBooking,
  ConfirmedBooking,
  PaymentFailedBooking,
} from "@/types/domain";

import {
  formatTripDate,
  formatTripEventDate,
  formatTripMoney,
  getRepeatSearchHref,
  getTripGuestLabel,
  getTripLocationLabel,
  getTripRoomLabel,
} from "../lib/trips-formatters";

function TripMediaFigure({
  booking,
  inverse = false,
  sizes,
}: {
  booking: Booking;
  inverse?: boolean;
  sizes: string;
}) {
  const media =
    getMediaById(booking.room.mediaId) ??
    getMediaById(booking.property.mediaId);

  return (
    <figure className="min-w-0">
      <div className="relative aspect-[16/10] overflow-hidden bg-brand-forest-deep/10 sm:aspect-[7/5]">
        {media ? (
          <Image
            fill
            src={media.src}
            alt={media.alt}
            sizes={sizes}
            className={cn("object-cover", inverse && "opacity-80")}
            style={{ objectPosition: media.focalPoint }}
          />
        ) : (
          <div className="absolute inset-0 bg-brand-forest-deep" />
        )}
      </div>
      <figcaption
        className={cn(
          "mt-3 flex items-start justify-between gap-4 font-mono text-[0.625rem] leading-5 tracking-[0.11em] uppercase",
          inverse ? "text-brand-paper/58" : "text-brand-stone",
        )}
      >
        <span>{booking.property.location.city}</span>
        <span className="text-right">{booking.room.name}</span>
      </figcaption>
    </figure>
  );
}

function TripStatus({ booking }: { booking: Booking }) {
  const iconClassName = "shrink-0";

  if (booking.status === "upcoming") {
    return (
      <span className="flex items-center gap-2 text-brand-forest-deep">
        <CalendarBlank aria-hidden="true" size={15} className={iconClassName} />
        Upcoming stay
      </span>
    );
  }

  if (booking.status === "completed") {
    return (
      <span className="flex items-center gap-2 text-brand-forest">
        <CheckCircle
          aria-hidden="true"
          size={15}
          weight="fill"
          className={iconClassName}
        />
        Completed stay
      </span>
    );
  }

  if (booking.status === "cancelled") {
    return (
      <span className="flex items-center gap-2 text-brand-stone">
        <XCircle aria-hidden="true" size={15} className={iconClassName} />
        Cancelled stay
      </span>
    );
  }

  return (
    <span className="flex items-center gap-2 text-destructive">
      <WarningCircle
        aria-hidden="true"
        size={15}
        weight="fill"
        className={iconClassName}
      />
      Payment attempt
    </span>
  );
}

function TripFacts({ booking }: { booking: Booking }) {
  return (
    <dl className="mt-7 grid grid-cols-2 border-y border-brand-forest-deep/16">
      <div className="border-r border-b border-brand-forest-deep/16 py-4 pr-4">
        <dt className="flex items-center gap-2 font-mono text-[0.5625rem] tracking-[0.11em] text-brand-stone uppercase">
          <CalendarBlank aria-hidden="true" size={14} className="text-brand-brass" />
          Check-in
        </dt>
        <dd className="mt-2 text-sm font-semibold text-brand-forest-deep tabular-nums">
          {formatTripDate(booking.checkIn)}
        </dd>
      </div>
      <div className="border-b border-brand-forest-deep/16 py-4 pl-4">
        <dt className="flex items-center gap-2 font-mono text-[0.5625rem] tracking-[0.11em] text-brand-stone uppercase">
          <CalendarBlank aria-hidden="true" size={14} className="text-brand-brass" />
          Check-out
        </dt>
        <dd className="mt-2 text-sm font-semibold text-brand-forest-deep tabular-nums">
          {formatTripDate(booking.checkOut)}
        </dd>
      </div>
      <div className="border-r border-brand-forest-deep/16 py-4 pr-4">
        <dt className="flex items-center gap-2 font-mono text-[0.5625rem] tracking-[0.11em] text-brand-stone uppercase">
          <UsersThree aria-hidden="true" size={14} className="text-brand-brass" />
          Party
        </dt>
        <dd className="mt-2 text-sm font-semibold text-brand-forest-deep">
          {getTripGuestLabel(booking.guests)} ·{" "}
          {getTripRoomLabel(booking.guests.rooms)}
        </dd>
      </div>
      <div className="py-4 pl-4">
        <dt className="flex items-center gap-2 font-mono text-[0.5625rem] tracking-[0.11em] text-brand-stone uppercase">
          <Receipt aria-hidden="true" size={14} className="text-brand-brass" />
          Duration
        </dt>
        <dd className="mt-2 text-sm font-semibold text-brand-forest-deep">
          {booking.price.nightCount}{" "}
          {booking.price.nightCount === 1 ? "night" : "nights"}
        </dd>
      </div>
    </dl>
  );
}

function BookingRecordLedger({
  booking,
}: {
  booking: ConfirmedBooking | CancelledBooking;
}) {
  const isCancelled = booking.status === "cancelled";

  return (
    <dl className="border-y border-brand-forest-deep/18">
      <div className="border-b border-brand-forest-deep/18 py-4">
        <dt className="font-mono text-[0.5625rem] tracking-[0.11em] text-brand-stone uppercase">
          Mock booking reference
        </dt>
        <dd className="mt-2 break-all font-mono text-xs font-semibold tracking-[0.035em] text-brand-forest-deep tabular-nums">
          {booking.reference}
        </dd>
      </div>
      <div className="border-b border-brand-forest-deep/18 py-4">
        <dt className="font-mono text-[0.5625rem] tracking-[0.11em] text-brand-stone uppercase">
          {isCancelled ? "Original mock total" : "Mock stay total"}
        </dt>
        <dd className="mt-2 font-mono text-lg font-semibold text-brand-forest-deep tabular-nums">
          {formatTripMoney(booking.price.total)}
        </dd>
      </div>
      <div className="py-4">
        <dt className="flex items-center gap-2 font-mono text-[0.5625rem] tracking-[0.11em] text-brand-stone uppercase">
          <CreditCard aria-hidden="true" size={14} className="text-brand-brass" />
          {isCancelled ? "Mock refund" : "Mock payment"}
        </dt>
        <dd className="mt-2 text-sm font-semibold text-brand-forest-deep">
          {isCancelled
            ? `${formatTripMoney(booking.payment.refundAmount)} returned in full`
            : `Marked paid · card ending ${booking.payment.lastFour}`}
        </dd>
        <dd className="mt-1 text-xs leading-5 text-muted-foreground">
          {isCancelled
            ? `Refunded ${formatTripEventDate(booking.payment.refundedAt)} · no cancellation fee`
            : `Prototype payment dated ${formatTripEventDate(booking.payment.paidAt)}`}
        </dd>
      </div>
    </dl>
  );
}

export function FeaturedTripRecord({
  booking,
  index,
}: {
  booking: ConfirmedBooking;
  index: number;
}) {
  const imageOnRight = index % 2 === 1;

  return (
    <article
      aria-labelledby={`${booking.id}-title`}
      className="grid gap-8 py-10 sm:py-14 lg:grid-cols-12 lg:items-center lg:gap-x-8 lg:py-20"
    >
      <div
        className={cn(
          "min-w-0 lg:row-start-1",
          imageOnRight
            ? "lg:col-start-7 lg:col-span-6"
            : "lg:col-span-7",
        )}
      >
        <TripMediaFigure
          booking={booking}
          sizes="(max-width: 1023px) calc(100vw - 2.5rem), 55vw"
        />
      </div>

      <div
        className={cn(
          "min-w-0 lg:row-start-1",
          imageOnRight
            ? "lg:col-span-5"
            : "lg:col-start-9 lg:col-span-4",
        )}
      >
        <div className="flex items-center justify-between gap-4 border-b border-brand-forest-deep/16 pb-4 font-mono text-[0.625rem] tracking-[0.12em] uppercase">
          <TripStatus booking={booking} />
          <span className="text-brand-stone">
            {String(index + 1).padStart(2, "0")} / 02
          </span>
        </div>

        <h3
          id={`${booking.id}-title`}
          className="mt-6 text-[clamp(2.75rem,5vw,5.25rem)] leading-[0.89] font-bold tracking-[-0.055em] text-brand-forest-deep"
        >
          {booking.property.name}
        </h3>
        <p className="mt-4 flex items-start gap-2 text-sm leading-6 text-foreground/68">
          <MapPin
            aria-hidden="true"
            size={16}
            className="mt-1 shrink-0 text-brand-brass"
          />
          {getTripLocationLabel(booking)}
        </p>

        <div className="mt-6 border-l border-brand-brass/55 pl-4">
          <p className="flex items-center gap-2 text-base font-semibold text-brand-forest-deep">
            <Bed aria-hidden="true" size={17} className="text-brand-brass-dark" />
            {booking.room.name}
          </p>
          <p className="mt-1 text-sm leading-6 text-foreground/64">
            {booking.room.bedConfiguration} · {booking.room.sizeSquareMetres} m²
          </p>
          <p className="mt-1 text-sm leading-6 text-foreground/64">
            {booking.room.breakfastIncluded
              ? "Breakfast included in this mock rate"
              : "Breakfast not included in this mock rate"}
          </p>
        </div>

        <TripFacts booking={booking} />
        <div className="mt-7">
          <BookingRecordLedger booking={booking} />
        </div>
        <Link
          href={`/trips/${booking.id}`}
          className="group mt-6 inline-flex min-h-11 items-center gap-3 rounded-sm px-1 text-sm font-semibold text-brand-forest-deep underline decoration-brand-forest-deep/30 underline-offset-4 transition-colors duration-200 hover:text-brand-brass-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-brand-linen motion-reduce:transition-none"
        >
          View full record
          <ArrowRight
            aria-hidden="true"
            size={15}
            className="transition-transform duration-200 ease-luma group-hover:translate-x-1 motion-reduce:transition-none"
          />
        </Link>
      </div>
    </article>
  );
}

export function ArchivedTripRecord({
  booking,
  index,
}: {
  booking: ConfirmedBooking | CancelledBooking;
  index: number;
}) {
  const isCancelled = booking.status === "cancelled";

  return (
    <article
      aria-labelledby={`${booking.id}-title`}
      className="grid gap-8 py-10 sm:py-14 lg:grid-cols-12 lg:items-start lg:gap-x-8 lg:py-16"
    >
      <div className="min-w-0 lg:col-span-4">
        <TripMediaFigure
          booking={booking}
          sizes="(max-width: 1023px) calc(100vw - 2.5rem), 31vw"
        />
      </div>

      <div className="min-w-0 lg:col-span-5">
        <div className="flex items-center justify-between gap-4 border-b border-brand-forest-deep/16 pb-4 font-mono text-[0.625rem] tracking-[0.12em] uppercase">
          <TripStatus booking={booking} />
          <span className="text-brand-stone">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3
          id={`${booking.id}-title`}
          className="mt-5 text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[0.9] font-bold tracking-[-0.055em] text-brand-forest-deep"
        >
          {booking.property.name}
        </h3>
        <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-foreground/68">
          <MapPin
            aria-hidden="true"
            size={16}
            className="mt-1 shrink-0 text-brand-brass"
          />
          {getTripLocationLabel(booking)}
        </p>
        <p className="mt-6 text-base font-semibold text-brand-forest-deep">
          {booking.room.name}
        </p>
        <p className="mt-1 text-sm leading-6 text-foreground/64">
          {booking.room.bedConfiguration} · {booking.room.sizeSquareMetres} m²
        </p>

        <TripFacts booking={booking} />

        {isCancelled ? (
          <div className="mt-6 border-l border-brand-stone/45 pl-4">
            <p className="font-mono text-[0.5625rem] tracking-[0.11em] text-brand-stone uppercase">
              Cancelled {formatTripEventDate(booking.cancellation.cancelledAt)}
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground/70">
              {booking.cancellation.reason}. The full mock total was returned;
              no fee was retained.
            </p>
          </div>
        ) : null}
      </div>

      <aside
        aria-label={`${booking.property.name} record summary`}
        className="min-w-0 lg:col-span-3"
      >
        <BookingRecordLedger booking={booking} />
        <Link
          href={`/trips/${booking.id}`}
          className="group mt-5 inline-flex min-h-11 items-center gap-3 rounded-sm px-1 text-sm font-semibold text-brand-forest-deep underline decoration-brand-forest-deep/30 underline-offset-4 transition-colors duration-200 hover:text-brand-brass-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-brand-paper motion-reduce:transition-none"
        >
          View full record
          <ArrowRight
            aria-hidden="true"
            size={15}
            className="transition-transform duration-200 ease-luma group-hover:translate-x-1 motion-reduce:transition-none"
          />
        </Link>
      </aside>
    </article>
  );
}

export function FailedPaymentRecord({
  booking,
}: {
  booking: PaymentFailedBooking;
}) {
  return (
    <article
      aria-labelledby={`${booking.id}-title`}
      className="grid gap-9 border-y border-brand-paper/18 py-10 sm:py-14 lg:grid-cols-12 lg:items-center lg:gap-x-8 lg:py-16"
    >
      <div className="min-w-0 lg:col-span-5">
        <TripMediaFigure
          booking={booking}
          inverse
          sizes="(max-width: 1023px) calc(100vw - 2.5rem), 39vw"
        />
      </div>

      <div className="min-w-0 lg:col-start-7 lg:col-span-6">
        <p className="flex items-center gap-2 font-mono text-[0.625rem] tracking-[0.12em] text-brand-paper/72 uppercase">
          <WarningCircle
            aria-hidden="true"
            size={16}
            weight="fill"
            className="text-brand-brass"
          />
          Payment did not complete
        </p>
        <h3
          id={`${booking.id}-title`}
          className="mt-5 max-w-[11ch] text-[clamp(2.8rem,5.5vw,5.75rem)] leading-[0.89] font-bold tracking-[-0.055em] text-brand-paper"
        >
          No trip was created for {booking.property.name}.
        </h3>
        <p className="mt-6 max-w-[42rem] text-base leading-7 text-brand-paper/70 sm:text-lg sm:leading-8">
          The test card was declined before a reservation existed. The dates,
          room, and price below describe the attempted search only; nothing was
          charged or held.
        </p>

        <dl className="mt-8 grid border-y border-brand-paper/18 sm:grid-cols-2">
          <div className="border-b border-brand-paper/18 py-5 sm:border-r sm:pr-5">
            <dt className="font-mono text-[0.5625rem] tracking-[0.11em] text-brand-paper/54 uppercase">
              Booking reference
            </dt>
            <dd className="mt-2 font-mono text-sm font-semibold text-brand-paper">
              None created
            </dd>
          </div>
          <div className="border-b border-brand-paper/18 py-5 sm:pl-5">
            <dt className="font-mono text-[0.5625rem] tracking-[0.11em] text-brand-paper/54 uppercase">
              Attempt reference
            </dt>
            <dd className="mt-2 break-all font-mono text-xs font-semibold tracking-[0.03em] text-brand-paper tabular-nums">
              {booking.attemptReference}
            </dd>
          </div>
          <div className="border-b border-brand-paper/18 py-5 sm:border-r sm:border-b-0 sm:pr-5">
            <dt className="font-mono text-[0.5625rem] tracking-[0.11em] text-brand-paper/54 uppercase">
              Attempted total
            </dt>
            <dd className="mt-2 font-mono text-lg font-semibold text-brand-paper tabular-nums">
              {formatTripMoney(booking.price.total)}
            </dd>
            <dd className="mt-1 text-xs leading-5 text-brand-paper/54">
              Display only · no charge
            </dd>
          </div>
          <div className="py-5 sm:pl-5">
            <dt className="font-mono text-[0.5625rem] tracking-[0.11em] text-brand-paper/54 uppercase">
              Attempt details
            </dt>
            <dd className="mt-2 text-sm font-semibold text-brand-paper">
              Card ending {booking.payment.lastFour} · declined
            </dd>
            <dd className="mt-1 text-xs leading-5 text-brand-paper/54">
              {formatTripEventDate(booking.payment.failedAt)} · retryable search
            </dd>
          </div>
        </dl>

        <div className="mt-7 grid gap-4 border-l border-brand-brass/60 pl-4 sm:grid-cols-2">
          <div>
            <p className="font-mono text-[0.5625rem] tracking-[0.11em] text-brand-brass uppercase">
              Search intent
            </p>
            <p className="mt-2 text-sm leading-6 text-brand-paper/72">
              {booking.room.name} · {formatTripDate(booking.checkIn)} to{" "}
              {formatTripDate(booking.checkOut)}
            </p>
          </div>
          <Link
            href={getRepeatSearchHref(booking)}
            className="group inline-flex min-h-12 items-center justify-between gap-5 rounded-full border border-brand-paper/70 px-5 py-3 text-sm font-semibold text-brand-paper transition-colors duration-200 hover:border-brand-brass hover:bg-white/6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass focus-visible:ring-offset-4 focus-visible:ring-offset-brand-forest-deep active:translate-y-px motion-reduce:transition-none sm:self-center"
          >
            Search these dates again
            <ArrowRight
              aria-hidden="true"
              size={16}
              className="transition-transform duration-200 ease-luma group-hover:translate-x-1 motion-reduce:transition-none"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
