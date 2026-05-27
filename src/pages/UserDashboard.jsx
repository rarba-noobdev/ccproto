import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, Heart, Cpu, Trophy, Settings, Zap, Package, Clock, ChevronRight, Star, Gamepad2, Crown, Target, Diamond } from 'lucide-react'
import useStore from '@/store/useStore'
import GlassCard from '@/components/ui/GlassCard'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import clsx from 'clsx'

const mockOrders = [
  { id: '#NX-7721', product: 'TITAN X', status: 'Delivered', date: 'May 15, 2026', price: 3499 },
  { id: '#NX-6834', product: 'Custom Build', status: 'Processing', date: 'May 26, 2026', price: 2147 },
]

const badgeIcons = {
  'First Build': Gamepad2,
  'Speed Builder': Zap,
  'Ultra Builder': Crown,
  'Complete Build': Trophy,
  'Sharpshooter': Target,
  'Diamond Tier': Diamond,
}

export default function UserDashboard() {
  const { user, savedBuilds, wishlist, cart } = useStore()

  return (
    <div className="min-h-screen bg-void">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="container-max">
          {/* Welcome */}
          <div className="mb-10">
            <div className="section-label mb-3">
              <Zap className="w-3 h-3" />
              DASHBOARD
            </div>
            <h1 className="font-display text-4xl font-black text-white">
              WELCOME BACK,{' '}
              <span className="gradient-text">{user?.name?.toUpperCase() || 'GAMER'}</span>
            </h1>
            <p className="text-white/40 mt-2">Manage your builds, orders, and account settings.</p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { icon: ShoppingBag, label: 'Orders', value: mockOrders.length, color: 'text-heat-100' },
              { icon: Heart, label: 'Wishlist', value: wishlist.length, color: 'text-accent-crimson' },
              { icon: Cpu, label: 'Saved Builds', value: savedBuilds.length, color: 'text-accent-bluetron' },
              { icon: Trophy, label: 'NexPoints', value: '2,450', color: 'text-accent-honey' },
            ].map(({ icon: Icon, label, value, color }, i) => (
              <GlassCard key={label} delay={i * 0.06} animate className="p-5 text-center rounded-12">
                <Icon className={`w-6 h-6 mx-auto mb-2 ${color}`} />
                <div className={`font-display font-black text-2xl ${color}`}>{value}</div>
                <div className="text-white/40 text-xs font-body mt-0.5">{label}</div>
              </GlassCard>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Orders */}
            <GlassCard animate className="p-6 rounded-12">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-heading font-bold text-white">Recent Orders</h2>
                <button className="text-xs text-heat-100 flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 rounded">All orders <ChevronRight className="w-3.5 h-3.5" /></button>
              </div>
              <div className="space-y-3">
                {mockOrders.map((order) => (
                  <div key={order.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-void-300 flex items-center justify-center text-heat-100">
                      <Package className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-heading font-semibold text-sm text-white">{order.product}</div>
                      <div className="text-xs text-white/40 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {order.date}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-display font-bold text-white text-sm">${order.price.toLocaleString()}</div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border
                        ${order.status === 'Delivered' ? 'text-accent-forest border-accent-forest/30 bg-accent-forest/10' : 'text-amber-400 border-amber-400/30 bg-amber-400/10'}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Saved builds */}
            <GlassCard animate delay={0.1} className="p-6 rounded-12">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-heading font-bold text-white">Saved Builds</h2>
                <Link to="/build" className="text-xs text-heat-100 flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 rounded">New build <ChevronRight className="w-3.5 h-3.5" /></Link>
              </div>
              {savedBuilds.length === 0 ? (
                <div className="text-center py-10">
                  <Cpu className="w-10 h-10 text-white/20 mx-auto mb-3" />
                  <p className="text-white/40 text-sm">No saved builds yet.</p>
                  <Link to="/build" className="btn-primary mt-4 inline-flex text-xs py-2 px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100">
                    <Zap className="w-3.5 h-3.5" />
                    Start Building
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedBuilds.map((build) => (
                    <div key={build.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
                      <div>
                        <div className="font-heading font-semibold text-sm text-white">{build.name}</div>
                        <div className="text-xs text-white/40">{new Date(build.date).toLocaleDateString()}</div>
                      </div>
                      <div className="font-display font-bold text-heat-100">${build.price.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>

            {/* Badges */}
            <GlassCard animate delay={0.2} className="p-6 rounded-12">
              <h2 className="font-heading font-bold text-white mb-5">Achievement Badges</h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: 'First Build', label: 'First Build', earned: true },
                  { icon: 'Speed Builder', label: 'Speed Builder', earned: true },
                  { icon: 'Ultra Builder', label: 'Ultra Builder', earned: false },
                  { icon: 'Complete Build', label: 'Complete Build', earned: false },
                  { icon: 'Sharpshooter', label: 'Sharpshooter', earned: false },
                  { icon: 'Diamond Tier', label: 'Diamond Tier', earned: false },
                ].map(({ icon, label, earned }) => {
                  const IconComp = badgeIcons[icon] || Star
                  return (
                    <div key={label} className={`flex flex-col items-center gap-2 p-3 rounded-xl border text-center transition-all
                      ${earned ? 'border-heat-100/30 bg-heat-100/10' : 'border-white/5 bg-void-200 opacity-40'}`}>
                      <IconComp className={`w-6 h-6 ${earned ? 'text-heat-100' : 'text-white/30'}`} />
                      <span className="text-[10px] font-heading text-white/60">{label}</span>
                    </div>
                  )
                })}
              </div>
            </GlassCard>

            {/* Quick links */}
            <GlassCard animate delay={0.3} className="p-6 rounded-12">
              <h2 className="font-heading font-bold text-white mb-5">Quick Actions</h2>
              <div className="space-y-2">
                {[
                  { icon: Cpu, label: 'Configure New Build', href: '/build', color: 'text-heat-100' },
                  { icon: ShoppingBag, label: 'Browse Prebuilt PCs', href: '/prebuilt', color: 'text-accent-bluetron' },
                  { icon: Heart, label: `Wishlist (${wishlist.length} items)`, href: '/wishlist', color: 'text-accent-crimson' },
                  { icon: Settings, label: 'Account Settings', href: '/settings', color: 'text-white/50' },
                ].map(({ icon: Icon, label, href, color }) => (
                  <Link key={href} to={href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100">
                    <Icon className={`w-4 h-4 ${color}`} />
                    <span className="flex-1 font-heading text-sm text-white/70 group-hover:text-white">{label}</span>
                    <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-heat-100 transition-colors" />
                  </Link>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
