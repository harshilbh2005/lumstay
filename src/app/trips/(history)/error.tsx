"use client";

import Link from "next/link";
import {
  ArrowClockwise,
  ArrowRight,
  CloudSlash,
} from "@phosphor-icons/react";

export default function TripsHistoryError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  function retryHistory() {
    const currentUrl = new URL(window.location.href);

    if (currentUrl.searchParams.has("_demo")) {
      currentUrl.searchParams.delete("_demo");
      window.location.replace(
        `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`,
      );
      return;
    }

    unstable_retry();
  }

  return (
    <main id="main-content" className="min-h-screen bg-brand-paper">
      <section
        aria-labelledby="trips-unexpected-error-heading"
        className="container-luma pt-14 pb-[var(--space-section)] sm:pt-20 lg:pt-24"
      >
        <div className="flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.16em] text-destructive uppercase">
          <span className="h-px w-7 bg-destructive" aria-hidden="true" />
          Your journey ledger
        </div>

        <div className="mt-6 grid gap-9 border-t border-brand-forest-deep/18 pt-8 lg:grid-cols-12 lg:gap-x-8 lg:pt-10">
          <h1
            id="trips-unexpected-error-heading"
            className="max-w-[10ch] text-[clamp(3.55rem,8vw,7.75rem)] leading-[0.88] font-semibold tracking-[-0.055em] text-brand-forest-deep lg:col-span-8"
          >
            The ledger lost its place.
          </h1>

          <p className="max-w-[32rem] text-base leading-7 text-foreground/72 sm:text-lg sm:leading-8 lg:col-start-10 lg:col-span-3 lg:self-end">
            An unexpected interface problem interrupted the history page. Try
            the route again, or keep exploring while the ledger resets.
          </p>
        </div>

        <div
          role="alert"
          className="mt-12 grid min-h-[28rem] border-y border-brand-forest-deep/18 bg-brand-linen sm:grid-cols-[minmax(0,1fr)_14rem] lg:mt-16 lg:min-h-[32rem]"
        >
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
            <p className="font-mono text-[0.6875rem] tracking-[0.15em] text-destructive uppercase">
              Unexpected interruption
            </p>
            <h2 className="mt-5 max-w-[12ch] text-[clamp(2.5rem,5vw,4.75rem)] leading-[0.94] font-semibold tracking-[-0.055em] text-brand-forest-deep">
              The records can be asked to render again.
            </h2>
            <p className="mt-6 max-w-[34rem] text-base leading-7 text-muted-foreground">
              No reservation, payment, cancellation, or refund action was made
              when this interface stopped.
            </p>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={retryHistory}
                className="group/action inline-flex min-h-12 w-full items-center justify-between gap-5 border border-brand-forest-deep bg-brand-forest-deep px-5 text-sm font-semibold text-brand-paper transition-colors duration-200 hover:bg-brand-forest hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:translate-y-px motion-reduce:transition-none sm:w-auto"
              >
                Try history again
                <ArrowClockwise
                  aria-hidden="true"
                  size={16}
                  className="transition-transform duration-200 ease-luma group-hover/action:rotate-45 motion-reduce:transition-none"
                />
              </button>
              <Link
                href="/search"
                className="group inline-flex min-h-11 items-center gap-3 px-2 text-sm font-semibold text-brand-forest-deep underline decoration-brand-forest-deep/35 underline-offset-4 transition-colors duration-200 hover:text-brand-brass-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none"
              >
                Explore stays
                <ArrowRight
                  aria-hidden="true"
                  size={15}
                  className="transition-transform duration-200 ease-luma group-hover:translate-x-1 motion-reduce:transition-none"
                />
              </Link>
            </div>
          </div>

          <aside className="border-t border-brand-forest-deep/16 p-6 sm:border-t-0 sm:border-l sm:p-7">
            <CloudSlash
              aria-hidden="true"
              size={27}
              weight="duotone"
              className="text-destructive"
            />
            <p className="mt-8 font-mono text-[0.625rem] tracking-[0.14em] text-brand-stone uppercase">
              Recovery
            </p>
            <p className="mt-3 text-sm leading-6 text-brand-forest-deep">
              Retrying rerenders this history route. A demonstration flag is
              cleared first when one is present.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
