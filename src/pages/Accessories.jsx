import { accessories } from '@/data/products'
import { motion } from 'framer-motion'
import { ShoppingCart, Star, Zap, Monitor, Keyboard, Mouse, Headphones, LayoutGrid, Antenna } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import GlassCard from '@/components/ui/GlassCard'
import useStore from '@/store/useStore'
import clsx from 'clsx'

const categoryIcons = {
  monitor: Monitor,
  keyboard: Keyboard,
  mouse: Mouse,
  headset: Headphones,
  mousepad: LayoutGrid,
  streaming: Antenna,
}

const categoryColors = {
  monitor: 'text-accent-bluetron',
  keyboard: 'text-accent-amethyst',
  mouse: 'text-accent-forest',
  headset: 'text-accent-crimson',
  mousepad: 'text-accent-honey',
  streaming: 'text-heat-100',
}

export default function Accessories() {
  const { addToCart } = useStore()

  return (
    <div className="min-h-screen bg-void">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="container-max">
          <div className="text-center mb-12">
            <div className="section-label mx-auto mb-4"><Zap className="w-3 h-3" />ACCESSORIES</div>
            <h1 className="font-display text-5xl font-black text-white">
              COMPLETE YOUR <span className="gradient-text">SETUP</span>
            </h1>
            <p className="text-white/50 mt-3">Premium peripherals engineered to match your NexForge rig.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {accessories.map((acc, i) => {
              const Icon = categoryIcons[acc.category] || Monitor
              return (
                <GlassCard key={acc.id} delay={i * 0.07} className="p-5 space-y-4 group rounded-12">
                  <div className="h-32 bg-void-200 rounded-12 flex items-center justify-center border border-white/5 group-hover:border-heat-100/20 transition-colors">
                    <Icon className={clsx('w-12 h-12', categoryColors[acc.category] || 'text-white/30')} />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-heat-100/70 capitalize mb-1">{acc.category}</div>
                    <h3 className="font-heading font-bold text-white">{acc.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, si) => (
                        <Star key={si} className={`w-3 h-3 ${si < Math.floor(acc.rating) ? 'fill-accent-honey text-accent-honey' : 'text-white/15'}`} />
                      ))}
                      <span className="text-xs text-white/30 ml-1">{acc.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-display font-bold text-xl text-white">${acc.price}</div>
                    <button onClick={() => addToCart(acc)} className="btn-primary py-2 px-4 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100">
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Add
                    </button>
                  </div>
                </GlassCard>
              )
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
