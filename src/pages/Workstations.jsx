import { useState } from 'react'
import { Cpu, MemoryStick, Monitor, ShoppingBag } from 'lucide-react'
import RetailLayout from '@/components/retail/RetailLayout'
import PageHeader from '@/components/retail/PageHeader'
import { ErrorBanner } from '@/components/retail/StatusPanel'
import ProductDialog from '@/components/retail/ProductDialog'
import { fetchPrebuilts } from '@/lib/supabase'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'
import { formatINR } from '@/utils/currency'
import useStore from '@/store/useStore'

export default function Workstations() {
  const { data: result = [], loading, error } = useSupabaseQuery(fetchPrebuilts, [])
  const data = Array.isArray(result) ? result : []
  const { addToCart } = useStore()
  const workstations = data.filter((p) => p.name?.includes('WORK') || p.use_cases?.some((u) => /render|creator|editing|ai/i.test(u)))
  const list = workstations.length ? workstations : data.slice(-2)

  return (
    <RetailLayout>
      <PageHeader
        kicker="Issue 03 · Workstations"
        title="Built for render, edit, compile."
        description="Quiet thermals, certified components, three-year warranty."
      />
      <section className="container-max py-40">
        {error && <ErrorBanner className="mb-24" message={error.message} />}
        {loading ? (
          <div className="grid gap-px bg-line sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-surface-1">
                <div className="h-[260px] animate-pulse bg-surface-2" />
                <div className="space-y-10 p-20">
                  <div className="h-20 w-3/4 animate-pulse bg-surface-2" />
                  <div className="h-12 w-1/2 animate-pulse bg-surface-2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-px bg-line sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {list.map((pc) => (
              <WorkstationCard key={pc.id} pc={pc} onAdd={(image) => addToCart({ ...pc, image })} />
            ))}
          </div>
        )}
      </section>
    </RetailLayout>
  )
}

function WorkstationCard({ pc, onAdd }) {
  const image = pc.image || pc.case?.image || pc.gpu?.image || pc.cpu?.image
  const [open, setOpen] = useState(false)
  const product = {
    ...pc,
    image,
    brand: pc.badge || 'Workstation',
    highlights: [
      pc.tagline,
      pc.cpu?.name && `${pc.cpu.name} processor`,
      pc.gpu?.name && `${pc.gpu.name} graphics`,
      pc.ram?.name && `${pc.ram.name} memory`,
      ...(Array.isArray(pc.use_cases) ? pc.use_cases : []),
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
      <div className="flex items-center justify-between border-b border-border-muted px-16 py-12">
        <span className="meta">{pc.badge || 'Workstation'}</span>
        <span className="meta">{pc.use_cases?.[0] || '—'}</span>
      </div>
      <div className="hardware-stage relative grid h-[260px] place-items-center overflow-hidden">
        {image && (
          <img
            src={image}
            alt={pc.name}
            width="420"
            height="320"
            className="hardware-image relative max-h-[200px] w-[78%] max-w-[300px] object-contain transition duration-4 group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-12 p-20">
        <h2 className="line-clamp-2 text-title-h5 font-semibold tracking-[-.02em]">{pc.name}</h2>
        {pc.tagline && <p className="line-clamp-1 text-body-small text-ink-soft">{pc.tagline}</p>}

        <ul className="grid min-w-0 gap-6 text-label-x-small text-ink-soft">
          {pc.cpu?.name && <Spec icon={Cpu} value={pc.cpu.name} />}
          {pc.gpu?.name && <Spec icon={Monitor} value={pc.gpu.name} />}
          {pc.ram?.name && <Spec icon={MemoryStick} value={pc.ram.name} />}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-12 border-t border-border-muted pt-16">
          <div>
            <p className="price text-title-h4 font-semibold leading-none">{formatINR(pc.price)}</p>
            {pc.mrp && <p className="price mt-4 text-label-x-small font-normal text-ink-muted line-through">{formatINR(pc.mrp)}</p>}
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onAdd(image) }}
            className="btn-primary min-h-40 px-14 text-body-small"
            aria-label={`Add ${pc.name} to cart`}
            data-tone="heat"
          >
            <ShoppingBag className="h-14 w-14" aria-hidden="true" /> Add
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
