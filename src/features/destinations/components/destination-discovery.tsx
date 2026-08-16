import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/ssr";

import { getMediaById, mockDestinations } from "@/data/mock";
import type { DestinationSummary } from "@/types/domain";

const atlasLayouts = [
  {
    item: "lg:col-span-7",
    image: "aspect-[7/5]",
    sizes: "(min-width: 1024px) 55vw, (min-width: 640px) 50vw, 100vw",
  },
  {
    item: "lg:col-start-9 lg:col-span-4 lg:mt-28",
    image: "aspect-[4/5]",
    sizes: "(min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw",
  },
  {
    item: "lg:col-span-4",
    image: "aspect-[4/5]",
    sizes: "(min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw",
  },
  {
    item: "lg:col-start-6 lg:col-span-7 lg:-mt-6",
    image: "aspect-[7/5]",
    sizes: "(min-width: 1024px) 55vw, (min-width: 640px) 50vw, 100vw",
  },
  {
    item: "lg:col-span-7",
    image: "aspect-[7/5]",
    sizes: "(min-width: 1024px) 55vw, (min-width: 640px) 50vw, 100vw",
  },
  {
    item: "lg:col-start-9 lg:col-span-4 lg:mt-24",
    image: "aspect-[4/5]",
    sizes: "(min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw",
  },
] as const;

function getDestinationMedia(destination: DestinationSummary) {
  const media = getMediaById(destination.mediaId);

  if (!media) {
    throw new Error(`Missing media for destination: ${destination.name}`);
  }

  return media;
}

function getSearchHref(destination: DestinationSummary) {
  return `/search?destination=${encodeURIComponent(destination.name)}`;
}

