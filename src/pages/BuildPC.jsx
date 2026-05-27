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
  Save,
  ShoppingCart,
  Snowflake,
  Zap,
} from 'lucide-react'
import RetailLayout from '@/components/retail/RetailLayout'
import { fetchComponents } from '@/lib/supabase'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'
import { formatINR } from '@/utils/currency'
import useStore from '@/store/useStore'

const steps = [
  { key: 'cpu', label: 'Processor', short: 'CPU', icon: Cpu },
  { key: 'gpu', label: 'Graphics card', short: 'GPU', icon: Monitor },
  { key: 'ram', label: 'Memory', short: 'RAM', icon: MemoryStick },
  { key: 'storage', label: 'Storage', short: 'SSD', icon: HardDrive },
  { key: 'cooler', label: 'Cooling', short: 'Cooler', icon: Snowflake },
  { key: 'case', label: 'Cabinet', short: 'Case', icon: Gauge },
]

const wattage = { cpu: 125, gpu: 180, ram: 8, storage: 7, cooler: 12, case: 20 }
const easeOut = [0.23, 1, 0.32, 1]

export default function BuildPC() {
  const [active, setActive] = useState('cpu')
  const [build, setBuild] = useState({})
  const reduceMotion = useReducedMotion()
  const { data: result = [], loading, error } = useSupabaseQuery(() => fetchComponents(), [])
  const data = Array.isArray(result) ? result : []
  const { addToCart, saveBuild } = useStore()

  const grouped = useMemo(() => {
    return steps.reduce((acc, step) => {
      acc[step.key] = data.filter((part) => part.category === step.key).sort((a, b) => a.price - b.price)
      return acc
    }, {})
  }, [data])

  const activeStep = steps.find((step) => step.key === active) || steps[0]
  const selected = Object.values(build).filter(Boolean)
  const activeParts = grouped[active] || []
  const activePart = build[active]
  const previewImage = build.case?.image || build.gpu?.image || build.cpu?.image || activePart?.image
  const price = selected.reduce((sum, part) => sum + part.price, 0)
  const draw = selected.reduce((sum, part) => sum + (part.wattage || wattage[part.category] || 25), 0)
  const psu = selected.length ? Math.ceil((draw * 1.35) / 50) * 50 : 0
  const score = selected.length ? Math.round(selected.reduce((sum, part) => sum + (part.score || 72), 0) / selected.length) : 0
  const progress = Math.round((selected.length / steps.length) * 100)
  const cpuScore = build.cpu?.score || 0
  const gpuScore = build.gpu?.score || 0
  const bottleneck = cpuScore && gpuScore && Math.abs(cpuScore - gpuScore) > 16
    ? cpuScore < gpuScore ? 'CPU tier is behind the GPU.' : 'GPU tier is behind the CPU.'
    : null

  const selectPart = (part) => {
    setBuild((current) => ({ ...current, [active]: part }))
    const index = steps.findIndex((step) => step.key === active)
    if (index < steps.length - 1) setActive(steps[index + 1].key)
  }

  const orderBuild = () => {
    addToCart({
      id: `custom-${Date.now()}`,
      name: 'Custom Challenger Build',
      price,
      image: previewImage,
      specs: build,
    })
  }

  return (
    <RetailLayout>
      <main className="container-max py-6 lg:py-8">
        <section className="mb-5 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="kicker mb-3"><Zap className="h-4 w-4" /> Configurator</p>
            <h1 className="max-w-4xl text-[46px] font-black leading-[.88] tracking-[-.075em] sm:text-[72px]">
              Build with restraint.
            </h1>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <Metric value={`${progress}%`} label="Done" />
            <Metric value={score || '-'} label="Score" />
            <Metric value={psu ? `${psu}W` : '-'} label="PSU" />
          </div>
        </section>

        {error && <div className="panel mb-4 rounded-[20px] p-4 text-sm font-bold text-red-200">{error.message}</div>}

        <section className="grid gap-4 xl:grid-cols-[390px_minmax(0,1fr)]">
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
            psu={psu}
            reduceMotion={reduceMotion}
            saveBuild={() => saveBuild('Custom Challenger Build')}
            score={score}
            selected={selected}
          />

          <section className="min-w-0">
            <StepTabs active={active} build={build} setActive={setActive} />

            <div className="panel mt-4 rounded-[30px] p-4">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="kicker mb-1">Select part</p>
                  <h2 className="text-3xl font-black tracking-[-.055em]">{activeStep.label}</h2>
                </div>
                <span className="rounded-full bg-[var(--surface-2)] px-3 py-1 text-xs font-black muted">{activeParts.length} options</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  className="grid gap-3 md:grid-cols-2 2xl:grid-cols-3"
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
            </div>
          </section>
        </section>
      </main>
    </RetailLayout>
  )
}

