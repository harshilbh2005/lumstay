# LumaStay Project Handoff

Last updated: 16 August 2026

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

Saved state now comes from the persistent Zustand store completed in roadmap item 32 and resolves into the `/saved` collection completed in roadmap item 33. The collection-level remove/undo behavior and dedicated empty state are complete in roadmap item 34; generic save buttons retain their compact added/removed feedback.

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

Important limitation: “Ask Luma” now reaches the scoped `/support` experience, but the prototype has no live support desk, connected inbox, or response-time commitment.

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

Important limitation: the footer support links now resolve to `/support` and its booking/cancellation chapters. Destination query links, account shortcuts, and curation also resolve, while the remaining company and legal destinations are still planned.

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
- Header Saved and Trips links now reach their implemented routes; roadmap item 44 later disables speculative prefetch in the always-visible header
- No new image was generated or downloaded for this unit; the existing Casa Serein catalog asset is reused
- Verified from the production build at 1440×1000 and 390×844 with decoded imagery, exact metadata, visible keyboard focus, 44px navigation, zero horizontal overflow, clean consoles, and a branded unknown-slug 404 carrying `noindex`

Important limitation: Casa Serein is the only full property-detail fixture. The shell intentionally omits facilities, rooms, and booking actions so those roadmap items can be researched, verified, and committed separately.

### Property hero summary

- Casa Serein’s existing editorial masthead now includes a border-only summary ledger aligned beneath the title
- The ledger exposes setting, country, aggregate guest rating, review count, and INR starting price without introducing a booking card or conversion panel
- The property-type and Luma-pick label replace the duplicated location line in the masthead’s folio column
- A labeled saved action reuses the existing isolated `SaveStayButton` client leaf while the rest of the property page remains server-rendered
- The saved action supplies `aria-pressed`, visible hover/focus/active states, changed label text, and the existing branded confirmation toast
- Saved actions and confirmation notices now reach the implemented `/saved` collection with normal prefetch behavior
- Verified against the production build at 1440×1000 and 390×844 with exact setting/rating/price output, 99px-or-larger save targets, successful add feedback, reload reset, decoded imagery, zero horizontal overflow, and clean consoles

Saved state now persists locally and synchronizes across every mounted instance of the property. The nightly amount remains a mock starting price, not date-specific availability or a total-stay quote.

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
- The room ledger remains server-rendered; one isolated client leaf observes the existing native radio group, synchronizes it with the booking store, and receives only serializable room-summary data
- The initial state shows the lowest nightly rate and a clear selection prompt; native pointer or arrow-key selection updates the room name, exact rate, breakfast inclusion, and cancellation category
- The action is state-aware: it scrolls to an available room before selection, asks for stay dates when a room has no valid range, and exposes `Review your stay` only when both the room and dates are ready
- Reduced-motion preferences disable smooth scrolling, the changing room name is announced through a polite live region, and the existing radio labels retain their focus and selected-state semantics
- BelArosa’s forest/linen/gold luxury restraint is the primary reference direction, with Kobu’s mono editorial metadata and Navan’s compact horizontal summary grouping borrowed as supporting details
- The property wrapper now uses overflow clipping instead of an overflow scroll container so the global header and local summary can both remain sticky without changing visual containment
- The summary now also exposes the active stay range and a compact date editor; the date editor is detailed in the dedicated property-page stay-date unit below
- Verified from the production build at 1440×1000 and 390×844 with exact click and arrow-key updates, summary top position at 88px, sticky-section containment, scroll targeting below the sticky stack, zero horizontal overflow, zero browser errors, and 44–48px action targets

Important limitation: the panel still does not edit guest counts, check live availability, or quote date-sensitive rates. Taxes and the complete mock total remain deferred to Review, and the booking draft remains memory-only despite URL-backed dates.

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

### Homepage curated-stay booking-intent handoff

- The hero's displayed date range and guest/room counts now mirror the existing memory-only booking draft, including when the guest returns to the homepage during the same App Router session
- Homepage curated-stay image and title links now append canonical destination, check-in, check-out, adult, child, and room parameters before opening the property route
- Opening Casa Serein directly from the homepage therefore hydrates the property booking draft through the same URL-backed path as a search result, so selecting a room and choosing `Review your stay` retains the hero dates
- Existing in-progress booking dates and guest counts initialize the hero when present, avoiding a hidden reset merely from revisiting the homepage
- The fix adds no visual treatment, persistence layer, availability claim, or parallel date source; it reuses the existing booking store and search-query normalization
- Verified with lint, TypeScript, `git diff --check`, a successful Next.js 16.2 production build, and visible Chromium QA at 1440×1000 and 390×844 across both hero → search → property and hero → curated property → review paths; both reach the complete review with their URL dates intact and clean consoles

Important limitation: dates and guest counts survive direct homepage property navigation through the property URL, but room selection and later booking details remain memory-only and still clear on reload.

### Property-page stay date editor

- Casa Serein no longer leaves `Any dates` as a read-only summary: the date row is a 48px popover trigger on every viewport, and a room chosen without dates changes the primary action to `Add stay dates`
- The compact one-month range calendar uses the same fixed prototype date floor and canonical `yyyy-MM-dd` values as the homepage search, with 44px day targets, visible focus, disabled past dates, and an assertive incomplete-range error
- Applying a valid range updates the booking store immediately, recalculates the existing derived price summary, replaces the current property URL without scrolling, and preserves the selected room as the URL-backed initializer catches up
- Clearing removes only the two date parameters and returns the action to the honest missing-date state; `Review your stay` appears only after a valid room and date range coexist
- Refero’s BelArosa forest/linen/gold restraint remains the visual foundation, with Kobu’s compact mono metadata and the familiar horizontally grouped property date controls seen in Expedia/Tripadvisor used only as interaction references
- White marketplace search cards, blue booking CTAs, urgency, live-availability copy, a duplicated destination/guest form, animated date chrome, and date-sensitive price claims were explicitly rejected
- Verified with lint, TypeScript, `git diff --check`, a successful Next.js 16.2 production build, and visible Playwright QA at 1440×1000 and 390×844: direct property entry supports date selection, URL dates update, the native room remains selected, Review reaches the complete state, both viewports have zero horizontal overflow, and consoles remain clean

