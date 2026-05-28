import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Check,
  Cpu,
  Gauge,
  HardDrive,
  Monitor,
  PackageCheck,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Zap,
} from 'lucide-react'
import RetailLayout from '@/components/retail/RetailLayout'
import { ProductSkeleton } from '@/components/retail/ProductCard'
import { fetchHomeData } from '@/lib/supabase'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'
import { formatINR } from '@/utils/currency'

const easeOut = [0.23, 1, 0.32, 1]

const categoryLinks = [
  { label: 'Ready PCs', to: '/prebuilt', icon: Trophy },
  { label: 'Build custom', to: '/build', icon: Cpu },
  { label: 'Graphics', to: '/category/graphic-card', icon: Zap },
  { label: 'Monitors', to: '/category/monitor', icon: Monitor },
  { label: 'SSD', to: '/category/ssd', icon: HardDrive },
]

const wanted = [
  ['Starter rigs', '/prebuilt'],
  ['Creator builds', '/workstations'],
  ['RTX graphics', '/category/graphic-card'],
  ['Fast SSDs', '/category/ssd'],
  ['Airflow cases', '/category/cabinet'],
  ['Cooling', '/category/cooler'],
  ['Power supply', '/category/power-supply'],
  ['Accessories', '/accessories'],
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
  const featureParts = components.slice(8, 12)

  return (
    <RetailLayout>
      <main>
        <section className="container-max pt-6">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, ease: easeOut }}
            className="relative overflow-hidden rounded-[34px] border border-[var(--line)] bg-[var(--surface-1)] shadow-[0_28px_80px_rgba(38,38,38,.12)]"
          >
            <div className="grid lg:grid-cols-[minmax(0,1fr)_420px]">
              <div className="p-6 sm:p-8 lg:p-10">
                <p className="kicker mb-5"><Sparkles className="h-4 w-4" /> Custom PCs, clear prices</p>
                <h1 className="max-w-4xl text-[54px] font-black leading-[.86] tracking-[-.08em] sm:text-[82px] lg:text-[104px]">
                  Find a better machine for your budget.
                </h1>
                <p className="mt-6 max-w-xl text-base font-semibold leading-7 text-[var(--ink-muted)]">
                  Shop ready systems, compare parts, or start a guided build with transparent specs and checkout-ready pricing.
                </p>

                <div className="mt-7 max-w-2xl rounded-full border border-[var(--line)] bg-[var(--surface-2)] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,.8)]">
                  <Link to="/gaming-pcs" className="group flex min-h-12 items-center gap-3 rounded-full bg-white px-4 transition hover:bg-[var(--canvas)]">
                    <Search className="h-5 w-5 text-[var(--ink-muted)]" />
                    <span className="flex-1 text-left text-sm font-black text-[var(--ink-muted)]">Search graphics cards, SSDs, monitors…</span>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--ink)] text-[var(--canvas)] transition group-hover:translate-x-0.5">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </div>

                <div className="mt-6 grid gap-2 sm:grid-cols-3">
                  {[
                    ['Bench checked', 'Load-tested systems'],
                    ['30-day help', 'Setup and support'],
                    ['Live catalog', 'Current component pricing'],
                  ].map(([title, copy]) => (
                    <div key={title} className="rounded-[20px] border border-[var(--line)] bg-[var(--surface-2)] p-4">
                      <Check className="mb-3 h-4 w-4 text-[var(--success)]" />
                      <div className="text-sm font-black tracking-[-.02em]">{title}</div>
                      <div className="mt-1 text-xs font-bold text-[var(--ink-muted)]">{copy}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[360px] overflow-hidden bg-[#f5f2ea]">
                <div className="absolute left-5 top-5 z-10 rounded-full bg-[var(--accent-heat)] px-3 py-1 text-[11px] font-black uppercase tracking-[.08em] text-white">
                  {heroPc?.badge || 'Featured'}
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(38,38,38,.055)_0_1px,transparent_1px_22px)]" />
                <div className="absolute inset-x-10 bottom-8 h-20 rounded-full bg-black/10 blur-3xl" />
                {loading ? (
                  <div className="grid h-full place-items-center">
                    <div className="h-64 w-64 animate-pulse rounded-[30px] bg-black/5" />
                  </div>
                ) : (
                  heroImage && (
                    <img
                      src={heroImage}
                      alt={heroPc?.name || 'Featured PC'}
                      width="520"
                      height="430"
                      className="relative h-full min-h-[360px] w-full object-contain p-8 transition duration-300 hover:scale-[1.02]"
                      decoding="async"
                      fetchPriority="high"
                    />
                  )
                )}
              </div>
            </div>
          </motion.div>

          {error && <div className="mt-4 rounded-3xl border border-red-400/20 bg-red-500/10 p-5 text-sm font-bold text-red-700">{error.message}</div>}
        </section>

        <section className="container-max py-8">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {categoryLinks.map(({ label, to, icon: Icon }, index) => (
              <motion.div
                key={label}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.2, delay: index * 0.035, ease: easeOut }}
              >
                <Link to={to} className="group flex min-h-24 flex-col justify-between rounded-[24px] border border-[var(--line)] bg-[var(--surface-1)] p-4 transition hover:-translate-y-0.5 hover:bg-[var(--surface-hover)]">
                  <Icon className="h-5 w-5 text-[var(--ink-muted)] transition group-hover:text-[var(--ink)]" />
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-lg font-black tracking-[-.04em]">{label}</span>
                    <ArrowRight className="h-4 w-4 text-[var(--ink-muted)] transition group-hover:translate-x-0.5 group-hover:text-[var(--ink)]" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="container-max py-4">
          <SectionHeader title="Shop bestsellers" to="/prebuilt" />
          {loading ? (
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5"><ProductSkeleton /><ProductSkeleton /><ProductSkeleton /><ProductSkeleton /><ProductSkeleton /></div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              {bestsellers.map((pc, index) => <SystemProduct key={pc.id} pc={pc} index={index} />)}
            </div>
          )}
        </section>

        <section className="container-max py-8">
          <div className="rounded-[30px] border border-[var(--line)] bg-[var(--surface-1)] p-5">
            <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="kicker mb-2">Most wanted</p>
                <h2 className="text-4xl font-black leading-none tracking-[-.065em]">Popular paths</h2>
              </div>
              <Link to="/gaming-pcs" className="btn-secondary w-fit">Browse all</Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {wanted.map(([label, to]) => (
                <Link key={label} to={to} className="rounded-full border border-[var(--line)] bg-[var(--surface-2)] px-4 py-2 text-sm font-black transition hover:-translate-y-0.5 hover:bg-[var(--surface-hover)]">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="container-max py-4">
          <SectionHeader title="Shop best deals" to="/gaming-pcs" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {deals.map((part, index) => <DealCard key={part.id} part={part} index={index} />)}
          </div>
        </section>

        <section className="container-max py-8">
          <div className="grid gap-3 lg:grid-cols-[.8fr_1.2fr]">
            <div className="spotlight spotlight-orange min-h-[300px] p-6 text-white">
              <div className="relative z-10 flex h-full flex-col justify-between">
                <p className="text-xs font-black uppercase tracking-[.12em] text-white/72">Guided build</p>
                <div>
                  <h2 className="max-w-sm text-5xl font-black leading-[.9] tracking-[-.07em]">Build without guessing.</h2>
                  <Link to="/build" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-black">
                    Start builder <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                [Gauge, 'Thermal balance', 'Airflow and cooling choices are surfaced before checkout.'],
                [PackageCheck, 'Ready inventory', 'Shop systems and parts with stock-aware catalog data.'],
                [ShieldCheck, 'Support after buy', 'Get help with setup, upgrades, and order questions.'],
                [Star, 'Real specs', 'Every card exposes the parts that drive the price.'],
              ].map(([Icon, title, copy]) => (
                <article key={title} className="rounded-[26px] border border-[var(--line)] bg-[var(--surface-1)] p-5">
                  <Icon className="mb-8 h-5 w-5 text-[var(--accent-heat)]" />
                  <h3 className="text-2xl font-black tracking-[-.05em]">{title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-[var(--ink-muted)]">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="container-max grid gap-3 pb-8 md:grid-cols-3">
          {(testimonials.length ? testimonials.slice(0, 3) : [
            { id: 'fallback-1', initials: 'CC', body: 'Clear component choices and clean pricing made comparing builds easier.' },
            { id: 'fallback-2', initials: 'PC', body: 'The builder flow makes upgrade tradeoffs visible without extra noise.' },
            { id: 'fallback-3', initials: 'QC', body: 'A compact storefront that still shows the details that matter.' },
          ]).map((t) => (
            <blockquote key={t.id} className="rounded-[26px] border border-[var(--line)] bg-[var(--surface-1)] p-5">
              <div className="mb-5 flex items-center justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--ink)] text-xs font-black text-[var(--canvas)]">{t.initials}</span>
                <Check className="h-4 w-4 text-[var(--success)]" />
              </div>
              <p className="line-clamp-3 text-sm font-semibold leading-6 text-[var(--ink-muted)]">{t.body}</p>
            </blockquote>
          ))}
        </section>
      </main>
    </RetailLayout>
  )
}

function SectionHeader({ title, to }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <h2 className="text-4xl font-black leading-none tracking-[-.065em]">{title}</h2>
      <Link to={to} className="icon-btn" aria-label={`Open ${title}`}><ArrowRight className="h-4 w-4" /></Link>
    </div>
  )
}

function SystemProduct({ pc, index }) {
  const image = pc.image || pc.case?.image || pc.gpu?.image || pc.cpu?.image
  return (
    <Link to="/prebuilt" className="group overflow-hidden rounded-[24px] border border-[var(--line)] bg-[var(--surface-1)] transition hover:-translate-y-0.5 hover:border-[var(--line-strong)]">
      <div className="relative grid h-48 place-items-center bg-[#f6f3ed]">
        <span className="absolute left-3 top-3 rounded-full bg-[var(--ink)] px-2.5 py-1 text-[10px] font-black text-[var(--canvas)]">#{index + 1}</span>
        {image && <img src={image} alt={pc.name} width="320" height="240" className="h-full w-full object-contain p-5 transition duration-300 group-hover:scale-[1.025]" loading="lazy" decoding="async" />}
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 min-h-11 text-[15px] font-black leading-[21px]">{pc.name}</h3>
        <div className="mt-3 flex items-center gap-1 text-xs font-black text-[var(--warning)]">
          <Star className="h-3.5 w-3.5 fill-current" /> 4.7/5
        </div>
        <div className="price mt-3 text-2xl font-black">{formatINR(pc.price)}</div>
        {pc.mrp && <div className="price text-xs font-bold text-[var(--ink-muted)] line-through">{formatINR(pc.mrp)}</div>}
      </div>
    </Link>
  )
}

function DealCard({ part, index }) {
  const mrp = part.mrp || part.originalPrice
  const save = mrp ? Math.max(0, mrp - part.price) : 0
  return (
    <Link to="/gaming-pcs" className="group overflow-hidden rounded-[24px] border border-[var(--line)] bg-[var(--surface-1)] transition hover:-translate-y-0.5 hover:border-[var(--line-strong)]">
      <div className="relative grid h-44 place-items-center bg-[#f6f3ed]">
        <span className="absolute left-3 top-3 rounded-full bg-[var(--accent-heat)] px-2.5 py-1 text-[10px] font-black text-white">
          {index < 3 ? 'Price drop' : 'In stock'}
        </span>
        <img src={part.image} alt={part.name} width="300" height="220" className="h-full w-full object-contain p-5 transition duration-300 group-hover:scale-[1.035]" loading="lazy" decoding="async" />
      </div>
      <div className="p-4">
        <div className="truncate text-[11px] font-black uppercase tracking-[.1em] text-[var(--ink-muted)]">{part.brand || part.category}</div>
        <h3 className="mt-1 line-clamp-2 min-h-10 text-sm font-black leading-5">{part.name}</h3>
        <div className="price mt-3 text-xl font-black">{formatINR(part.price)}</div>
        {save > 0 && <div className="mt-1 text-xs font-black text-[var(--success)]">Save {formatINR(save)}</div>}
      </div>
    </Link>
  )
}
