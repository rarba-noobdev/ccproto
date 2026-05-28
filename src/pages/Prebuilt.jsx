import { useMemo, useState } from 'react'
import {
  ArrowRight,
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
  Zap,
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

            <aside className="overflow-hidden rounded-[34px] border border-[var(--line)] bg-[var(--surface-1)] shadow-[0_24px_80px_rgba(38,38,38,.10)]">
              <div className="relative grid min-h-[240px] place-items-center overflow-hidden bg-[#f6f3ed] p-6">
                <span className="absolute left-5 top-5 rounded-full bg-[var(--accent-heat)] px-3 py-1 text-[11px] font-black uppercase tracking-[.08em] text-white">
                  {featured?.badge || 'Featured'}
                </span>
                <div className="absolute inset-x-10 bottom-5 h-10 rounded-full bg-black/10 blur-xl" aria-hidden="true" />
                {heroImage && <img src={heroImage} alt={featured?.name || 'Featured ready system'} width="420" height="320" className="relative max-h-[205px] w-[82%] max-w-[320px] object-contain drop-shadow-[0_18px_18px_rgba(0,0,0,.18)]" decoding="async" fetchPriority="high" />}
              </div>
              <div className="p-5">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="truncate text-2xl font-black tracking-[-.055em]">{featured?.name || 'Ready system'}</h2>
                    <p className="mt-1 truncate text-xs font-bold text-[var(--ink-muted)]">{featured?.tagline || 'Configured for performance'}</p>
                  </div>
                  <div className="price shrink-0 text-2xl font-black">{formatINR(featured?.price || 0)}</div>
                </div>
                <button
                  type="button"
                  disabled={!featured}
                  onClick={() => featured && addToCart({ ...featured, image: heroImage })}
                  className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ShoppingCart className="h-4 w-4" /> Add featured
                </button>
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
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
    <article className="group flex overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--surface-1)] shadow-[0_16px_46px_rgba(38,38,38,.08)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--line-strong)] hover:shadow-[0_22px_56px_rgba(38,38,38,.12)]">
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="relative grid h-44 place-items-center overflow-hidden border-b border-[var(--line)] bg-[#f6f3ed] p-4">
          <div className="absolute inset-x-8 bottom-4 h-8 rounded-full bg-black/10 blur-xl" aria-hidden="true" />
          <span className="absolute left-4 top-4 rounded-full bg-[var(--ink)] px-2.5 py-1 text-[10px] font-black uppercase tracking-[.08em] text-[var(--canvas)]">
            {index === 0 ? 'Best pick' : pc.badge || `P${index + 1}`}
          </span>
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border border-[var(--line)] bg-white px-2.5 py-1 text-[10px] font-black text-[var(--ink-muted)]">
            <Star className="h-3 w-3 fill-[var(--warning)] text-[var(--warning)]" /> 4.7
          </span>
          {image && <img src={image} alt={pc.name} width="420" height="300" className="relative max-h-[138px] w-[78%] max-w-[260px] object-contain drop-shadow-[0_14px_16px_rgba(0,0,0,.16)] transition duration-300 group-hover:scale-[1.025]" loading="lazy" decoding="async" />}
        </div>

        <div className="flex flex-1 flex-col p-4">
          <div className="mb-3 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="mb-2 inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[.12em] text-[var(--ink-muted)]">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Ready system
              </p>
              <h2 className="line-clamp-1 text-xl font-black leading-6 tracking-[-.05em]">{pc.name}</h2>
              <p className="mt-1 line-clamp-1 text-sm font-semibold text-[var(--ink-muted)]">{pc.tagline}</p>
            </div>
          </div>

          <div className="grid gap-1.5">
            <Spec icon={Cpu} label="CPU" value={pc.cpu?.name} />
            <Spec icon={Monitor} label="GPU" value={pc.gpu?.name} />
            <Spec icon={MemoryStick} label="RAM" value={pc.ram?.name} />
            <Spec icon={HardDrive} label="SSD" value={pc.storage?.name} />
          </div>

          <div className="mt-3 grid grid-cols-4 gap-1.5 text-center">
            <Metric value={pc.fps_1080p} label="1080p" />
            <Metric value={pc.fps_1440p} label="1440p" />
            <Metric value={pc.fps_4k} label="4K" />
            <Metric value={pc.stock} label="Stock" />
          </div>

          <div className="mt-4 flex items-end justify-between gap-4 border-t border-[var(--line)] pt-4">
            <div>
              <div className="price text-2xl font-black leading-none">{formatINR(pc.price)}</div>
              {pc.mrp && <div className="price mt-1 text-sm font-bold text-[var(--ink-muted)] line-through">{formatINR(pc.mrp)}</div>}
            </div>
            <button type="button" onClick={() => addToCart({ ...pc, image })} className="btn-primary min-h-11 px-5 text-sm">
              <ShoppingCart className="h-4 w-4" /> Add
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

function Spec({ icon: Icon, label, value }) {
  return (
    <div className="grid min-w-0 grid-cols-[26px_44px_1fr] items-center gap-2 rounded-[14px] border border-[var(--line)] bg-[var(--surface-2)] px-3 py-2">
      <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-[var(--ink-soft)] shadow-[inset_0_1px_0_rgba(255,255,255,.9)]">
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
      <span className="text-[10px] font-black uppercase tracking-wide text-[var(--ink-muted)]">{label}</span>
      <span className="truncate text-xs font-black text-[var(--ink-soft)]">{value || 'Selected part'}</span>
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
    <div className="overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--surface-1)]">
      <div className="h-60 animate-pulse bg-black/5" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-20 animate-pulse rounded-full bg-black/10" />
        <div className="h-7 w-full animate-pulse rounded-full bg-black/10" />
        <div className="h-5 w-2/3 animate-pulse rounded-full bg-black/10" />
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-14 animate-pulse rounded-[14px] bg-black/10" />)}
        </div>
      </div>
    </div>
  )
}
