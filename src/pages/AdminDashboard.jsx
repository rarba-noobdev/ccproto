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
      <section className="container-max py-10">
        {error && <div className="panel mb-6 rounded-xl p-5 text-red-200">{error.message}</div>}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Kpi icon={Database} label="Components" value={loading ? '…' : components.length} />
          <Kpi icon={Package} label="Prebuilt SKUs" value={loading ? '…' : prebuilts.length} />
          <Kpi icon={Tags} label="Inventory value" value={loading ? '…' : formatINR(inventoryValue)} />
          <Kpi icon={ShoppingBag} label="Orders" value={loading ? '…' : orders.length} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="panel rounded-2xl p-6">
            <h2 className="mb-6 text-xl font-black">Catalog distribution</h2>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={categoryData}>
                <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
                <XAxis dataKey="category" tick={{ fill: 'rgba(255,255,255,.45)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,.45)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#111318', border: '1px solid rgba(255,255,255,.12)', borderRadius: 10 }} />
                <Bar dataKey="count" fill="#f7f7f3" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <div className="panel rounded-2xl p-5">
              <h2 className="mb-4 text-lg font-black">Prebuilt pricing</h2>
              <div className="space-y-3">
                {prebuilts.map((pc) => (
                  <div key={pc.id} className="flex items-center justify-between border-b border-white/8 pb-3">
                    <span className="font-bold">{pc.name}</span>
                    <span className="price font-black text-[var(--ink)]">{formatINR(pc.price)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="panel rounded-2xl p-5">
              <h2 className="mb-4 text-lg font-black">Content queue</h2>
              <div className="space-y-3">
                {posts.map((post) => <div key={post.id} className="text-sm font-bold text-white/70">{post.title}</div>)}
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
    <div className="panel rounded-2xl p-5">
      <Icon className="mb-4 h-6 w-6 text-[var(--ink)]" />
      <div className="price text-2xl font-black">{value}</div>
      <div className="mt-1 flex items-center gap-1 text-sm font-bold text-white/45"><TrendingUp className="h-4 w-4" /> {label}</div>
    </div>
  )
}
