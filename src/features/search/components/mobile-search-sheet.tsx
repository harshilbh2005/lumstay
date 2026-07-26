"use client";

import * as React from "react";
import Form from "next/form";
import {
  ArrowRight,
  CalendarBlank,
  MagnifyingGlass,
  MapPin,
  Minus,
  Plus,
  UsersThree,
  X,
} from "@phosphor-icons/react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { SearchFormValues } from "@/features/search/lib/search-context";

interface GuestState {
  adults: number;
  children: number;
  rooms: number;
}

function GuestCounter({
  label,
  description,
  value,
  minimum,
  maximum,
  onChange,
}: {
  label: string;
  description: string;
  value: number;
  minimum: number;
  maximum: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex min-h-20 items-center justify-between gap-5 border-t border-brand-forest-deep/14 py-4">
      <div>
        <p className="text-base font-semibold text-brand-forest-deep">{label}</p>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <div
        className="flex shrink-0 items-center gap-2"
        aria-label={`${value} ${label.toLowerCase()}`}
      >
        <button
          type="button"
          aria-label={`Remove one ${label.toLowerCase()}`}
          disabled={value <= minimum}
          onClick={() => onChange(value - 1)}
          className="flex size-11 items-center justify-center border border-brand-forest-deep/28 text-brand-forest-deep transition-colors duration-200 hover:border-brand-forest-deep hover:bg-brand-linen focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-35"
        >
          <Minus aria-hidden="true" size={16} />
        </button>
        <span className="w-7 text-center font-mono text-xs tabular-nums text-brand-forest-deep">
          {value}
        </span>
        <button
          type="button"
          aria-label={`Add one ${label.toLowerCase()}`}
          disabled={value >= maximum}
          onClick={() => onChange(value + 1)}
          className="flex size-11 items-center justify-center border border-brand-forest-deep/28 text-brand-forest-deep transition-colors duration-200 hover:border-brand-forest-deep hover:bg-brand-linen focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-35"
        >
          <Plus aria-hidden="true" size={16} />
        </button>
      </div>
    </div>
  );
}

