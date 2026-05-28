import RetailLayout from '@/components/retail/RetailLayout'
import PageHeader from '@/components/retail/PageHeader'
import CatalogGrid from '@/components/retail/CatalogGrid'
import CategoryRail from '@/components/retail/CategoryRail'
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
        description="Core hardware, filtered for quick comparison."
      />
      <CategoryRail />
      <section className="container-max py-8">
        {error && <div className="panel mb-6 rounded-xl p-5 text-red-700">{error.message}</div>}
        <CatalogGrid products={priority} loading={loading} />
      </section>
    </RetailLayout>
  )
}
