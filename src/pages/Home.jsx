import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Check,
  Cpu,
  Gauge,
  HardDrive,
  Instagram,
  Monitor,
  PackageCheck,
  Play,
  ShieldCheck,
  Sparkles,
  Trophy,
  Zap,
} from 'lucide-react'
import RetailLayout from '@/components/retail/RetailLayout'
import { ProductSkeleton } from '@/components/retail/ProductCard'
import { fetchHomeData } from '@/lib/supabase'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'
import { formatINR } from '@/utils/currency'

const easeOut = [0.23, 1, 0.32, 1]

const categories = [
  { label: 'Gaming PCs', to: '/prebuilt', icon: Trophy },
  { label: 'Build custom', to: '/build', icon: Cpu },
  { label: 'Graphics', to: '/category/graphic-card', icon: Zap },
  { label: 'Displays', to: '/category/monitor', icon: Monitor },
  { label: 'Storage', to: '/category/ssd', icon: HardDrive },
]

const reels = [
  {
    title: 'RTX 5080 creator build',
    meta: 'Ryzen 9 / high-end graphics',
    url: 'https://www.instagram.com/reel/DYtYJUcPe4x/',
  },
  {
    title: 'Build floor dispatch',
    meta: 'Custom PC assembly reel',
    url: 'https://www.instagram.com/reel/DCO76Ijy-ff/',
  },
  {
    title: '2.40L performance rig',
    meta: 'i9 / Arc A770 showcase',
    url: 'https://www.instagram.com/reel/Cv4SeUgvNtN/',
  },
]

