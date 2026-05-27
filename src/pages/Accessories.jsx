import RetailLayout from '@/components/retail/RetailLayout'
import PageHeader from '@/components/retail/PageHeader'
import CatalogGrid from '@/components/retail/CatalogGrid'
import { fetchComponents } from '@/lib/supabase'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'

export default function Accessories() {
  const { data = [], loading, error } = useSupabaseQuery(() => fetchComponents(), [])
  const accessories = data.filter((p) => ['cooler', 'case', 'storage', 'ram'].includes(p.category))

  return (
    <RetailLayout>
      <PageHeader
        kicker="Parts & upgrades"
        title="Upgrade-friendly accessories and core components"
        description="Cooling, cabinets, memory, and storage picked from the same live catalog as the builder."
      />
      <section className="container-max py-10">
        {error && <div className="panel mb-6 rounded-xl p-5 text-red-200">{error.message}</div>}
        <CatalogGrid products={accessories} loading={loading} />
      </section>
    </RetailLayout>
  )
}
