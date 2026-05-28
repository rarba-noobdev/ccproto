import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('initializing')
  const phases = ['INITIALIZING SYSTEMS', 'LOADING COMPONENTS', 'CALIBRATING PERFORMANCE', 'LAUNCHING Challenger Computers']

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
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-background-base"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-black/10" />

      {/* Logo */}
      <motion.div
        className="relative mb-48 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="font-display text-[48px] leading-[1] font-medium tracking-[-2.5px] text-ink mb-8">
          Challenger Computers
        </div>
        <div className="text-label-x-small tracking-[-0.12px] text-ink-muted">
          GAMING SYSTEMS
        </div>

        {/* Animated underline */}
        <motion.div
          className="mt-16 h-1 bg-black/10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </motion.div>

      {/* Loading bar */}
      <motion.div
        className="w-[320px] space-y-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="h-4 overflow-hidden rounded-full bg-black/10">
          <motion.div
            className="relative h-full rounded-full bg-heat-100"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          >
            <div className="absolute right-0 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-heat-100" />
          </motion.div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[10px] tracking-[-0.1px] text-ink-muted">
            {phase}
          </span>
          <span className="font-mono text-[10px] text-ink-muted">
            {Math.round(progress)}%
          </span>
        </div>
      </motion.div>

      <motion.div className="absolute inset-x-0 bottom-0 h-1 bg-black/10" />
    </motion.div>
  )
}
