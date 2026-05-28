import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Database, Package, ShoppingBag, Tags } from 'lucide-react'
import RetailLayout from '@/components/retail/RetailLayout'
import PageHeader from '@/components/retail/PageHeader'
import { ErrorBanner } from '@/components/retail/StatusPanel'
import { fetchAdminData } from '@/lib/supabase'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'
import { formatINR } from '@/utils/currency'

export default function AdminDashboard() {
  const { data, loading, error } = useSupabaseQuery(fetchAdminData, [])
  const components = Array.isArray(data?.components) ? data.components : []
  const prebuilts = Array.isArray(data?.prebuilts) ? data.prebuilts : []
  const orders = Array.isArray(data?.orders) ? data.orders : []
  const posts = Array.isArray(data?.posts) ? data.posts : []
  const inventoryValue = components.reduce((sum, p) => sum + (p.price || 0), 0)
  const categoryData = Object.entries(components.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1
    return acc
  }, {})).map(([category, count]) => ({ category: category.toUpperCase(), count }))

  return (
    <RetailLayout>
      <PageHeader
        kicker="Admin"
        title="Operations."
        description="Inventory, systems, content, orders."
      />
      <section className="container-max py-40">
        {error && <ErrorBanner className="mb-24" message={error.message} />}

        <div className="grid gap-px border border-border-muted bg-line sm:grid-cols-2 lg:grid-cols-4">
          <Kpi icon={Database} label="Components" value={loading ? '—' : components.length} />
          <Kpi icon={Package} label="Systems" value={loading ? '—' : prebuilts.length} />
          <Kpi icon={Tags} label="Inventory" value={loading ? '—' : formatINR(inventoryValue)} />
          <Kpi icon={ShoppingBag} label="Orders" value={loading ? '—' : orders.length} />
        </div>

        <div className="mt-24 grid gap-px border border-border-muted bg-line lg:grid-cols-[1fr_380px]">
          <div className="bg-surface-1 p-24">
            <p className="meta mb-16">Catalog distribution</p>
            <h2 className="mb-24 text-title-h4 font-semibold tracking-[-.02em]">Parts per category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid stroke="rgba(20,20,20,.08)" vertical={false} />
                <XAxis dataKey="category" tick={{ fill: 'rgba(20,20,20,.5)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(20,20,20,.5)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#ffffff', border: '1px solid rgba(20,20,20,.20)', borderRadius: 0, color: '#141414', fontSize: 12 }}
                  cursor={{ fill: 'rgba(20,20,20,.04)' }}
                />
                <Bar dataKey="count" fill="#141414" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-col bg-surface-1">
            <div className="border-b border-border-muted px-24 py-20">
              <p className="meta">Systems</p>
              <h3 className="mt-4 text-title-h5 font-semibold tracking-[-.02em]">Pricing</h3>
            </div>
            <ul className="divide-y divide-border-muted">
              {prebuilts.map((pc) => (
                <li key={pc.id} className="flex items-center justify-between gap-12 px-24 py-12">
                  <span className="truncate text-body-small font-medium">{pc.name}</span>
                  <span className="price shrink-0 text-body-small font-semibold">{formatINR(pc.price)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {posts.length > 0 && (
          <div className="mt-24 border border-border-muted bg-surface-1">
            <div className="border-b border-border-muted px-24 py-20">
              <p className="meta">Content queue</p>
              <h3 className="mt-4 text-title-h5 font-semibold tracking-[-.02em]">Posts</h3>
            </div>
            <ul className="divide-y divide-border-muted">
              {posts.map((post) => (
                <li key={post.id} className="px-24 py-12 text-body-small font-medium text-ink-soft">{post.title}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </RetailLayout>
  )
}

function Kpi({ icon: Icon, label, value }) {
  return (
    <div className="bg-surface-1 p-20">
      <div className="flex items-center justify-between">
        <Icon className="h-16 w-16 text-ink" aria-hidden="true" />
        <span className="meta">{label}</span>
      </div>
      <p className="price mt-16 truncate text-title-h3 font-semibold tracking-[-.02em]">{value}</p>
    </div>
  )
}