Important limitation: the property calendar edits booking intent only. It does not query inventory or change the illustrative room availability and nightly rates, and room selection still resets on a full reload.

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

### Booking confirmation page

- A new static `/booking/confirmation` route presents step four only after the prepared mock-payment state exposes an explicit `Create mock itinerary` action
- That action creates one deterministic, immutable snapshot in the existing per-request Zustand store: property, room, dates, guests, lead-guest details, complete derived price, masked test-card details, and a clearly labelled `LUMA-MOCK-…` reference
- The reference derives from the property, room, and check-in date, so the interface stays reproducible without inventing a backend identifier, timestamp, reservation, or random token
- Full card and security values still clear before processing and never enter the cross-route store; confirmation retains only cardholder name, last four digits, and normalized expiry
- Any later stay, room, guest, or property edit invalidates the snapshot, while the confirmation route renders from the captured record so its itinerary does not drift with unrelated current-draft reads
- The populated page combines an editorial prototype-record heading, prominent mock reference, selected-room image, property/location, room configuration, breakfast, check-in/out, party, duration, lead guest, masked test card, the complete price ledger, cancellation summary, and honest next paths to discovery and home
- Direct access or reload shows a deliberate session-recovery ledger instead of reconstructing or pretending a confirmation; the reference is never written to browser storage, the URL, mock booking history, or a server
- Booking progress now links completed Payment from the confirmation step, while Review and Guest details retain their existing completed-step navigation
- Reference lock uses Kobu's linen, shadowless editorial restraint as the foundation; 19–86's ruled document rhythm, BelArosa's forest/linen/brass contrast, and Onefinestay's confirmation-to-itinerary hierarchy are borrowed without marketplace cards, confetti, live support/email claims, reservation-management actions, or “booked” language
- The app-builder workflow kept the feature inside the existing booking boundary: a thin route, one client confirmation component, and a narrowly extended memory-only store rather than a new persistence or backend layer
- Verified from the production build at 1440×1000 and 390×844 through the real property → review → guest → prepared payment → confirmation journey: the deterministic `LUMA-MOCK-CS-GR-260912` reference, ₹129,252 total, masked card, decoded room image, 44–80px controls, clean console, and zero horizontal overflow all remain correct; reload removes the reference and restores recovery; the populated confirmation main surface has zero axe violations and zero incomplete checks

Important limitation: this is an interface-only itinerary held in memory for the current browser session. No property receives a reservation, no payment is authorized or charged, no inventory is held, no email is sent, and no Trips/history entry is created. Reloading clears the confirmation record.

### Persistent mock saved-state store

- Saved stays now use a dedicated root-level Zustand vanilla store that is completely separate from the memory-only booking and confirmation draft
- The versioned `lumastay:saved-stays` localStorage payload persists only stable property IDs; display data continues to resolve from the central property fixtures instead of becoming a stale browser snapshot
- Persistence normalizes malformed values, removes duplicates, bounds the collection, migrates earlier storage versions into the current shape, and falls back to session-only behavior when browser storage is unavailable
- Rehydration is explicitly skipped during server rendering and deferred until the root client provider mounts, preventing localStorage access on the server and avoiding saved-button hydration mismatches
- Saved controls remain briefly disabled until rehydration finishes, then every homepage, search-result, and property-detail instance reads the shared state and exposes the same `aria-pressed` value
- Save, remove, toggle, clear, and index-preserving restore actions support the collection and its reversible removal behavior; newly saved property IDs are ordered first while duplicate saves and duplicate restores remain idempotent
- The existing top-center added/removed feedback, saved icon treatment, labels, and `/saved` action remain visually unchanged, so this non-visual infrastructure unit did not require a new Refero reference lock
- Verified with lint, TypeScript, focused vanilla-store and versioned-persistence assertions, a successful production build, and visible Playwright CLI QA at 1440×1000 and 390×844 covering save, reload restoration, homepage/search synchronization, removal propagation, exact storage shape, zero mobile horizontal overflow, clean requests, and zero console warnings/errors

Important limitation: saved stays are mock, browser-local preferences. They do not sync to an account, another browser, or another tab in real time, and clearing site storage resets them.

### Saved properties page

- A new static `/saved` route presents a personal collection masthead and an editorial saved-stay ledger inside the shared site header/footer shell
- The route resolves all 12 property and media fixtures on the server, passes only display-ready serializable fields into one isolated client collection, and preserves the persisted newest-first saved-ID order
- Unknown or stale browser IDs are filtered without breaking the page, while visible count copy reflects only fixtures that can actually be rendered
- Explicit rehydration handling keeps the server and first client render aligned: a content-shaped two-row skeleton and live “Reading your list” status appear until local persistence has resolved, preventing an empty-list flash
- Populated desktop rows alternate a 7/5 image-and-copy composition; mobile collapses to one sharp image-led column with location, saved folio, rating, description, atmosphere, facilities, price, and a 44px stay action
- The route uses existing central-catalog imagery and mock property data, adds no duplicate media paths, snapshots, backend, account state, or new image assets
- The completed empty state replaces the baseline ruled fallback with an asymmetric Kyoto-at-dusk atlas image, a direct explanation of the browser-local heart action, and one decisive 48px path back to `/search`
- Every populated row now exposes a plainly labelled 44px Remove action; removal immediately updates the persisted IDs, visible rows, and live collection count without a confirmation modal
- A single compact 6.4-second branded notice names the removed stay and offers Undo; restoring inserts the property at its original collection index instead of promoting it to the newest position
- Keyboard focus moves to the next or previous Remove action after deletion, to the empty-state CTA after deleting the last stay, and back to the restored row after Undo; the delayed Undo focus handoff yields to any deliberate focus movement by the guest
- Surviving rows reflow with transform-only layout motion while removal itself is immediate, avoiding blank reserved space or a full-row ghost over the empty state; global reduced-motion handling remains intact
- Saved links in the footer and branded confirmation notice use normal prefetch behavior, while the global header opts out after roadmap item 44; Trips follows the same implemented-route split, and still-planned destinations retain disabled prefetch where appropriate
- The page foundation retains Kobu’s warm linen, sharp property photography, quiet mono metadata, and generous gallery spacing; item 34 adds MANNA’s image-led gallery restraint, Kinfolk’s decisive CTA treatment, and Julienne’s immediate count update plus compact Undo pattern without generic centered empty cards, confirmation dialogs, saturated success chrome, account claims, or marketplace density
- UI/UX Pro Max guidance was retained for responsive `next/image` sizing, 44px targets, visible keyboard focus, and zero overflow; its aurora gradients, conversion-page structure, and perpetual atmospheric motion were rejected as incompatible with LumaStay
- Verified with lint, TypeScript, a successful Next.js 16 production build, and visible Playwright QA at 1440×1000, 768×1024, and 375×812: exact persisted ordering, immediate removal, original-index Undo, single-item and zero-item counts, keyboard focus recovery, Kyoto media decoding, 44px+ CTA sizing, clean console, and zero horizontal overflow all pass

