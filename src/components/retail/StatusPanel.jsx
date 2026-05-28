import { AlertCircle } from 'lucide-react'

export function ErrorBanner({ message, className = '' }) {
  if (!message) return null
  return (
    <div role="alert" className={`alert-error ${className}`}>
      <AlertCircle className="mt-2 h-16 w-16 shrink-0 text-accent-heat" aria-hidden="true" />
      <span>{message}</span>
    </div>
  )
}

export function EmptyPanel({ icon: Icon, title, copy, children }) {
  return (
    <div className="border border-border-muted bg-surface-1 px-32 py-48 text-center">
      <div className="mx-auto max-w-[420px]">
        {Icon && (
          <div className="mx-auto mb-16 grid h-44 w-44 place-items-center border border-border-muted">
            <Icon className="h-18 w-18 text-ink-muted" aria-hidden="true" />
          </div>
        )}
        <p className="text-title-h5 font-semibold tracking-[-.02em]">{title}</p>
        {copy && <p className="mt-8 text-body-medium text-ink-soft">{copy}</p>}
        {children && <div className="mt-20 flex justify-center">{children}</div>}
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 8, Card, className = 'grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' }) {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => <Card key={i} />)}
    </div>
  )
}
