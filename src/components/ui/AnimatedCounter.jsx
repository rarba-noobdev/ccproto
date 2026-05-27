import { useEffect, useState, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

export default function AnimatedCounter({ end, suffix = '', prefix = '', duration = 2000, className = '' }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 })
  const startedRef = useRef(false)

  useEffect(() => {
    if (!inView || startedRef.current) return
    startedRef.current = true

    const startTime = performance.now()
    const update = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * end))
      if (progress < 1) requestAnimationFrame(update)
    }
    requestAnimationFrame(update)
  }, [inView, end, duration])

  const display = count >= 1000 ? `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}K` : count

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  )
}
