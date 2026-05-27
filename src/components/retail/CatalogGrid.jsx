import { useMemo, useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { ProductCard, ProductSkeleton } from '@/components/retail/ProductCard'
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

  const min = visible[0]?.price || 0
  const max = visible.reduce((value, p) => Math.max(value, p.price || 0), 0)

  return (
    <div>
      <div className="panel mb-6 rounded-xl p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="flex items-center gap-2 text-white/55">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="text-xs font-black uppercase tracking-wide">Filters</span>
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-base lg:max-w-sm"
            placeholder="Search GPUs, Ryzen, DDR5..."
            aria-label="Search products"
          />
          {categories && (
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="input-base lg:w-52" aria-label="Filter by category">
              <option value="all">All categories</option>
              {categoryOptions.map((option) => <option key={option} value={option}>{option.toUpperCase()}</option>)}
            </select>
          )}
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="input-base lg:w-52" aria-label="Sort products">
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="discount">Best discount</option>
            <option value="name">Name</option>
          </select>
          <div className="ml-auto text-sm font-bold text-white/52">
            {visible.length} products
            {visible.length > 0 && <span className="ml-2 text-white/32">{formatINR(min)}-{formatINR(max)}</span>}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
          : visible.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  )
}
