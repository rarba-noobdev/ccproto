import { Heart, Plus, Star, TrendingUp } from 'lucide-react'
import clsx from 'clsx'
import useStore from '@/store/useStore'
import { formatINR } from '@/utils/currency'

export function ProductCard({ product, compact = false }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore()
  const mrp = product.mrp || product.originalPrice
  const discount = product.discount_pct || (mrp ? Math.max(0, Math.round(((mrp - product.price) / mrp) * 100)) : 0)

  const score = product.rating || (product.price > 60000 ? '4.9' : '4.7')

  return (
    <article className="group overflow-hidden rounded-[26px] border border-[var(--line)] bg-[var(--surface-1)] shadow-[0_12px_34px_rgba(38,38,38,.07)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--line-strong)] hover:shadow-[0_18px_44px_rgba(38,38,38,.10)]">
      <div className={clsx('product-image-box relative mx-2 mt-2 grid place-items-center overflow-hidden rounded-[22px] border border-[var(--line)]', compact ? 'h-40' : 'h-48')}>
        <div className="absolute inset-x-3 top-3 z-10 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-black text-[var(--ink-soft)] shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" aria-label="In stock" />
            Stock
          </span>
          {discount > 0 && <span className="rounded-full bg-[var(--ink)] px-2.5 py-1 text-[11px] font-black text-[var(--canvas)]">-{discount}%</span>}
        </div>
        <button type="button" onClick={() => toggleWishlist(product)} className="icon-btn absolute bottom-3 right-3 z-10 h-9 w-9 bg-white/85 shadow-sm backdrop-blur" aria-label={`${isWishlisted(product.id) ? 'Remove from' : 'Add to'} wishlist`}>
          <Heart className={clsx('h-4 w-4', isWishlisted(product.id) && 'fill-[var(--ink)] text-[var(--ink)]')} />
        </button>
        <img src={product.image} alt={product.name} width="320" height="240" className="relative z-[1] h-full w-full object-contain p-5 transition duration-300 group-hover:scale-[1.04]" loading="lazy" decoding="async" />
      </div>

      <div className="space-y-3 p-4 pt-3">
        <div className="flex items-center justify-between gap-3">
          <span className="truncate text-[11px] font-black uppercase tracking-[.12em] muted">{product.brand || product.category || 'Part'}</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--surface-2)] px-2 py-1 text-[11px] font-black text-[var(--warning)]"><Star className="h-3 w-3 fill-current" />{score}</span>
        </div>
        <h3 className="truncate-2 min-h-[42px] text-[15px] font-black leading-[21px] tracking-[-.02em]">{product.name}</h3>
        <div className="flex items-center gap-2 text-[11px] font-black muted">
          <TrendingUp className="h-3.5 w-3.5 text-[var(--accent-heat)]" aria-hidden="true" />
          <span>{(product.category || 'Component').toString().replace('-', ' ')}</span>
        </div>
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="price text-[21px] font-black">{formatINR(product.price)}</div>
            {mrp && <div className="price text-xs font-semibold muted line-through">{formatINR(mrp)}</div>}
          </div>
          <button type="button" onClick={() => addToCart(product)} className="grid h-11 w-11 place-items-center rounded-full bg-[var(--accent-heat)] text-white shadow-[0_10px_20px_rgba(250,93,25,.22)] transition group-hover:scale-[1.04]" aria-label={`Add ${product.name} to cart`}>
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  )
}

export function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-[26px] border border-[var(--line)] bg-[var(--surface-1)] p-2">
      <div className="h-48 animate-pulse rounded-[22px] bg-black/5" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-16 rounded-full bg-black/10" />
        <div className="h-5 w-full rounded-full bg-black/10" />
        <div className="h-5 w-2/3 rounded-full bg-black/10" />
        <div className="h-9 w-full rounded-full bg-black/10" />
      </div>
    </div>
  )
}
