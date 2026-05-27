import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('initializing')
  const phases = ['INITIALIZING SYSTEMS', 'LOADING COMPONENTS', 'CALIBRATING PERFORMANCE', 'LAUNCHING NEXFORGE']

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      current += Math.random() * 15 + 5
      if (current >= 100) {
        current = 100
        clearInterval(interval)
        setTimeout(onComplete, 600)
      }
      setProgress(Math.min(current, 100))
      setPhase(phases[Math.floor((Math.min(current, 99) / 100) * phases.length)])
    }, 120)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-void flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(250,93,25,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(250,93,25,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Corner decorations */}
      {[
        'top-8 left-8 border-t-2 border-l-2',
        'top-8 right-8 border-t-2 border-r-2',
        'bottom-8 left-8 border-b-2 border-l-2',
        'bottom-8 right-8 border-b-2 border-r-2',
      ].map((cls, i) => (
        <motion.div
          key={i}
          className={`absolute ${cls} border-heat-100/60 w-12 h-12`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
        />
      ))}

      {/* Glowing orbs */}
      <div className="absolute w-96 h-96 rounded-full bg-heat-100/10 blur-3xl top-1/4 left-1/4 animate-pulse" />
      <div className="absolute w-64 h-64 rounded-full bg-accent-bluetron/10 blur-3xl bottom-1/4 right-1/4 animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Logo */}
      <motion.div
        className="relative mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="font-display text-5xl font-black tracking-widest gradient-text mb-2">
          NEXFORGE
        </div>
        <div className="font-mono text-xs tracking-[0.4em] text-heat-100/70">
          GAMING SYSTEMS
        </div>

        {/* Animated underline */}
        <motion.div
          className="mt-4 h-px bg-gradient-to-r from-transparent via-heat-100 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </motion.div>

      {/* Loading bar */}
      <motion.div
        className="w-80 space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="h-1 bg-void-300 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-heat-100 via-accent-amethyst to-accent-bluetron rounded-full relative"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-glow-heat" />
          </motion.div>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-mono text-[10px] tracking-widest text-heat-100/70">
            {phase}
          </span>
          <span className="font-mono text-[10px] text-white/50">
            {Math.round(progress)}%
          </span>
        </div>
      </motion.div>

      {/* Scanning lines */}
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-bluetron/30 to-transparent"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
    </motion.div>
  )
}
