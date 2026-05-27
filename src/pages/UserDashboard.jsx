import { Link } from 'react-router-dom'
import { Heart, Package, ShoppingCart } from 'lucide-react'
import RetailLayout from '@/components/retail/RetailLayout'
import PageHeader from '@/components/retail/PageHeader'
import useStore from '@/store/useStore'
import { formatINR } from '@/utils/currency'

export default function UserDashboard() {
  const { user, cart, wishlist, savedBuilds } = useStore()

  return (
    <RetailLayout>
      <PageHeader
        kicker="Dashboard"
        title={`Welcome${user?.name ? `, ${user.name}` : ''}`}
        description="Review saved builds, wishlist products, and current cart state."
      />
      <section className="container-max grid gap-6 py-10 lg:grid-cols-3">
        <Panel icon={ShoppingCart} title="Cart" count={cart.length}>
          {cart.map((item) => <Row key={item.id} name={item.name} value={formatINR(item.price * item.quantity)} />)}
          {!cart.length && <Empty to="/prebuilt" label="Shop prebuilts" />}
        </Panel>
        <Panel icon={Heart} title="Wishlist" count={wishlist.length}>
          {wishlist.slice(0, 6).map((item) => <Row key={item.id} name={item.name} value={formatINR(item.price)} />)}
          {!wishlist.length && <Empty to="/gaming-pcs" label="Browse components" />}
        </Panel>
        <Panel icon={Package} title="Saved builds" count={savedBuilds.length}>
          {savedBuilds.map((item) => <Row key={item.id} name={item.name} value={formatINR(item.price)} />)}
          {!savedBuilds.length && <Empty to="/build" label="Start builder" />}
        </Panel>
      </section>
    </RetailLayout>
  )
}

function Panel({ icon: Icon, title, count, children }) {
  return (
    <article className="panel rounded-2xl p-5">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3"><Icon className="h-5 w-5 text-[#f26522]" /><h2 className="text-xl font-black">{title}</h2></div>
        <span className="rounded-md bg-white/8 px-2 py-1 text-xs font-black">{count}</span>
      </div>
      <div className="space-y-3">{children}</div>
    </article>
  )
}

function Row({ name, value }) {
  return <div className="flex justify-between gap-3 border-b border-white/8 pb-3 text-sm"><span className="truncate font-bold text-white/68">{name}</span><span className="price shrink-0 font-black">{value}</span></div>
}

function Empty({ to, label }) {
  return <Link to={to} className="btn-secondary w-full">{label}</Link>
}
