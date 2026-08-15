"use client";

import type { ComponentProps } from "react";
import Link from "next/link";

import { useBookingStore } from "@/components/providers/booking-store-provider";
import { getSearchIntentQueryString } from "@/features/search/lib/search-context";

type BookingIntentPropertyLinkProps = Omit<
  ComponentProps<typeof Link>,
  "href"
> & {
  destination: string;
  slug: string;
};

export function BookingIntentPropertyLink({
  destination,
  slug,
  ...linkProps
}: BookingIntentPropertyLinkProps) {
  const dates = useBookingStore((state) => state.dates);
  const guests = useBookingStore((state) => state.guests);
  const searchQuery = getSearchIntentQueryString({
    destination,
    checkIn: dates.checkIn ?? "",
    checkOut: dates.checkOut ?? "",
    adults: guests.adults,
    children: guests.children,
    rooms: guests.rooms,
  });

  return (
    <Link
      {...linkProps}
      href={`/properties/${slug}?${searchQuery}`}
    />
  );
}
