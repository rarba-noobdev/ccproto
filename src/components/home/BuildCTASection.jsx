import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, ChevronRight, Shield, Truck, HeartHandshake } from 'lucide-react'
import ParticleBackground from '@/components/ui/ParticleBackground'

export default function BuildCTASection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-heat-100/10 via-accent-amethyst/5 to-accent-bluetron/10" />
      <ParticleBackground count={25} className="opacity-50" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(250,93,25,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(250,93,25,1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container-max relative text-center">
        <motion.div
          className="section-label mx-auto mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Zap className="w-3 h-3" />
          START TODAY
        </motion.div>

        <motion.h2
          className="font-display text-5xl sm:text-6xl lg:text-title-h2 font-black text-white mb-6 leading-none"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          READY TO LEVEL
          <br />
          <span className="gradient-text">UP YOUR GAME?</span>
        </motion.h2>

        <motion.p
          className="text-white/50 text-lg max-w-xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Join 47,000+ gamers who chose NexForge for their perfect build.
          Configure yours in minutes, receive it in days.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/build" className="btn-primary text-base px-8 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 rounded-6">
            <Zap className="w-5 h-5" />
            Configure Your Build
            <ChevronRight className="w-5 h-5" />
          </Link>
          <Link to="/prebuilt" className="btn-ghost text-base px-8 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 rounded-6">
            Shop Prebuilt PCs
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {[
            { icon: Shield, text: '3-Year Warranty' },
            { icon: Truck, text: 'Free Shipping' },
            { icon: HeartHandshake, text: 'Lifetime Support' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-white/50">
              <Icon className="w-4 h-4 text-heat-100" />
              <span className="text-sm font-body">{text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
