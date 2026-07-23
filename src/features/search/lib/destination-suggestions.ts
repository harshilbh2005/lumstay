import type { DestinationSummary } from "@/types/domain";

export type DestinationSuggestionGroup = "recent" | "popular";

export interface DestinationSuggestion {
  id: string;
  slug: string;
  name: string;
  country: string;
  region: string;
  character: string;
  searchValue: string;
  group: DestinationSuggestionGroup;
}

const recentDestinationSlugs = ["udaipur", "south-iceland"] as const;
const popularDestinationSlugs = [
  "kyoto",
  "amalfi-coast",
  "alula",
  "jaipur",
  "graubunden",
] as const;

function toSuggestion(
  destination: DestinationSummary,
  group: DestinationSuggestionGroup,
): DestinationSuggestion {
  return {
    id: destination.id,
    slug: destination.slug,
    name: destination.name,
    country: destination.country,
    region: destination.region,
    character: destination.character,
    searchValue: `${destination.name}, ${destination.country}`,
    group,
  };
}

export function getDestinationSuggestions(
  destinations: readonly DestinationSummary[],
) {
  const destinationsBySlug = new Map(
    destinations.map((destination) => [destination.slug, destination]),
  );

  return [
    ...recentDestinationSlugs.flatMap((slug) => {
      const destination = destinationsBySlug.get(slug);
      return destination ? [toSuggestion(destination, "recent")] : [];
    }),
    ...popularDestinationSlugs.flatMap((slug) => {
      const destination = destinationsBySlug.get(slug);
      return destination ? [toSuggestion(destination, "popular")] : [];
    }),
  ];
}
