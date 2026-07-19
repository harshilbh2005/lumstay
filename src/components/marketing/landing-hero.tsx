import Image from "next/image";

import { getMediaById } from "@/data/mock";
import { HeroSearch } from "@/features/search";

export function LandingHero() {
  const hero = getMediaById("aster-house-hero");

  if (!hero) {
    throw new Error("The Aster House hero image is missing from the media catalog.");
  }

  return (
    <section
      aria-labelledby="landing-hero-title"
      className="relative isolate min-h-[calc(100svh-5.5rem)] overflow-hidden bg-brand-forest-deep text-white"
    >
      <Image
        fill
        preload
        sizes="100vw"
        src={hero.src}
        alt={hero.alt}
        className="-z-20 object-cover object-[72%_center] sm:object-center"
      />
      <div className="luma-hero-veil absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-brand-forest-deep/78 to-transparent"
        aria-hidden="true"
      />

      <div className="container-luma flex min-h-[calc(100svh-5.5rem)] flex-col justify-end py-8 sm:py-10 lg:py-12">
        <div className="mb-8 max-w-[54rem] sm:mb-10 lg:mb-12">
          <p className="mb-5 flex min-w-0 items-center gap-3 overflow-hidden text-[0.6875rem] font-bold tracking-[0.19em] text-white/76 uppercase sm:mb-6">
            <span className="h-px w-8 bg-brand-brass" aria-hidden="true" />
            <span className="shrink-0 sm:hidden">The LumaStay edit</span>
            <span className="hidden sm:inline">
              The LumaStay edit · Independent stays worldwide
            </span>
          </p>
          <h1
            id="landing-hero-title"
            className="max-w-[10ch] font-sans text-[clamp(3.2rem,7.6vw,7.6rem)] leading-[0.9] font-bold tracking-[-0.065em] text-balance drop-shadow-[0_2px_22px_rgb(0_0_0/0.18)]"
          >
            Stay somewhere{" "}
            <span className="luma-hero-title-gradient">worth remembering.</span>
          </h1>
          <p className="mt-6 max-w-[37rem] text-base leading-7 font-medium text-white/78 sm:mt-7 sm:text-lg sm:leading-8">
            Character-led hotels, rooms with soul, and a simpler way to find the one
            that feels like you.
          </p>
        </div>

        <HeroSearch />
      </div>

      <aside className="absolute top-9 right-[var(--space-page)] hidden text-right lg:block">
        <p className="text-[0.625rem] font-bold tracking-[0.18em] text-white/58 uppercase">
          Featured stay · 01
        </p>
        <p className="mt-2 text-sm font-semibold text-white">{hero.title}</p>
        <p className="mt-0.5 text-xs text-white/68">{hero.location}</p>
      </aside>
    </section>
  );
}
