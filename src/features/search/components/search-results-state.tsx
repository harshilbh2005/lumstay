import Link from "next/link";
import {
  ArrowRight,
  Binoculars,
  CloudSlash,
  Notebook,
} from "@phosphor-icons/react/ssr";

type SearchResultsStateVariant = "no-results" | "empty" | "error";

const stateContent = {
  "no-results": {
    eyebrow: "No exact match",
    title: "Nothing in the edit fits every detail.",
    description:
      "The combination is a little too precise for this collection. Clear the filters to see every considered stay, or change the trip itself.",
    primaryLabel: "Clear filters",
    asideLabel: "A broader view",
    asideCopy:
      "Your destination, dates, guests, rooms, and chosen order will stay exactly as they are.",
    Icon: Binoculars,
  },
  empty: {
    eyebrow: "Collection pause",
    title: "The edit is quiet just now.",
    description:
      "No stays are available to browse at this moment. Your trip details are still here, and a fresh look may bring the collection back.",
    primaryLabel: "Check again",
    asideLabel: "Nothing lost",
    asideCopy:
      "The current destination, dates, and guest details remain in place while you try the collection again.",
    Icon: Notebook,
  },
  error: {
    eyebrow: "Search interrupted",
    title: "We couldn’t open the edit.",
    description:
      "A temporary problem stopped the collection from arriving. Your search is safe; try once more to continue from the same place.",
    primaryLabel: "Try again",
    asideLabel: "Your search is safe",
    asideCopy:
      "Retrying keeps the valid trip details, filters, and ordering already attached to this search.",
    Icon: CloudSlash,
  },
} as const;

export function SearchResultsState({
  variant,
  primaryHref,
}: {
  variant: SearchResultsStateVariant;
  primaryHref: string;
}) {
  const content = stateContent[variant];
  const Icon = content.Icon;

  return (
    <section
      aria-labelledby={`search-${variant}-title`}
      role={variant === "error" ? "alert" : "status"}
      className="grid min-h-[30rem] border-t border-brand-forest-deep/18 sm:grid-cols-[minmax(0,1fr)_13rem] lg:min-h-[36rem]"
    >
      <div className="flex flex-col justify-center py-12 sm:pr-10 lg:py-16 lg:pr-16">
        <p
          className={`font-mono text-[0.6875rem] tracking-[0.15em] uppercase ${
            variant === "error" ? "text-destructive" : "text-brand-brass"
          }`}
        >
          {content.eyebrow}
        </p>
        <h2
          id={`search-${variant}-title`}
          className="mt-5 max-w-[11ch] font-sans text-[clamp(2.5rem,5vw,4.75rem)] leading-[0.94] font-bold tracking-[-0.055em] text-brand-forest-deep"
        >
          {content.title}
        </h2>
        <p className="mt-6 max-w-[34rem] text-base leading-7 text-muted-foreground">
          {content.description}
        </p>

        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <Link
            href={primaryHref}
            scroll={false}
            className="group/action inline-flex min-h-12 w-full items-center justify-between gap-5 border border-brand-forest-deep bg-brand-forest-deep px-5 text-sm font-semibold text-brand-paper transition-colors duration-200 hover:bg-brand-forest hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:translate-y-px sm:w-auto"
          >
            {content.primaryLabel}
            <ArrowRight
              aria-hidden="true"
              size={16}
              className="transition-transform duration-200 ease-luma group-hover/action:translate-x-1"
            />
          </Link>
          <Link
            href="/#stay-search"
            className="inline-flex min-h-11 items-center px-2 text-sm font-semibold text-brand-forest-deep underline decoration-brand-forest-deep/35 underline-offset-4 transition-colors duration-200 hover:text-brand-brass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Change search
          </Link>
        </div>
      </div>

      <aside className="border-t border-brand-forest-deep/16 bg-brand-linen p-6 sm:border-t-0 sm:border-l sm:p-7">
        <Icon
          aria-hidden="true"
          size={26}
          weight="duotone"
          className={
            variant === "error" ? "text-destructive" : "text-brand-brass"
          }
        />
        <p className="mt-8 font-mono text-[0.625rem] tracking-[0.14em] text-brand-stone uppercase">
          {content.asideLabel}
        </p>
        <p className="mt-3 text-sm leading-6 text-brand-forest-deep">
          {content.asideCopy}
        </p>
      </aside>
    </section>
  );
}

export function SearchStateRail({
  variant,
}: {
  variant: Extract<SearchResultsStateVariant, "empty" | "error">;
}) {
  const isError = variant === "error";

  return (
    <aside aria-label="Collection status" className="lg:col-span-3">
      <div className="border-t border-brand-forest-deep/18 pt-5">
        <p
          className={`font-mono text-[0.625rem] tracking-[0.14em] uppercase ${
            isError ? "text-destructive" : "text-brand-brass"
          }`}
        >
          Collection status
        </p>
        <p className="mt-5 font-sans text-3xl leading-none font-bold tracking-[-0.045em] text-brand-forest-deep">
          {isError ? "Temporarily unavailable." : "No stays to show."}
        </p>
        <p className="mt-4 max-w-[19rem] text-base leading-7 text-muted-foreground">
          {isError
            ? "The interruption is limited to the results. Your search context remains intact."
            : "The collection is empty rather than filtered out. Changing filters will not reveal hidden stays."}
        </p>
      </div>
    </aside>
  );
}
