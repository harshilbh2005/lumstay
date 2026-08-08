"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarBlank,
  CheckCircle,
  EnvelopeSimple,
  MapPin,
  Phone,
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
import { BookingPriceBreakdown } from "@/features/booking/components/booking-price-breakdown";
import { IncompleteBookingState } from "@/features/booking/components/incomplete-booking-state";
import {
  guestDetailsSchema,
  type GuestDetailsFormValues,
} from "@/features/booking/lib/booking-form-validation";
import {
  formatMoney,
  formatStayDate,
  getGuestLabel,
  getRoomLabel,
  hasCompleteGuestDetails,
} from "@/features/booking/lib/booking-flow";
import { hasCompleteBookingPriceSummary } from "@/stores/booking-store";

const fieldClassName =
  "h-12 rounded-none border-brand-forest-deep/32 bg-brand-paper px-4 text-base text-brand-forest-deep shadow-none placeholder:text-brand-stone/70 focus-visible:border-brand-brass focus-visible:ring-brand-brass/24 aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/24 md:text-base";

export function BookingGuestDetails() {
  const property = useBookingStore((state) => state.property);
  const room = useBookingStore((state) => state.room);
  const dates = useBookingStore((state) => state.dates);
  const guests = useBookingStore((state) => state.guests);
  const guestDetails = useBookingStore((state) => state.guestDetails);
  const priceSummary = useBookingStore((state) => state.priceSummary);
  const setGuestDetails = useBookingStore((state) => state.setGuestDetails);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved">(
    hasCompleteGuestDetails(guestDetails) ? "saved" : "idle",
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<GuestDetailsFormValues>({
    resolver: zodResolver(guestDetailsSchema),
    defaultValues: guestDetails,
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

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
          activeStep={2}
          completedThrough={0}
          title="Tell us who is travelling."
          description="Add the lead guest and the best contact details for this stay. Payment follows later."
        />
        <IncompleteBookingState
          property={property}
          dates={dates}
          guests={guests}
        />
      </main>
    );
  }

  const guestLabel = getGuestLabel(guests);
  const roomLabel = getRoomLabel(guests.rooms);
  const errorCount = Object.keys(errors).length;
  const hasSavedGuestDetails = hasCompleteGuestDetails(guestDetails);
  const canContinueToPayment = hasSavedGuestDetails && !isDirty;
  const roomSubtotalLabel = `${formatMoney(priceSummary.nightlyRate)} × ${priceSummary.nightCount} ${
    priceSummary.nightCount === 1 ? "night" : "nights"
  } × ${priceSummary.roomCount} ${
    priceSummary.roomCount === 1 ? "room" : "rooms"
  }`;

  function saveGuestDetails(values: GuestDetailsFormValues) {
    setGuestDetails(values);
    reset(values);
    setSaveStatus("saved");
  }

  return (
    <main id="main-content">
      <BookingFlowHeader
        activeStep={2}
        title="Tell us who is travelling."
        description="Add the lead guest and the best contact details for this stay. Payment follows later."
      />

      <section aria-labelledby="guest-details-title" className="bg-brand-paper">
        <div className="container-luma py-[var(--space-section)]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-8">
              <div className="border-t border-brand-forest-deep/24 pt-6">
                <p className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-brass-dark uppercase">
                  Lead guest
                </p>
                <div className="mt-3 grid gap-5 sm:grid-cols-12 sm:gap-x-7">
                  <h2
                    id="guest-details-title"
                    className="max-w-[11ch] font-display text-[clamp(2.75rem,5vw,5.25rem)] leading-[0.92] font-medium tracking-[-0.05em] text-brand-forest-deep sm:col-span-7"
                  >
                    Who should we keep in touch with?
                  </h2>
                  <p className="max-w-[30rem] text-base leading-7 text-foreground/72 sm:col-span-5 sm:pt-2">
                    Use the name of the lead guest and contact details that can
                    be reached about this stay.
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
                    Kept only in this booking session
                  </p>
                  <p className="mt-1 text-sm leading-6 text-foreground/66">
                    This prototype stores these details in memory while you
                    navigate. It does not create an account, reservation, or
                    payment record.
                  </p>
                </div>
              </div>

              <form
                className="mt-12"
                noValidate
                onSubmit={handleSubmit(saveGuestDetails)}
                onInput={() => setSaveStatus("idle")}
              >
                <BookingFormErrorSummary errorCount={errorCount} />

                <fieldset>
                  <legend className="w-full border-b border-brand-forest-deep/24 pb-5 font-display text-3xl leading-none tracking-[-0.035em] text-brand-forest-deep sm:text-4xl">
                    Identity
                  </legend>
                  <div className="mt-7 grid gap-7 sm:grid-cols-2">
                    <div>
                      <div className="flex items-baseline justify-between gap-4">
                        <label
                          htmlFor="first-name"
                          className="text-sm font-semibold text-brand-forest-deep"
                        >
                          First name
                        </label>
                        <span className="font-mono text-[0.5625rem] tracking-[0.1em] text-brand-stone uppercase">
                          Required
                        </span>
                      </div>
                      <Input
                        id="first-name"
                        type="text"
                        autoComplete="given-name"
                        required
                        maxLength={80}
                        aria-invalid={errors.firstName ? true : undefined}
                        aria-describedby={
                          errors.firstName ? "first-name-error" : undefined
                        }
                        className={`mt-2 ${fieldClassName}`}
                        {...register("firstName")}
                      />
                      <BookingFieldError
                        id="first-name-error"
                        message={errors.firstName?.message}
                      />
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between gap-4">
                        <label
                          htmlFor="last-name"
                          className="text-sm font-semibold text-brand-forest-deep"
                        >
                          Last name
                        </label>
                        <span className="font-mono text-[0.5625rem] tracking-[0.1em] text-brand-stone uppercase">
                          Required
                        </span>
                      </div>
                      <Input
                        id="last-name"
                        type="text"
                        autoComplete="family-name"
                        required
                        maxLength={80}
                        aria-invalid={errors.lastName ? true : undefined}
                        aria-describedby={
                          errors.lastName ? "last-name-error" : undefined
                        }
                        className={`mt-2 ${fieldClassName}`}
                        {...register("lastName")}
                      />
                      <BookingFieldError
                        id="last-name-error"
                        message={errors.lastName?.message}
                      />
                    </div>
                  </div>
                </fieldset>

                <fieldset className="mt-12">
                  <legend className="w-full border-b border-brand-forest-deep/24 pb-5 font-display text-3xl leading-none tracking-[-0.035em] text-brand-forest-deep sm:text-4xl">
                    Contact
                  </legend>
                  <p className="mt-4 max-w-[42rem] text-sm leading-6 text-foreground/66">
                    Use contact details the lead guest can access while
                    travelling. Include a country code with the phone number.
                  </p>

                  <div className="mt-7 grid gap-7 sm:grid-cols-2">
                    <div>
                      <div className="flex items-baseline justify-between gap-4">
                        <label
                          htmlFor="email"
                          className="flex items-center gap-2 text-sm font-semibold text-brand-forest-deep"
                        >
                          <EnvelopeSimple
                            aria-hidden="true"
                            size={15}
                            className="text-brand-brass"
                          />
                          Email address
                        </label>
                        <span className="font-mono text-[0.5625rem] tracking-[0.1em] text-brand-stone uppercase">
                          Required
                        </span>
                      </div>
                      <Input
                        id="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        spellCheck={false}
                        required
                        maxLength={254}
                        aria-invalid={errors.email ? true : undefined}
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                        className={`mt-2 ${fieldClassName}`}
                        {...register("email")}
                      />
                      <BookingFieldError
                        id="email-error"
                        message={errors.email?.message}
                      />
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between gap-4">
                        <label
                          htmlFor="phone"
                          className="flex items-center gap-2 text-sm font-semibold text-brand-forest-deep"
                        >
                          <Phone
                            aria-hidden="true"
                            size={15}
                            className="text-brand-brass"
                          />
                          Phone number
                        </label>
                        <span className="font-mono text-[0.5625rem] tracking-[0.1em] text-brand-stone uppercase">
                          Required
                        </span>
                      </div>
                      <Input
                        id="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        aria-invalid={errors.phone ? true : undefined}
                        aria-describedby={`phone-helper${
                          errors.phone ? " phone-error" : ""
                        }`}
                        required
                        maxLength={32}
                        className={`mt-2 ${fieldClassName}`}
                        {...register("phone")}
                      />
                      <p
                        id="phone-helper"
                        className="mt-2 text-xs leading-5 text-muted-foreground"
                      >
                        Example: +91 98765 43210
                      </p>
                      <BookingFieldError
                        id="phone-error"
                        message={errors.phone?.message}
                      />
                    </div>
                  </div>
                </fieldset>

                <div className="mt-10 flex flex-col-reverse gap-4 border-t border-brand-forest-deep/24 pt-7 sm:flex-row sm:items-center sm:justify-between">
                  <Link
                    href="/booking/review"
                    className="inline-flex min-h-12 w-fit items-center gap-2 rounded-sm px-2 text-sm font-semibold text-brand-forest-deep underline decoration-brand-brass/65 underline-offset-4 transition-colors duration-200 hover:text-brand-brass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
                  >
                    <ArrowLeft aria-hidden="true" size={16} />
                    Back to review
                  </Link>
                  <button
                    type="submit"
                    className="group inline-flex min-h-12 items-center justify-between gap-8 rounded-full border border-brand-forest-deep bg-brand-forest-deep px-6 py-3 text-sm font-semibold text-brand-paper transition-colors duration-200 hover:bg-brand-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
                  >
                    Save guest details
                    <ArrowRight
                      aria-hidden="true"
                      size={16}
                      className="transition-transform duration-200 ease-luma group-hover:translate-x-0.5 motion-reduce:transition-none"
                    />
                  </button>
                </div>

                <div
                  aria-live="polite"
                  aria-atomic="true"
                  className="mt-4 min-h-6 text-sm leading-6"
                >
                  {saveStatus === "saved" ? (
                    <p className="flex items-center gap-2 font-semibold text-brand-forest-deep">
                      <CheckCircle
                        aria-hidden="true"
                        size={18}
                        weight="fill"
                        className="text-brand-brass"
                      />
                      Guest details saved for this booking session.
                    </p>
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
                </dl>

                <div className="mt-7 border-t border-brand-paper/18 pt-6">
                  <BookingPriceBreakdown
                    headingLevel={3}
                    idPrefix="guest"
                    presentation="compact"
                    priceSummary={priceSummary}
                    property={property}
                    room={room}
                    roomSubtotalLabel={roomSubtotalLabel}
                    showReviewLink
                  />
                </div>

                {canContinueToPayment ? (
                  <Link
                    href="/booking/payment"
                    aria-describedby="payment-step-status"
                    className="group mt-4 inline-flex min-h-12 w-full items-center justify-between gap-5 rounded-full border border-brand-paper bg-brand-paper px-6 py-3 text-sm font-semibold text-brand-forest-deep transition-colors duration-200 hover:bg-brand-linen focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass focus-visible:ring-offset-4 focus-visible:ring-offset-brand-forest-deep"
                  >
                    Continue to payment
                    <ArrowRight
                      aria-hidden="true"
                      size={16}
                      className="transition-transform duration-200 ease-luma group-hover:translate-x-0.5 motion-reduce:transition-none"
                    />
                  </Link>
                ) : (
                  <button
                    type="button"
                    disabled
                    aria-describedby="payment-step-status"
                    className="mt-4 inline-flex min-h-12 w-full cursor-not-allowed items-center justify-between gap-5 rounded-full border border-brand-paper/28 bg-brand-paper/10 px-6 py-3 text-sm font-semibold text-brand-paper/58"
                  >
                    {hasSavedGuestDetails
                      ? "Save changes first"
                      : "Save guest details first"}
                    <ArrowRight aria-hidden="true" size={16} />
                  </button>
                )}
                <p
                  id="payment-step-status"
                  className="mt-3 text-xs leading-5 text-brand-paper/52"
                >
                  {canContinueToPayment
                    ? "Review the mock payment form next. No card will be charged."
                    : hasSavedGuestDetails
                      ? "Save your edits before opening the mock payment step."
                      : "Save the lead guest before opening the mock payment step."}
                </p>
              </div>
            </aside>
          </div>

          <p className="mt-12 max-w-[58rem] border-l border-brand-brass/65 pl-4 text-xs leading-5 text-muted-foreground">
            Prototype guest-details step only. The form is validated locally
            with accessible inline guidance; the displayed final total and
            cancellation charges are deterministic mock terms held only in
            this booking session.
          </p>
        </div>
      </section>
    </main>
  );
}
