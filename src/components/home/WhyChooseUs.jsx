import { motion } from 'framer-motion'
import { Shield, Zap, HeartHandshake, Package, Cpu, BarChart3 } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'

const features = [
  {
    icon: Cpu,
    title: 'Expert Component Selection',
    desc: 'Our engineers handpick every component for maximum compatibility and performance. No compromises, ever.',
    color: 'text-heat-100',
    glow: 'heat',
  },
  {
    icon: Shield,
    title: 'Lifetime Support Guarantee',
    desc: 'Every build comes with lifetime technical support and a 3-year comprehensive warranty on all components.',
    color: 'text-accent-bluetron',
    glow: 'bluetron',
  },
  {
    icon: BarChart3,
    title: 'Real-Time FPS Estimator',
    desc: 'See exactly how your custom build performs in your favorite games before you buy — powered by real benchmark data.',
    color: 'text-accent-amethyst',
    glow: 'amethyst',
  },
  {
    icon: Zap,
    title: 'Same-Week Delivery',
    desc: 'Most builds ship within 5 business days. Fully tested, stress-checked, and packed with military-grade protection.',
    color: 'text-accent-forest',
    glow: 'bluetron',
  },
  {
    icon: HeartHandshake,
    title: 'Zero Bloatware Promise',
    desc: 'Clean Windows install, optimized drivers, and a custom BIOS tune — your PC performs at peak from day one.',
    color: 'text-accent-crimson',
    glow: 'pink',
  },
  {
    icon: Package,
    title: 'White-Glove Unboxing',
    desc: 'Every system arrives in custom foam-lined packaging with cable management done and GPU brace installed.',
    color: 'text-accent-honey',
    glow: 'heat',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-heat-100/3 to-transparent pointer-events-none" />

      <div className="container-max">
        <div className="text-center mb-14 space-y-4">
          <motion.div
            className="section-label mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            WHY NEXFORGE
          </motion.div>

          <motion.h2
            className="font-display text-4xl sm:text-title-h3 font-black text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            BUILT DIFFERENT.
            <span className="gradient-text"> PROVEN BETTER.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, desc, color, glow }, i) => (
            <GlassCard key={title} delay={i * 0.07} glow={glow} className="p-6 space-y-4">
              <div className={`w-12 h-12 rounded-xl bg-void-300 flex items-center justify-center ${color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-white mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed font-body">{desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Trust bar */}
        <motion.div
          className="mt-16 glass rounded-2xl border border-border-muted p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/5">
            {[
              { value: '47,000+', label: 'Happy Customers' },
              { value: '99.7%', label: 'Satisfaction Rate' },
              { value: '<5 Days', label: 'Average Ship Time' },
              { value: '3 Years', label: 'Warranty Included' },
            ].map(({ value, label }) => (
              <div key={label} className="space-y-1">
                <div className="font-display font-black text-2xl gradient-text">{value}</div>
                <div className="text-white/40 text-sm font-body">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
