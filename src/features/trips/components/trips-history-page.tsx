import Link from "next/link";
import { ArrowDown, ArrowRight } from "@phosphor-icons/react/ssr";

import {
  MOCK_BOOKING_HISTORY_REFERENCE_DATE,
} from "@/data/mock";
import type {
  Booking,
  CancelledBooking,
  ConfirmedBooking,
  PaymentFailedBooking,
} from "@/types/domain";

import {
  ArchivedTripRecord,
  FailedPaymentRecord,
  FeaturedTripRecord,
} from "./trip-history-record";
import { formatTripDate } from "../lib/trips-formatters";

export function TripsHistoryPage({
  bookings,
}: {
  bookings: readonly Booking[];
}) {
  const upcomingBookings = bookings.filter(
    (booking): booking is ConfirmedBooking => booking.status === "upcoming",
  );
  const completedBookings = bookings.filter(
    (booking): booking is ConfirmedBooking => booking.status === "completed",
  );
  const cancelledBookings = bookings.filter(
    (booking): booking is CancelledBooking => booking.status === "cancelled",
  );
  const failedPaymentAttempts = bookings.filter(
    (booking): booking is PaymentFailedBooking =>
      booking.status === "payment-failed",
  );
  const statusNavigation = [
    {
      href: "#upcoming-trips",
      label: "Upcoming",
      count: upcomingBookings.length,
    },
    {
      href: "#completed-trips",
      label: "Completed",
      count: completedBookings.length,
    },
    {
      href: "#cancelled-trips",
      label: "Cancelled",
      count: cancelledBookings.length,
    },
    {
      href: "#payment-attempts",
      label: "Payment attempt",
      count: failedPaymentAttempts.length,
    },
  ] as const;

  return (
    <main id="main-content" className="min-h-screen bg-brand-paper">
      <section
        aria-labelledby="trips-page-heading"
        className="container-luma pt-14 pb-16 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28"
      >
        <div className="flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.16em] text-brand-brass-dark uppercase">
          <span className="h-px w-7 bg-brand-brass" aria-hidden="true" />
          Your journey ledger
        </div>

        <div className="mt-6 grid gap-9 border-t border-border pt-8 lg:grid-cols-12 lg:gap-x-8 lg:pt-10">
          <h1
            id="trips-page-heading"
            className="max-w-[10ch] text-[clamp(3.55rem,8vw,7.75rem)] leading-[0.88] font-semibold tracking-[-0.055em] text-brand-forest-deep lg:col-span-8"
          >
            Every trip, kept in clear view.
          </h1>

          <div className="max-w-[32rem] lg:col-start-10 lg:col-span-3 lg:self-end">
            <p className="text-base leading-7 text-foreground/72 sm:text-lg sm:leading-8">
              Upcoming stays, journeys behind you, cancellations, and payment
              attempts—kept separate so each record says exactly what happened.
            </p>
            <Link
              href="/search"
              className="group mt-7 inline-flex min-h-12 items-center gap-3 rounded-full bg-brand-forest-deep px-5 py-3 text-sm font-semibold text-brand-paper transition-colors duration-200 hover:bg-brand-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-brand-paper active:translate-y-px motion-reduce:transition-none"
            >
              Explore another stay
              <ArrowRight
                aria-hidden="true"
                size={16}
                className="transition-transform duration-200 ease-luma group-hover:translate-x-1 motion-reduce:transition-none"
              />
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-7 border-y border-brand-forest-deep/16 py-7 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-3">
            <p className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-brass-dark uppercase">
              Prototype history
            </p>
            <p className="mt-3 text-sm leading-6 text-foreground/66">
              {bookings.length} deterministic interface records. Status is fixed as of{" "}
              {formatTripDate(MOCK_BOOKING_HISTORY_REFERENCE_DATE)}.
            </p>
          </div>

          <nav
            aria-label="Trip status sections"
            className="lg:col-start-5 lg:col-span-8"
          >
            <ul className="grid grid-cols-2 border-t border-l border-brand-forest-deep/16 sm:grid-cols-4">
              {statusNavigation.map((item) => (
                <li
                  key={item.href}
                  className="border-r border-b border-brand-forest-deep/16"
                >
                  <Link
                    href={item.href}
                    className="group flex min-h-20 items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-brand-forest-deep transition-colors duration-200 hover:bg-brand-linen focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                  >
                    <span>{item.label}</span>
                    <span className="flex items-center gap-2 font-mono text-[0.6875rem] text-brand-stone tabular-nums">
                      {String(item.count).padStart(2, "0")}
                      <ArrowDown
                        aria-hidden="true"
                        size={13}
                        className="text-brand-brass transition-transform duration-200 ease-luma group-hover:translate-y-0.5 motion-reduce:transition-none"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-6 max-w-[66rem] border-l border-brand-brass/65 pl-4 text-xs leading-5 text-muted-foreground">
          Interface history only. These records do not come from an account,
          property, payment provider, or reservation system. No live inventory,
          charge, refund, or traveler profile exists behind this page.
        </p>
      </section>

      <section
        id="upcoming-trips"
        aria-labelledby="upcoming-trips-heading"
        className="scroll-mt-28 bg-brand-linen"
      >
        <div className="container-luma py-[var(--space-section)]">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-8">
            <p className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-forest-deep uppercase lg:col-span-3">
              01 / Upcoming
            </p>
            <div className="lg:col-start-5 lg:col-span-5">
              <h2
                id="upcoming-trips-heading"
                className="max-w-[10ch] text-[clamp(3rem,6vw,6rem)] leading-[0.9] font-semibold tracking-[-0.05em] text-brand-forest-deep"
              >
                Next on the map.
              </h2>
            </div>
            <p className="max-w-[30rem] text-base leading-7 text-foreground/68 lg:col-span-3 lg:self-end">
              Two mock stays with paid test-card records and clear booking
              references. Dates and status remain anchored to the fixture date.
            </p>
          </div>

          <ol className="mt-10 divide-y divide-brand-forest-deep/16 border-t border-brand-forest-deep/16 sm:mt-14">
            {upcomingBookings.map((booking, index) => (
              <li key={booking.id}>
                <FeaturedTripRecord booking={booking} index={index} />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="completed-trips"
        aria-labelledby="completed-trips-heading"
        className="scroll-mt-28 bg-brand-paper"
      >
        <div className="container-luma py-[var(--space-section)]">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-8">
            <p className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-brass-dark uppercase lg:col-span-3">
              02 / Completed
            </p>
            <div className="lg:col-start-5 lg:col-span-5">
              <h2
                id="completed-trips-heading"
                className="max-w-[10ch] text-[clamp(3rem,6vw,6rem)] leading-[0.9] font-semibold tracking-[-0.05em] text-brand-forest-deep"
              >
                Journeys behind you.
              </h2>
            </div>
            <p className="max-w-[30rem] text-base leading-7 text-foreground/68 lg:col-span-3 lg:self-end">
              Past dates stay readable as a compact archive, with the room,
              party, mock total, and payment marker still in view.
            </p>
          </div>

          <ol className="mt-10 divide-y divide-brand-forest-deep/16 border-y border-brand-forest-deep/16 sm:mt-14">
            {completedBookings.map((booking, index) => (
              <li key={booking.id}>
                <ArchivedTripRecord booking={booking} index={index} />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="cancelled-trips"
        aria-labelledby="cancelled-trips-heading"
        className="scroll-mt-28 bg-brand-linen"
      >
        <div className="container-luma py-[var(--space-section)]">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-8">
            <p className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-stone uppercase lg:col-span-3">
              03 / Cancelled
            </p>
            <div className="lg:col-start-5 lg:col-span-5">
              <h2
                id="cancelled-trips-heading"
                className="max-w-[11ch] text-[clamp(3rem,6vw,6rem)] leading-[0.9] font-semibold tracking-[-0.05em] text-brand-forest-deep"
              >
                Closed, with the record intact.
              </h2>
            </div>
            <p className="max-w-[30rem] text-base leading-7 text-foreground/68 lg:col-span-3 lg:self-end">
              This prototype cancellation keeps its original total beside the
              exact full-refund outcome—without implying a live refund process.
            </p>
          </div>

          <ol className="mt-10 border-y border-brand-forest-deep/16 sm:mt-14">
            {cancelledBookings.map((booking, index) => (
              <li key={booking.id}>
                <ArchivedTripRecord booking={booking} index={index} />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="payment-attempts"
        aria-labelledby="payment-attempts-heading"
        className="scroll-mt-28 bg-brand-forest-deep text-brand-paper"
      >
        <div className="container-luma py-[var(--space-section)]">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-8">
            <p className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-paper/62 uppercase lg:col-span-3">
              04 / Payment attempt
            </p>
            <div className="lg:col-start-5 lg:col-span-5">
              <h2
                id="payment-attempts-heading"
                className="max-w-[10ch] text-[clamp(3rem,6vw,6rem)] leading-[0.9] font-semibold tracking-[-0.05em] text-brand-paper"
              >
                An attempt is not a trip.
              </h2>
            </div>
            <p className="max-w-[30rem] text-base leading-7 text-brand-paper/66 lg:col-span-3 lg:self-end">
              Failed payment is isolated from every booking record. It has an
              attempt reference, but no reservation reference or charge.
            </p>
          </div>

          <ol className="mt-10 sm:mt-14">
            {failedPaymentAttempts.map((booking) => (
              <li key={booking.id}>
                <FailedPaymentRecord booking={booking} />
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
