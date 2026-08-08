import Image from "next/image";
import {
  Bed,
  CalendarX,
  CaretDown,
  Check,
  ForkKnife,
  Ruler,
  UsersThree,
} from "@phosphor-icons/react/ssr";

import { getMediaById } from "@/data/mock";
import { toBookingRoom } from "@/features/booking/lib/booking-store-seed";
import type { Room } from "@/types/domain";

import {
  StickyBookingSummary,
  type BookingSummaryRoom,
} from "./sticky-booking-summary";

const roomSelectionSectionId = "casa-serein-room-selection";

export function RoomSelection({
  rooms,
  propertyName,
}: {
  rooms: readonly Room[];
  propertyName: string;
}) {
  if (rooms.length === 0) {
    return null;
  }

  const minimumGuests = Math.min(...rooms.map((room) => room.maxGuests));
  const maximumGuests = Math.max(...rooms.map((room) => room.maxGuests));
  const availableRooms = rooms.filter(
    (room) => room.availability.status === "available",
  );
  const summaryRooms: BookingSummaryRoom[] = [...availableRooms]
    .sort((roomA, roomB) => {
      return roomA.nightlyPrice.amount - roomB.nightlyPrice.amount;
    })
    .map((room) => ({
      id: room.id,
      name: room.name,
      bookingRoom: toBookingRoom(room),
      formattedPrice: new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: room.nightlyPrice.currency,
        maximumFractionDigits: 0,
      }).format(room.nightlyPrice.amount),
      breakfastLabel: room.breakfastIncluded
        ? "Breakfast included"
        : "Breakfast separate",
      cancellationLabel: room.cancellationPolicy.label,
    }));

  return (
    <section
      id={roomSelectionSectionId}
      aria-labelledby="room-selection-title"
      className="bg-brand-linen"
    >
      <div className="container-luma py-[var(--space-section)]">
        <div className="grid gap-8 border-t border-brand-forest-deep/18 pt-7 lg:grid-cols-12 lg:gap-x-8 lg:pt-9">
          <div className="lg:col-span-3">
            <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-brand-stone uppercase">
              <span className="mr-3 text-brand-brass">03</span>
              The rooms
            </p>
          </div>

          <div className="lg:col-span-6">
            <h2
              id="room-selection-title"
              className="max-w-[12ch] font-display text-[clamp(2.7rem,5.2vw,5.25rem)] leading-[0.94] font-medium tracking-[-0.05em] text-brand-forest-deep"
            >
              Three ways to wake above the coast.
            </h2>
          </div>

          <div className="lg:col-span-3 lg:pt-1">
            <p className="max-w-[28rem] text-base leading-7 text-foreground/72">
              Compare the view, space, inclusions, and terms before choosing
              the room that suits your stay.
            </p>
            <p className="mt-5 font-mono text-[0.625rem] tracking-[0.12em] text-brand-stone uppercase">
              {String(availableRooms.length).padStart(2, "0")} available ·{" "}
              {String(rooms.length).padStart(2, "0")} types · {minimumGuests}–
              {maximumGuests} guests
            </p>
          </div>
        </div>

        <StickyBookingSummary
          rooms={summaryRooms}
          sectionId={roomSelectionSectionId}
        />

        <fieldset className="mt-12 sm:mt-16">
          <legend className="sr-only">
            Choose a room at {propertyName}
          </legend>

          {rooms.map((room, index) => {
            const media = room.mediaIds.flatMap((mediaId) => {
              const asset = getMediaById(mediaId);
              return asset ? [asset] : [];
            });
            const inputId = `${room.id}-selection`;
            const descriptionId = `${room.id}-description`;
            const availabilityNoteId = `${room.id}-availability`;
            const isUnavailable = room.availability.status === "unavailable";
            const availabilityNote =
              room.availability.status === "unavailable"
                ? room.availability.note
                : null;
            const price = new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: room.nightlyPrice.currency,
              maximumFractionDigits: 0,
            }).format(room.nightlyPrice.amount);

            return (
              <article
                key={room.id}
                id={room.id}
                aria-labelledby={`${room.id}-title`}
                className="scroll-mt-64 border-t border-brand-forest-deep/24 py-8 last:border-b sm:py-10 lg:scroll-mt-52 lg:py-12"
              >
                <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-8">
                  <div className="grid aspect-[4/3] min-h-0 grid-cols-[minmax(0,1.8fr)_minmax(5rem,0.72fr)] gap-1 overflow-hidden lg:col-span-5 lg:h-[30rem] lg:aspect-auto">
                    {media.slice(0, 2).map((asset, mediaIndex) => (
                      <figure
                        key={asset.id}
                        className="relative min-h-0 overflow-hidden bg-brand-paper"
                      >
                        <Image
                          src={asset.src}
                          alt={asset.alt}
                          fill
                          sizes={
                            mediaIndex === 0
                              ? "(max-width: 1023px) 72vw, 31vw"
                              : "(max-width: 1023px) 24vw, 12vw"
                          }
                          className="object-cover"
                          style={{ objectPosition: asset.focalPoint }}
                        />
                        <figcaption className="absolute right-2 bottom-2 bg-brand-forest-deep/88 px-2 py-1 font-mono text-[0.5625rem] tracking-[0.1em] text-brand-paper uppercase">
                          {mediaIndex === 0 ? "Room view" : "Detail"}
                        </figcaption>
                      </figure>
                    ))}
                  </div>

                  <div className="lg:col-span-4">
                    <p className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-brass uppercase">
                      Room {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3
                      id={`${room.id}-title`}
                      className="mt-3 font-display text-[clamp(2.25rem,3.3vw,3.75rem)] leading-[0.96] font-medium tracking-[-0.045em] text-brand-forest-deep"
                    >
                      {room.name}
                    </h3>
                    <p
                      id={descriptionId}
                      className="mt-5 max-w-[36rem] text-base leading-7 text-foreground/72"
                    >
                      {room.description}
                    </p>

                    <dl className="mt-7 border-y border-brand-forest-deep/18">
                      <div className="grid grid-cols-[1.75rem_1fr] gap-3 border-b border-brand-forest-deep/18 py-3.5">
                        <UsersThree
                          aria-hidden="true"
                          size={17}
                          className="mt-0.5 text-brand-brass"
                        />
                        <div>
                          <dt className="font-mono text-[0.5625rem] tracking-[0.11em] text-brand-stone uppercase">
                            Occupancy
                          </dt>
                          <dd className="mt-1 text-sm leading-6 font-medium text-brand-forest-deep">
                            Up to {room.maxGuests} guests
                          </dd>
                        </div>
                      </div>
                      <div className="grid grid-cols-[1.75rem_1fr] gap-3 border-b border-brand-forest-deep/18 py-3.5">
                        <Bed
                          aria-hidden="true"
                          size={17}
                          className="mt-0.5 text-brand-brass"
                        />
                        <div>
                          <dt className="font-mono text-[0.5625rem] tracking-[0.11em] text-brand-stone uppercase">
                            Beds
                          </dt>
                          <dd className="mt-1 text-sm leading-6 font-medium text-brand-forest-deep">
                            {room.bedConfiguration}
                          </dd>
                        </div>
                      </div>
                      <div className="grid grid-cols-[1.75rem_1fr] gap-3 py-3.5">
                        <Ruler
                          aria-hidden="true"
                          size={17}
                          className="mt-0.5 text-brand-brass"
                        />
                        <div>
                          <dt className="font-mono text-[0.5625rem] tracking-[0.11em] text-brand-stone uppercase">
                            Room size
                          </dt>
                          <dd className="mt-1 text-sm leading-6 font-medium text-brand-forest-deep">
                            {room.sizeSquareMetres} m²
                          </dd>
                        </div>
                      </div>
                    </dl>

                    <div className="mt-7">
                      <p className="font-mono text-[0.5625rem] tracking-[0.11em] text-brand-stone uppercase">
                        Room details
                      </p>
                      <ul className="mt-3 grid gap-2.5">
                        {room.facilities.map((facility) => (
                          <li
                            key={facility}
                            className="grid grid-cols-[1.25rem_1fr] gap-2 text-sm leading-6 text-foreground/76"
                          >
                            <Check
                              aria-hidden="true"
                              size={14}
                              className="mt-1 text-brand-brass"
                            />
                            {facility}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-brand-forest-deep/18 pt-7 lg:col-span-3 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                    <p className="font-mono text-[0.5625rem] tracking-[0.12em] text-brand-stone uppercase">
                      Nightly rate
                    </p>
                    <p className="mt-3 font-display text-[clamp(2.5rem,3.8vw,4.25rem)] leading-none tracking-[-0.055em] text-brand-forest-deep">
                      {price}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                      Per room · taxes shown later
                    </p>

                    <div className="mt-7 flex min-h-12 items-center gap-3 border-y border-brand-forest-deep/18 py-3">
                      <ForkKnife
                        aria-hidden="true"
                        size={17}
                        className="shrink-0 text-brand-brass"
                      />
                      <p className="text-sm leading-6 font-medium text-brand-forest-deep">
                        {room.breakfastIncluded
                          ? "Breakfast included"
                          : "Breakfast available separately"}
                      </p>
                    </div>

                    <details className="group border-b border-brand-forest-deep/18">
                      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 [&::-webkit-details-marker]:hidden">
                        <span>
                          <span className="block font-mono text-[0.5625rem] tracking-[0.11em] text-brand-stone uppercase">
                            {room.cancellationPolicy.label}
                          </span>
                          <span className="mt-1 block text-sm leading-6 font-medium text-brand-forest-deep">
                            {room.cancellationPolicy.summary}
                          </span>
                        </span>
                        <CaretDown
                          aria-hidden="true"
                          size={15}
                          className="shrink-0 text-brand-brass transition-transform duration-200 ease-luma group-open:rotate-180"
                        />
                      </summary>
                      <ul className="grid gap-2 pb-4">
                        {room.cancellationPolicy.terms.map((term) => (
                          <li
                            key={term}
                            className="border-l border-brand-brass/55 pl-3 text-xs leading-5 text-muted-foreground"
                          >
                            {term}
                          </li>
                        ))}
                      </ul>
                    </details>

                    {isUnavailable ? (
                      <div className="mt-7">
                        <div
                          id={availabilityNoteId}
                          role="status"
                          className="border-y border-destructive/28 bg-brand-paper/45 py-4"
                        >
                          <p className="flex items-center gap-2 font-mono text-[0.625rem] tracking-[0.12em] text-destructive uppercase">
                            <CalendarX aria-hidden="true" size={16} />
                            Room unavailable
                          </p>
                          <p className="mt-2 text-sm leading-6 text-foreground/72">
                            {availabilityNote}
                          </p>
                        </div>
                        <input
                          id={inputId}
                          type="radio"
                          name="casa-serein-room"
                          value={room.id}
                          disabled
                          aria-label={`${room.name} is unavailable`}
                          aria-describedby={`${descriptionId} ${availabilityNoteId}`}
                          className="peer sr-only"
                        />
                        <label
                          htmlFor={inputId}
                          className="mt-5 inline-flex min-h-12 w-full cursor-not-allowed items-center justify-center rounded-full border border-brand-stone/38 bg-brand-paper/55 px-5 py-3 text-center text-sm font-semibold text-brand-stone"
                        >
                          Unavailable · {room.name}
                        </label>
                      </div>
                    ) : (
                      <div className="mt-7">
                        <input
                          id={inputId}
                          type="radio"
                          name="casa-serein-room"
                          value={room.id}
                          aria-label={`Select ${room.name}`}
                          aria-describedby={descriptionId}
                          className="peer sr-only"
                        />
                        <label
                          htmlFor={inputId}
                          className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-full border border-brand-forest-deep bg-brand-forest-deep px-5 py-3 text-center text-sm font-semibold text-brand-paper transition-colors duration-200 hover:border-brand-forest hover:bg-brand-forest focus-visible:outline-none peer-checked:hidden peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-4"
                        >
                          Choose {room.name}
                        </label>
                        <label
                          htmlFor={inputId}
                          className="hidden min-h-12 w-full cursor-pointer items-center justify-center rounded-full border border-brand-brass bg-brand-paper px-5 py-3 text-center text-sm font-semibold text-brand-forest-deep transition-colors duration-200 hover:bg-accent peer-checked:inline-flex peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-4"
                        >
                          Selected · {room.name}
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </fieldset>

        <p className="mt-7 max-w-[52rem] border-l border-brand-brass/65 pl-4 text-xs leading-5 text-muted-foreground">
          Illustrative room categories and rates for interface testing. A
          selection is held while you navigate LumaStay, but does not survive
          a reload, check live availability, or reserve inventory.
        </p>
      </div>
    </section>
  );
}
