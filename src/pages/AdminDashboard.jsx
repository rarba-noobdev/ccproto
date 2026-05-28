import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Database, Package, ShoppingBag, Tags, TrendingUp } from 'lucide-react'
import RetailLayout from '@/components/retail/RetailLayout'
import PageHeader from '@/components/retail/PageHeader'
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
        title="Operations dashboard"
        description="Inventory, systems, content, and order flow."
      />
      <section className="container-max py-8">
        {error && <div className="panel mb-6 rounded-xl p-5 text-red-700">{error.message}</div>}
        <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Kpi icon={Database} label="Components" value={loading ? '...' : components.length} />
          <Kpi icon={Package} label="Systems" value={loading ? '...' : prebuilts.length} />
          <Kpi icon={Tags} label="Inventory" value={loading ? '...' : formatINR(inventoryValue)} />
          <Kpi icon={ShoppingBag} label="Orders" value={loading ? '...' : orders.length} />
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
          <div className="rounded-[30px] border border-[var(--line)] bg-[var(--surface-1)] p-5 shadow-[0_14px_42px_rgba(38,38,38,.08)]">
            <h2 className="mb-6 text-xl font-black tracking-[-.04em]">Catalog distribution</h2>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={categoryData}>
                <CartesianGrid stroke="rgba(38,38,38,.10)" vertical={false} />
                <XAxis dataKey="category" tick={{ fill: 'rgba(38,38,38,.56)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(38,38,38,.56)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid rgba(38,38,38,.12)', borderRadius: 12, color: '#262626' }} />
                <Bar dataKey="count" fill="#fa5d19" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <div className="rounded-[28px] border border-[var(--line)] bg-[var(--surface-1)] p-5 shadow-[0_12px_36px_rgba(38,38,38,.07)]">
              <h2 className="mb-4 text-lg font-black tracking-[-.04em]">System pricing</h2>
              <div className="space-y-2">
                {prebuilts.map((pc) => (
                  <div key={pc.id} className="flex items-center justify-between gap-3 rounded-[16px] bg-[var(--surface-2)] px-3 py-2.5">
                    <span className="truncate font-bold">{pc.name}</span>
                    <span className="price shrink-0 font-black text-[var(--ink)]">{formatINR(pc.price)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[28px] border border-[var(--line)] bg-[var(--surface-1)] p-5 shadow-[0_12px_36px_rgba(38,38,38,.07)]">
              <h2 className="mb-4 text-lg font-black tracking-[-.04em]">Content queue</h2>
              <div className="space-y-2">
                {posts.map((post) => <div key={post.id} className="rounded-[16px] bg-[var(--surface-2)] px-3 py-2 text-sm font-bold text-[var(--ink-soft)]">{post.title}</div>)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </RetailLayout>
  )
}

function Kpi({ icon: Icon, label, value }) {
  return (
    <div className="rounded-[24px] border border-[var(--line)] bg-[var(--surface-1)] p-4 shadow-[0_10px_30px_rgba(38,38,38,.06)]">
      <span className="mb-4 grid h-10 w-10 place-items-center rounded-[15px] bg-[var(--surface-2)]">
        <Icon className="h-5 w-5 text-[var(--ink)]" />
      </span>
      <div className="price truncate text-2xl font-black">{value}</div>
      <div className="mt-1 flex items-center gap-1 text-sm font-bold text-[var(--ink-muted)]"><TrendingUp className="h-4 w-4" /> {label}</div>
    </div>
  )
}
