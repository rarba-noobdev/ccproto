import RetailLayout from '@/components/retail/RetailLayout'
import PageHeader from '@/components/retail/PageHeader'
import { fetchPrebuilts } from '@/lib/supabase'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'
import { formatINR } from '@/utils/currency'
import useStore from '@/store/useStore'

export default function Workstations() {
  const { data: result = [], loading, error } = useSupabaseQuery(fetchPrebuilts, [])
  const data = Array.isArray(result) ? result : []
  const { addToCart } = useStore()
  const workstations = data.filter((p) => p.name?.includes('WORK') || p.use_cases?.some((u) => /render|creator|editing|ai/i.test(u)))

  return (
    <RetailLayout>
      <PageHeader
        kicker="Creator rigs"
        title="Workstations"
        description="Quiet, stable builds for render, edit, compile, and ship."
      />
      <section className="container-max py-8">
        {error && <div className="panel mb-6 rounded-xl p-5 text-red-700">{error.message}</div>}
        {loading ? <div className="h-80 animate-pulse rounded-[30px] border border-[var(--line)] bg-[var(--surface-1)]" /> : (
          <div className="grid gap-4 lg:grid-cols-2">
            {(workstations.length ? workstations : data.slice(-2)).map((pc) => {
              const image = pc.case?.image || pc.gpu?.image || pc.cpu?.image
              return (
                <article key={pc.id} className="grid overflow-hidden rounded-[30px] border border-[var(--line)] bg-[var(--surface-1)] shadow-[0_14px_42px_rgba(38,38,38,.08)] md:grid-cols-[.82fr_1fr]">
                  <div className="hardware-stage grid min-h-64 place-items-center p-4">
                    <div className="hardware-frame h-full min-h-56 w-full">
                      <img src={image} alt={pc.name} width="420" height="300" className="hardware-image h-52 w-full object-contain p-5" loading="lazy" decoding="async" />
                    </div>
                  </div>
                  <div className="flex flex-col justify-between p-5">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-black tracking-[-.05em]">{pc.name}</h2>
                        <p className="mt-1 text-sm font-semibold text-[var(--ink-muted)]">{pc.tagline}</p>
                      </div>
                      <div className="price text-2xl font-black">{formatINR(pc.price)}</div>
                    </div>
                    <div className="mb-5 flex flex-wrap gap-2">
                      {(pc.use_cases || []).map((use) => <span key={use} className="rounded-full bg-[var(--surface-2)] px-3 py-1.5 text-xs font-black text-[var(--ink-muted)]">{use}</span>)}
                    </div>
                    <button type="button" onClick={() => addToCart({ ...pc, image })} className="btn-primary w-full">Add to cart</button>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>
    </RetailLayout>
  )
}
