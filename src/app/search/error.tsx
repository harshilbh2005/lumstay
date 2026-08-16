"use client";

import Link from "next/link";
import { ArrowRight, CloudSlash } from "@phosphor-icons/react";

export default function SearchError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <section
      aria-labelledby="search-error-title"
      className="bg-brand-paper pb-[var(--space-section)]"
    >
      <div className="container-luma pt-10 sm:pt-14 lg:pt-20">
        <header className="grid gap-8 border-t border-brand-forest-deep/20 pt-6 lg:grid-cols-12 lg:gap-x-8 lg:pt-8">
          <p className="flex items-start gap-3 font-mono text-[0.6875rem] tracking-[0.15em] text-destructive uppercase lg:col-span-3">
            <span>01</span>
            Search interrupted
          </p>

          <div className="lg:col-span-6">
            <h1
              id="search-error-title"
              className="max-w-[11ch] font-sans text-[clamp(3rem,6vw,6.6rem)] leading-[0.9] font-bold tracking-[-0.065em] text-brand-forest-deep"
            >
              The edit lost its place.
            </h1>
          </div>

          <p className="max-w-[30rem] text-base leading-7 text-muted-foreground lg:col-span-3 lg:pt-1">
            An unexpected problem interrupted this search. Try the results
            again, or begin with a fresh destination.
          </p>
        </header>

        <div
          role="alert"
          className="mt-12 grid min-h-[26rem] border-y border-brand-forest-deep/18 bg-brand-linen sm:grid-cols-[minmax(0,1fr)_13rem] lg:mt-16 lg:min-h-[30rem]"
        >
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
            <p className="font-mono text-[0.6875rem] tracking-[0.15em] text-destructive uppercase">
              Unexpected error
            </p>
            <h2 className="mt-5 max-w-[13ch] font-sans text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.94] font-bold tracking-[-0.055em] text-brand-forest-deep">
              Your trip details may still be recovered.
            </h2>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => unstable_retry()}
                className="group/action inline-flex min-h-12 w-full items-center justify-between gap-5 border border-brand-forest-deep bg-brand-forest-deep px-5 text-sm font-semibold text-brand-paper transition-colors duration-200 hover:bg-brand-forest hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:translate-y-px sm:w-auto"
              >
                Try results again
                <ArrowRight
                  aria-hidden="true"
                  size={16}
                  className="transition-transform duration-200 ease-luma group-hover/action:translate-x-1"
                />
              </button>
              <Link
                href="/#stay-search"
                className="inline-flex min-h-11 items-center px-2 text-sm font-semibold text-brand-forest-deep underline decoration-brand-forest-deep/35 underline-offset-4 transition-colors duration-200 hover:text-brand-brass-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Start a new search
              </Link>
            </div>
          </div>

          <div className="border-t border-brand-forest-deep/16 p-6 sm:border-t-0 sm:border-l sm:p-7">
            <CloudSlash
              aria-hidden="true"
              size={26}
              weight="duotone"
              className="text-destructive"
            />
            <p className="mt-8 font-mono text-[0.625rem] tracking-[0.14em] text-brand-stone uppercase">
              Recovery
            </p>
            <p className="mt-3 text-sm leading-6 text-brand-forest-deep">
              Retrying asks the search route to render again without sending
              you away from this page.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
