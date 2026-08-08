"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  ArrowLeft,
  CalendarBlank,
  CheckCircle,
  CreditCard,
  EnvelopeSimple,
  LockKey,
  MapPin,
  ShieldCheck,
  UsersThree,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { useBookingStore } from "@/components/providers/booking-store-provider";
import { Input } from "@/components/ui/input";
import { BookingFlowHeader } from "@/features/booking/components/booking-flow-header";
import {
  BookingFieldError,
  BookingFormErrorSummary,
} from "@/features/booking/components/booking-form-errors";
import { IncompleteBookingState } from "@/features/booking/components/incomplete-booking-state";
import { IncompleteGuestDetailsState } from "@/features/booking/components/incomplete-guest-details-state";
import {
  mockPaymentSchema,
  type MockPaymentFormValues,
} from "@/features/booking/lib/booking-form-validation";
import {
  formatMoney,
  formatStayDate,
  getGuestLabel,
  getRoomLabel,
  hasCompleteGuestDetails,
} from "@/features/booking/lib/booking-flow";

const fieldClassName =
  "h-12 rounded-none border-brand-forest-deep/32 bg-brand-paper px-4 text-base text-brand-forest-deep shadow-none placeholder:text-brand-stone/70 focus-visible:border-brand-brass focus-visible:ring-brand-brass/24 aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/24 md:text-base";

interface PreparedMockCard {
  cardholderName: string;
  lastFour: string;
  expiry: string;
}

