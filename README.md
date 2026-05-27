# NexForge — Premium Gaming PC Builder

A full-featured, gamified React web application for a custom PC building company. Built with a cinematic dark/cyberpunk aesthetic and premium UX.

## Tech Stack

- **React 18** + **Vite 5**
- **TailwindCSS 3** — custom gaming color palette
- **Framer Motion** — page transitions, scroll animations, modal animations
- **GSAP** — hero text animation, PC float effect
- **React Router 6** — all pages with smooth transitions
- **Zustand** — cart, wishlist, builder state, auth (persisted)
- **Recharts** — admin revenue/category charts

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Pages

| Route | Page |
|-------|------|
| `/` | Home — Hero, Featured PCs, Benchmarks, Testimonials, FAQ |
| `/build` | PC Builder — Step-by-step with compatibility + FPS estimation |
| `/prebuilt` | All Prebuilt PCs with filtering |
| `/gaming-pcs` | Gaming PC catalog |
| `/workstations` | Workstation catalog |
| `/accessories` | Peripherals catalog |
| `/about` | Company story, team, stats |
| `/blog` | Blog/news hub |
| `/contact` | Contact form + info |
| `/auth` | Login / Register |
| `/dashboard` | User dashboard (orders, builds, badges) |
| `/admin` | Admin dashboard (revenue charts, orders, KPIs) |

## Key Features

- **Loading screen** with futuristic animated progress bar
- **Animated hero** with GSAP-powered floating PC render and letter-by-letter text reveal
- **Canvas particle background** with connected-node network
- **Glassmorphism** cards throughout
- **PC Builder** with:
  - Step-by-step animated component selection
  - CPU/GPU bottleneck detection
  - Wattage calculator with PSU recommendation
  - Build score system (0–100)
  - Achievement badges (First Build, Half Way, Ultra Builder, Complete Build)
  - Save build modal
- **Cart drawer** (slide-in from right)
- **Wishlist** with persistent state
- **Admin Dashboard** with Recharts area/pie charts and KPI cards
- **RGB animated borders** on PC renders
- **Scroll-triggered** reveal animations on all sections

## Admin Access

On the `/auth` page, click **[DEV] Login as Admin →** to access the admin dashboard at `/admin`.

## Color System

| Token | Value | Use |
|-------|-------|-----|
| `void` | `#08080f` | Background |
| `neon-purple` | `#7c3aed` | Primary accent |
| `neon-blue` | `#2563eb` | Secondary accent |
| `neon-cyan` | `#06b6d4` | Tertiary / FPS |
| `neon-pink` | `#ec4899` | Wishlist / hot tags |
| `neon-gold` | `#f59e0b` | Stars / badges |

## Fonts

- **Orbitron** — Display / logo / stats
- **Space Grotesk** — Headings / UI labels
- **Inter** — Body text
- **JetBrains Mono** — Labels / badges / code
