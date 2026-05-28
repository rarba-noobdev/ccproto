import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Star } from 'lucide-react'
import RetailLayout from '@/components/retail/RetailLayout'
import { ProductSkeleton } from '@/components/retail/ProductCard'
import { ErrorBanner } from '@/components/retail/StatusPanel'
import { fetchHomeData } from '@/lib/supabase'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'
import { formatINR } from '@/utils/currency'

const easeOut = [0.23, 1, 0.32, 1]

const indexLinks = [
  { code: '01', label: 'Configurator', to: '/build' },
  { code: '02', label: 'Systems', to: '/prebuilt' },
  { code: '03', label: 'Workstations', to: '/workstations' },
  { code: '04', label: 'Catalogue', to: '/accessories' },
  { code: '05', label: 'Notes', to: '/blog' },
]

export default function Home() {
  const reduceMotion = useReducedMotion()
  const { data, loading, error } = useSupabaseQuery(fetchHomeData, [], {})
  const prebuilts = Array.isArray(data?.prebuilts) ? data.prebuilts : []
  const components = Array.isArray(data?.components) ? data.components : []
  const testimonials = Array.isArray(data?.testimonials) ? data.testimonials : []
  const heroPc = prebuilts[0]
  const heroImage = heroPc?.image || heroPc?.case?.image || heroPc?.gpu?.image || components[0]?.image
  const bestsellers = prebuilts.slice(0, 5)
  const deals = components.slice(0, 8)

  return (
    <RetailLayout>
      <main>
        {/* Hero — editorial cover */}
        <section className="border-b border-border-muted">
          <div className="container-max grid gap-32 py-48 lg:grid-cols-[1.25fr_1fr] lg:gap-56 lg:py-72">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: easeOut }}
              className="flex flex-col"
            >
              <p className="chapter mb-24">Issue 01 · Configurator</p>
              <h1 className="display-large">
                Computers, made&nbsp;<span className="text-accent-heat">to order</span>.
              </h1>
              <p className="mt-24 max-w-[520px] text-body-large leading-[1.55] text-ink-soft">
                Component-level pricing for gaming, creator, and production rigs. Built in Bengaluru, shipped across India.
              </p>
              <div className="mt-32 flex flex-wrap items-center gap-12">
                <Link to="/build" className="btn-primary" data-tone="heat">
                  Start configurator <ArrowRight className="h-16 w-16" aria-hidden="true" />
                </Link>
                <Link to="/prebuilt" className="btn-secondary">
                  Browse systems
                </Link>
              </div>

              <dl className="mt-48 grid grid-cols-3 gap-16 border-t border-border-muted pt-24">
                <Stat label="Builds shipped" value="2,400+" />
                <Stat label="Avg. spec spread" value="6 tiers" />
                <Stat label="Warranty" value="3 yrs" />
              </dl>
            </motion.div>

            <div className="relative flex flex-col justify-between border border-border-muted bg-surface-1">
              <div className="flex items-center justify-between border-b border-border-muted px-20 py-12">
                <p className="meta">Featured · {heroPc?.badge || 'Today'}</p>
                <Link to="/prebuilt" className="meta inline-flex items-center gap-6 transition hover:text-ink">
                  View <ArrowUpRight className="h-12 w-12" aria-hidden="true" />
                </Link>
              </div>
              <div className="product-image-box relative grid min-h-[280px] flex-1 place-items-center p-32">
                {loading ? (
                  <div className="h-[180px] w-[180px] animate-pulse bg-surface-2" />
                ) : (
                  heroImage && (
                    <img
                      src={heroImage}
                      alt={heroPc?.name || 'Featured PC'}
                      width="560"
                      height="460"
                      className="relative max-h-[260px] w-[78%] max-w-[360px] object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,.18)]"
                      decoding="async"
                      fetchpriority="high"
                    />
                  )
                )}
              </div>
              <div className="border-t border-border-muted px-20 py-16">
                <p className="text-body-medium font-semibold leading-[1.3] tracking-[-.005em]">{heroPc?.name || 'Featured system'}</p>
                <div className="mt-8 flex items-end justify-between">
                  <p className="meta">{heroPc?.tagline || 'Balanced performance'}</p>
                  <p className="price text-title-h5 font-semibold">{formatINR(heroPc?.price || 0)}</p>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="container-max pb-24">
              <ErrorBanner message={error.message} />
            </div>
          )}
        </section>

        {/* Index — section bookmarks */}
        <section className="border-b border-border-muted">
          <div className="container-max">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
              {indexLinks.map(({ code, label, to }, i) => (
                <motion.div
                  key={code}
                  initial={reduceMotion ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className={`border-border-muted py-24 ${i === 0 ? '' : 'border-l'}`}
                >
                  <Link to={to} className="group flex h-full flex-col justify-between gap-32 px-20">
                    <p className="meta">{code}</p>
                    <div className="flex items-end justify-between">
                      <span className="text-title-h5 font-semibold tracking-[-.02em]">{label}</span>
                      <ArrowUpRight className="h-16 w-16 text-ink-muted transition group-hover:text-ink group-hover:-translate-y-0.5 motion-reduce:transform-none" aria-hidden="true" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Bestsellers */}
        <section className="border-b border-border-muted">
          <div className="container-max py-56">
            <SectionHead chapter="02" title="Systems" link="/prebuilt" linkLabel="All systems" />
            <div className="mt-32 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {loading
                ? Array.from({ length: 5 }).map((_, i) => <ProductSkeleton key={i} />)
                : bestsellers.map((pc, index) => <SystemTile key={pc.id} pc={pc} index={index} />)}
            </div>
          </div>
        </section>

        {/* Editorial poster */}
        <section className="border-b border-border-muted">
          <div className="container-max py-56">
            <div className="poster poster-grain relative grid gap-32 px-32 py-48 md:grid-cols-[1.4fr_1fr] md:py-72 lg:px-56">
              <div className="relative z-10">
                <p className="chapter mb-20" style={{ color: 'rgba(246,244,238,.66)' }}>Configurator</p>
                <h2 className="text-title-h2 font-semibold leading-[1.02] tracking-[-.025em] md:text-title-h1">
                  Plan, then ship.
                </h2>
                <p className="mt-20 max-w-[480px] text-body-large text-canvas/72">
                  Configure case, processor, graphics, memory, storage, cooling, and power. Compatibility checks run as you choose.
                </p>
                <Link to="/build" className="btn-primary mt-32" data-tone="heat">
                  Open configurator <ArrowRight className="h-16 w-16" aria-hidden="true" />
                </Link>
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

        {/* Deals */}
        <section className="border-b border-border-muted">
          <div className="container-max py-56">
            <SectionHead chapter="03" title="Parts" link="/gaming-pcs" linkLabel="All parts" />
            <div className="mt-32 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
              {deals.map((part) => <DealCard key={part.id} part={part} />)}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <div className="container-max py-56">
            <SectionHead chapter="04" title="Field reports" />
            <div className="mt-32 grid gap-px bg-line md:grid-cols-3">
              {(testimonials.length ? testimonials.slice(0, 3) : [
                { id: 'fallback-1', initials: 'AS', body: 'Walked me through every spec choice. The quote stayed honest from estimate to delivery.', author: 'A. Sharma · Creator' },
                { id: 'fallback-2', initials: 'RV', body: 'Bench notes on the prebuilt page made comparing tiers painless.', author: 'R. Verma · Architect' },
                { id: 'fallback-3', initials: 'KP', body: 'Quiet workstation, clean cable run, accurate thermals.', author: 'K. Pillai · Editor' },
              ]).map((t) => (
                <blockquote key={t.id} className="bg-canvas p-32">
                  <Star className="h-16 w-16 fill-current text-ink" aria-hidden="true" />
                  <p className="mt-20 text-body-large font-medium leading-[1.45] text-ink">"{t.body}"</p>
                  <p className="meta mt-24">{t.author || t.initials || 'Customer'}</p>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      </main>
    </RetailLayout>
  )
}

function Stat({ label, value }) {
  return (
    <div>
      <dt className="meta">{label}</dt>
      <dd className="mt-6 text-title-h5 font-semibold tracking-[-.02em]">{value}</dd>
    </div>
  )
}

function SectionHead({ chapter, title, link, linkLabel }) {
  return (
    <div className="flex flex-col gap-12 border-b border-border-muted pb-20 md:flex-row md:items-end md:justify-between">
      <div>
        {chapter && <p className="chapter mb-12">{chapter}</p>}
        <h2 className="text-title-h3 font-semibold tracking-[-.025em] md:text-title-h2">{title}</h2>
      </div>
      {link && (
        <Link to={link} className="meta inline-flex items-center gap-8 transition hover:text-ink">
          {linkLabel} <ArrowUpRight className="h-14 w-14" aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}

function SystemTile({ pc, index }) {
  const image = pc.image || pc.case?.image || pc.gpu?.image || pc.cpu?.image
  return (
    <Link to="/prebuilt" className="group flex flex-col bg-surface-1 transition hover:bg-canvas">
      <div className="relative flex items-center justify-between px-16 pt-12">
        <span className="meta">#{String(index + 1).padStart(2, '0')}</span>
        <ArrowUpRight className="h-12 w-12 text-ink-muted transition group-hover:text-ink" aria-hidden="true" />
      </div>
      <div className="product-image-box relative grid h-[180px] place-items-center overflow-hidden">
        {image && (
          <img
            src={image}
            alt={pc.name}
            width="320"
            height="240"
            className="relative max-h-[140px] w-[78%] max-w-[220px] object-contain transition duration-4 group-hover:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none"
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-8 border-t border-border-muted p-16">
        <h3 className="line-clamp-2 min-h-[40px] text-body-medium font-semibold leading-20">{pc.name}</h3>
        <div className="mt-auto flex items-end justify-between gap-8 pt-12">
          <div>
            <p className="price text-title-h5 font-semibold leading-none">{formatINR(pc.price)}</p>
            {pc.mrp && <p className="price mt-4 text-label-x-small font-normal text-ink-muted line-through">{formatINR(pc.mrp)}</p>}
          </div>
          <span className="meta">In stock</span>
        </div>
      </div>
    </Link>
  )
}

function DealCard({ part }) {
  const mrp = part.mrp || part.originalPrice
  const save = mrp ? Math.max(0, mrp - part.price) : 0
  return (
    <Link to="/gaming-pcs" className="group flex flex-col bg-surface-1 transition hover:bg-canvas">
      <div className="flex items-center justify-between px-16 pt-12">
        <span className="meta">{part.brand || part.category}</span>
        {save > 0 && <span className="meta text-accent-heat">−{formatINR(save)}</span>}
      </div>
      <div className="product-image-box relative grid h-[160px] place-items-center overflow-hidden">
        <img src={part.image} alt={part.name} width="300" height="220" className="h-full w-full object-contain p-20 transition duration-4 group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none" loading="lazy" decoding="async" />
      </div>
      <div className="flex flex-1 flex-col gap-8 border-t border-border-muted p-16">
        <h3 className="line-clamp-2 min-h-[40px] text-body-medium font-semibold leading-20">{part.name}</h3>
        <p className="price mt-auto pt-12 text-title-h5 font-semibold">{formatINR(part.price)}</p>
      </div>
    </Link>
  )
}
