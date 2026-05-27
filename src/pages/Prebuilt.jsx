import { useMemo, useState } from 'react'
import { ExternalLink, ShoppingCart } from 'lucide-react'
import RetailLayout from '@/components/retail/RetailLayout'
import PageHeader from '@/components/retail/PageHeader'
import { fetchPrebuilts } from '@/lib/supabase'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'
import { formatINR } from '@/utils/currency'
import useStore from '@/store/useStore'

export default function Prebuilt() {
  const [sort, setSort] = useState('price-asc')
  const { data = [], loading, error } = useSupabaseQuery(fetchPrebuilts, [])
  const { addToCart } = useStore()

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
        title="Prebuilt gaming PCs configured from real catalog parts"
        description="Every system here is built from the Supabase component catalog scraped from MD Computers, with INR pricing and actual component images."
      >
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="input-base w-full sm:w-56" aria-label="Sort prebuilts">
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="fps">Best 1440p FPS</option>
          <option value="stock">Most stock</option>
        </select>
      </PageHeader>

      <section className="container-max py-10">
        {error && <div className="panel mb-6 rounded-xl p-5 text-red-200">{error.message}</div>}
        <div className="grid gap-6 lg:grid-cols-2">
          {loading && Array.from({ length: 4 }).map((_, i) => <div key={i} className="panel h-96 animate-pulse rounded-2xl" />)}
          {pcs.map((pc) => {
            const image = pc.case?.image || pc.gpu?.image || pc.cpu?.image
            return (
              <article key={pc.id} className="panel overflow-hidden rounded-2xl">
                <div className="grid lg:grid-cols-[.9fr_1.1fr]">
                  <div className="product-image-box relative min-h-80 bg-[#141820]">
                    <img src={image} alt={pc.name} className="absolute inset-0 h-full w-full object-contain p-7" />
                    <span className="absolute left-4 top-4 rounded-md bg-white px-3 py-1 text-xs font-black text-black">{pc.badge}</span>
                  </div>
                  <div className="p-6">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-black tracking-tight">{pc.name}</h2>
                        <p className="mt-1 text-sm leading-6 text-white/55">{pc.tagline}</p>
                      </div>
                      <div className="text-right">
                        <div className="price text-2xl font-black">{formatINR(pc.price)}</div>
                        <div className="price text-xs font-bold text-white/35 line-through">{formatINR(pc.mrp)}</div>
                      </div>
                    </div>

                    <div className="grid gap-2 text-sm">
                      <Spec label="CPU" value={pc.cpu?.name} />
                      <Spec label="GPU" value={pc.gpu?.name} />
                      <Spec label="RAM" value={pc.ram?.name} />
                      <Spec label="Storage" value={pc.storage?.name} />
                    </div>

                    <div className="mt-5 grid grid-cols-4 gap-2 text-center">
                      <Metric value={pc.fps_1080p} label="1080p" />
                      <Metric value={pc.fps_1440p} label="1440p" />
                      <Metric value={pc.fps_4k} label="4K" />
                      <Metric value={pc.stock} label="Stock" />
                    </div>

                    <div className="mt-5 flex gap-2">
                      <button onClick={() => addToCart({ ...pc, image })} className="btn-primary flex-1">
                        <ShoppingCart className="h-4 w-4" /> Add to cart
                      </button>
                      {pc.gpu?.source_url && (
                        <a href={pc.gpu.source_url} target="_blank" rel="noreferrer" className="btn-secondary px-3" aria-label="Open source GPU">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
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

function Spec({ label, value }) {
  return (
    <div className="grid grid-cols-[72px_1fr] gap-3 rounded-lg border border-white/8 bg-white/[.025] px-3 py-2">
      <span className="text-xs font-black uppercase tracking-wide text-white/35">{label}</span>
      <span className="truncate text-white/78">{value || 'Selected part'}</span>
    </div>
  )
}

function Metric({ value, label }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/18 p-2">
      <div className="font-mono text-lg font-black text-[#f26522]">{value}</div>
      <div className="text-[11px] font-bold text-white/42">{label}</div>
    </div>
  )
}
