import { createPageMetadata } from "@/config/metadata";
import { BookingPayment } from "@/features/booking";

export const metadata = createPageMetadata({
  title: "Payment details",
  description:
    "Prepare mock card details for a selected LumaStay stay without contacting a payment service or creating a reservation.",
  path: "/booking/payment",
  eyebrow: "Prototype booking / payment",
  detail: "Test input only · No payment processed",
  indexing: "noindex-nofollow",
});

export default function BookingPaymentPage() {
  return <BookingPayment />;
}
