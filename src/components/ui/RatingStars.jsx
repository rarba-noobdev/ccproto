import { Star } from 'lucide-react'

export default function RatingStars({
  rating = 0,
  count = 5,
  size = 14,
  showValue = false,
  reviewCount,
  className = '',
}) {
  const value = Math.max(0, Math.min(count, Number(rating) || 0))
  const pct = (value / count) * 100
  return (
    <span className={`inline-flex items-center gap-6 ${className}`} aria-label={`Rated ${value.toFixed(1)} out of ${count} stars`}>
      <span className="relative inline-flex" aria-hidden="true">
        {/* Empty layer */}
        <span className="flex">
          {Array.from({ length: count }).map((_, i) => (
            <Star key={`e-${i}`} className="text-line-strong" style={{ width: size, height: size }} />
          ))}
        </span>
        {/* Filled clip */}
        <span
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${pct}%` }}
        >
          <span className="flex">
            {Array.from({ length: count }).map((_, i) => (
              <Star key={`f-${i}`} className="fill-accent-heat text-accent-heat" style={{ width: size, height: size }} />
            ))}
          </span>
        </span>
      </span>
      {showValue && (
        <span className="text-label-x-small font-medium tabular-nums text-ink">
          {value.toFixed(1)}
          {reviewCount != null && <span className="ml-4 text-ink-muted">· {reviewCount}</span>}
        </span>
      )}
    </span>
  )
}