Important limitation: the collection is editable only through single-stay save/remove actions. There is no bulk editing, named-list organization, cross-tab synchronization, account-backed cloud sync, or automatic handoff between saved stays and booking history.

### Mock booking-history fixtures

- A typed, serializable booking-history contract now uses a discriminated union for confirmed, cancelled, and payment-failed records; status-specific payment fields prevent a failed attempt from being mistaken for a reservation
- Six deterministic records exercise the Trips experience: two upcoming stays, two completed stays, one fully refunded cancellation, and one retryable declined-payment attempt
- `MOCK_BOOKING_HISTORY_REFERENCE_DATE` anchors status meaning to `2026-08-09`, so fixtures and later screenshots do not change when the viewer's clock changes
- Confirmed and cancelled records use stable `LUMA-MOCK-*` references; the failed attempt exposes only a distinct `LUMA-ATTEMPT-*` identifier and has an explicitly null booking reference
- Each record includes a central-catalog property snapshot, media-backed room snapshot, stay dates, structured party, lead guest, rate inclusions/exclusions, cancellation summary, and transparent INR price ledger
- Price snapshots reuse the existing 12% prototype tax estimate and ₹900 per-room service-fee policy; exact accommodation, tax, fee, total, cancellation-fee, and refund amounts are fixed and reviewable
- Small selectors resolve a record by ID or all records for one status, while the central mock-data barrel now exports the fixtures instead of an empty placeholder
- The app-builder workflow kept that fixture unit inside the data boundary: it introduced no `/trips` route, client store, persistence, backend layer, or visual component; the separate page unit below now consumes the fixtures
- Verified with lint, TypeScript, focused fixture assertions for all six records and four states, `git diff --check`, and a successful Next.js 16 production build; Refero and browser QA were not applicable because this unit adds no rendered surface

Important limitation: these records are frontend-only interface fixtures. They do not represent account history, live reservations, inventory, payments, refunds, provider responses, or user-generated confirmation persistence, and the fixed status reference date must be advanced deliberately if the product timeline changes.

### Trips/history page

- The `/trips` route composes the shared header/footer around a Server Component history surface; roadmap item 38 now renders it on request only because reviewable state fixtures are selected through the page-level `searchParams` promise, while still adding no client store, browser persistence, account assumption, or backend request
- The masthead introduces a compact status index that anchors to four visibly separate chapters: two image-led upcoming stays, two compact completed records, one quiet cancelled/refunded record, and one deep-forest failed-payment attempt
- Every record is derived from the deterministic `mockBookings` fixtures and central media catalog, with the interface date fixed to `09 Aug 2026`; references, stay dates, party, room, paid/refunded totals, and cancellation outcome remain reviewable without recomputing status from the viewer's clock
- The failed attempt is deliberately outside the reservation ledger: it says that no trip, booking reference, charge, or hold exists, exposes only the `LUMA-ATTEMPT-*` identifier, and offers a repeat-search URL carrying the original AlUla dates and party instead of a misleading payment-retry action
- Header and footer Trips links reach the implemented route; roadmap item 44 later disables speculative header prefetch while retaining the footer's normal behavior, and other still-planned destinations retain their current handling
- The reference lock combines Kobu's warm linen gallery/ledger foundation, Trip's fast status and itinerary scan, Onefinestay's image/detail balance, and Mews' precise state separation. Account sidebars, marketplace tabs/card stacks, brand-blue actions, and controls implying live management were rejected
- UI/UX Pro Max guidance was retained for responsive `next/image` sizing, visible focus, 44px+ targets, sticky-anchor clearance, and zero overflow; its aurora gradients, generic conversion-page structure, and perpetual atmospheric motion were rejected in favor of the existing LumaStay tokens and editorial restraint
- Verified with lint, TypeScript, a successful Next.js 16 production build, and visible Playwright QA at 1440×1000 and 390×844: all six images decode, each article has an accessible label, all four anchors clear the sticky header, the repeat-search intent reaches `/search`, keyboard targets measure 44–80px with visible focus rings, both viewports have zero horizontal overflow, axe reports zero violations, and the production console reports zero errors or warnings

Important limitation: history is a fixed frontend presentation of mock records, not an account-backed ledger or a continuation of the session-only confirmation flow. Booking-history empty, loading, and error states remain roadmap item 38.

### Individual booking-detail page

