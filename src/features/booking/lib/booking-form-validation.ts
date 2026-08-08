import { z } from "zod";

const testCardNumber = "4242424242424242";

function countDigits(value: string) {
  return value.match(/\d/g)?.length ?? 0;
}

function isCurrentOrFutureExpiry(value: string) {
  const [monthText, yearText] = value.split(" / ");
  const month = Number(monthText);
  const year = 2000 + Number(yearText);
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  return year > currentYear || (year === currentYear && month >= currentMonth);
}

export const guestDetailsSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "Enter the lead guest’s first name.")
    .max(80, "Keep the first name to 80 characters or fewer."),
  lastName: z
    .string()
    .trim()
    .min(1, "Enter the lead guest’s last name.")
    .max(80, "Keep the last name to 80 characters or fewer."),
  email: z
    .string()
    .trim()
    .min(1, "Enter an email address.")
    .max(254, "Keep the email address to 254 characters or fewer.")
    .email("Enter a valid email address, such as guest@example.com."),
  phone: z
    .string()
    .trim()
    .min(1, "Enter a phone number.")
    .max(32, "Keep the phone number to 32 characters or fewer.")
    .refine(
      (value) => !value || /^[+()\-.\s\d]+$/.test(value),
      "Use digits and common phone symbols only.",
    )
    .refine(
      (value) => !value || (countDigits(value) >= 7 && countDigits(value) <= 15),
      "Enter a phone number containing 7 to 15 digits.",
    ),
});

export const mockPaymentSchema = z.object({
  mockCardholderName: z
    .string()
    .trim()
    .min(1, "Enter the name shown on the test card.")
    .max(80, "Keep the cardholder name to 80 characters or fewer."),
  mockCardNumber: z
    .string()
    .trim()
    .min(1, "Enter the test card number.")
    .refine(
      (value) => !value || /^[\d ]+$/.test(value),
      "Use digits and spaces only.",
    )
    .refine(
      (value) => !value || value.replace(/\s/g, "") === testCardNumber,
      "Use the test card number 4242 4242 4242 4242.",
    ),
  mockCardExpiry: z
    .string()
    .trim()
    .min(1, "Enter an expiry date.")
    .refine(
      (value) => !value || /^(0[1-9]|1[0-2])\s*\/\s*\d{2}$/.test(value),
      "Use MM / YY, for example 12 / 30.",
    )
    .transform((value) =>
      value.replace(/^(\d{2})\s*\/\s*(\d{2})$/, "$1 / $2"),
    )
    .refine(
      (value) => !value || isCurrentOrFutureExpiry(value),
      "Use a current or future expiry date.",
    ),
  mockCardSecurity: z
    .string()
    .trim()
    .min(1, "Enter a test security code.")
    .regex(/^\d{3,4}$/, "Enter a 3 or 4 digit test security code."),
});

export type GuestDetailsFormValues = z.infer<typeof guestDetailsSchema>;
export type MockPaymentFormValues = z.infer<typeof mockPaymentSchema>;
