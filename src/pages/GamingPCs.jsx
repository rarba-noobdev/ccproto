import { prebuiltPCs } from '@/data/products'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, ShoppingCart, ChevronRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import GlassCard from '@/components/ui/GlassCard'
import useStore from '@/store/useStore'
import clsx from 'clsx'

export default function GamingPCs() {
  const { addToCart } = useStore()
  const gaming = prebuiltPCs.filter((p) => p.category === 'gaming')

  return (
    <div className="min-h-screen bg-void">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="container-max">
          <div className="text-center mb-12">
            <div className="section-label mx-auto mb-4"><Zap className="w-3 h-3" />GAMING PCS</div>
            <h1 className="font-display text-5xl font-black text-white">
              BUILT FOR <span className="gradient-text">VICTORY</span>
            </h1>
            <p className="text-white/50 mt-3 max-w-xl mx-auto">
              Every gaming PC is optimized for competitive and immersive gameplay. From 1080p esports to 4K ultra. Dominate every server.
            </p>
          </div>

          {/* FPS Tier guide */}
          <div className="grid grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto">
            {[
              { label: '1080p Esports', fps: '200-500 FPS', color: 'text-accent-forest', desc: 'STORM BASE' },
              { label: '1440p Ultra', fps: '120-280 FPS', color: 'text-accent-bluetron', desc: 'APEX / PHANTOM' },
              { label: '4K Ultra + RT', fps: '90-160 FPS', color: 'text-heat-100', desc: 'TITAN X' },
            ].map(({ label, fps, color, desc }) => (
              <div key={label} className="glass border border-border-muted rounded-12 p-4 text-center">
                <div className={`font-display font-bold text-lg ${color}`}>{fps}</div>
                <div className="text-white/60 text-xs font-heading mt-1">{label}</div>
                <div className="text-white/30 text-[10px] font-mono mt-1">{desc}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {gaming.map((pc, i) => (
              <GlassCard key={pc.id} delay={i * 0.08} className="overflow-hidden group rounded-12">
                <div className={clsx('relative h-52 bg-gradient-to-br overflow-hidden', pc.color)} style={{ boxShadow: `inset 0 -30px 40px -10px #08080f` }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-28 h-40 bg-void-200/70 rounded-xl border border-white/10 overflow-hidden">
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
                      <div className="absolute -inset-4 rounded-full blur-2xl opacity-25" style={{ background: pc.glowColor }} />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 glass rounded-lg px-2.5 py-1">
                    <span className="font-display font-bold text-sm text-accent-amethyst">{pc.fps['1080p']}</span>
                    <span className="text-[10px] text-white/40 ml-1">FPS</span>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-display font-black text-xl text-white">{pc.name}</h3>
                      <p className="text-xs text-white/40">{pc.tagline}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-display font-bold text-lg text-white">${pc.price.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    {[['GPU', pc.gpu], ['CPU', pc.cpu], ['RAM', pc.ram]].map(([k, v]) => (
                      <div key={k} className="flex justify-between text-xs">
                        <span className="text-white/30 font-mono">{k}</span>
                        <span className="text-white/60">{v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => addToCart(pc)} className="flex-1 btn-primary py-2.5 text-xs justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100">
                      <ShoppingCart className="w-3.5 h-3.5" />Add to Cart
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
