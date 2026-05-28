import { useState } from 'react'
import { Heart, Plus, Star, ImageOff, Flame, Sparkles } from 'lucide-react'
import clsx from 'clsx'
import useStore from '@/store/useStore'
import { formatINR } from '@/utils/currency'
import { GBadge, StockBar, PulseDot } from '@/components/ui/Hud'

function formatRating(rating) {
  const n = Number(rating)
  if (!Number.isFinite(n)) return null
  return n.toFixed(1)
}

export function ProductCard({ product, compact = false }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore()
  const [imgError, setImgError] = useState(false)
  const mrp = product.mrp || product.originalPrice
  const discount = product.discount_pct || (mrp ? Math.max(0, Math.round(((mrp - product.price) / mrp) * 100)) : 0)
  const wishlisted = isWishlisted(product.id)
  const rating = formatRating(product.rating)
  const label = product.brand || product.category || 'Part'
  const isNew = product.is_new || product.new
  const isHot = (product.sold_count || 0) > 200 || product.bestseller
  const stock = Number.isFinite(product.stock) ? product.stock : null
  const stockTotal = product.stock_capacity || 100

  return (
    <article className="group glow-on-hover relative flex min-w-0 flex-col border border-transparent bg-surface-1 transition duration-200 hover:bg-canvas motion-reduce:transition-none">
      <div className={clsx('product-image-box relative overflow-hidden', compact ? 'h-176' : 'h-208')}>
        <div className="absolute left-12 top-12 z-10 flex flex-col items-start gap-6">
          {discount > 0 && <GBadge tone="heat">−{discount}%</GBadge>}
          {isNew && <GBadge tone="canvas" icon={Sparkles}>New</GBadge>}
          {isHot && <GBadge tone="ink" icon={Flame}>Hot</GBadge>}
        </div>
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          className="absolute bottom-12 right-12 z-10 grid h-32 w-32 place-items-center border border-line-strong bg-surface-1 text-ink-soft transition hover:border-ink hover:text-ink"
          aria-pressed={wishlisted}
          aria-label={`${wishlisted ? 'Remove from' : 'Add to'} wishlist`}
        >
          <Heart className={clsx('h-12 w-12', wishlisted && 'fill-ink text-ink')} aria-hidden="true" />
        </button>
        {imgError || !product.image ? (
          <div className="grid h-full w-full place-items-center bg-surface-2 text-ink-muted">
            <ImageOff className="h-24 w-24" aria-hidden="true" />
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            width="320"
            height="240"
            onError={() => setImgError(true)}
            className="relative h-full w-full object-contain p-20 transition duration-6 group-hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none"
            loading="lazy"
            decoding="async"
          />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col border-t border-border-muted p-16">
        <div className="flex items-center justify-between gap-8">
          <span className="meta truncate">{label}</span>
          {rating && (
            <span className="inline-flex items-center gap-4 text-label-x-small font-medium text-ink-soft">
              <Star className="h-12 w-12 fill-accent-heat text-accent-heat" aria-hidden="true" />
              {rating}
            </span>
          )}
        </div>

        <h3 className="truncate-2 mt-8 min-h-[40px] text-body-medium font-semibold leading-20 tracking-[-.005em]">
          {product.name}
        </h3>

        {stock !== null ? (
          <div className="mt-10"><StockBar remaining={stock} total={stockTotal} /></div>
        ) : (
          <div className="mt-10"><PulseDot tone="success" label="In stock" /></div>
        )}

        <div className="mt-auto flex items-end justify-between gap-12 pt-16">
          <div className="min-w-0">
            <div className="price truncate text-title-h5 font-semibold leading-none">{formatINR(product.price)}</div>
            {mrp && (
              <div className="price mt-4 truncate text-label-x-small font-normal text-ink-muted line-through">
                {formatINR(mrp)}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="grid h-36 w-36 shrink-0 place-items-center border border-ink bg-ink text-canvas transition hover:bg-accent-heat hover:border-accent-heat motion-reduce:transition-none"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="h-14 w-14" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  )
}

export function ProductSkeleton() {
  return (
    <div className="bg-surface-1">
      <div className="h-208 animate-pulse bg-surface-2" />
      <div className="space-y-12 border-t border-border-muted p-16">
        <div className="h-12 w-1/3 animate-pulse bg-surface-2" />
        <div className="h-16 w-3/4 animate-pulse bg-surface-2" />
        <div className="flex items-center justify-between pt-12">
          <div className="h-20 w-24 animate-pulse bg-surface-2" />
          <div className="h-36 w-36 animate-pulse bg-surface-2" />
        </div>
      </div>
    </div>
  )
}
