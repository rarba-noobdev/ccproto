import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import RetailLayout from '@/components/retail/RetailLayout'
import PageHeader from '@/components/retail/PageHeader'
import CatalogGrid from '@/components/retail/CatalogGrid'
import { fetchComponents } from '@/lib/supabase'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'
import { catalogCategories, catalogProducts } from '@/data/catalog'

const aliases = {
  accessories: 'accessories',
  processor: 'cpu',
  'graphic-card': 'gpu',
  ssd: 'storage',
  cabinet: 'case',
  prebuild: 'prebuild',
  'power-supply': 'power-supply',
}

const remoteAliases = {
  processor: 'cpu',
  'graphic-card': 'gpu',
  ssd: 'storage',
  cabinet: 'case',
  cooler: 'cooler',
  ram: 'ram',
}

export default function CategoryShop() {
  const { category } = useParams()
  const mapped = aliases[category] || category
  const remoteCategory = remoteAliases[category] || remoteAliases[mapped]
  const { data: result = [], loading, error } = useSupabaseQuery(() => remoteCategory ? fetchComponents(remoteCategory) : Promise.resolve([]), [remoteCategory])
  const data = Array.isArray(result) ? result : []

  const categoryMeta = catalogCategories.find((item) => item.id === category || item.id === mapped)
  const title = categoryMeta?.label || mapped.split('-').map((part) => part[0]?.toUpperCase() + part.slice(1)).join(' ')

  const products = useMemo(() => {
    const staticMatches = catalogProducts.filter((product) => product.category === category || product.category === mapped)
    const seen = new Set()
    return [...data, ...staticMatches].filter((product) => {
      const key = product.id || `${product.name}-${product.price}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }, [category, data, mapped])

  return (
    <RetailLayout>
      <PageHeader
        kicker="Category"
        title={title}
        description={categoryMeta?.description || 'Browse by fit, price, and performance tier.'}
      />
      <section className="container-max py-10">
        {error && <div className="panel mb-6 rounded-xl p-5 text-red-200">{error.message}</div>}
        <CatalogGrid products={products} loading={loading && products.length === 0} categories={false} />
      </section>
    </RetailLayout>
  )
}