export function BookingPayment() {
  const property = useBookingStore((state) => state.property);
  const room = useBookingStore((state) => state.room);
  const dates = useBookingStore((state) => state.dates);
  const guests = useBookingStore((state) => state.guests);
  const guestDetails = useBookingStore((state) => state.guestDetails);
  const priceSummary = useBookingStore((state) => state.priceSummary);
  const [preparedCard, setPreparedCard] = useState<PreparedMockCard | null>(
    null,
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MockPaymentFormValues>({
    resolver: zodResolver(mockPaymentSchema),
    defaultValues: {
      mockCardholderName: "",
      mockCardNumber: "",
      mockCardExpiry: "",
      mockCardSecurity: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

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
        <BookingFlowHeader
          activeStep={3}
          completedThrough={0}
          title="Prepare a way to pay."
          description="Enter test card details for this prototype. No payment service is contacted and nothing is charged."
        />
        <IncompleteBookingState
          property={property}
          dates={dates}
          guests={guests}
        />
      </main>
    );
  }

  if (!hasCompleteGuestDetails(guestDetails)) {
    return (
      <main id="main-content">
        <BookingFlowHeader
          activeStep={3}
          completedThrough={1}
          title="Prepare a way to pay."
          description="Enter test card details for this prototype. No payment service is contacted and nothing is charged."
        />
        <IncompleteGuestDetailsState />
      </main>
    );
  }

  const guestLabel = getGuestLabel(guests);
  const roomLabel = getRoomLabel(guests.rooms);
  const errorCount = Object.keys(errors).length;
  const roomSubtotalLabel = `${formatMoney(priceSummary.nightlyRate)} × ${priceSummary.nightCount} ${
    priceSummary.nightCount === 1 ? "night" : "nights"
  } × ${priceSummary.roomCount} ${
    priceSummary.roomCount === 1 ? "room" : "rooms"
  }`;

  function prepareMockPayment(values: MockPaymentFormValues) {
    setPreparedCard({
      cardholderName: values.mockCardholderName,
      lastFour: values.mockCardNumber.replace(/\D/g, "").slice(-4),
      expiry: values.mockCardExpiry,
    });
    reset();
  }

  return (
    <main id="main-content">
      <BookingFlowHeader
        activeStep={3}
        title="Prepare a way to pay."
        description="Enter test card details for this prototype. No payment service is contacted and nothing is charged."
      />

      <section aria-labelledby="payment-title" className="bg-brand-paper">
        <div className="container-luma py-[var(--space-section)]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-8">
              <div className="border-t border-brand-forest-deep/24 pt-6">
                <p className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-brass-dark uppercase">
                  Mock payment
                </p>
                <div className="mt-3 grid gap-5 sm:grid-cols-12 sm:gap-x-7">
                  <h2
                    id="payment-title"
                    className="max-w-[10ch] font-display text-[clamp(2.75rem,5vw,5.25rem)] leading-[0.92] font-medium tracking-[-0.05em] text-brand-forest-deep sm:col-span-7"
                  >
                    A card for the prototype, not a charge.
                  </h2>
                  <p className="max-w-[30rem] text-base leading-7 text-foreground/72 sm:col-span-5 sm:pt-2">
                    Prepare one masked payment summary for this page. Full card
                    details are cleared immediately after you save them.
                  </p>
                </div>
              </div>

              <div className="mt-10 grid gap-4 border-y border-brand-forest-deep/18 bg-brand-linen px-5 py-6 sm:grid-cols-[auto_1fr] sm:items-start sm:px-6">
                <ShieldCheck
                  aria-hidden="true"
                  size={22}
                  className="text-brand-brass"
                />
                <div>
                  <p className="text-sm font-semibold text-brand-forest-deep">
                    Use test values only
                  </p>
                  <p
                    id="test-card-guidance"
                    className="mt-1 text-sm leading-6 text-foreground/66"
                  >
                    Try 4242 4242 4242 4242, any future expiry, and any
                    three-digit security code. Never enter real payment details
                    in this prototype.
                  </p>
                </div>
              </div>

              <div className="mt-12 border-t border-brand-forest-deep/24 pt-7">
                <p className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-stone uppercase">
                  Payment method
                </p>
                <div className="mt-4 grid min-h-16 grid-cols-[auto_1fr_auto] items-center gap-4 border-y border-brand-forest-deep/24 bg-brand-paper px-4 py-3 sm:px-5">
                  <span className="grid size-9 place-items-center rounded-full border border-brand-forest-deep/24 text-brand-brass">
                    <CreditCard aria-hidden="true" size={18} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-brand-forest-deep">
                      Credit or debit card
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                      Local interface preview only
                    </span>
                  </span>
                  <span className="font-mono text-[0.5625rem] tracking-[0.1em] text-brand-brass-dark uppercase">
                    Selected
                  </span>
                </div>
              </div>

              <form
                className="mt-12"
                autoComplete="off"
                noValidate
                onSubmit={handleSubmit(prepareMockPayment, () =>
                  setPreparedCard(null),
                )}
                onInput={() => setPreparedCard(null)}
              >
                <BookingFormErrorSummary errorCount={errorCount} />

                <fieldset>
                  <legend className="w-full border-b border-brand-forest-deep/24 pb-5 font-display text-3xl leading-none tracking-[-0.035em] text-brand-forest-deep sm:text-4xl">
                    Card details
                  </legend>
                  <p className="mt-4 max-w-[42rem] text-sm leading-6 text-foreground/66">
                    These test fields are validated locally. If something needs
                    attention, the first field is focused and every issue stays
                    visible beside its field.
                  </p>

                  <div className="mt-7 grid gap-7">
                    <div>
                      <div className="flex items-baseline justify-between gap-4">
                        <label
                          htmlFor="mock-cardholder-name"
                          className="text-sm font-semibold text-brand-forest-deep"
                        >
                          Name on card
                        </label>
                        <span className="font-mono text-[0.5625rem] tracking-[0.1em] text-brand-stone uppercase">
                          Required
                        </span>
                      </div>
                      <Input
                        id="mock-cardholder-name"
                        type="text"
                        autoComplete="off"
                        required
                        maxLength={80}
                        aria-invalid={
                          errors.mockCardholderName ? true : undefined
                        }
                        aria-describedby={
                          errors.mockCardholderName
                            ? "mock-cardholder-name-error"
                            : undefined
                        }
                        className={`mt-2 ${fieldClassName}`}
                        {...register("mockCardholderName")}
                      />
                      <BookingFieldError
                        id="mock-cardholder-name-error"
                        message={errors.mockCardholderName?.message}
                      />
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between gap-4">
                        <label
                          htmlFor="mock-card-number"
                          className="flex items-center gap-2 text-sm font-semibold text-brand-forest-deep"
                        >
                          <CreditCard
                            aria-hidden="true"
                            size={15}
                            className="text-brand-brass"
                          />
                          Card number
                        </label>
                        <span className="font-mono text-[0.5625rem] tracking-[0.1em] text-brand-stone uppercase">
                          Test only
                        </span>
                      </div>
                      <Input
                        id="mock-card-number"
                        type="text"
                        inputMode="numeric"
                        autoComplete="off"
                        aria-invalid={
                          errors.mockCardNumber ? true : undefined
                        }
                        aria-describedby={`test-card-guidance card-number-helper${
                          errors.mockCardNumber
                            ? " mock-card-number-error"
                            : ""
                        }`}
                        placeholder="4242 4242 4242 4242"
                        required
                        minLength={13}
                        maxLength={23}
                        pattern="[0-9 ]{13,23}"
                        className={`mt-2 font-mono tabular-nums ${fieldClassName}`}
                        {...register("mockCardNumber")}
                      />
                      <p
                        id="card-number-helper"
                        className="mt-2 text-xs leading-5 text-muted-foreground"
                      >
                        Spaces are accepted. The full value is never added to
                        the booking store.
                      </p>
                      <BookingFieldError
                        id="mock-card-number-error"
                        message={errors.mockCardNumber?.message}
                      />
                    </div>

                    <div className="grid gap-7 sm:grid-cols-2">
                      <div>
                        <div className="flex items-baseline justify-between gap-4">
                          <label
                            htmlFor="mock-card-expiry"
                            className="text-sm font-semibold text-brand-forest-deep"
                          >
                            Expiry
                          </label>
                          <span className="font-mono text-[0.5625rem] tracking-[0.1em] text-brand-stone uppercase">
                            MM / YY
                          </span>
                        </div>
                        <Input
                          id="mock-card-expiry"
                          type="text"
                          inputMode="numeric"
                          autoComplete="off"
                          placeholder="12 / 30"
                          required
                          maxLength={7}
                          pattern="(0[1-9]|1[0-2]) ?/ ?[0-9]{2}"
                          aria-invalid={
                            errors.mockCardExpiry ? true : undefined
                          }
                          aria-describedby={
                            errors.mockCardExpiry
                              ? "mock-card-expiry-error"
                              : undefined
                          }
                          className={`mt-2 font-mono tabular-nums ${fieldClassName}`}
                          {...register("mockCardExpiry")}
                        />
                        <BookingFieldError
                          id="mock-card-expiry-error"
                          message={errors.mockCardExpiry?.message}
                        />
                      </div>

                      <div>
                        <div className="flex items-baseline justify-between gap-4">
                          <label
                            htmlFor="mock-card-security"
                            className="flex items-center gap-2 text-sm font-semibold text-brand-forest-deep"
                          >
                            <LockKey
                              aria-hidden="true"
                              size={15}
                              className="text-brand-brass"
                            />
                            Security code
                          </label>
                          <span className="font-mono text-[0.5625rem] tracking-[0.1em] text-brand-stone uppercase">
                            3–4 digits
                          </span>
                        </div>
                        <Input
                          id="mock-card-security"
                          type="password"
                          inputMode="numeric"
                          autoComplete="off"
                          required
                          minLength={3}
                          maxLength={4}
                          pattern="[0-9]{3,4}"
                          aria-invalid={
                            errors.mockCardSecurity ? true : undefined
                          }
                          aria-describedby={
                            errors.mockCardSecurity
                              ? "mock-card-security-error"
                              : undefined
                          }
                          className={`mt-2 font-mono tabular-nums ${fieldClassName}`}
                          {...register("mockCardSecurity")}
                        />
                        <BookingFieldError
                          id="mock-card-security-error"
                          message={errors.mockCardSecurity?.message}
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>

                <div className="mt-10 flex flex-col-reverse gap-4 border-t border-brand-forest-deep/24 pt-7 sm:flex-row sm:items-center sm:justify-between">
                  <Link
                    href="/booking/guest-details"
                    className="inline-flex min-h-12 w-fit items-center gap-2 rounded-sm px-2 text-sm font-semibold text-brand-forest-deep underline decoration-brand-brass/65 underline-offset-4 transition-colors duration-200 hover:text-brand-brass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
                  >
                    <ArrowLeft aria-hidden="true" size={16} />
                    Back to guest details
                  </Link>
                  <button
                    type="submit"
                    className="group inline-flex min-h-12 items-center justify-between gap-8 rounded-full border border-brand-forest-deep bg-brand-forest-deep px-6 py-3 text-sm font-semibold text-brand-paper transition-colors duration-200 hover:bg-brand-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
                  >
                    Prepare mock payment
                    <LockKey aria-hidden="true" size={16} />
                  </button>
                </div>

                <p className="mt-3 text-xs leading-5 text-muted-foreground sm:text-right">
                  This action only creates a masked summary on this page.
                </p>

                <div
                  aria-live="polite"
                  aria-atomic="true"
                  className="mt-6 min-h-24"
                >
                  {preparedCard ? (
                    <div className="grid gap-4 border-y border-brand-forest-deep/22 bg-brand-linen px-5 py-5 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:px-6">
                      <CheckCircle
                        aria-hidden="true"
                        size={22}
                        weight="fill"
                        className="text-brand-brass"
                      />
                      <div>
                        <p className="text-sm font-semibold text-brand-forest-deep">
                          Mock payment details prepared
                        </p>
                        <p className="mt-1 text-sm leading-6 text-foreground/66">
                          {preparedCard.cardholderName} · card ending in {" "}
                          {preparedCard.lastFour}
                        </p>
                      </div>
                      <p className="font-mono text-[0.625rem] tracking-[0.09em] text-brand-stone uppercase">
                        Expires {preparedCard.expiry}
                      </p>
                    </div>
                  ) : null}
                </div>
              </form>
            </div>

            <aside aria-labelledby="stay-summary-title" className="lg:col-span-4">
              <div className="border-y border-brand-brass/48 bg-brand-forest-deep px-5 py-7 text-brand-paper sm:px-7 sm:py-8 lg:sticky lg:top-[7.5rem]">
                <p className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-brass uppercase">
                  Your stay
                </p>
                <h2
                  id="stay-summary-title"
                  className="mt-3 max-w-[11ch] font-display text-[clamp(2.5rem,4vw,4.25rem)] leading-[0.94] tracking-[-0.045em]"
                >
                  {property.name}
                </h2>
                <p className="mt-4 flex items-start gap-2 text-sm leading-6 text-brand-paper/68">
                  <MapPin
                    aria-hidden="true"
                    size={16}
                    className="mt-1 shrink-0 text-brand-brass"
                  />
                  {property.location.region
                    ? `${property.location.region}, ${property.location.country}`
                    : `${property.location.city}, ${property.location.country}`}
                </p>

                <dl className="mt-8 border-t border-brand-paper/18">
                  <div className="border-b border-brand-paper/18 py-4">
                    <dt className="font-mono text-[0.5625rem] tracking-[0.11em] text-brand-paper/52 uppercase">
                      Room
                    </dt>
                    <dd className="mt-2 text-sm font-semibold text-brand-paper">
                      {room.name}
                    </dd>
                  </div>
                  <div className="border-b border-brand-paper/18 py-4">
                    <dt className="sr-only">Stay dates</dt>
                    <dd className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                      <div>
                        <span className="flex items-center gap-2 font-mono text-[0.5625rem] tracking-[0.11em] text-brand-paper/52 uppercase">
                          <CalendarBlank
                            aria-hidden="true"
                            size={14}
                            className="text-brand-brass"
                          />
                          Check-in
                        </span>
                        <span className="mt-2 block text-sm font-semibold text-brand-paper">
                          {formatStayDate(dates.checkIn)}
                        </span>
                      </div>
                      <div>
                        <span className="flex items-center gap-2 font-mono text-[0.5625rem] tracking-[0.11em] text-brand-paper/52 uppercase">
                          <CalendarBlank
                            aria-hidden="true"
                            size={14}
                            className="text-brand-brass"
                          />
                          Check-out
                        </span>
                        <span className="mt-2 block text-sm font-semibold text-brand-paper">
                          {formatStayDate(dates.checkOut)}
                        </span>
                      </div>
                    </dd>
                  </div>
                  <div className="border-b border-brand-paper/18 py-4">
                    <dt className="flex items-center gap-2 font-mono text-[0.5625rem] tracking-[0.11em] text-brand-paper/52 uppercase">
                      <UsersThree
                        aria-hidden="true"
                        size={14}
                        className="text-brand-brass"
                      />
                      Party
                    </dt>
                    <dd className="mt-2 text-sm font-semibold text-brand-paper">
                      {guestLabel} · {roomLabel}
                    </dd>
                  </div>
                  <div className="border-b border-brand-paper/18 py-4">
                    <dt className="flex items-center gap-2 font-mono text-[0.5625rem] tracking-[0.11em] text-brand-paper/52 uppercase">
                      <EnvelopeSimple
                        aria-hidden="true"
                        size={14}
                        className="text-brand-brass"
                      />
                      Lead guest
                    </dt>
                    <dd className="mt-2 text-sm font-semibold text-brand-paper">
                      {guestDetails.firstName} {guestDetails.lastName}
                    </dd>
                    <dd className="mt-1 break-all text-xs leading-5 text-brand-paper/58">
                      {guestDetails.email}
                    </dd>
                  </div>
                  <div className="grid grid-cols-[1fr_auto] gap-5 border-b border-brand-paper/18 py-4">
                    <dt>
                      <span className="block text-sm font-semibold text-brand-paper">
                        Room subtotal
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-brand-paper/52">
                        {roomSubtotalLabel}
                      </span>
                    </dt>
                    <dd className="font-mono text-sm font-medium text-brand-paper tabular-nums">
                      {formatMoney(priceSummary.accommodationSubtotal)}
                    </dd>
                  </div>
                  <div className="grid grid-cols-[1fr_auto] gap-5 py-4 text-sm">
                    <dt className="text-brand-paper/68">Taxes and fees</dt>
                    <dd className="font-mono text-xs tracking-[0.06em] text-brand-brass uppercase">
                      Not calculated
                    </dd>
                  </div>
                </dl>

                <div className="mt-4 border-t border-brand-paper/18 pt-5">
                  <p className="font-mono text-[0.5625rem] tracking-[0.11em] text-brand-brass uppercase">
                    This step stops here
                  </p>
                  <p className="mt-2 text-xs leading-5 text-brand-paper/58">
                    Booking submission, payment responses, retry states, and
                    confirmation follow in later roadmap units.
                  </p>
                </div>
              </div>
            </aside>
          </div>

          <p className="mt-12 max-w-[58rem] border-l border-brand-brass/65 pl-4 text-xs leading-5 text-muted-foreground">
            Prototype payment form only. No payment provider receives these
            values, no card is charged, and no reservation is created. The
            masked page summary clears when this route unmounts or reloads.
          </p>
        </div>
      </section>
    </main>
  );
}
