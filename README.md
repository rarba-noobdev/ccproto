# Challenger Computers

Premium Indian gaming PC builder and component storefront built with React, Vite, TailwindCSS, Framer Motion, Supabase, and Firecrawl-sourced product data.

The current design intentionally moved away from generic neon/cyberpunk UI. It now uses a consistent retail-dark ecommerce system: real product imagery, INR pricing, source links, dense filters, trust cues, and admin inventory views.

## Stack

- React 18 + Vite
- TailwindCSS
- React Router
- Framer Motion
- Zustand persisted cart/wishlist/auth/builds
- Recharts for admin charts
- Supabase database
- Firecrawl MCP/API for MD Computers scraping

## Data

Supabase project: `CCPROTo`

Seeded tables:

- `components`: real scraped component rows with category, brand, image, source URL, INR price, MRP, discount, score, and tier
- `prebuilts`: curated PC builds referencing component rows
- `benchmarks`: benchmark rows by game/build
- `testimonials`: verified customer-style content
- `posts`: buying guide content
- `orders`: admin-ready order table

Firecrawl was verified against MD Computers. Some MD Computers category pages include mixed carousel products, so the parser/database filters category names before seeding.

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
| `/` | Retail homepage with real prebuilts, live catalog products, benchmarks, testimonials, and guides |
| `/build` | Supabase-backed custom PC builder with price, wattage, score, and bottleneck logic |
| `/prebuilt` | Prebuilt gaming PCs from real component references |
| `/gaming-pcs` | Full component catalog |
| `/workstations` | Creator/workstation builds |
| `/accessories` | Upgrade-focused parts catalog |
| `/category/:category` | Direct category catalog route |
| `/blog` | Buying guides from Supabase |
| `/about` | Trust/system story |
| `/contact` | Enquiry page |
| `/auth` | Demo login/admin entry |
| `/dashboard` | User cart/wishlist/saved builds |
| `/admin` | Supabase-backed admin dashboard |

## Notes

- Dark mode is default.
- The Supabase client is in `src/lib/supabase.js`.
- Shared retail UI lives in `src/components/retail`.
- The old generic cyberpunk components are no longer used by the routed app.