- A new `/trips/[id]` route prerenders the five confirmed or cancelled reservation snapshots and composes each read-only record inside the shared header/footer shell; unmatched IDs remain dynamic only long enough to resolve through the segment's accurate unavailable-record boundary
- Upcoming, completed, and cancelled records share one server-rendered editorial itinerary with status, mock reservation reference, booking/payment dates, property and room image, stay dates, party, lead guest, room details, inclusions, exclusions, cancellation policy, and the full stored price ledger
- Cancelled stays add a distinct outcome chapter for cancellation date, reason, zero retained fee, refund date, refund amount, and masked test-card suffix; confirmed stays retain only the fixture's paid date and masked suffix
- Trips history now exposes exactly five `View full record` links. The failed-payment fixture has no detail link, is excluded from generated reservation params, and resolves to copy explaining that payment attempts remain history entries rather than bookings
- Every detail page exports fixture-derived metadata with `noindex, nofollow`, keeps the room image as the prioritized LCP asset, and ends with honest paths back to Trips or a repeat search rather than modify, cancel, support, receipt-download, or other controls that would imply a live reservation system
- The reference lock keeps Kobu and Christopher Ireland Creative's warm, shadowless editorial-document foundation; borrows Onefinestay's image/itinerary balance, Trip's fast status and receipt scan, and BelArosa's forest/linen/brass rhythm; and rejects account sidebars, stacked dashboard cards, QR/app promotion, brand-blue actions, surveys, and live-management controls
- The app-builder workflow kept the route thin, server-rendered, static for its five known reservation IDs, and fixture-bound; no client state, store mutation, persistence, backend, or payment/account integration was introduced
- Verified with lint, TypeScript, `git diff --check`, a successful Next.js 16 production build, and visible Playwright QA at 1440×1000, 390×844, and 320px reflow: all three status treatments, exact references/totals/refund, five history links, failed/unknown boundaries, image decoding, one-main/one-h1 semantics, 12 keyboard-focus stops, 24px+ targets, zero horizontal overflow, zero console warnings/errors, and zero axe violations pass

Important limitation: these are immutable local fixture records. They cannot be changed, cancelled, downloaded, shared, supported, synced to an account, or populated by the session-only confirmation store; payment attempts never become reservation-detail pages.

### Booking-history empty, loading, and error states

- `/trips` now has a complete five-state presentation contract: populated history, content-shaped loading, an intentional zero-record ledger, an expected recoverable data failure, and the segment's unexpected-error boundary
- A URL-neutral `trips/(history)` route group isolates `loading.tsx` and `error.tsx` from `/trips/[id]`, while the new parent `trips/layout.tsx` keeps one shared header/footer mounted for both history and detail routes; the five prerendered detail records and their not-found boundary retain one header, one main landmark, and one footer after the shell move
- `getTripsHistoryData` keeps expected outcomes as explicit feature-local return values: `_demo=empty` returns a valid empty booking array, `_demo=error` returns the recoverable failure, and the normal route returns the six deterministic fixtures; `_demo=unexpected-error` deliberately throws only to exercise the real Next.js boundary
- The real route-level `loading.tsx` and the stable `_demo=loading` review URL render the exact same `TripsHistorySkeleton`; no artificial delay, timer, request, spinner overlay, or alternate loading design was introduced
- The skeleton preserves the ledger masthead, four-part status index, first history chapter, and representative record geometry on paper/linen surfaces; it exposes `aria-busy`, a polite screen-reader status, sharp muted blocks, and the existing global reduced-motion behavior
- Empty history keeps all four status categories visibly at `00`, explains that the state contains no deterministic records, and offers one primary discovery path plus an explicitly labelled return to the populated prototype ledger; it makes no account or live-history claim
- The expected error keeps status counts unavailable, uses the destructive token only for the interruption signal, exposes an assertive alert and a direct retry link, and states that retrying cannot change reservation data
- The unexpected boundary uses Next.js 16.2's `unstable_retry` for real exceptions; review-fixture recovery first removes `_demo` with `location.replace`, so both retry paths return to populated `/trips` instead of looping on the injected fault
- The Refero reference lock keeps Kobu and Christopher Ireland Creative's warm, ruled editorial-ledger foundation; borrows Tripadvisor and Uber's direct zero-state hierarchy, Rivian's concise loading reassurance, and Mews' precise recovery language; and rejects centered generic cards, illustrations, account sidebars, marketplace tabs, brand-blue controls, full-screen spinners, shadows, live-account claims, and retry actions that silently mutate other state
- The app-builder workflow kept the unit inside the existing frontend Trips boundary: the route remains thin, the state contract and components are feature-local, booking fixtures stay in central mock data, and no Zustand store, persistence layer, account model, network client, reservation service, or payment-provider abstraction was added
- Verified with lint, TypeScript, `git diff --check`, a successful Next.js 16 production build, and production Chrome QA across all five states at 1440×1100, 390×844, and 320×800: each state has one header/main/footer/H1, no duplicate IDs, no horizontal overflow, no client-console errors, visible focus, 44px+ new actions, correct status/alert/busy semantics, and zero axe WCAG 2.2 A/AA violations; the two inherited axe indeterminate checks remain limited to global header/footer ARIA and blended-color nodes
- Both recovery paths were exercised through their real controls and return from their flagged URLs to populated `/trips`; the Casa Serein detail route was rechecked after the layout refactor and retains its metadata, one-shell structure, and record H1

Important limitation: every state is a deterministic frontend presentation. Empty and expected-error results do not come from an account or request, `_demo=unexpected-error` intentionally creates a server-side review exception, and none of the states read, create, retry, cancel, charge, refund, or persist a reservation.

### Curation/about page

- A new static `/about/curation` route explains LumaStay's selection philosophy inside the shared header/footer shell without introducing client state, data fetching, or a parallel about-page system
- The manifesto-led masthead, close-reading study, four-pass standards ledger, asymmetric evidence gallery, explicit boundaries, and final collection/journal paths keep the page distinct from the destination atlas and publication-style Luma Edit
- The editorial framework focuses on place, coherent character, room truth, and practical clarity while explicitly rejecting star-score positioning, certification language, live-review-network claims, and any suggestion that prototype fixtures are verified inventory
- Existing central-catalog media supplies one licensed Mediterranean study and three generated setting, room, and ritual references; no new image was generated, downloaded, or duplicated outside the media catalog
- The reference lock uses Christopher Ireland Creative's warm parchment, oversized editorial typography, sharp rules, and contained photography as the foundation; Kobu's mono hospitality folios, mono's visible standards grid, BelArosa's single forest/brass chapter, New Balance's image/text cadence, and Hers' readable standards structure are borrowed without corporate mission cards, icon badges, fake reviewer credentials, or dense prose walls
- The app-builder workflow keeps the route thin and the surface feature-local under `src/features/curation`; the existing homepage and footer curation links now resolve normally, while every call to action points only to implemented `/search` and `/edit` routes
- Verified with lint, TypeScript, `git diff --check`, a successful Next.js 16.2 production build, and production Chromium QA at 1440×1000 and 390×844: all four images decode after native lazy loading, in-page anchors clear the sticky header by 112px, new controls measure 48–72px, keyboard focus and hover feedback remain visible, the semantic snapshot exposes one H1 and six labelled regions, both viewports have zero horizontal overflow, and the console, page-error, and failed-request logs are clean

