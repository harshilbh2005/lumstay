import { Check } from "@phosphor-icons/react";
import Link from "next/link";

import { formatMoney } from "@/features/booking/lib/booking-flow";
import type {
  BookingProperty,
  BookingRoom,
  CompleteBookingPriceSummary,
} from "@/stores/booking-store";

interface BookingPriceBreakdownProps {
  headingLevel: 2 | 3;
  idPrefix: string;
  presentation: "feature" | "compact";
  priceSummary: CompleteBookingPriceSummary;
  property: BookingProperty;
  room: BookingRoom;
  roomSubtotalLabel: string;
  showReviewLink?: boolean;
}

function formatBasisPoints(basisPoints: number) {
  return `${basisPoints / 100}%`;
}

export function BookingPriceBreakdown({
  headingLevel,
  idPrefix,
  presentation,
  priceSummary,
  property,
  room,
  roomSubtotalLabel,
  showReviewLink = false,
}: BookingPriceBreakdownProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const headingId = `${idPrefix}-price-title`;
  const isFeature = presentation === "feature";
  const serviceFeeLabel = `${formatMoney(priceSummary.serviceFeePerRoom)} × ${priceSummary.roomCount} ${
    priceSummary.roomCount === 1 ? "room" : "rooms"
  }`;

  return (
    <section aria-labelledby={headingId}>
      <p className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-brass uppercase">
        Complete price
      </p>
      <Heading
        id={headingId}
        className={
          isFeature
            ? "mt-3 max-w-[10ch] font-display text-[clamp(2.5rem,4vw,4.5rem)] leading-[0.94] tracking-[-0.045em]"
            : "mt-2 font-display text-2xl tracking-[-0.025em] text-brand-paper"
        }
      >
        {isFeature ? "One final total." : "Price summary"}
      </Heading>
      <p className="mt-3 text-xs leading-5 text-brand-paper/68">
        Prototype estimate in INR. Every modeled amount is shown; no separate
        pay-at-property charge is included.
      </p>

      <dl className="mt-6 border-t border-brand-paper/18">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-5 border-b border-brand-paper/18 py-4">
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
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-5 border-b border-brand-paper/18 py-4">
          <dt>
            <span className="block text-sm text-brand-paper/76">
              {property.pricingPolicy.estimatedTax.label}
            </span>
            <span className="mt-1 block text-xs leading-5 text-brand-paper/58">
              {formatBasisPoints(priceSummary.taxRateBasisPoints)} prototype
              rate on the room subtotal
            </span>
          </dt>
          <dd className="font-mono text-sm font-medium text-brand-paper tabular-nums">
            {formatMoney(priceSummary.estimatedTaxAmount)}
          </dd>
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-5 border-b border-brand-paper/18 py-4">
          <dt>
            <span className="block text-sm text-brand-paper/76">
              {property.pricingPolicy.serviceFee.label}
            </span>
            <span className="mt-1 block text-xs leading-5 text-brand-paper/58">
              {serviceFeeLabel} for the full stay
            </span>
          </dt>
          <dd className="font-mono text-sm font-medium text-brand-paper tabular-nums">
            {formatMoney(priceSummary.serviceFeeAmount)}
          </dd>
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-5 py-5">
          <dt>
            <span className="block font-display text-2xl tracking-[-0.025em] text-brand-paper">
              Final total
            </span>
            <span className="mt-1 block text-xs leading-5 text-brand-paper/58">
              Room, estimated taxes, and Luma fee.
            </span>
          </dt>
          <dd className="font-mono text-xl font-semibold text-brand-paper tabular-nums">
            {formatMoney(priceSummary.totalPrice)}
          </dd>
        </div>
      </dl>

      <div className="border-t border-brand-paper/18 pt-5">
        <p className="font-mono text-[0.5625rem] tracking-[0.11em] text-brand-brass uppercase">
          Included with this rate
        </p>
        <ul className="mt-3 grid gap-2">
          {room.ratePlan.inclusions.map((inclusion) => (
            <li
              key={inclusion}
              className="grid grid-cols-[1rem_1fr] gap-2 text-xs leading-5 text-brand-paper/76"
            >
              <Check
                aria-hidden="true"
                size={13}
                weight="bold"
                className="mt-1 text-brand-brass"
              />
              {inclusion}
            </li>
          ))}
        </ul>
        {room.ratePlan.exclusions.length > 0 ? (
          <p className="mt-3 text-xs leading-5 text-brand-paper/58">
            Not included: {room.ratePlan.exclusions.join(" ")}
          </p>
        ) : null}
      </div>

      <div className="mt-5 border-t border-brand-paper/18 pt-5">
        <p className="font-mono text-[0.5625rem] tracking-[0.11em] text-brand-brass uppercase">
          Cancellation · {room.cancellationPolicy.label}
        </p>
        <p className="mt-2 text-xs leading-5 text-brand-paper/76">
          {room.cancellationPolicy.summary} Any charge is calculated from the
          room subtotal only, before estimated taxes and the Luma fee.
        </p>
        {showReviewLink ? (
          <Link
            href="/booking/review#cancellation-title"
            className="mt-2 inline-flex min-h-11 items-center text-xs font-semibold text-brand-paper underline decoration-brand-brass/75 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass focus-visible:ring-offset-4 focus-visible:ring-offset-brand-forest-deep"
          >
            Review the full charge schedule
          </Link>
        ) : null}
      </div>
    </section>
  );
}
