import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { prebuiltPCs } from '@/data/products'
import { formatINR } from '@/utils/currency'

const lowest = prebuiltPCs.reduce((min, pc) => (pc.price < min.price ? pc : min), prebuiltPCs[0])

export default function BuildCTASection() {
  return (
    <section className="bg-void py-20 lg:py-28">
      <div className="container-max">
        <div className="overflow-hidden rounded-[30px] bg-white text-void">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="p-8 md:p-12">
              <p className="mb-4 text-sm font-medium text-black/45">Buying workflow</p>
              <h2 className="max-w-2xl text-4xl font-medium leading-[0.98] tracking-[-1.8px] md:text-6xl">
                Choose a build, verify the source, then decide.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-black/55">
                The catalog keeps component details visible at every step, so shoppers can validate the build logic before checkout.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/prebuilt" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-void px-4 text-sm font-medium text-white">
                  Compare PCs
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link to="/build" className="inline-flex min-h-11 items-center justify-center rounded-full bg-black/8 px-4 text-sm font-medium text-void">
                  Configure manually
                </Link>
              </div>
            </div>

            <div className="bg-[#f3f3f0] p-5 md:p-8">
              <div className="rounded-[24px] bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                <div className="flex items-start gap-5">
                  <div className="h-32 w-32 shrink-0 rounded-[18px] bg-[#f7f7f4] p-4">
                    <img src={lowest.image} alt={lowest.name} width="128" height="128" className="h-full w-full object-contain" loading="lazy" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm text-black/40">Lowest current build</div>
                    <h3 className="mt-1 text-2xl font-medium leading-tight tracking-[-0.6px]">{lowest.name}</h3>
                    <div className="mt-3 text-3xl font-medium tracking-[-1px]">{formatINR(lowest.price)}</div>
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  {[
                    `CPU: ${lowest.cpu}`,
                    `GPU: ${lowest.gpu}`,
                    `Storage: ${lowest.storage}`,
                  ].map((item) => (
                    <div key={item} className="flex gap-3 rounded-[14px] bg-[#f7f7f4] p-3 text-sm text-black/65">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-void" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
