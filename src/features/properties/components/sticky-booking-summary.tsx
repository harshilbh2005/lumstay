"use client";

import { useCallback, useSyncExternalStore } from "react";
import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react";

export type BookingSummaryRoom = {
  id: string;
  name: string;
  formattedPrice: string;
  breakfastLabel: string;
  cancellationLabel: string;
};

const roomSelectionName = "casa-serein-room";

export function StickyBookingSummary({
  rooms,
  sectionId,
}: {
  rooms: readonly BookingSummaryRoom[];
  sectionId: string;
}) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const section = document.getElementById(sectionId);

      if (!section) {
        return () => undefined;
      }

      section.addEventListener("change", onStoreChange);

      return () => section.removeEventListener("change", onStoreChange);
    },
    [sectionId],
  );

  const getSnapshot = useCallback(() => {
    const section = document.getElementById(sectionId);
    const selectedRoom = section?.querySelector<HTMLInputElement>(
      `input[name="${roomSelectionName}"]:checked`,
    );

    return selectedRoom?.value ?? null;
  }, [sectionId]);

  const selectedRoomId = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => null,
  );
  const selectedRoom =
    rooms.find((room) => room.id === selectedRoomId) ?? null;
  const minimumRate = rooms[0]?.formattedPrice ?? "";
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

  return (
    <aside
      aria-label="Room booking summary"
      className="sticky top-[5.5rem] z-20 mt-10 sm:mt-12"
      data-booking-summary
    >
      <div className="border-y border-brand-brass/48 bg-brand-forest-deep text-brand-paper">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-5 gap-y-3 px-4 py-4 sm:grid-cols-[minmax(0,1.35fr)_minmax(7.5rem,0.55fr)_auto] sm:items-center sm:px-5 lg:grid-cols-12 lg:gap-x-6 lg:px-6">
          <div className="min-w-0 lg:col-span-4">
            <p className="font-mono text-[0.5625rem] tracking-[0.13em] text-brand-brass uppercase">
              {selectedRoom ? "Your room" : "Room selection"}
            </p>
            <p
              aria-live="polite"
              aria-atomic="true"
              className="mt-1 truncate font-display text-xl leading-tight tracking-[-0.025em] text-brand-paper sm:text-2xl"
            >
              {selectedRoom?.name ?? "Choose a room below"}
            </p>
            <p className="mt-1 text-[0.6875rem] leading-4 text-brand-paper/62 sm:hidden">
              {selectedRoom
                ? `${selectedRoom.breakfastLabel} · ${selectedRoom.cancellationLabel}`
                : "Compare the details, then make one selection."}
            </p>
          </div>

          <div className="text-right sm:text-left lg:col-span-2">
            <p className="font-mono text-[0.5625rem] tracking-[0.12em] text-brand-paper/52 uppercase">
              {selectedRoom ? "Nightly rate" : "Rooms from"}
            </p>
            <p className="mt-1 font-mono text-sm font-medium text-brand-paper tabular-nums sm:text-base">
              {selectedRoom?.formattedPrice ?? minimumRate}
            </p>
            <p className="mt-0.5 text-[0.625rem] leading-4 text-brand-paper/52">
              Taxes shown later
            </p>
          </div>

          <div className="hidden border-l border-brand-paper/14 pl-6 lg:col-span-3 lg:block">
            <p className="font-mono text-[0.5625rem] tracking-[0.12em] text-brand-paper/52 uppercase">
              Terms at a glance
            </p>
            <p className="mt-1 text-sm leading-5 text-brand-paper/84">
              {selectedRoom
                ? `${selectedRoom.breakfastLabel} · ${selectedRoom.cancellationLabel}`
                : "Breakfast and cancellation vary by room."}
            </p>
          </div>

          <button
            type="button"
            onClick={reviewRoom}
            aria-controls={targetRoomId}
            className="group col-span-2 inline-flex min-h-12 items-center justify-between gap-4 rounded-full border border-brand-paper/68 px-5 py-3 text-sm font-semibold text-brand-paper transition-colors duration-200 hover:border-brand-brass hover:bg-brand-paper hover:text-brand-forest-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass focus-visible:ring-offset-2 focus-visible:ring-offset-brand-forest-deep sm:col-span-1 sm:min-w-[10.5rem] lg:col-span-3"
          >
            <span>{selectedRoom ? "Review this room" : "Choose a room"}</span>
            {selectedRoom ? (
              <ArrowUpRight
                aria-hidden="true"
                size={16}
                className="shrink-0 transition-transform duration-200 ease-luma group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
              />
            ) : (
              <ArrowDown
                aria-hidden="true"
                size={16}
                className="shrink-0 transition-transform duration-200 ease-luma group-hover:translate-y-0.5 motion-reduce:transition-none"
              />
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