Important limitation: the page describes the editorial standard the interface is designed toward, not a current hotel inspection or certification program. All shown stays, prices, policies, reviews, availability, booking outcomes, generated media, and licensed stock associations remain prototype fixtures rather than live or verified inventory.

### Support/contact experience

- A new static `/support` route places a clearly scoped help experience inside the shared header/footer shell, with route-level metadata and normal prefetch behavior for the existing homepage and footer support links
- The page moves from an editorial masthead and four-part scope ledger into booking, cancellation, mock-payment, and Trips/saved chapters; eleven native disclosure rows keep the answers server-rendered, keyboard-operable, and available without a client accordion dependency
- Every answer is grounded in the current frontend contract: booking and confirmation remain memory-only, room availability and prices are deterministic, cancellation outcomes are read-only fixtures, mock payment never contacts a provider, Saved stores only property IDs locally, and Trips does not ingest the session confirmation
- The contact section deliberately prepares rather than sends: one isolated client leaf collects a topic, contact email, optional `LUMA-MOCK` or `LUMA-ATTEMPT` reference, and a bounded description, then creates a focusable local summary labelled `Prepared locally / Not sent`
- React Hook Form and Zod provide first-invalid-field focus, a counted alert, inline errors, email/reference validation, and a 24–1,200 character message boundary; the optional clipboard action normalizes the mock reference and preserves the not-sent disclosure
- No network request, Server Action, support address, phone number, chat, attachment, response schedule, store, URL state, persistence layer, account model, timer, or delivery confirmation was introduced; editing the form clears a stale prepared result
- The Refero reference lock uses Rivian's topic-first support hierarchy as the behavioral foundation, Christopher Ireland Creative's sharp editorial ledger as the visual translation, and Explore's focused two-column composer for form hierarchy; hero search, category cards, chat/phone/email promises, service hours, attachments, and “message sent” confirmation were rejected
- The app-builder workflow kept the route thin and static, feature content under `src/features/support`, validation under a feature-local library, and client JavaScript limited to the note composer and clipboard interaction
- Verified with lint, TypeScript, `git diff --check`, a successful Next.js 16.2 production build, and production Chromium QA at 1440×1000, 390×844, and 320×800: the route has one H1/main and no duplicate IDs, all eleven disclosures operate, both index and footer hash links clear the sticky header, invalid and prepared-result focus handoffs pass, clipboard content retains its disclosure and normalized reference, new targets measure 48–222px, all viewports have zero horizontal overflow, and the console/page-error logs are clean

Important limitation: this is a self-service explanation and local note formatter, not a support channel. It cannot receive, deliver, queue, store, respond to, or resolve a request; it is not appropriate for emergencies or live reservation, payment, account, or property help.

### Route metadata and social previews

- One typed metadata model in `src/config/metadata.ts` now owns the site origin, root metadata, canonical composition, social-image URLs, and the three explicit indexing policies instead of repeating partial objects across routes
- Root metadata now supplies the title template, frontend-honest description, application/author/publisher identity, canonical URL, format-detection policy, Open Graph/Twitter cards, and large-preview crawler directives; every implemented child route adds a canonical, route-specific title/description, social copy, and explicit robots policy
- `/`, `/destinations`, `/edit`, `/about/curation`, `/support`, and the fictional Casa Serein folio remain indexable; `/search` canonicalizes all query variants to `/search` and uses `noindex, follow`; browser-local `/saved`, all booking steps, `/trips`, and every fixture trip detail use `noindex, nofollow, nocache`
- Dynamic property metadata identifies Casa Serein as fictional and discloses that no live availability exists; dynamic trip metadata is derived only from the fixture ID, property name, and status, never from guest names, mock references, card digits, prices, or other record details
- The dynamic `/social-preview` image endpoint returns a cached 1200×630 PNG from bounded query text with no external runtime media or font request; one sharp paper/forest/brass folio language adapts to each route while keeping `Frontend prototype / No live inventory` visible
- Production origins resolve from `NEXT_PUBLIC_SITE_URL`, then Vercel's production/deployment hosts, and finally `http://localhost:3000` for local review; invalid protocols and URL paths are discarded so canonicals stay on one normalized origin
- The reference lock keeps Kobu and Christopher Ireland Creative's warm, shadowless editorial restraint as the foundation, borrows Mercury's split-frame hierarchy and Waka Waka's poster geometry, and rejects gradients, rounded preview cards, invented destination photography, decorative iconography, and social copy that implies live inventory or a user account
- The app-builder workflow kept route files declarative, centralized framework-specific metadata under `src/config`, bounded the image handler at the route edge, and avoided new packages, client JavaScript, persistence, networking, or duplicated fixture content
- Verified with lint, TypeScript, `git diff --check`, a successful Next.js 16.2 production build, rendered-head checks across 14 representative route policies, restrictive metadata on both dynamic not-found boundaries, a fixture-sensitive metadata leak assertion, PNG response/header and 1200×630 dimension checks, and visual inspection of the home, property, and support card variants after correcting the forest-rail wrap

Important limitation: a deployed build must set `NEXT_PUBLIC_SITE_URL` or expose one of the supported Vercel host variables before social links are published. Without one, canonical and preview URLs intentionally point to `http://localhost:3000`; the cards remain generated prototype media and do not certify or advertise real properties, prices, availability, bookings, accounts, or support services.

### Final mobile navigation and responsive review

