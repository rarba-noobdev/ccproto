import { useMemo, useState } from 'react'
import {
  Cpu,
  Gauge,
  HardDrive,
  MemoryStick,
  Monitor,
  PackageCheck,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
} from 'lucide-react'
import RetailLayout from '@/components/retail/RetailLayout'
import SelectMenu from '@/components/ui/SelectMenu'
import { fetchPrebuilts } from '@/lib/supabase'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'
import { formatINR } from '@/utils/currency'
import useStore from '@/store/useStore'

export default function Prebuilt() {
  const [sort, setSort] = useState('price-asc')
  const { data: result = [], loading, error } = useSupabaseQuery(fetchPrebuilts, [])
  const data = Array.isArray(result) ? result : []
  const { addToCart } = useStore()
  const sortItems = [
    { value: 'price-asc', label: 'Price: low to high' },
    { value: 'price-desc', label: 'Price: high to low' },
    { value: 'fps', label: 'Best 1440p FPS' },
    { value: 'stock', label: 'Most stock' },
  ]

  const pcs = useMemo(() => {
    return [...data].sort((a, b) => {
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'fps') return b.fps_1440p - a.fps_1440p
      if (sort === 'stock') return b.stock - a.stock
      return a.price - b.price
    })
  }, [data, sort])

  const featured = pcs[0]
  const heroImage = featured?.image || featured?.case?.image || featured?.gpu?.image || featured?.cpu?.image

  return (
    <RetailLayout>
      <main>
        <section className="container-max pt-8">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_390px]">
            <div className="relative overflow-hidden rounded-[34px] border border-[var(--line)] bg-[var(--surface-1)] p-6 shadow-[0_24px_80px_rgba(38,38,38,.12)] sm:p-8 lg:p-10">
              <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-black/15 to-transparent" />
              <p className="kicker mb-5"><Sparkles className="h-4 w-4" /> Ready systems</p>
              <h1 className="max-w-4xl text-[54px] font-black leading-[.86] tracking-[-.08em] sm:text-[84px]">
                Performance PCs without the part hunt.
              </h1>
              <p className="mt-6 max-w-2xl text-base font-semibold leading-7 text-[var(--ink-muted)]">
                Curated gaming and creator systems with visible components, benchmark estimates, stock status, and checkout-ready pricing.
              </p>
              <div className="mt-7 grid gap-2 sm:grid-cols-3">
                {[
                  [PackageCheck, 'Bench ready', 'Assembly & QC path'],
                  [ShieldCheck, 'Support backed', 'Help after checkout'],
                  [Gauge, 'Thermal aware', 'Balanced airflow'],
                ].map(([Icon, title, copy]) => (
                  <div key={title} className="rounded-[20px] border border-[var(--line)] bg-[var(--surface-2)] p-4">
                    <Icon className="mb-4 h-5 w-5 text-[var(--accent-heat)]" />
                    <div className="text-sm font-black tracking-[-.02em]">{title}</div>
                    <div className="mt-1 text-xs font-bold text-[var(--ink-muted)]">{copy}</div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="flex h-full overflow-hidden rounded-[34px] border border-[var(--line)] bg-[var(--surface-1)] shadow-[0_24px_80px_rgba(38,38,38,.10)]">
              <div className="flex min-w-0 flex-1 flex-col">
              <div className="relative grid min-h-[230px] place-items-center overflow-hidden bg-[#f6f3ed] p-6">
                <span className="absolute left-5 top-5 rounded-full bg-[var(--accent-heat)] px-3 py-1 text-[11px] font-black uppercase tracking-[.08em] text-white">
                  {featured?.badge || 'Featured'}
                </span>
                <div className="absolute inset-x-10 bottom-5 h-10 rounded-full bg-black/10 blur-xl" aria-hidden="true" />
                {heroImage && <img src={heroImage} alt={featured?.name || 'Featured ready system'} width="420" height="320" className="relative max-h-[195px] w-[80%] max-w-[300px] object-contain drop-shadow-[0_18px_18px_rgba(0,0,0,.18)]" decoding="async" fetchPriority="high" />}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="truncate text-2xl font-black tracking-[-.055em]">{featured?.name || 'Ready system'}</h2>
                    <p className="mt-1 truncate text-xs font-bold text-[var(--ink-muted)]">{featured?.tagline || 'Configured for performance'}</p>
                  </div>
                  <div className="price shrink-0 text-2xl font-black">{formatINR(featured?.price || 0)}</div>
                </div>

                <div className="grid gap-2">
                  <FeaturedSpec icon={Cpu} label="CPU" value={featured?.cpu?.name} />
                  <FeaturedSpec icon={Monitor} label="GPU" value={featured?.gpu?.name} />
                  <FeaturedSpec icon={MemoryStick} label="Memory" value={featured?.ram?.name} />
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <Metric value={featured?.fps_1440p} label="1440p" />
                  <Metric value={featured?.stock} label="Stock" />
                  <Metric value={featured?.rating || 4.8} label="Rating" />
                </div>

                <button
                  type="button"
                  disabled={!featured}
                  onClick={() => featured && addToCart({ ...featured, image: heroImage })}
                  className="btn-primary mt-auto w-full disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ShoppingCart className="h-4 w-4" /> Add featured
                </button>
              </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="container-max py-8">
          <div className="mb-5 flex flex-col gap-4 border-b border-[var(--line)] pb-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="kicker mb-2">Catalog</p>
              <h2 className="text-4xl font-black leading-none tracking-[-.065em]">Ready-to-ship builds</h2>
            </div>
            <SelectMenu ariaLabel="Sort prebuilts" className="w-full sm:w-64" options={sortItems} value={sort} onChange={setSort} />
          </div>

          {error && <div className="panel mb-6 rounded-xl p-5 text-red-700">{error.message}</div>}

          {loading && (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 6 }).map((_, index) => <SystemSkeleton key={index} />)}
            </div>
          )}

          {!loading && pcs.length === 0 && (
            <div className="panel grid min-h-64 place-items-center rounded-[30px] p-8 text-center">
              <div>
                <p className="text-2xl font-black tracking-[-.05em]">No systems available</p>
                <p className="mt-2 text-sm font-semibold text-[var(--ink-muted)]">Check back after inventory sync finishes.</p>
              </div>
            </div>
          )}

          {!loading && pcs.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {pcs.map((pc, index) => {
                const image = pc.image || pc.case?.image || pc.gpu?.image || pc.cpu?.image
                return <SystemCard key={pc.id} pc={pc} image={image} index={index} addToCart={addToCart} />
              })}
            </div>
          )}
        </section>
      </main>
    </RetailLayout>
  )
}

