export type MockPaymentOutcome = "approved" | "declined" | "interrupted";

export interface PreparedMockCard {
  cardholderName: string;
  lastFour: string;
  expiry: string;
}

export type MockPaymentStatus =
  | "processing"
  | "prepared"
  | "declined"
  | "interrupted";

export interface MockPaymentAttempt {
  status: MockPaymentStatus;
  outcome: MockPaymentOutcome;
  card: PreparedMockCard;
}

export const mockPaymentProcessingDelay = 1200;

export function getMockPaymentOutcome(
  securityCode: string,
): MockPaymentOutcome {
  if (securityCode === "000") {
    return "declined";
  }

  if (securityCode === "999") {
    return "interrupted";
  }

  return "approved";
}
