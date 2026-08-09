# LumaStay Project Handoff

Last updated: 9 August 2026

Repository: `/Users/harshilbrahmani/Developer/Personal/lumstay`

Branch: `main`

## Read this first

LumaStay is a premium, frontend-only hotel discovery and booking application. It uses local mock data and simulated interactions. Do not add a backend, authentication service, real availability provider, or real payment integration unless the user explicitly changes the scope.

The user wants the product built **one component, feature, or page at a time**. Before designing each unit, research relevant references in Refero, establish a clear reference lock, implement the unit, verify it at desktop and mobile sizes, and commit it separately. Do not rush through several roadmap items in one change.

Before editing code:

1. Read `AGENTS.md` and the relevant guides in `node_modules/next/dist/docs/`. This project uses Next.js 16.2 and its APIs may differ from remembered Next.js behavior.
2. Read this handoff, `README.md`, `src/styles/tokens.css`, and `src/app/globals.css`.
3. Run `git status --short` and preserve any user-owned changes.
4. Inspect the existing component immediately before and after the planned insertion point.

## Product scope

The intended frontend experience includes:

- Premium landing page
- Destination search
- Property listings
- Price and facility filters
- Property details
- Image gallery
- Room selection
- Booking flow
- Checkout form
- Saved properties
- User booking history
- Responsive mobile experience
- Form validation
- Loading, empty, error, and retry states

All content, availability, bookings, payment responses, and user state are mocked locally.

## Technology currently installed

- Next.js `16.2.10`, App Router, React Server Components by default
- React `19.2.4` and TypeScript 5
- Tailwind CSS v4 with semantic CSS tokens
- shadcn/ui `4.13.1` using Base UI primitives
- Motion `12.42.2`, with global reduced-motion support
- Phosphor Icons; use the SSR import in Server Components and the standard import in Client Components
- React Hook Form and Zod for validated booking forms
- Zustand for upcoming cross-route booking and saved-state persistence
- date-fns and React DayPicker for dates
- Embla Carousel for upcoming galleries/carousels where native scroll-snap is insufficient
- Sonner for notifications
- class-variance-authority, clsx, and tailwind-merge for component variants and class composition

Useful commands:

```bash
npm run dev
npm run lint
npm run typecheck
npm run check
npm run build
```

## Architecture rules

```text
src/
├── app/                 # Thin routes and route-level loading/error states
├── components/
│   ├── layout/          # Header and global navigation
│   ├── marketing/       # Landing-page-only sections
│   ├── providers/       # Global client providers
│   └── ui/              # Genuinely reusable accessible primitives
├── config/              # Site and navigation configuration
├── data/mock/           # Mock repositories, fixtures, and media metadata
├── features/            # Search, property, booking, saved, and trips logic/UI
├── hooks/               # Shared hooks
├── lib/                 # Framework-agnostic utilities
├── stores/              # Cross-route client stores only when justified
├── styles/              # Raw and semantic design tokens
└── types/               # Shared domain contracts
```

- Keep route files thin.
- Put feature-specific logic and UI under `src/features/<feature>`.
- Put landing-only editorial sections under `src/components/marketing`.
- Put only reusable primitives under `src/components/ui`.
- Prefer Server Components. Add `"use client"` only to the smallest interactive leaf.
- Prefer local state for isolated interactions. Use Zustand only when state must survive across components or routes.
- Do not import a third-party package without verifying it in `package.json`.
- Consume media through `src/data/mock/media.ts`; do not repeat image paths or alt text inside unrelated components.

## Established visual system

Primary files:

- `src/styles/tokens.css` — raw brand values and semantic roles
- `src/app/globals.css` — Tailwind mappings, brand utilities, motion/accessibility rules
- `src/app/layout.tsx` — Jost, Bodoni Moda, and Geist Mono font registration

Brand language:

- Deep forest and deep teal for grounding surfaces
- Warm linen and paper for light editorial sections
- Antique brass as the single restrained accent
- Jost for bold interface and marketing typography
- Bodoni Moda for editorial display roles where appropriate
- Geist Mono for numbers, labels, prices, and small metadata
- Sharp rectangular image frames
- Hairline rules and negative space instead of excessive cards
- Pill-shaped primary controls; small image radii only where already established
- Strong, bold headings with tight tracking; avoid thin, sharp-looking headline weights
- Natural photography, real materials, soft available light, and restrained color

Interaction and accessibility rules:

- Minimum 44px target; use 48px where practical for primary mobile actions
- Visible keyboard focus rings
- Semantic headings, lists, regions, labels, and `aria-pressed` where applicable
- Body copy should be at least 16px on mobile when it carries meaningful information
- Animate only `transform` and `opacity` for movement; color/border transitions are acceptable
- Keep micro-interactions around 150–300ms
- Respect `prefers-reduced-motion`; the global provider and CSS already do this
- No auto-playing galleries, scroll hijacking, layout-shifting hover effects, or perpetual decorative motion
- No emoji icons, neon glows, generic purple/blue gradients, or generic equal three-card benefit rows
- Avoid card containers when rules, typography, spacing, or surface changes can express hierarchy
- Verify that `document.documentElement.scrollWidth === document.documentElement.clientWidth` on mobile

## Design and research process

The user prefers Refero-informed design and strong frontend taste. The tools/skills actively used in this repository are:

- Refero MCP for style, screen, and flow research
- `ui-ux-pro-max`
- `design-taste-frontend`
- Playwright CLI skill for real-browser QA

The user has also asked for Emil Kowalski and Impeccable-style polish. If those skills are available in a future session, use them where relevant. Do not claim to use a skill that is unavailable.

For every new visual component, feature, or page:

1. Search Refero styles from 3–5 distinct angles:
   - one broad visual direction;
   - one hospitality/travel-specific direction;
   - one pattern-specific direction;
   - optionally one known premium brand direction.
2. Retrieve 3–4 strong full style references with `refero_get_style`.
3. Search Refero screens for the concrete UI pattern or page type.
4. Retrieve the strongest screen metadata and image when visual inspection helps.
5. Establish a **reference lock** before coding:
   - one primary reference and the traits to preserve;
   - one or two details borrowed from other references;
   - explicit rejections;
   - the exact LumaStay tokens and component roles that will be used.
6. Run the UI/UX Pro Max design-system search. Treat its output as guidance, not authority. Reject suggestions that conflict with the established LumaStay system. A recent generic blue/orange liquid-glass recommendation was deliberately rejected.
7. Apply the frontend taste rules: asymmetric composition, disciplined typography, strong mobile collapse, minimal cards, and isolated interactivity.
8. Implement one unit only.
9. Run code checks, production build, and visual QA.
10. Commit the isolated unit, then wait before beginning the next roadmap item.

Useful Refero references already used:

- Kobu — `2b86e8de-b21d-40d0-894a-f9d3a177a193`: linen gallery canvas, sharp hotel imagery, restrained UI
- BelArosa Chalet — `1396fd36-a1bc-4d2b-a59c-1111f17145dc`: deep teal, warm linen, brass/gold restraint
- Kinfolk — `a5a4f6ab-4955-452a-93bc-b9f4dd6dda2f`: editorial hierarchy, sharp photography, quiet controls
- Liron Moran Interiors — `067fe2b3-9411-42b9-9ea4-39338344f66d`: dark, sparse gallery composition
- Christopher Ireland Creative — `f293bacf-990b-4270-900d-90f3a565ca27`: warm editorial ledger, expansive spacing, thin rules
- Hyer Aviation — `0e897aac-37df-4b7d-948a-0aa8ec3d2b97`: precise high-contrast two-column service structure
- Walden was used as a restraint reference for naturalistic, image-led minimalism

