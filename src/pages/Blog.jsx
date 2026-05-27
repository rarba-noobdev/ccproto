import { motion } from 'framer-motion'
import { Zap, Clock, ChevronRight, Tag } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import GlassCard from '@/components/ui/GlassCard'

const posts = [
  { id: 1, title: 'RTX 5090 vs RTX 4090: Is It Worth the Upgrade?', excerpt: 'We put both cards through their paces in 20+ games at every resolution. The results might surprise you.', category: 'GPU Reviews', date: 'May 25, 2026', readTime: '8 min', color: 'from-purple-900/40 to-blue-900/40' },
  { id: 2, title: 'The Ultimate DDR5 Buyer\'s Guide for Gaming in 2026', excerpt: 'Not all DDR5 is created equal. We break down speed, timings, and which kits actually improve game performance.', category: 'Memory', date: 'May 22, 2026', readTime: '12 min', color: 'from-blue-900/40 to-cyan-900/40' },
  { id: 3, title: '7 Cable Management Tips That Transform Your Build', excerpt: 'Clean builds aren\'t just aesthetic — proper airflow routing can drop temps by 8°C. Here\'s how we do it.', category: 'Building Tips', date: 'May 20, 2026', readTime: '6 min', color: 'from-cyan-900/40 to-green-900/40' },
  { id: 4, title: 'Best Budget Gaming PC Build Under $1,000 in 2026', excerpt: 'Stretching $1,000 to its absolute limit. This build hits 200+ FPS in Valorant and still looks premium.', category: 'Builds', date: 'May 18, 2026', readTime: '10 min', color: 'from-green-900/40 to-teal-900/40' },
  { id: 5, title: 'PCIe 5.0 SSDs: Fastest Storage You Can Buy', excerpt: 'Are 14,000 MB/s speeds actually useful for gaming? We loaded 20 games and measured. Results inside.', category: 'Storage', date: 'May 15, 2026', readTime: '7 min', color: 'from-pink-900/40 to-purple-900/40' },
  { id: 6, title: 'Liquid Cooling vs Air Cooling: The Definitive 2026 Test', excerpt: 'We ran 120mm, 240mm, 360mm AIOs and the Noctua NH-D15 against each other. Spoiler: air still wins sometimes.', category: 'Cooling', date: 'May 12, 2026', readTime: '9 min', color: 'from-amber-900/40 to-orange-900/40' },
]

export default function Blog() {
  const [featured, ...rest] = posts

  return (
    <div className="min-h-screen bg-void">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="container-max">
          <div className="text-center mb-12">
            <div className="section-label mx-auto mb-4"><Zap className="w-3 h-3" />BLOG</div>
            <h1 className="font-display text-5xl font-black text-white">KNOWLEDGE <span className="gradient-text">HUB</span></h1>
            <p className="text-white/50 mt-3">Hardware reviews, build guides, and gaming insights from our engineering team.</p>
          </div>

          {/* Featured post */}
          <motion.div
            className={`relative h-72 rounded-16 bg-gradient-to-br ${featured.color} border border-border-muted overflow-hidden mb-8 cursor-pointer group`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-void to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-8">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-3.5 h-3.5 text-heat-100" />
                <span className="text-xs font-mono text-heat-100">{featured.category}</span>
                <span className="text-xs text-white/30">· {featured.date}</span>
              </div>
              <h2 className="font-display font-black text-2xl text-white mb-2 group-hover:gradient-text transition-all">{featured.title}</h2>
              <p className="text-white/60 text-sm">{featured.excerpt}</p>
              <div className="flex items-center gap-2 mt-4 text-heat-100 text-sm font-heading font-semibold">
                Read Article <ChevronRight className="w-4 h-4" />
              </div>
            </div>
            <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-xs font-mono text-accent-amethyst">FEATURED</div>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((post, i) => (
              <GlassCard key={post.id} delay={i * 0.07} className="overflow-hidden group cursor-pointer rounded-12">
                <div className={`h-32 bg-gradient-to-br ${post.color} relative`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-void to-transparent" />
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs">
                    <Tag className="w-3 h-3 text-heat-100" />
                    <span className="text-heat-100/80 font-mono">{post.category}</span>
                    <span className="text-white/25">·</span>
                    <Clock className="w-3 h-3 text-white/30" />
                    <span className="text-white/30">{post.readTime}</span>
                  </div>
                  <h3 className="font-heading font-bold text-white text-sm leading-snug group-hover:text-heat-100 transition-colors">{post.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-white/25 font-mono">{post.date}</span>
                    <span className="text-xs text-heat-100 font-heading font-semibold flex items-center gap-1">
                      Read <ChevronRight className="w-3 h-3" />
                    </span>
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
