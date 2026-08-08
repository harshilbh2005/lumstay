"use client";

import { useState, type FormEvent } from "react";
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

import { useBookingStore } from "@/components/providers/booking-store-provider";
import { Input } from "@/components/ui/input";
import { BookingFlowHeader } from "@/features/booking/components/booking-flow-header";
import { IncompleteBookingState } from "@/features/booking/components/incomplete-booking-state";
import {
  formatMoney,
  formatStayDate,
  getGuestLabel,
  getRoomLabel,
} from "@/features/booking/lib/booking-flow";
import type { BookingGuestDetails } from "@/stores/booking-store";

const fieldClassName =
  "h-12 rounded-none border-brand-forest-deep/32 bg-brand-paper px-4 text-base text-brand-forest-deep shadow-none placeholder:text-brand-stone/70 focus-visible:border-brand-brass focus-visible:ring-brand-brass/24 md:text-base";

function hasCompleteGuestDetails(guestDetails: BookingGuestDetails) {
  return Object.values(guestDetails).every(Boolean);
}

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
  const roomSubtotalLabel = `${formatMoney(priceSummary.nightlyRate)} × ${priceSummary.nightCount} ${
    priceSummary.nightCount === 1 ? "night" : "nights"
  } × ${priceSummary.roomCount} ${
    priceSummary.roomCount === 1 ? "room" : "rooms"
  }`;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    setGuestDetails({
      firstName: String(formData.get("firstName") ?? ""),
      lastName: String(formData.get("lastName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
    });
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
                <p className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-brass uppercase">
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
                onSubmit={handleSubmit}
                onInput={() => setSaveStatus("idle")}
              >
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
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        defaultValue={guestDetails.firstName}
                        required
                        maxLength={80}
                        className={`mt-2 ${fieldClassName}`}
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
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        defaultValue={guestDetails.lastName}
                        required
                        maxLength={80}
                        className={`mt-2 ${fieldClassName}`}
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
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        spellCheck={false}
                        defaultValue={guestDetails.email}
                        required
                        maxLength={254}
                        className={`mt-2 ${fieldClassName}`}
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
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        aria-describedby="phone-helper"
                        defaultValue={guestDetails.phone}
                        required
                        maxLength={32}
                        className={`mt-2 ${fieldClassName}`}
                      />
                      <p
                        id="phone-helper"
                        className="mt-2 text-xs leading-5 text-foreground/60"
                      >
                        Example: +91 98765 43210
                      </p>
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
                  <div className="grid gap-4 border-b border-brand-paper/18 py-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <div>
                      <dt className="flex items-center gap-2 font-mono text-[0.5625rem] tracking-[0.11em] text-brand-paper/52 uppercase">
                        <CalendarBlank
                          aria-hidden="true"
                          size={14}
                          className="text-brand-brass"
                        />
                        Check-in
                      </dt>
                      <dd className="mt-2 text-sm font-semibold text-brand-paper">
                        {formatStayDate(dates.checkIn)}
                      </dd>
                    </div>
                    <div>
                      <dt className="flex items-center gap-2 font-mono text-[0.5625rem] tracking-[0.11em] text-brand-paper/52 uppercase">
                        <CalendarBlank
                          aria-hidden="true"
                          size={14}
                          className="text-brand-brass"
                        />
                        Check-out
                      </dt>
                      <dd className="mt-2 text-sm font-semibold text-brand-paper">
                        {formatStayDate(dates.checkOut)}
                      </dd>
                    </div>
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

                <button
                  type="button"
                  disabled
                  aria-describedby="payment-step-status"
                  className="mt-4 inline-flex min-h-12 w-full cursor-not-allowed items-center justify-between gap-5 rounded-full border border-brand-paper/28 bg-brand-paper/10 px-6 py-3 text-sm font-semibold text-brand-paper/58"
                >
                  Continue to payment
                  <ArrowRight aria-hidden="true" size={16} />
                </button>
                <p
                  id="payment-step-status"
                  className="mt-3 text-xs leading-5 text-brand-paper/52"
                >
                  Payment is the next roadmap unit and is not available on this
                  step.
                </p>
              </div>
            </aside>
          </div>

          <p className="mt-12 max-w-[58rem] border-l border-brand-brass/65 pl-4 text-xs leading-5 text-muted-foreground">
            Prototype guest-details step only. The form is session-held and
            uses browser-native field constraints; full accessible inline
            validation follows in a later roadmap unit.
          </p>
        </div>
      </section>
    </main>
  );
}