Do not copy a reference wholesale. Translate its useful structure into LumaStay’s existing brand.

## Implementation and verification process

For each unit:

1. Confirm the working tree is clean or understand every existing change.
2. Read relevant installed Next.js documentation before coding.
3. Inspect existing tokens, primitives, dependencies, mock data, and neighboring components.
4. Implement with `apply_patch` and preserve unrelated user work.
5. Run:

   ```bash
   npm run check
   npm run build
   git diff --check
   ```

6. Use the Playwright CLI workflow, not a new Playwright test suite:
   - verify `npx` is available;
   - start or reuse the local Next server;
   - test at approximately `1440 × 1000` and `390 × 844`;
   - snapshot before using element references;
   - inspect important hover, focus, click, loading, error, and mobile states;
   - check the browser console for warnings/errors;
   - check horizontal overflow on mobile;
   - capture screenshots only under `output/playwright/`;
   - remove `.playwright-cli/` and temporary screenshots before committing.
7. Stage only intended files, run `git diff --cached --check`, review the staged stat, and create one descriptive commit.
8. Confirm `git status --short` is empty.

## Completed work

### Project foundation

- Next.js, React, TypeScript, and Tailwind v4 scaffold
- Semantic design tokens and Tailwind mappings
- Jost, Bodoni Moda, and Geist Mono font setup
- shadcn/Base UI primitives for buttons, inputs, popovers, sheets, dialogs, calendar, checkboxes, selects, sliders, tabs, accordion, skeletons, and separators
- Global Motion configuration with user reduced-motion preference
- Global Sonner notification provider
- Global metadata and responsive viewport configuration
- Global loading, error, and not-found route states
- Domain types for money, locations, property summaries, rooms, and bookings
- Feature folders for search, properties, booking, saved, and trips
- Store and hook scaffolds

### Curated media library

- Eight generated fictional hotel/property/room/wellness/dining images
- Five locally stored supporting Unsplash images
- Typed media catalog with alt text, focal points, palette, source, and intended uses
- Image-source documentation in `docs/image-library.md`
- Current property fixture contains Casa Serein, Stillwater Cabin, and Sahra Fold

### Responsive site header

- Sticky warm-paper header with refined LumaStay wordmark
- Desktop navigation for Stays, Destinations, The Luma Edit, Saved, and Trips
- INR currency label
- Full mobile navigation sheet with large touch targets and Saved/Trips shortcuts
- Visible hover and keyboard focus states

### Landing hero and destination search UI

- Full-height Aster House hero image with art-directed crop and readable veil
- Bold, minimally graded hero heading
- Integrated rounded search surface with no sharp seam behind the search action
- Destination input
- Date-range calendar popover
- Adult, child, and room counters
- Validation for missing destination and incomplete date range
- Pending navigation state and live status message
- URL-backed handoff to `/search` with destination, date, adult, child, and room values
- Responsive stacking and touch-friendly controls

Important limitation: destination suggestions are currently drawn from local mock data. The “recent” group is seeded editorially rather than learned from a guest’s history.

### The LumaStay Edit

- Asymmetric three-property editorial layout
- Large featured Casa Serein presentation and two supporting properties
- Rating, location, price, atmosphere, and curated badges
- Responsive mobile snap rail
- Save buttons with accessible pressed state

### Saved-stay feedback

- Refined favorite hover/pressed styling that does not wash out to white
- Animated top-center branded confirmation toast
- Added/removed states and a “View saved” action
- Motion respects the global reduced-motion configuration

Important limitation: saved state currently lives inside each `SaveStayButton` with `useState`. It is not persistent, is not shared across cards/routes, and `/saved` is not implemented.

### Beyond the Room experience gallery

- Four stories: alpine wellness, courtyard dining, Kyoto walks, and warm-weather stays
- Desktop editorial selector with click, hover, keyboard focus, and `aria-pressed`
- Crossfading active image and caption using transform/opacity motion
- Mobile swipe rail with intentional next-card preview
- Images pulled from the typed media catalog with focal-point cropping

Important limitation: collection links reach `/search?...`, but the results page does not apply collection filtering yet.

### The Luma Promise

- Static, server-rendered booking-confidence section
- Asymmetric editorial ledger instead of generic benefit cards
- Four promises: curated selection, transparent pricing, honest room detail, and human support
- “How the edit works” and “Ask Luma” actions
- Responsive mobile layout with no horizontal overflow

Important limitation: `/about/curation` and `/support` are not implemented.

### Homepage closing search CTA

- Light, typography-led closing prompt that is deliberately distinct from the image-led hero
- Single action returns to and focuses the existing hero destination field
- Reduced-motion-aware smooth scrolling
- No duplicated booking form or decorative photography

### Premium global footer

- Deep-forest global footer with a featured-destination rail
- Company, support, account, legal, market, and currency navigation
- Large LumaStay identity block with restrained editorial typography
- Server-rendered layout with accessible navigation landmarks, focus states, and mobile targets
- Prefetch disabled for planned routes so the footer does not generate avoidable 404 prefetch errors

Important limitation: footer destination, company, support, account, and legal routes are planned but mostly not implemented yet.

### Destination discovery page

- Editorial destination index at `/destinations` with seven locally mocked places
- Compact introduction, in-page destination ledger, contained Kyoto lead story, and asymmetric image atlas
- Server-rendered feature with no client state or animation dependency
- Destination imagery and alt text resolve through the central media catalog
- Search links preserve the intended destination query and disable prefetch until `/search` exists
- Verified at 1440×1000 and 390×844 with no horizontal overflow, decoded images, visible focus, hover feedback, and sticky-header-safe anchor offsets

Important limitation: destination links populate the `/search` summary, but the mock result ledger is not destination-filtered yet.

### Editorial Luma Edit page

- Publication-style editorial route at `/edit` with a masthead, issue metadata, and department index
- Seven locally mocked stories across places, rooms, tables, and rituals
- Monochrome Kyoto opening essay, full-width room feature, compact field-note ledger, and editor’s letter
- Server-rendered feature with no client state, carousel, or animation dependency
- All story imagery and alt text resolve through the central media catalog
- Story context links point only to the implemented destination atlas instead of creating broken article routes
- Verified at 1440×1000 and 390×844 with decoded images, no horizontal overflow, visible keyboard focus, hover feedback, 44px links, and sticky-header-safe anchors

### Initial search results page

- Request-time rendered search foundation at `/search`
- Compact search context for destination, dates, and guests with a return link to the homepage search
- Six-property editorial result ledger with image, location, rating, review count, atmosphere, facilities, price, and saved action
- Desktop filter-rail space is established through a restrained “Luma order” sidebar without implementing filters early
- Result imagery and alt text resolve through the central media catalog
- Property summary media now uses catalog IDs instead of repeating image paths
- Homepage curation remains intentionally limited to the original first three properties
- The first result uses a more generous desktop composition while ranks 02–06 tighten into comparison-friendly editorial rows
- One semantic card structure adapts below the tablet breakpoint into a sharp 16:10 image stack, two-column fact ledger, and compact price/action row
- Responsive image sizing preserves catalog focal points, and only saved-state feedback remains client-side
- Verified at 1440×1000 and 390×844 with all six images decoded, no horizontal overflow, visible brass keyboard focus, hover feedback, working saved-state feedback, and 44px controls

