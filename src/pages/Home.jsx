import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Truck,
  ShieldCheck,
  CreditCard,
  Headphones,
  Gamepad2,
  Cpu,
  Monitor,
  HardDrive,
  Keyboard,
  Wrench,
  Tag,
  Clock,
  Sparkles,
  ChevronRight,
} from 'lucide-react'
import { useState } from 'react'
import RetailLayout from '@/components/retail/RetailLayout'
import { ProductSkeleton } from '@/components/retail/ProductCard'
import ProductDialog from '@/components/retail/ProductDialog'
import { ErrorBanner } from '@/components/retail/StatusPanel'
import RatingStars from '@/components/ui/RatingStars'
import { fetchHomeData } from '@/lib/supabase'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'
import { formatINR } from '@/utils/currency'
import { brandLogos } from '@/components/ui/BrandLogos'
import { AnimatedNumber } from '@/components/ui/Hud'

const easeOut = [0.23, 1, 0.32, 1]

const categoryTiles = [
  { label: 'Gaming PCs',    sub: 'Prebuilt rigs',     to: '/prebuilt',      Icon: Gamepad2 },
  { label: 'Workstations',  sub: 'Creator & studio',  to: '/workstations',  Icon: Monitor },
  { label: 'Components',    sub: 'CPU · GPU · RAM',   to: '/gaming-pcs',    Icon: Cpu },
  { label: 'Storage',       sub: 'SSD & NVMe',        to: '/category/ssd',  Icon: HardDrive },
  { label: 'Peripherals',   sub: 'Keys · mice · audio', to: '/accessories', Icon: Keyboard },
  { label: 'Configurator',  sub: 'Build to order',    to: '/build',         Icon: Wrench },
]

const trustBar = [
  { Icon: Truck,       title: 'Free shipping',  sub: 'Pan-India · orders ₹2,500+' },
  { Icon: ShieldCheck, title: '3-year warranty', sub: 'On every custom build' },
  { Icon: CreditCard,  title: 'No-cost EMI',     sub: '6 / 9 / 12 month plans' },
  { Icon: Headphones,  title: 'Bench support',   sub: 'Mon–Sat · 10am–8pm IST' },
]

