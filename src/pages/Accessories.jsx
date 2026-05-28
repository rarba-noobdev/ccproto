import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import RetailLayout from '@/components/retail/RetailLayout'
import PageHeader from '@/components/retail/PageHeader'
import CatalogGrid from '@/components/retail/CatalogGrid'
import { shopCategories } from '@/components/retail/CategoryRail'
import { ErrorBanner } from '@/components/retail/StatusPanel'
import { fetchComponents } from '@/lib/supabase'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'
import { catalogProducts } from '@/data/catalog'

export default function Accessories() {
  const { data: result = [], loading, error } = useSupabaseQuery(() => fetchComponents(), [])
  const data = Array.isArray(result) ? result : []
  const catalog = [...data, ...catalogProducts]

  return (
    <RetailLayout>
      <PageHeader
        kicker="Catalogue"
        title="Everything in stock."
        description="Parts, peripherals, prebuilt systems, accessories."
      />
      <section className="container-max py-40">
        {error && <ErrorBanner className="mb-24" message={error.message} />}

        <div className="mb-32 grid gap-px border border-border-muted bg-line sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-7">
          {shopCategories.map(({ label, to, icon: Icon }) => (
            <Link key={label} to={to} className="group flex items-center justify-between gap-8 bg-surface-1 px-16 py-14 transition hover:bg-canvas">
              <span className="flex items-center gap-10">
                <Icon className="h-14 w-14 text-ink-muted transition group-hover:text-ink" aria-hidden="true" />
                <span className="text-body-small font-medium">{label}</span>
              </span>
              <ArrowUpRight className="h-12 w-12 text-ink-muted transition group-hover:text-ink" aria-hidden="true" />
            </Link>
          ))}
        </div>

        <CatalogGrid products={catalog} loading={loading && catalog.length === 0} />
      </section>
    </RetailLayout>
  )
}