function StepTabs({ active, build, setActive }) {
  return (
    <nav className="surface grid gap-1 rounded-[28px] p-1.5 sm:grid-cols-3 xl:grid-cols-6" aria-label="Build steps">
      {steps.map((step, index) => {
        const Icon = step.icon
        const selected = build[step.key]
        return (
          <button
            type="button"
            key={step.key}
            onClick={() => setActive(step.key)}
            className={`group min-h-[76px] rounded-[22px] border px-3 py-3 text-left transition-[transform,background,border-color,box-shadow] duration-200 active:scale-[.985] ${
              active === step.key
                ? 'border-[var(--accent-blue)] bg-[var(--surface-2)] shadow-[0_0_0_1px_var(--accent-blue-soft)]'
                : selected
                  ? 'border-white/12 bg-white/[.04]'
                  : 'border-transparent hover:bg-white/[.055]'
            }`}
          >
            <div className="mb-3 flex items-center justify-between">
              <Icon className="h-4 w-4" />
              <span className="font-mono text-[10px] font-black muted">{String(index + 1).padStart(2, '0')}</span>
            </div>
            <div className="text-sm font-black leading-4">{step.short}</div>
            <div className="mt-1 truncate text-[11px] font-bold muted">{selected?.brand || step.label}</div>
          </button>
        )
      })}
    </nav>
  )
}

