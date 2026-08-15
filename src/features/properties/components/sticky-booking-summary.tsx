"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format, isAfter, parseISO } from "date-fns";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarBlank,
  Prohibit,
} from "@phosphor-icons/react";
import type { DateRange } from "react-day-picker";

import { useBookingStore } from "@/components/providers/booking-store-provider";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type {
  BookingDateRange,
  BookingRoom,
} from "@/stores/booking-store";

export type BookingSummaryRoom = {
  id: string;
  name: string;
  bookingRoom: BookingRoom;
  formattedPrice: string;
  breakfastLabel: string;
  cancellationLabel: string;
};

const roomSelectionName = "casa-serein-room";
const mockToday = new Date(2026, 6, 19);
const summaryActionClassName =
  "group col-span-2 inline-flex min-h-12 items-center justify-between gap-4 rounded-full border border-brand-paper/68 px-5 py-3 text-sm font-semibold text-brand-paper transition-colors duration-200 hover:border-brand-brass hover:bg-brand-paper hover:text-brand-forest-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass focus-visible:ring-offset-2 focus-visible:ring-offset-brand-forest-deep disabled:cursor-not-allowed disabled:border-brand-paper/24 disabled:text-brand-paper/45 disabled:hover:bg-transparent disabled:hover:text-brand-paper/45 lg:col-span-3";

function getDateRange(dates: BookingDateRange): DateRange | undefined {
  return dates.checkIn && dates.checkOut
    ? {
        from: parseISO(dates.checkIn),
        to: parseISO(dates.checkOut),
      }
    : undefined;
}

function getDateSummary(dates: BookingDateRange) {
  if (!dates.checkIn || !dates.checkOut) {
    return "Any dates";
  }

  const checkIn = parseISO(dates.checkIn);
  const checkOut = parseISO(dates.checkOut);
  const isSameMonth = format(checkIn, "yyyy-MM") === format(checkOut, "yyyy-MM");

  return isSameMonth
    ? `${format(checkIn, "dd")}–${format(checkOut, "dd MMM")}`
    : `${format(checkIn, "dd MMM")}–${format(checkOut, "dd MMM")}`;
}

