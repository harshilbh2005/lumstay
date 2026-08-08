import type { BookingPricingPolicy } from "@/types/domain";

export const mockBookingPricingPolicy = {
  estimatedTax: {
    label: "Estimated taxes",
    rateBasisPoints: 1200,
    description:
      "A 12% prototype estimate applied to the accommodation subtotal.",
  },
  serviceFee: {
    label: "Luma service fee",
    amountPerRoom: {
      amount: 900,
      currency: "INR",
    },
    description: "One fixed prototype fee per room for the complete stay.",
  },
} satisfies BookingPricingPolicy;