function BuildPreview({ activeStep, activePart, build, bottleneck, draw, orderBuild, previewImage, price, progress, psu, reduceMotion, saveBuild, score, selected }) {
  const Icon = activeStep.icon
  const ready = selected.length >= 2

  return (
    <aside className="panel overflow-hidden rounded-[34px] p-4 xl:sticky xl:top-24 xl:self-start">
      <div className="relative overflow-hidden rounded-[28px] border border-[var(--line)] bg-[#0c0d10]">
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <div className="relative grid min-h-[350px] place-items-center p-5">
          <div className="absolute inset-5 rounded-[28px] border border-white/8" />
          <div className="absolute inset-12 rounded-full border border-white/8" />
          <AnimatePresence mode="wait">
            {previewImage ? (
              <motion.img
                key={previewImage}
                src={previewImage}
                alt={activePart?.name || 'Selected build'}
                width="520"
                height="420"
                className="relative z-10 h-64 w-full object-contain p-4"
                decoding="async"
                initial={reduceMotion ? false : { opacity: 0, filter: 'blur(6px)', transform: 'scale(0.96)' }}
                animate={{ opacity: 1, filter: 'blur(0px)', transform: 'scale(1)' }}
                exit={{ opacity: 0, filter: 'blur(3px)', transform: 'scale(0.985)' }}
                transition={{ duration: 0.22, ease: easeOut }}
              />
            ) : (
              <motion.div
                key={activeStep.key}
                className="relative z-10 grid h-32 w-32 place-items-center rounded-full bg-[var(--surface-2)]"
                initial={reduceMotion ? false : { opacity: 0, transform: 'scale(0.95)' }}
                animate={{ opacity: 1, transform: 'scale(1)' }}
                transition={{ duration: 0.18, ease: easeOut }}
              >
                <Icon className="h-12 w-12" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="border-t border-[var(--line)] bg-[var(--surface-1)] p-4">
          <div className="mb-3 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-[11px] font-black uppercase tracking-[.12em] muted">Current focus</div>
              <div className="mt-1 truncate text-lg font-black tracking-[-.04em]">{activePart?.name || activeStep.label}</div>
            </div>
            <div className="price shrink-0 text-xl font-black">{formatINR(price)}</div>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div className="h-full rounded-full bg-[var(--ink)]" animate={{ width: `${progress}%` }} transition={{ duration: 0.2, ease: easeOut }} />
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <Metric value={score || '-'} label="Score" />
        <Metric value={draw ? `${draw}W` : '-'} label="Draw" />
        <Metric value={psu ? `${psu}W` : '-'} label="PSU" />
      </div>

      {bottleneck && (
        <motion.div
          className="mt-3 flex gap-2 rounded-[18px] border border-[var(--warning)]/25 bg-white/[.035] p-3 text-xs font-bold text-[#ffdf8a]"
          initial={reduceMotion ? false : { opacity: 0, transform: 'translateY(6px) scale(0.985)' }}
          animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
          transition={{ duration: 0.18, ease: easeOut }}
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{bottleneck}</span>
        </motion.div>
      )}

      <div className="mt-4 grid gap-1.5">
        {steps.map((step) => (
          <SpecRow key={step.key} step={step} part={build[step.key]} />
        ))}
      </div>

      <Compatibility build={build} score={score} draw={draw} psu={psu} />

      <div className="mt-4 grid gap-2">
        <button type="button" disabled={!ready} onClick={orderBuild} className="btn-primary w-full active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-40">
          <ShoppingCart className="h-4 w-4" /> Add build
        </button>
        <button type="button" disabled={!selected.length} onClick={saveBuild} className="btn-secondary w-full active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-40">
          <Save className="h-4 w-4" /> Save configuration
        </button>
      </div>
    </aside>
  )
}

function SpecRow({ step, part }) {
  return (
    <div className="grid grid-cols-[58px_1fr_auto] items-center gap-2 rounded-[15px] border border-white/8 bg-white/[.025] px-3 py-2 text-xs">
      <span className="font-black muted">{step.short}</span>
      <span className="truncate font-bold text-white/72">{part?.name || 'Not selected'}</span>
      {part ? <Check className="h-4 w-4 text-[var(--success)]" /> : <span className="h-1.5 w-1.5 rounded-full bg-white/20" />}
    </div>
  )
}

function PartCard({ part, index, selected, onClick, reduceMotion }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`group overflow-hidden rounded-[24px] border text-left transition-[transform,background,border-color,box-shadow] duration-200 active:scale-[.99] ${
        selected
          ? 'border-[var(--accent-blue)] bg-[var(--surface-2)] shadow-[0_0_0_1px_var(--accent-blue-soft)]'
          : 'border-[var(--line)] bg-white/[.025] hover:-translate-y-0.5 hover:bg-white/[.055]'
      }`}
      initial={reduceMotion ? false : { opacity: 0, transform: 'translateY(8px) scale(0.99)' }}
      animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
      transition={{ duration: 0.19, delay: reduceMotion ? 0 : Math.min(index * 0.025, 0.14), ease: easeOut }}
    >
      <div className="product-image-box relative grid h-44 place-items-center border-b border-[var(--line)] bg-white">
        <img src={part.image} alt={part.name} width="320" height="240" className="h-full w-full object-contain p-5 transition duration-200 group-hover:scale-[1.035]" loading="lazy" decoding="async" />
        {selected && (
          <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-[var(--ink)] text-[var(--canvas)]">
            <CheckCircle2 className="h-4 w-4" />
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="truncate rounded-full bg-[var(--surface-2)] px-2.5 py-1 text-[10px] font-black uppercase tracking-wide muted">{part.brand || part.category}</span>
          <span className="rounded-full bg-white/[.045] px-2.5 py-1 text-[10px] font-black text-white/60">{part.tier || 'catalog'}</span>
        </div>
        <h3 className="truncate-2 min-h-[44px] text-[15px] font-black leading-[22px]">{part.name}</h3>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <div className="price text-xl font-black">{formatINR(part.price)}</div>
            {part.mrp && <div className="price text-xs font-semibold muted line-through">{formatINR(part.mrp)}</div>}
          </div>
          <span className="text-xs font-black muted">Score {part.score || 72}</span>
        </div>
      </div>
    </motion.button>
  )
}

function Compatibility({ build, score, draw, psu }) {
  const rows = [
    ['CPU/GPU', build.cpu && build.gpu ? 'Linked' : 'Pending', build.cpu && build.gpu],
    ['Power', psu && draw ? `${psu - draw}W spare` : 'Pending', psu && draw && psu > draw],
    ['Thermals', build.cooler && build.case ? 'Mapped' : 'Pending', build.cooler && build.case],
    ['Balance', score ? `${score}/100` : 'Pending', score >= 70],
  ]

  return (
    <div className="mt-4 grid grid-cols-2 gap-1.5">
      {rows.map(([label, value, ok]) => (
        <div key={label} className="rounded-[15px] border border-[var(--line)] bg-white/[.02] p-2.5">
          <div className="text-[11px] font-black muted">{label}</div>
          <div className={`mt-1 truncate text-xs font-black ${ok ? 'text-[var(--success)]' : 'muted'}`}>{value}</div>
        </div>
      ))}
    </div>
  )
}

function Metric({ value, label }) {
  return (
    <div className="rounded-[16px] border border-white/10 bg-white/[.025] p-2.5">
      <div className="font-mono text-base font-black text-[var(--ink)]">{value}</div>
      <div className="text-[10px] font-black uppercase tracking-[.08em] muted">{label}</div>
    </div>
  )
}

function PartSkeleton() {
  return (
    <div className="overflow-hidden rounded-[24px] border border-[var(--line)] bg-white/[.025]">
      <div className="h-44 animate-pulse bg-white/8" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-24 animate-pulse rounded-full bg-white/8" />
        <div className="h-5 w-full animate-pulse rounded-full bg-white/8" />
        <div className="h-5 w-2/3 animate-pulse rounded-full bg-white/8" />
        <div className="h-8 w-28 animate-pulse rounded-full bg-white/8" />
      </div>
    </div>
  )
}
