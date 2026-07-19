# LumaStay image library

This library uses custom fictional-property photography for the brand-defining moments and curated Unsplash photography for supporting human, food, and destination moments. Components should consume the metadata in `src/data/mock/media.ts` rather than repeating paths or alt text.

## Visual language

- Natural architectural and editorial photography, never glossy resort stock.
- Restrained color, real materials, soft available light, and subtle grain.
- Custom images establish each fictional property; stock images add lived-in human texture.
- Crops must preserve the `focalPoint` recorded in the media catalog.

## Generated prompt set

All generated scenes are fictional and contain no logos, signage, or recognizable real properties.

1. **Aster House, Udaipur** — A pale sandstone and lime-plaster lakeside heritage-modern hotel at first light. Wide hero composition with the architecture on the right and quiet water/sky on the left for interface copy. Deep teal, warm limestone, forest green, and muted brass.
2. **Casa Serein, Ravello** — An intimate limewashed cliffside hotel among lemon terraces, with a narrow mineral pool and hazy Mediterranean headlands. Weathered stone and soft late-morning light.
3. **Stillwater Cabin, South Iceland** — A low charred-timber and basalt cabin beside a dark glacial lake after rain, warm inside and cool outside, with a small protected soaking pool.
4. **Sahra Fold, northwest Saudi Arabia** — Rammed-earth guest pavilions following an ochre sandstone valley, screened with woven palm and joined by a narrow still-water court at sunset.
5. **Kiyo Machiya, Kyoto** — A restored machiya bedroom with a low linen bed, smoked oak joinery, shoji screens, and a rain-bright moss courtyard.
6. **Nila Haveli, Jaipur** — A restrained heritage suite of warm limewash, aged teak, faded indigo textiles, cane, and a frangipani courtyard in filtered afternoon light.
7. **Vela Alpine Bath, Graubünden** — A monolithic stone mineral pool overlooking misty firs and a snow ridge at winter dawn, with slate shadow and minimal warm floor light.
8. **The Courtyard Table, Jaipur** — An old lime-plaster courtyard beneath a frangipani canopy, prepared for quiet early-evening dining with linen tables, cane chairs, and low brass lamps.

Shared constraints: photorealistic natural photography; original plausible architecture; no people, text, logos, watermarks, vehicles, branded objects, visual clichés, oversaturation, HDR halos, fisheye distortion, or CGI smoothness.

## Stock sources

All stock files are stored locally at 2400 px on their longest constrained dimension and are free to use under the [Unsplash License](https://unsplash.com/license).

| Local asset | Photographer | Source |
| --- | --- | --- |
| `destinations/kyoto-street-at-dusk.jpg` | Leonardo Rubbiani | [Unsplash photo](https://unsplash.com/photos/a-street-view-of-a-japanese-town-at-dusk-jT9zHkPFw7Y) |
| `experiences/country-breakfast-table.jpg` | Caroline Badran | [Unsplash photo](https://unsplash.com/photos/breakfast-table-set-with-food-and-drinks-in-kitchen-0Kqa4cgqfYQ/) |
| `experiences/tropical-infinity-pool.jpg` | Merve Kalafat Yılmaz | [Unsplash photo](https://unsplash.com/photos/infinity-pool-surrounded-by-lush-tropical-palm-trees-Vm4jio0b4ek) |
| `experiences/chef-plating-dinner.jpg` | Madeline Liu | [Unsplash photo](https://unsplash.com/photos/chef-plating-food-in-a-professional-kitchen-bXOHW6fKdPI) |
| `experiences/japanese-market-moment.jpg` | Haewon Oh | [Unsplash photo](https://unsplash.com/photos/woman-walking-through-a-busy-street-market-S2Fl6B_wE9U) |
