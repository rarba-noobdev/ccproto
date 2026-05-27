import { useMemo, useState } from 'react'
import { ArrowDownAZ, Search, SlidersHorizontal } from 'lucide-react'
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
      <div className="surface mb-6 rounded-full p-2">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <label className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 muted" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} className="input-base pl-10" name="product-search" autoComplete="off" placeholder="Search…" aria-label="Search products" />
          </label>
          {categories && (
            <SelectMenu ariaLabel="Category" className="lg:w-48" icon={SlidersHorizontal} options={categoryItems} value={category} onChange={setCategory} />
          )}
          <SelectMenu ariaLabel="Sort" className="lg:w-48" icon={ArrowDownAZ} options={sortItems} value={sort} onChange={setSort} />
        </div>
      </div>

      <div className="mb-5 flex items-center justify-between px-1 text-xs font-bold muted">
        <span>{visible.length}</span>
        {visible.length > 0 && <span>{formatINR(max)}</span>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
          : visible.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  )
}
