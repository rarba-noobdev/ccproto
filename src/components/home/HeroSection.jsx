import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Truck, Wrench } from 'lucide-react'
import { prebuiltPCs } from '@/data/products'
import { formatINR } from '@/utils/currency'

const heroProduct = prebuiltPCs.find((pc) => pc.id === 'challenger-vector-5060-ti') || prebuiltPCs[0]
const supportingProducts = prebuiltPCs.filter((pc) => pc.id !== heroProduct.id).slice(0, 3)

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-void pt-24">
      <div className="container-max grid min-h-[calc(100vh-72px)] gap-10 py-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end lg:py-16">
        <div className="pb-8 lg:pb-20">
          <div className="mb-6 inline-flex items-center rounded-full bg-white px-3 py-1.5 text-xs font-medium tracking-[-0.12px] text-void">
            Challenger launch roster
          </div>

          <h1 className="max-w-4xl font-display text-[56px] font-medium leading-[0.9] tracking-[-2.8px] text-white sm:text-[76px] lg:text-[96px] lg:tracking-[-4.8px]">
            Prebuilt PCs with real parts, prices, and product photos.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-[1.35] tracking-[-0.18px] text-white/60">
            Compare carefully balanced gaming and creator systems with clear component lists, live rupee pricing, and a cart flow built for quick decisions.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/prebuilt" className="btn-primary">
              Shop prebuilt PCs
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/accessories" className="btn-ghost">Complete the setup</Link>
          </div>

          <div className="mt-12 grid max-w-xl grid-cols-3 gap-3 border-t border-white/5 pt-5">
            {[
              { icon: ShieldCheck, label: 'Verified specs' },
              { icon: Truck, label: 'Store pricing' },
              { icon: Wrench, label: 'Upgrade paths' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-white/50">
                <Icon className="h-4 w-4 text-white" aria-hidden="true" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[30px] bg-void-100 p-4 shadow-card lg:p-5">
            <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="flex min-h-[420px] items-center justify-center rounded-[24px] bg-white p-8">
                <img
                  src={heroProduct.image}
                  alt={heroProduct.name}
                  width="620"
                  height="520"
                  className="max-h-[460px] w-full object-contain"
                  fetchPriority="high"
                />
              </div>

              <div className="flex flex-col justify-between rounded-[24px] bg-void p-6">
                <div>
                  <p className="text-sm text-white/40">Featured build</p>
                  <h2 className="mt-3 text-3xl font-medium leading-[1.05] tracking-[-1px] text-white">
                    {heroProduct.name}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/50">{heroProduct.tagline}</p>
                </div>

                <dl className="mt-8 space-y-3 text-sm">
                  {[
                    ['GPU', heroProduct.gpu],
                    ['CPU', heroProduct.cpu],
                    ['RAM', heroProduct.ram],
                    ['SSD', heroProduct.storage],
                  ].map(([label, value]) => (
                    <div key={label} className="grid grid-cols-[44px_1fr] gap-3 border-t border-white/5 pt-3">
                      <dt className="text-white/35">{label}</dt>
                      <dd className="text-white/70">{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 flex items-end justify-between gap-4">
                  <div>
                    <div className="text-sm text-white/40">Current price</div>
                    <div className="mt-1 text-3xl font-medium tracking-[-1px] text-white">{formatINR(heroProduct.price)}</div>
                    <div className="text-sm text-white/30 line-through">{formatINR(heroProduct.originalPrice)}</div>
                  </div>
                  <Link to="/prebuilt" className="btn-primary shrink-0">
                    Compare
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {supportingProducts.map((pc) => (
              <Link key={pc.id} to="/prebuilt" className="group rounded-[20px] bg-void-100 p-3 transition-colors hover:bg-void-200">
                <div className="aspect-[4/3] rounded-[15px] bg-white p-3">
                  <img src={pc.image} alt={pc.name} width="240" height="180" className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="mt-3">
                  <div className="truncate text-sm font-medium text-white">{pc.name}</div>
                  <div className="mt-1 text-sm text-white/45">{formatINR(pc.price)}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
