import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

const items = [
  { label: 'TITAN X', tag: 'RTX 4090', fromColor: '#fa5d19', toColor: '#9061ff' },
  { label: 'PHANTOM PRO', tag: 'RTX 4080 Super', fromColor: '#2a6dfb', toColor: '#06b6d4' },
  { label: 'APEX ELITE', tag: 'RTX 4070 Ti Super', fromColor: '#06b6d4', toColor: '#42c366' },
  { label: 'STORM BASE', tag: 'RTX 4060 Ti', fromColor: '#42c366', toColor: '#ecb730' },
  { label: 'STEALTH MINI', tag: 'RTX 4070 Super', fromColor: '#ec4899', toColor: '#fa5d19' },
  { label: 'WORKFORCE PRO', tag: 'RTX 4090 + TR', fromColor: '#ecb730', toColor: '#ec4899' },
]

export default function RGBShowcase() {
  return (
    <section className="section-padding overflow-hidden">
      <div className="container-max">
        <div className="text-center mb-14 space-y-4">
          <motion.div className="section-label mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Zap className="w-3 h-3" />
            RGB SHOWCASE
          </motion.div>

          <motion.h2
            className="font-display text-4xl sm:text-title-h3 font-black text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            BUILT TO{' '}
            <span className="gradient-text">ILLUMINATE</span>
          </motion.h2>

          <motion.p
            className="text-white/50 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Every NexForge build is a visual masterpiece. RGB lighting, tempered glass panels,
            and premium aesthetics that demand attention.
          </motion.p>
        </div>

        {/* Showcase grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map(({ label, tag, fromColor, toColor }, i) => (
            <motion.div
              key={label}
              className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
            >
              {/* Background */}
              <div
                className="absolute inset-0"
                style={{ background: `radial-gradient(circle at center, ${fromColor}30 0%, ${toColor}15 50%, #08080f 100%)` }}
              />

              {/* Grid lines */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(${fromColor}40 1px, transparent 1px),
                    linear-gradient(90deg, ${fromColor}40 1px, transparent 1px)
                  `,
                  backgroundSize: '30px 30px',
                }}
              />

              {/* PC render (abstract) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div
                    className="w-28 h-40 rounded-xl border-2 relative overflow-hidden"
                    style={{ borderColor: `${fromColor}40` }}
                  >
                    <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${fromColor}10, ${toColor}10)` }} />

                    {/* RGB bar top */}
                    <div
                      className="absolute top-0 inset-x-0 h-1 animate-rgb-border"
                      style={{
                        background: `linear-gradient(90deg, ${fromColor}, ${toColor}, ${fromColor})`,
                        backgroundSize: '200% 100%',
                      }}
                    />

                    {/* Fans */}
                    {[25, 50, 75].map((pct, fi) => (
                      <div
                        key={fi}
                        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10"
                        style={{ top: `${pct}%` }}
                      >
                        <div
                          className="w-full h-full rounded-full border-2 animate-spin-slow flex items-center justify-center"
                          style={{ borderColor: `${fromColor}50`, animationDelay: `${fi * 0.3}s` }}
                        >
                          <div className="w-4 h-4 rounded-full border" style={{ borderColor: `${toColor}50` }} />
                        </div>
                      </div>
                    ))}

                    {/* RGB glow */}
                    <motion.div
                      className="absolute inset-2 rounded-lg blur-sm opacity-30"
                      animate={{ opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      style={{ background: `linear-gradient(135deg, ${fromColor}, ${toColor})` }}
                    />
                  </div>

                  {/* Glow beneath */}
                  <div
                    className="absolute -bottom-3 inset-x-2 h-6 rounded-full blur-xl opacity-50"
                    style={{ background: `linear-gradient(90deg, ${fromColor}, ${toColor})` }}
                  />
                </div>
              </div>

              {/* Overlay info */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(to top, ${fromColor}60 0%, transparent 60%)` }}
              >
                <div className="font-display font-black text-lg text-white">{label}</div>
                <div className="font-mono text-xs" style={{ color: toColor }}>{tag}</div>
              </div>

              {/* Border glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-opacity-60 transition-all duration-300"
                style={{ '--tw-border-opacity': 0.4, borderColor: fromColor }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
