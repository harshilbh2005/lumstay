import Link from "next/link";
import {
  ArrowRight,
  CloudSlash,
  Compass,
} from "@phosphor-icons/react/ssr";

type TripsHistoryStateVariant = "empty" | "error";

const stateContent = {
  empty: {
    eyebrow: "Ledger open · no records",
    title: "The first journey has yet to be written.",
    description:
      "No deterministic booking records are available in this interface state. Explore the collection to begin a new journey, or return to the populated prototype ledger.",
    primaryHref: "/search",
    primaryLabel: "Explore stays",
    secondaryHref: "/trips",
    secondaryLabel: "View prototype ledger",
    asideLabel: "Zero records",
    asideCopy:
      "Upcoming, completed, cancelled, and payment-attempt sections all begin at zero here.",
    Icon: Compass,
  },
  error: {
    eyebrow: "History interrupted",
    title: "The ledger could not be opened.",
    description:
      "A temporary interface problem stopped the deterministic records from arriving. Try the history route again, or keep exploring without changing a booking.",
    primaryHref: "/trips",
    primaryLabel: "Try history again",
    secondaryHref: "/search",
    secondaryLabel: "Explore stays",
    asideLabel: "Safe to retry",
    asideCopy:
      "Retrying only asks this read-only prototype history to render again. It does not send or change reservation data.",
    Icon: CloudSlash,
  },
} as const;

const statusLabels = [
  "Upcoming",
  "Completed",
  "Cancelled",
  "Payment attempt",
] as const;

export function TripsHistoryState({
  variant,
}: {
  variant: TripsHistoryStateVariant;
}) {
  const content = stateContent[variant];
  const Icon = content.Icon;
  const isError = variant === "error";

  return (
    <main id="main-content" className="min-h-screen bg-brand-paper">
      <section
        aria-labelledby={`trips-history-${variant}-heading`}
        className="container-luma pt-14 pb-[var(--space-section)] sm:pt-20 lg:pt-24"
      >
        <div
          className={`flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.16em] uppercase ${
            isError ? "text-destructive" : "text-brand-brass-dark"
          }`}
        >
          <span
            className={`h-px w-7 ${isError ? "bg-destructive" : "bg-brand-brass"}`}
            aria-hidden="true"
          />
          Your journey ledger
        </div>

        <div className="mt-6 grid gap-9 border-t border-brand-forest-deep/18 pt-8 lg:grid-cols-12 lg:gap-x-8 lg:pt-10">
          <h1
            id={`trips-history-${variant}-heading`}
            className="max-w-[10ch] text-[clamp(3.55rem,8vw,7.75rem)] leading-[0.88] font-semibold tracking-[-0.055em] text-brand-forest-deep lg:col-span-8"
          >
            Every trip, kept in clear view.
          </h1>

          <p className="max-w-[32rem] text-base leading-7 text-foreground/72 sm:text-lg sm:leading-8 lg:col-start-10 lg:col-span-3 lg:self-end">
            The ledger separates each reservation outcome so absence and
            interruption are as clear as a confirmed stay.
          </p>
        </div>

        <div
          aria-label="Trip status summary"
          role="group"
          className="mt-12 grid grid-cols-2 border-t border-l border-brand-forest-deep/16 sm:grid-cols-4 lg:mt-16"
        >
          {statusLabels.map((label) => (
            <div
              key={label}
              className="flex min-h-20 items-center justify-between gap-3 border-r border-b border-brand-forest-deep/16 px-4 py-3"
            >
              <span className="text-sm font-semibold text-brand-forest-deep">
                {label}
              </span>
              <span className="font-mono text-[0.6875rem] text-brand-stone tabular-nums">
                {isError ? "—" : "00"}
              </span>
            </div>
          ))}
        </div>

        <div
          role={isError ? "alert" : "status"}
          className="grid min-h-[30rem] border-b border-brand-forest-deep/18 bg-brand-linen sm:grid-cols-[minmax(0,1fr)_14rem] lg:min-h-[34rem]"
        >
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
            <p
              className={`font-mono text-[0.6875rem] tracking-[0.15em] uppercase ${
                isError ? "text-destructive" : "text-brand-forest-deep"
              }`}
            >
              {content.eyebrow}
            </p>
            <h2 className="mt-5 max-w-[12ch] text-[clamp(2.5rem,5vw,4.75rem)] leading-[0.94] font-semibold tracking-[-0.055em] text-brand-forest-deep">
              {content.title}
            </h2>
            <p className="mt-6 max-w-[36rem] text-base leading-7 text-muted-foreground">
              {content.description}
            </p>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Link
                href={content.primaryHref}
                className="group/action inline-flex min-h-12 w-full items-center justify-between gap-5 border border-brand-forest-deep bg-brand-forest-deep px-5 text-sm font-semibold text-brand-paper transition-colors duration-200 hover:bg-brand-forest hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:translate-y-px motion-reduce:transition-none sm:w-auto"
              >
                {content.primaryLabel}
                <ArrowRight
                  aria-hidden="true"
                  size={16}
                  className="transition-transform duration-200 ease-luma group-hover/action:translate-x-1 motion-reduce:transition-none"
                />
              </Link>
              <Link
                href={content.secondaryHref}
                className="inline-flex min-h-11 items-center px-2 text-sm font-semibold text-brand-forest-deep underline decoration-brand-forest-deep/35 underline-offset-4 transition-colors duration-200 hover:text-brand-brass-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none"
              >
                {content.secondaryLabel}
              </Link>
            </div>
          </div>

          <aside className="border-t border-brand-forest-deep/16 p-6 sm:border-t-0 sm:border-l sm:p-7">
            <Icon
              aria-hidden="true"
              size={27}
              weight="duotone"
              className={isError ? "text-destructive" : "text-brand-brass-dark"}
            />
            <p className="mt-8 font-mono text-[0.625rem] tracking-[0.14em] text-brand-stone uppercase">
              {content.asideLabel}
            </p>
            <p className="mt-3 text-sm leading-6 text-brand-forest-deep">
              {content.asideCopy}
            </p>
          </aside>
        </div>

        <p className="mt-6 max-w-[66rem] border-l border-brand-brass/65 pl-4 text-xs leading-5 text-muted-foreground">
          Interface history only. No live inventory, account, charge, refund,
          or traveler profile exists behind this page.
        </p>
      </section>
    </main>
  );
}
