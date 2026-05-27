import { useState } from 'react'
import { motion } from 'framer-motion'
import { Filter, SlidersHorizontal, Star, ShoppingCart, Heart, Zap } from 'lucide-react'
import { prebuiltPCs } from '@/data/products'
import GlassCard from '@/components/ui/GlassCard'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import useStore from '@/store/useStore'
import clsx from 'clsx'

export default function Prebuilt() {
  const [sort, setSort] = useState('featured')
  const [maxPrice, setMaxPrice] = useState(4000)
  const { addToCart, toggleWishlist, isWishlisted } = useStore()

  const sorted = [...prebuiltPCs]
    .filter((p) => p.price <= maxPrice)
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'rating') return b.rating - a.rating
      return 0
    })

  return (
    <div className="min-h-screen bg-void">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="container-max">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="section-label mx-auto mb-4">
              <Zap className="w-3 h-3" />
              PREBUILT PCS
            </div>
            <h1 className="font-display text-5xl font-black text-white">
              READY TO <span className="gradient-text">DOMINATE</span>
            </h1>
            <p className="text-white/50 mt-3 max-w-lg mx-auto">
              Stress-tested systems ship within 5 business days. Every build guaranteed.
            </p>
          </div>

          {/* Filters bar */}
          <div className="flex flex-wrap gap-4 items-center mb-8 p-4 glass border border-border-muted rounded-16">
            <div className="flex items-center gap-2 text-white/50">
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-sm font-mono">FILTERS</span>
            </div>

            <div className="flex items-center gap-3 flex-1 min-w-48">
              <span className="text-xs text-white/40 whitespace-nowrap font-mono">MAX ${maxPrice.toLocaleString()}</span>
              <input
                type="range" min={999} max={4000} step={100}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="flex-1 accent-heat-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 rounded-8"
              />
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-void-200 border border-white/10 rounded-8 px-4 py-2 text-sm text-white focus:outline-none focus:border-heat-100/40 font-heading focus-visible:ring-2 focus-visible:ring-heat-100"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Best Rated</option>
            </select>

            <span className="text-xs text-white/30 font-mono ml-auto">{sorted.length} results</span>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {sorted.map((pc, i) => (
              <GlassCard key={pc.id} delay={i * 0.06} className="overflow-hidden group rounded-12">
                {/* Image area */}
                <div
                  className={clsx('relative h-48 bg-gradient-to-br overflow-hidden rounded-t-12', pc.color)}
                  style={{ boxShadow: `inset 0 -30px 40px -10px #08080f` }}
                >
                  {/* Abstract PC */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-28 h-40 bg-void-200/70 rounded-xl border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-1 animate-rgb-border" style={{ background: `linear-gradient(90deg, ${pc.glowColor}, rgba(37,99,235,0.8), rgba(6,182,212,0.8))`, backgroundSize: '200%' }} />
                        <div className="absolute inset-2 rounded-lg bg-white/5 flex flex-col items-center justify-center gap-2">
                          {[...Array(3)].map((_, fi) => (
                            <div key={fi} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center animate-spin-slow" style={{ animationDelay: `${fi * 0.3}s` }}>
                              <div className="w-4 h-4 rounded-full border border-heat-100/30" />
                            </div>
                          ))}
                        </div>
                        <div className="absolute bottom-2 inset-x-2 h-4 rounded blur-sm" style={{ background: `linear-gradient(90deg, ${pc.glowColor}, rgba(37,99,235,0.5))` }} />
                      </div>
                      <div className="absolute -inset-4 rounded-full blur-2xl opacity-30" style={{ background: pc.glowColor }} />
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={clsx(
                      'text-[10px] font-mono font-bold tracking-widest px-3 py-1 rounded-full',
                      pc.badgeColor === 'neon-purple' && 'bg-heat-100/30 text-heat-100 border border-heat-100/40',
                      pc.badgeColor === 'neon-pink' && 'bg-accent-crimson/30 text-accent-crimson border border-accent-crimson/40',
                      pc.badgeColor === 'neon-cyan' && 'bg-accent-amethyst/30 text-accent-amethyst border border-accent-amethyst/40',
                      pc.badgeColor === 'neon-green' && 'bg-accent-forest/30 text-accent-forest border border-accent-forest/40',
                      pc.badgeColor === 'neon-gold' && 'bg-accent-honey/30 text-accent-honey border border-accent-honey/40',
                    )}>
                      {pc.badge}
                    </span>
                  </div>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(pc)}
                    className="absolute top-3 right-3 p-2 glass border border-border-muted rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100"
                  >
                    <Heart className={clsx('w-4 h-4', isWishlisted(pc.id) ? 'fill-accent-crimson text-accent-crimson' : 'text-white/50')} />
                  </button>

                  {/* FPS tag */}
                  <div className="absolute bottom-3 right-3 glass rounded-lg px-2 py-1">
                    <span className="font-display font-bold text-sm text-accent-amethyst">{pc.fps['1080p']}</span>
                    <span className="text-[10px] text-white/40 ml-1">FPS</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 space-y-3">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-display font-black text-xl text-white group-hover:gradient-text transition-all">{pc.name}</h3>
                      <div className="text-right">
                        <div className="font-display font-bold text-lg text-white">${pc.price.toLocaleString()}</div>
                        <div className="text-xs text-white/30 line-through">${pc.originalPrice.toLocaleString()}</div>
                      </div>
                    </div>
                    <p className="text-xs text-white/40 mt-0.5">{pc.tagline}</p>
                  </div>

                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={clsx('w-3.5 h-3.5', i < Math.floor(pc.rating) ? 'fill-accent-honey text-accent-honey' : 'text-white/15')} />
                    ))}
                    <span className="text-xs text-white/40 ml-1">({pc.reviews.toLocaleString()})</span>
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    {[['GPU', pc.gpu], ['CPU', pc.cpu]].map(([k, v]) => (
                      <div key={k} className="text-xs">
                        <span className="text-white/30 font-mono">{k}</span>
                        <span className="text-white/60 ml-2 truncate">{v.split(' ').slice(0, 3).join(' ')}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button onClick={() => addToCart(pc)} className="flex-1 btn-primary py-2.5 text-xs justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100">
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
