import { motion, useReducedMotion } from 'framer-motion'

const easeOut = [0.23, 1, 0.32, 1]

export default function PageHeader({ kicker, title, description, children }) {
  const reduceMotion = useReducedMotion()
  const fadeUp = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: easeOut, delay },
  })

  return (
    <section className="relative overflow-hidden border-b border-border-muted">
      {/* Ambient gradient sweep */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-1/4 top-0 h-full w-1/2"
        style={{
          background: 'radial-gradient(ellipse at left, rgba(250,93,25,0.10), transparent 60%)',
        }}
        initial={reduceMotion ? false : { opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: easeOut }}
      />
      <div className="container-max relative py-40 md:py-56 lg:py-72">
        <div className="grid gap-24 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-[820px]">
            {kicker && (
              <motion.p className="chapter mb-20" {...fadeUp(0)}>
                {kicker}
              </motion.p>
            )}
            <motion.h1
              className="text-title-h3 font-semibold leading-[1.02] tracking-[-.025em] md:text-title-h2 lg:text-title-h1"
              {...fadeUp(0.08)}
            >
              {title}
            </motion.h1>
            {description && (
              <motion.p
                className="mt-20 max-w-[560px] text-body-large font-normal leading-[1.5] text-ink-soft"
                {...fadeUp(0.16)}
              >
                {description}
              </motion.p>
            )}
          </div>
          {children && (
            <motion.div className="shrink-0" {...fadeUp(0.24)}>
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
