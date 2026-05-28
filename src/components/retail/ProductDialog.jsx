import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X, Heart, ShoppingBag, Truck, ShieldCheck, CreditCard, Check } from 'lucide-react'
import clsx from 'clsx'
import useStore from '@/store/useStore'
import { formatINR } from '@/utils/currency'
import { GBadge, StockBar, PulseDot, HudMeter } from '@/components/ui/Hud'
import RatingStars from '@/components/ui/RatingStars'

const easeOut = [0.23, 1, 0.32, 1]

export default function ProductDialog({ product, open, onClose }) {
  const reduceMotion = useReducedMotion()
  const { addToCart, toggleWishlist, isWishlisted } = useStore()
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => closeRef.current?.focus())
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!product) return null
  const mrp = product.mrp || product.originalPrice
  const discount = product.discount_pct || (mrp ? Math.max(0, Math.round(((mrp - product.price) / mrp) * 100)) : 0)
  const wishlisted = isWishlisted(product.id)
  const rating = Number(product.rating) || 4.7
  const reviewCount = product.review_count || product.reviews || 128
  const stock = Number.isFinite(product.stock) ? product.stock : null
  const stockTotal = product.stock_capacity || 100
  const score = product.score || Math.round((rating / 5) * 100)
  const specs = product.specs || product.spec || extractSpecs(product)
  const highlights = product.highlights || defaultHighlights(product)

  const handleAdd = () => {
    addToCart(product)
    onClose()
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] grid place-items-center px-12 py-12 sm:px-24 sm:py-24">
          <motion.button
            type="button"
            aria-label="Close product details"
            onClick={onClose}
            className="absolute inset-0 bg-ink/55 backdrop-blur-[6px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.24 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-dialog-title"
            className="relative grid w-full max-w-[1080px] overflow-hidden border border-border-muted bg-canvas shadow-[0_24px_60px_-12px_rgba(20,20,20,0.45)] md:grid-cols-[1.05fr_1fr]"
            style={{ height: 'min(92vh, 820px)' }}
            initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.4, ease: easeOut }}
          >
            {/* Image side */}
            <div className="relative h-[220px] min-h-0 overflow-hidden bg-ink text-canvas md:h-full">
              <div className="poster-grain absolute inset-0" aria-hidden="true" />
              <div className="heat-orb absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)', opacity: 0.55 }} aria-hidden="true" />
              <div className="absolute left-16 top-16 z-10 flex flex-col items-start gap-6">
                {discount > 0 && <GBadge tone="heat">−{discount}%</GBadge>}
                {product.bestseller && <GBadge tone="canvas">Bestseller</GBadge>}
                {product.is_new && <GBadge tone="canvas">New</GBadge>}
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="absolute right-16 top-16 z-10 grid h-36 w-36 place-items-center border border-canvas/30 bg-ink/40 text-canvas backdrop-blur-sm transition hover:border-canvas hover:bg-canvas/15"
                aria-label="Close"
              >
                <X className="h-16 w-16" aria-hidden="true" />
              </button>
              <div className="relative grid h-full place-items-center p-24 md:p-40">
                {product.image && (
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="max-h-[280px] w-[78%] object-contain drop-shadow-[0_24px_28px_rgba(0,0,0,.55)]"
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.85, rotate: -4 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.7, ease: easeOut, delay: 0.15 }}
                    whileHover={reduceMotion ? undefined : { scale: 1.04, transition: { duration: 0.4 } }}
                  />
                )}
              </div>
              <div className="absolute bottom-16 left-16 right-16 z-10 flex items-center justify-between border border-canvas/20 bg-ink/70 px-14 py-10 backdrop-blur-sm">
                <PulseDot tone={stock === null || stock > 0 ? 'success' : 'heat'} label={stock === null || stock > 0 ? 'In stock · ships in 24h' : 'Pre-order'} />
                <span className="hud-label text-canvas/60">SKU {product.id || product.sku || '—'}</span>
              </div>
            </div>

            {/* Detail side */}
            <div className="flex h-full min-h-0 flex-col overflow-y-auto bg-surface-1">
              <motion.div
                className="border-b border-border-muted px-24 py-20"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: easeOut, delay: 0.12 }}
              >
                <p className="meta">{product.brand || product.category || 'Component'}</p>
                <h2 id="product-dialog-title" className="mt-8 text-title-h3 font-semibold leading-[1.1] tracking-[-.02em]">
                  {product.name}
                </h2>
                <div className="mt-12 flex flex-wrap items-center gap-x-16 gap-y-6 text-label-x-small text-ink-soft">
                  <RatingStars rating={rating} size={14} showValue reviewCount={`${reviewCount} reviews`} />
                  {product.warranty && <span>· {product.warranty} warranty</span>}
                </div>
              </motion.div>

              <motion.div
                className="border-b border-border-muted px-24 py-20"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: easeOut, delay: 0.2 }}
              >
                <div className="flex items-end justify-between gap-16">
                  <div>
                    <p className="price text-display-large font-semibold leading-none tracking-[-.025em]" style={{ fontSize: 'clamp(36px, 6vw, 48px)' }}>
                      {formatINR(product.price)}
                    </p>
                    {mrp && (
                      <div className="mt-8 flex items-center gap-10">
                        <p className="price text-body-medium text-ink-muted line-through">{formatINR(mrp)}</p>
                        {discount > 0 && <span className="hud-label text-accent-heat">You save {formatINR(mrp - product.price)}</span>}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="hud-label">EMI from</p>
                    <p className="price text-body-large font-semibold">{formatINR(Math.round(product.price / 12))}<span className="hud-label ml-2 font-normal text-ink-muted">/mo</span></p>
                  </div>
                </div>
                <div className="mt-16">
                  {stock !== null ? (
                    <StockBar remaining={stock} total={stockTotal} />
                  ) : (
                    <HudMeter value={score} max={100} label="Performance score" tone="heat" />
                  )}
                </div>
              </motion.div>

              {highlights.length > 0 && (
                <motion.div
                  className="border-b border-border-muted px-24 py-20"
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: easeOut, delay: 0.28 }}
                >
                  <p className="meta mb-12">Highlights</p>
                  <ul className="grid gap-8">
                    {highlights.map((h, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-10 text-body-small text-ink-soft"
                        initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, ease: easeOut, delay: 0.32 + i * 0.05 }}
                      >
                        <Check className="mt-2 h-12 w-12 shrink-0 text-accent-heat" aria-hidden="true" />
                        <span>{h}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {specs.length > 0 && (
                <motion.div
                  className="border-b border-border-muted px-24 py-20"
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: easeOut, delay: 0.36 }}
                >
                  <p className="meta mb-12">Specifications</p>
                  <dl className="grid grid-cols-1 gap-px overflow-hidden border border-border-muted bg-line sm:grid-cols-2">
                    {specs.map((s, i) => (
                      <div key={i} className="flex justify-between gap-12 bg-surface-1 px-12 py-10 text-label-x-small">
                        <dt className="meta">{s.key}</dt>
                        <dd className="truncate font-medium text-ink">{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                </motion.div>
              )}

              <motion.div
                className="grid grid-cols-3 gap-px border-b border-border-muted bg-line"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.42 }}
              >
                {[
                  { Icon: Truck, label: 'Free shipping', sub: 'Pan-India' },
                  { Icon: ShieldCheck, label: 'Warranty', sub: product.warranty || '3 years' },
                  { Icon: CreditCard, label: 'No-cost EMI', sub: '6 / 9 / 12 mo' },
                ].map(({ Icon, label, sub }) => (
                  <div key={label} className="flex items-start gap-10 bg-surface-1 px-14 py-12">
                    <Icon className="mt-2 h-16 w-16 shrink-0 text-accent-heat" aria-hidden="true" />
                    <div>
                      <p className="text-body-small font-semibold leading-tight">{label}</p>
                      <p className="hud-label text-ink-muted">{sub}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                className="sticky bottom-0 flex gap-10 border-t border-border-muted bg-canvas px-24 py-16"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: easeOut, delay: 0.48 }}
              >
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className="grid h-44 w-44 shrink-0 place-items-center border border-line-strong text-ink-soft transition hover:border-accent-heat hover:text-accent-heat"
                  aria-pressed={wishlisted}
                  aria-label={`${wishlisted ? 'Remove from' : 'Add to'} wishlist`}
                >
                  <Heart className={clsx('h-16 w-16', wishlisted && 'fill-accent-heat text-accent-heat')} aria-hidden="true" />
                </button>
                <motion.button
                  type="button"
                  onClick={handleAdd}
                  className="btn-primary magnetic flex-1"
                  data-tone="heat"
                  whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                >
                  <ShoppingBag className="h-16 w-16" aria-hidden="true" /> Add to cart
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}

function extractSpecs(product) {
  const out = []
  const push = (key, value) => {
    if (value === undefined || value === null || value === '') return
    out.push({ key, value: String(value) })
  }
  push('Brand', product.brand)
  push('Category', product.category)
  push('Sub-category', product.sub_category)
  push('Socket', product.socket)
  push('Chipset', product.chipset)
  push('Memory', product.memory || product.ram)
  push('Capacity', product.capacity)
  push('Wattage', product.wattage && `${product.wattage}W`)
  push('Form factor', product.form_factor)
  push('Color', product.color)
  push('Interface', product.interface)
  push('Speed', product.speed)
  push('Cores', product.cores)
  push('Threads', product.threads)
  push('TDP', product.tdp && `${product.tdp}W`)
  return out.slice(0, 10)
}

function defaultHighlights(product) {
  if (Array.isArray(product.features) && product.features.length) return product.features.slice(0, 5)
  const out = []
  if (product.brand) out.push(`Genuine ${product.brand} factory unit`)
  if (product.warranty) out.push(`${product.warranty} manufacturer warranty`)
  out.push('Bench-tested before dispatch')
  out.push('Tracked shipping with insurance')
  if (product.in_stock !== false) out.push('Available for same-day dispatch')
  return out
}
