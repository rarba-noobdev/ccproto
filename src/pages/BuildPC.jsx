import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Cpu,
  Gauge,
  HardDrive,
  MemoryStick,
  Monitor,
  PackageCheck,
  Save,
  Search,
  ShieldCheck,
  ShoppingCart,
  Snowflake,
  Zap,
} from 'lucide-react'
import RetailLayout from '@/components/retail/RetailLayout'
import { fetchComponents } from '@/lib/supabase'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'
import { formatINR } from '@/utils/currency'
import useStore from '@/store/useStore'

const builderHero = 'https://www.corsair.com/pc-builder/WYSIWYG/welcome_2023.webp'
const showcaseImage = 'https://d1q3zw97enxzq2.cloudfront.net/images/WhiteAIR5400.width-1000.format-webp.webp'

const steps = [
  { key: 'case', label: 'Case', short: 'CASE', icon: Gauge },
  { key: 'cpu', label: 'Processor', short: 'CPU', icon: Cpu },
  { key: 'gpu', label: 'Graphics card', short: 'GPU', icon: Monitor },
  { key: 'ram', label: 'Memory', short: 'RAM', icon: MemoryStick },
  { key: 'storage', label: 'Storage', short: 'SSD', icon: HardDrive },
  { key: 'cooler', label: 'Cooling', short: 'AIO', icon: Snowflake },
  { key: 'psu', label: 'Power supply', short: 'PSU', icon: Zap },
]

const wattage = { cpu: 125, gpu: 220, ram: 10, storage: 8, cooler: 18, case: 12, psu: 0 }
const easeOut = [0.23, 1, 0.32, 1]

