import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Cpu, HardDrive, Zap, ChevronRight, ChevronLeft,
  CheckCircle2, AlertTriangle, ShoppingCart, Save,
  Trophy, Star, BarChart3, ThumbsUp,
  Gamepad2, Crown
} from 'lucide-react'
import { builderComponents } from '@/data/components'
import useStore from '@/store/useStore'
import GlassCard from '@/components/ui/GlassCard'
import ParticleBackground from '@/components/ui/ParticleBackground'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import clsx from 'clsx'

const STEPS = Object.keys(builderComponents)
const STEP_LABELS = {
  cpu: 'CPU', gpu: 'GPU', ram: 'RAM', storage: 'Storage',
  motherboard: 'Mobo', cooling: 'Cooling', psu: 'PSU', case: 'Case'
}

const tierColors = {
  ultra: 'text-heat-100 border-heat-100/40 bg-heat-100/10',
  high: 'text-accent-bluetron border-accent-bluetron/40 bg-accent-bluetron/10',
  mid: 'text-accent-amethyst border-accent-amethyst/40 bg-accent-amethyst/10',
  base: 'text-white/50 border-white/20 bg-white/5',
}

const badges = [
  { id: 'firstBuild', label: 'First Build', icon: Gamepad2, condition: (build) => Object.values(build).filter(Boolean).length >= 1 },
  { id: 'halfWay', label: 'Half Way', icon: Zap, condition: (build) => Object.values(build).filter(Boolean).length >= 4 },
  { id: 'ultraBuilder', label: 'Ultra Builder', icon: Crown, condition: (build) => Object.values(build).filter(Boolean).filter(c => c.tier === 'ultra').length >= 3 },
  { id: 'completeBuild', label: 'Complete Build', icon: Trophy, condition: (build) => Object.values(build).every(Boolean) },
]

