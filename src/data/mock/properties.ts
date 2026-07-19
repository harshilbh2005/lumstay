import type { PropertySummary } from "@/types/domain";

export const mockProperties = [
  {
    id: "property-casa-serein",
    slug: "casa-serein",
    name: "Casa Serein",
    location: {
      city: "Ravello",
      country: "Italy",
      region: "Amalfi Coast",
      coordinates: { latitude: 40.649, longitude: 14.611 },
    },
    description:
      "A limewashed hideaway threaded through citrus terraces, with twelve rooms facing the Tyrrhenian blue.",
    image: "/images/lumstay/properties/casa-serein-amalfi.png",
    rating: 4.94,
    reviewCount: 186,
    priceFrom: { amount: 38200, currency: "INR" },
    atmosphere: ["Sea-facing", "Quiet design", "Slow mornings"],
    facilities: ["Infinity pool", "Garden restaurant", "Private transfers"],
    isLumaPick: true,
  },
  {
    id: "property-stillwater-cabin",
    slug: "stillwater-cabin",
    name: "Stillwater Cabin",
    location: {
      city: "Hella",
      country: "Iceland",
      region: "South Iceland",
      coordinates: { latitude: 63.835, longitude: -20.401 },
    },
    description:
      "Charred timber, dark water, and a private geothermal soak under the wide Icelandic weather.",
    image: "/images/lumstay/properties/stillwater-cabin-iceland.png",
    rating: 4.89,
    reviewCount: 74,
    priceFrom: { amount: 44600, currency: "INR" },
    atmosphere: ["Remote", "Fire-warmed", "Northern skies"],
    facilities: ["Geothermal bath", "Wood stove", "Breakfast pantry"],
    isNew: true,
  },
  {
    id: "property-sahra-fold",
    slug: "sahra-fold",
    name: "Sahra Fold",
    location: {
      city: "AlUla",
      country: "Saudi Arabia",
      region: "Hejaz",
      coordinates: { latitude: 26.608, longitude: 37.923 },
    },
    description:
      "Earthen pavilions shaped around shade, silence, and the changing colour of sandstone at dusk.",
    image: "/images/lumstay/properties/sahra-fold-saudi-arabia.png",
    rating: 4.97,
    reviewCount: 51,
    priceFrom: { amount: 51900, currency: "INR" },
    atmosphere: ["Elemental", "Private", "Desert stillness"],
    facilities: ["Canyon pool", "Desert guide", "Open-fire dining"],
    isLumaPick: true,
  },
] as const satisfies readonly PropertySummary[];