export default function BuildPC() {
  const [active, setActive] = useState('case')
  const [build, setBuild] = useState({})
  const [query, setQuery] = useState('')
  const reduceMotion = useReducedMotion()
  const { data: result = [], loading, error } = useSupabaseQuery(() => fetchComponents(), [])
  const data = Array.isArray(result) ? result : []
  const { addToCart, saveBuild, setBuilderComponent } = useStore()

  const grouped = useMemo(() => {
    return steps.reduce((acc, step) => {
      acc[step.key] = data
        .filter((part) => part.category === step.key)
        .sort((a, b) => {
          const corsairA = a.brand === 'Corsair' ? 0 : 1
          const corsairB = b.brand === 'Corsair' ? 0 : 1
          if (corsairA !== corsairB) return corsairA - corsairB
          return a.price - b.price
        })
      return acc
    }, {})
  }, [data])

  const activeStep = steps.find((step) => step.key === active) || steps[0]
  const selected = Object.values(build).filter(Boolean)
  const activeParts = (grouped[active] || []).filter((part) => {
    if (!query.trim()) return true
    const haystack = `${part.name} ${part.brand} ${part.sub_category}`.toLowerCase()
    return haystack.includes(query.toLowerCase())
  })
  const activePart = build[active]
  const previewImage = build.case?.image || activePart?.image || showcaseImage
  const price = selected.reduce((sum, part) => sum + part.price, 0)
  const draw = selected.reduce((sum, part) => sum + (part.wattage || wattage[part.category] || 25), 0)
  const psuHeadroom = build.psu?.wattage ? build.psu.wattage - draw : 0
  const score = selected.length ? Math.round(selected.reduce((sum, part) => sum + (part.score || 72), 0) / selected.length) : 0
  const progress = Math.round((selected.length / steps.length) * 100)
  const cpuScore = build.cpu?.score || 0
  const gpuScore = build.gpu?.score || 0
  const bottleneck = cpuScore && gpuScore && Math.abs(cpuScore - gpuScore) > 16
    ? cpuScore < gpuScore ? 'Processor tier is behind the graphics card.' : 'Graphics card tier is behind the processor.'
    : null

  const selectPart = (part) => {
    setBuild((current) => ({ ...current, [active]: part }))
    setBuilderComponent(active, part)
    const index = steps.findIndex((step) => step.key === active)
    if (index < steps.length - 1) setActive(steps[index + 1].key)
  }

  const orderBuild = () => {
    addToCart({
      id: `custom-${Date.now()}`,
      name: 'Custom PC Build',
      price,
      image: previewImage,
      specs: build,
    })
  }

  return (
    <RetailLayout>
      <main className="container-max py-5 lg:py-7">
        <section className="mb-4 overflow-hidden rounded-[34px] border border-[var(--line)] bg-[var(--surface-1)] shadow-[0_18px_52px_rgba(38,38,38,.08)]">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_420px]">
            <div className="p-5 sm:p-7 lg:p-8">
              <p className="kicker mb-3">PC Builder</p>
              <h1 className="max-w-3xl text-[42px] font-bold leading-[.9] tracking-[-.07em] sm:text-[62px]">
                Plan the build before the invoice.
              </h1>
              <div className="mt-5 grid max-w-3xl gap-2 sm:grid-cols-3">
                {[
                  [PackageCheck, 'Compatible picks'],
                  [ShieldCheck, 'Live quote'],
                  [Zap, 'Fast checkout'],
                ].map(([Icon, label]) => (
                  <div key={label} className="flex items-center gap-2 rounded-[18px] border border-[var(--line)] bg-[var(--surface-2)] px-3 py-2.5">
                    <Icon className="h-4 w-4 text-[var(--accent-heat)]" />
                    <span className="text-xs font-bold">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative min-h-[220px] overflow-hidden bg-[#f3f0e9]">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(38,38,38,.055)_0_1px,transparent_1px_20px)]" />
              <img
                src={builderHero}
                alt="PC builder setup"
                width="620"
                height="380"
                className="relative h-full min-h-[220px] w-full object-cover"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>
        </section>

        {error && <div className="panel mb-4 rounded-[20px] p-4 text-sm font-bold text-red-700">{error.message}</div>}

        <section className="grid gap-4 xl:grid-cols-[220px_minmax(0,1fr)_360px]">
          <StepRail active={active} build={build} grouped={grouped} progress={progress} setActive={setActive} />

          <section className="min-w-0 rounded-[30px] border border-[var(--line)] bg-[var(--surface-1)] p-4 shadow-[0_14px_42px_rgba(38,38,38,.07)]">
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="kicker mb-1">Choose component</p>
                <h2 className="text-3xl font-bold tracking-[-.055em]">{activeStep.label}</h2>
              </div>
              <label className="flex h-11 min-w-0 items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface-2)] px-4 md:w-72">
                <Search className="h-4 w-4 text-[var(--ink-muted)]" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Filter parts"
                  className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none placeholder:text-[var(--ink-muted)]"
                />
              </label>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-3"
                initial={reduceMotion ? false : { opacity: 0, transform: 'translateY(8px)' }}
                animate={{ opacity: 1, transform: 'translateY(0px)' }}
                exit={{ opacity: 0, transform: 'translateY(-4px)' }}
                transition={{ duration: 0.2, ease: easeOut }}
              >
                {loading && Array.from({ length: 8 }).map((_, index) => <PartSkeleton key={index} />)}
                {!loading && activeParts.map((part, index) => (
                  <PartCard
                    key={part.id}
                    part={part}
                    index={index}
                    selected={build[active]?.id === part.id}
                    onClick={() => selectPart(part)}
                    reduceMotion={reduceMotion}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </section>

          <BuildPreview
            activeStep={activeStep}
            activePart={activePart}
            build={build}
            bottleneck={bottleneck}
            draw={draw}
            orderBuild={orderBuild}
            previewImage={previewImage}
            price={price}
            progress={progress}
            psuHeadroom={psuHeadroom}
            reduceMotion={reduceMotion}
            saveBuild={() => saveBuild('Custom PC Build')}
            score={score}
            selected={selected}
          />
        </section>
      </main>
    </RetailLayout>
  )
}

function StepRail({ active, build, grouped, progress, setActive }) {
  return (
    <aside className="rounded-[30px] border border-[var(--line)] bg-[var(--surface-1)] p-3 shadow-[0_14px_42px_rgba(38,38,38,.07)] xl:sticky xl:top-24 xl:self-start">
      <div className="mb-3 rounded-[22px] bg-[var(--surface-2)] p-4">
        <div className="text-[11px] font-bold uppercase tracking-[.12em] muted">Progress</div>
        <div className="mt-1 text-3xl font-bold tracking-[-.06em]">{progress}%</div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-black/10">
          <div className="h-full rounded-full bg-[var(--ink)] transition-all duration-200" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <nav className="grid gap-1.5" aria-label="Build steps">
        {steps.map((step, index) => {
          const Icon = step.icon
          const selected = build[step.key]
          const options = grouped[step.key]?.length || 0
          return (
            <button
              type="button"
              key={step.key}
              onClick={() => setActive(step.key)}
              className={`group rounded-[18px] border px-3 py-2.5 text-left transition duration-200 active:scale-[.985] ${
                active === step.key
                  ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--canvas)]'
                  : selected
                    ? 'border-[var(--line)] bg-[var(--surface-2)]'
                    : 'border-transparent hover:bg-[var(--surface-hover)]'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-bold">{step.short}</span>
                </span>
                {selected ? <Check className="h-4 w-4" /> : <span className="font-mono text-[10px] font-bold">{String(index + 1).padStart(2, '0')}</span>}
              </div>
              <div className={`mt-1 truncate text-[11px] font-bold ${active === step.key ? 'text-white/68' : 'muted'}`}>
                {selected?.brand || `${options} options`}
              </div>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

function BuildPreview({ activeStep, activePart, build, bottleneck, draw, orderBuild, previewImage, price, progress, psuHeadroom, reduceMotion, saveBuild, score, selected }) {
  const Icon = activeStep.icon
  const ready = selected.length >= 3

  return (
    <aside className="overflow-hidden rounded-[30px] border border-[var(--line)] bg-[var(--surface-1)] p-3 shadow-[0_14px_42px_rgba(38,38,38,.08)] xl:sticky xl:top-24 xl:self-start">
      <div className="relative overflow-hidden rounded-[24px] border border-[var(--line)] bg-[#f3f0e9]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(38,38,38,.055)_0_1px,transparent_1px_20px)]" />
        <div className="relative grid min-h-[238px] place-items-center p-5">
          <AnimatePresence mode="wait">
            {previewImage ? (
              <motion.img
                key={previewImage}
                src={previewImage}
                alt={activePart?.name || 'Selected build'}
                width="520"
                height="420"
                className="relative z-10 h-52 w-full object-contain drop-shadow-[0_18px_20px_rgba(0,0,0,.16)]"
                decoding="async"
                initial={reduceMotion ? false : { opacity: 0, filter: 'blur(6px)', transform: 'scale(0.96)' }}
                animate={{ opacity: 1, filter: 'blur(0px)', transform: 'scale(1)' }}
                exit={{ opacity: 0, filter: 'blur(3px)', transform: 'scale(0.985)' }}
                transition={{ duration: 0.22, ease: easeOut }}
              />
            ) : (
              <motion.div
                key={activeStep.key}
                className="relative z-10 grid h-28 w-28 place-items-center rounded-full bg-white/60"
                initial={reduceMotion ? false : { opacity: 0, transform: 'scale(0.95)' }}
                animate={{ opacity: 1, transform: 'scale(1)' }}
                transition={{ duration: 0.18, ease: easeOut }}
              >
                <Icon className="h-10 w-10" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="p-2 pt-4">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[11px] font-bold uppercase tracking-[.12em] muted">Quote</div>
            <div className="mt-1 truncate text-lg font-bold tracking-[-.04em]">{activePart?.name || activeStep.label}</div>
          </div>
          <div className="price shrink-0 text-xl font-bold">{formatINR(price)}</div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <Metric value={score || '-'} label="Score" />
          <Metric value={draw ? `${draw}W` : '-'} label="Draw" />
          <Metric value={build.psu ? `${Math.max(0, psuHeadroom)}W` : '-'} label="Spare" />
        </div>

        {bottleneck && (
          <motion.div
            className="mt-3 flex gap-2 rounded-[16px] border border-[var(--warning)]/25 bg-[var(--accent-heat-soft)] p-3 text-xs font-bold text-[var(--warning)]"
            initial={reduceMotion ? false : { opacity: 0, transform: 'translateY(6px) scale(0.985)' }}
            animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
            transition={{ duration: 0.18, ease: easeOut }}
          >
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{bottleneck}</span>
          </motion.div>
        )}

        <div className="mt-3 grid gap-1.5">
          {steps.map((step) => (
            <SpecRow key={step.key} step={step} part={build[step.key]} />
          ))}
        </div>

        <div className="mt-4 grid gap-2">
          <button type="button" disabled={!ready} onClick={orderBuild} className="btn-primary w-full active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-40">
            <ShoppingCart className="h-4 w-4" /> Add build
          </button>
          <button type="button" disabled={!selected.length} onClick={saveBuild} className="btn-secondary w-full active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-40">
            <Save className="h-4 w-4" /> Save
          </button>
        </div>
      </div>
    </aside>
  )
}

function SpecRow({ step, part }) {
  return (
    <div className="grid grid-cols-[46px_1fr_auto] items-center gap-2 rounded-[14px] border border-[var(--line)] bg-[var(--surface-2)] px-3 py-2 text-xs">
      <span className="font-bold muted">{step.short}</span>
      <span className="truncate font-bold text-[var(--ink-soft)]">{part?.name || 'Not selected'}</span>
      {part ? <Check className="h-4 w-4 text-[var(--success)]" /> : <span className="h-1.5 w-1.5 rounded-full bg-black/20" />}
    </div>
  )
}

function PartCard({ part, index, selected, onClick, reduceMotion }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`group grid grid-cols-[104px_1fr] overflow-hidden rounded-[22px] border text-left transition duration-200 active:scale-[.99] ${
        selected
          ? 'border-[var(--ink)] bg-[var(--surface-2)] shadow-[0_0_0_1px_var(--ink)]'
          : 'border-[var(--line)] bg-[var(--surface-2)] hover:-translate-y-0.5 hover:bg-[var(--surface-hover)]'
      }`}
      initial={reduceMotion ? false : { opacity: 0, transform: 'translateY(8px) scale(0.99)' }}
      animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
      transition={{ duration: 0.19, delay: reduceMotion ? 0 : Math.min(index * 0.02, 0.12), ease: easeOut }}
    >
      <div className="relative grid min-h-[128px] place-items-center border-r border-[var(--line)] bg-white">
        <img src={part.image} alt={part.name} width="220" height="180" className="h-full max-h-[104px] w-full object-contain p-3 transition duration-200 group-hover:scale-[1.035]" loading="lazy" decoding="async" />
        {selected && (
          <span className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-[var(--ink)] text-[var(--canvas)]">
            <CheckCircle2 className="h-4 w-4" />
          </span>
        )}
      </div>
      <div className="flex min-w-0 flex-col p-3">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="truncate text-[10px] font-bold uppercase tracking-wide muted">{part.brand || part.category}</span>
          <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-[var(--ink-soft)]">{part.tier || 'catalog'}</span>
        </div>
        <h3 className="line-clamp-2 min-h-[38px] text-[13px] font-bold leading-[19px]">{part.name}</h3>
        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <div>
            <div className="price text-lg font-bold">{formatINR(part.price)}</div>
            {part.mrp && <div className="price text-[11px] font-semibold muted line-through">{formatINR(part.mrp)}</div>}
          </div>
          <span className="text-[11px] font-bold muted">{part.in_stock ? 'In stock' : 'Check stock'}</span>
        </div>
      </div>
    </motion.button>
  )
}

function Metric({ value, label }) {
  return (
    <div className="rounded-[14px] border border-[var(--line)] bg-[var(--surface-2)] p-2">
      <div className="font-mono text-sm font-bold text-[var(--ink)]">{value}</div>
      <div className="text-[9px] font-bold uppercase tracking-[.08em] muted">{label}</div>
    </div>
  )
}

function PartSkeleton() {
  return (
    <div className="grid grid-cols-[104px_1fr] overflow-hidden rounded-[22px] border border-[var(--line)] bg-[var(--surface-2)]">
      <div className="min-h-[128px] animate-pulse bg-black/10" />
      <div className="space-y-3 p-3">
        <div className="h-3 w-20 animate-pulse rounded-full bg-black/10" />
        <div className="h-4 w-full animate-pulse rounded-full bg-black/10" />
        <div className="h-4 w-2/3 animate-pulse rounded-full bg-black/10" />
        <div className="h-7 w-24 animate-pulse rounded-full bg-black/10" />
      </div>
    </div>
  )
}
