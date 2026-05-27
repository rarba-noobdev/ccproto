import { motion } from 'framer-motion'
import clsx from 'clsx'

export default function GlassCard({
  children,
  className = '',
  glow = 'heat',
  hover = true,
  onClick,
  animate = true,
  delay = 0,
}) {
  const glowColors = {
    heat: 'hover:shadow-glow-heat hover:border-heat-100/40',
    amethyst: 'hover:shadow-glow-purple hover:border-accent-amethyst/40',
    bluetron: 'hover:shadow-[0_0_30px_rgba(42,109,251,0.30)] hover:border-accent-bluetron/40',
    cyan: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.30)] hover:border-neon-cyan/40',
    pink: 'hover:shadow-[0_0_30px_rgba(236,72,153,0.30)] hover:border-neon-pink/40',
    none: '',
  }

  const Tag = animate ? motion.div : 'div'
  const animProps = animate
    ? {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-50px' },
        transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
        ...(hover ? { whileHover: { y: -4, scale: 1.01 } } : {}),
      }
    : {}

  return (
    <Tag
      {...animProps}
      onClick={onClick}
      className={clsx(
        'glass rounded-8 border border-border-muted transition-all duration-300 card-shine',
        hover && glowColors[glow],
        onClick && 'cursor-pointer',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
