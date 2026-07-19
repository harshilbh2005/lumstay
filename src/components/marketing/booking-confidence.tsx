import { ArrowRight, ChatCircleDots } from "@phosphor-icons/react/ssr";
import Link from "next/link";

const lumaPromises = [
  {
    title: "Edited, never endless.",
    description:
      "A smaller collection chosen for character, genuine care, and a relationship to place—not for how much inventory it adds.",
  },
  {
    title: "The full price, before checkout.",
    description:
      "Rates, taxes, and what is included stay visible while you compare, so the last step does not change the decision.",
  },
  {
    title: "Rooms explained honestly.",
    description:
      "Light, layout, noise, stairs, and view—the details that can change a stay are written plainly and kept close at hand.",
  },
  {
    title: "A person when plans change.",
    description:
      "Practical help before, during, and after the trip, without sending you through a maze when you need an answer.",
  },
] as const;

export function BookingConfidence() {
  return (
    <section
      aria-labelledby="booking-confidence-title"
      className="bg-brand-linen py-[var(--space-section)]"
    >
      <div className="container-luma">
        <div className="grid gap-12 border-t border-brand-forest-deep/18 pt-6 lg:grid-cols-12 lg:gap-x-8 lg:pt-8">
          <div className="lg:col-span-5 lg:pr-8 xl:pr-16">
            <p className="flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.15em] text-brand-stone uppercase">
              <span className="text-brand-brass">03</span>
              The Luma promise
            </p>

            <h2
              id="booking-confidence-title"
              className="mt-9 max-w-[10ch] font-sans text-[clamp(2.75rem,5.2vw,5.75rem)] leading-[0.92] font-bold tracking-[-0.06em] text-brand-forest-deep"
            >
              Good taste only matters when you can trust it.
            </h2>

            <p className="mt-8 max-w-[30rem] text-base leading-7 text-muted-foreground">
              We edit with a point of view and keep the practical details in
              plain sight—so the beautiful choice can also be the clear one.
            </p>

            <Link
              href="/about/curation"
              className="group/link mt-7 inline-flex min-h-11 items-center gap-3 border-b border-brand-forest-deep/45 text-sm font-semibold text-brand-forest-deep transition-colors duration-200 hover:border-brand-brass hover:text-brand-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-brand-linen motion-reduce:transition-none"
            >
              How the edit works
              <ArrowRight
                aria-hidden="true"
                size={16}
                className="transition-transform duration-200 ease-luma group-hover/link:translate-x-1 motion-reduce:transition-none"
              />
            </Link>

            <blockquote className="mt-16 max-w-[17rem] border-l border-brand-brass/70 pl-5 text-xl leading-7 font-medium tracking-[-0.02em] text-brand-forest-deep lg:mt-24">
              “Fewer choices. Better reasons.”
              <footer className="mt-4 font-mono text-[0.625rem] tracking-[0.14em] text-brand-stone uppercase">
                The Luma standard
              </footer>
            </blockquote>
          </div>

          <div className="lg:col-start-7 lg:col-span-6">
            <ol className="border-b border-brand-forest-deep/20">
              {lumaPromises.map((promise, index) => (
                <li
                  key={promise.title}
                  className="grid gap-4 border-t border-brand-forest-deep/20 py-7 sm:grid-cols-[3rem_minmax(0,0.9fr)_minmax(0,1.2fr)] sm:gap-6 sm:py-8 lg:py-10"
                >
                  <span className="font-mono text-[0.625rem] tracking-[0.14em] text-brand-brass">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="max-w-[15ch] font-sans text-[1.55rem] leading-[1.04] font-bold tracking-[-0.04em] text-brand-forest-deep sm:text-[1.75rem]">
                    {promise.title}
                  </h3>
                  <p className="max-w-[36rem] text-base leading-7 text-muted-foreground">
                    {promise.description}
                  </p>
                </li>
              ))}
            </ol>

            <aside className="grid gap-6 border-b border-brand-forest-deep/20 py-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:py-9">
              <div className="flex items-start gap-4">
                <ChatCircleDots
                  aria-hidden="true"
                  size={23}
                  weight="light"
                  className="mt-0.5 shrink-0 text-brand-brass"
                />
                <div>
                  <p className="font-sans text-xl leading-tight font-bold tracking-[-0.025em] text-brand-forest-deep">
                    Still deciding?
                  </p>
                  <p className="mt-2 max-w-[30rem] text-sm leading-6 text-muted-foreground">
                    Tell us how you want the trip to feel. We will help narrow
                    the edit.
                  </p>
                </div>
              </div>

              <Link
                href="/support"
                className="inline-flex min-h-12 w-fit items-center justify-center rounded-full border border-brand-forest-deep/38 px-6 text-sm font-semibold text-brand-forest-deep transition-[border-color,background-color,color,transform] duration-200 hover:border-brand-forest-deep hover:bg-brand-forest-deep hover:text-brand-paper active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-brand-linen motion-reduce:transition-none"
              >
                Ask Luma
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