export default function Home() {
  const reduceMotion = useReducedMotion()
  const { data, loading, error } = useSupabaseQuery(fetchHomeData, [], {})
  const prebuilts = data?.prebuilts ?? []
  const components = data?.components ?? []
  const testimonials = data?.testimonials ?? []
  const heroPc = prebuilts[prebuilts.length - 1] || prebuilts[0]
  const heroImage = heroPc?.case?.image || heroPc?.gpu?.image || components[0]?.image
  const featureSystems = prebuilts.slice(0, 3)
  const recommendationCards = [
    {
      title: 'Competitive gaming',
      copy: 'Prioritize GPU, high-refresh display, and balanced thermals.',
      icon: Trophy,
      system: prebuilts[0],
      to: '/prebuilt',
    },
    {
      title: 'Creator workstation',
      copy: 'More CPU headroom, memory, and fast storage for editing workloads.',
      icon: Cpu,
      system: prebuilts.find((pc) => pc.use_cases?.some((item) => /create|work|render|studio/i.test(item))) || prebuilts[1],
      to: '/workstations',
    },
    {
      title: 'Custom upgrade path',
      copy: 'Start with core parts and tune the quote as your budget changes.',
      icon: HardDrive,
      system: prebuilts[2],
      to: '/build',
    },
  ]
  const proof = [
    [heroPc?.fps_1440p || 240, '1440p estimate'],
    ['3 yr', 'service window'],
    ['QC', 'bench verified'],
  ]

  return (
    <RetailLayout>
      <main>
        <section className="container-max pt-8">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_430px]">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, transform: 'translateY(14px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              transition={{ duration: 0.34, ease: easeOut }}
              className="panel relative min-h-[620px] overflow-hidden rounded-[42px] p-6 sm:p-8 lg:p-10"
            >
              <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <p className="kicker mb-7"><Sparkles className="h-4 w-4" /> Precision-built performance systems</p>
                  <h1 className="max-w-5xl text-[64px] font-black leading-[.82] tracking-[-.09em] sm:text-[104px] lg:text-[136px]">
                    Built like a serious machine.
                  </h1>
                  <p className="mt-7 max-w-xl text-base font-semibold leading-7 text-white/58">
                    Curated gaming and creator PCs with visible component choices, live pricing, and a cleaner buying path from quote to checkout.
                  </p>
                </div>

                <div className="mt-10 grid gap-5">
                  <div className="flex flex-wrap gap-2">
                    <Link to="/build" className="btn-primary">Start build <ArrowRight className="h-4 w-4" /></Link>
                    <Link to="/prebuilt" className="btn-secondary">Shop systems</Link>
                  </div>
                  <div className="grid max-w-2xl gap-2 sm:grid-cols-3">
                    {proof.map(([value, label], index) => (
                      <motion.div
                        key={label}
                        initial={reduceMotion ? false : { opacity: 0, transform: 'translateY(8px)' }}
                        animate={{ opacity: 1, transform: 'translateY(0px)' }}
                        transition={{ duration: 0.22, delay: 0.08 + index * 0.045, ease: easeOut }}
                        className="rounded-[24px] border border-[var(--line)] bg-white/[.035] p-4"
                      >
                        <div className="font-mono text-2xl font-black tracking-[-.05em]">{value}</div>
                        <div className="mt-1 text-xs font-bold muted">{label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.aside
              initial={reduceMotion ? false : { opacity: 0, transform: 'translateY(14px) scale(0.985)' }}
              animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
              transition={{ duration: 0.38, delay: 0.06, ease: easeOut }}
              className="relative overflow-hidden rounded-[34px] border border-[var(--line)] bg-[#111216] shadow-[0_24px_70px_rgba(0,0,0,.34)]"
            >
              <div className="grid min-h-[620px] grid-rows-[1fr_auto]">
                <div className="relative grid place-items-center bg-[#f7f7f3] p-8">
                  <div className="absolute inset-x-10 bottom-10 h-20 rounded-full bg-black/10 blur-3xl" />
                  {heroImage && <img src={heroImage} alt={heroPc?.name || 'Featured PC'} width="520" height="430" className="relative h-[390px] w-full object-contain transition duration-300 hover:scale-[1.02]" decoding="async" fetchPriority="high" />}
                </div>
                <div className="absolute left-5 top-5 z-10 rounded-full bg-black px-3 py-1 text-xs font-black text-white shadow-[0_10px_24px_rgba(0,0,0,.18)]">
                  {heroPc?.badge || 'Featured'}
                </div>
                <div className="p-5">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h2 className="truncate text-2xl font-black tracking-[-.05em]">{heroPc?.name || 'Performance System'}</h2>
                      <p className="mt-1 truncate text-xs font-bold muted">{heroPc?.gpu?.name || heroPc?.cpu?.name || 'Configured system'}</p>
                    </div>
                    <div className="price shrink-0 text-2xl font-black">{formatINR(heroPc?.price || 0)}</div>
                  </div>
                  <Link to="/prebuilt" className="btn-primary h-11 w-full">View system</Link>
                </div>
              </div>
            </motion.aside>
          </div>
        </section>

        {error && <div className="container-max panel mt-8 rounded-3xl p-5 text-red-300">{error.message}</div>}

        <section className="container-max py-6">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map(({ label, to, icon: Icon }, index) => (
              <motion.div
                key={label}
                initial={reduceMotion ? false : { opacity: 0, transform: 'translateY(8px)' }}
                whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.22, delay: index * 0.035, ease: easeOut }}
              >
                <Link to={to} className="panel group flex min-h-28 flex-col justify-between rounded-[28px] p-4 transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--surface-hover)]">
                  <Icon className="h-5 w-5 muted transition group-hover:text-[var(--ink)]" />
                  <div className="flex items-end justify-between gap-3">
                    <span className="text-lg font-black tracking-[-.04em]">{label}</span>
                    <ArrowRight className="h-4 w-4 muted transition group-hover:translate-x-0.5 group-hover:text-[var(--ink)]" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="container-max py-8">
          <SectionTitle kicker="Systems" title="Ready builds" to="/prebuilt" />
          {loading ? (
            <div className="grid gap-4 lg:grid-cols-3"><ProductSkeleton /><ProductSkeleton /><ProductSkeleton /></div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-3">
              {featureSystems.map((pc, index) => <SystemCard key={pc.id} pc={pc} index={index} />)}
            </div>
          )}
        </section>

        <section className="container-max py-7">
          <div className="grid gap-4 lg:grid-cols-[.78fr_1.22fr]">
            <div className="home-card flex min-h-72 flex-col justify-between p-5 sm:p-6">
              <div>
                <p className="kicker mb-3"><Instagram className="h-4 w-4" /> Build floor</p>
                <h2 className="text-4xl font-black leading-[.9] tracking-[-.065em]">Watch real rigs leave the bench.</h2>
              </div>
              <a
                href="https://www.instagram.com/challenger_computer/reels/"
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-8 w-fit"
              >
                Open reels <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {reels.map((reel, index) => (
                <ReelCard key={reel.url} reel={reel} image={featureSystems[index]?.case?.image || featureSystems[index]?.gpu?.image || heroImage} index={index} reduceMotion={reduceMotion} />
              ))}
            </div>
          </div>
        </section>

        <section className="container-max py-8">
          <div className="home-card overflow-hidden p-4 sm:p-5">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="kicker mb-2">Shop smarter</p>
                <h2 className="text-3xl font-black tracking-[-.055em] sm:text-4xl">Pick a lane</h2>
              </div>
              <Link to="/build" className="btn-secondary min-h-10 px-4 text-xs">Tune quote</Link>
            </div>
            <div className="grid gap-2 lg:grid-cols-3">
              {recommendationCards.map((card, index) => (
                <AdvisorCard key={card.title} card={card} index={index} reduceMotion={reduceMotion} />
              ))}
            </div>

            <div className="mt-4 border-t border-[var(--line)] pt-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p className="kicker mb-1">Parts</p>
                  <h3 className="text-2xl font-black tracking-[-.045em]">Fresh component picks</h3>
                </div>
                <Link to="/gaming-pcs" className="icon-btn" aria-label="Open component catalog"><ArrowRight className="h-4 w-4" /></Link>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                {components.slice(0, 6).map((part) => (
                  <PartPick key={part.id} part={part} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container-max py-7">
          <div className="home-card grid gap-5 p-5 sm:p-6 lg:grid-cols-[1.15fr_.85fr]">
            <div>
              <p className="kicker mb-5">Standard</p>
              <div className="grid gap-3 md:grid-cols-3">
                {[
                  [Gauge, 'Thermal balance', 'Airflow checked before listing.'],
                  [PackageCheck, 'Bench tested', 'Every system has a review path.'],
                  [ShieldCheck, 'Priority care', 'Clear support after purchase.'],
                ].map(([Icon, label, copy]) => (
                  <div key={label} className="rounded-[20px] border border-[var(--line)] bg-white/[.025] p-4">
                    <Icon className="mb-5 h-5 w-5 text-[var(--ink)]" />
                    <h3 className="font-black tracking-[-.03em]">{label}</h3>
                    <p className="mt-2 text-sm leading-6 muted">{copy}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex min-h-64 flex-col justify-between rounded-[24px] border border-[var(--line)] bg-[#15171c] p-5">
              <div>
                <p className="mb-3 text-xs font-black uppercase tracking-[.12em] muted">Custom route</p>
                <h2 className="text-4xl font-black leading-[.9] tracking-[-.065em]">Configure from scratch.</h2>
              </div>
              <Link to="/build" className="btn-primary mt-8 w-fit">
                Open builder <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="container-max grid gap-3 py-8 md:grid-cols-3">
          {testimonials.slice(0, 3).map((t) => (
            <blockquote key={t.id} className="panel rounded-[30px] p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--ink)] text-xs font-black text-[var(--canvas)]">{t.initials}</span>
                <Check className="h-4 w-4 text-[var(--success)]" />
              </div>
              <p className="line-clamp-3 text-sm leading-6 muted">{t.body}</p>
            </blockquote>
          ))}
        </section>
      </main>
    </RetailLayout>
  )
}

function SectionTitle({ kicker, title, to, compact = false }) {
  return (
    <div className={`${compact ? 'mb-4' : 'mb-5'} flex items-end justify-between gap-4`}>
      <div>
        <p className="kicker mb-2">{kicker}</p>
        <h2 className={`${compact ? 'text-3xl' : 'text-4xl'} font-black tracking-[-.065em]`}>{title}</h2>
      </div>
      <Link to={to} className="icon-btn" aria-label={`Open ${title}`}><ArrowRight className="h-4 w-4" /></Link>
    </div>
  )
}

function SystemCard({ pc, index }) {
  const image = pc.case?.image || pc.gpu?.image || pc.cpu?.image
  return (
    <article className="group overflow-hidden rounded-[24px] border border-[var(--line)] bg-[#111216] shadow-[0_14px_40px_rgba(0,0,0,.28)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--line-strong)]">
      <div className="relative grid h-56 place-items-center bg-[#f7f7f3] p-5">
        <span className="absolute left-3 top-3 rounded-full bg-black px-2.5 py-1 text-[10px] font-black uppercase tracking-[.05em] text-white">
          {index === 0 ? 'Best value' : pc.badge}
        </span>
        <img src={image} alt={pc.name} width="360" height="250" className="h-44 w-full object-contain transition duration-300 group-hover:scale-[1.025]" loading="lazy" decoding="async" />
      </div>
      <div className="p-4">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-xl font-black tracking-[-.04em]">{pc.name}</h3>
            <div className="mt-2 flex gap-2 text-xs font-bold muted">
              <span>{pc.fps_1080p} / 1080</span>
              <span>{pc.fps_1440p} / 1440</span>
            </div>
          </div>
          <div className="price whitespace-nowrap text-xl font-black">{formatINR(pc.price)}</div>
        </div>
        <div className="grid gap-2 text-xs font-bold muted">
          <div className="truncate">{pc.cpu?.name}</div>
          <div className="truncate">{pc.gpu?.name}</div>
        </div>
      </div>
    </article>
  )
}

function PartPick({ part }) {
  return (
    <Link to="/gaming-pcs" className="group grid min-h-[182px] grid-rows-[92px_1fr] overflow-hidden rounded-[22px] border border-[var(--line)] bg-white/[.025] transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--surface-hover)]">
      <div className="relative grid place-items-center bg-white">
        <img src={part.image} alt={part.name} width="180" height="110" className="h-full w-full object-contain p-3 transition duration-200 group-hover:scale-[1.035]" loading="lazy" decoding="async" />
        <span className="absolute left-2 top-2 h-2 w-2 rounded-full bg-[var(--success)]" aria-label="In stock" />
      </div>
      <div className="flex min-w-0 flex-col justify-between p-3">
        <div>
          <div className="truncate text-[10px] font-black uppercase tracking-[.1em] muted">{part.brand || part.category}</div>
          <h3 className="mt-1 line-clamp-2 text-xs font-black leading-4">{part.name}</h3>
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="price text-base font-black">{formatINR(part.price)}</div>
          <ArrowRight className="h-3.5 w-3.5 muted transition group-hover:translate-x-0.5 group-hover:text-[var(--ink)]" />
        </div>
      </div>
    </Link>
  )
}

function ReelCard({ reel, image, index, reduceMotion }) {
  return (
    <motion.a
      href={reel.url}
      target="_blank"
      rel="noreferrer"
      className="group overflow-hidden rounded-[24px] border border-[var(--line)] bg-[#111216] shadow-[0_14px_40px_rgba(0,0,0,.28)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--line-strong)]"
      initial={reduceMotion ? false : { opacity: 0, transform: 'translateY(10px) scale(.985)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.24, delay: index * 0.045, ease: easeOut }}
    >
      <div className="relative grid h-64 place-items-center bg-[#f7f7f3] p-5">
        {image && <img src={image} alt="" width="320" height="240" className="h-48 w-full object-contain transition duration-300 group-hover:scale-[1.025]" loading="lazy" decoding="async" />}
        <span className="absolute left-3 top-3 rounded-full bg-black px-2.5 py-1 text-[10px] font-black uppercase tracking-[.05em] text-white">Reel</span>
        <span className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white text-black shadow-[0_12px_30px_rgba(0,0,0,.22)]">
          <Play className="h-4 w-4 fill-current" />
        </span>
      </div>
      <div className="p-4">
        <div className="line-clamp-2 text-lg font-black leading-5 tracking-[-.04em]">{reel.title}</div>
        <div className="mt-1 text-xs font-bold muted">{reel.meta}</div>
      </div>
    </motion.a>
  )
}

function AdvisorCard({ card, index, reduceMotion }) {
  const Icon = card.icon
  const system = card.system
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, transform: 'translateY(8px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.22, delay: index * 0.04, ease: easeOut }}
    >
      <Link to={card.to} className="group grid min-h-[154px] gap-3 rounded-[24px] border border-[var(--line)] bg-white/[.025] p-4 transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--surface-hover)]">
        <div className="flex items-start justify-between gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--surface-2)] text-[var(--ink)]">
            <Icon className="h-4 w-4" />
          </span>
          <div className="price whitespace-nowrap text-lg font-black">{system ? formatINR(system.price) : 'Custom'}</div>
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-lg font-black tracking-[-.04em]">{card.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm leading-5 muted">{card.copy}</p>
        </div>
        <div className="flex items-center justify-between gap-3">
          {system && (
            <div className="flex min-w-0 flex-wrap gap-1.5">
              {(system.use_cases || ['Ready system']).slice(0, 2).map((item) => (
                <span key={item} className="rounded-full border border-[var(--line)] px-2.5 py-1 text-[11px] font-bold muted">{item}</span>
              ))}
            </div>
          )}
          <ArrowRight className="h-4 w-4 shrink-0 muted transition group-hover:translate-x-0.5 group-hover:text-[var(--ink)]" />
        </div>
      </Link>
    </motion.div>
  )
}
