import { createPageMetadata } from "@/config/metadata";
import { BookingConfirmation } from "@/features/booking";

export const metadata = createPageMetadata({
  title: "Mock booking itinerary",
  description:
    "Review a memory-only LumaStay itinerary, mock reference, and transparent prototype total without creating a real reservation.",
  path: "/booking/confirmation",
  eyebrow: "Prototype booking / itinerary",
  detail: "Mock record only · No reservation created",
  indexing: "noindex-nofollow",
});

export default function BookingConfirmationPage() {
  return <BookingConfirmation />;
}
