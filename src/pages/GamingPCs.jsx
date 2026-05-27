import RetailLayout from '@/components/retail/RetailLayout'
import PageHeader from '@/components/retail/PageHeader'
import CatalogGrid from '@/components/retail/CatalogGrid'
import { fetchComponents } from '@/lib/supabase'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'

export default function GamingPCs() {
  const { data: result = [], loading, error } = useSupabaseQuery(() => fetchComponents(), [])
  const data = Array.isArray(result) ? result : []
  const priority = data.filter((p) => ['gpu', 'cpu', 'ram', 'storage', 'cooler', 'case'].includes(p.category))

  return (
    <RetailLayout>
      <PageHeader
        kicker="Components"
        title="Parts library"
        description="GPU, CPU, memory, storage, cooling, and cases."
      />
      <section className="container-max py-10">
        {error && <div className="panel mb-6 rounded-xl p-5 text-red-200">{error.message}</div>}
        <CatalogGrid products={priority} loading={loading} />
      </section>
    </RetailLayout>
  )
}
