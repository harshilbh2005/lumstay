import { z } from "zod";

export const supportTopicValues = [
  "booking",
  "cancellations",
  "payments",
  "trips-and-saved",
  "prototype-feedback",
] as const;

export type SupportTopic = (typeof supportTopicValues)[number];

export const supportTopicLabels: Record<SupportTopic, string> = {
  booking: "Booking flow",
  cancellations: "Cancellation terms",
  payments: "Mock payment",
  "trips-and-saved": "Trips or saved stays",
  "prototype-feedback": "Prototype feedback",
};

export const supportNoteSchema = z.object({
  topic: z.enum(supportTopicValues, {
    error: "Choose the topic that best matches your note.",
  }),
  email: z
    .string()
    .trim()
    .min(1, "Enter an email address for the prepared note.")
    .max(254, "Keep the email address to 254 characters or fewer.")
    .email("Enter a valid email address, such as guest@example.com."),
  reference: z
    .string()
    .trim()
    .max(64, "Keep the mock reference to 64 characters or fewer.")
    .refine(
      (value) =>
        value.length === 0 || /^LUMA-(?:MOCK|ATTEMPT)-[A-Z0-9-]+$/i.test(value),
      "Use a LUMA-MOCK or LUMA-ATTEMPT reference, or leave this field blank.",
    ),
  message: z
    .string()
    .trim()
    .min(24, "Add at least 24 characters so the issue is clear.")
    .max(1200, "Keep the note to 1,200 characters or fewer."),
});

export type SupportNoteFormValues = z.infer<typeof supportNoteSchema>;
