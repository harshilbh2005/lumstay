import { getMediaById, mockProperties } from "@/data/mock";

import { SavedPropertyCollection } from "./saved-property-collection";
import type { SavedPropertyEntry } from "../types";

function getSavedPropertyEntries(): SavedPropertyEntry[] {
  return mockProperties.flatMap((property) => {
    const media = getMediaById(property.mediaId);

    if (!media) {
      return [];
    }

    return [
      {
        id: property.id,
        slug: property.slug,
        name: property.name,
        location: {
          city: property.location.city,
          country: property.location.country,
        },
        description: property.description,
        rating: property.rating,
        reviewCount: property.reviewCount,
        priceFrom: property.priceFrom,
        atmosphere: property.atmosphere,
        facilities: property.facilities,
        media: {
          src: media.src,
          alt: media.alt,
          focalPoint: media.focalPoint,
        },
      },
    ];
  });
}

export function SavedPropertiesPage() {
  return (
    <div className="bg-brand-paper">
      <section
        aria-labelledby="saved-page-heading"
        className="container-luma pt-14 pb-16 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28"
      >
        <div className="flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.16em] text-brand-brass uppercase">
          <span className="h-px w-7 bg-brand-brass" aria-hidden="true" />
          Your Luma list
        </div>

        <div className="mt-6 grid gap-9 border-t border-border pt-8 lg:grid-cols-12 lg:gap-x-8 lg:pt-10">
          <h1
            id="saved-page-heading"
            className="max-w-[10ch] text-[clamp(3.65rem,8vw,7.75rem)] leading-[0.88] font-semibold tracking-[-0.055em] text-brand-forest-deep lg:col-span-8"
          >
            Places worth returning to.
          </h1>

          <div className="max-w-[31rem] lg:col-start-10 lg:col-span-3 lg:self-end">
            <p className="text-base leading-7 text-foreground/72 sm:text-lg sm:leading-8">
              A quiet edit of the stays that caught your eye, held close until
              the next journey takes shape.
            </p>
            <p className="mt-6 font-mono text-[0.6875rem] leading-5 tracking-[0.13em] text-muted-foreground uppercase">
              Private to this browser / locally held
            </p>
          </div>
        </div>
      </section>

      <SavedPropertyCollection properties={getSavedPropertyEntries()} />
    </div>
  );
}
