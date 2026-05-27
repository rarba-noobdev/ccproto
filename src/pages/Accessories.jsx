import { Link } from 'react-router-dom'
import RetailLayout from '@/components/retail/RetailLayout'
import PageHeader from '@/components/retail/PageHeader'
import CatalogGrid from '@/components/retail/CatalogGrid'
import { shopCategories } from '@/components/retail/CategoryRail'
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
        kicker="Shop"
        title="Every section, one place"
        description="Jump straight into parts, systems, peripherals, displays, storage, and upgrades."
      />
      <section className="container-max py-10">
        {error && <div className="panel mb-6 rounded-xl p-5 text-red-200">{error.message}</div>}
        <div className="mb-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {shopCategories.map(({ label, to, icon: Icon }) => (
            <Link key={label} to={to} className="panel group flex items-center justify-between rounded-[24px] p-4 transition hover:-translate-y-0.5 hover:bg-[var(--surface-hover)]">
              <span className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--surface-2)] text-[var(--ink)]">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="font-black tracking-[-.02em]">{label}</span>
              </span>
              <span className="text-xs font-black muted transition group-hover:text-[var(--ink)]">Open</span>
            </Link>
          ))}
        </div>
        <CatalogGrid products={catalog} loading={loading && catalog.length === 0} />
      </section>
    </RetailLayout>
  )
}
