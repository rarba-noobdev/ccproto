import { Heart, Plus, Star } from 'lucide-react'
import clsx from 'clsx'
import useStore from '@/store/useStore'
import { formatINR } from '@/utils/currency'

export function ProductCard({ product, compact = false }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore()
  const mrp = product.mrp || product.originalPrice
  const discount = product.discount_pct || (mrp ? Math.max(0, Math.round(((mrp - product.price) / mrp) * 100)) : 0)

  return (
    <article className="group panel overflow-hidden rounded-[28px] transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--surface-hover)]">
      <div className={clsx('product-image-box relative grid place-items-center', compact ? 'h-44' : 'h-56')}>
        <div className="absolute left-3 top-3 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[var(--success)]" aria-label="In stock" />
          {discount > 0 && <span className="rounded-full border border-[var(--line)] bg-[var(--surface-2)] px-2 py-1 text-[11px] font-black text-[var(--ink-soft)]">-{discount}%</span>}
        </div>
        <button type="button" onClick={() => toggleWishlist(product)} className="icon-btn absolute right-3 top-3 h-9 w-9" aria-label={`${isWishlisted(product.id) ? 'Remove from' : 'Add to'} wishlist`}>
          <Heart className={clsx('h-4 w-4', isWishlisted(product.id) && 'fill-[var(--ink)] text-[var(--ink)]')} />
        </button>
        <img src={product.image} alt={product.name} width="320" height="240" className="h-full w-full object-contain p-6 transition duration-300 group-hover:scale-[1.035]" loading="lazy" decoding="async" />
      </div>

      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="truncate text-xs font-black uppercase tracking-[.12em] muted">{product.brand || product.category || 'Part'}</span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-[var(--warning)]"><Star className="h-3.5 w-3.5 fill-current" />{product.rating || '4.7'}</span>
        </div>
        <h3 className="truncate-2 min-h-[44px] text-[15px] font-black leading-[22px]">{product.name}</h3>
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="price text-[22px] font-black">{formatINR(product.price)}</div>
            {mrp && <div className="price text-xs font-semibold muted line-through">{formatINR(mrp)}</div>}
          </div>
          <div className="flex gap-1.5">
            <button type="button" onClick={() => addToCart(product)} className="icon-btn h-10 w-10 bg-[var(--ink)] text-[var(--canvas)]" aria-label={`Add ${product.name} to cart`}>
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export function ProductSkeleton() {
  return (
    <div className="panel overflow-hidden rounded-[28px]">
      <div className="h-56 animate-pulse bg-white/5" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-16 rounded-full bg-white/8" />
        <div className="h-5 w-full rounded-full bg-white/8" />
        <div className="h-5 w-2/3 rounded-full bg-white/8" />
        <div className="h-9 w-full rounded-full bg-white/8" />
      </div>
    </div>
  )
}
