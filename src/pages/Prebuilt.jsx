import { useMemo, useState } from 'react'
import { Cpu, MemoryStick, Monitor, ShoppingBag } from 'lucide-react'
import RetailLayout from '@/components/retail/RetailLayout'
import PageHeader from '@/components/retail/PageHeader'
import SelectMenu from '@/components/ui/SelectMenu'
import { ErrorBanner, EmptyPanel } from '@/components/retail/StatusPanel'
import ProductDialog from '@/components/retail/ProductDialog'
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
    { value: 'price-asc', label: 'Price · low to high' },
    { value: 'price-desc', label: 'Price · high to low' },
    { value: 'stock', label: 'Stock' },
  ]

  const pcs = useMemo(() => {
    return [...data].sort((a, b) => {
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'stock') return b.stock - a.stock
      return a.price - b.price
    })
  }, [data, sort])

  return (
    <RetailLayout>
      <PageHeader
        kicker="Issue 02 · Systems"
        title="Ready-to-ship builds."
        description="Assembled, benched, and shipped from Chennai."
      >
        <SelectMenu ariaLabel="Sort systems" className="w-full sm:w-[260px]" options={sortItems} value={sort} onChange={setSort} />
      </PageHeader>

      <section className="container-max py-40">
        {error && <ErrorBanner className="mb-24" message={error.message} />}

        {loading && (
          <div className="grid gap-px bg-line sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
            {Array.from({ length: 8 }).map((_, index) => <SystemSkeleton key={index} />)}
          </div>
        )}

        {!loading && pcs.length === 0 && (
          <EmptyPanel title="No systems available" copy="Inventory sync running. Check back soon." />
        )}

        {!loading && pcs.length > 0 && (
          <div className="grid gap-px bg-line sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
            {pcs.map((pc, index) => {
              const image = pc.image || pc.case?.image || pc.gpu?.image || pc.cpu?.image
              return <SystemCard key={pc.id} pc={pc} image={image} index={index} addToCart={addToCart} />
            })}
          </div>
        )}
      </section>
    </RetailLayout>
  )
}

function SystemCard({ pc, image, index, addToCart }) {
  const [open, setOpen] = useState(false)
  const product = {
    ...pc,
    image,
    brand: pc.badge || 'System',
    highlights: [
      pc.cpu?.name && `${pc.cpu.name} processor`,
      pc.gpu?.name && `${pc.gpu.name} graphics`,
      pc.ram?.name && `${pc.ram.name} memory`,
      pc.storage?.name && `${pc.storage.name} storage`,
      pc.cooler?.name && `${pc.cooler.name} cooling`,
      pc.case?.name && `${pc.case.name} chassis`,
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
      <article
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(true) } }}
        aria-label={`View details for ${pc.name}`}
        className="group glow-on-hover flex min-w-0 cursor-pointer flex-col border border-transparent bg-surface-1 transition hover:bg-canvas focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink"
      >
        <div className="flex items-center justify-between px-16 pt-12">
          <span className="meta">#{String(index + 1).padStart(2, '0')} · {pc.badge || 'System'}</span>
          <span className="meta">Stock {pc.stock || 0}</span>
        </div>
        <div className="product-image-box relative grid h-[200px] place-items-center overflow-hidden">
          {image && (
            <img
              src={image}
              alt={pc.name}
              width="320"
              height="240"
              className="relative max-h-[160px] w-[80%] max-w-[240px] object-contain drop-shadow-[0_14px_18px_rgba(0,0,0,.18)] transition duration-300 group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-10 border-t border-border-muted p-16">
          <h2 className="line-clamp-2 min-h-[40px] text-body-medium font-semibold leading-20 tracking-[-.005em]">{pc.name}</h2>
          <ul className="grid min-w-0 gap-4 text-label-x-small text-ink-soft">
            {pc.cpu?.name && <Spec icon={Cpu} value={pc.cpu.name} />}
            {pc.gpu?.name && <Spec icon={Monitor} value={pc.gpu.name} />}
            {pc.ram?.name && <Spec icon={MemoryStick} value={pc.ram.name} />}
          </ul>
          <div className="mt-auto flex items-end justify-between gap-8 border-t border-border-muted pt-12">
            <div className="min-w-0">
              <p className="price text-title-h5 font-semibold leading-none">{formatINR(pc.price)}</p>
              {pc.mrp && <p className="price mt-4 text-label-x-small font-normal text-ink-muted line-through">{formatINR(pc.mrp)}</p>}
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); addToCart({ ...pc, image }) }}
              className="grid h-40 w-40 shrink-0 place-items-center border border-ink bg-ink text-canvas transition hover:bg-accent-heat hover:border-accent-heat"
              aria-label={`Add ${pc.name} to cart`}
            >
              <ShoppingBag className="h-14 w-14" aria-hidden="true" />
            </button>
          </div>
        </div>
      </article>
      <ProductDialog product={product} open={open} onClose={() => setOpen(false)} />
    </>
  )
}

function Spec({ icon: Icon, value }) {
  return (
    <li className="flex min-w-0 items-center gap-8">
      <Icon className="h-12 w-12 shrink-0 text-ink-muted" aria-hidden="true" />
      <span className="min-w-0 flex-1 truncate">{value}</span>
    </li>
  )
}

function SystemSkeleton() {
  return (
    <div className="bg-surface-1">
      <div className="px-16 pt-12">
        <div className="h-12 w-24 animate-pulse bg-surface-2" />
      </div>
      <div className="h-[200px] animate-pulse bg-surface-2" />
      <div className="space-y-8 border-t border-border-muted p-16">
        <div className="h-16 w-4/5 animate-pulse bg-surface-2" />
        <div className="h-12 w-1/2 animate-pulse bg-surface-2" />
        <div className="flex items-center justify-between pt-12">
          <div className="h-20 w-24 animate-pulse bg-surface-2" />
          <div className="h-40 w-40 animate-pulse bg-surface-2" />
        </div>
      </div>
    </div>
  )
}
