import { useParams } from 'react-router-dom'
import RetailLayout from '@/components/retail/RetailLayout'
import PageHeader from '@/components/retail/PageHeader'
import CatalogGrid from '@/components/retail/CatalogGrid'
import { fetchComponents } from '@/lib/supabase'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'

const aliases = {
  processor: 'cpu',
  'graphic-card': 'gpu',
  ssd: 'storage',
  cabinet: 'case',
}

export default function CategoryShop() {
  const { category } = useParams()
  const mapped = aliases[category] || category
  const { data = [], loading, error } = useSupabaseQuery(() => fetchComponents(mapped), [mapped])

  return (
    <RetailLayout>
      <PageHeader
        kicker="Category"
        title={`${mapped.toUpperCase()} catalog`}
        description="Live scraped products with source URLs, INR price, MRP, stock state, and product images."
      />
      <section className="container-max py-10">
        {error && <div className="panel mb-6 rounded-xl p-5 text-red-200">{error.message}</div>}
        <CatalogGrid products={data} loading={loading} categories={false} />
      </section>
    </RetailLayout>
  )
}