Important limitation: the destination and dates still describe search intent rather than filtering availability or geography. Empty, error, and retry states remain separate roadmap items. Result links point to the planned `/properties/[slug]` route, which is not implemented yet.

### Search result filters

- Refero-informed faceted filtering for nightly price, guest rating, property type, facilities, and atmosphere
- Restrained desktop rail uses the existing paper, linen, forest, brass, hairline, and mono-metadata language without introducing cards, shadows, pills, or a second search hero
- Typed local taxonomies extend the property fixture only far enough to exercise the filter combinations
- Server-side parsing ignores invalid URL values, filters the fixture before rendering cards, and preserves the original Luma editorial order
- A progressively enhanced Next.js `Form` writes shareable GET parameters while retaining destination, dates, guests, and rooms
- Multi-select facilities require every selected facility; atmosphere and property-type choices match any selected option within their group
- Mobile reuses the same semantic form inside a dedicated filter sheet
- Selected controls remount from server URL state after client navigation so Apply and Clear all remain visually accurate
- Verified at 1440×1000 and 390×844 with combined filters, mobile apply/reopen/reset flow, preserved search intent, 44px or larger targets, zero horizontal overflow, and a clean browser console

Important limitation: filtering operates only against the six local editorial fixtures and their mock taxonomy. It does not represent real availability, destination matching, live pricing, or a complete hotel facility model.

### Search sorting and applied filters

- Refero-informed results toolbar places the matching-stay count, native sort control, and applied filters in one quiet ledger above the property list
- Four URL-backed orders: the default Luma edit, price low to high, price high to low, and guest rating
- Server-side sorting preserves the filtered property set and uses review count only as a deterministic rating tie-breaker
- Individually removable applied-filter controls use canonical URLs that preserve destination, dates, guests, rooms, remaining filters, and the selected order
- Clear filters removes all active facets while retaining the chosen order and original search intent
- Filter submissions now preserve sorting, while sort submissions preserve all valid active filters
- Invalid sort values safely fall back to the Luma edit and are omitted from subsequent canonical filter links
- The native select progressively enhances through a GET form; a tiny client leaf submits on change, with a no-JavaScript submit fallback
- Result-card rank metadata switches from Luma language to “Price order” or “Rating order” when the editorial sequence is not active
- Verified at 1440×1000 and 390×844 with chip removal, clear-all, cross-form state preservation, exact price/rating sequences, visible keyboard focus, 44px targets, zero horizontal overflow, and a clean browser console

Important limitation: the sort options operate only on each property’s local starting price, aggregate guest rating, and editorial fixture order. They do not account for date-specific availability, total-stay price, taxes, personalization, or commission.

### Mobile search and filter sheets

- Refero-informed, near-full-height mobile sheets replace the temporary inline filter disclosure without repeating the homepage hero
- The search sheet edits destination, check-in, check-out, adults, children, and rooms while preserving valid active filters and sorting
- Date-order validation keeps an invalid draft open and presents an accessible inline error before navigation
- The filter sheet reuses the existing semantic URL-backed server form and local taxonomy rather than introducing parallel mobile state
- Both sheets use a quiet paper-and-linen editorial surface, sharp hairline divisions, scrollable bodies, and pinned action footers aligned with the established forest and brass token roles
- Base UI supplies modal focus containment, Escape dismissal, background scroll lock, and focus return to each trigger
- Search Cancel and filter Reset/Apply behavior are explicit; applying or resetting closes the sheet while preserving the remaining canonical search state
- Desktop retains the existing homepage search link and full filter rail
- Verified at 1440×1000 and 390×844 with search edits, invalid date handling, combined filters, reset/apply, filter and sort preservation, focus return, Escape dismissal, body scroll lock, 44px controls, zero horizontal overflow, and a clean browser console

Important limitation: the mobile destination field intentionally remains a focused text input rather than duplicating the homepage autocomplete. Search intent still does not geofilter the local result set, and native date inputs remain platform-rendered.

### Search loading skeletons

- Route-level `/search/loading.tsx` streams a lightweight Server Component fallback while request-dependent results resolve
- A search-specific layout keeps the global header and footer stable and interactive around the loading boundary
- The invariant editorial introduction is shared between loaded and loading states so its hierarchy and spacing cannot drift
- Request-dependent search context, mobile filter trigger, desktop filter rail, results toolbar, and six property rows use content-shaped placeholders that preserve the established listing geometry
- The featured desktop row measures 608px in both states; the featured mobile row is 640px while loading and 659px when loaded
- Warm muted placeholders, paper and linen surfaces, sharp edges, and forest hairlines follow the LumaStay token system without introducing generic gray cards, spinners, blurred overlays, or a second search surface
- Motion is limited to the existing opacity pulse and is neutralized by the global reduced-motion rule
- The loading section exposes `aria-busy`, announces “Loading search results” through a live status, and hides decorative placeholder geometry from assistive technology
- Verified at 1440×1000 and 390×844 with the real streamed fallback, stable shell, matching first-row geometry, zero horizontal overflow, successful loaded-state replacement, and a clean browser console

Important limitation: the local editorial fixture resolves almost immediately, so the loading state is intentionally brief under normal local conditions. It is structured for future asynchronous result data without adding artificial production delays.

### Search empty, no-results, error, and retry states

- Refero-informed recovery states stay inside the established search context and result ledger instead of replacing the page with a generic centered card
- Valid filters that eliminate the twelve-property fixture now produce a dedicated no-results state while retaining the active filter rail, applied chips, sort order, destination, dates, guests, and rooms
- No-results recovery clears only the active filters and preserves the chosen order and original search intent
- Explicit mock repository outcomes expose reviewable collection-empty and recoverable-error states through `_demo=empty` and `_demo=error`
- Empty and error states replace the unusable filter controls with a plain collection-status rail and preserve valid search, filter, and sort parameters when retrying
- A route-level `/search/error.tsx` boundary handles unexpected render failures with the Next.js 16 `unstable_retry` recovery callback
- State messaging uses status or alert semantics, 44px-or-larger recovery controls, visible keyboard focus, sharp hairline geometry, and the existing paper, linen, forest, brass, and destructive token roles
- Verified at 1440×1000 and 390×844 across success, no-results, empty, recoverable-error, and injected unexpected-error paths with clean expected-state consoles, zero horizontal overflow, canonical recovery URLs, and successful retry behavior

Important limitation: empty and recoverable-error outcomes are deterministic presentation fixtures rather than real data-provider failures. The twelve-property collection still loads synchronously from local mock data.

### Expanded property fixtures and incremental results

- The editorial property collection now includes 12 typed summaries, enough to exercise every existing property-type, facility, atmosphere, price, and rating filter with meaningful result-count changes
- The six added listings use six locally stored Unsplash photographs; photographer, source page, license, alt text, focal point, and palette metadata live in `src/data/mock/media.ts` and `docs/image-library.md`
- No image was generated for this expansion; the two initial source candidates with visible real-hotel branding were rejected before entering the catalog
- Search results reveal six stays initially and six more through a Server Component link backed by the canonical `show=12` URL parameter
- The control reports `06 of 12 stays shown`, preserves the current search intent, active filters, and sort order, and uses `scroll={false}` so the viewport stays anchored during the transition
- Filter, sort, and search changes intentionally omit `show`, returning the user to the first six results for the new result set
- Result sets of six or fewer show their full count and completion message without rendering a non-functional load-more action
- Verified at 1440×1000 and 390×844: 6 → 12 results, loaded local images, zero-pixel scroll movement, canonical URL persistence, three-result heritage filtering, completion state, and a clean browser console

