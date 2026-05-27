import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { prebuiltPCs } from '@/data/products'
import useStore from '@/store/useStore'
import { formatINR } from '@/utils/currency'

const featured = prebuiltPCs.slice(0, 4)

export default function FeaturedPCs() {
  const { addToCart } = useStore()

  return (
    <section className="bg-void py-20 lg:py-28">
      <div className="container-max">
        <div className="mb-10 flex flex-col justify-between gap-6 border-t border-white/5 pt-8 md:flex-row md:items-end">
          <div>
            <p className="section-label mb-4">Current prebuilt inventory</p>
            <h2 className="max-w-3xl text-4xl font-medium leading-[0.98] tracking-[-1.8px] text-white md:text-6xl">
              Real systems. Real component lists. No mockups.
            </h2>
          </div>
          <Link to="/prebuilt" className="btn-ghost self-start md:self-auto">
            View all systems
          </Link>
        </div>

        <div className="grid gap-px overflow-hidden rounded-[24px] border border-white/5 bg-white/5 md:grid-cols-2">
          {featured.map((pc) => (
            <article key={pc.id} className="bg-void-100 p-4 sm:p-5">
              <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
                <Link to="/prebuilt" className="flex aspect-[4/3] items-center justify-center rounded-[18px] bg-white p-5">
                  <img src={pc.image} alt={pc.name} width="260" height="195" className="h-full w-full object-contain" loading="lazy" />
                </Link>

                <div className="flex min-w-0 flex-col">
                  <div className="mb-5">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="rounded-full bg-white/8 px-2.5 py-1 text-[11px] font-medium text-white/55">{pc.badge}</span>
                      <span className="text-sm text-white/35">Stock {pc.stock}</span>
                    </div>
                    <h3 className="text-2xl font-medium leading-tight tracking-[-0.8px] text-white">{pc.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/45">{pc.tagline}</p>
                  </div>

                  <div className="grid gap-2 text-sm">
                    {[
                      ['CPU', pc.cpu],
                      ['GPU', pc.gpu],
                      ['Memory', pc.ram],
                    ].map(([label, value]) => (
                      <div key={label} className="grid grid-cols-[68px_1fr] gap-3">
                        <span className="text-white/30">{label}</span>
                        <span className="truncate text-white/65">{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-6">
                    <div>
                      <div className="text-2xl font-medium tracking-[-0.8px] text-white">{formatINR(pc.price)}</div>
                      <div className="text-sm text-white/30 line-through">{formatINR(pc.originalPrice)}</div>
                    </div>
                    <button onClick={() => addToCart(pc)} className="btn-primary">
                      <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
