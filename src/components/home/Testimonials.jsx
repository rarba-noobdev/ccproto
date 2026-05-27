import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote, BadgeCheck } from 'lucide-react'
import { testimonials } from '@/data/products'
import clsx from 'clsx'

const colorMap = {
  'neon-purple': 'bg-heat-100',
  'neon-pink': 'bg-accent-crimson',
  'neon-blue': 'bg-accent-bluetron',
  'neon-cyan': 'bg-accent-amethyst',
  'neon-green': 'bg-accent-forest',
}
const borderMap = {
  'neon-purple': 'border-heat-100/40',
  'neon-pink': 'border-accent-crimson/40',
  'neon-blue': 'border-accent-bluetron/40',
  'neon-cyan': 'border-accent-amethyst/40',
  'neon-green': 'border-accent-forest/40',
}

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(1)

  const go = (next) => {
    setDir(next > active ? 1 : -1)
    setActive(next)
  }

  const current = testimonials[active]

  return (
    <section className="section-padding overflow-hidden">
      <div className="container-max">
        <div className="text-center mb-14 space-y-4">
          <motion.div className="section-label mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Star className="w-3 h-3 fill-current" />
            TESTIMONIALS
          </motion.div>

          <motion.h2
            className="font-display text-4xl sm:text-title-h3 font-black text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            GAMERS{' '}
            <span className="gradient-text">DON'T LIE</span>
          </motion.h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main testimonial */}
          <div className="relative glass rounded-2xl border border-border-muted p-10 md:p-14 min-h-[320px] flex flex-col justify-between overflow-hidden">
            {/* Decorative quote */}
            <Quote className="absolute top-6 right-8 w-20 h-20 text-heat-100/5" />

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={active}
                custom={dir}
                variants={{
                  enter: (d) => ({ x: d * 60, opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (d) => ({ x: d * -60, opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent-honey text-accent-honey" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-white/80 text-lg md:text-xl leading-relaxed font-body">
                  "{current.text}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className={clsx(
                      'w-12 h-12 rounded-xl flex items-center justify-center text-white font-display font-bold',
                      colorMap[current.color] || 'bg-heat-100'
                    )}>
                      {current.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-white">{current.name}</span>
                        {current.verified && <BadgeCheck className="w-4 h-4 text-accent-bluetron" />}
                      </div>
                      <p className="text-white/40 text-sm">{current.role}</p>
                    </div>
                  </div>

                  <div className={clsx(
                    'glass border rounded-lg px-4 py-2',
                    borderMap[current.color]
                  )}>
                    <p className="text-xs text-white/40 font-mono">BUILD</p>
                    <p className="font-display font-bold text-sm text-white">{current.build}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() => go((active - 1 + testimonials.length) % testimonials.length)}
              className="p-3 glass border border-border-muted rounded-xl text-white/50 hover:text-white hover:border-heat-100/40 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 rounded-8"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={clsx(
                    'rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100',
                    i === active
                      ? 'w-8 h-2 bg-heat-100'
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  )}
                />
              ))}
            </div>

            <button
              onClick={() => go((active + 1) % testimonials.length)}
              className="p-3 glass border border-border-muted rounded-xl text-white/50 hover:text-white hover:border-heat-100/40 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 rounded-8"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* All avatars row */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => go(i)}
                className={clsx(
                  'w-9 h-9 rounded-full flex items-center justify-center text-xs font-display font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100',
                  colorMap[t.color] || 'bg-heat-100',
                  i === active ? 'scale-125 ring-2 ring-white/30 ring-offset-2 ring-offset-void' : 'opacity-40 hover:opacity-70 scale-100'
                )}
              >
                {t.initials}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