- The final five-width review now covers the global header and navigation, every implemented route family, search and filter states, property and room surfaces, the full booking shell, saved/trips ledgers, and representative recovery routes at 375×812, 390×844, 768×1024, 1024×768, and 1440×1000
- The mobile navigation sheet now honors its declared responsive geometry instead of losing to the shared sheet's base width utilities: it fills 375px and 390px phone viewports, resolves to the intended 28rem rail at 768px, retains body scroll lock, and returns focus to the 44px trigger after dismissal
- The menu wordmark/home link now has a 44px hit area without changing its typography or the 88px header rhythm; primary links remain 80px or taller and Saved/Trips shortcuts remain 96px tall
- The homepage closing CTA now receives four grid columns between 1024px and 1279px, preventing its 256px minimum width from extending past the document while restoring the original three-column composition at `xl`
- Narrow four-column atlas cards stack country metadata between 1024px and 1279px, removing the Graubünden/Switzerland overrun while restoring the side-by-side caption at `xl`; the page's established asymmetric editorial composition remains otherwise unchanged
- The established sticky contract remains intact at every width: the global header stays at `top: 0`, the selected-room summary stays directly below it at 88px, desktop navigation begins at 1024px, and mobile/tablet navigation remains available below that breakpoint
- The app-builder workflow kept this as a corrective quality unit: no route, component system, store, fixture, package, persistence boundary, or visual language was added; only four reproducible responsive defects changed
- The browser-automation workflow verified 80 production route/viewport layouts and 25 stateful surface checks. The latter exercised mobile search-filter sheets, fullscreen property galleries, room selection, the sticky summary, populated review and guest-details steps, and the populated payment form at all five widths
- Final production results are zero layout, interaction, console, page, and non-cancelled request failures; every checked page retains one main landmark and one H1, all visible images decode, all tested dialogs stay inside the viewport with focus return, and all four payment inputs remain visible at 48px tall
- Verified with `npm run check`, `git diff --check`, two successful Next.js 16.2 production builds, the full 80-layout matrix, the 25-check stateful journey, and visual screenshot review of the navigation sheet, search filters, galleries, sticky booking summary, 1024px overflow fixes, and payment form across the required widths

Important limitation: this review covers the five roadmap viewports and the deterministic frontend states available in the local production build. It does not claim device-lab coverage, live-network behavior, real reservation data, or the separate accessibility, performance, end-to-end, and final production audits reserved for roadmap items 43–46.

### Full accessibility and reduced-motion review

- Every rendered page state now exposes one visible `main` landmark with the consistent `#main-content` target; a root-level, reduced-motion-safe skip link is the first keyboard stop and transfers focus to that target across ordinary, loading, error, not-found, booking, saved, and Trips states
- The complete keyboard matrix covers 24 route/state cases at 390×844 and 1440×1000. All 48 checks reach every expected tab stop in DOM order with a visible focus indicator; closed native-disclosure content remains correctly excluded from the tab sequence
- Manual widget journeys confirm combobox Arrow/Home/End/Escape behavior, mobile-navigation and search-sheet focus containment/return, fullscreen-gallery Home/End/Escape behavior, native room-radio arrow movement, support disclosure activation, and first-invalid-field focus on both guest and mock-payment forms
- The homepage destination combobox now exposes a visible `focus-within` ring, and its `aria-controls` relationship exists only while the popup is mounted; explanatory currency text uses native abbreviations, while named non-landmark containers now use explicit group semantics and redundant ARIA on visible rating copy was removed
- Support, room, and nearby-place description lists now group only valid `dt`/`dd` content without changing their established grids; all audited pages retain one H1, valid heading progression, no duplicate IDs, no positive tab indices, complete image alternatives, and resolved ARIA references
- Small brass copy on paper/linen now uses the dark text role (`#865f30`), measuring 5.49:1 on paper and 5.01:1 on linen; bright brass remains available on forest surfaces. Low-opacity forest text was raised to the 4.5:1 threshold, and status, ordering, and experience labels over imagery now use stronger forest veils or opaque backing so contrast does not depend on a favorable photo pixel
- Forced-colour fallbacks remain intact. With `prefers-reduced-motion: reduce`, Chromium reports the preference, document scrolling changes from smooth to auto, and the maximum visible animation/transition duration collapses from 500ms to 0.01ms; dialog, gallery, save-feedback, and skeleton behavior remain usable without meaningful motion
- The automated production matrix performs 48 mobile/desktop route-state scans plus 18 populated Saved and room-to-confirmation scans. All 66 return zero axe WCAG 2.0/2.1/2.2 A/AA violations, zero semantic/bypass failures, and zero unexpected console, page, or request failures; the expected global-404 resource responses remain the only logged 404s
- Verified with `npm run check`, `git diff --check`, repeated successful Next.js 16.2 production builds, the 48-check keyboard/focus matrix, the 48-scan route/state axe matrix, the 18-scan populated Saved/booking matrix, manual contrast calculations and image-overlay review, and reduced-motion emulation at both preference settings

Important limitation: this is a deterministic Chromium and source review rather than assistive-technology certification or a physical-device lab. It does not claim coverage of every browser/screen-reader pairing, user-authored content, live inventory, third-party widgets, or network-dependent production behavior; performance, end-to-end, and final production audits remain roadmap items 44–46.

### Image loading, bundle, and Core Web Vitals review