export function StickyBookingSummary({
  rooms,
  sectionId,
}: {
  rooms: readonly BookingSummaryRoom[];
  sectionId: string;
}) {
  const router = useRouter();
  const selectedRoomId = useBookingStore((state) => state.room?.id ?? null);
  const bookingDates = useBookingStore((state) => state.dates);
  const setRoom = useBookingStore((state) => state.setRoom);
  const setDates = useBookingStore((state) => state.setDates);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [draftDates, setDraftDates] = useState<DateRange | undefined>(() =>
    getDateRange(bookingDates),
  );
  const [dateError, setDateError] = useState("");

  useEffect(() => {
    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    function handleRoomChange(event: Event) {
      const target = event.target;

      if (
        !(target instanceof HTMLInputElement) ||
        target.name !== roomSelectionName ||
        !target.checked
      ) {
        return;
      }

      const room = rooms.find((candidate) => candidate.id === target.value);

      if (room) {
        setRoom(room.bookingRoom);
      }
    }

    section.addEventListener("change", handleRoomChange);

    return () => section.removeEventListener("change", handleRoomChange);
  }, [rooms, sectionId, setRoom]);

  useEffect(() => {
    const section = document.getElementById(sectionId);
    const inputs = section?.querySelectorAll<HTMLInputElement>(
      `input[name="${roomSelectionName}"]`,
    );

    inputs?.forEach((input) => {
      input.checked = input.value === selectedRoomId;
    });
  }, [sectionId, selectedRoomId]);

  const selectedRoom =
    rooms.find((room) => room.id === selectedRoomId) ?? null;
  const hasCompleteDates = Boolean(
    bookingDates.checkIn && bookingDates.checkOut,
  );
  const hasAvailableRooms = rooms.length > 0;
  const minimumRate = rooms[0]?.formattedPrice ?? "Not available";
  const targetRoomId = selectedRoom?.id ?? rooms[0]?.id;

  function reviewRoom() {
    if (!targetRoomId) {
      return;
    }

    const room = document.getElementById(targetRoomId);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    room?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  function updateDatesInUrl(dates: BookingDateRange) {
    const params = new URLSearchParams(window.location.search);

    if (dates.checkIn && dates.checkOut) {
      params.set("checkIn", dates.checkIn);
      params.set("checkOut", dates.checkOut);
    } else {
      params.delete("checkIn");
      params.delete("checkOut");
    }

    const search = params.toString();

    router.replace(
      `${window.location.pathname}${search ? `?${search}` : ""}${window.location.hash}`,
      { scroll: false },
    );
  }

  function openDatePicker() {
    setDraftDates(getDateRange(bookingDates));
    setDateError("");
    setIsDatePickerOpen(true);
  }

  function applyDates() {
    if (
      !draftDates?.from ||
      !draftDates.to ||
      !isAfter(draftDates.to, draftDates.from)
    ) {
      setDateError("Choose a check-in date and a later check-out date.");
      return;
    }

    const dates = {
      checkIn: format(draftDates.from, "yyyy-MM-dd"),
      checkOut: format(draftDates.to, "yyyy-MM-dd"),
    };

    setDates(dates);
    updateDatesInUrl(dates);
    setDateError("");
    setIsDatePickerOpen(false);
  }

  function clearDates() {
    const dates = { checkIn: null, checkOut: null };

    setDates(dates);
    updateDatesInUrl(dates);
    setDraftDates(undefined);
    setDateError("");
    setIsDatePickerOpen(false);
  }

  return (
    <aside
      aria-label="Room booking summary"
      className="sticky top-[5.5rem] z-20 mt-10 sm:mt-12"
      data-booking-summary
    >
      <div className="border-y border-brand-brass/48 bg-brand-forest-deep text-brand-paper">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-5 gap-y-3 px-4 py-4 sm:items-center sm:px-5 lg:grid-cols-12 lg:gap-x-6 lg:px-6">
          <div className="min-w-0 lg:col-span-3">
            <p className="font-mono text-[0.5625rem] tracking-[0.13em] text-brand-brass uppercase">
              {selectedRoom
                ? "Your room"
                : hasAvailableRooms
                  ? "Room selection"
                  : "Room status"}
            </p>
            <p
              aria-live="polite"
              aria-atomic="true"
              className="mt-1 truncate font-display text-xl leading-tight tracking-[-0.025em] text-brand-paper sm:text-2xl"
            >
              {selectedRoom?.name ??
                (hasAvailableRooms
                  ? "Choose a room below"
                  : "No rooms available")}
            </p>
            <p className="mt-1 text-[0.6875rem] leading-4 text-brand-paper/62 sm:hidden">
              {selectedRoom
                ? `${selectedRoom.breakfastLabel} · ${selectedRoom.cancellationLabel}`
                : hasAvailableRooms
                  ? "Compare the details, then make one selection."
                  : "The room ledger remains available to review."}
            </p>
          </div>

          <div className="text-right sm:text-left lg:col-span-2">
            <p className="font-mono text-[0.5625rem] tracking-[0.12em] text-brand-paper/52 uppercase">
              {selectedRoom
                ? "Nightly rate"
                : hasAvailableRooms
                  ? "Rooms from"
                  : "Selection"}
            </p>
            <p className="mt-1 font-mono text-sm font-medium text-brand-paper tabular-nums sm:text-base">
              {selectedRoom?.formattedPrice ?? minimumRate}
            </p>
            <p className="mt-0.5 text-[0.625rem] leading-4 text-brand-paper/52">
              {hasAvailableRooms ? "Taxes shown later" : "Currently closed"}
            </p>
          </div>

          <div className="col-span-2 border-t border-brand-paper/14 pt-3 lg:col-span-2 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
            <Popover
              open={isDatePickerOpen}
              onOpenChange={(open) => {
                if (open) {
                  openDatePicker();
                } else {
                  setIsDatePickerOpen(false);
                  setDateError("");
                }
              }}
            >
              <PopoverTrigger
                type="button"
                data-stay-dates-trigger
                className="group/date flex min-h-12 w-full items-center gap-3 rounded-lg px-1 text-left outline-none transition-colors duration-200 hover:text-brand-brass focus-visible:ring-2 focus-visible:ring-brand-brass focus-visible:ring-offset-2 focus-visible:ring-offset-brand-forest-deep"
                aria-label={
                  hasCompleteDates
                    ? `Stay dates: ${getDateSummary(bookingDates)}. Change dates.`
                    : "Stay dates: any dates. Choose check-in and check-out."
                }
              >
                <CalendarBlank
                  aria-hidden="true"
                  size={19}
                  weight="duotone"
                  className="shrink-0 text-brand-brass"
                />
                <span className="min-w-0">
                  <span className="block font-mono text-[0.5625rem] tracking-[0.12em] text-brand-paper/52 uppercase group-hover/date:text-brand-brass/80">
                    Stay dates
                  </span>
                  <span
                    data-stay-dates-summary
                    className="mt-1 block truncate text-sm font-semibold text-brand-paper"
                  >
                    {getDateSummary(bookingDates)}
                  </span>
                </span>
              </PopoverTrigger>

              <PopoverContent
                id="property-stay-date-picker"
                align="start"
                sideOffset={10}
                className="w-[min(22rem,calc(100vw-2rem))] gap-0 rounded-panel bg-brand-paper p-3 text-brand-forest-deep shadow-[0_18px_50px_rgba(17,43,36,0.22)] ring-brand-forest-deep/16"
              >
                <div className="px-2 pt-1 pb-2">
                  <p className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-brass-dark uppercase">
                    Your stay
                  </p>
                  <p className="mt-1 font-display text-xl leading-tight tracking-[-0.025em]">
                    Choose arrival and departure.
                  </p>
                </div>
                <Calendar
                  mode="range"
                  defaultMonth={draftDates?.from ?? mockToday}
                  selected={draftDates}
                  onSelect={(range) => {
                    setDraftDates(range);
                    if (dateError) setDateError("");
                  }}
                  disabled={{ before: mockToday }}
                  numberOfMonths={1}
                  className="mx-auto [--cell-size:--spacing(11)]"
                />
                <div className="mt-2 border-t border-brand-forest-deep/14 px-2 pt-3">
                  <p
                    role="alert"
                    aria-live="assertive"
                    className="min-h-5 text-xs leading-5 text-destructive"
                  >
                    {dateError}
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={clearDates}
                      className="min-h-11 px-2 text-sm font-semibold text-brand-stone underline decoration-brand-stone/40 underline-offset-4 transition-colors hover:text-brand-forest-deep focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass"
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      data-stay-dates-apply
                      onClick={applyDates}
                      className="min-h-11 rounded-full bg-brand-forest-deep px-5 text-sm font-semibold text-brand-paper transition-colors hover:bg-brand-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass focus-visible:ring-offset-2 focus-visible:ring-offset-brand-paper"
                    >
                      Apply dates
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="hidden border-l border-brand-paper/14 pl-6 lg:col-span-2 lg:block">
            <p className="font-mono text-[0.5625rem] tracking-[0.12em] text-brand-paper/52 uppercase">
              Terms at a glance
            </p>
            <p className="mt-1 text-sm leading-5 text-brand-paper/84">
              {selectedRoom
                ? `${selectedRoom.breakfastLabel} · ${selectedRoom.cancellationLabel}`
                : hasAvailableRooms
                  ? "Breakfast and cancellation vary by room."
                  : "Review each room for its current status."}
            </p>
          </div>

          {selectedRoom && hasCompleteDates ? (
            <Link href="/booking/review" className={summaryActionClassName}>
              <span>Review your stay</span>
              <ArrowUpRight
                aria-hidden="true"
                size={16}
                className="shrink-0 transition-transform duration-200 ease-luma group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
              />
            </Link>
          ) : selectedRoom ? (
            <button
              type="button"
              onClick={openDatePicker}
              aria-controls="property-stay-date-picker"
              className={summaryActionClassName}
            >
              <span>Add stay dates</span>
              <CalendarBlank aria-hidden="true" size={16} className="shrink-0" />
            </button>
          ) : (
            <button
              type="button"
              onClick={reviewRoom}
              disabled={!targetRoomId}
              aria-controls={targetRoomId}
              className={summaryActionClassName}
            >
              <span>
                {hasAvailableRooms ? "Choose a room" : "Selection closed"}
              </span>
              {hasAvailableRooms ? (
                <ArrowDown
                  aria-hidden="true"
                  size={16}
                  className="shrink-0 transition-transform duration-200 ease-luma group-hover:translate-y-0.5 motion-reduce:transition-none"
                />
              ) : (
                <Prohibit aria-hidden="true" size={16} className="shrink-0" />
              )}
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
