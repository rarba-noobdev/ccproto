import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import RetailLayout from '@/components/retail/RetailLayout'
import PageHeader from '@/components/retail/PageHeader'
import CatalogGrid from '@/components/retail/CatalogGrid'
import CategoryRail from '@/components/retail/CategoryRail'
import { ErrorBanner } from '@/components/retail/StatusPanel'
import { fetchComponents } from '@/lib/supabase'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'
import { catalogCategories, catalogProducts } from '@/data/catalog'

const aliases = {
  accessories: 'accessories',
  processor: 'cpu',
  'graphic-card': 'gpu',
  ssd: 'storage',
  cabinet: 'case',
  prebuilt: 'prebuild',
  'power-supply': 'psu',
}

const remoteAliases = {
  processor: 'cpu',
  'graphic-card': 'gpu',
  ssd: 'storage',
  cabinet: 'case',
  cooler: 'cooler',
  ram: 'ram',
  'power-supply': 'psu',
  psu: 'psu',
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
        title={title + '.'}
        description={categoryMeta?.description || 'Sorted by tier, fit, and current price.'}
      />
      <CategoryRail />
      <section className="container-max py-40">
        {error && <ErrorBanner className="mb-24" message={error.message} />}
        <CatalogGrid products={products} loading={loading && products.length === 0} categories={false} />
      </section>
    </RetailLayout>
  )
}