- A controlled production Chromium matrix now covers Home, Search, Casa Serein, populated Saved, Trips, Support, Destinations, Luma Edit, Curation, and one fixture trip detail at 390×844 and 1440×1000; each cold browser context runs with 4× CPU slowdown, 1.6 Mbps throughput, 150ms latency, blocked service workers, and reduced motion
- The measured budgets are LCP at or below 2.5s, CLS at or below 0.10, and a lab interaction-duration surrogate at or below 200ms; final results peak at 2.352s LCP on the desktop Home hero, 1.840s LCP on mobile Casa Serein, 0.000 CLS everywhere, and 88ms interaction duration
- The Home hero now requests an exact 1440px candidate at desktop width, uses explicit eager/high-priority discovery, and receives the sole quality-40 exception under the existing dark veil; its encoded image payload falls from 141KB at the first right-sized quality-75 pass to 88KB, while repeated 1440px and 390px visual inspection shows no visible compression or crop regression
- Casa Serein's lead-gallery `sizes` contract now follows the rendered seven-column width rather than overstating it at 58vw; the desktop candidate falls from 1080px to 828px and its throttled LCP improves from 2.880s to 2.072s
- Deprecated `priority` usage and false preloads were removed from Search, Destinations, Luma Edit, and Curation because measured LCP attribution stayed on their headings; populated and empty Saved imagery no longer forces eager loading, while the genuine property-gallery and trip-detail LCP preloads remain
- The Home's below-fold curated-stay images retain native lazy loading and now declare low fetch priority so the hero owns the constrained connection; all other editorial/property imagery remains at the default quality 75
- Global header and mobile-menu links now opt out of speculative route prefetch, preventing the Home/search/Saved/Trips client trees from downloading merely because global navigation is visible; compressed desktop JavaScript transfer drops from 424.8 to 325.6KiB on Home, 503.3 to 409.0KiB on Casa Serein, 424.8 to 269.1KiB on Saved, 515.5 to 297.9KiB on Support, and 416.5 to 217.8KiB on the mostly server-rendered image-led pages
- The final route ceiling is 409.0KiB of compressed initial JavaScript on the interaction-heavy property page; the separate Turbopack module graph remains available through `next experimental-analyze --output`, and no new package or client boundary was added
- A separate lazy-image journey scrolls all visible imagery across seven image-heavy routes at both viewports: 68 of 101 visible images are initially deferred, every one requests and decodes when brought into view, and the matrix records zero decode, console, or non-cancelled request failures
- Verified with repeated Next.js 16.2 production builds, `npm run check`, Turbopack's experimental bundle analyzer, the 20-case throttled route-family matrix, the 14-case lazy-image scroll matrix, and repeated desktop/mobile hero screenshots

Important limitation: these are deterministic local Chromium lab measurements, not field Core Web Vitals or a device/CDN certification. The image optimizer variants were warmed before the final comparison so the results isolate browser delivery rather than one-time local encoding; real-user p75 data, deployment compression/CDN behavior, cache-miss frequency, other browsers, and physical devices still need production monitoring.

### End-to-end mock booking-flow QA

- The complete production journey now has an explicit browser-verified contract from the Home hero through Search, Casa Serein, room selection, Review, Guest details, mock Payment, and Confirmation at 1440×1000 and 390×844
- The primary path preserves the hero's canonical `2026-09-18` to `2026-09-21` stay intent, selects Garden Room, derives the shared ₹129,252 total, saves the normalized lead guest, prepares only a masked `4242` test-card summary, and creates the deterministic `LUMA-MOCK-CS-GR-260918` interface record
- Alternate navigation is verified rather than assumed: Review → Change room restores the selected native radio after client hydration, switching to Sea Terrace Room recalculates the total to ₹158,148, returning to Garden Room restores ₹129,252, and Edit dates or guests retains both canonical dates through Search and browser history
- Guest details survive the Guest details → Review → Guest details round trip with the payment action still correctly gated by a saved, unchanged draft
- All three documented payment outcomes run through their real controls: security code `000` declines and returns focus to an empty first field, `999` interrupts and retries from the masked summary alone, and `123` prepares the direct success state
- During every mock attempt the payment controls disable while processing, the full card number and security code clear immediately, and only the cardholder name, `4242` suffix, and normalized expiry remain in the rendered prepared result
- Confirmation reload removes the memory-only itinerary and reference as designed; fresh direct visits to Review, Guest details, Payment, and Confirmation expose their deliberate recovery ledgers instead of reconstructing a stay or implying persistence
- The browser-automation workflow used isolated fresh contexts and user-facing roles/labels, waited on actual state and decoded-image conditions rather than fixed sleeps, and finished 45 explicit assertions with one main landmark, one H1, zero horizontal overflow, decoded visible imagery, and zero console warnings/errors, page errors, failed requests, or HTTP error responses
- The optimized baseline also passes `npm run check` and a successful Next.js 16.2 production build; visual review of the desktop and mobile confirmation captures found no clipping, hierarchy drift, sticky-header collision, or unexpected marketplace styling
- No application code, fixture, dependency, persistence boundary, or product scope changed in this audit; the completed flow already met the intended deterministic frontend contract

Important limitation: this QA covers deterministic local Chromium behavior and the documented mock outcomes, not real payment authorization, reservation inventory, server persistence, email delivery, account history, other browser engines, physical devices, or an external production deployment.

### Final visual-consistency and production-build audit

- The final production matrix covers 21 implemented route or representative state cases at 390×844 and 1440×1000, then repeats six high-risk families—Home, Search, Casa Serein, Support, Trips, and booking recovery—at 375×812, 768×1024, and 1024×768 for 60 settled surface checks in total
- Covered states include every public editorial route, Search success/no-results/empty/error, the Casa Serein property, Saved empty, Trips populated/empty/error, one trip detail, all four direct-access booking recoveries, the property missing boundary, and the global 404
- Every settled page exposes one `#main-content`, one H1, no duplicate IDs, complete image alt attributes, decoded eager/visible imagery, the expected Jost body and Jost/Bodoni heading families, the paper theme/background contract, the 88px header plus its one-pixel rule, one labelled global destination footer, and zero horizontal overflow at every audited width
- Console, page-error, failed-request, and subresource checks finish clean across the matrix; the deliberately requested global 404 document response is the only expected browser 404 signal
- Human review of paired desktop/mobile captures for Home, Search, Casa Serein, Curation, Support, Saved empty, Trips, and Payment recovery confirms consistent paper/linen/forest sequencing, sharp image framing, restrained brass, ruled ledgers, typography hierarchy, mobile collapse, and honest recovery-state presentation without generic marketplace cards or palette drift
- The source-level consistency review finds no blue/purple/orange design-system intrusion, arbitrary card shadows, or new rounded-panel language; remaining raw colours are limited to the central token definitions, the generated social-preview palette, established dark-image/gallery overlays, and accessibility-safe inverse accents
- The link inventory contains 45 unique internal destinations with no `undefined`, `null`, `NaN`, empty-fragment, or script URLs; 12 deliberate not-found destinations remain confined to the documented planned About/legal pages and property summaries without full fixtures
- `npm run check` passes, and the final Next.js 16.2 Turbopack build succeeds with all 22 generated page outputs when `NEXT_PUBLIC_SITE_URL=https://lumastay.example` is supplied as a representative HTTPS production origin
- The built Home response uses that HTTPS canonical, Open Graph URL, and social-preview URL; Search canonicalizes to `https://lumastay.example/search` without query state and retains `noindex, follow, nocache`; the dynamic social-preview endpoint returns HTTP 200, `image/png`, the intended cache policy, and exact 1200×630 dimensions
- The browser-automation workflow was used for isolated contexts, user-visible state checks, real font/image readiness, and responsive captures. No application code, dependency, fixture, route, product claim, persistence boundary, or visual language changed during this final audit

