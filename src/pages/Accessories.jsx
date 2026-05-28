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
        title="Browse the catalog"
        description="Parts, systems, peripherals, and upgrades in one clean view."
      />
      <section className="container-max py-10">
        {error && <div className="panel mb-6 rounded-xl p-5 text-red-700">{error.message}</div>}
        <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {shopCategories.map(({ label, to, icon: Icon }) => (
            <Link key={label} to={to} className="group rounded-[26px] border border-[var(--line)] bg-[var(--surface-1)] p-3 shadow-[0_10px_30px_rgba(38,38,38,.06)] transition hover:-translate-y-0.5 hover:border-[var(--line-strong)]">
              <span className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-[18px] bg-[var(--surface-2)] text-[var(--ink)] transition group-hover:bg-[var(--ink)] group-hover:text-[var(--canvas)]">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-black tracking-[-.02em]">{label}</span>
                  <span className="mt-0.5 block text-xs font-bold muted">Open catalog</span>
                </span>
              </span>
            </Link>
          ))}
        </div>
        <CatalogGrid products={catalog} loading={loading && catalog.length === 0} />
      </section>
    </RetailLayout>
  )
}
