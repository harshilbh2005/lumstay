# LumaStay Project Handoff

Last updated: 27 July 2026

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
- React Hook Form and Zod for upcoming validated forms
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
- Typed local taxonomies extend the six-property fixture only far enough to exercise the filter combinations
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
- Valid filters that eliminate the six-property fixture now produce a dedicated no-results state while retaining the active filter rail, applied chips, sort order, destination, dates, guests, and rooms
- No-results recovery clears only the active filters and preserves the chosen order and original search intent
- Explicit mock repository outcomes expose reviewable collection-empty and recoverable-error states through `_demo=empty` and `_demo=error`
- Empty and error states replace the unusable filter controls with a plain collection-status rail and preserve valid search, filter, and sort parameters when retrying
- A route-level `/search/error.tsx` boundary handles unexpected render failures with the Next.js 16 `unstable_retry` recovery callback
- State messaging uses status or alert semantics, 44px-or-larger recovery controls, visible keyboard focus, sharp hairline geometry, and the existing paper, linen, forest, brass, and destructive token roles
- Verified at 1440×1000 and 390×844 across success, no-results, empty, recoverable-error, and injected unexpected-error paths with clean expected-state consoles, zero horizontal overflow, canonical recovery URLs, and successful retry behavior

Important limitation: empty and recoverable-error outcomes are deterministic presentation fixtures rather than real data-provider failures. The six-property collection still loads synchronously from local mock data.

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

## Current homepage order

`src/app/page.tsx` renders:

1. `SiteHeader`
2. `LandingHero`
3. `CuratedStays`
4. `ExperienceCollections`
5. `BookingConfidence`
6. `ClosingBookingCta`
7. `SiteFooter`

The implemented routes are `/`, `/destinations`, `/edit`, and `/search`. Navigation links to other planned pages will use the branded not-found state until their routes are built.

## Current mock-data state

- `mockProperties`: 6 property summaries with local property-type, facility, and atmosphere tags; the homepage intentionally renders the first 3
- `mockDestinations`: 7 destination summaries shared by `/destinations` and the hero autocomplete
- `mockEditorialStories`: 7 editorial story summaries used by `/edit`
- `mockRooms`: empty array
- `mockBookings`: empty array
- No full property-detail fixture yet
- No availability, price breakdown, complete facility catalog, cancellation-policy, review, guest, or checkout fixture yet
- `src/stores/index.ts` is intentionally empty
- Saved and trips feature indexes are scaffolds only

## Commit history

```text
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
14. Expand mock property data enough to exercise filtering and pagination/loading behavior

### Phase 3 — Property and room selection

15. Property details route at `/properties/[slug]`
16. Property hero summary, location, rating, pricing, and saved state
17. Responsive property image gallery
18. Fullscreen gallery lightbox with keyboard and touch navigation
19. Facilities, atmosphere, policies, practical details, and location sections
20. Room fixtures with distinct images, occupancy, beds, size, facilities, pricing, breakfast, and cancellation terms
21. Room selection cards/interface
22. Sticky booking summary/action panel
23. Property loading, not-found, error, and unavailable-room states

### Phase 4 — Booking and checkout

24. Cross-route booking store with dates, guests, property, room, and price summary
25. Booking review step
26. Guest-details form
27. Checkout and mock payment form
28. React Hook Form and Zod validation with accessible inline errors
29. Taxes, fees, inclusions, cancellation, and total-price breakdown
30. Submitting/loading, payment-failure, recoverable-error, and retry states
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

Expand the **mock property data enough to exercise filtering and pagination/loading behavior** as the next isolated feature. Decide the smallest useful collection size and pagination or incremental-loading model before editing fixtures, preserve the current taxonomy and editorial ordering rules, and keep all data local. Do not begin property details, room fixtures, booking, checkout, saved-state persistence, or trips in the same unit.
