import type { Metadata } from "next";

import { BookingReview } from "@/features/booking";

export const metadata: Metadata = {
  title: "Review your stay",
  description:
    "Review your selected LumaStay property, room, dates, guests, and provisional accommodation subtotal.",
};

export default function BookingReviewPage() {
  return <BookingReview />;
}