export default function BuildPC() {
  const { currentBuild, builderStep, setBuilderComponent, setBuilderStep, getBuildPrice, getBuildWattage, getBuildScore, addToCart, saveBuild } = useStore()
  const [earnedBadges, setEarnedBadges] = useState([])
  const [newBadge, setNewBadge] = useState(null)
  const [buildName, setBuildName] = useState('')
  const [showSaveModal, setShowSaveModal] = useState(false)

  const step = STEPS[builderStep]
  const stepData = builderComponents[step]
  const progress = (Object.values(currentBuild).filter(Boolean).length / STEPS.length) * 100
  const buildPrice = getBuildPrice()
  const buildWattage = getBuildWattage()
  const buildScore = getBuildScore()

  // Check badges
  useEffect(() => {
    badges.forEach((badge) => {
      if (!earnedBadges.includes(badge.id) && badge.condition(currentBuild)) {
        setEarnedBadges((prev) => [...prev, badge.id])
        setNewBadge(badge)
        setTimeout(() => setNewBadge(null), 3000)
      }
    })
  }, [currentBuild])

  const selectComponent = (component) => {
    setBuilderComponent(step, component)
    if (builderStep < STEPS.length - 1) {
      setTimeout(() => setBuilderStep(builderStep + 1), 350)
    }
  }

  const handleAddToCart = () => {
    if (Object.values(currentBuild).every(Boolean)) {
      addToCart({ id: `build-${Date.now()}`, name: 'Custom Build', price: buildPrice, quantity: 1 })
    }
  }

  const isCompatible = (opt) => {
    if (step === 'motherboard' && currentBuild.cpu) {
      const cpuSocket = builderComponents.cpu.options.find(c => c.id === currentBuild.cpu?.id)?.socket
      if (cpuSocket && opt.socket && opt.socket !== cpuSocket) return false
    }
    return true
  }

  // Bottleneck detection
  const getBottleneck = () => {
    const cpu = currentBuild.cpu
    const gpu = currentBuild.gpu
    if (!cpu || !gpu) return null
    const cpuScore = cpu.score || 0
    const gpuScore = gpu.score || 0
    const diff = Math.abs(cpuScore - gpuScore)
    if (diff > 15) {
      return cpuScore < gpuScore
        ? { type: 'CPU', msg: 'CPU may bottleneck your GPU. Consider upgrading.' }
        : { type: 'GPU', msg: 'GPU may limit your CPU potential. Consider upgrading.' }
    }
    return null
  }

  const bottleneck = getBottleneck()

  const recommendedPSU = buildWattage * 1.25

  return (
    <div className="min-h-screen bg-void">
      <Navbar />

      {/* Badge toast */}
      <AnimatePresence>
        {newBadge && (
          <motion.div
            className="fixed top-24 right-6 z-50 glass border border-heat-100/40 rounded-16 px-5 py-4 flex items-center gap-3 shadow-glow-heat"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
          >
            <newBadge.icon className="w-6 h-6 text-heat-100" />
            <div>
              <p className="text-xs font-mono text-heat-100">BADGE UNLOCKED</p>
              <p className="font-heading font-bold text-white">{newBadge.label}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-24 pb-20 relative overflow-hidden">
        <ParticleBackground count={30} className="opacity-30" />
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />

        <div className="container-max relative">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="section-label mx-auto mb-4">
              <Zap className="w-3 h-3" />
              PC CONFIGURATOR
            </div>
            <h1 className="font-display text-4xl sm:text-title-h3 font-black text-white">
              BUILD YOUR <span className="gradient-text">DREAM RIG</span>
            </h1>
            <p className="text-white/50 mt-3 max-w-lg mx-auto">
              Choose every component step-by-step. Real-time compatibility checks, wattage calculations, and FPS estimates included.
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-8 max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="font-mono text-xs text-white/40">BUILD PROGRESS</span>
              <span className="font-mono text-xs text-heat-100">{Math.round(progress)}% Complete</span>
            </div>
            <div className="h-2 bg-void-300 rounded-full overflow-hidden">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Step tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-8 max-w-4xl mx-auto">
            {STEPS.map((s, i) => (
              <button
                key={s}
                onClick={() => setBuilderStep(i)}
                className={clsx(
                  'flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-8 font-mono text-xs tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100',
                  i === builderStep
                    ? 'bg-gradient-to-r from-heat-100 to-accent-amethyst text-white shadow-glow-heat'
                    : currentBuild[s]
                    ? 'bg-void-300 text-accent-amethyst border border-accent-amethyst/20'
                    : 'glass text-white/40 hover:text-white'
                )}
              >
                {currentBuild[s] ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[8px]">{i + 1}</span>}
                {STEP_LABELS[s]}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Component selector */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-heading font-bold text-xl text-white">
                    Select {stepData.label}
                  </h2>
                  <p className="text-xs text-white/40 font-mono mt-0.5">
                    {builderStep + 1} of {STEPS.length}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3"
                  >
                    {stepData.options.map((opt, i) => {
                      const selected = currentBuild[step]?.id === opt.id
                      const compat = isCompatible(opt)
                      return (
                        <motion.button
                          key={opt.id}
                          onClick={() => compat && selectComponent(opt)}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className={clsx(
                            'w-full text-left glass rounded-12 border transition-all duration-200 p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100',
                            selected
                              ? 'border-heat-100/60 bg-heat-100/10 shadow-glow-heat'
                              : compat
                              ? 'border-transparent hover:border-heat-100/30 hover:bg-white/5 cursor-pointer'
                              : 'border-transparent opacity-40 cursor-not-allowed'
                          )}
                        >
                          <div className="flex items-center gap-4">
                            {/* Selection indicator */}
                            <div className={clsx(
                              'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all',
                              selected ? 'border-heat-100 bg-heat-100' : 'border-white/20'
                            )}>
                              {selected && <CheckCircle2 className="w-3 h-3 text-white" />}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-heading font-semibold text-white text-sm">{opt.name}</span>
                                <span className={clsx('text-[10px] font-mono px-2 py-0.5 rounded-full border', tierColors[opt.tier])}>
                                  {opt.tier?.toUpperCase()}
                                </span>
                                {!compat && <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border text-amber-400 border-amber-400/30 bg-amber-400/10">INCOMPATIBLE</span>}
                              </div>
                              <div className="text-xs text-white/40 mt-0.5 font-body">
                                {opt.brand}
                                {opt.speed && ` · ${opt.speed}`}
                                {opt.vram && ` · ${opt.vram}`}
                                {opt.efficiency && ` · ${opt.efficiency} Efficient`}
                                {opt.wattage > 0 && ` · ${opt.wattage}W`}
                              </div>
                            </div>

                            {/* Score bar */}
                            <div className="hidden sm:flex flex-col items-end gap-1 shrink-0 w-20">
                              <span className="text-[10px] font-mono text-white/30">SCORE</span>
                              <div className="w-full h-1.5 bg-void-300 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-heat-100 to-accent-bluetron rounded-full"
                                  style={{ width: `${opt.score}%` }}
                                />
                              </div>
                              <span className="text-xs font-display font-bold text-heat-100">{opt.score}</span>
                            </div>

                            {/* Price */}
                            <div className="text-right shrink-0">
                              <div className="font-display font-bold text-white">${opt.price}</div>
                            </div>
                          </div>
                        </motion.button>
                      )
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="flex gap-3 pt-2">
                {builderStep > 0 && (
                  <button onClick={() => setBuilderStep(builderStep - 1)} className="btn-ghost flex-1 justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100">
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>
                )}
                {builderStep < STEPS.length - 1 && (
                  <button onClick={() => setBuilderStep(builderStep + 1)} className="btn-primary flex-1 justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100">
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Right panel — Build Summary */}
            <div className="space-y-4">
              {/* Live price */}
              <GlassCard animate={false} className="p-5 space-y-4 rounded-12">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-white">Build Summary</h3>
                  <div className="font-display font-black text-2xl gradient-text">${buildPrice.toLocaleString()}</div>
                </div>

                {/* Build score */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-mono text-white/40">BUILD SCORE</span>
                    <span className="font-display font-bold text-heat-100">{buildScore}/100</span>
                  </div>
                  <div className="h-2 bg-void-300 rounded-full overflow-hidden">
                    <div className="progress-bar-fill" style={{ width: `${buildScore}%` }} />
                  </div>
                </div>

                {/* Wattage */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40 font-mono">EST. WATTAGE</span>
                  <span className={clsx('font-mono font-bold', buildWattage > 800 ? 'text-amber-400' : 'text-accent-forest')}>
                    ~{buildWattage}W / Recommend {Math.ceil(recommendedPSU / 50) * 50}W PSU
                  </span>
                </div>

                {/* Selected components */}
                <div className="space-y-2 border-t border-white/5 pt-4">
                  {STEPS.map((s) => (
                    <div key={s} className="flex justify-between items-center text-xs">
                      <span className="font-mono text-white/30 w-16">{STEP_LABELS[s]}</span>
                      <span className={clsx('flex-1 text-right truncate ml-2', currentBuild[s] ? 'text-white/70' : 'text-white/20')}>
                        {currentBuild[s]?.name || '— Not selected'}
                      </span>
                      {currentBuild[s] && (
                        <span className="ml-2 text-white/40 shrink-0">${currentBuild[s].price}</span>
                      )}
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Bottleneck alert */}
              {bottleneck && (
                <motion.div
                  className="glass border border-amber-500/30 rounded-12 p-4 flex gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-mono text-amber-400">BOTTLENECK DETECTED</p>
                    <p className="text-xs text-white/60 mt-1">{bottleneck.msg}</p>
                  </div>
                </motion.div>
              )}

              {/* Earned badges */}
              {earnedBadges.length > 0 && (
                <GlassCard animate={false} className="p-4 rounded-12">
                  <p className="text-xs font-mono text-white/30 mb-3">BADGES EARNED</p>
                  <div className="flex flex-wrap gap-2">
                    {badges.filter(b => earnedBadges.includes(b.id)).map((b) => (
                      <div key={b.id} className="flex items-center gap-1.5 glass border border-heat-100/20 rounded-8 px-3 py-1.5">
                        <b.icon className="w-4 h-4 text-heat-100" />
                        <span className="text-xs font-heading text-white/70">{b.label}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}

              {/* CTA buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!Object.values(currentBuild).every(Boolean)}
                  className={clsx(
                    'w-full btn-primary justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100',
                    !Object.values(currentBuild).every(Boolean) && 'opacity-40 cursor-not-allowed'
                  )}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Order This Build — ${buildPrice.toLocaleString()}
                </button>
                <button
                  onClick={() => setShowSaveModal(true)}
                  disabled={buildPrice === 0}
                  className="w-full btn-ghost justify-center text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100"
                >
                  <Save className="w-4 h-4" />
                  Save Build
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save modal */}
      <AnimatePresence>
        {showSaveModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowSaveModal(false)} />
            <motion.div
              className="relative glass border border-heat-100/30 rounded-16 p-8 w-full max-w-md shadow-glow-heat"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h3 className="font-display font-bold text-xl text-white mb-2">Save Your Build</h3>
              <p className="text-white/50 text-sm mb-6">Give your build a name to save it for later.</p>
              <input
                type="text"
                value={buildName}
                onChange={(e) => setBuildName(e.target.value)}
                placeholder="My Dream Rig..."
                className="input-base mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100"
              />
              <div className="flex gap-3">
                <button onClick={() => setShowSaveModal(false)} className="flex-1 btn-ghost justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100">Cancel</button>
                <button
                  onClick={() => { saveBuild(buildName || 'My Build'); setShowSaveModal(false) }}
                  className="flex-1 btn-primary justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
