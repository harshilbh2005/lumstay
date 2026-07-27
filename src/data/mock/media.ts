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
  provider: "Pexels" | "Unsplash";
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
const pexelsLicenseUrl = "https://www.pexels.com/license/";

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
    id: "casa-serein-lemon-terrace",
    src: "/images/lumstay/properties/casa-serein-lemon-terrace.jpg",
    title: "Lemon Terrace",
    alt: "Sun loungers and striped umbrellas tucked beneath mature lemon trees on a stone terrace",
    kind: "property",
    origin: "stock",
    location: "Sicily, Italy",
    description:
      "A shaded citrus terrace used illustratively to extend Casa Serein's quiet Mediterranean atmosphere.",
    intendedUses: ["property gallery", "pool story", "coastal collection"],
    aspectRatio: "2:3",
    focalPoint: "center 58%",
    palette: ["lemon yellow", "olive leaf", "chalk linen", "warm stone"],
    source: {
      provider: "Unsplash",
      creator: "Sara Abilova",
      pageUrl:
        "https://unsplash.com/photos/sun-loungers-umbrellas-and-lemon-trees-z32wCbOO15M",
      licenseUrl: unsplashLicenseUrl,
    },
  },
  {
    id: "casa-serein-sea-room",
    src: "/images/lumstay/properties/casa-serein-sea-room.jpg",
    title: "Sea-Room Threshold",
    alt: "Sunlit tiled sitting room opening through wide doors to a blue Mediterranean sea view",
    kind: "room",
    origin: "stock",
    location: "Italy",
    description:
      "An airy Italian interior used illustratively for Casa Serein's sea-facing rooms.",
    intendedUses: ["property gallery", "room story", "coastal collection"],
    aspectRatio: "2:3",
    focalPoint: "center 45%",
    palette: ["chalk white", "sea blue", "sun gold", "terracotta"],
    source: {
      provider: "Pexels",
      creator: "Magda Ehlers",
      pageUrl:
        "https://www.pexels.com/photo/sunlit-italian-villa-interior-with-sea-view-35438897/",
      licenseUrl: pexelsLicenseUrl,
    },
  },
  {
    id: "casa-serein-garden-room",
    src: "/images/lumstay/rooms/casa-serein-garden-room-detail.jpg",
    title: "Garden Room",
    alt: "Airy plaster-walled bedroom with a low dark-framed bed, woven chair, and warm neutral linens",
    kind: "room",
    origin: "stock",
    location: "Italy",
    description:
      "A quiet, textural bedroom used illustratively for Casa Serein's entry room category.",
    intendedUses: ["room selection", "room gallery", "garden room"],
    aspectRatio: "3:2",
    focalPoint: "center",
    palette: ["warm plaster", "chalk linen", "honey cane", "soft ochre"],
    source: {
      provider: "Unsplash",
      creator: "Francesco Ungaro",
      pageUrl:
        "https://unsplash.com/photos/cozy-bedroom-with-simple-decor-and-comfortable-bed-FPhETDe9mL4",
      licenseUrl: unsplashLicenseUrl,
    },
  },
  {
    id: "casa-serein-garden-room-detail",
    src: "/images/lumstay/rooms/casa-serein-garden-room.jpg",
    title: "Garden Room Sitting Corner",
    alt: "Warm upholstered sitting corner with sculptural wall lamps beside softly filtered daylight",
    kind: "room",
    origin: "stock",
    location: "Florence, Italy",
    description:
      "A close interior detail used to extend the garden room's quiet, neutral material palette.",
    intendedUses: ["room gallery", "garden room", "interior detail"],
    aspectRatio: "3:2",
    focalPoint: "center",
    palette: ["espresso brown", "cream linen", "warm white", "polished chrome"],
    source: {
      provider: "Unsplash",
      creator: "Erin Brundage",
      pageUrl:
        "https://unsplash.com/photos/a-bed-room-with-a-neatly-made-bed-next-to-a-window-w8mrCVlTPhw",
      licenseUrl: unsplashLicenseUrl,
    },
  },
  {
    id: "casa-serein-sea-terrace-balcony",
    src: "/images/lumstay/rooms/casa-serein-sea-terrace-balcony.jpg",
    title: "Sea Terrace Balcony",
    alt: "Shadowed bedroom opening through glass doors to a private balcony and calm open sea",
    kind: "room",
    origin: "stock",
    location: "Himarë, Albania",
    description:
      "A sea-facing bedroom threshold used illustratively for Casa Serein's terrace room.",
    intendedUses: ["room selection", "room gallery", "sea terrace room"],
    aspectRatio: "2:3",
    focalPoint: "center 58%",
    palette: ["ink shadow", "rattan", "sea blue", "chalk white"],
    source: {
      provider: "Unsplash",
      creator: "Arthur Charles Pratt",
      pageUrl:
        "https://unsplash.com/photos/ocean-view-from-a-bedroom-with-a-balcony-YR9CSC9K9Wc",
      licenseUrl: unsplashLicenseUrl,
    },
  },
  {
    id: "casa-serein-suite-bedroom",
    src: "/images/lumstay/rooms/casa-serein-suite-bedroom.jpg",
    title: "Serein Suite Bedroom",
    alt: "Quiet hotel bedroom with white linens, an indigo woven cover, and daylight filtered through sheer curtains",
    kind: "room",
    origin: "stock",
    description:
      "A restrained bedroom study used illustratively for Casa Serein's largest suite.",
    intendedUses: ["room selection", "room gallery", "suite"],
    aspectRatio: "3:2",
    focalPoint: "center",
    palette: ["indigo", "paper white", "smoked oak", "warm brass"],
    source: {
      provider: "Unsplash",
      creator: "Wes Hicks",
      pageUrl:
        "https://unsplash.com/photos/a-hotel-room-with-a-bed-chair-and-window-T6WRDVQBn8M",
      licenseUrl: unsplashLicenseUrl,
    },
  },
  {
    id: "casa-serein-suite-twin-room",
    src: "/images/lumstay/rooms/casa-serein-twin-sea-room.jpg",
    title: "Serein Suite Twin Setting",
    alt: "Bright twin bedroom with pale blue walls, warm timber joinery, and a small sea-view balcony",
    kind: "room",
    origin: "stock",
    description:
      "A flexible twin configuration used illustratively for the Serein Suite's alternate bed setup.",
    intendedUses: ["room gallery", "suite", "twin configuration"],
    aspectRatio: "3:2",
    focalPoint: "center",
    palette: ["mineral blue", "pine", "cloud white", "soft grey"],
    source: {
      provider: "Unsplash",
      creator: "Sang Ho",
      pageUrl:
        "https://unsplash.com/photos/twin-beds-in-a-bright-room-with-a-sea-view-uXYHodDhiG4",
      licenseUrl: unsplashLicenseUrl,
    },
  },
  {
    id: "casa-serein-positano-terrace",
    src: "/images/lumstay/properties/casa-serein-positano-terrace.jpg",
    title: "Terrace Above the Sea",
    alt: "A vine-shaded terrace table overlooking the sea and hillside buildings of Positano",
    kind: "property",
    origin: "stock",
    location: "Positano, Italy",
    description:
      "A lived-in Amalfi terrace used illustratively for Casa Serein's outdoor dining rhythm.",
    intendedUses: ["property gallery", "dining story", "coastal collection"],
    aspectRatio: "2:3",
    focalPoint: "center 52%",
    palette: ["vine green", "sea blue", "sun-warmed stone", "timber"],
    source: {
      provider: "Pexels",
      creator: "Meghan Marron",
      pageUrl:
        "https://www.pexels.com/photo/terrace-on-sea-coast-13418034/",
      licenseUrl: pexelsLicenseUrl,
    },
  },
  {
    id: "casa-serein-pool-at-dusk",
    src: "/images/lumstay/properties/casa-serein-pool-at-dusk.jpg",
    title: "Pool at Dusk",
    alt: "A long blue pool beside a pale Mediterranean villa under a peach-colored evening sky",
    kind: "property",
    origin: "stock",
    description:
      "A restrained evening pool scene used illustratively for Casa Serein's slower hours.",
    intendedUses: ["property gallery", "pool story", "coastal collection"],
    aspectRatio: "2:3",
    focalPoint: "center 66%",
    palette: ["dusk peach", "pool blue", "chalk white", "olive"],
    source: {
      provider: "Pexels",
      creator: "Berat Yüksel",
      pageUrl:
        "https://www.pexels.com/photo/elegant-mediterranean-villa-by-the-sea-at-sunset-31751025/",
      licenseUrl: pexelsLicenseUrl,
    },
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
  {
    id: "azalai-house-pool",
    src: "/images/lumstay/properties/sahra-pool-morocco.jpg",
    title: "Azalai House Pool",
    alt: "Red earthen hotel beside a still blue pool with an olive tree and shaded loungers",
    kind: "property",
    origin: "stock",
    location: "Sahara Desert, Morocco",
    description:
      "A sun-softened pool court for a warm, restrained desert-stay portrait.",
    intendedUses: ["property card", "desert collection", "pool story"],
    aspectRatio: "2:3",
    focalPoint: "center 58%",
    palette: ["earth red", "olive", "pool blue", "cloud grey"],
    source: {
      provider: "Unsplash",
      creator: "Alexander Psiuk",
      pageUrl:
        "https://unsplash.com/photos/poolside-serenity-with-vibrant-architecture-and-blue-skies-iPEWymTTUDw",
      licenseUrl: unsplashLicenseUrl,
    },
  },
  {
    id: "shiro-line-facade",
    src: "/images/lumstay/properties/tokyo-minimal-hotel.jpg",
    title: "Shiro Line Facade",
    alt: "Monochrome Tokyo building facade composed of vertical screens and deep shadow",
    kind: "property",
    origin: "stock",
    location: "Tokyo, Japan",
    description:
      "A tightly framed architectural study for a graphic, design-led city stay.",
    intendedUses: ["property card", "design stays", "city collection"],
    aspectRatio: "2:3",
    focalPoint: "center",
    palette: ["paper white", "graphite", "soft grey", "ink"],
    source: {
      provider: "Unsplash",
      creator: "Sebastian Schuster",
      pageUrl:
        "https://unsplash.com/photos/modern-building-facade-with-vertical-lines-KmL6FeLXrfs",
      licenseUrl: unsplashLicenseUrl,
    },
  },
  {
    id: "dar-afnar-courtyard",
    src: "/images/lumstay/properties/moroccan-riad-courtyard.jpg",
    title: "Dar Afnar Courtyard",
    alt: "Earthen Moroccan courtyard glowing with low lanterns beneath a deep blue evening sky",
    kind: "property",
    origin: "stock",
    location: "Tajante, Morocco",
    description:
      "A blue-hour courtyard view balancing carved earth walls, garden shadow, and pools of warm light.",
    intendedUses: ["property card", "heritage collection", "courtyard story"],
    aspectRatio: "2:3",
    focalPoint: "center 48%",
    palette: ["night blue", "earthen brown", "lantern gold", "palm green"],
    source: {
      provider: "Unsplash",
      creator: "Bernd Dittrich",
      pageUrl:
        "https://unsplash.com/photos/courtyard-of-a-moroccan-riad-at-dusk-with-lanterns-yzm55q5pA_A",
      licenseUrl: unsplashLicenseUrl,
    },
  },
  {
    id: "punakha-field-house-cabins",
    src: "/images/lumstay/properties/bhutan-forest-lodge.jpg",
    title: "Punakha Field House Cabins",
    alt: "A row of timber cabins following a stone path through dense Bhutanese forest",
    kind: "property",
    origin: "stock",
    location: "Punakha, Bhutan",
    description:
      "Low forest cabins held in warm timber, shifting shade, and deep green foliage.",
    intendedUses: ["property card", "remote escapes", "wellness collection"],
    aspectRatio: "3:2",
    focalPoint: "center",
    palette: ["forest green", "cedar", "warm stone", "leaf shadow"],
    source: {
      provider: "Unsplash",
      creator: "Pema Gyamtsho",
      pageUrl:
        "https://unsplash.com/photos/wooden-cabins-nestled-among-trees-in-a-forest-9i6mVlOAnBM",
      licenseUrl: unsplashLicenseUrl,
    },
  },
  {
    id: "ninh-lake-lodge-aerial",
    src: "/images/lumstay/properties/vietnam-lake-retreat.jpg",
    title: "Ninh Lake Lodge",
    alt: "Thatched resort pavilions curving around a green lake beneath misty limestone mountains",
    kind: "property",
    origin: "stock",
    location: "Vietnam",
    description:
      "A wide landscape view of organic roofs, reflective water, and rain-soft mountain green.",
    intendedUses: ["property card", "nature stays", "wellness collection"],
    aspectRatio: "3:2",
    focalPoint: "center",
    palette: ["lake green", "thatch", "mist grey", "deep foliage"],
    source: {
      provider: "Unsplash",
      creator: "Alex Safareli",
      pageUrl:
        "https://unsplash.com/photos/resort-buildings-nestled-beside-a-tranquil-lake-and-mountains-2Cq7FeXlFAQ",
      licenseUrl: unsplashLicenseUrl,
    },
  },
  {
    id: "sukawana-cabin-hillside",
    src: "/images/lumstay/properties/indonesia-hillside-cabin.jpg",
    title: "Sukawana Cabin",
    alt: "Minimal timber-and-glass cabin lifted above a lush green hillside beneath an overcast sky",
    kind: "property",
    origin: "stock",
    location: "West Java, Indonesia",
    description:
      "A compact hillside cabin framed by tea-country green and generous pale sky.",
    intendedUses: ["property card", "cabin collection", "remote escapes"],
    aspectRatio: "2:3",
    focalPoint: "center 62%",
    palette: ["tea green", "dark timber", "mist blue", "charcoal"],
    source: {
      provider: "Unsplash",
      creator: "Stanley Kustamin",
      pageUrl:
        "https://unsplash.com/photos/modern-cabin-nestled-on-a-green-hillside-gJ_Y_r7GTEc",
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
