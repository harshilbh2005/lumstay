export type MediaKind =
  | "hero"
  | "property"
  | "room"
  | "wellness"
  | "dining"
  | "destination"
  | "experience";

export type MediaOrigin = "generated" | "stock";

export interface MediaSource {
  provider: "Unsplash";
  creator: string;
  pageUrl: string;
  licenseUrl: string;
}

export interface LumaStayMediaAsset {
  id: string;
  src: string;
  title: string;
  alt: string;
  kind: MediaKind;
  origin: MediaOrigin;
  location?: string;
  description: string;
  intendedUses: readonly string[];
  aspectRatio: "3:2" | "4:3" | "2:3";
  focalPoint: string;
  palette: readonly string[];
  source?: MediaSource;
}

const unsplashLicenseUrl = "https://unsplash.com/license";

export const lumstayMedia = [
  {
    id: "aster-house-hero",
    src: "/images/lumstay/hero/aster-house-udaipur.png",
    title: "Aster House",
    alt: "Fictional pale-stone lakeside hotel overlooking calm water and hazy hills at sunrise",
    kind: "hero",
    origin: "generated",
    location: "Udaipur, India",
    description:
      "LumaStay's signature heritage-modern retreat, composed with quiet negative space for landing-page copy and search.",
    intendedUses: ["landing hero", "featured stay", "brand campaign"],
    aspectRatio: "3:2",
    focalPoint: "right center",
    palette: ["deep teal", "warm limestone", "muted brass", "forest green"],
  },
  {
    id: "casa-serein-exterior",
    src: "/images/lumstay/properties/casa-serein-amalfi.png",
    title: "Casa Serein",
    alt: "Fictional limewashed cliffside hotel with a narrow pool, lemon trees, and a hazy Mediterranean view",
    kind: "property",
    origin: "generated",
    location: "Ravello, Italy",
    description:
      "An intimate Amalfi hideaway shaped by weathered limewash, terraced citrus gardens, and soft sea light.",
    intendedUses: ["property card", "property gallery", "coastal collection"],
    aspectRatio: "4:3",
    focalPoint: "left center",
    palette: ["chalk white", "terracotta", "olive", "mineral blue"],
  },
  {
    id: "stillwater-cabin-exterior",
    src: "/images/lumstay/properties/stillwater-cabin-iceland.png",
    title: "Stillwater Cabin",
    alt: "Fictional charred-timber cabin glowing beside a dark Icelandic lake after rain",
    kind: "property",
    origin: "generated",
    location: "South Iceland",
    description:
      "A low-impact Nordic cabin where basalt, birch, dark water, and warm interior light define the stay.",
    intendedUses: ["property card", "remote escapes", "seasonal story"],
    aspectRatio: "4:3",
    focalPoint: "right center",
    palette: ["basalt black", "smoky blue", "lichen grey", "muted amber"],
  },
  {
    id: "sahra-fold-exterior",
    src: "/images/lumstay/properties/sahra-fold-saudi-arabia.png",
    title: "Sahra Fold",
    alt: "Fictional rammed-earth desert lodge following the edge of weathered sandstone cliffs at sunset",
    kind: "property",
    origin: "generated",
    location: "Northwest Saudi Arabia",
    description:
      "A sequence of shaded earthen pavilions designed to recede into an elemental sandstone valley.",
    intendedUses: ["property card", "design stays", "desert collection"],
    aspectRatio: "4:3",
    focalPoint: "right center",
    palette: ["sandstone", "clay", "tobacco", "muted amber"],
  },
  {
    id: "kiyo-machiya-room",
    src: "/images/lumstay/rooms/kiyo-machiya-kyoto.png",
    title: "Garden Machiya Room",
    alt: "Fictional Kyoto machiya bedroom with a low linen bed opening onto a moss courtyard",
    kind: "room",
    origin: "generated",
    location: "Kyoto, Japan",
    description:
      "A hushed room of smoked oak, rice paper, softened linen, and a rain-bright courtyard.",
    intendedUses: ["room selection", "property gallery", "room detail"],
    aspectRatio: "4:3",
    focalPoint: "center",
    palette: ["rice paper", "smoked oak", "moss", "charcoal"],
  },
  {
    id: "nila-haveli-room",
    src: "/images/lumstay/rooms/nila-haveli-jaipur.png",
    title: "Indigo Courtyard Suite",
    alt: "Fictional Jaipur haveli suite with an indigo-dressed teak bed and a frangipani courtyard",
    kind: "room",
    origin: "generated",
    location: "Jaipur, India",
    description:
      "A restrained heritage suite combining limewash, teak, faded indigo, cane, and filtered courtyard light.",
    intendedUses: ["room selection", "property gallery", "heritage collection"],
    aspectRatio: "4:3",
    focalPoint: "center",
    palette: ["warm limewash", "faded indigo", "aged teak", "muted brass"],
  },
  {
    id: "vela-alpine-bath",
    src: "/images/lumstay/wellness/vela-alpine-bath.png",
    title: "Vela Alpine Bath",
    alt: "Fictional stone thermal pool overlooking a misty snow-covered fir forest",
    kind: "wellness",
    origin: "generated",
    location: "Graubünden, Switzerland",
    description:
      "A monolithic mineral bath balancing slate shadow, soft steam, and pale winter daylight.",
    intendedUses: ["facility tile", "wellness story", "property gallery"],
    aspectRatio: "4:3",
    focalPoint: "right center",
    palette: ["slate grey", "mineral green", "fog white", "smoked oak"],
  },
  {
    id: "nila-haveli-courtyard-dining",
    src: "/images/lumstay/dining/nila-haveli-courtyard-table.png",
    title: "The Courtyard Table",
    alt: "Fictional candlelit hotel courtyard with linen-dressed tables beneath an old frangipani tree",
    kind: "dining",
    origin: "generated",
    location: "Jaipur, India",
    description:
      "An early-evening dining courtyard made intimate by old stone, cane chairs, and low pools of brass light.",
    intendedUses: ["facility tile", "dining story", "property gallery"],
    aspectRatio: "4:3",
    focalPoint: "center",
    palette: ["warm stone", "chalk linen", "dark teak", "muted brass"],
  },
  {
    id: "kyoto-street-dusk",
    src: "/images/lumstay/destinations/kyoto-street-at-dusk.jpg",
    title: "Kyoto at Dusk",
    alt: "A narrow Kyoto street descending between traditional rooftops in warm evening light",
    kind: "destination",
    origin: "stock",
    location: "Kyoto, Japan",
    description:
      "A lived-in city view for destination guides, local-area stories, and portrait editorial layouts.",
    intendedUses: ["destination card", "local guide", "editorial story"],
    aspectRatio: "2:3",
    focalPoint: "center",
    palette: ["ink", "sun-warmed plaster", "blue tile", "soft amber"],
    source: {
      provider: "Unsplash",
      creator: "Leonardo Rubbiani",
      pageUrl:
        "https://unsplash.com/photos/a-street-view-of-a-japanese-town-at-dusk-jT9zHkPFw7Y",
      licenseUrl: unsplashLicenseUrl,
    },
  },
  {
    id: "country-breakfast-table",
    src: "/images/lumstay/experiences/country-breakfast-table.jpg",
    title: "A Slow Country Breakfast",
    alt: "A sunlit wooden breakfast table set with coffee, bread, preserves, and fresh flowers",
    kind: "experience",
    origin: "stock",
    description:
      "A warm, unhurried breakfast moment for amenity callouts and editorial stay details.",
    intendedUses: ["breakfast amenity", "editorial tile", "booking inclusion"],
    aspectRatio: "3:2",
    focalPoint: "center",
    palette: ["honey oak", "warm linen", "leaf green", "soft red"],
    source: {
      provider: "Unsplash",
      creator: "Caroline Badran",
      pageUrl:
        "https://unsplash.com/photos/breakfast-table-set-with-food-and-drinks-in-kitchen-0Kqa4cgqfYQ/",
      licenseUrl: unsplashLicenseUrl,
    },
  },
  {
    id: "tropical-infinity-pool",
    src: "/images/lumstay/experiences/tropical-infinity-pool.jpg",
    title: "Among the Palms",
    alt: "Travelers swimming in an infinity pool surrounded by tall tropical palms",
    kind: "experience",
    origin: "stock",
    description:
      "An analog-feeling pool scene for warm-weather collections and relaxed experience stories.",
    intendedUses: ["experience card", "summer collection", "facility story"],
    aspectRatio: "2:3",
    focalPoint: "lower center",
    palette: ["deep pool blue", "palm green", "film white", "earth brown"],
    source: {
      provider: "Unsplash",
      creator: "Merve Kalafat Yılmaz",
      pageUrl:
        "https://unsplash.com/photos/infinity-pool-surrounded-by-lush-tropical-palm-trees-Vm4jio0b4ek",
      licenseUrl: unsplashLicenseUrl,
    },
  },
  {
    id: "chef-plating-dinner",
    src: "/images/lumstay/experiences/chef-plating-dinner.jpg",
    title: "Dinner in the Making",
    alt: "Two chefs carefully plating a row of small dishes in a professional kitchen",
    kind: "experience",
    origin: "stock",
    description:
      "A close, process-led culinary photograph for chef stories and dining experiences.",
    intendedUses: ["culinary experience", "chef story", "dining feature"],
    aspectRatio: "2:3",
    focalPoint: "center",
    palette: ["chef white", "charcoal", "steel", "citrus gold"],
    source: {
      provider: "Unsplash",
      creator: "Madeline Liu",
      pageUrl:
        "https://unsplash.com/photos/chef-plating-food-in-a-professional-kitchen-bXOHW6fKdPI",
      licenseUrl: unsplashLicenseUrl,
    },
  },
  {
    id: "japanese-market-moment",
    src: "/images/lumstay/experiences/japanese-market-moment.jpg",
    title: "Market Hour",
    alt: "A traveler moving through a layered Japanese street market in black and white",
    kind: "experience",
    origin: "stock",
    description:
      "A candid monochrome market moment for local guides and experience-led editorial sections.",
    intendedUses: ["local guide", "experience card", "editorial story"],
    aspectRatio: "2:3",
    focalPoint: "center",
    palette: ["ink", "soft grey", "paper white"],
    source: {
      provider: "Unsplash",
      creator: "Haewon Oh",
      pageUrl:
        "https://unsplash.com/photos/woman-walking-through-a-busy-street-market-S2Fl6B_wE9U",
      licenseUrl: unsplashLicenseUrl,
    },
  },
] as const satisfies readonly LumaStayMediaAsset[];

export const generatedMedia = lumstayMedia.filter(
  (asset) => asset.origin === "generated",
);

export const stockMedia = lumstayMedia.filter(
  (asset) => asset.origin === "stock",
);

export function getMediaById(id: string): LumaStayMediaAsset | undefined {
  return lumstayMedia.find((asset) => asset.id === id);
}
