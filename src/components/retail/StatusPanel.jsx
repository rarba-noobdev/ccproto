import { motion, useReducedMotion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'

const easeOut = [0.23, 1, 0.32, 1]

export function ErrorBanner({ message, className = '' }) {
  if (!message) return null
  return (
    <motion.div
      role="alert"
      className={`alert-error ${className}`}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: easeOut }}
    >
      <AlertCircle className="mt-2 h-16 w-16 shrink-0 text-accent-heat" aria-hidden="true" />
      <span>{message}</span>
    </motion.div>
  )
}

export function EmptyPanel({ icon: Icon, title, copy, children }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className="border border-border-muted bg-surface-1 px-32 py-48 text-center"
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeOut }}
    >
      <div className="mx-auto max-w-[420px]">
        {Icon && (
          <motion.div
            className="mx-auto mb-16 grid h-44 w-44 place-items-center border border-border-muted"
            animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
            transition={{ duration: 2.6, ease: 'easeInOut', repeat: Infinity }}
          >
            <Icon className="h-18 w-18 text-ink-muted" aria-hidden="true" />
          </motion.div>
        )}
        <p className="text-title-h5 font-semibold tracking-[-.02em]">{title}</p>
        {copy && <p className="mt-8 text-body-medium text-ink-soft">{copy}</p>}
        {children && <div className="mt-20 flex justify-center">{children}</div>}
      </div>
    </motion.div>
  )
}

export function SkeletonGrid({ count = 8, Card, className = 'grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' }) {
  const reduceMotion = useReducedMotion()
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: reduceMotion ? 0 : i * 0.05 }}
        >
          <Card />
        </motion.div>
      ))}
    </div>
  )
}
