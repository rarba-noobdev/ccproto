import { ExternalLink, Heart, ShoppingCart, Star } from 'lucide-react'
import clsx from 'clsx'
import useStore from '@/store/useStore'
import { formatINR } from '@/utils/currency'

export function ProductCard({ product, compact = false }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore()
  const mrp = product.mrp || product.originalPrice
  const discount = product.discount_pct || (mrp ? Math.max(0, Math.round(((mrp - product.price) / mrp) * 100)) : 0)
  const sourceUrl = product.source_url || product.sourceUrl

  return (
    <article className="group panel overflow-hidden rounded-xl transition duration-200 hover:border-white/20">
      <div className={clsx('product-image-box relative grid place-items-center bg-[#12151b]', compact ? 'h-44' : 'h-56')}>
        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-md bg-[#f26522] px-2 py-1 text-[11px] font-black text-black">
            {discount}% OFF
          </span>
        )}
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-black/30 text-white backdrop-blur"
          aria-label={`${isWishlisted(product.id) ? 'Remove from' : 'Add to'} wishlist`}
        >
          <Heart className={clsx('h-4 w-4', isWishlisted(product.id) && 'fill-[#f26522] text-[#f26522]')} />
        </button>
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain p-5 transition duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>

      <div className="space-y-4 p-4">
        <div>
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="rounded bg-white/8 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-white/60">
              {product.brand || product.category || 'Hardware'}
            </span>
            <span className="inline-flex items-center gap-1 text-[12px] font-bold text-[#f6bd16]">
              <Star className="h-3.5 w-3.5 fill-current" /> {product.rating || '4.7'}
            </span>
          </div>
          <h3 className="truncate-2 min-h-[44px] text-[15px] font-extrabold leading-[22px] text-white">{product.name}</h3>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="price text-[22px] font-black text-white">{formatINR(product.price)}</div>
            {mrp && <div className="price text-[12px] font-semibold text-white/35 line-through">{formatINR(mrp)}</div>}
          </div>
          <div className={clsx('rounded-md px-2 py-1 text-[11px] font-black', product.in_stock === false ? 'bg-red-500/15 text-red-300' : 'bg-[#28c76f]/15 text-[#7ee5aa]')}>
            {product.in_stock === false ? 'Out of stock' : 'In stock'}
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={() => addToCart(product)} className="btn-primary flex-1 text-sm">
            <ShoppingCart className="h-4 w-4" /> Add
          </button>
          {sourceUrl && (
            <a href={sourceUrl} target="_blank" rel="noreferrer" className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/5 text-white/70" aria-label="Open source product">
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export function ProductSkeleton() {
  return (
    <div className="panel overflow-hidden rounded-xl">
      <div className="h-56 animate-pulse bg-white/5" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-20 rounded bg-white/8" />
        <div className="h-5 w-full rounded bg-white/8" />
        <div className="h-5 w-2/3 rounded bg-white/8" />
        <div className="h-9 w-full rounded bg-white/8" />
      </div>
    </div>
  )
}