export default function Home() {
  const reduceMotion = useReducedMotion()
  const { data, loading, error } = useSupabaseQuery(fetchHomeData, [], {})
  const prebuilts = Array.isArray(data?.prebuilts) ? data.prebuilts : []
  const components = Array.isArray(data?.components) ? data.components : []
  const testimonials = Array.isArray(data?.testimonials) ? data.testimonials : []
  const heroPc = prebuilts[0]
  const heroImage = heroPc?.image || heroPc?.case?.image || heroPc?.gpu?.image || components[0]?.image
  const promoA = prebuilts[1]
  const promoB = components.find((c) => c.image && c.id !== prebuilts[1]?.id) || components[0]
  const bestsellers = prebuilts.slice(0, 8)
  const newArrivals = components.slice(0, 6)
  const dealOfWeek = components.find((c) => (c.mrp || 0) > (c.price || 0)) || components[0]
  const dealSave = dealOfWeek?.mrp ? Math.max(0, (dealOfWeek.mrp - dealOfWeek.price)) : 0
  const dealPct = dealOfWeek?.mrp ? Math.round((dealSave / dealOfWeek.mrp) * 100) : 0

  return (
    <RetailLayout>
      <main>
        {/* Announcement bar */}
        <div className="bg-ink text-canvas">
          <div className="container-max flex flex-wrap items-center justify-between gap-12 py-8 text-label-x-small">
            <p className="inline-flex items-center gap-8 font-medium">
              <Sparkles className="h-12 w-12 text-accent-heat" aria-hidden="true" />
              Free shipping across India on orders over ₹2,500 · No-cost EMI from ₹3,999/mo
            </p>
            <div className="flex items-center gap-16 text-canvas/72">
              <Link to="/about" className="transition hover:text-canvas">Track order</Link>
              <span aria-hidden="true">·</span>
              <Link to="/contact" className="transition hover:text-canvas">Help</Link>
              <span aria-hidden="true">·</span>
              <span>Chennai showroom</span>
            </div>
          </div>
        </div>

        {/* Hero — storefront banner + side promos */}
        <section className="border-b border-border-muted bg-canvas-soft">
          <div className="container-max grid gap-24 py-32 lg:grid-cols-[1.55fr_1fr] lg:gap-32 lg:py-48">
            {/* Primary banner */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: easeOut }}
              className="relative overflow-hidden border border-border-muted bg-ink text-canvas"
            >
              <div className="poster-grain absolute inset-0" aria-hidden="true" />
              <div className="relative grid gap-24 p-32 md:grid-cols-[1.1fr_1fr] md:items-center md:p-48">
                <div className="relative z-10">
                  <span className="inline-flex items-center gap-8 border border-canvas/30 px-10 py-4 text-label-x-small font-medium uppercase tracking-[0.08em] text-canvas/82">
                    <span className="relative h-6 w-6 rounded-full bg-accent-heat">
                      <span className="absolute inset-0 rounded-full bg-accent-heat" style={{ animation: 'pulse-ring 1.8s ease-out infinite' }} />
                    </span>
                    New season · Issue 01
                  </span>
                  <h1 className="mt-20 text-title-h1 font-semibold leading-[1.02] tracking-[-.03em] md:text-display-large">
                    <span className="word-reveal"><span style={{ animationDelay: '.05s' }}>Custom</span></span>{' '}
                    <span className="word-reveal"><span style={{ animationDelay: '.18s' }}>rigs,</span></span>
                    <br />
                    <span className="word-reveal"><span className="text-accent-heat" style={{ animationDelay: '.32s' }}>benched</span></span>{' '}
                    <span className="word-reveal"><span className="text-accent-heat" style={{ animationDelay: '.42s' }}>&amp;</span></span>{' '}
                    <span className="word-reveal"><span className="text-accent-heat" style={{ animationDelay: '.5s' }}>boxed.</span></span>
                  </h1>
                  <p className="mt-20 max-w-[440px] text-body-large leading-[1.5] text-canvas/72">
                    Component-level pricing for gaming, creator, and production builds. Live compatibility checks, 3-year warranty, ships across India.
                  </p>
                  <div className="mt-28 flex flex-wrap items-center gap-12">
                    <Link to="/build" className="btn-primary magnetic" data-tone="heat">
                      Start configurator <ArrowRight className="h-16 w-16" aria-hidden="true" />
                    </Link>
                    <Link to="/prebuilt" className="inline-flex min-h-[44px] items-center gap-8 rounded-8 border border-canvas/40 px-18 font-semibold text-canvas transition hover:border-canvas hover:bg-canvas/10">
                      Shop prebuilts
                    </Link>
                  </div>
                  <dl className="mt-32 grid max-w-[360px] grid-cols-3 gap-16 border-t border-canvas/15 pt-20">
                    <HeroStat label="Builds" valueNode={<><AnimatedNumber value={2400} duration={1600} />+</>} />
                    <HeroStat label="Reviews" valueNode={<><AnimatedNumber value={49} duration={1400} suffix="" />/50 ★</>} />
                    <HeroStat label="Warranty" valueNode="3 yrs" />
                  </dl>
                </div>
                <div className="relative aspect-[5/4] w-full overflow-hidden bg-gradient-to-br from-canvas/10 via-canvas/4 to-transparent">
                  <div className="heat-orb" style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }} aria-hidden="true" />
                  <span className="spark" style={{ left: '22%', top: '78%', animationDelay: '0s' }} aria-hidden="true" />
                  <span className="spark" style={{ left: '38%', top: '82%', animationDelay: '1.2s' }} aria-hidden="true" />
                  <span className="spark" style={{ left: '58%', top: '76%', animationDelay: '2.4s' }} aria-hidden="true" />
                  <span className="spark" style={{ left: '72%', top: '84%', animationDelay: '3.6s' }} aria-hidden="true" />
                  <div className="absolute inset-0 grid place-items-center p-24">
                    {loading ? (
                      <div className="h-[200px] w-[260px] animate-pulse bg-canvas/10" />
                    ) : heroImage && (
                      <motion.img
                        src={heroImage}
                        alt={heroPc?.name || 'Featured PC'}
                        width="640"
                        height="520"
                        className="relative max-h-[320px] w-[88%] object-contain drop-shadow-[0_24px_28px_rgba(0,0,0,.55)]"
                        decoding="async"
                        fetchpriority="high"
                        initial={reduceMotion ? false : { opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: easeOut, delay: 0.2 }}
                        whileHover={reduceMotion ? undefined : { y: -6, transition: { duration: 0.4 } }}
                      />
                    )}
                  </div>
                  {heroPc && (
                    <div className="absolute bottom-12 right-12 flex items-center gap-12 border border-canvas/25 bg-ink/80 px-14 py-10 backdrop-blur-sm">
                      <div className="leading-tight">
                        <p className="text-label-x-small uppercase tracking-[0.08em] text-canvas/60">Featured</p>
                        <p className="text-body-small font-semibold text-canvas">{heroPc.name}</p>
                      </div>
                      <p className="price text-body-medium font-semibold text-accent-heat">{formatINR(heroPc.price)}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Side promo stack */}
            <div className="grid gap-16">
              <PromoTile
                eyebrow="Deal of the week"
                title={dealOfWeek?.name || 'Featured component'}
                price={dealOfWeek?.price}
                mrp={dealOfWeek?.mrp}
                pct={dealPct}
                image={dealOfWeek?.image}
                to="/gaming-pcs"
                tone="light"
              />
              <PromoTile
                eyebrow="Editor's pick"
                title={promoA?.name || promoB?.name || 'Studio build'}
                price={promoA?.price || promoB?.price}
                image={promoA?.image || promoA?.case?.image || promoB?.image}
                to="/workstations"
                tone="dark"
              />
            </div>
          </div>

          {error && (
            <div className="container-max pb-24">
              <ErrorBanner message={error.message} />
            </div>
          )}
        </section>

        {/* Shop by category — storefront tile rail */}
        <section className="border-b border-border-muted bg-canvas">
          <div className="container-max py-32 md:py-40">
            <div className="mb-20 flex items-end justify-between gap-12">
              <div>
                <p className="meta">Shop by category</p>
                <h2 className="mt-6 text-title-h3 font-semibold tracking-[-.02em]">Find your aisle</h2>
              </div>
              <Link to="/accessories" className="meta inline-flex items-center gap-6 transition hover:text-ink">
                All categories <ArrowUpRight className="h-12 w-12" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid gap-px overflow-hidden border border-border-muted bg-line sm:grid-cols-3 lg:grid-cols-6">
              {categoryTiles.map(({ label, sub, to, Icon }, i) => (
                <motion.div
                  key={label}
                  initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                >
                  <Link
                    to={to}
                    className="tilt-card group flex h-full flex-col justify-between gap-24 bg-surface-1 p-20 transition hover:bg-canvas"
                  >
                    <Icon className="h-24 w-24 text-ink-soft transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-6deg] group-hover:text-accent-heat" aria-hidden="true" />
                    <div>
                      <p className="text-body-medium font-semibold leading-tight tracking-[-.005em]">{label}</p>
                      <p className="meta mt-6">{sub}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Deal-of-the-week strip */}
        {dealOfWeek && (
          <section className="border-b border-border-muted bg-ink text-canvas">
            <div className="container-max grid gap-24 py-32 md:grid-cols-[auto_1fr_auto] md:items-center md:py-28">
              <div className="flex items-center gap-12">
                <span className="grid h-44 w-44 place-items-center bg-accent-heat text-canvas">
                  <Tag className="h-18 w-18" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-label-x-small uppercase tracking-[0.1em] text-canvas/60">Deal of the week</p>
                  <p className="text-body-large font-semibold tracking-[-.005em]">{dealOfWeek.name}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-20 gap-y-8 md:justify-center">
                <span className="price text-title-h4 font-semibold text-accent-heat">{formatINR(dealOfWeek.price)}</span>
                {dealOfWeek.mrp && <span className="price text-body-medium text-canvas/50 line-through">{formatINR(dealOfWeek.mrp)}</span>}
                {dealPct > 0 && <span className="border border-accent-heat px-10 py-4 text-label-x-small font-semibold uppercase tracking-[0.08em] text-accent-heat">Save {dealPct}%</span>}
                <span className="inline-flex items-center gap-6 text-label-x-small text-canvas/60"><Clock className="h-12 w-12" aria-hidden="true" /> Ends Sunday</span>
              </div>
              <Link to="/gaming-pcs" className="btn-primary magnetic" data-tone="heat">
                Grab it <ArrowRight className="h-16 w-16" aria-hidden="true" />
              </Link>
            </div>
          </section>
        )}

        {/* Bestsellers — storefront product grid */}
        <section className="border-b border-border-muted bg-canvas">
          <div className="container-max py-48">
            <SectionHead
              eyebrow="Bestsellers"
              title="Most-ordered systems"
              caption="Picked from this quarter's bench notes"
              link="/prebuilt"
              linkLabel="Shop all"
            />
            <div className="mt-28 grid gap-px overflow-hidden border border-border-muted bg-line sm:grid-cols-2 lg:grid-cols-4">
              {loading
                ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
                : bestsellers.map((pc, index) => <ProductCard key={pc.id} pc={pc} index={index} />)}
            </div>
          </div>
        </section>

        {/* Configurator promo banner */}
        <section className="border-b border-border-muted">
          <div className="container-max py-48">
            <div className="poster poster-grain relative grid gap-32 overflow-hidden px-32 py-48 md:grid-cols-[1.4fr_1fr] md:py-56 lg:px-56">
              <div className="relative z-10">
                <p className="meta" style={{ color: 'rgba(246,244,238,.66)' }}>Build to order</p>
                <h2 className="mt-12 text-title-h2 font-semibold leading-[1.04] tracking-[-.025em] md:text-title-h1">
                  Spec it. Quote it. Ship it.
                </h2>
                <p className="mt-16 max-w-[480px] text-body-large text-canvas/72">
                  Pick case, processor, graphics, memory, storage, cooling, and power. Live compatibility, wattage, and pricing as you choose.
                </p>
                <div className="mt-28 flex flex-wrap items-center gap-12">
                  <Link to="/build" className="btn-primary magnetic" data-tone="heat">
                    Open configurator <ArrowRight className="h-16 w-16" aria-hidden="true" />
                  </Link>
                  <Link to="/prebuilt" className="inline-flex min-h-[44px] items-center gap-8 rounded-8 border border-canvas/40 px-18 font-semibold text-canvas transition hover:border-canvas hover:bg-canvas/10">
                    Compare prebuilts
                  </Link>
                </div>
              </div>
              <div className="relative z-10 grid grid-cols-2 gap-px border border-canvas/15 bg-canvas/15">
                {[
                  ['01', 'Compatibility'],
                  ['02', 'Live quote'],
                  ['03', 'Wattage check'],
                  ['04', 'Save & share'],
                ].map(([code, label]) => (
                  <div key={code} className="bg-ink px-16 py-20">
                    <p className="meta" style={{ color: 'rgba(246,244,238,.5)' }}>{code}</p>
                    <p className="mt-12 text-body-medium font-semibold text-canvas">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* New arrivals — horizontal product strip */}
        <section className="border-b border-border-muted bg-canvas">
          <div className="container-max py-48">
            <SectionHead
              eyebrow="Just landed"
              title="New arrivals"
              caption="Fresh inventory on the bench"
              link="/gaming-pcs"
              linkLabel="See all parts"
            />
            <div className="mt-28 grid gap-px overflow-hidden border border-border-muted bg-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {newArrivals.map((part) => (
                <PartCard key={part.id} part={part} />
              ))}
            </div>
          </div>
        </section>

        {/* Brand marquee */}
        <section className="border-b border-border-muted bg-canvas-soft">
          <div className="container-max py-28">
            <div className="mb-16 flex items-center justify-between gap-12">
              <p className="meta">Stocked brands · official partners</p>
              <Link to="/accessories" className="meta link-sweep inline-flex items-center gap-6 transition hover:text-ink">
                Browse all <ArrowUpRight className="h-12 w-12" aria-hidden="true" />
              </Link>
            </div>
            <div className="marquee border-y border-border-muted bg-canvas py-20">
              <div className="marquee__track">
                {[...brandLogos, ...brandLogos].map(({ name, Logo }, i) => (
                  <Logo key={`${name}-${i}`} className="marquee__logo" />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section className="border-b border-border-muted bg-canvas">
          <div className="container-max py-32">
            <div className="grid gap-px overflow-hidden border border-border-muted bg-line md:grid-cols-4">
              {trustBar.map(({ Icon, title, sub }) => (
                <div key={title} className="flex items-start gap-14 bg-surface-1 p-20">
                  <Icon className="mt-2 h-22 w-22 text-accent-heat" aria-hidden="true" />
                  <div>
                    <p className="text-body-medium font-semibold leading-tight tracking-[-.005em]">{title}</p>
                    <p className="meta mt-6 normal-case tracking-normal">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-b border-border-muted bg-canvas-soft">
          <div className="container-max py-48">
            <SectionHead eyebrow="Field reports" title="What customers say" caption="Verified post-delivery reviews" />
            <div className="mt-28 grid gap-px overflow-hidden border border-border-muted bg-line md:grid-cols-3">
              {(testimonials.length ? testimonials.slice(0, 3) : [
                { id: 'fallback-1', initials: 'AS', body: 'Walked me through every spec choice. Quote stayed honest from estimate to delivery.', author: 'A. Sharma · Creator' },
                { id: 'fallback-2', initials: 'RV', body: 'Bench notes on the prebuilt page made comparing tiers painless.', author: 'R. Verma · Architect' },
                { id: 'fallback-3', initials: 'KP', body: 'Quiet workstation, clean cable run, accurate thermals.', author: 'K. Pillai · Editor' },
              ]).map((t) => (
                <blockquote key={t.id} className="flex h-full flex-col gap-16 bg-canvas p-28">
                  <RatingStars rating={t.rating || 5} size={14} />
                  <p className="flex-1 text-body-large font-medium leading-[1.5] text-ink">"{t.body}"</p>
                  <p className="meta">{t.author || t.initials || 'Customer'}</p>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-canvas">
          <div className="container-max grid gap-24 py-48 md:grid-cols-[1.2fr_1fr] md:items-center md:py-56">
            <div>
              <p className="meta">The dispatch</p>
              <h2 className="mt-8 text-title-h3 font-semibold leading-[1.05] tracking-[-.02em] md:text-title-h2">
                Weekly drops, bench notes, and price moves.
              </h2>
              <p className="mt-12 max-w-[480px] text-body-medium text-ink-soft">
                One short email on Fridays. No spam, unsubscribe any time.
              </p>
            </div>
            <form className="flex flex-col gap-12 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
              <label className="sr-only" htmlFor="newsletter-email">Email</label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="you@studio.com"
                className="input-base flex-1"
              />
              <button type="submit" className="btn-primary magnetic" data-tone="heat">
                Subscribe <ChevronRight className="h-16 w-16" aria-hidden="true" />
              </button>
            </form>
          </div>
        </section>
      </main>
    </RetailLayout>
  )
}

function HeroStat({ label, value, valueNode }) {
  return (
    <div>
      <dt className="text-label-x-small uppercase tracking-[0.08em] text-canvas/55">{label}</dt>
      <dd className="mt-4 text-body-large font-semibold tracking-[-.01em] text-canvas tabular-nums">{valueNode ?? value}</dd>
    </div>
  )
}

function SectionHead({ eyebrow, title, caption, link, linkLabel }) {
  return (
    <div className="flex flex-col gap-12 border-b border-border-muted pb-20 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && <p className="meta">{eyebrow}</p>}
        <h2 className="mt-6 text-title-h3 font-semibold tracking-[-.02em] md:text-title-h2">{title}</h2>
        {caption && <p className="mt-6 text-body-medium text-ink-soft">{caption}</p>}
      </div>
      {link && (
        <Link to={link} className="meta inline-flex items-center gap-8 self-start border border-border-muted px-12 py-8 transition hover:border-ink hover:text-ink md:self-auto">
          {linkLabel} <ArrowUpRight className="h-14 w-14" aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}

function PromoTile({ eyebrow, title, price, mrp, pct, image, to, tone = 'light' }) {
  const dark = tone === 'dark'
  return (
    <Link
      to={to}
      className={`group relative grid grid-cols-[1.1fr_1fr] items-stretch overflow-hidden border ${dark ? 'border-ink bg-ink text-canvas' : 'border-border-muted bg-surface-1 text-ink'}`}
    >
      <div className="flex flex-col justify-between gap-12 p-20">
        <div>
          <p className={`text-label-x-small uppercase tracking-[0.1em] ${dark ? 'text-canvas/60' : 'text-ink-muted'}`}>{eyebrow}</p>
          <p className="mt-8 line-clamp-2 text-body-large font-semibold leading-tight tracking-[-.005em]">{title}</p>
        </div>
        <div>
          {price && (
            <div className="flex items-baseline gap-10">
              <span className={`price text-title-h4 font-semibold ${dark ? 'text-accent-heat' : 'text-ink'}`}>{formatINR(price)}</span>
              {mrp && <span className={`price text-body-small line-through ${dark ? 'text-canvas/50' : 'text-ink-muted'}`}>{formatINR(mrp)}</span>}
            </div>
          )}
          <span className={`mt-12 inline-flex items-center gap-6 text-label-x-small font-semibold uppercase tracking-[0.08em] ${dark ? 'text-canvas' : 'text-ink'}`}>
            Shop now <ArrowUpRight className="h-12 w-12 transition group-hover:translate-x-1 group-hover:-translate-y-0.5 motion-reduce:transform-none" aria-hidden="true" />
          </span>
        </div>
        {pct > 0 && (
          <span className="absolute left-12 top-12 bg-accent-heat px-8 py-4 text-label-x-small font-semibold uppercase tracking-[0.08em] text-canvas">−{pct}%</span>
        )}
      </div>
      <div className={`relative grid place-items-center overflow-hidden ${dark ? 'bg-canvas/8' : 'product-image-box'}`}>
        {image && (
          <img
            src={image}
            alt={title}
            width="320"
            height="240"
            className="max-h-[150px] w-[78%] object-contain transition duration-300 group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
    </Link>
  )
}

function ProductCard({ pc, index }) {
  const image = pc.image || pc.case?.image || pc.gpu?.image || pc.cpu?.image
  const save = pc.mrp ? Math.max(0, pc.mrp - pc.price) : 0
  const pct = pc.mrp ? Math.round((save / pc.mrp) * 100) : 0
  const [open, setOpen] = useState(false)
  const product = {
    ...pc,
    image,
    brand: pc.badge || pc.tagline || 'System',
    rating: pc.rating || 4.9,
    review_count: pc.review_count || 128,
    highlights: [
      pc.cpu?.name && `${pc.cpu.name} processor`,
      pc.gpu?.name && `${pc.gpu.name} graphics`,
      pc.ram?.name && `${pc.ram.name} memory`,
      pc.storage?.name && `${pc.storage.name} storage`,
    ].filter(Boolean),
    specs: [
      pc.cpu?.name && { key: 'Processor', value: pc.cpu.name },
      pc.gpu?.name && { key: 'Graphics', value: pc.gpu.name },
      pc.ram?.name && { key: 'Memory', value: pc.ram.name },
      pc.storage?.name && { key: 'Storage', value: pc.storage.name },
      pc.cooler?.name && { key: 'Cooling', value: pc.cooler.name },
      pc.case?.name && { key: 'Chassis', value: pc.case.name },
    ].filter(Boolean),
  }
  return (
    <>
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="group glow-on-hover relative flex flex-col border border-transparent bg-surface-1 text-left transition hover:bg-canvas focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink"
    >
      {index === 0 && (
        <span className="absolute left-12 top-12 z-10 bg-ink px-8 py-4 text-label-x-small font-semibold uppercase tracking-[0.08em] text-canvas">#1 Bestseller</span>
      )}
      {pct > 0 && (
        <span className="absolute right-12 top-12 z-10 bg-accent-heat px-8 py-4 text-label-x-small font-semibold uppercase tracking-[0.08em] text-canvas">−{pct}%</span>
      )}
      <div className="product-image-box relative grid h-[200px] place-items-center overflow-hidden">
        {image && (
          <img
            src={image}
            alt={pc.name}
            width="320"
            height="240"
            className="max-h-[160px] w-[78%] max-w-[240px] object-contain transition duration-300 group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-10 border-t border-border-muted p-16">
        <p className="meta">{pc.badge || pc.tagline || 'Custom build'}</p>
        <h3 className="line-clamp-2 min-h-[40px] text-body-medium font-semibold leading-20 tracking-[-.005em]">{pc.name}</h3>
        <RatingStars rating={pc.rating || 4.9} size={11} showValue reviewCount={pc.review_count || 128} />

        <div className="mt-auto flex items-end justify-between gap-8 pt-10">
          <div>
            <p className="price text-title-h5 font-semibold leading-none">{formatINR(pc.price)}</p>
            {pc.mrp && <p className="price mt-4 text-label-x-small text-ink-muted line-through">{formatINR(pc.mrp)}</p>}
          </div>
          <span className="inline-flex items-center gap-4 text-label-x-small font-semibold uppercase tracking-[0.08em] text-ink transition group-hover:text-accent-heat">
            View <ArrowUpRight className="h-12 w-12" aria-hidden="true" />
          </span>
        </div>
      </div>
    </button>
    <ProductDialog product={product} open={open} onClose={() => setOpen(false)} />
    </>
  )
}

function PartCard({ part }) {
  const save = part.mrp ? Math.max(0, part.mrp - part.price) : 0
  const [open, setOpen] = useState(false)
  return (
    <>
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="group glow-on-hover flex flex-col border border-transparent bg-surface-1 text-left transition hover:bg-canvas focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink"
    >
      <div className="flex items-center justify-between px-14 pt-12">
        <span className="meta">{part.brand || part.category}</span>
        {save > 0 && <span className="meta text-accent-heat">−{formatINR(save)}</span>}
      </div>
      <div className="product-image-box relative grid h-[150px] place-items-center overflow-hidden">
        {part.image && (
          <img
            src={part.image}
            alt={part.name}
            width="280"
            height="200"
            className="h-full w-full object-contain p-18 transition duration-300 group-hover:scale-[1.05] motion-reduce:transform-none motion-reduce:transition-none"
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-8 border-t border-border-muted p-14">
        <h3 className="line-clamp-2 min-h-[36px] text-body-small font-semibold leading-tight tracking-[-.005em]">{part.name}</h3>
        <div className="mt-auto flex items-end justify-between gap-6 pt-8">
          <p className="price text-body-large font-semibold">{formatINR(part.price)}</p>
          <span className="text-label-x-small font-semibold uppercase tracking-[0.08em] text-ink transition group-hover:text-accent-heat">View</span>
        </div>
      </div>
    </button>
    <ProductDialog product={part} open={open} onClose={() => setOpen(false)} />
    </>
  )
}