Important limitation: this is incremental reveal over a synchronous local collection, not cursor pagination or an API-backed infinite list. The six new listings are fictional editorial fixtures illustrated with licensed stock photographs; the source photographs are not representations of bookable LumaStay inventory.

### Property details route shell

- Static dynamic route at `/properties/[slug]`, currently generated for `/properties/casa-serein`
- One representative `PropertyDetail` fixture composes the existing Casa Serein summary with editorial copy and catalog media IDs instead of duplicating summary data or image paths
- Thin route handles async Next.js 16 params, static param generation, route metadata, and unknown-slug `notFound()` behavior
- Restrained editorial shell uses a folio-led masthead, one decisive existing architectural image, a caption ledger, and a Luma note
- Existing property links disable speculative prefetch so listings without full fixtures continue to reach the branded 404 only when deliberately opened
- Header Saved and Trips links also disable prefetch, preventing avoidable desktop console 404s while those routes remain planned
- No new image was generated or downloaded for this unit; the existing Casa Serein catalog asset is reused
- Verified from the production build at 1440×1000 and 390×844 with decoded imagery, exact metadata, visible keyboard focus, 44px navigation, zero horizontal overflow, clean consoles, and a branded unknown-slug 404 carrying `noindex`

Important limitation: Casa Serein is the only full property-detail fixture. The shell intentionally omits facilities, rooms, and booking actions so those roadmap items can be researched, verified, and committed separately.

### Property hero summary

- Casa Serein’s existing editorial masthead now includes a border-only summary ledger aligned beneath the title
- The ledger exposes setting, country, aggregate guest rating, review count, and INR starting price without introducing a booking card or conversion panel
- The property-type and Luma-pick label replace the duplicated location line in the masthead’s folio column
- A labeled saved action reuses the existing isolated `SaveStayButton` client leaf while the rest of the property page remains server-rendered
- The saved action supplies `aria-pressed`, visible hover/focus/active states, changed label text, and the existing branded confirmation toast
- Planned `/saved` links disable prefetch so the temporary interaction does not create avoidable console 404s
- Verified against the production build at 1440×1000 and 390×844 with exact setting/rating/price output, 99px-or-larger save targets, successful add feedback, reload reset, decoded imagery, zero horizontal overflow, and clean consoles

Important limitation: saved state remains local to the button and intentionally resets on reload. The nightly amount is a mock starting price, not date-specific availability or a total-stay quote. Persistent saved state remains roadmap item 32.

### Responsive property image gallery

- Casa Serein now has a five-view editorial gallery composed from the existing fictional-property lead image and four new licensed stock photographs
- No imagery was generated for this unit: the supporting lemon terrace comes from Unsplash, while the sea-view room, Positano terrace, and dusk pool come from Pexels
- Photographer, source page, provider, license, alt text, focal point, palette, and intended-use metadata live in the central media catalog and `docs/image-library.md`
- Refero reference lock uses MANNA’s warm, sharp-edged architectural presentation as the layout foundation, Kobu’s quiet gallery-wall rhythm, and only Airbnb’s proven one-large/four-supporting composition
- Desktop uses a 12-column asymmetric mosaic with one decisive lead view and four supporting portraits; mobile collapses to a native horizontal snap rail with the following image kept partially visible as its scroll affordance
- Small numbered folio labels and a single caption ledger provide orientation without card chrome, arrows, autoplay, or a control that falsely implies the not-yet-built fullscreen viewer
- The server-rendered gallery preloads only the lead image, leaves supporting views lazy, and supplies viewport-specific `sizes`
- Verified against the production build at 1440×1000 and 390×844 with five decoded images, exact desktop mosaic geometry, working mobile horizontal scroll, zero document overflow, no nested interactive controls, and clean browser consoles

Important limitation: the four stock photographs are illustrative editorial mock imagery, not representations of bookable Casa Serein inventory. Image categories and source-facing photo credits are intentionally omitted from the guest interface.

### Fullscreen property gallery lightbox

- Every Casa Serein gallery view is now a 44px-or-larger trigger with an explicit zoom affordance, accessible image-specific label, visible focus treatment, and subtle crop-safe hover movement
- The isolated `PropertyGallery` client boundary uses the existing Base UI dialog foundation while the surrounding property route and detail shell remain Server Components
- Fullscreen presentation uses a solid deep-forest gallery canvas, sharp contained imagery, restrained mono metadata, a live image counter, image title/location, and a quiet five-position progress rail
- The active image follows the exact item opened; previous and next navigation wraps continuously across all five views
- Keyboard behavior includes Left, Right, Home, End, and Escape, while touch users can swipe horizontally or use 52px side controls
- Close receives initial focus; modal background content is hidden from assistive technology, body scrolling is locked, focus remains contained, and both Escape and the explicit close control return focus to the opening image
- No autoplay, thumbnails, filter categories, pinch zoom, route mutation, or global state were added
- Refero reference lock uses Liron Moran Interiors’ muted gallery backdrop as the primary direction, Kobu’s sharp photography and mono metadata, and only Tripadvisor’s familiar side-control/counter behavior
- Verified from the production build at 1440×1000 and 390×844 with decoded active images, exact fullscreen geometry, keyboard wraparound, swipe navigation, 48px-or-larger controls, focus containment/return, background scroll lock, zero document overflow, and clean browser consoles

Important limitation: lightbox position is local UI state and is not shareable through the URL. The viewer intentionally does not provide pinch-to-zoom, downloads, image categories, or source-facing photo credits.

### Property information ledger

- Casa Serein now continues past the Luma note with four distinct editorial sections for character, facilities, house policies and practical details, and the Ravello setting
- The character section reuses the existing property description and atmosphere fixture rather than inventing a parallel marketing taxonomy
- Three facility rows expand the existing infinity-pool, garden-restaurant, and private-transfer summary into a ruled, comparison-friendly ledger
- House policies and arrival guidance are presented as calm definition lists on a deep-forest surface, with a visible disclosure that the operational details are prototype data rather than live hotel inventory
- Location content includes the published Ravello elevation, existing coordinates, Villa Rufolo, the 7 km Amalfi road connection, and Salerno arrival context without adding a decorative or non-functional map
- Source provenance is recorded in `docs/property-fixtures.md` against the official Hotel Caruso factsheet, Visit Ravello, Fondazione Ravello, and Palazzo Avino; no image or synthetic source content was generated
- The entire information feature is a Server Component and adds no client JavaScript, state, accordions, cards, or booking controls
- Refero reference lock uses Kobu’s warm editorial canvas as the primary direction, 19–86’s ruled specification ledger, and BelArosa’s linen/forest section rhythm with restrained brass accents
- Verified from the production build at 1440×1000 and 390×844 with all four sections present, clean semantic headings and definition lists, visible prototype disclosure, zero horizontal overflow or clipped elements, and clean browser consoles

Important limitation: Casa Serein remains fictional. The operational content is a source-backed Ravello composite for interface testing, not a claim about real inventory, current opening dates, accessibility, availability, or binding booking terms.

### Casa Serein room fixtures

