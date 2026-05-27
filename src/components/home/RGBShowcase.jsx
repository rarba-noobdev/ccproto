import { Link } from 'react-router-dom'
import { accessories } from '@/data/products'
import { formatINR } from '@/utils/currency'

export default function RGBShowcase() {
  return (
    <section className="bg-void py-20 lg:py-28">
      <div className="container-max">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <p className="section-label mb-4">Complete the desk</p>
            <h2 className="text-4xl font-medium leading-[0.98] tracking-[-1.8px] text-white md:text-6xl">
              Peripherals from the same live catalog.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/50">
              Monitors, input devices, audio, mousepads, and capture gear selected to sit cleanly beside each Challenger build.
            </p>
            <Link to="/accessories" className="btn-ghost mt-8">
              Browse accessories
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {accessories.map((item, index) => (
              <Link
                key={item.id}
                to="/accessories"
                className={`group rounded-[24px] bg-void-100 p-4 transition-colors hover:bg-void-200 ${index === 0 ? 'sm:col-span-2' : ''}`}
              >
                <div className={`${index === 0 ? 'aspect-[2.2/1]' : 'aspect-[4/3]'} rounded-[18px] bg-white p-5`}>
                  <img src={item.image} alt={item.name} width="520" height="260" className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-xs capitalize text-white/35">{item.category}</div>
                    <h3 className="mt-1 line-clamp-2 text-lg font-medium leading-tight tracking-[-0.4px] text-white">{item.name}</h3>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="font-medium text-white">{formatINR(item.price)}</div>
                    <div className="text-xs text-white/30 line-through">{formatINR(item.originalPrice)}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
