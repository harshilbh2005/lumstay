import type { Metadata } from "next";

import { BookingGuestDetails } from "@/features/booking";

export const metadata: Metadata = {
  title: "Guest details",
  description:
    "Add the lead guest identity and contact details for your selected LumaStay stay.",
};

export default function BookingGuestDetailsPage() {
  return <BookingGuestDetails />;
}
