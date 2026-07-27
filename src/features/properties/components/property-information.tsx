import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";

import type { PropertyDetail } from "@/types/domain";

function SectionLabel({
  index,
  children,
  inverse = false,
}: {
  index: string;
  children: React.ReactNode;
  inverse?: boolean;
}) {
  return (
    <p
      className={
        inverse
          ? "font-mono text-[0.6875rem] tracking-[0.14em] text-white/62 uppercase"
          : "font-mono text-[0.6875rem] tracking-[0.14em] text-brand-stone uppercase"
      }
    >
      <span
        className={inverse ? "mr-3 text-[#d2ab72]" : "mr-3 text-brand-brass"}
      >
        {index}
      </span>
      {children}
    </p>
  );
}

export function PropertyInformation({
  property,
}: {
  property: PropertyDetail;
}) {
  const {
    summary,
    facilityDetails,
    policies,
    practicalDetails,
    locationDetails,
  } = property;
  const coordinates = `${summary.location.coordinates.latitude.toFixed(3)}° N · ${summary.location.coordinates.longitude.toFixed(3)}° E`;

  return (
    <>
      <section
        aria-labelledby="property-character-title"
        className="bg-brand-linen"
      >
        <div className="container-luma py-[var(--space-section)]">
          <div className="grid gap-10 border-t border-brand-forest-deep/18 pt-7 lg:grid-cols-12 lg:gap-x-8 lg:pt-9">
            <div className="lg:col-span-3">
              <SectionLabel index="04">The character</SectionLabel>
            </div>

            <div className="lg:col-span-6">
              <h2
                id="property-character-title"
                className="max-w-[14ch] font-display text-[clamp(2.6rem,5.2vw,5rem)] leading-[0.96] font-medium tracking-[-0.045em] text-brand-forest-deep"
              >
                {summary.description}
              </h2>
            </div>

            <div className="lg:col-span-3 lg:pt-1">
              <p className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-stone uppercase">
                The pace
              </p>
              <ul className="mt-4 border-t border-brand-forest-deep/18">
                {summary.atmosphere.map((quality, index) => (
                  <li
                    key={quality}
                    className="grid min-h-14 grid-cols-[2rem_1fr] items-center border-b border-brand-forest-deep/18 text-sm font-semibold text-brand-forest-deep"
                  >
                    <span className="font-mono text-[0.625rem] font-normal text-brand-brass tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {quality}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="property-facilities-title"
        className="container-luma py-[var(--space-section)]"
      >
        <div className="grid gap-8 border-t border-brand-forest-deep/18 pt-7 lg:grid-cols-12 lg:gap-x-8 lg:pt-9">
          <div className="lg:col-span-3">
            <SectionLabel index="05">At the house</SectionLabel>
          </div>

          <div className="lg:col-span-9">
            <h2
              id="property-facilities-title"
              className="max-w-[11ch] font-display text-[clamp(2.5rem,4.8vw,4.75rem)] leading-[0.96] font-medium tracking-[-0.045em] text-brand-forest-deep"
            >
              Three reasons to stay close.
            </h2>

            <ol className="mt-10 border-t border-brand-forest-deep/24 sm:mt-14">
              {facilityDetails.map((facility, index) => (
                <li
                  key={facility.name}
                  className="grid gap-4 border-b border-brand-forest-deep/24 py-6 sm:grid-cols-[2.5rem_minmax(0,0.8fr)_minmax(0,1.5fr)] sm:gap-6 sm:py-8 lg:grid-cols-[2.5rem_minmax(0,0.85fr)_minmax(0,1.35fr)_10rem]"
                >
                  <span className="font-mono text-[0.625rem] tracking-[0.12em] text-brand-brass tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-sans text-xl leading-tight font-semibold tracking-[-0.025em] text-brand-forest-deep sm:text-2xl">
                    {facility.name}
                  </h3>
                  <p className="max-w-[39rem] text-base leading-7 text-foreground/72 sm:col-start-3">
                    {facility.description}
                  </p>
                  <p className="font-mono text-[0.625rem] leading-5 tracking-[0.11em] text-brand-stone uppercase sm:col-start-2 lg:col-start-4 lg:text-right">
                    {facility.availability}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="property-practical-title"
        className="bg-brand-forest-deep text-brand-paper"
      >
        <div className="container-luma py-[var(--space-section)]">
          <div className="grid gap-10 border-t border-white/18 pt-7 lg:grid-cols-12 lg:gap-x-8 lg:pt-9">
            <div className="lg:col-span-3">
              <SectionLabel index="06" inverse>
                Before you arrive
              </SectionLabel>
            </div>

            <div className="lg:col-span-9">
              <h2
                id="property-practical-title"
                className="max-w-[12ch] font-display text-[clamp(2.6rem,5.2vw,5rem)] leading-[0.96] font-medium tracking-[-0.045em] text-brand-paper"
              >
                The useful things, made clear.
              </h2>

              <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-2 lg:gap-16">
                <div>
                  <h3 className="font-mono text-[0.6875rem] tracking-[0.14em] text-[#d2ab72] uppercase">
                    House policies
                  </h3>
                  <dl className="mt-5 border-t border-white/18">
                    {policies.map((policy) => (
                      <div
                        key={policy.label}
                        className="border-b border-white/18 py-5"
                      >
                        <dt className="font-mono text-[0.625rem] tracking-[0.12em] text-white/58 uppercase">
                          {policy.label}
                        </dt>
                        <dd className="mt-2 max-w-[36rem] text-base leading-7 text-white/86">
                          {policy.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div>
                  <h3 className="font-mono text-[0.6875rem] tracking-[0.14em] text-[#d2ab72] uppercase">
                    Practical details
                  </h3>
                  <dl className="mt-5 border-t border-white/18">
                    {practicalDetails.map((detail) => (
                      <div
                        key={detail.label}
                        className="border-b border-white/18 py-5"
                      >
                        <dt className="font-mono text-[0.625rem] tracking-[0.12em] text-white/58 uppercase">
                          {detail.label}
                        </dt>
                        <dd className="mt-2 max-w-[36rem] text-base leading-7 text-white/86">
                          {detail.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <p className="mt-8 max-w-[52rem] border-l border-[#d2ab72]/65 pl-4 text-xs leading-5 text-white/55">
                Prototype data: operational details are adapted from published
                Ravello hospitality and destination references. They are not
                live Casa Serein inventory or booking terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="property-location-title"
        className="container-luma py-[var(--space-section)]"
      >
        <div className="grid gap-10 border-t border-brand-forest-deep/18 pt-7 lg:grid-cols-12 lg:gap-x-8 lg:pt-9">
          <div className="lg:col-span-3">
            <SectionLabel index="07">The setting</SectionLabel>
          </div>

          <div className="lg:col-span-6">
            <h2
              id="property-location-title"
              className="max-w-[10ch] font-display text-[clamp(3rem,6vw,6rem)] leading-[0.9] font-medium tracking-[-0.055em] text-brand-forest-deep"
            >
              Ravello, above the coast.
            </h2>
            <p className="mt-8 max-w-[41rem] text-base leading-8 text-foreground/74 sm:text-lg">
              {locationDetails.overview}
            </p>
          </div>

          <div className="lg:col-span-3">
            <dl className="border-y border-brand-forest-deep/18">
              <div className="py-5">
                <dt className="font-mono text-[0.625rem] tracking-[0.12em] text-brand-stone uppercase">
                  Elevation
                </dt>
                <dd className="mt-2 font-display text-5xl leading-none tracking-[-0.045em] text-brand-forest-deep">
                  {locationDetails.elevation}
                </dd>
              </div>
              <div className="border-t border-brand-forest-deep/18 py-5">
                <dt className="font-mono text-[0.625rem] tracking-[0.12em] text-brand-stone uppercase">
                  Coordinates
                </dt>
                <dd className="mt-2 font-mono text-xs leading-5 text-brand-forest-deep tabular-nums">
                  {coordinates}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-12 grid lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-9 lg:col-start-4">
            <p className="font-mono text-[0.625rem] tracking-[0.13em] text-brand-stone uppercase">
              Nearby
            </p>
            <dl className="mt-4 border-t border-brand-forest-deep/24">
              {locationDetails.nearby.map((place, index) => (
                <div
                  key={place.name}
                  className="grid gap-2 border-b border-brand-forest-deep/24 py-5 sm:grid-cols-[2.5rem_minmax(0,0.75fr)_minmax(0,1.25fr)] sm:items-baseline sm:gap-6 sm:py-6"
                >
                  <span className="font-mono text-[0.625rem] text-brand-brass tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <dt className="text-lg font-semibold tracking-[-0.02em] text-brand-forest-deep">
                    {place.name}
                  </dt>
                  <dd className="text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                    {place.context}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex justify-end">
              <Link
                href="/search"
                className="group inline-flex min-h-11 items-center gap-3 border-b border-brand-forest-deep/45 text-sm font-semibold text-brand-forest-deep transition-colors duration-200 hover:border-brand-brass hover:text-brand-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
              >
                Return to the collection
                <ArrowUpRight
                  aria-hidden="true"
                  size={16}
                  className="transition-transform duration-200 ease-luma group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
