import RetailLayout from '@/components/retail/RetailLayout'
import PageHeader from '@/components/retail/PageHeader'
import CatalogGrid from '@/components/retail/CatalogGrid'
import CategoryRail from '@/components/retail/CategoryRail'
import { ErrorBanner } from '@/components/retail/StatusPanel'
import { fetchComponents } from '@/lib/supabase'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'

export default function GamingPCs() {
  const { data: result = [], loading, error } = useSupabaseQuery(() => fetchComponents(), [])
  const data = Array.isArray(result) ? result : []
  const priority = data.filter((p) => ['gpu', 'cpu', 'ram', 'storage', 'cooler', 'case'].includes(p.category))

  return (
    <RetailLayout>
      <PageHeader
        kicker="Parts library"
        title="Components."
        description="Core hardware, filtered for direct comparison."
      />
      <CategoryRail />
      <section className="container-max py-40">
        {error && <ErrorBanner className="mb-24" message={error.message} />}
        <CatalogGrid products={priority} loading={loading} />
      </section>
    </RetailLayout>
  )
}
