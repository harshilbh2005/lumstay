import { WarningCircle } from "@phosphor-icons/react";

export function BookingFormErrorSummary({
  errorCount,
}: {
  errorCount: number;
}) {
  if (errorCount === 0) {
    return null;
  }

  return (
    <div
      role="alert"
      aria-atomic="true"
      className="mb-8 grid grid-cols-[auto_1fr] gap-3 border-y border-destructive/45 bg-destructive/[0.06] px-4 py-4 text-destructive"
    >
      <WarningCircle
        aria-hidden="true"
        size={20}
        weight="fill"
        className="mt-0.5"
      />
      <div>
        <p className="text-sm font-semibold">
          Correct {errorCount} highlighted {errorCount === 1 ? "field" : "fields"}.
        </p>
        <p className="mt-1 text-sm leading-6">
          Focus has moved to the first field that needs attention.
        </p>
      </div>
    </div>
  );
}

export function BookingFieldError({
  id,
  message,
}: {
  id: string;
  message?: string;
}) {
  if (!message) {
    return null;
  }

  return (
    <p
      id={id}
      className="mt-2 flex items-start gap-2 text-sm leading-5 font-medium text-destructive"
    >
      <WarningCircle
        aria-hidden="true"
        size={16}
        weight="fill"
        className="mt-0.5 shrink-0"
      />
      <span>
        <span className="sr-only">Error: </span>
        {message}
      </span>
    </p>
  );
}
