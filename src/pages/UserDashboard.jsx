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
        description="Cart, wishlist, and saved builds."
      />
      <section className="container-max grid gap-4 py-8 lg:grid-cols-3">
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
    <article className="rounded-[28px] border border-[var(--line)] bg-[var(--surface-1)] p-5 shadow-[0_12px_36px_rgba(38,38,38,.07)]">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-[15px] bg-[var(--surface-2)]"><Icon className="h-5 w-5 text-[var(--ink)]" /></span><h2 className="text-xl font-black tracking-[-.04em]">{title}</h2></div>
        <span className="rounded-full bg-[var(--ink)] px-2.5 py-1 text-xs font-black text-[var(--canvas)]">{count}</span>
      </div>
      <div className="space-y-3">{children}</div>
    </article>
  )
}

function Row({ name, value }) {
  return <div className="flex justify-between gap-3 rounded-[16px] bg-[var(--surface-2)] px-3 py-2.5 text-sm"><span className="truncate font-bold text-[var(--ink-soft)]">{name}</span><span className="price shrink-0 font-black">{value}</span></div>
}

function Empty({ to, label }) {
  return <Link to={to} className="btn-secondary w-full">{label}</Link>
}
