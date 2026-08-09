import type { Metadata } from "next";

import { BookingConfirmation } from "@/features/booking";

export const metadata: Metadata = {
  title: "Mock booking itinerary",
  description:
    "Review a memory-only LumaStay itinerary, mock reference, and transparent prototype total without creating a real reservation.",
};

export default function BookingConfirmationPage() {
  return <BookingConfirmation />;
}