Important limitation: this is a local optimized-build and Chromium release audit using a representative HTTPS origin, not a hosted deployment, cross-browser/device lab, penetration test, live-data certification, or real-user monitoring program. A real deployment must set its actual `NEXT_PUBLIC_SITE_URL`; the 12 intentionally planned destinations will continue to reach branded not-found states until separately implemented.

## Current homepage order

`src/app/page.tsx` renders:

1. `SiteHeader`
2. `LandingHero`
3. `CuratedStays`
4. `ExperienceCollections`
5. `BookingConfidence`
6. `ClosingBookingCta`
7. `SiteFooter`

The implemented routes are `/`, `/about/curation`, `/destinations`, `/edit`, `/search`, `/saved`, `/support`, `/trips`, the five fixture-backed `/trips/[id]` reservation paths, `/properties/casa-serein`, `/booking/review`, `/booking/guest-details`, `/booking/payment`, and `/booking/confirmation`. Other property slugs and navigation links to planned pages use the branded not-found state until their routes are built.

## Current mock-data state

- `mockProperties`: 12 property summaries with local property-type, facility, and atmosphere tags; the homepage intentionally renders the first 3
- `mockPropertyDetails`: 1 full property fixture for Casa Serein, composed from its existing summary, five central-catalog gallery media IDs, 3 sourced facility details, 4 house-policy entries, 4 practical entries, and a Ravello location ledger
- `mockDestinations`: 7 destination summaries shared by `/destinations` and the hero autocomplete
- `mockEditorialStories`: 7 editorial story summaries used by `/edit`
- `mockRooms`: 3 Casa Serein room tiers with 6 central-catalog media references, occupancy, beds, size, facilities, INR nightly pricing, explicit rate inclusions/exclusions, structured cancellation policies and charge percentages, and typed availability; 2 are selectable and Serein Suite is explicitly unavailable in the interface preview
- `mockBookingPricingPolicy`: one INR interface fixture with a 12% estimated-tax rate and ₹900 service fee per room; it is deliberately not sourced from live tax or property data
- `mockBookings`: 6 deterministic history records anchored to `2026-08-09`: 2 upcoming, 2 completed, 1 cancelled with a full mock refund, and 1 payment-failed attempt with no booking reference
- No live availability, date-sensitive room pricing, tax/fee provider, complete facility catalog, booking, payment provider, account history, or durable user-generated confirmation record exists
- `src/stores/booking-store.ts` contains the memory-only cross-route stay and lead-guest draft, fully derived mock pricing/cancellation summary, and an immutable session confirmation snapshot created only from a prepared mock-payment result; full card and security values never enter the store
- `src/stores/saved-stays-store.ts` contains the separate versioned browser-local property-ID collection used by every saved control and the `/saved` collection page
- `src/features/trips/index.ts` exports the server-rendered Trips history, state surface, content-shaped skeleton, and individual detail page; their records, state contract, and deterministic formatting remain feature-local while the typed fixtures stay in the central mock-data boundary

## Commit history

```text
a10a71f test: complete mock booking flow audit
45e997b perf: complete image and web vitals audit
37eead1 fix: complete accessibility audit
f77a9e9 fix: complete responsive navigation audit
e1c8454 feat: add route metadata previews
f1962c9 feat: add support experience
ce28337 fix: add property stay date selection
7a82767 fix: preserve hero dates for curated stays
443b416 feat: add trip booking details
fc58f3f feat: add trips history page
46143ed feat: add mock booking history
1acfe24 feat: add saved empty state and undo
83457f4 feat: add saved stays collection
0dc6fda feat: persist saved stays
9b4e0d8 feat: add mock booking confirmation
ff36c89 feat: add mock payment recovery states
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
31. ~~Booking confirmation page with mock reference and itinerary summary~~ Complete

### Phase 5 — Saved properties and trips

32. ~~Persistent mock saved-state store, preferably Zustand with local persistence~~ Complete
33. ~~Saved properties page at `/saved`~~ Complete
34. ~~Saved empty state and remove/undo behavior~~ Complete
35. ~~Mock booking-history fixtures~~ Complete
36. ~~Trips/history page at `/trips` with upcoming, completed, cancelled, and payment-failed states~~ Complete
37. ~~Individual booking-detail page~~ Complete
38. ~~Booking-history empty, loading, and error states~~ Complete

### Phase 6 — Supporting pages and final quality

39. ~~Curation/about page for `/about/curation`~~ Complete
40. ~~Support/contact experience for `/support`~~ Complete
41. ~~Complete route-level metadata and social previews~~ Complete
42. ~~Final mobile navigation and responsive review at 375, 390, 768, 1024, and 1440 widths~~ Complete
43. ~~Full keyboard-navigation, semantic-structure, contrast, and reduced-motion review~~ Complete
44. ~~Image loading, bundle, and Core Web Vitals review~~ Complete
45. ~~End-to-end mock booking-flow QA~~ Complete
46. ~~Final visual-consistency and production-build audit~~ Complete

## Recommended immediate next step

The planned LumaStay frontend roadmap is complete through Phase 6 item 46. The next safe product step is deployment preparation: set the real `NEXT_PUBLIC_SITE_URL`, deploy the existing frontend without changing its mock-data claims, and add field monitoring; backend inventory, authentication, payment, messaging, and account history remain out of scope unless the user explicitly starts a new roadmap.
