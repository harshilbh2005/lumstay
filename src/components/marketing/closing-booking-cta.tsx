"use client";

import { ArrowUp } from "@phosphor-icons/react";

function focusHeroSearch() {
  const destination = document.getElementById("hero-destination");

  if (!(destination instanceof HTMLInputElement)) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  destination.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "center",
  });
  destination.focus({ preventScroll: true });
}

export function ClosingBookingCta() {
  return (
    <section
      aria-labelledby="closing-booking-title"
      className="bg-brand-paper py-[var(--space-section)]"
    >
      <div className="container-luma">
        <div className="border-y border-brand-forest-deep/20">
          <div className="grid gap-12 py-10 sm:py-14 lg:grid-cols-12 lg:items-end lg:gap-x-8 lg:py-18">
            <div className="lg:col-span-8">
              <p className="flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.15em] text-brand-stone uppercase">
                <span className="text-brand-brass">04</span>
                Your next stay
              </p>

              <h2
                id="closing-booking-title"
                className="mt-8 max-w-[12ch] font-display text-[clamp(3.5rem,7.5vw,8.25rem)] leading-[0.86] font-semibold tracking-[-0.065em] text-brand-forest-deep"
              >
                The world is wide. The edit is not.
              </h2>
            </div>

            <div className="lg:col-start-9 lg:col-span-4 lg:pb-2 xl:col-start-10 xl:col-span-3">
              <p className="max-w-[28rem] text-base leading-7 text-muted-foreground">
                Start with a place. We will bring the possibilities down to
                the stays worth knowing.
              </p>

              <button
                type="button"
                onClick={focusHeroSearch}
                className="group/cta mt-7 inline-flex min-h-12 w-full items-center justify-between gap-5 rounded-full bg-brand-forest-deep py-2.5 pr-2.5 pl-6 text-left text-sm font-semibold text-brand-paper transition-[background-color,transform] duration-200 hover:bg-brand-forest active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-brand-paper motion-reduce:transition-none sm:w-auto sm:min-w-64"
              >
                Search the Luma edit
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 transition-transform duration-200 ease-luma group-hover/cta:-translate-y-0.5 motion-reduce:transition-none">
                  <ArrowUp aria-hidden="true" size={16} weight="bold" />
                </span>
              </button>

              <p className="mt-4 font-mono text-[0.625rem] tracking-[0.12em] text-brand-stone uppercase">
                Dates can stay flexible
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