- `mockRooms` now contains three typed Casa Serein tiers: Garden Room, Sea Terrace Room, and Serein Suite
- Each tier carries occupancy, bed configuration, floor area, facilities, INR nightly pricing, breakfast inclusion, and a structured cancellation policy with a label, summary, and explicit terms
- Six distinct room-media references resolve through the central catalog: one existing Pexels sea-room view and five new locally stored Unsplash photographs
- No imagery was generated; the retained stock set was visually reviewed at source resolution, while one visibly branded candidate and two stylistically dated candidates were rejected
- Room sizes, bed patterns, terraces, bathrooms, housekeeping, and cancellation-state patterns are adapted from the official Hotel Caruso accommodation pages and factsheet, with Palazzo Avino used as a secondary category cross-check
- Source provenance and the fictional-fixture disclosure are recorded in `docs/property-fixtures.md`, while every added photograph is credited in `docs/image-library.md` and `src/data/mock/media.ts`
- `Room` now references central-catalog `mediaIds` and models cancellation details structurally so the upcoming selection interface can present meaningful refundable, stepped-charge, and non-refundable states
- Verified with lint, TypeScript, `git diff --check`, valid local JPEG inspection, visual review of all five new images, and a successful Next.js production build

Important limitation: these are illustrative interface fixtures, not live Casa Serein inventory. Prices, availability, occupancy rules, cancellation charges, breakfast entitlements, and the room-to-photo associations are not bookable claims and must eventually come from a real property data source.

### Casa Serein room selection

- The property page now places a dedicated room-selection section between the Luma note and the general property-information ledger
- Three comparison-friendly room studies expose both catalog images, occupancy, bed setup, room size, full facility lists, breakfast inclusion, nightly price, and cancellation category
- Each cancellation summary uses a native disclosure so detailed charges remain available without making every row visually dense
- Room choice uses one native radio group with 48px visual labels, arrow-key movement, visible keyboard focus, selected-state copy, and no client JavaScript
- The reference lock uses Kobu’s sharp image-led gallery rhythm as the primary direction, Christopher Ireland Creative’s ruled editorial rows, Scape’s rapid image/name/price scan, and only Trip.com’s clear separation of inclusions, occupancy, policy, and price
- Rounded marketplace cards, shadows, filter chrome, urgency badges, blue conversion styling, the UI/UX Pro Max liquid-glass recommendation, and premature checkout navigation were explicitly rejected
- Desktop uses asymmetric 5/4/3 image, detail, and rate columns; mobile collapses every room into one readable column with a compact two-image diptych and full-width selection target
- The existing property-information folios now continue from 04 through 07 after the room section’s 03
- Verified from the production build at 1440×1000 and 390×844 with all six room images decoded, exact room data, native radio click and arrow-key selection, disclosure expansion, 48px-or-larger controls, visible keyboard focus, zero horizontal overflow, and a clean browser console

Important limitation: room choice is intentionally local browser form state. It resets on reload, does not check availability, does not calculate a stay total, and is not stored across routes.

### Casa Serein sticky booking summary

- A compact ruled summary stays directly beneath the 88px global header while the guest moves through the Casa Serein room section
- The room ledger remains server-rendered; one isolated client leaf observes the existing native radio group through `useSyncExternalStore` and receives only serializable room-summary data
- The initial state shows the lowest nightly rate and a clear selection prompt; native pointer or arrow-key selection updates the room name, exact rate, breakfast inclusion, and cancellation category
- The action is intentionally honest and local: “Choose a room” or “Review this room” scrolls to the relevant native room row instead of implying availability, checkout, or a reservation
- Reduced-motion preferences disable smooth scrolling, the changing room name is announced through a polite live region, and the existing radio labels retain their focus and selected-state semantics
- BelArosa’s forest/linen/gold luxury restraint is the primary reference direction, with Kobu’s mono editorial metadata and Navan’s compact horizontal summary grouping borrowed as supporting details
- The property wrapper now uses overflow clipping instead of an overflow scroll container so the global header and local summary can both remain sticky without changing visual containment
- Verified from the production build at 1440×1000 and 390×844 with exact click and arrow-key updates, summary top position at 88px, sticky-section containment, scroll targeting below the sticky stack, zero horizontal overflow, zero browser errors, and 48px action targets

Important limitation: the panel summarizes only the current page’s illustrative room choice. It does not include dates, guest counts, availability, taxes, total-stay pricing, checkout navigation, persistence, or cross-route booking state.

### Property route and room-availability states

- `/properties/[slug]` now owns a content-shaped loading skeleton, branded missing-property state, and recoverable error boundary; the successful Casa Serein composition remains unchanged outside the room action state
- The loading surface mirrors the property masthead, summary ledger, asymmetric gallery, and Luma note instead of using a spinner or generic card placeholders; it exposes `aria-busy` and a screen-reader status
- Unknown property slugs now reach the segment-specific not-found experience with calm recovery copy, links back to `/search` and `/`, and Next-generated `noindex` metadata
- The error state uses a shared editorial route-state frame, a prominent retry action, and an alternate path to the collection; real route failures call Next’s `unstable_retry`
- `?_demo=error` is an intentional local interface-review hook: it triggers the segment boundary, and its retry removes the demo query through a same-route replacement before restoring Casa Serein
- Room availability is now a typed discriminated union. Garden Room and Sea Terrace Room remain selectable, while Serein Suite stays fully readable but exposes an explicit unavailable notice and disabled native radio action
- The sticky booking summary receives available rooms only, never targets the unavailable suite, and has a disabled, clearly labelled fallback if a future fixture contains no selectable rooms
- Refero reference lock uses Kobu’s warm linen, sharp rules, and mono metadata as the foundation; BelArosa’s forest/brass recovery rail; Programa’s calm 404 hierarchy; Trip’s content-shaped skeleton principle; and Navan’s practice of preserving room information when its action changes
- Liquid-glass surfaces, centered error cards, spinners, a red full-canvas failure state, dimmed unreadable rooms, urgency language, fake live-date claims, generated mock imagery, checkout navigation, and global booking state were explicitly rejected
- Verified against production builds at 1440×1000 and 390×844 with three room radios, one disabled unavailable room, disabled-radio arrow-key skipping, exact sticky-summary updates, successful error recovery, the segment-specific missing-property copy and `noindex`, 44–48px actions, zero horizontal overflow, and the loading component inside the real property layout

Important limitation: the unavailable room is an explicit fixture state for interface testing, not date-sensitive inventory. Because the property segment streams through `loading.tsx`, Next.js returns the rendered missing-property response with HTTP 200 while adding `noindex`; changing that transport behavior without losing the segment-specific streamed experience remains future routing/SEO work.

### Homepage search query handoff

- The hero now performs a real client-side transition to `/search`
- Destination, check-in, check-out, adults, children, and rooms are encoded as shareable URL parameters
- Date values use stable `yyyy-MM-dd` strings instead of timezone-sensitive timestamps
- The results summary safely normalizes destination text, validates dates, bounds guest/room counts, and supplies resilient defaults for incomplete or malformed direct URLs
- The existing linen summary remains compact on desktop and collapses into a clear vertical ledger on mobile
- Blank-destination validation remains inline and accessible before navigation
- Verified end to end at 1440×1000 and 390×844, including edited guest/room counts, direct destination links, malformed query fallback, URL persistence, and browser console review

Important limitation: this unit persists and displays search intent only. It does not filter the editorial result set or introduce filter/sort/mobile-sheet behavior.

### Destination autocomplete

- Refero-informed destination suggestion surface anchored above the existing hero search instead of introducing a separate search experience
- Empty-query discovery split into two recent places and five popular places from the seven-place destination fixture
- Local matching across destination name, country, region, and editorial character while preserving unmatched free-text searches
- Accessible combobox semantics with active-descendant tracking, wrapping arrow navigation, Home/End jumps, Enter selection, Escape/Tab dismissal, and outside-click closure
- Active keyboard options remain visible inside the scrollable suggestion ledger
- Full-row 64px pointer targets, visible active styling, live status feedback, and restrained paper/linen/forest/brass presentation
- Compact mobile panel stays below the sticky header, scrolls independently, and introduces no horizontal overflow
- Existing destination, date, guest, and room query handoff remains intact
- Verified at 1440×1000 and 390×844, including discovery groups, local filtering, pointer and keyboard selection, selected and free-text submissions, active-option scrolling, 64px mobile targets, and browser console review

