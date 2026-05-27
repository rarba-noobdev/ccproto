# Challenger Computers

Minimal PC builder and component storefront built with React, Vite, TailwindCSS, Framer Motion, Zustand, and Recharts.

The interface is intentionally quiet: reduced copy, icon-first controls, polished dark surfaces, and responsive layouts for a premium buying experience.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Build

```bash
npm run build
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Curated homepage |
| `/build` | Custom PC builder |
| `/prebuilt` | Ready systems |
| `/gaming-pcs` | Parts library |
| `/workstations` | Studio builds |
| `/accessories` | Upgrades |
| `/category/:category` | Category view |
| `/blog` | Guides |
| `/about` | Brand story |
| `/contact` | Enquiry |
| `/auth` | Demo login |
| `/dashboard` | Customer dashboard |
| `/admin` | Operations dashboard |

## Structure

- `src/components/retail`: shared layout, cards, page headers, catalog grid
- `src/pages`: routed app screens
- `src/lib/supabase.js`: data client
- `src/store/useStore.js`: persisted cart, wishlist, auth, and saved builds