function SystemCard({ pc, image, index, addToCart }) {
  return (
    <article className="group flex overflow-hidden rounded-[26px] border border-[var(--line)] bg-[var(--surface-1)] shadow-[0_12px_34px_rgba(38,38,38,.07)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--line-strong)] hover:shadow-[0_18px_44px_rgba(38,38,38,.10)]">
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="relative m-2 grid h-36 place-items-center overflow-hidden rounded-[22px] border border-[var(--line)] bg-[#f6f3ed] p-3">
          <div className="absolute inset-x-8 bottom-3 h-7 rounded-full bg-black/10 blur-xl" aria-hidden="true" />
          <span className="absolute left-3 top-3 rounded-full bg-[var(--ink)] px-2.5 py-1 text-[10px] font-black uppercase tracking-[.08em] text-[var(--canvas)]">
            {index === 0 ? 'Best pick' : pc.badge || `P${index + 1}`}
          </span>
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-[var(--line)] bg-white px-2.5 py-1 text-[10px] font-black text-[var(--ink-muted)]">
            <Star className="h-3 w-3 fill-[var(--warning)] text-[var(--warning)]" /> 4.7
          </span>
          {image && <img src={image} alt={pc.name} width="360" height="240" className="relative max-h-[104px] w-[74%] max-w-[210px] object-contain drop-shadow-[0_12px_14px_rgba(0,0,0,.14)] transition duration-300 group-hover:scale-[1.025]" loading="lazy" decoding="async" />}
        </div>

        <div className="flex flex-1 flex-col p-4 pt-2">
          <div className="mb-3 min-w-0">
            <p className="mb-1 inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[.12em] text-[var(--ink-muted)]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Ready system
            </p>
            <h2 className="line-clamp-1 text-[19px] font-black leading-6 tracking-[-.05em]">{pc.name}</h2>
            <p className="mt-1 line-clamp-1 text-xs font-bold text-[var(--ink-muted)]">{pc.tagline}</p>
          </div>

          <div className="grid gap-1.5 rounded-[18px] border border-[var(--line)] bg-[var(--surface-2)] p-2.5">
            <SummarySpec icon={Monitor} value={pc.gpu?.name} />
            <SummarySpec icon={Cpu} value={pc.cpu?.name} />
          </div>

          <div className="mt-2 flex flex-wrap gap-1.5">
            <Chip icon={MemoryStick} value={compactPart(pc.ram?.name, 'DDR5')} />
            <Chip icon={HardDrive} value={compactPart(pc.storage?.name, 'SSD')} />
            <Chip icon={Gauge} value={`${pc.fps_1440p || '-'} FPS`} />
          </div>

          <div className="mt-4 flex items-end justify-between gap-3 border-t border-[var(--line)] pt-3">
            <div className="min-w-0">
              <div className="price text-[22px] font-black leading-none">{formatINR(pc.price)}</div>
              {pc.mrp && <div className="price mt-1 text-sm font-bold text-[var(--ink-muted)] line-through">{formatINR(pc.mrp)}</div>}
            </div>
            <button type="button" onClick={() => addToCart({ ...pc, image })} className="btn-primary min-h-10 px-4 text-sm">
              <ShoppingCart className="h-4 w-4" /> Add
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

function compactPart(value, fallback) {
  const text = value || fallback
  const capacity = text.match(/\b\d+\s?GB\b/i)?.[0]
  const speed = text.match(/\b\d{4,5}\s?(?:MT\/s|MTS|MHz)\b/i)?.[0]
  return [capacity, speed].filter(Boolean).join(' ') || fallback
}

function SummarySpec({ icon: Icon, value }) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--ink-muted)]" aria-hidden="true" />
      <span className="truncate text-xs font-black text-[var(--ink-soft)]">{value || 'Configured part'}</span>
    </div>
  )
}

