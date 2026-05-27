import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, CheckCircle2, Cpu, Database, ShieldCheck, Sparkles, Truck } from 'lucide-react'
import RetailLayout from '@/components/retail/RetailLayout'
import { ProductCard, ProductSkeleton } from '@/components/retail/ProductCard'
import { fetchHomeData } from '@/lib/supabase'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'
import { formatINR } from '@/utils/currency'

function PrebuiltCard({ pc }) {
  const image = pc.case?.image || pc.gpu?.image || pc.cpu?.image
  return (
    <article className="panel grid overflow-hidden rounded-2xl lg:grid-cols-[.95fr_1.05fr]">
      <div className="product-image-box relative min-h-[360px] bg-[#13161d]">
        <img src={image} alt={pc.name} className="absolute inset-0 h-full w-full object-contain p-8" />
        <span className="absolute left-5 top-5 rounded-md bg-white px-3 py-1 text-xs font-black text-black">{pc.badge}</span>
      </div>
      <div className="flex flex-col justify-between p-6 lg:p-8">
        <div>
          <p className="kicker mb-3"><Sparkles className="h-4 w-4" /> Ready to ship build</p>
          <h3 className="text-3xl font-black tracking-tight">{pc.name}</h3>
          <p className="mt-2 max-w-md text-sm leading-6 text-white/58">{pc.tagline}</p>
          <div className="mt-6 grid gap-2 text-sm">
            <Spec label="CPU" value={pc.cpu?.name} />
            <Spec label="GPU" value={pc.gpu?.name} />
            <Spec label="RAM" value={pc.ram?.name} />
            <Spec label="Case" value={pc.case?.name} />
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-6">
          <div>
            <div className="price text-3xl font-black">{formatINR(pc.price)}</div>
            <div className="text-sm font-semibold text-white/38 line-through">{formatINR(pc.mrp)}</div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <Fps value={pc.fps_1080p} label="1080p" />
            <Fps value={pc.fps_1440p} label="1440p" />
            <Fps value={pc.fps_4k} label="4K" />
          </div>
        </div>
      </div>
    </article>
  )
}

function Spec({ label, value }) {
  return (
    <div className="grid grid-cols-[58px_1fr] gap-3 rounded-lg border border-white/8 bg-white/[.025] px-3 py-2">
      <span className="text-xs font-black uppercase tracking-wide text-white/35">{label}</span>
      <span className="truncate text-sm font-semibold text-white/78">{value || 'Configured part'}</span>
    </div>
  )
}

function Fps({ value, label }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
      <div className="font-mono text-lg font-black text-[#f26522]">{value}</div>
      <div className="text-[11px] font-bold text-white/42">{label}</div>
    </div>
  )
}

