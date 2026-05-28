# Project Summary

## Purpose

This is a React + Vite custom PC builder/storefront for Challenger Computers. The target product direction is a premium, professional gaming PC commerce site, not a generic neon/cyberpunk mockup. The user wants the UI to feel consistent, dense enough for real shopping, and based on real catalog data rather than placeholders.

## Stack

- React + Vite
- React Router
- TailwindCSS with custom CSS tokens in `src/index.css`
- Framer Motion for page/section/menu animations
- Zustand for local cart, wishlist, saved builds, and demo auth state
- Supabase for database-backed catalog, prebuilts, testimonials, posts, orders
- Recharts for admin dashboard charts

## Supabase

Project:
- Project ID/ref: `pvzgvprimajvolfpurqk`
- URL is configured in `src/lib/supabase.js`
- Public anon key is currently hardcoded in `src/lib/supabase.js`

Important tables used by the app:
- `components`
- `prebuilts`
- `orders`
- `testimonials`
- `benchmarks`
- `posts`

Main data loaders:
- `fetchHomeData()`
- `fetchComponents(category)`
- `fetchPrebuilts()`
- `fetchAdminData()`

All data-driven route pages should guard against unexpected non-array responses. Several pages already normalize data with `Array.isArray(...) ? ... : []`.

## Scraped Data Context

Real catalog data was scraped and seeded. Local scrape artifacts exist under `scrape_cache/`, including:
- `products.json`
- `01_components.sql`
- `02_prebuilts.sql`
- parser/generator scripts

Latest replacement pass:
- `scripts/scrape_catalog_replacements.cjs` uses the Firecrawl HTTP API and expects `FIRECRAWL_API_KEY`.
- It scrapes ready systems plus cabinet, air cooler, PSU, storage, and DDR5 RGB memory sources.
- It writes ignored artifacts to `scrape_cache/replacement_*.md`, `replacement_products.json`, and `03_replacements.sql`.
- Supabase has a `replace_catalog_replacements(jsonb)` RPC used to delete old prebuilts plus `ram`, `storage`, `cooler`, `psu`, and `case` rows before inserting replacements.
- `prebuilts` now has `image` and `source_url` columns.

Do not mention the scraped source website in public UI copy. The user explicitly asked that the website should read as their own brand.

## Current Routes

Routes are defined in `src/App.jsx`:
- `/`
- `/build`
- `/prebuilt`
- `/gaming-pcs`
- `/workstations`
- `/accessories`
- `/category/:category`
- `/about`
- `/contact`
- `/blog`
- `/auth`
- `/dashboard`
- `/admin`

`RetailLayout` is the active layout used by routed pages. Legacy components under `src/components/home` and `src/components/layout` may still exist but are not the main routed layout.

## Design Direction

The active design system is light, restrained, and commerce-focused:
- Warm off-white canvas
- White and soft-gray surfaces
- Very limited blue accent for focus/selected states
- Rounded but not playful
- Compact premium retail cards
- Minimal copy, visual hierarchy, icons, and real product imagery

Primary CSS tokens and reusable classes live in `src/index.css`:
- `--canvas`
- `--surface-1`
- `--surface-2`
- `--line`
- `--ink`
- `--ink-muted`
- `.panel`
- `.surface`
- `.home-card`
- `.btn-primary`
- `.btn-secondary`
- `.icon-btn`
- `.select-trigger`
- `.select-menu`

Use the existing classes before adding new one-off styling.

## Recent UI Changes

### Navbar

File: `src/components/retail/RetailLayout.jsx`

The navbar has a category-led `Shop` mega menu:
- Systems
- Core components
- Setup gear

It uses Framer Motion for enter/exit, closes on Escape/outside click, and uses a solid dark menu surface so the hero does not bleed through.

### Custom Dropdowns

File: `src/components/ui/SelectMenu.jsx`

Native `<select>` controls were replaced with a custom dropdown. Current usage:
- `src/pages/Prebuilt.jsx`
- `src/components/retail/CatalogGrid.jsx`

Run `rg "<select|<option" src` to ensure native selects do not return.

### Home Page

File: `src/pages/Home.jsx`

The home page is mid-redesign for consistency. It currently contains:
- Hero section
- Category strip
- Ready builds
- Instagram/reels-inspired section using real public reel links
- Pick-a-lane advisor and component picks
- Standards/CTA band
- Testimonials

The latest user complaint was that the home page does not feel consistent. A pass was started to normalize cards:
- Hero feature card changed toward clean product well
- System cards moved toward clean catalog card style
- Reel cards moved toward the same product-card visual language
- CTA spotlight is being toned down from gradient to dark card

Continue this consistency pass if needed. Keep all home cards using similar:
- `rounded-[24px]` to `rounded-[34px]`
- dark outer card
- light product image well only where images need clean presentation
- compact text and consistent spacing

### Prebuilt Cards

File: `src/pages/Prebuilt.jsx`

The prebuilt cards were made progressively smaller after user feedback. Current direction:
- Compact two-column card
- Light product image well
- Small image column
- Tight title/price/spec/metric layout
- `Add to cart` behavior unchanged

The user specifically disliked oversized cards and over-designed image backgrounds. Keep them compact and professional.

### Build Page

File: `src/pages/BuildPC.jsx`

The builder was redesigned as a configurator:
- Step tabs
- Sticky build preview
- Part selection grid
- Live price, score, wattage, PSU estimate
- Compatibility/bottleneck indicators

It uses Supabase components.

### Admin Dashboard

File: `src/pages/AdminDashboard.jsx`

Uses Supabase admin data and Recharts. Keep it clean and SaaS-like, not marketing-heavy.

## Instagram/Reels Section

Instagram blocks direct media scraping and Firecrawl does not support Instagram scraping. Public indexed reel URLs were used instead:
- `https://www.instagram.com/challenger_computer/reels/`
- `https://www.instagram.com/reel/DYtYJUcPe4x/`
- `https://www.instagram.com/reel/DCO76Ijy-ff/`
- `https://www.instagram.com/reel/Cv4SeUgvNtN/`

Do not fake downloaded video assets unless the user provides media files. Use verified public links or provided assets.

## Dev Server Notes

The app has been run on port `5174`. There was a Windows localhost issue where Vite listened only on IPv6 `::1`. Restarting with host binding fixed it:

```powershell
node node_modules/vite/bin/vite.js --host 0.0.0.0 --port 5174
```

Verified URLs:
- `http://localhost:5174/`
- `http://127.0.0.1:5174/`

## Verification Commands

Build:

```powershell
npm run build
```

Route smoke check:

```powershell
$routes = @('/','/build','/prebuilt','/gaming-pcs','/workstations','/accessories','/category/ssd','/category/laptop','/category/graphic-card','/blog','/about','/contact','/auth','/dashboard','/admin')
foreach ($r in $routes) {
  try {
    $res = Invoke-WebRequest -UseBasicParsing "http://localhost:5174$r" -TimeoutSec 10
    "$r $($res.StatusCode)"
  } catch {
    "$r ERROR $($_.Exception.Message)"
  }
}
```

## User Preferences

- Avoid AI-placeholder text and generic cards.
- Do not mention scraped/source vendor names in the UI.
- Light mode is the current default.
- UI should feel real, professional, and conversion-oriented.
- Use less text, more visual hierarchy.
- Avoid giant cards unless there is a strong reason.
- Keep pages consistent with the design system.
- The user prefers direct implementation over long explanations.
