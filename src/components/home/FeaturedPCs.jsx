import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Star, Zap, ChevronRight } from 'lucide-react'
import { prebuiltPCs } from '@/data/products'
import GlassCard from '@/components/ui/GlassCard'
import useStore from '@/store/useStore'
import clsx from 'clsx'

const FILTERS = ['All', 'Gaming', 'Workstation', 'Value Picks']

const badgeStyles = {
  'neon-purple': 'bg-heat-100/20 text-heat-100 border border-heat-100/30',
  'neon-pink': 'bg-accent-crimson/20 text-accent-crimson border border-accent-crimson/30',
  'neon-cyan': 'bg-accent-bluetron/20 text-accent-bluetron border border-accent-bluetron/30',
  'neon-green': 'bg-accent-forest/20 text-accent-forest border border-accent-forest/30',
  'neon-gold': 'bg-accent-honey/20 text-accent-honey border border-accent-honey/30',
}

export default function FeaturedPCs() {
  const [filter, setFilter] = useState('All')
  const [hoveredId, setHoveredId] = useState(null)
  const { addToCart, toggleWishlist, isWishlisted } = useStore()

  const filtered = prebuiltPCs.filter((pc) => {
    if (filter === 'All') return true
    if (filter === 'Gaming') return pc.category === 'gaming'
    if (filter === 'Workstation') return pc.category === 'workstation'
    if (filter === 'Value Picks') return pc.price < 1500
    return true
  })

  return (
    <section className="section-padding">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-14 space-y-4">
          <motion.div
            className="section-label mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Zap className="w-3 h-3" />
            FEATURED BUILDS
          </motion.div>

          <motion.h2
            className="font-display text-4xl sm:text-title-h3 font-black text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            LEGENDARY{' '}
            <span className="gradient-text">PREBUILT PCS</span>
          </motion.h2>

          <motion.p
            className="text-white/50 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Handcrafted, stress-tested, and ready to ship. Every system optimized for
            maximum performance out of the box.
          </motion.p>

          {/* Filters */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 pt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={clsx(
                  'px-5 py-2 rounded-full font-heading text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 rounded-full',
                  filter === f
                    ? 'bg-gradient-to-r from-heat-100 to-accent-amethyst text-white shadow-glow-sm'
                    : 'glass text-white/50 hover:text-white border border-border-muted hover:border-heat-100/30'
                )}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((pc, i) => (
            <GlassCard
              key={pc.id}
              delay={i * 0.08}
              className="group overflow-hidden"
              onMouseEnter={() => setHoveredId(pc.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Badge */}
              <div className="relative p-6 pb-0">
                <div className="flex items-start justify-between mb-4">
                  <span className={clsx(
                    'text-[10px] font-mono font-bold tracking-widest px-3 py-1 rounded-full',
                    badgeStyles[pc.badgeColor] || badgeStyles['neon-purple']
                  )}>
                    {pc.badge}
                  </span>

                  <button
                    onClick={() => toggleWishlist(pc)}
                    className="p-2 rounded-lg hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 rounded-6"
                  >
                    <Heart className={clsx('w-4 h-4 transition-colors', isWishlisted(pc.id) ? 'fill-accent-crimson text-accent-crimson' : 'text-white/30')} />
                  </button>
                </div>

                {/* PC visual placeholder */}
                <div
                  className={clsx(
                    'relative h-44 rounded-xl bg-gradient-to-br overflow-hidden mb-4',
                    pc.color
                  )}
                  style={{ boxShadow: `0 0 40px ${pc.glowColor}` }}
                >
                  {/* Abstract PC render */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Tower body */}
                      <div className="w-24 h-36 bg-void-200/80 rounded-xl border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-heat-100 via-accent-amethyst to-accent-bluetron animate-rgb-border" style={{ backgroundSize: '200%' }} />
                        <div className="absolute inset-2 rounded-lg bg-white/5 flex flex-col items-center justify-center gap-2">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center animate-spin-slow" style={{ animationDelay: `${i * 0.4}s` }}>
                              <div className="w-3 h-3 rounded-full border border-heat-100/40" />
                            </div>
                          ))}
                        </div>
                        <div className="absolute bottom-2 inset-x-2 h-4 bg-gradient-to-r from-heat-100/30 to-accent-amethyst/30 rounded blur-sm" />
                      </div>
                      <div
                        className="absolute -inset-4 rounded-full blur-2xl opacity-40"
                        style={{ background: pc.glowColor }}
                      />
                    </div>
                  </div>

                  {/* FPS badge overlay */}
                  <div className="absolute top-3 right-3 glass rounded-8 px-2 py-1">
                    <div className="text-[10px] text-white/50 font-mono">1080p MAX</div>
                    <div className="text-sm font-display font-bold text-accent-bluetron">{pc.fps['1080p']} FPS</div>
                  </div>
                </div>

                {/* Name & price */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display font-black text-xl text-white tracking-wide group-hover:text-heat-100 transition-colors">
                      {pc.name}
                    </h3>
                    <p className="text-white/40 text-xs font-body mt-0.5">{pc.tagline}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-display font-black text-xl text-white">${pc.price.toLocaleString()}</div>
                    <div className="text-white/30 text-xs line-through">${pc.originalPrice.toLocaleString()}</div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={clsx('w-3 h-3', i < Math.floor(pc.rating) ? 'fill-accent-honey text-accent-honey' : 'text-white/20')} />
                    ))}
                  </div>
                  <span className="text-xs text-white/40 font-body">{pc.rating} ({pc.reviews.toLocaleString()})</span>
                </div>
              </div>

              {/* Specs */}
              <div className="px-6 pt-4 pb-2">
                <div className="space-y-1.5">
                  {[
                    { label: 'GPU', value: pc.gpu },
                    { label: 'CPU', value: pc.cpu },
                    { label: 'RAM', value: pc.ram },
                    { label: 'SSD', value: pc.storage },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center gap-2 text-xs">
                      <span className="w-8 text-white/30 font-mono shrink-0">{label}</span>
                      <div className="flex-1 h-px bg-white/5" />
                      <span className="text-white/60 font-body">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 pt-4 flex gap-3">
                <button
                  onClick={() => addToCart(pc)}
                  className="flex-1 btn-primary py-2.5 text-xs justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 rounded-6"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Add to Cart
                </button>
                <Link
                  to={`/prebuilt/${pc.id}`}
                  className="flex-1 btn-ghost py-2.5 text-xs justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 rounded-6"
                >
                  Details
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Stock indicator */}
              {pc.stock < 20 && (
                <div className="px-6 pb-4">
                  <div className="flex items-center gap-2 text-[10px] text-accent-honey">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-honey animate-pulse" />
                    Only {pc.stock} left in stock
                  </div>
                </div>
              )}
            </GlassCard>
          ))}
        </div>

        {/* View all */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link to="/prebuilt" className="btn-ghost focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 rounded-6">
            View All Prebuilt PCs
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
