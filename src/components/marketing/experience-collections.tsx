import { getMediaById } from "@/data/mock/media";

import {
  ExperienceGallery,
  type ExperienceStory,
} from "./experience-gallery";

const experienceDefinitions = [
  {
    mediaId: "vela-alpine-bath",
    eyebrow: "Alpine rituals",
    title: "Breathe deeper",
    description:
      "Steam, stone, and forest silence—restorative stays where the landscape sets the pace.",
    href: "/search?collection=wellness",
  },
  {
    mediaId: "nila-haveli-courtyard-dining",
    eyebrow: "After-dark tables",
    title: "Stay for dinner",
    description:
      "Courtyards, candlelight, and kitchens with a sense of place. Some journeys begin at the table.",
    href: "/search?collection=dining",
  },
  {
    mediaId: "kyoto-street-dusk",
    eyebrow: "Neighbourhood walks",
    title: "Lose track of time",
    description:
      "Addresses chosen for what waits beyond the lobby: old streets, local rituals, and room to wander.",
    href: "/search?collection=city-stories",
  },
  {
    mediaId: "tropical-infinity-pool",
    eyebrow: "Barefoot stays",
    title: "Follow the warmth",
    description:
      "Palm-framed pools and slow, salt-air afternoons for the days that ask very little of you.",
    href: "/search?collection=warm-weather",
  },
] as const;

function getExperienceStories(): ExperienceStory[] {
  return experienceDefinitions.map((definition) => {
    const media = getMediaById(definition.mediaId);

    if (!media) {
      throw new Error(`Missing LumaStay media asset: ${definition.mediaId}`);
    }

    return {
      ...definition,
      image: media.src,
      imageAlt: media.alt,
      imagePosition: media.focalPoint,
      location: media.location,
    };
  });
}

export function ExperienceCollections() {
  return (
    <section
      aria-labelledby="experience-collections-title"
      className="overflow-hidden bg-brand-forest-deep py-[var(--space-section)] text-brand-paper"
    >
      <div className="container-luma">
        <div className="grid gap-8 border-t border-white/16 pt-6 lg:grid-cols-12 lg:gap-x-8 lg:pt-8">
          <p className="flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.15em] text-white/58 uppercase lg:col-span-3">
            <span className="text-brand-brass">02</span>
            Beyond the room
          </p>

          <div className="lg:col-span-6">
            <h2
              id="experience-collections-title"
              className="max-w-[11ch] font-sans text-[clamp(2.75rem,5.3vw,5.5rem)] leading-[0.92] font-bold tracking-[-0.06em] text-balance"
            >
              Go for the stay. Remember everything around it.
            </h2>
          </div>

          <p className="max-w-[28rem] text-base leading-7 text-white/64 lg:col-span-3 lg:pt-1">
            A table at dusk, a bath above the tree line, streets that reward
            getting lost—the small rituals are often what make a place stay
            with us.
          </p>
        </div>

        <ExperienceGallery stories={getExperienceStories()} />
      </div>
    </section>
  );
}
