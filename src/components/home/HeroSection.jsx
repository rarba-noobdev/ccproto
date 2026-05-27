import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ChevronRight, Play, Cpu, HardDrive, Zap, Star } from 'lucide-react'
import ParticleBackground from '@/components/ui/ParticleBackground'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

const stats = [
  { label: 'PCs Built', value: 47000, suffix: '+', color: 'text-heat-100' },
  { label: 'FPS Delivered', value: 99, suffix: 'B+', color: 'text-accent-bluetron' },
  { label: 'Reviews', value: 4.9, suffix: ' /5', prefix: '', color: 'text-accent-honey' },
  { label: 'Years Experience', value: 8, suffix: '+', color: 'text-accent-amethyst' },
]

const floatingSpecs = [
  { icon: Cpu, label: 'RTX 4090', value: '4K Ultra', color: 'from-heat-100/20 to-heat-100/5', border: 'border-heat-100/20', pos: '-top-4 -left-8 rotate-[-6deg]' },
  { icon: HardDrive, label: 'DDR5 RAM', value: '64GB 6000MHz', color: 'from-accent-bluetron/20 to-accent-bluetron/5', border: 'border-accent-bluetron/20', pos: '-bottom-6 -right-6 rotate-[4deg]' },
  { icon: Zap, label: 'FPS', value: '400+ Frames', color: 'from-accent-amethyst/20 to-accent-amethyst/5', border: 'border-accent-amethyst/20', pos: 'top-1/2 -right-10 rotate-[6deg]' },
]

