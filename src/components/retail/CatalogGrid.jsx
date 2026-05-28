import { useMemo, useState } from 'react'
import { ArrowDownAZ, Search, SlidersHorizontal, Sparkles } from 'lucide-react'
import { ProductCard, ProductSkeleton } from '@/components/retail/ProductCard'
import SelectMenu from '@/components/ui/SelectMenu'
import { formatINR } from '@/utils/currency'

export default function CatalogGrid({ products = [], loading = false, categories = true }) {
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
    { value: 'name', label: 'A-Z' },
  ]

  return (
    <div>
      <div className="mb-6 rounded-[28px] border border-[var(--line)] bg-[var(--surface-1)] p-2 shadow-[0_12px_36px_rgba(38,38,38,.06)]">
        <div className="grid gap-2 lg:grid-cols-[1fr_auto_auto] lg:items-center">
          <label className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 muted" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} className="input-base pl-10" name="product-search" autoComplete="off" placeholder="Search..." aria-label="Search products" />
          </label>
          {categories && (
            <SelectMenu ariaLabel="Category" className="lg:w-52" icon={SlidersHorizontal} options={categoryItems} value={category} onChange={setCategory} />
          )}
          <SelectMenu ariaLabel="Sort" className="lg:w-44" icon={ArrowDownAZ} options={sortItems} value={sort} onChange={setSort} />
        </div>
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--surface-2)] px-3 py-2 text-xs font-black text-[var(--ink-soft)]">
          <Sparkles className="h-3.5 w-3.5 text-[var(--accent-heat)]" aria-hidden="true" />
          <span>{visible.length} shown</span>
        </div>
        {visible.length > 0 && (
          <div className="flex items-center gap-2 text-xs font-black muted">
            <span>{formatINR(min)}</span>
            <span className="h-px w-7 bg-[var(--line-strong)]" />
            <span>{formatINR(max)}</span>
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
          : visible.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>

      {!loading && visible.length === 0 && (
        <div className="panel mt-6 grid min-h-48 place-items-center rounded-[28px] p-8 text-center">
          <div>
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-[var(--surface-2)]">
              <Search className="h-5 w-5 muted" aria-hidden="true" />
            </div>
            <p className="font-black tracking-[-.02em]">No exact match</p>
            <p className="mt-1 text-sm muted">Try a shorter name or clear the filter.</p>
          </div>
        </div>
      )}
    </div>
  )
}
