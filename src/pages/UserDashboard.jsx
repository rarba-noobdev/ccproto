import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Heart, Package, ShoppingBag } from 'lucide-react'
import RetailLayout from '@/components/retail/RetailLayout'
import PageHeader from '@/components/retail/PageHeader'
import useStore from '@/store/useStore'
import { formatINR } from '@/utils/currency'
import { AnimatedNumber, PulseDot } from '@/components/ui/Hud'

const easeOut = [0.23, 1, 0.32, 1]

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
        <Panel index={0} icon={ShoppingBag} title="Cart" count={cart.length} emptyTo="/prebuilt" emptyLabel="Shop systems">
          {cart.map((item) => <Row key={item.id} name={item.name} value={formatINR(item.price * item.quantity)} />)}
        </Panel>
        <Panel index={1} icon={Heart} title="Wishlist" count={wishlist.length} emptyTo="/gaming-pcs" emptyLabel="Browse parts">
          {wishlist.slice(0, 8).map((item) => <Row key={item.id} name={item.name} value={formatINR(item.price)} />)}
        </Panel>
        <Panel index={2} icon={Package} title="Saved builds" count={savedBuilds.length} emptyTo="/build" emptyLabel="Open configurator">
          {savedBuilds.map((item) => <Row key={item.id} name={item.name} value={formatINR(item.price)} />)}
        </Panel>
      </section>
    </RetailLayout>
  )
}

function Panel({ icon: Icon, title, count, children, emptyTo, emptyLabel, index = 0 }) {
  const reduceMotion = useReducedMotion()
  const isEmpty = !children || (Array.isArray(children) && children.every((c) => !c))
  return (
    <motion.article
      className="glow-on-hover flex flex-col border border-transparent bg-surface-1"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeOut, delay: index * 0.1 }}
    >
      <div className="flex items-center justify-between border-b border-border-muted px-20 py-16">
        <div className="flex items-center gap-12">
          <span className="grid h-32 w-32 place-items-center bg-canvas-soft text-accent-heat">
            <Icon className="h-16 w-16" aria-hidden="true" />
          </span>
          <h2 className="text-title-h5 font-semibold tracking-[-.02em]">{title}</h2>
        </div>
        <span className="price text-title-h4 font-semibold tabular-nums">
          <AnimatedNumber value={count} duration={900} />
        </span>
      </div>
      <div className="flex-1 px-20 py-16">
        {isEmpty ? (
          <Link to={emptyTo} className="btn-secondary magnetic w-full">{emptyLabel}</Link>
        ) : (
          <ul className="divide-y divide-border-muted">{children}</ul>
        )}
      </div>
      <div className="flex items-center justify-between border-t border-border-muted px-20 py-12">
        <PulseDot tone={isEmpty ? 'heat' : 'success'} label={isEmpty ? 'Empty' : 'Active'} />
        <Link to={emptyTo} className="meta link-sweep transition hover:text-ink">View all</Link>
      </div>
    </motion.article>
  )
}

function Row({ name, value }) {
  return (
    <motion.li
      className="flex justify-between gap-12 py-10 text-body-small"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: easeOut }}
    >
      <span className="truncate font-medium text-ink-soft">{name}</span>
      <span className="price shrink-0 font-semibold">{value}</span>
    </motion.li>
  )
}