function Chip({ icon: Icon, value }) {
  return (
    <span className="inline-flex min-h-7 items-center gap-1.5 rounded-full bg-[var(--surface-2)] px-2.5 text-[11px] font-black text-[var(--ink-muted)]">
      <Icon className="h-3 w-3" aria-hidden="true" />
      {value}
    </span>
  )
}

function FeaturedSpec({ icon: Icon, label, value }) {
  return (
    <div className="grid min-w-0 grid-cols-[30px_64px_1fr] items-center gap-2 rounded-[16px] border border-[var(--line)] bg-[var(--surface-2)] px-3 py-2.5">
      <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[var(--ink-soft)] shadow-[inset_0_1px_0_rgba(255,255,255,.9)]">
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
      <span className="text-[10px] font-black uppercase tracking-wide text-[var(--ink-muted)]">{label}</span>
      <span className="truncate text-xs font-black text-[var(--ink-soft)]">{value || 'Configured part'}</span>
    </div>
  )
}

function Metric({ value, label }) {
  return (
    <div className="rounded-[14px] border border-[var(--line)] bg-white p-2 shadow-[inset_0_1px_0_rgba(255,255,255,.9)]">
      <div className="font-mono text-base font-black leading-none text-[var(--ink)]">{value || '-'}</div>
      <div className="mt-1 text-[9px] font-black uppercase tracking-[.05em] text-[var(--ink-muted)]">{label}</div>
    </div>
  )
}

function SystemSkeleton() {
  return (
    <div className="overflow-hidden rounded-[26px] border border-[var(--line)] bg-[var(--surface-1)]">
      <div className="m-2 h-36 animate-pulse rounded-[22px] bg-black/5" />
      <div className="space-y-3 p-4 pt-2">
        <div className="h-4 w-20 animate-pulse rounded-full bg-black/10" />
        <div className="h-6 w-4/5 animate-pulse rounded-full bg-black/10" />
        <div className="h-4 w-1/2 animate-pulse rounded-full bg-black/10" />
        <div className="space-y-2 rounded-[18px] border border-[var(--line)] bg-[var(--surface-2)] p-3">
          <div className="h-3 w-full animate-pulse rounded-full bg-black/10" />
          <div className="h-3 w-3/4 animate-pulse rounded-full bg-black/10" />
        </div>
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, index) => <div key={index} className="h-7 w-16 animate-pulse rounded-full bg-black/10" />)}
        </div>
      </div>
    </div>
  )
}
