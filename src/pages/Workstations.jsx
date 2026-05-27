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
        title="Workstations for render, edit, compile, and ship"
        description="High-core CPUs, stable thermals, and GPU acceleration for Indian creators and studios."
      />
      <section className="container-max py-10">
        {error && <div className="panel mb-6 rounded-xl p-5 text-red-200">{error.message}</div>}
        {loading ? <div className="panel h-96 animate-pulse rounded-2xl" /> : (
          <div className="grid gap-6 lg:grid-cols-2">
            {(workstations.length ? workstations : data.slice(-2)).map((pc) => {
              const image = pc.case?.image || pc.gpu?.image || pc.cpu?.image
              return (
                <article key={pc.id} className="panel overflow-hidden rounded-2xl">
                  <div className="hardware-stage grid h-80 place-items-center p-5">
                    <div className="hardware-frame h-full w-full">
                      <img src={image} alt={pc.name} width="420" height="300" className="hardware-image h-64 w-full object-contain p-5" loading="lazy" decoding="async" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-black">{pc.name}</h2>
                        <p className="mt-1 text-sm text-white/55">{pc.tagline}</p>
                      </div>
                      <div className="price text-2xl font-black">{formatINR(pc.price)}</div>
                    </div>
                    <div className="mb-5 flex flex-wrap gap-2">
                      {(pc.use_cases || []).map((use) => <span key={use} className="rounded-md border border-white/10 px-2 py-1 text-xs font-bold text-white/55">{use}</span>)}
                    </div>
                    <button type="button" onClick={() => addToCart({ ...pc, image })} className="btn-primary w-full">Add workstation to cart</button>
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
