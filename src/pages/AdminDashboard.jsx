import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, Package, ShoppingBag, Users, BarChart3, Settings,
  LogOut, Bell, Search, TrendingUp, TrendingDown, Zap, DollarSign,
  Eye, Edit, Trash2, Plus, ChevronRight, AlertCircle, CheckCircle2, Clock,
  Globe, Loader2, ExternalLink
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts'
import useStore from '@/store/useStore'
import GlassCard from '@/components/ui/GlassCard'
import { extractProducts, isConfigured } from '@/services/firecrawl'
import clsx from 'clsx'

const revenueData = [
  { month: 'Jan', revenue: 48000, orders: 31 },
  { month: 'Feb', revenue: 62000, orders: 42 },
  { month: 'Mar', revenue: 54000, orders: 38 },
  { month: 'Apr', revenue: 79000, orders: 55 },
  { month: 'May', revenue: 91000, orders: 63 },
  { month: 'Jun', revenue: 86000, orders: 59 },
  { month: 'Jul', revenue: 104000, orders: 71 },
  { month: 'Aug', revenue: 118000, orders: 82 },
  { month: 'Sep', revenue: 97000, orders: 68 },
  { month: 'Oct', revenue: 132000, orders: 91 },
  { month: 'Nov', revenue: 151000, orders: 103 },
  { month: 'Dec', revenue: 168000, orders: 118 },
]

const pieData = [
  { name: 'Gaming PCs', value: 58, color: '#fa5d19' },
  { name: 'Workstations', value: 22, color: '#2a6dfb' },
  { name: 'Accessories', value: 12, color: '#9061ff' },
  { name: 'Prebuilt', value: 8, color: '#42c366' },
]

const recentOrders = [
  { id: '#NX-8821', customer: 'Alex Reyes', product: 'TITAN X', amount: 3499, status: 'Shipped', date: '2 hours ago' },
  { id: '#NX-8820', customer: 'Sarah Chen', product: 'WORKFORCE PRO', amount: 2799, status: 'Building', date: '4 hours ago' },
  { id: '#NX-8819', customer: 'Marcus Torres', product: 'PHANTOM PRO', amount: 2199, status: 'Delivered', date: '6 hours ago' },
  { id: '#NX-8818', customer: 'Priya Sharma', product: 'APEX ELITE', amount: 1599, status: 'Pending', date: '8 hours ago' },
  { id: '#NX-8817', customer: 'Jordan Williams', product: 'STORM BASE', amount: 999, status: 'Delivered', date: '1 day ago' },
]

const statusColors = {
  Shipped: 'text-accent-bluetron bg-accent-bluetron/10 border-accent-bluetron/20',
  Building: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  Delivered: 'text-accent-forest bg-accent-forest/10 border-accent-forest/20',
  Pending: 'text-white/50 bg-white/5 border-white/10',
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: ShoppingBag, label: 'Orders', id: 'orders', badge: '12' },
  { icon: Package, label: 'Products', id: 'products' },
  { icon: Globe, label: 'Scraper', id: 'scraper' },
  { icon: Users, label: 'Customers', id: 'customers' },
  { icon: BarChart3, label: 'Analytics', id: 'analytics' },
  { icon: Bell, label: 'Notifications', id: 'notifications', badge: '3' },
  { icon: Settings, label: 'Settings', id: 'settings' },
]

