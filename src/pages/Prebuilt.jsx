import { useMemo, useState } from 'react'
import { Cpu, HardDrive, MemoryStick, Monitor, ShoppingCart, Sparkles } from 'lucide-react'
import RetailLayout from '@/components/retail/RetailLayout'
import PageHeader from '@/components/retail/PageHeader'
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

  return (
    <RetailLayout>
      <PageHeader
        kicker="Warranty-backed builds"
        title="Ready systems"
        description="Balanced configurations for play, work, and everything between."
      >
        <SelectMenu ariaLabel="Sort prebuilts" className="w-full sm:w-56" options={sortItems} value={sort} onChange={setSort} />
      </PageHeader>

      <section className="container-max py-10">
        {error && <div className="panel mb-6 rounded-xl p-5 text-red-200">{error.message}</div>}
        <div className="grid gap-4 lg:grid-cols-2">
          {loading && Array.from({ length: 4 }).map((_, i) => <div key={i} className="panel h-72 animate-pulse rounded-2xl" />)}
          {pcs.map((pc) => {
            const image = pc.case?.image || pc.gpu?.image || pc.cpu?.image
            return (
              <article key={pc.id} className="group overflow-hidden rounded-[24px] border border-[var(--line)] bg-[#111216] shadow-[0_14px_40px_rgba(0,0,0,.28)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--line-strong)]">
                <div className="grid sm:grid-cols-[165px_1fr]">
                  <div className="relative grid min-h-[196px] place-items-center border-b border-[var(--line)] bg-[#f7f7f3] p-3 sm:border-b-0 sm:border-r">
                    <img src={image} alt={pc.name} width="280" height="200" className="h-[152px] w-full object-contain transition duration-300 group-hover:scale-[1.025]" loading="lazy" decoding="async" />
                    <span className="absolute left-3 top-3 z-10 rounded-full bg-black px-2.5 py-1 text-[10px] font-black uppercase tracking-[.05em] text-white shadow-[0_10px_24px_rgba(0,0,0,.18)]">{pc.badge}</span>
                  </div>
                  <div className="flex flex-col p-3.5">
                    <div className="mb-2.5 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="mb-1.5 inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[.12em] muted">
                          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                          Ready system
                        </p>
                        <h2 className="truncate text-[22px] font-black leading-none tracking-[-.045em]">{pc.name}</h2>
                        <p className="mt-1 line-clamp-1 max-w-sm text-xs font-bold leading-5 muted">{pc.tagline}</p>
                      </div>
                      <div className="text-right">
                        <div className="price text-xl font-black leading-none">{formatINR(pc.price)}</div>
                        <div className="price text-xs font-bold text-white/35 line-through">{formatINR(pc.mrp)}</div>
                      </div>
                    </div>

                    <div className="grid gap-1">
                      <Spec icon={Cpu} label="CPU" value={pc.cpu?.name} />
                      <Spec icon={Monitor} label="GPU" value={pc.gpu?.name} />
                      <Spec icon={MemoryStick} label="RAM" value={pc.ram?.name} />
                      <Spec icon={HardDrive} label="SSD" value={pc.storage?.name} />
                    </div>

                    <div className="mt-auto grid grid-cols-4 gap-1.5 pt-2.5 text-center">
                      <Metric value={pc.fps_1080p} label="1080p" />
                      <Metric value={pc.fps_1440p} label="1440p" />
                      <Metric value={pc.fps_4k} label="4K" />
                      <Metric value={pc.stock} label="Stock" />
                    </div>

                    <div className="mt-2.5 flex gap-2">
                      <button type="button" onClick={() => addToCart({ ...pc, image })} className="btn-primary min-h-10 flex-1 text-sm">
                        <ShoppingCart className="h-4 w-4" /> Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </RetailLayout>
  )
}

function Spec({ icon: Icon, label, value }) {
  return (
    <div className="grid grid-cols-[22px_38px_1fr] items-center gap-1.5 rounded-[9px] border border-white/8 bg-white/[.025] px-2 py-1">
      <span className="grid h-5.5 w-5.5 place-items-center rounded-full bg-white/[.06] text-white/70">
        <Icon className="h-3 w-3" aria-hidden="true" />
      </span>
      <span className="text-[10px] font-black uppercase tracking-wide text-white/38">{label}</span>
      <span className="truncate text-[11px] font-bold text-white/78">{value || 'Selected part'}</span>
    </div>
  )
}

function Metric({ value, label }) {
  return (
    <div className="rounded-[10px] border border-white/10 bg-black/20 p-1.5">
      <div className="font-mono text-sm font-black leading-none text-[var(--ink)]">{value}</div>
      <div className="mt-1 text-[9px] font-black uppercase tracking-[.05em] text-white/42">{label}</div>
    </div>
  )
}
