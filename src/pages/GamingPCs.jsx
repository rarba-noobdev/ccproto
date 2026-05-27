import RetailLayout from '@/components/retail/RetailLayout'
import PageHeader from '@/components/retail/PageHeader'
import CatalogGrid from '@/components/retail/CatalogGrid'
import { fetchComponents } from '@/lib/supabase'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'

export default function GamingPCs() {
  const { data = [], loading, error } = useSupabaseQuery(() => fetchComponents(), [])
  const priority = data.filter((p) => ['gpu', 'cpu', 'ram', 'storage', 'cooler', 'case'].includes(p.category))

  return (
    <RetailLayout>
      <PageHeader
        kicker="Components"
        title="Real PC components with live Indian market pricing"
        description="Browse GPUs, CPUs, RAM, SSDs, coolers, and cabinets scraped from MD Computers and stored in Supabase."
      />
      <section className="container-max py-10">
        {error && <div className="panel mb-6 rounded-xl p-5 text-red-200">{error.message}</div>}
        <CatalogGrid products={priority} loading={loading} />
      </section>
    </RetailLayout>
  )
}