Important limitation: suggestions are local and finite, and recent searches are not persisted between visits. Remote place lookup, typo tolerance, hotel-name search, and personal history remain future data/product work.

### Cross-route booking store

- A per-request Zustand vanilla store now lives beneath the root client provider, so booking state survives App Router navigation without sharing a module-global singleton across server requests
- The typed draft carries normalized check-in/check-out dates, adult/child/room counts, compact property and room snapshots, trimmed lead-guest identity/contact details, hydration status, and a fully derived mock price/cancellation summary
- Search-result property links preserve canonical destination, date, guest, and room intent in the property URL; a small client initializer hydrates dates, guests, and the property snapshot while the property route remains statically generated
- Initialization keys make hydration idempotent, so React Strict Mode or preserved-route effect replays do not clear an existing room choice for the same property and search intent
- The existing native room radios now update the store through the isolated sticky-summary client leaf, while the radios and summary restore from the same selected-room state after client-side route navigation
- Price state derives the nightly rate, night count, requested room count, accommodation subtotal (`nightly rate × nights × rooms`), estimated tax, per-room service fee, final total, and cancellation-charge examples after every relevant update instead of storing independently editable totals
- Guest counts are bounded to the existing search limits, invalid date ranges normalize to an unset stay, rooms from another property are rejected, property changes clear incompatible rooms, and an explicit reset returns the draft to its known defaults
- No new review screen or booking route was introduced; the existing property composition and native room controls remain visually unchanged apart from an accurate non-persistence disclosure
- Verified with lint, TypeScript, focused vanilla-store assertions, a successful production build, and visible-browser QA at 1440×1000 and 390×844 covering URL handoff, room selection, cross-route restoration, reload reset, native-radio synchronization, zero horizontal overflow, zero console warnings/errors, and zero unexpected request failures

Important limitation: booking state is intentionally memory-only. Dates and guests can be reconstructed from a shareable property URL after reload, but the selected room and guest details are cleared; persistence, live pricing/tax data, availability, payment, and confirmation remain later roadmap units.

### Booking review step

- A new static `/booking/review` route presents the first of four clearly labelled booking steps inside the shared site header/footer shell
- The Casa Serein sticky summary keeps its local room-scroll action until a room is selected, then becomes a real `Review your stay` App Router link into the review route
- The complete review reads the existing cross-route draft and presents the selected property, central-catalog room image, room name, beds, room size, breakfast inclusion, check-in/check-out dates, party, room count, duration, and cancellation summary without duplicating fixture data
- A dark, sticky price ledger now separates the accommodation subtotal, 12% prototype tax estimate, fixed ₹900-per-room Luma fee, and derived final total while clearly identifying every amount as mock data
- The cancellation section expands the selected room’s structured percentages into exact accommodation-only charge examples, keeps tax/fee amounts outside those charges, and exposes a sticky-header-safe deep link from later booking steps
- `Change room` and `Edit dates or guests` links preserve the canonical search intent; the former returns directly to the property room section and the latter returns to `/search`
- Direct access or reload with no in-memory draft shows a deliberate recovery ledger, while property/room drafts without valid dates expose `Choose dates` and `Return to Casa Serein` paths instead of showing an invalid price
- The guest-details action is now an enabled App Router link to `/booking/guest-details`, with explicit copy that the next step creates neither a reservation nor a charge
- Refero reference lock uses Kobu's warm linen canvas, sharp photography, and quiet editorial spacing as the foundation; Christopher Ireland Creative's ruled information rhythm and Navan/Airbnb's two-column review hierarchy and visible edit paths are borrowed without their rounded card stacks, shadows, purple/blue conversion styling, timers, or urgency patterns
- UI/UX Pro Max guidance was retained for responsive image sizing, visible focus, and 44–48px controls; its generic blue/gold liquid-glass direction was rejected, as were bento composition and perpetual decorative motion
- Verified from the production build at 1440×1000 and 390×844 through the real room-selection-to-review transition, with exact three-night subtotal derivation, decoded responsive imagery, 44–48px main controls, visible keyboard focus, zero mobile horizontal overflow, clean browser warnings/errors, explicit no-date recovery, and reload reset behavior

Important limitation: the page remains a frontend-only review of a memory-held draft. It does not persist the selected room, hold inventory, use live rates/tax law, apply binding cancellation charges, take payment, or create a reservation.

### Guest-details step

- A new static `/booking/guest-details` route presents step two inside the shared site shell and reads the same complete cross-route booking draft as review
- The review action now opens the route, while both the explicit `Back to review` link and the completed progress step return without losing the session-held guest draft
- The form collects only lead-guest first name, last name, email, and phone, with visible labels, required indicators, correct input types, autocomplete hints, a country-code example, and local React Hook Form/Zod validation
- Submitting trims and length-bounds the four fields in the Zustand draft and announces a polite saved status without creating an account, reservation, payment record, or external mutation
- Identity and contact are deliberately separated from payment. Special requests, submission failures, terms acceptance, and confirmation remain assigned to later roadmap units
- A dark sticky stay ledger preserves property, room, location, check-in/out, party, the complete mock price, rate inclusions/exclusions, and the selected cancellation summary; its payment action remains gated by a saved, unchanged guest draft
- Booking progress, query formatting, money/date/party labels, and missing-draft recovery are now shared between review and guest details; a reloaded guest-details URL marks Review as required instead of falsely complete
- Refero reference lock uses Kobu's linen canvas, sharp rules, mono metadata, and shadowless editorial restraint as the foundation; Christopher Ireland Creative's ruled form rhythm, Volkshotel's paired field structure, Understory's concise purpose/trust copy, and Expedia's persistent two-column summary are borrowed without their card shadows, extra personal fields, payment UI, urgency, or error styling
- UI/UX Pro Max guidance was retained for associated labels, submission feedback, internal Next.js links, leaf-level client interactivity, visible focus, and responsive 44–48px controls; its liquid-glass palette/effects were rejected as incompatible with LumaStay
- Verified from the production build at 1440×1000 and 390×844 through the real search → property → room → review → guest-details journey, including save feedback, review round-trip restoration, mobile stacking, disabled payment scope, clean console output, and reload recovery

Important limitation: guest details remain memory-only and are validated only in the browser. The form does not persist personal data, validate through a server, send confirmation messages, submit a booking, take payment, or create a reservation.

### Checkout and mock payment form

