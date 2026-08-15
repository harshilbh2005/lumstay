import { createPageMetadata } from "@/config/metadata";
import { BookingReview } from "@/features/booking";

export const metadata = createPageMetadata({
  title: "Review your stay",
  description:
    "Review a memory-only LumaStay draft with fictional property, room, dates, guests, and a transparent mock total.",
  path: "/booking/review",
  eyebrow: "Prototype booking / review",
  detail: "Memory-only draft · No reservation created",
  indexing: "noindex-nofollow",
});

export default function BookingReviewPage() {
  return <BookingReview />;
}
