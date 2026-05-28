import { Link } from 'react-router-dom'
import { Heart, Package, ShoppingBag } from 'lucide-react'
import RetailLayout from '@/components/retail/RetailLayout'
import PageHeader from '@/components/retail/PageHeader'
import useStore from '@/store/useStore'
import { formatINR } from '@/utils/currency'

export default function UserDashboard() {
  const { user, cart, wishlist, savedBuilds } = useStore()

  return (
    <RetailLayout>
      <PageHeader
        kicker={user?.name ? `Account · ${user.name}` : 'Account'}
        title="Your library."
        description="Cart, wishlist, and saved configurations."
      />
      <section className="container-max grid gap-px border border-border-muted bg-line py-0 md:grid-cols-3">
        <Panel icon={ShoppingBag} title="Cart" count={cart.length} emptyTo="/prebuilt" emptyLabel="Shop systems">
          {cart.map((item) => <Row key={item.id} name={item.name} value={formatINR(item.price * item.quantity)} />)}
        </Panel>
        <Panel icon={Heart} title="Wishlist" count={wishlist.length} emptyTo="/gaming-pcs" emptyLabel="Browse parts">
          {wishlist.slice(0, 8).map((item) => <Row key={item.id} name={item.name} value={formatINR(item.price)} />)}
        </Panel>
        <Panel icon={Package} title="Saved builds" count={savedBuilds.length} emptyTo="/build" emptyLabel="Open configurator">
          {savedBuilds.map((item) => <Row key={item.id} name={item.name} value={formatINR(item.price)} />)}
        </Panel>
      </section>
    </RetailLayout>
  )
}

function Panel({ icon: Icon, title, count, children, emptyTo, emptyLabel }) {
  const isEmpty = !children || (Array.isArray(children) && children.every((c) => !c))
  return (
    <article className="flex flex-col bg-surface-1">
      <div className="flex items-center justify-between border-b border-border-muted px-20 py-16">
        <div className="flex items-center gap-12">
          <Icon className="h-16 w-16 text-ink" aria-hidden="true" />
          <h2 className="text-title-h5 font-semibold tracking-[-.02em]">{title}</h2>
        </div>
        <span className="meta">{count}</span>
      </div>
      <div className="flex-1 px-20 py-16">
        {isEmpty ? (
          <Link to={emptyTo} className="btn-secondary w-full">{emptyLabel}</Link>
        ) : (
          <ul className="divide-y divide-border-muted">{children}</ul>
        )}
      </div>
    </article>
  )
}

function Row({ name, value }) {
  return (
    <li className="flex justify-between gap-12 py-10 text-body-small">
      <span className="truncate font-medium text-ink-soft">{name}</span>
      <span className="price shrink-0 font-semibold">{value}</span>
    </li>
  )
}
