# LumaStay

Premium, frontend-only hotel discovery and booking experience built with mock data.

## Foundation

- Next.js App Router, React, and TypeScript
- Tailwind CSS v4 design tokens
- shadcn/ui with Base UI primitives
- Motion with reduced-motion support
- React Hook Form and Zod
- Zustand for cross-route booking state
- date-fns and React DayPicker
- Embla Carousel
- Sonner notifications
- Lucide icons

## Commands

```bash
npm run dev        # Start the development server
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript without emitting files
npm run check      # Run lint and typecheck
npm run build      # Create a production build
```

## Site URL and social previews

Set `NEXT_PUBLIC_SITE_URL` to the deployed origin, for example
`https://example.com`, before creating a production build. Route canonicals and social
preview URLs use that value, then fall back to Vercel's production or deployment host,
and finally to `http://localhost:3000` for local review.

Every implemented route uses the shared metadata model in `src/config/metadata.ts`.
Public editorial routes are indexable, search query variants are `noindex, follow`, and
browser-local saved, booking, and trip surfaces are `noindex, nofollow`. The generated
1200×630 PNG at `/social-preview` uses route-specific copy and always discloses the
frontend-prototype scope.

## Architecture

```text
src/
├── app/                 # Thin route layer and route-level states
├── components/
│   ├── providers/       # Global client providers
│   └── ui/              # Shared, accessible UI primitives
├── config/              # Product and navigation configuration
├── data/                # Mock repositories and fixtures
├── features/            # Search, properties, booking, saved and trips
├── hooks/               # Shared React hooks
├── lib/                 # Framework-agnostic utilities
├── stores/              # Small cross-route client stores
├── styles/              # Brand and semantic design tokens
└── types/               # Shared domain contracts
```

Routes should remain thin. Product logic and feature-specific components belong in
`src/features/<feature>`, while only genuinely reusable primitives belong in
`src/components/ui`.

## Design system

Raw LumaStay brand values and semantic UI roles live in
`src/styles/tokens.css`. Tailwind mappings and global accessibility rules live in
`src/app/globals.css`.

The visual system uses:

- Bodoni Moda for editorial display typography
- Jost for interface and body typography
- Deep forest, warm linen, paper, ink, and restrained antique brass
- Sharp image frames, comfortable controls, and pill-shaped primary actions
- A minimum 44px target for primary controls

## Product scope

The planned frontend routes cover landing, search, property details, room selection,
booking, checkout, confirmation, saved properties, and booking history. Data, payment,
authentication, and availability are simulated locally; no backend is required.