export function MobileSearchSheet({
  initialValues,
  preservedEntries,
}: {
  initialValues: SearchFormValues;
  preservedEntries: readonly [string, string][];
}) {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const [guests, setGuests] = React.useState<GuestState>({
    adults: initialValues.adults,
    children: initialValues.children,
    rooms: initialValues.rooms,
  });

  function resetDraft() {
    formRef.current?.reset();
    setGuests({
      adults: initialValues.adults,
      children: initialValues.children,
      rooms: initialValues.rooms,
    });
    setError("");
  }

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      resetDraft();
    }

    setIsOpen(nextOpen);
  }

  function updateGuests(key: keyof GuestState, value: number) {
    setGuests((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const data = new FormData(event.currentTarget);
    const checkIn = String(data.get("checkIn") ?? "");
    const checkOut = String(data.get("checkOut") ?? "");

    if (checkOut <= checkIn) {
      event.preventDefault();
      setError("Check-out must be after check-in.");
      return;
    }

    setError("");
    setIsOpen(false);
  }

  return (
    <div className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={handleOpenChange}>
        <SheetTrigger
          render={
            <button
              type="button"
              className="group/change flex min-h-14 w-full items-center justify-between gap-4 px-5 text-left text-sm font-semibold text-brand-forest-deep transition-colors duration-200 hover:bg-brand-forest-deep hover:text-brand-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset sm:px-6"
            />
          }
        >
          Change search
          <ArrowRight
            aria-hidden="true"
            size={16}
            className="transition-transform duration-200 ease-luma group-hover/change:translate-x-1"
          />
        </SheetTrigger>

        <SheetContent
          side="bottom"
          showCloseButton={false}
          className="h-[calc(100dvh-0.75rem)] max-h-[calc(100dvh-0.75rem)] gap-0 overflow-hidden rounded-t-panel border-x border-t border-brand-forest-deep/18 bg-brand-paper p-0 shadow-float lg:hidden"
        >
          <header className="grid min-h-20 shrink-0 grid-cols-[1fr_auto] items-center gap-4 border-b border-brand-forest-deep/16 px-5">
            <div>
              <p className="font-mono text-[0.625rem] tracking-[0.14em] text-brand-brass uppercase">
                Edit the trip
              </p>
              <SheetTitle className="mt-1 font-sans text-xl font-bold tracking-[-0.035em] text-brand-forest-deep">
                Change search
              </SheetTitle>
              <SheetDescription className="sr-only">
                Update destination, dates, guests, and rooms for this search.
              </SheetDescription>
            </div>
            <SheetClose
              render={
                <button
                  type="button"
                  aria-label="Close search"
                  className="flex size-11 items-center justify-center border border-brand-forest-deep/20 text-brand-forest-deep transition-colors duration-200 hover:border-brand-forest-deep hover:bg-brand-linen focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              }
            >
              <X aria-hidden="true" size={19} />
            </SheetClose>
          </header>

          <Form
            ref={formRef}
            action="/search"
            scroll={false}
            onSubmit={handleSubmit}
            onInput={() => {
              if (error) setError("");
            }}
            className="flex min-h-0 flex-1 flex-col"
          >
            {preservedEntries.map(([name, value], index) => (
              <input
                key={`${name}-${value}-${index}`}
                type="hidden"
                name={name}
                value={value}
              />
            ))}

            <div className="min-h-0 flex-1 overscroll-contain overflow-y-auto px-5 py-6">
              <label className="block">
                <span className="mb-2 flex items-center gap-2 font-mono text-[0.625rem] tracking-[0.13em] text-brand-forest-deep uppercase">
                  <MapPin
                    aria-hidden="true"
                    size={15}
                    weight="duotone"
                    className="text-brand-brass"
                  />
                  Destination
                </span>
                <input
                  name="destination"
                  type="text"
                  required
                  autoComplete="off"
                  defaultValue={initialValues.destination}
                  placeholder="City, coast or hotel"
                  className="min-h-14 w-full border border-brand-forest-deep/28 bg-brand-paper px-4 text-base font-semibold text-brand-forest-deep outline-none transition-[border-color,box-shadow,background-color] duration-200 placeholder:font-normal placeholder:text-muted-foreground focus:border-brand-forest-deep focus:ring-2 focus:ring-ring/30"
                />
              </label>

              <fieldset className="mt-7 border-t border-brand-forest-deep/16 pt-5">
                <legend className="flex items-center gap-2 font-mono text-[0.625rem] tracking-[0.13em] text-brand-forest-deep uppercase">
                  <CalendarBlank
                    aria-hidden="true"
                    size={15}
                    weight="duotone"
                    className="text-brand-brass"
                  />
                  Dates
                </legend>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <label className="min-w-0">
                    <span className="mb-2 block text-sm font-semibold text-brand-forest-deep">
                      Check in
                    </span>
                    <input
                      name="checkIn"
                      type="date"
                      required
                      defaultValue={initialValues.checkIn}
                      className="min-h-14 w-full min-w-0 border border-brand-forest-deep/28 bg-brand-paper px-3 text-sm text-brand-forest-deep outline-none transition-[border-color,box-shadow,background-color] duration-200 focus:border-brand-forest-deep focus:ring-2 focus:ring-ring/30"
                    />
                  </label>
                  <label className="min-w-0">
                    <span className="mb-2 block text-sm font-semibold text-brand-forest-deep">
                      Check out
                    </span>
                    <input
                      name="checkOut"
                      type="date"
                      required
                      defaultValue={initialValues.checkOut}
                      className="min-h-14 w-full min-w-0 border border-brand-forest-deep/28 bg-brand-paper px-3 text-sm text-brand-forest-deep outline-none transition-[border-color,box-shadow,background-color] duration-200 focus:border-brand-forest-deep focus:ring-2 focus:ring-ring/30"
                    />
                  </label>
                </div>
              </fieldset>

              <fieldset className="mt-7 border-t border-brand-forest-deep/16 pt-5">
                <legend className="flex items-center gap-2 font-mono text-[0.625rem] tracking-[0.13em] text-brand-forest-deep uppercase">
                  <UsersThree
                    aria-hidden="true"
                    size={15}
                    weight="duotone"
                    className="text-brand-brass"
                  />
                  Guests and rooms
                </legend>
                <div className="mt-3">
                  <GuestCounter
                    label="Adults"
                    description="Ages 13 or above"
                    value={guests.adults}
                    minimum={1}
                    maximum={8}
                    onChange={(value) => updateGuests("adults", value)}
                  />
                  <GuestCounter
                    label="Children"
                    description="Ages 0–12"
                    value={guests.children}
                    minimum={0}
                    maximum={6}
                    onChange={(value) => updateGuests("children", value)}
                  />
                  <GuestCounter
                    label="Rooms"
                    description="Up to 8 rooms"
                    value={guests.rooms}
                    minimum={1}
                    maximum={8}
                    onChange={(value) => updateGuests("rooms", value)}
                  />
                </div>
              </fieldset>

              <input type="hidden" name="adults" value={guests.adults} />
              <input type="hidden" name="children" value={guests.children} />
              <input type="hidden" name="rooms" value={guests.rooms} />

              <p
                aria-live="polite"
                className="mt-4 min-h-6 text-sm font-medium text-destructive"
              >
                {error}
              </p>
            </div>

            <div className="grid shrink-0 grid-cols-[auto_minmax(0,1fr)] items-center gap-4 border-t border-brand-forest-deep/16 bg-brand-paper px-5 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
              <SheetClose
                render={
                  <button
                    type="button"
                    className="min-h-12 px-1 text-sm font-semibold text-brand-forest-deep underline decoration-brand-forest-deep/35 underline-offset-4 transition-colors duration-200 hover:text-brand-brass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                }
              >
                Cancel
              </SheetClose>
              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-pill border border-brand-forest-deep bg-brand-forest-deep px-5 text-sm font-semibold text-brand-paper transition-colors duration-200 hover:bg-brand-forest hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:translate-y-px"
              >
                <MagnifyingGlass aria-hidden="true" size={16} />
                Search stays
              </button>
            </div>
          </Form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
