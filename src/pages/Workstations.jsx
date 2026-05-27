import { prebuiltPCs } from '@/data/products'
import { motion } from 'framer-motion'
import { Cpu, ShoppingCart, Zap } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import GlassCard from '@/components/ui/GlassCard'
import useStore from '@/store/useStore'

export default function Workstations() {
  const { addToCart } = useStore()
  const workstations = prebuiltPCs.filter((p) => p.category === 'workstation')

  return (
    <div className="min-h-screen bg-void">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="container-max">
          <div className="text-center mb-12">
            <div className="section-label mx-auto mb-4"><Cpu className="w-3 h-3" />WORKSTATIONS</div>
            <h1 className="font-display text-5xl font-black text-white">
              BUILT FOR <span className="gradient-text">CREATORS</span>
            </h1>
            <p className="text-white/50 mt-3 max-w-xl mx-auto">
              Render faster, stream smoother, create without limits. Our workstations are engineered for the most demanding professional workflows.
            </p>
          </div>

          {/* Use cases */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {['3D Rendering', 'Video Editing', 'AI/ML Training', 'VFX & Motion'].map((use, i) => (
              <GlassCard key={use} delay={i * 0.06} className="p-4 text-center rounded-12">
                <div className="font-heading font-semibold text-sm text-white">{use}</div>
                <div className="text-xs text-heat-100 font-mono mt-1">OPTIMIZED</div>
              </GlassCard>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {workstations.map((pc, i) => (
              <GlassCard key={pc.id} delay={i * 0.1} className="overflow-hidden rounded-12">
                <div className={`h-56 bg-gradient-to-br ${pc.color} relative flex items-center justify-center`} style={{ boxShadow: `inset 0 -30px 40px -10px #08080f` }}>
                  <div className="text-center">
                    <div className="font-display font-black text-3xl text-white/80 mb-1">{pc.name}</div>
                    <div className="text-accent-honey font-mono text-sm">{pc.badge}</div>
                  </div>
                </div>
                <div className="p-7 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-display font-black text-2xl text-white">{pc.name}</h3>
                      <p className="text-white/50 text-sm">{pc.tagline}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-display font-black text-2xl text-white">${pc.price.toLocaleString()}</div>
                      <div className="text-white/30 text-sm line-through">${pc.originalPrice.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      ['GPU', pc.gpu], ['CPU', pc.cpu],
                      ['RAM', pc.ram], ['Storage', pc.storage],
                      ['Cooling', pc.cooling], ['PSU', pc.psu],
                    ].map(([k, v]) => (
                      <div key={k} className="text-xs">
                        <span className="text-white/30 font-mono block">{k}</span>
                        <span className="text-white/70">{v}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => addToCart(pc)} className="w-full btn-primary justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100">
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart — ${pc.price.toLocaleString()}
                  </button>
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