export default function HeroSection() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const pcRef = useRef(null)

  useEffect(() => {
    if (!titleRef.current) return
    const chars = titleRef.current.querySelectorAll('.char')
    gsap.fromTo(chars,
      { y: 80, opacity: 0, rotateX: -40 },
      {
        y: 0, opacity: 1, rotateX: 0,
        stagger: 0.04,
        duration: 0.8,
        ease: 'back.out(1.5)',
        delay: 0.3,
      }
    )
  }, [])

  useEffect(() => {
    if (!pcRef.current) return
    gsap.to(pcRef.current, {
      y: -18,
      duration: 3.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })
    gsap.to(pcRef.current, {
      rotateY: 8,
      rotateX: -3,
      duration: 6,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 0.5,
    })
  }, [])

  const titleWords = ['BUILD', 'YOUR', 'DREAM', 'GAMING PC']

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-24"
    >
      {/* Deep background */}
      <div className="absolute inset-0 bg-void" />

      {/* Mesh gradient */}
      <div className="absolute inset-0 bg-hero-glow" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(250,93,25,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(250,93,25,1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Particles */}
      <ParticleBackground count={50} className="opacity-60" />

      {/* Spotlight glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-heat-100/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-accent-bluetron/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-max relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              className="section-label"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Star className="w-3 h-3 fill-current" />
              #1 Custom PC Builder in the US
            </motion.div>

            {/* Main headline */}
            <div ref={titleRef} className="perspective-1000">
              {titleWords.map((word, wi) => (
                <div key={wi} className="overflow-hidden">
                  <div className="flex flex-wrap gap-x-4">
                    {word.split('').map((char, ci) => (
                      <span
                        key={ci}
                        className={`char inline-block font-display font-black leading-none tracking-tight opacity-0
                          ${wi < 2 ? 'text-white text-6xl sm:text-7xl lg:text-8xl' : ''}
                          ${wi === 2 ? 'gradient-text text-6xl sm:text-7xl lg:text-8xl' : ''}
                          ${wi === 3 ? 'text-white text-5xl sm:text-6xl lg:text-7xl' : ''}
                        `}
                      >
                        {char === ' ' ? ' ' : char}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Subheadline */}
            <motion.p
              className="text-white/60 text-lg font-body leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              Handcrafted gaming rigs built with precision, tested to perfection, and delivered
              with a lifetime of support. Every component chosen to maximize your performance.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              <Link to="/build" className="btn-primary text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 rounded-6">
                <Zap className="w-4 h-4" />
                Start Building
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link to="/prebuilt" className="btn-ghost text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 rounded-6">
                <Play className="w-4 h-4" />
                Explore Prebuilt PCs
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              className="grid grid-cols-4 gap-4 pt-4 border-t border-white/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
            >
              {stats.map(({ label, value, suffix, prefix, color }) => (
                <div key={label} className="text-center">
                  <div className={`font-display font-black text-2xl ${color}`}>
                    <AnimatedCounter end={value} suffix={suffix} prefix={prefix} duration={2500} />
                  </div>
                  <div className="text-white/40 text-xs font-body mt-0.5 whitespace-nowrap">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — PC Showcase */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Main PC visual */}
            <div ref={pcRef} className="relative w-full max-w-md" style={{ transformStyle: 'preserve-3d' }}>
              {/* PC Tower */}
              <div className="relative mx-auto w-64">
                {/* Case body */}
                <div className="relative bg-gradient-to-b from-void-300 to-void-100 rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
                  style={{ height: '380px' }}>

                  {/* RGB strip top */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-heat-100 via-accent-amethyst to-accent-bluetron animate-rgb-border" style={{ backgroundSize: '200% 100%' }} />

                  {/* Tempered glass panel */}
                  <div className="absolute inset-2 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 overflow-hidden">
                    {/* GPU glow */}
                    <div className="absolute bottom-8 inset-x-4 h-16 bg-gradient-to-r from-heat-100/30 via-accent-amethyst/30 to-accent-bluetron/30 rounded-lg blur-md animate-pulse-glow" />

                    {/* Component lines */}
                    {[20, 45, 65, 78].map((top) => (
                      <div key={top} className="absolute inset-x-4 h-px bg-white/5" style={{ top: `${top}%` }} />
                    ))}

                    {/* RGB fans */}
                    {[
                      { top: '12%', left: '50%', size: 48, delay: 0 },
                      { top: '38%', left: '50%', size: 48, delay: 0.3 },
                      { top: '62%', left: '50%', size: 48, delay: 0.6 },
                    ].map(({ top, left, size, delay }, i) => (
                      <div
                        key={i}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ top, left, width: size, height: size }}
                      >
                        <div className="w-full h-full rounded-full border-2 border-heat-100/20 flex items-center justify-center animate-spin-slow" style={{ animationDelay: `${delay}s` }}>
                          <div className="w-2/3 h-2/3 rounded-full border border-accent-bluetron/20 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-heat-100/60" />
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* GPU body */}
                    <div className="absolute bottom-4 inset-x-3 h-14 bg-gradient-to-r from-void-400 to-void-300 rounded-lg border border-white/10 flex items-center px-3 gap-2">
                      <div className="flex-1 h-6 bg-gradient-to-r from-heat-100/20 to-accent-amethyst/20 rounded border border-white/10" />
                      <div className="flex gap-1">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="w-1 h-6 rounded-sm bg-white/10" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Front I/O */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                    {['bg-heat-100', 'bg-white/30', 'bg-white/20'].map((c, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full ${c} ${i === 0 ? 'animate-pulse' : ''}`} />
                    ))}
                  </div>
                </div>

                {/* RGB glow beneath */}
                <div className="absolute -bottom-4 inset-x-8 h-8 bg-gradient-to-r from-heat-100/40 via-accent-amethyst/40 to-accent-bluetron/40 rounded-full blur-xl animate-pulse-glow" />
              </div>

              {/* Floating spec cards */}
              {floatingSpecs.map(({ icon: Icon, label, value, color, border, pos }, i) => (
                <motion.div
                  key={i}
                  className={`absolute glass ${border} bg-gradient-to-br ${color} rounded-8 px-3 py-2 ${pos}`}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-heat-100" />
                    <div>
                      <div className="text-[10px] text-white/50 font-mono">{label}</div>
                      <div className="text-xs font-heading font-semibold text-white">{value}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Background glow rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-80 h-80 rounded-full border border-heat-100/10 animate-spin-slow" />
              <div className="absolute w-64 h-64 rounded-full border border-accent-bluetron/8 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '12s' }} />
              <div className="absolute w-96 h-96 rounded-full border border-accent-amethyst/5" />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="font-mono text-[10px] tracking-widest text-white/30">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-heat-100/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
