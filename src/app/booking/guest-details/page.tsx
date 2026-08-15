import { createPageMetadata } from "@/config/metadata";
import { BookingGuestDetails } from "@/features/booking";

export const metadata = createPageMetadata({
  title: "Guest details",
  description:
    "Prepare locally held guest details for a fictional LumaStay booking draft without sending personal information to a live service.",
  path: "/booking/guest-details",
  eyebrow: "Prototype booking / guest",
  detail: "Local form state · No data transmitted",
  indexing: "noindex-nofollow",
});

export default function BookingGuestDetailsPage() {
  return <BookingGuestDetails />;
}
