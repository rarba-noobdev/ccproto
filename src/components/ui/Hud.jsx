import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Trophy, Zap, ArrowUpRight } from 'lucide-react'

const easeOut = [0.23, 1, 0.32, 1]

export function HudMeter({ value = 0, max = 100, label, sublabel, tone = 'heat', showValue = true, suffix = '' }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className="flex w-full flex-col gap-6">
      {(label || showValue) && (
        <div className="flex items-baseline justify-between gap-8">
          {label && <span className="hud-label">{label}</span>}
          {showValue && (
            <span className="price text-body-medium font-semibold tabular-nums">
              {value}{suffix}
              {max && max !== 100 && <span className="ml-2 text-label-x-small font-normal text-ink-muted">/ {max}{suffix}</span>}
            </span>
          )}
        </div>
      )}
      <div className="hud-meter" data-tone={tone} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label={label}>
        <div className="hud-meter__fill" style={{ width: `${pct}%` }} />
      </div>
      {sublabel && <span className="hud-label text-ink-muted">{sublabel}</span>}
    </div>
  )
}

function tierFromScore(score) {
  if (!score) return { tier: '—', pct: 0, color: 'var(--ink-muted)' }
  if (score >= 90) return { tier: 'S', pct: 100, color: 'var(--accent-heat)' }
  if (score >= 80) return { tier: 'A', pct: 88, color: 'var(--accent-heat)' }
  if (score >= 70) return { tier: 'B', pct: 72, color: 'var(--ink)' }
  if (score >= 60) return { tier: 'C', pct: 56, color: 'var(--ink)' }
  return { tier: 'D', pct: 38, color: 'var(--ink-muted)' }
}

export function LevelBadge({ score = 0, size = 56 }) {
  const { tier, pct, color } = tierFromScore(score)
  const display = useAnimatedNumber(pct)
  return (
    <div className="flex items-center gap-12">
      <div
        className="tier-ring"
        style={{
          '--tier-pct': display,
          '--tier-color': color,
          width: size,
          height: size,
        }}
      >
        <span className="tier-ring__inner" style={{ fontSize: size * 0.32 }}>{tier}</span>
      </div>
      <div>
        <p className="hud-label">Tier</p>
        <p className="text-body-medium font-semibold leading-tight">Class {tier}</p>
        <p className="hud-label text-ink-muted">{score || 0}/100 score</p>
      </div>
    </div>
  )
}

export function PulseDot({ tone = 'success', label }) {
  return (
    <span className="inline-flex items-center gap-8">
      <span className="pulse-dot" data-tone={tone} aria-hidden="true" />
      {label && <span className="hud-label">{label}</span>}
    </span>
  )
}

export function GBadge({ tone = 'ink', children, icon: Icon }) {
  return (
    <span className="gbadge" data-tone={tone}>
      {Icon && <Icon className="h-10 w-10" aria-hidden="true" />}
      {children}
    </span>
  )
}

export function StockBar({ remaining = 0, total = 100 }) {
  const pct = Math.max(0, Math.min(100, (remaining / total) * 100))
  const level = pct < 25 ? 'low' : pct < 60 ? 'mid' : 'high'
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="hud-label">Stock</span>
        <span className="hud-label" style={{ color: level === 'low' ? 'var(--accent-heat)' : 'var(--ink-soft)' }}>
          {level === 'low' ? `Only ${remaining} left` : `${remaining} available`}
        </span>
      </div>
      <div className="stock-bar" data-level={level}>
        <div className="stock-bar__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export function AchievementToast({ show, title, sub, onClose, duration = 2400 }) {
  const reduceMotion = useReducedMotion()
  useEffect(() => {
    if (!show) return
    const id = setTimeout(() => onClose?.(), duration)
    return () => clearTimeout(id)
  }, [show, duration, onClose])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: 0.32, ease: easeOut }}
          className="achievement pointer-events-auto"
          role="status"
          aria-live="polite"
        >
          <span className="grid h-32 w-32 shrink-0 place-items-center bg-accent-heat text-canvas">
            <Trophy className="h-16 w-16" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="hud-label text-canvas/60">Achievement unlocked</p>
            <p className="text-body-medium font-semibold leading-tight">{title}</p>
            {sub && <p className="hud-label text-canvas/60">{sub}</p>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function AnimatedNumber({ value = 0, duration = 800, suffix = '', prefix = '' }) {
  const display = useAnimatedNumber(value, duration)
  return <span className="tabular-nums">{prefix}{display}{suffix}</span>
}

export function useAnimatedNumber(target = 0, duration = 700) {
  const [val, setVal] = useState(target)
  const fromRef = useRef(target)
  const rafRef = useRef(0)
  useEffect(() => {
    const from = fromRef.current
    const to = target
    if (from === to) return
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      const next = Math.round(from + (to - from) * eased)
      setVal(next)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        fromRef.current = to
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration])
  return val
}

export function HudTicker({ items = [] }) {
  if (!items.length) return null
  const doubled = [...items, ...items]
  return (
    <div className="ticker border-y border-border-muted bg-ink py-8 text-canvas">
      <div className="ticker__track hud-label" style={{ color: 'rgba(246,244,238,.7)' }}>
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-8">
            <Zap className="h-10 w-10 text-accent-heat" aria-hidden="true" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export function PerkChip({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-10 border border-border-muted bg-surface-1 px-12 py-8 transition hover:border-accent-heat">
      {Icon && (
        <span className="grid h-28 w-28 place-items-center bg-canvas-soft text-accent-heat">
          <Icon className="h-14 w-14" aria-hidden="true" />
        </span>
      )}
      <div className="min-w-0">
        <p className="hud-label text-ink-muted">{label}</p>
        <p className="text-body-small font-semibold leading-tight">{value}</p>
      </div>
    </div>
  )
}

export function ArrowChip({ children, to }) {
  return (
    <span className="inline-flex items-center gap-6 text-label-x-small font-semibold uppercase tracking-[0.1em]">
      {children} <ArrowUpRight className="h-12 w-12" aria-hidden="true" />
    </span>
  )
}