- A new static `/booking/payment` route presents step three inside the shared site shell and opens only after the in-memory stay and normalized lead-guest details are complete
- The guest-details stay ledger now keeps its payment action disabled until the four guest fields have been saved, then exposes a real App Router link into the mock payment step
- Review and Guest details remain navigable completed steps, and returning to either route preserves the session-held stay and guest draft
- The deliberately narrow form collects name on card, card number, expiry, and security code with visible labels, autocomplete disabled, mobile-friendly numeric keyboards, and local React Hook Form/Zod validation
- A prominent test-only notice supplies the standard `4242` card number and states that the interface neither contacts a provider nor accepts real payment details
- Submitting prepares only a page-local masked summary containing the trimmed cardholder name, last four digits, and expiry; the full card number and security code are cleared immediately, never enter Zustand, and disappear entirely when the route unmounts
- A sticky stay ledger repeats the guest/contact summary, complete mock price, rate inclusions/exclusions, and cancellation summary; its scope copy reserves booking submission, response handling, retry states, and confirmation for their later roadmap units
- Direct access with no stay reuses the deliberate booking recovery state, while a complete stay without saved guest details exposes clear paths back to Guest details and Review
- Refero reference lock uses Kobu's warm paper, sharp fields, quiet rules, restrained monospace metadata, and shadowless composition as the foundation; Mews' split checkout hierarchy, Trip.com's payment grouping and progress clarity, Christopher Ireland Creative's ruled form cadence, and BelArosa's forest/brass restraint are borrowed without logos, wallets, urgency, rounded card stacks, promotional totals, or real-payment claims
- UI/UX Pro Max guidance was retained for persistent labels, visible keyboard focus, internal Next.js links, leaf-level client interactivity, mobile input modes, and 44–48px controls; its unrelated liquid-glass, blue, and gold system was rejected as incompatible with LumaStay
- Verified from the production build at 1440×1000 and 390×844 through the complete search → property → room → review → guest → payment journey, including first-invalid-field focus, visible keyboard focus, hover feedback, masked-only preparation, immediate sensitive-field clearing, route-local summary clearing, recovery states, zero mobile horizontal overflow, zero console warnings/errors, and zero unexpected request failures

Important limitation: this is a frontend-only mock payment preparation form. Its schema accepts only the documented test fixture and does not perform provider validation, encryption, tokenization, a charge, inventory hold, reservation, live tax/fee calculation, server validation, loading/failure/retry handling, confirmation, or persistence.

### Validated booking forms

- Guest details and mock payment now share Zod schemas with React Hook Form resolvers, submit without native validation bubbles, revalidate corrected fields on change, and focus the first invalid field
- Invalid submissions render a counted top-of-form alert and concise inline text-and-icon errors; every invalid control exposes `aria-invalid` and an `aria-describedby` relationship that preserves existing helper or trust copy
- Guest values are trimmed and length-bounded, email and phone formats are checked locally, and unsaved edits disable payment progression until the corrected guest draft is saved
- Mock payment accepts only `4242 4242 4242 4242`, requires a current or future expiry and a three- or four-digit security code, normalizes the displayed expiry, and clears full card/security values immediately after preparation
- Invalid payment resubmission clears any stale prepared state; sensitive values never enter Zustand, browser storage, URL state, console output, or rendered success copy
- Baseline accessibility fixes moved small light-surface brass text to stronger semantic colors, raised helper-text contrast, and corrected the date-summary description-list structure
- Refero reference lock keeps Kobu's warm ruled editorial foundation, Mews' precise field hierarchy, Expedia/Nike's immediate field-level correction pattern, and LumaStay's destructive token; card stacks, marketplace colors, payment realism, and new modal chrome were rejected
- Verified from a successful production build at 1440×1000 and 390×844 with empty, partial, corrected, saved, dirty, test-card, and stale-success cases; keyboard focus remained visible and unobscured, controls remained at least 48px high, mobile had zero horizontal overflow, the current console and requests were clean, and axe reported zero violations across both booking pages and zero violations/incomplete results within the payment form

Important limitation: validation is deterministic and client-only. It is suitable for this mock flow, not identity verification or real card acceptance, and it does not replace server-side validation or payment-provider tokenization.

### Transparent mock pricing and cancellation

- A typed `BookingPricingPolicy` fixture defines one clearly disclosed 12% prototype tax estimate and a fixed ₹900 Luma service fee per room for the full stay; `docs/property-fixtures.md` explicitly states that neither amount represents Italian tax law or a live fee
- Room fixtures now carry explicit rate inclusions/exclusions and structured cancellation percentages alongside their human-readable terms; the compact booking snapshot preserves those structures across App Router navigation
- The Zustand price summary is fully derived whenever dates, guest-room count, property, or room changes: room subtotal, rounded estimated tax, room-count-sensitive fee, final total, and accommodation-only cancellation examples share one currency and one source of truth
- A reusable dark editorial price breakdown renders the same open ledger on Review, Guest details, and Payment, with room formula, individual tax/fee rows, decisive final total, inclusions/exclusions, cancellation summary, and no collapsed or hidden charge rows
- Review adds the full monetary cancellation schedule; Guest details and Payment link back to it with a `scroll-mt-32` offset so the target remains visible beneath the 88px sticky header
- Reference lock keeps Kobu’s warm shadowless editorial foundation, Midday’s hairline financial ledger, Trip’s exposed tax/fee rows and prominent total, and Airbnb’s co-location of cancellation, inclusions, and price; marketplace cards, colored checkout chrome, countdowns, rewards, hidden fee accordions, and live-tax claims were rejected
- Verified from the production build at 1440×1000 and 390×844 through the complete property → review → guest → payment journey: the three-night Garden Room resolves to ₹114,600 + ₹13,752 + ₹900 = ₹129,252 on all three pages, a two-room Sea Terrace calculation scales the fee and cancellation examples correctly, the deep link lands below the sticky header, mobile has zero horizontal overflow, the fresh console and requests are clean, the full Review page has zero axe violations, and the payment form and shared pricing surfaces have zero scoped axe violations or incomplete checks

Important limitation: all pricing, inclusions, and cancellation amounts are deterministic interface fixtures. They do not reflect live room rates, availability, tax law, property-settled charges, exchange rates, binding policy deadlines, or a payment-provider quote.

### Mock payment submission and recovery states

- The payment form now runs a deterministic page-local attempt after valid submission, disables every card field and the submit action while processing, exposes `aria-busy`, and prevents duplicate submission without introducing a provider request or route transition
- Full card and security values clear as soon as processing begins; the attempt retains only the normalized cardholder name, last four digits, expiry, and a non-sensitive outcome category, all of which disappear when the payment route unmounts or reloads
- Three documented security-code fixtures make every state directly reviewable: `123` prepares the masked summary, `000` returns a declined mock payment, and `999` returns a recoverable connection interruption
- Decline feedback explains that no charge or reservation was created and returns the guest to an empty enabled form with focus restored to the first field
- The connection-interruption retry runs from the masked summary alone, repeats the short processing state, and resolves to the prepared result without asking the guest to re-enter cleared sensitive values
- Processing uses a polite status announcement, failures use assertive alert semantics, every retry action is at least 44px tall, and reduced-motion preferences neutralize the existing spinner animation through the global motion rule
- The full stay and transparent-price ledger remain visible in every state; payment confirmation, a booking reference, itinerary creation, persistence, and any real transaction remain assigned to later roadmap units
- Reference lock keeps Kobu's warm shadowless editorial foundation, Farfetch's visible checkout context during processing, Mews' explicit failure/retry hierarchy, and Incident's flat destructive treatment; blocking marketplace modals, blurred overlays, harsh full-page red, timers, fake provider/security claims, and premature confirmation UI were rejected
- Verified against the production build at 1440×1000 and 390×844 through the real property → review → guest → payment journey: processing disables submission and clears all four fields, approval exposes only the masked card, decline recovery restores focus, interruption retries from masked data, the ₹129,252 final total remains present, mobile has zero horizontal overflow, retry controls are 44px tall, all observed requests return 200 with no payment POST, the console has zero warnings/errors, the full page has zero axe violations, and both new error surfaces have zero scoped axe violations or incomplete checks

