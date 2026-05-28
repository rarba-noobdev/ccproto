import { useMemo, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowDownAZ, Search, SlidersHorizontal } from 'lucide-react'
import { ProductCard, ProductSkeleton } from '@/components/retail/ProductCard'
import SelectMenu from '@/components/ui/SelectMenu'
import { EmptyPanel, SkeletonGrid } from '@/components/retail/StatusPanel'
import { formatINR } from '@/utils/currency'

const easeOut = [0.23, 1, 0.32, 1]

export default function CatalogGrid({ products = [], loading = false, categories = true }) {
  const reduceMotion = useReducedMotion()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('price-asc')

  const categoryOptions = useMemo(() => {
    const values = [...new Set(products.map((p) => p.category).filter(Boolean))]
    return values.sort()
  }, [products])

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase()
    return products
      .filter((p) => category === 'all' || p.category === category)
      .filter((p) => !q || `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(q))
      .sort((a, b) => {
        if (sort === 'price-desc') return b.price - a.price
        if (sort === 'discount') return (b.discount_pct || 0) - (a.discount_pct || 0)
        if (sort === 'name') return a.name.localeCompare(b.name)
        return a.price - b.price
      })
  }, [products, search, category, sort])

  const max = visible.reduce((value, p) => Math.max(value, p.price || 0), 0)
  const min = visible.reduce((value, p) => Math.min(value, p.price || value), visible[0]?.price || 0)
  const categoryItems = useMemo(() => [
    { value: 'all', label: 'All' },
    ...categoryOptions.map((option) => ({ value: option, label: option.toUpperCase() })),
  ], [categoryOptions])
  const sortItems = [
    { value: 'price-asc', label: 'Lowest' },
    { value: 'price-desc', label: 'Highest' },
    { value: 'discount', label: 'Discount' },
    { value: 'name', label: 'A–Z' },
  ]

  return (
    <div>
      <div className="mb-24 border-y border-border-muted py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto_auto] lg:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search</span>
            <Search className="pointer-events-none absolute left-14 top-1/2 h-14 w-14 -translate-y-1/2 text-ink-muted" aria-hidden="true" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-base pl-36"
              name="product-search"
              autoComplete="off"
              placeholder="Search the catalogue"
              aria-label="Search products"
            />
          </label>
          {categories && (
            <SelectMenu ariaLabel="Category" className="lg:w-200" icon={SlidersHorizontal} options={categoryItems} value={category} onChange={setCategory} />
          )}
          <SelectMenu ariaLabel="Sort" className="lg:w-176" icon={ArrowDownAZ} options={sortItems} value={sort} onChange={setSort} />
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-12">
          <div className="meta">{visible.length} {visible.length === 1 ? 'item' : 'items'}</div>
          {visible.length > 0 && (
            <div className="flex items-center gap-10 text-label-x-small font-medium text-ink-muted">
              <span className="price">{formatINR(min)}</span>
              <span className="h-px w-24 bg-line-strong" aria-hidden="true" />
              <span className="price">{formatINR(max)}</span>
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <SkeletonGrid Card={ProductSkeleton} />
      ) : (
        <motion.div
          layout
          className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{
                  duration: 0.4,
                  ease: easeOut,
                  delay: reduceMotion ? 0 : Math.min(i * 0.03, 0.3),
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {!loading && visible.length === 0 && (
        <EmptyPanel
          icon={Search}
          title="No matches"
          copy="Adjust filters or clear the search."
        />
      )}
    </div>
  )
}
