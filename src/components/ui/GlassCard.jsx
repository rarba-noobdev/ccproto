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
    heat: 'hover:bg-void-200',
    amethyst: 'hover:bg-void-200',
    bluetron: 'hover:bg-void-200',
    cyan: 'hover:bg-void-200',
    pink: 'hover:bg-void-200',
    none: '',
  }

  const Tag = onClick ? (animate ? motion.button : 'button') : (animate ? motion.div : 'div')
  const animProps = animate
    ? {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-50px' },
        transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
        ...(hover ? { whileHover: { y: -2 } } : {}),
      }
    : {}

  return (
    <Tag
      {...animProps}
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={clsx(
        'glass rounded-[20px] border border-border-muted transition-[transform,background,border-color,box-shadow] duration-300',
        hover && glowColors[glow],
        onClick && 'cursor-pointer text-left',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