Important limitation: every response is a deterministic client-side simulation selected by the documented security-code fixture. No provider, network authorization, inventory hold, reservation, refund, confirmation, or durable payment record exists.

## Current homepage order

`src/app/page.tsx` renders:

1. `SiteHeader`
2. `LandingHero`
3. `CuratedStays`
4. `ExperienceCollections`
5. `BookingConfidence`
6. `ClosingBookingCta`
7. `SiteFooter`

The implemented routes are `/`, `/destinations`, `/edit`, `/search`, `/properties/casa-serein`, `/booking/review`, `/booking/guest-details`, and `/booking/payment`. Other property slugs and navigation links to planned pages use the branded not-found state until their routes are built.

## Current mock-data state

- `mockProperties`: 12 property summaries with local property-type, facility, and atmosphere tags; the homepage intentionally renders the first 3
- `mockPropertyDetails`: 1 full property fixture for Casa Serein, composed from its existing summary, five central-catalog gallery media IDs, 3 sourced facility details, 4 house-policy entries, 4 practical entries, and a Ravello location ledger
- `mockDestinations`: 7 destination summaries shared by `/destinations` and the hero autocomplete
- `mockEditorialStories`: 7 editorial story summaries used by `/edit`
- `mockRooms`: 3 Casa Serein room tiers with 6 central-catalog media references, occupancy, beds, size, facilities, INR nightly pricing, explicit rate inclusions/exclusions, structured cancellation policies and charge percentages, and typed availability; 2 are selectable and Serein Suite is explicitly unavailable in the interface preview
- `mockBookingPricingPolicy`: one INR interface fixture with a 12% estimated-tax rate and ₹900 service fee per room; it is deliberately not sourced from live tax or property data
- `mockBookings`: empty array
- No live availability, date-sensitive room pricing, tax/fee provider, complete facility catalog, booking, payment-provider, or confirmation fixture yet
- `src/stores/booking-store.ts` contains the memory-only cross-route stay and lead-guest draft plus a fully derived mock pricing/cancellation summary; mock card values never enter the store, while the payment page keeps only a route-local masked attempt and deterministic outcome category
- Saved and trips feature indexes are scaffolds only

## Commit history

```text
5b9d6ae feat: add transparent booking pricing
3f40dc2 feat: validate booking forms
a9932f9 feat: add mock payment step
fd57b35 feat: add guest details step
01484be feat: add booking review step
526f427 feat: add cross-route booking store
7a2fa86 feat: add property recovery states
b31dc03 feat: add sticky booking summary
0bcceac feat: add room selection interface
6bea367 feat: add Casa Serein room fixtures
467d4d6 feat: add property information ledger
7e07882 feat: add fullscreen property gallery
e6c118e feat: add responsive property gallery
4fdf91d feat: add property hero summary
0e3a334 feat: add property detail route shell
47bb501 feat: expand search property fixtures
3e55134 feat: add search recovery states
38d35fe feat: add search loading skeletons
bc0f9a7 feat: add mobile search and filter sheets
cdbc5c2 feat: add search sorting and filter chips
84d8d0e feat: add search result filters
9ef2068 feat: refine responsive property listings
ec095a2 feat: add destination autocomplete
0060d54 feat: connect hero search to results
4c1dcfb feat: add initial search results page
d26e196 feat: add editorial Luma Edit page
8729ec6 feat: add destination discovery page
5c159f3 feat: add premium global footer
fc88571 feat: add homepage closing search CTA
10e7d4d feat: add booking confidence section
9bd0ae0 feat: add experience collection gallery
b40cf70 fix: refine saved stay feedback
304e220 feat: add curated stays showcase
2010e40 fix: integrate hero search action
e977b92 feat: build immersive booking hero
6390e6a feat: add curated LumaStay image library
bfb147d feat: add Refero-informed responsive header
f8655f2 chore: establish LumaStay foundation
0795e59 Initial commit from Create Next App
```

## Remaining roadmap

Build each item separately, research it first, verify it, and commit it before moving on.

### Phase 1 — Finish the homepage

1. ~~Homepage closing booking/search call to action~~ Complete
2. ~~Premium global footer with destination, company, support, legal, currency, and account links~~ Complete

### Phase 2 — Discovery and search

3. ~~Destination discovery page at `/destinations`~~ Complete
4. ~~Editorial Luma Edit page at `/edit`~~ Complete
5. ~~Search/results page at `/search`~~ Complete
6. ~~Search query handoff from the homepage hero~~ Complete
7. ~~Destination autocomplete and recent/popular suggestions~~ Complete
8. ~~Property listing layout with responsive card variants~~ Complete
9. ~~Price, facility, rating, property-type, and atmosphere filters~~ Complete
10. ~~Sorting controls and applied-filter chips~~ Complete
11. ~~Mobile search and filter sheets~~ Complete
12. ~~Search loading skeletons~~ Complete
13. ~~Search empty, no-results, error, and retry states~~ Complete
14. ~~Expand mock property data enough to exercise filtering and pagination/loading behavior~~ Complete

### Phase 3 — Property and room selection

15. ~~Property details route at `/properties/[slug]`~~ Complete
16. ~~Property hero summary, location, rating, pricing, and saved state~~ Complete
17. ~~Responsive property image gallery~~ Complete
18. ~~Fullscreen gallery lightbox with keyboard and touch navigation~~ Complete
19. ~~Facilities, atmosphere, policies, practical details, and location sections~~ Complete
20. ~~Room fixtures with distinct images, occupancy, beds, size, facilities, pricing, breakfast, and cancellation terms~~ Complete
21. ~~Room selection cards/interface~~ Complete
22. ~~Sticky booking summary/action panel~~ Complete
23. ~~Property loading, not-found, error, and unavailable-room states~~ Complete

### Phase 4 — Booking and checkout

24. ~~Cross-route booking store with dates, guests, property, room, and price summary~~ Complete
25. ~~Booking review step~~ Complete
26. ~~Guest-details form~~ Complete
27. ~~Checkout and mock payment form~~ Complete
28. ~~React Hook Form and Zod validation with accessible inline errors~~ Complete
29. ~~Taxes, fees, inclusions, cancellation, and total-price breakdown~~ Complete
30. ~~Submitting/loading, payment-failure, recoverable-error, and retry states~~ Complete
31. Booking confirmation page with mock reference and itinerary summary

### Phase 5 — Saved properties and trips

32. Persistent mock saved-state store, preferably Zustand with local persistence
33. Saved properties page at `/saved`
34. Saved empty state and remove/undo behavior
35. Mock booking-history fixtures
36. Trips/history page at `/trips` with upcoming, completed, cancelled, and payment-failed states
37. Individual booking-detail page
38. Booking-history empty, loading, and error states

### Phase 6 — Supporting pages and final quality

39. Curation/about page for `/about/curation`
40. Support/contact experience for `/support`
41. Complete route-level metadata and social previews
42. Final mobile navigation and responsive review at 375, 390, 768, 1024, and 1440 widths
43. Full keyboard-navigation, semantic-structure, contrast, and reduced-motion review
44. Image loading, bundle, and Core Web Vitals review
45. End-to-end mock booking-flow QA
46. Final visual-consistency and production-build audit

## Recommended immediate next step

Add the **booking confirmation page with a mock reference and itinerary summary**. Create a deterministic confirmation record only after the prepared mock-payment state, keep it memory-only, present the complete stay and transparent total without implying a real reservation, and provide clear next paths back to discovery. Leave persistence, real payment, inventory, email, and trip-history integration to later roadmap units.