const kpis = [
  { label: 'Total Revenue', value: '$1.19M', change: '+24%', up: true, icon: DollarSign, color: 'heat-100' },
  { label: 'Total Orders', value: '821', change: '+18%', up: true, icon: ShoppingBag, color: 'accent-bluetron' },
  { label: 'Active Customers', value: '3,241', change: '+31%', up: true, icon: Users, color: 'accent-amethyst' },
  { label: 'Avg Order Value', value: '$1,449', change: '-4%', up: false, icon: BarChart3, color: 'accent-crimson' },
]

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const { logout, user } = useStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-void flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-void-50 border-r border-white/5 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-heat-100/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-heat-100" />
            </div>
            <div>
              <div className="font-display font-black text-sm text-white tracking-widest">NEXFORGE</div>
              <div className="text-[10px] font-mono text-heat-100/60">ADMIN PANEL</div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ icon: Icon, label, id, badge }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={clsx(
                'w-full flex items-center gap-3 px-4 py-3 rounded-xl font-heading text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100',
                activeSection === id
                  ? 'bg-gradient-to-r from-heat-100/20 to-accent-amethyst/10 text-white border border-heat-100/30'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              )}
            >
              <Icon className={clsx('w-4 h-4', activeSection === id && 'text-heat-100')} />
              <span className="flex-1 text-left">{label}</span>
              {badge && (
                <span className="text-[10px] font-mono bg-heat-100 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* User + logout */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
            <div className="w-8 h-8 rounded-full bg-heat-100 flex items-center justify-center text-xs font-bold text-white">
              {user?.name?.[0] || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-heading font-semibold text-white truncate">{user?.name || 'Admin'}</div>
              <div className="text-[10px] text-white/30 truncate">{user?.email}</div>
            </div>
            <button onClick={handleLogout} className="p-1.5 rounded-lg text-white/30 hover:text-accent-crimson hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-void/90 backdrop-blur border-b border-white/5 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-white capitalize">{activeSection}</h1>
            <p className="text-xs text-white/30 font-mono">May 27, 2026</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-void-200 border border-white/10 rounded-8 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-heat-100/40 w-56 focus-visible:ring-2 focus-visible:ring-heat-100"
              />
            </div>
            <button className="relative p-2.5 rounded-xl bg-void-200 border border-white/10 text-white/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-heat-100 text-[9px] font-bold flex items-center justify-center text-white">3</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {kpis.map(({ label, value, change, up, icon: Icon, color }, i) => (
              <motion.div
                key={label}
                className="glass border border-border-muted rounded-16 p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-${color}/10 flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 text-${color}`} />
                  </div>
                  <div className={clsx(
                    'flex items-center gap-1 text-xs font-mono px-2 py-1 rounded-full',
                    up ? 'text-accent-forest bg-accent-forest/10' : 'text-red-400 bg-red-400/10'
                  )}>
                    {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {change}
                  </div>
                </div>
                <div className="font-display font-black text-2xl text-white">{value}</div>
                <div className="text-white/40 text-xs mt-1 font-body">{label}</div>
              </motion.div>
            ))}
          </div>

          {/* Revenue chart */}
          <motion.div
            className="glass border border-border-muted rounded-16 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-heading font-bold text-white">Revenue Overview</h2>
                <p className="text-white/40 text-xs">Monthly revenue for 2024</p>
              </div>
              <div className="flex gap-2">
                {['1M', '3M', '6M', '1Y'].map((p) => (
                  <button key={p} className={clsx(
                    'px-3 py-1.5 rounded-lg text-xs font-mono transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100',
                    p === '1Y' ? 'bg-heat-100 text-white' : 'glass text-white/40 hover:text-white'
                  )}>{p}</button>
                ))}
              </div>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fa5d19" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#fa5d19" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="ordersGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9061ff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#9061ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                <Tooltip
                  contentStyle={{ background: '#11111c', border: '1px solid rgba(250,93,25,0.3)', borderRadius: '12px' }}
                  labelStyle={{ color: '#fff' }}
                  itemStyle={{ color: 'rgba(255,255,255,0.7)' }}
                  formatter={(v, n) => [n === 'revenue' ? `$${v.toLocaleString()}` : v, n === 'revenue' ? 'Revenue' : 'Orders']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#fa5d19" strokeWidth={2} fill="url(#revenueGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Bottom row */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent orders */}
            <motion.div
              className="lg:col-span-2 glass border border-border-muted rounded-16 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-heading font-bold text-white">Recent Orders</h2>
                <button className="text-xs text-heat-100 hover:text-heat-100/80 flex items-center gap-1 font-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 rounded">
                  View all <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/3 transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-void-300 flex items-center justify-center text-heat-100 shrink-0">
                      <Package className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-semibold text-sm text-white truncate">{order.customer}</span>
                        <span className="text-xs text-white/30 font-mono shrink-0">{order.id}</span>
                      </div>
                      <div className="text-xs text-white/40">{order.product} · {order.date}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-display font-bold text-white text-sm">${order.amount.toLocaleString()}</div>
                      <span className={clsx('text-[10px] font-mono px-2 py-0.5 rounded-full border', statusColors[order.status])}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Category pie */}
            <motion.div
              className="glass border border-border-muted rounded-16 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="font-heading font-bold text-white mb-5">Sales by Category</h2>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: '#11111c', border: '1px solid rgba(250,93,25,0.3)', borderRadius: '12px', fontSize: 12 }}
                    formatter={(v) => [`${v}%`, '']}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {pieData.map(({ name, value, color }) => (
                  <div key={name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
                      <span className="text-xs text-white/60 font-body">{name}</span>
                    </div>
                    <span className="text-xs font-mono text-white/40">{value}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick actions */}
          <motion.div
            className="glass border border-border-muted rounded-16 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <h2 className="font-heading font-bold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Plus, label: 'Add Product', color: 'from-heat-100 to-accent-amethyst' },
                { icon: ShoppingBag, label: 'Process Orders', color: 'from-accent-bluetron to-accent-amethyst' },
                { icon: Users, label: 'Manage Users', color: 'from-accent-amethyst to-accent-forest' },
                { icon: BarChart3, label: 'View Reports', color: 'from-accent-crimson to-heat-100' },
              ].map(({ icon: Icon, label, color }) => (
                <button key={label} className="flex flex-col items-center gap-2 p-4 glass border border-border-muted rounded-xl hover:border-heat-100/30 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-heading text-white/60 group-hover:text-white transition-colors">{label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Scraper Panel */}
          {activeSection === 'scraper' && <ScraperPanel />}
        </div>
      </div>
    </div>
  )
}

function ScraperPanel() {
  const [url, setUrl] = useState('')
  const [scraping, setScraping] = useState(false)
  const [scrapedProducts, setScrapedProducts] = useState([])
  const [error, setError] = useState(null)
  const configured = isConfigured()

  const handleScrape = async () => {
    if (!url.trim()) return
    setScraping(true)
    setError(null)
    try {
      const products = await extractProducts(url.trim())
      setScrapedProducts(products)
    } catch (err) {
      setError(err.message || 'Failed to scrape products.')
    } finally {
      setScraping(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-bold text-white">Product Scraper</h2>
          <p className="text-white/40 text-xs">Extract product data from any URL using Firecrawl.</p>
        </div>
        {!configured && (
          <span className="text-xs text-amber-400 font-mono bg-amber-400/10 border border-amber-400/20 rounded-lg px-3 py-1">API Key Required</span>
        )}
      </div>

      {!configured ? (
        <GlassCard className="p-8 text-center rounded-12">
          <Globe className="w-10 h-10 text-white/20 mx-auto mb-3" />
          <h3 className="font-heading font-bold text-white mb-2">Firecrawl Not Configured</h3>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            Add your Firecrawl API key to the <code className="text-heat-100 font-mono">.env</code> file as <code className="text-heat-100 font-mono">VITE_FIRECRAWL_API_KEY</code> to enable product scraping.
          </p>
          <a
            href="https://firecrawl.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-xs text-heat-100 hover:text-white transition-colors"
          >
            Get API Key <ExternalLink className="w-3 h-3" />
          </a>
        </GlassCard>
      ) : (
        <>
          <GlassCard className="p-6 rounded-12">
            <div className="flex gap-3">
              <input
                type="url"
                placeholder="https://example.com/products..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleScrape()}
                className="flex-1 input-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100"
              />
              <button
                onClick={handleScrape}
                disabled={scraping || !url.trim()}
                className="btn-primary px-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 disabled:opacity-40"
              >
                {scraping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
                {scraping ? 'Scraping...' : 'Scrape'}
              </button>
            </div>
            {error && (
              <div className="mt-3 flex items-center gap-2 text-xs text-amber-400">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
          </GlassCard>

          {scrapedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-white">Scraped Products ({scrapedProducts.length})</h3>
                <button
                  onClick={() => setScrapedProducts([])}
                  className="text-xs text-white/40 hover:text-white transition-colors"
                >
                  Clear
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {scrapedProducts.map((product) => (
                  <GlassCard key={product.id} className="p-5 space-y-3 rounded-12">
                    <div>
                      <div className="text-[10px] font-mono text-heat-100/70 uppercase mb-1">{product.category}</div>
                      <h4 className="font-heading font-bold text-white text-sm">{product.name}</h4>
                      {product.tagline && (
                        <p className="text-white/40 text-xs mt-0.5 line-clamp-2">{product.tagline}</p>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="font-display font-bold text-lg text-white">${product.price.toLocaleString()}</div>
                      {product.rating > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-accent-honey text-accent-honey" />
                          <span className="text-xs text-white/50">{product.rating}</span>
                        </div>
                      )}
                    </div>
                    <a
                      href={product.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-heat-100 hover:text-white transition-colors flex items-center gap-1"
                    >
                      View Source <ExternalLink className="w-3 h-3" />
                    </a>
                  </GlassCard>
                ))}
              </div>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  )
}