export default function Home() {
  const { data, loading, error } = useSupabaseQuery(fetchHomeData, [])
  const prebuilts = data?.prebuilts ?? []
  const components = data?.components ?? []
  const benchmarks = data?.benchmarks ?? []
  const testimonials = data?.testimonials ?? []
  const posts = data?.posts ?? []
  const heroPc = prebuilts[prebuilts.length - 1] || prebuilts[0]
  const heroImage = heroPc?.case?.image || heroPc?.gpu?.image || components[0]?.image

  return (
    <RetailLayout>
      <main>
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="container-max grid min-h-[680px] items-center gap-10 py-14 lg:grid-cols-[1.02fr_.98fr]">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}>
              <p className="kicker mb-5"><Database className="h-4 w-4" /> Real Indian market catalog</p>
              <h1 className="max-w-3xl text-[44px] font-black leading-[.98] tracking-[-.05em] sm:text-[72px] lg:text-[86px]">
                Build a PC with prices that are actually real.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/64">
                Challenger Computers uses scraped MD Computers product data, live component pricing, real images, source links, and warranty-aware build logic for gamers and creators in India.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/build" className="btn-primary">Start custom build <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/prebuilt" className="btn-secondary">Shop prebuilts</Link>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Trust icon={Cpu} value="88" label="Scraped parts" />
                <Trust icon={ShieldCheck} value="3 yr" label="Warranty ready" />
                <Trust icon={Truck} value="Pan India" label="Delivery" />
                <Trust icon={BarChart3} value="14" label="Benchmarks" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .55, delay: .1 }} className="panel relative rounded-2xl p-4">
              <div className="product-image-box grid min-h-[480px] place-items-center rounded-xl bg-[#151820]">
                {heroImage && <img src={heroImage} alt={heroPc?.name || 'Gaming PC'} className="h-[430px] w-full object-contain p-6" />}
              </div>
              <div className="absolute bottom-8 left-8 right-8 rounded-xl border border-white/10 bg-black/55 p-4 backdrop-blur-md">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-[#f26522]">Featured configuration</p>
                    <h2 className="mt-1 text-xl font-black">{heroPc?.name || 'Custom Gaming PC'}</h2>
                    <p className="mt-1 text-sm text-white/58">{heroPc?.tagline || 'Configured from live catalog data'}</p>
                  </div>
                  <div className="price whitespace-nowrap text-2xl font-black">{formatINR(heroPc?.price || 0)}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="container-max py-14">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="kicker mb-2">Curated systems</p>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Prebuilt PCs from real parts</h2>
            </div>
            <Link to="/prebuilt" className="btn-secondary">View all builds</Link>
          </div>
          {error && <div className="panel rounded-xl p-5 text-red-200">Supabase error: {error.message}</div>}
          {loading ? <div className="grid gap-6 lg:grid-cols-2"><ProductSkeleton /><ProductSkeleton /></div> : (
            <div className="grid gap-6 xl:grid-cols-2">
              {prebuilts.slice(0, 4).map((pc) => <PrebuiltCard key={pc.id} pc={pc} />)}
            </div>
          )}
        </section>

        <section className="border-y border-white/10 bg-white/[.025] py-14">
          <div className="container-max">
            <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="kicker mb-2">Component market</p>
                <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Freshly scraped product catalog</h2>
              </div>
              <Link to="/gaming-pcs" className="btn-secondary">Browse components</Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {loading ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />) : components.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} compact />)}
            </div>
          </div>
        </section>

        <section className="container-max grid gap-6 py-14 lg:grid-cols-[1fr_.9fr]">
          <div className="panel rounded-2xl p-6">
            <p className="kicker mb-2">Performance board</p>
            <h2 className="mb-6 text-3xl font-black tracking-tight">Benchmarks that sell the build, not fantasy numbers</h2>
            <div className="space-y-3">
              {benchmarks.slice(0, 8).map((row) => (
                <div key={row.id} className="grid grid-cols-[1fr_auto] gap-4 rounded-lg border border-white/8 bg-black/20 p-3">
                  <div>
                    <div className="font-bold">{row.game}</div>
                    <div className="text-xs text-white/45">{row.settings} - {row.build_name}</div>
                  </div>
                  <div className="font-mono text-2xl font-black text-[#f26522]">{row.fps}<span className="text-xs text-white/40"> FPS</span></div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {testimonials.slice(0, 3).map((t) => (
              <blockquote key={t.id} className="panel rounded-2xl p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-white text-sm font-black text-black">{t.initials}</span>
                    <span><span className="block font-black">{t.name}</span><span className="text-xs text-white/45">{t.city} - {t.build_name}</span></span>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-[#28c76f]" />
                </div>
                <p className="text-sm leading-6 text-white/64">"{t.body}"</p>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="container-max pb-16">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="kicker mb-2">Buying guides</p>
              <h2 className="text-3xl font-black tracking-tight">Useful PC advice</h2>
            </div>
            <Link to="/blog" className="text-sm font-bold text-[#f26522]">Read more</Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {posts.map((post) => (
              <Link to="/blog" key={post.id} className="panel overflow-hidden rounded-xl">
                <img src={post.cover_image} alt={post.title} className="h-40 w-full object-cover" />
                <div className="p-4">
                  <p className="mb-2 text-xs font-black uppercase tracking-wide text-[#f26522]">{post.category}</p>
                  <h3 className="truncate-2 font-black">{post.title}</h3>
                  <p className="mt-2 truncate-2 text-sm text-white/55">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </RetailLayout>
  )
}

function Trust({ icon: Icon, value, label }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[.035] p-4">
      <Icon className="mb-3 h-5 w-5 text-[#f26522]" />
      <div className="font-black">{value}</div>
      <div className="text-xs font-semibold text-white/45">{label}</div>
    </div>
  )
}
