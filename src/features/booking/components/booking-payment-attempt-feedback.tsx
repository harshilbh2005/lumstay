import {
  ArrowClockwise,
  CheckCircle,
  SpinnerGap,
  WarningCircle,
  WifiSlash,
} from "@phosphor-icons/react";

import type { MockPaymentAttempt } from "@/features/booking/lib/mock-payment-simulation";

export function BookingPaymentAttemptFeedback({
  attempt,
  onEdit,
  onRetry,
}: {
  attempt: MockPaymentAttempt;
  onEdit: () => void;
  onRetry: () => void;
}) {
  if (attempt.status === "processing") {
    return (
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="grid gap-4 border-y border-brand-forest-deep/22 bg-brand-linen px-5 py-5 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:px-6"
      >
        <SpinnerGap
          aria-hidden="true"
          size={22}
          className="animate-spin text-brand-brass-dark"
        />
        <div>
          <p className="text-sm font-semibold text-brand-forest-deep">
            Checking the mock payment
          </p>
          <p className="mt-1 text-sm leading-6 text-foreground/66">
            Keep this page open for a moment. No provider is contacted and no
            charge is attempted.
          </p>
        </div>
        <p className="font-mono text-[0.625rem] tracking-[0.09em] text-brand-stone uppercase">
          Processing
        </p>
      </div>
    );
  }

  if (attempt.status === "declined") {
    return (
      <div
        role="alert"
        aria-atomic="true"
        className="grid gap-4 border-y border-destructive/42 bg-destructive/[0.055] px-5 py-5 sm:grid-cols-[auto_1fr] sm:items-start sm:px-6"
      >
        <WarningCircle
          aria-hidden="true"
          size={23}
          weight="fill"
          className="text-destructive"
        />
        <div>
          <p className="text-sm font-semibold text-brand-forest-deep">
            Mock payment declined
          </p>
          <p className="mt-1 max-w-[42rem] text-sm leading-6 text-foreground/70">
            Code 000 always returns this test failure. Nothing was charged, no
            reservation was created, and the full card details were cleared.
          </p>
          <button
            type="button"
            onClick={onEdit}
            className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-forest-deep underline decoration-destructive/65 underline-offset-4 transition-colors duration-200 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
          >
            <ArrowClockwise aria-hidden="true" size={16} />
            Re-enter test details
          </button>
        </div>
      </div>
    );
  }

  if (attempt.status === "interrupted") {
    return (
      <div
        role="alert"
        aria-atomic="true"
        className="grid gap-4 border-y border-destructive/42 bg-destructive/[0.055] px-5 py-5 sm:grid-cols-[auto_1fr] sm:items-start sm:px-6"
      >
        <WifiSlash
          aria-hidden="true"
          size={23}
          weight="duotone"
          className="text-destructive"
        />
        <div>
          <p className="text-sm font-semibold text-brand-forest-deep">
            The mock connection paused
          </p>
          <p className="mt-1 max-w-[42rem] text-sm leading-6 text-foreground/70">
            Code 999 creates this recoverable interruption. Your stay and total
            are unchanged, and retrying uses only the masked test summary.
          </p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full border border-brand-forest-deep bg-brand-forest-deep px-5 py-2 text-sm font-semibold text-brand-paper transition-colors duration-200 hover:bg-brand-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
          >
            <ArrowClockwise aria-hidden="true" size={16} />
            Retry masked attempt
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="grid gap-4 border-y border-brand-forest-deep/22 bg-brand-linen px-5 py-5 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:px-6"
    >
      <CheckCircle
        aria-hidden="true"
        size={22}
        weight="fill"
        className="text-brand-brass-dark"
      />
      <div>
        <p className="text-sm font-semibold text-brand-forest-deep">
          Mock payment details prepared
        </p>
        <p className="mt-1 text-sm leading-6 text-foreground/66">
          {attempt.card.cardholderName} · card ending in {" "}
          {attempt.card.lastFour}. No reservation or charge was created.
        </p>
      </div>
      <p className="font-mono text-[0.625rem] tracking-[0.09em] text-brand-stone uppercase">
        Expires {attempt.card.expiry}
      </p>
    </div>
  );
}
