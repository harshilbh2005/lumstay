import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getMockBookingById, mockBookings } from "@/data/mock";
import { TripDetailPage } from "@/features/trips";
import type { CancelledBooking, ConfirmedBooking } from "@/types/domain";

type TripDetailRouteProps = {
  params: Promise<{ id: string }>;
};

type ReservationBooking = ConfirmedBooking | CancelledBooking;

function isReservationBooking(
  booking: ReturnType<typeof getMockBookingById>,
): booking is ReservationBooking {
  return Boolean(booking && booking.status !== "payment-failed");
}

export const dynamicParams = true;

export function generateStaticParams() {
  return mockBookings
    .filter((booking) => booking.status !== "payment-failed")
    .map((booking) => ({ id: booking.id }));
}

export async function generateMetadata({
  params,
}: TripDetailRouteProps): Promise<Metadata> {
  const { id } = await params;
  const booking = getMockBookingById(id);

  if (!isReservationBooking(booking)) {
    notFound();
  }

  return {
    title: `${booking.property.name} trip record`,
    description: `Review the read-only ${booking.status} prototype reservation record for ${booking.property.name}.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function TripDetailRoute({
  params,
}: TripDetailRouteProps) {
  const { id } = await params;
  const booking = getMockBookingById(id);

  if (!isReservationBooking(booking)) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <TripDetailPage booking={booking} />
      <SiteFooter />
    </>
  );
}
