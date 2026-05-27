import { useState } from 'react'
import { motion } from 'framer-motion'
import { benchmarks } from '@/data/products'
import { Monitor, Zap } from 'lucide-react'
import clsx from 'clsx'

const maxFPS = { cyberpunk: 500, valorant: 500, eldenring: 150, warzone: 300 }

export default function BenchmarkSection() {
  const [activeGame, setActiveGame] = useState(0)

  const current = benchmarks[activeGame]
  const max = Math.max(...current.scores.map((s) => s.fps)) * 1.1

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-bluetron/3 to-transparent pointer-events-none" />

      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <motion.div
                className="section-label"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <Monitor className="w-3 h-3" />
                FPS BENCHMARKS
              </motion.div>

              <motion.h2
                className="font-display text-4xl sm:text-title-h3 font-black text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                REAL NUMBERS.
                <br />
                <span className="gradient-text">REAL PERFORMANCE.</span>
              </motion.h2>

              <motion.p
                className="text-white/50 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Every benchmark is run on actual hardware, not marketing specs.
                What you see here is what you get — unfiltered performance.
              </motion.p>
            </div>

            {/* Game selector */}
            <div className="space-y-2">
              <p className="text-xs font-mono text-white/30 tracking-widest">SELECT GAME</p>
              <div className="grid grid-cols-2 gap-2">
                {benchmarks.map((b, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveGame(i)}
                    className={clsx(
                      'text-left p-3 rounded-xl font-heading text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 rounded-8',
                      activeGame === i
                        ? 'bg-gradient-to-r from-heat-100/20 to-accent-amethyst/20 border border-heat-100/40 text-white'
                        : 'glass border border-border-muted text-white/50 hover:text-white hover:border-white/20'
                    )}
                  >
                    <div className="font-semibold text-xs">{b.game}</div>
                    <div className="text-[10px] text-white/30 mt-0.5">{b.settings}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4">
              {current.scores.map(({ build, color }) => (
                <div key={build} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ background: color }} />
                  <span className="text-xs font-heading text-white/60">{build}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Chart */}
          <motion.div
            className="glass rounded-2xl border border-border-muted p-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display font-bold text-white">{current.game}</h3>
                <p className="text-xs text-white/40 font-mono">{current.settings}</p>
              </div>
              <div className="glass px-3 py-1.5 rounded-lg">
                <span className="text-xs font-mono text-accent-bluetron">1080p / 1440p / 4K</span>
              </div>
            </div>

            <div className="space-y-5">
              {current.scores.map(({ build, fps, color }, i) => {
                const pct = (fps / max) * 100
                return (
                  <div key={build}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-heading font-semibold text-sm text-white">{build}</span>
                      <div className="flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5" style={{ color }} />
                        <span className="font-display font-bold text-lg" style={{ color }}>{fps}</span>
                        <span className="text-xs text-white/40">FPS</span>
                      </div>
                    </div>
                    <div className="h-3 bg-void-300 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full relative overflow-hidden"
                        style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-shimmer" />
                      </motion.div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Bottom note */}
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-forest animate-pulse" />
              <p className="text-xs text-white/30 font-mono">
                Tested at max settings • Averaged over 30-min sessions
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
