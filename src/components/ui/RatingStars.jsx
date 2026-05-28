import { Star } from 'lucide-react'

export default function RatingStars({
  rating = 0,
  count = 5,
  size = 14,
  gap = 2,
  showValue = false,
  reviewCount,
  className = '',
}) {
  const value = Math.max(0, Math.min(count, Number(rating) || 0))
  const pct = (value / count) * 100
  const rowStyle = { gap }
  const iconStyle = { width: size, height: size }
  return (
    <span className={`inline-flex items-center gap-6 ${className}`} aria-label={`Rated ${value.toFixed(1)} out of ${count} stars`}>
      <span className="relative inline-block leading-none" aria-hidden="true">
        {/* Empty layer — defines width */}
        <span className="flex" style={rowStyle}>
          {Array.from({ length: count }).map((_, i) => (
            <Star
              key={`e-${i}`}
              className="text-line-strong"
              strokeWidth={1.5}
              style={iconStyle}
            />
          ))}
        </span>
        {/* Filled layer — clipped overlay */}
        <span
          className="pointer-events-none absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${pct}%` }}
        >
          <span className="absolute inset-y-0 left-0 flex" style={rowStyle}>
            {Array.from({ length: count }).map((_, i) => (
              <Star
                key={`f-${i}`}
                className="fill-accent-heat text-accent-heat"
                strokeWidth={1.5}
                style={iconStyle}
              />
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