export function DestinationDiscovery() {
  const [featuredDestination, ...atlasDestinations] = mockDestinations;
  const featuredMedia = getDestinationMedia(featuredDestination);

  return (
    <div className="bg-brand-paper">
      <section
        aria-labelledby="destinations-heading"
        className="container-luma pt-14 pb-16 sm:pt-20 sm:pb-24 lg:pt-24"
      >
        <div className="flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.16em] text-brand-brass-dark uppercase">
          <span className="h-px w-7 bg-brand-brass" aria-hidden="true" />
          The Luma atlas
        </div>

        <div className="mt-6 grid gap-8 border-t border-border pt-8 lg:grid-cols-12 lg:gap-x-8 lg:pt-10">
          <h1
            id="destinations-heading"
            className="max-w-[11ch] text-[clamp(3.65rem,8vw,7.75rem)] leading-[0.88] font-semibold tracking-[-0.055em] text-brand-forest-deep lg:col-span-8"
          >
            Places with a reason to stay.
          </h1>

          <div className="max-w-[31rem] lg:col-start-10 lg:col-span-3 lg:self-end">
            <p className="text-base leading-7 text-foreground/72 sm:text-lg sm:leading-8">
              We begin with the place, then find the stays that belong there—
              distinctive, grounded, and worth traveling toward.
            </p>
            <p className="mt-6 font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">
              07 places / 04 regions
            </p>
          </div>
        </div>

        <nav aria-label="Destination index" className="mt-12 sm:mt-16">
          <ul className="grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-7">
            {mockDestinations.map((destination, index) => (
              <li key={destination.id} className="border-r border-b border-border">
                <a
                  href={`#${destination.slug}`}
                  className="group flex min-h-16 items-center justify-between gap-3 px-4 text-sm font-semibold text-foreground/78 transition-colors duration-200 hover:bg-brand-linen hover:text-brand-forest-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring motion-reduce:transition-none lg:min-h-20 lg:flex-col lg:items-start lg:justify-center"
                >
                  <span className="font-mono text-[0.625rem] tracking-[0.1em] text-brand-brass-dark">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{destination.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <section className="bg-brand-forest-deep py-16 text-brand-paper sm:py-24 lg:py-28">
        <article
          id={featuredDestination.slug}
          className="container-luma scroll-mt-28 lg:grid lg:grid-cols-12 lg:gap-x-8"
        >
          <div className="flex flex-col lg:col-span-5 lg:pr-8">
            <div className="flex items-center justify-between border-b border-white/16 pb-5 font-mono text-[0.6875rem] tracking-[0.15em] text-white/54 uppercase">
              <span>First place / 01</span>
              <span>{featuredDestination.region}</span>
            </div>

            <div className="pt-10 lg:pt-16">
              <p className="font-mono text-[0.6875rem] tracking-[0.15em] text-brand-brass uppercase">
                {featuredDestination.character}
              </p>
              <h2 className="mt-4 text-[clamp(3.5rem,7vw,7rem)] leading-[0.86] font-semibold tracking-[-0.055em]">
                {featuredDestination.name}
              </h2>
              <p className="mt-7 max-w-[31rem] text-base leading-7 text-white/67 sm:text-lg sm:leading-8">
                {featuredDestination.description}
              </p>
            </div>

            <dl className="mt-10 grid grid-cols-2 border-y border-white/16 sm:mt-14">
              <div className="border-r border-white/16 py-5 pr-5">
                <dt className="font-mono text-[0.625rem] tracking-[0.13em] text-white/48 uppercase">
                  Best season
                </dt>
                <dd className="mt-2 text-sm leading-6 text-white/78">
                  {featuredDestination.bestSeason}
                </dd>
              </div>
              <div className="py-5 pl-5">
                <dt className="font-mono text-[0.625rem] tracking-[0.13em] text-white/48 uppercase">
                  Rhythm
                </dt>
                <dd className="mt-2 text-sm leading-6 text-white/78">
                  {featuredDestination.pace}
                </dd>
              </div>
            </dl>

            <Link
              href={getSearchHref(featuredDestination)}
              prefetch={false}
              className="group mt-8 inline-flex min-h-11 w-fit items-center gap-3 rounded-sm text-sm font-semibold text-brand-paper underline decoration-brand-brass/70 underline-offset-8 transition-colors duration-200 hover:text-brand-brass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brass focus-visible:ring-offset-4 focus-visible:ring-offset-brand-forest-deep motion-reduce:transition-none lg:mt-auto"
            >
              Find stays in {featuredDestination.name}
              <ArrowRight
                aria-hidden="true"
                size={17}
                className="transition-transform duration-200 ease-luma group-hover:translate-x-1 motion-reduce:transition-none"
              />
            </Link>
          </div>

          <figure className="mt-12 lg:col-start-7 lg:col-span-6 lg:mt-0">
            <div className="relative aspect-[4/5] overflow-hidden bg-white/6">
              <Image
                src={featuredMedia.src}
                alt={featuredMedia.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                style={{ objectPosition: featuredMedia.focalPoint }}
              />
            </div>
            <figcaption className="mt-4 flex items-start justify-between gap-5 font-mono text-[0.625rem] leading-5 tracking-[0.1em] text-white/48 uppercase">
              <span>{featuredMedia.title}</span>
              <span className="text-right">
                {featuredDestination.country} / {featuredDestination.region}
              </span>
            </figcaption>
          </figure>
        </article>
      </section>

      <section
        aria-labelledby="atlas-heading"
        className="bg-brand-linen py-20 sm:py-28 lg:py-36"
      >
        <div className="container-luma">
          <header className="grid gap-5 border-t border-border pt-6 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <p className="font-mono text-[0.6875rem] tracking-[0.15em] text-brand-brass-dark uppercase">
                Continue around the map
              </p>
              <h2
                id="atlas-heading"
                className="mt-3 text-[clamp(2.8rem,5.5vw,5.5rem)] leading-[0.94] font-semibold tracking-[-0.045em] text-brand-forest-deep"
              >
                The atlas, edited.
              </h2>
            </div>
            <p className="max-w-sm text-base leading-7 text-foreground/66 sm:text-right">
              Six landscapes, each with its own measure of quiet, culture, and
              character.
            </p>
          </header>

          <ol className="mt-16 grid gap-x-8 gap-y-20 sm:grid-cols-2 sm:gap-y-24 lg:mt-24 lg:grid-cols-12 lg:gap-y-32">
            {atlasDestinations.map((destination, index) => {
              const media = getDestinationMedia(destination);
              const layout = atlasLayouts[index];

              return (
                <li
                  key={destination.id}
                  id={destination.slug}
                  className={`scroll-mt-28 sm:col-span-1 ${layout.item}`}
                >
                  <Link
                    href={getSearchHref(destination)}
                    prefetch={false}
                    aria-label={`Find stays in ${destination.name}, ${destination.country}`}
                    className="group block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-8 focus-visible:ring-offset-brand-linen"
                  >
                    <figure>
                      <div
                        className={`relative overflow-hidden bg-brand-forest/8 ${layout.image}`}
                      >
                        <Image
                          src={media.src}
                          alt={media.alt}
                          fill
                          sizes={layout.sizes}
                          className="object-cover transition-transform duration-500 ease-luma group-hover:scale-[1.018] motion-reduce:transition-none"
                          style={{ objectPosition: media.focalPoint }}
                        />
                      </div>

                      <figcaption className="mt-5">
                        <div className="flex items-center justify-between gap-5 border-b border-border pb-3 font-mono text-[0.625rem] tracking-[0.13em] text-muted-foreground uppercase">
                          <span>
                            {String(index + 2).padStart(2, "0")} / {destination.character}
                          </span>
                          <ArrowUpRight
                            aria-hidden="true"
                            size={16}
                            className="shrink-0 text-brand-brass transition-transform duration-200 ease-luma group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                          />
                        </div>

                        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-baseline lg:grid-cols-1 xl:grid-cols-[1fr_auto]">
                          <h3 className="text-[clamp(2.25rem,4.25vw,4.5rem)] leading-[0.95] font-semibold tracking-[-0.04em] text-brand-forest-deep">
                            {destination.name}
                          </h3>
                          <p className="font-mono text-[0.625rem] tracking-[0.11em] text-muted-foreground uppercase sm:text-right lg:text-left xl:text-right">
                            {destination.country}
                          </p>
                        </div>

                        <p className="mt-4 max-w-[38rem] text-base leading-7 text-foreground/68">
                          {destination.description}
                        </p>

                        <dl className="mt-6 grid grid-cols-2 border-t border-border pt-4 text-sm">
                          <div className="pr-4">
                            <dt className="font-mono text-[0.625rem] tracking-[0.12em] text-muted-foreground uppercase">
                              Season
                            </dt>
                            <dd className="mt-2 leading-6 text-foreground/74">
                              {destination.bestSeason}
                            </dd>
                          </div>
                          <div className="border-l border-border pl-4">
                            <dt className="font-mono text-[0.625rem] tracking-[0.12em] text-muted-foreground uppercase">
                              Rhythm
                            </dt>
                            <dd className="mt-2 leading-6 text-foreground/74">
                              {destination.pace}
                            </dd>
                          </div>
                        </dl>
                      </figcaption>
                    </figure>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </div>
  );
}
