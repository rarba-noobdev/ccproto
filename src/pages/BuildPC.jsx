import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Cpu,
  Gauge,
  HardDrive,
  MemoryStick,
  Monitor,
  Save,
  Search,
  ShoppingBag,
  Snowflake,
  Zap,
} from 'lucide-react'
import RetailLayout from '@/components/retail/RetailLayout'
import PageHeader from '@/components/retail/PageHeader'
import { ErrorBanner } from '@/components/retail/StatusPanel'
import { HudMeter, LevelBadge, AchievementToast, PulseDot, GBadge, AnimatedNumber } from '@/components/ui/Hud'
import { fetchComponents } from '@/lib/supabase'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'
import { formatINR } from '@/utils/currency'
import useStore from '@/store/useStore'

const steps = [
  { key: 'case', label: 'Case', icon: Gauge },
  { key: 'cpu', label: 'Processor', icon: Cpu },
  { key: 'gpu', label: 'Graphics', icon: Monitor },
  { key: 'ram', label: 'Memory', icon: MemoryStick },
  { key: 'storage', label: 'Storage', icon: HardDrive },
  { key: 'cooler', label: 'Cooling', icon: Snowflake },
  { key: 'psu', label: 'Power', icon: Zap },
]

const wattage = { cpu: 125, gpu: 220, ram: 10, storage: 8, cooler: 18, case: 12, psu: 0 }
const easeOut = [0.23, 1, 0.32, 1]

export default function BuildPC() {
  const [active, setActive] = useState('case')
  const [build, setBuild] = useState({})
  const [query, setQuery] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [achievement, setAchievement] = useState(null)
  const reduceMotion = useReducedMotion()
  const { data: result = [], loading, error } = useSupabaseQuery(() => fetchComponents(), [])
  const data = Array.isArray(result) ? result : []
  const { addToCart, saveBuild, setBuilderComponent } = useStore()
  const tabRefs = useRef([])
  const liveRef = useRef(null)

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

  const activeIndex = steps.findIndex((step) => step.key === active)
  const activeStep = steps[activeIndex] || steps[0]
  const selected = Object.values(build).filter(Boolean)
  const activeParts = (grouped[active] || []).filter((part) => {
    if (!query.trim()) return true
    return `${part.name} ${part.brand} ${part.sub_category}`.toLowerCase().includes(query.toLowerCase())
  })
  const activePart = build[active]
  const previewImage = build.case?.image || activePart?.image
  const price = selected.reduce((sum, part) => sum + part.price, 0)
  const draw = selected.reduce((sum, part) => sum + (part.wattage || wattage[part.category] || 25), 0)
  const psuHeadroom = build.psu?.wattage ? build.psu.wattage - draw : 0
  const score = selected.length ? Math.round(selected.reduce((sum, part) => sum + (part.score || 72), 0) / selected.length) : 0
  const progress = Math.round((selected.length / steps.length) * 100)
  const cpuScore = build.cpu?.score || 0
  const gpuScore = build.gpu?.score || 0
  const bottleneck = cpuScore && gpuScore && Math.abs(cpuScore - gpuScore) > 16
    ? cpuScore < gpuScore ? 'CPU tier trails GPU tier.' : 'GPU tier trails CPU tier.'
    : null
  const ready = selected.length >= 3

  // Announce step changes to assistive tech
  useEffect(() => {
    if (liveRef.current) {
      liveRef.current.textContent = `Step ${activeIndex + 1} of ${steps.length}: ${activeStep.label}. ${activeParts.length} options.`
    }
  }, [activeIndex, activeStep.label, activeParts.length])

  const moveTo = (key, focus = false) => {
    setActive(key)
    setQuery('')
    if (focus) {
      const idx = steps.findIndex((s) => s.key === key)
      requestAnimationFrame(() => tabRefs.current[idx]?.focus())
    }
  }

  const onTabKey = (event, currentIndex) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      const next = (currentIndex + 1) % steps.length
      moveTo(steps[next].key, true)
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      const next = (currentIndex - 1 + steps.length) % steps.length
      moveTo(steps[next].key, true)
    } else if (event.key === 'Home') {
      event.preventDefault()
      moveTo(steps[0].key, true)
    } else if (event.key === 'End') {
      event.preventDefault()
      moveTo(steps[steps.length - 1].key, true)
    }
  }

  const selectPart = (part) => {
    const wasUnset = !build[active]
    setBuild((current) => ({ ...current, [active]: part }))
    setBuilderComponent(active, part)
    if (wasUnset) {
      const newCount = selected.length + 1
      const milestones = {
        1: { title: 'First part locked in', sub: '+100 XP · keep going' },
        3: { title: 'Loadout primed', sub: 'Ready to order' },
        7: { title: 'Build complete', sub: 'All seven slots filled · S-class' },
      }
      const milestone = milestones[newCount]
      if (milestone) setAchievement({ ...milestone, id: Date.now() })
    }
    if (activeIndex < steps.length - 1) {
      setTimeout(() => moveTo(steps[activeIndex + 1].key), 120)
    }
  }

  const orderBuild = () => {
    addToCart({
      id: `custom-${Date.now()}`,
      name: 'Custom build',
      price,
      image: previewImage,
      specs: build,
    })
  }

  return (
    <RetailLayout>
      <PageHeader
        kicker="Issue 04 · Configurator"
        title="Plan, then ship."
        description="Compatible parts, live wattage, transparent quote."
      />

      <span ref={liveRef} role="status" aria-live="polite" className="sr-only" />

      <main className="container-max py-24 pb-[120px] lg:pb-32">
        {error && <ErrorBanner className="mb-16" message={error.message} />}

        {/* Step tablist */}
        <nav
          role="tablist"
          aria-label="Build steps"
          aria-orientation="horizontal"
          className="mb-16 grid gap-px border border-border-muted bg-line"
          style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon
            const isSelected = !!build[step.key]
            const isActive = active === step.key
            return (
              <button
                ref={(node) => { tabRefs.current[index] = node }}
                type="button"
                key={step.key}
                role="tab"
                id={`tab-${step.key}`}
                aria-selected={isActive}
                aria-controls="parts-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => moveTo(step.key)}
                onKeyDown={(event) => onTabKey(event, index)}
                className={`group flex flex-col items-start justify-between gap-12 px-12 py-14 text-left transition focus:outline-none focus-visible:bg-ink focus-visible:text-canvas md:px-16 md:py-16 ${
                  isActive
                    ? 'bg-ink text-canvas'
                    : isSelected
                      ? 'bg-surface-1 text-ink hover:bg-canvas'
                      : 'bg-surface-1 text-ink-soft hover:bg-canvas hover:text-ink'
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <span className={`meta ${isActive ? 'text-canvas/70' : ''}`}>{String(index + 1).padStart(2, '0')}</span>
                  {isSelected && (
                    <Check className={`h-12 w-12 ${isActive ? 'text-canvas' : 'text-ink'}`} aria-hidden="true" />
                  )}
                </div>
                <div className="flex items-center gap-8">
                  <Icon className="h-14 w-14 shrink-0" aria-hidden="true" />
                  <span className="hidden text-body-medium font-medium md:inline">{step.label}</span>
                  <span className="text-body-medium font-medium md:hidden">{step.label}</span>
                </div>
              </button>
            )
          })}
        </nav>

        {/* Build progress HUD */}
        <div className="mb-24 grid gap-16 border border-border-muted bg-surface-1 p-16 md:grid-cols-[auto_1fr_auto_auto] md:items-center md:gap-20">
          <LevelBadge score={score} size={48} />
          <HudMeter
            value={selected.length}
            max={steps.length}
            label={`Loadout · step ${activeIndex + 1} of ${steps.length}`}
            sublabel={`${progress}% complete`}
            tone="heat"
            suffix=""
          />
          <div className="flex items-center gap-8">
            <PulseDot tone={ready ? 'success' : 'heat'} />
            <span className="hud-label">{ready ? 'Ready to ship' : 'In progress'}</span>
          </div>
          <div className="text-right">
            <p className="hud-label">Total</p>
            <p className="price text-title-h5 font-semibold leading-none">
              <AnimatedNumber value={price} prefix="₹" />
            </p>
          </div>
        </div>

        {/* Achievement toast */}
        <div className="pointer-events-none fixed bottom-24 right-24 z-50 max-w-[320px]">
          <AchievementToast
            show={!!achievement}
            title={achievement?.title}
            sub={achievement?.sub}
            onClose={() => setAchievement(null)}
          />
        </div>

        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_380px] 2xl:grid-cols-[minmax(0,1fr)_420px]">
          {/* Parts panel */}
          <section
            id="parts-panel"
            role="tabpanel"
            aria-labelledby={`tab-${active}`}
            tabIndex={-1}
            className="min-w-0 border border-border-muted bg-surface-1"
          >
            <div className="flex flex-col gap-12 border-b border-border-muted p-20 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="meta">Pick a {activeStep.label.toLowerCase()}</p>
                <h2 className="mt-6 text-title-h3 font-semibold tracking-[-.025em]">{activeStep.label}</h2>
              </div>
              <label className="flex h-44 min-w-0 items-center gap-8 border border-border-muted bg-canvas px-14 md:w-[320px]">
                <Search className="h-14 w-14 shrink-0 text-ink-muted" aria-hidden="true" />
                <span className="sr-only">Filter {activeStep.label.toLowerCase()} parts</span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={(event) => { if (event.key === 'Escape') setQuery('') }}
                  placeholder={`Filter ${activeStep.label.toLowerCase()}`}
                  className="min-w-0 flex-1 bg-transparent text-body-medium outline-none placeholder:text-ink-muted"
                  aria-label={`Filter ${activeStep.label.toLowerCase()} parts`}
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="meta text-ink hover:underline focus:outline-none focus-visible:underline"
                    aria-label="Clear filter"
                  >
                    Clear
                  </button>
                )}
              </label>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="grid gap-px bg-line xs:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2, ease: easeOut }}
              >
                {loading && Array.from({ length: 8 }).map((_, index) => <PartSkeleton key={index} />)}
                {!loading && activeParts.length === 0 && (
                  <div className="col-span-full bg-surface-1 px-24 py-48 text-center">
                    <p className="meta">No matches</p>
                    <p className="mt-12 text-title-h5 font-semibold tracking-[-.02em]">Nothing in this filter</p>
                    <p className="mt-8 text-body-medium text-ink-soft">Try a shorter query or clear the filter.</p>
                  </div>
                )}
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

          {/* Desktop quote rail */}
          <aside className="hidden lg:block">
            <QuotePanel
              activeStep={activeStep}
              activePart={activePart}
              build={build}
              bottleneck={bottleneck}
              draw={draw}
              orderBuild={orderBuild}
              previewImage={previewImage}
              price={price}
              psuHeadroom={psuHeadroom}
              reduceMotion={reduceMotion}
              saveBuild={() => saveBuild('Custom build')}
              score={score}
              selected={selected}
              ready={ready}
              sticky
            />
          </aside>
        </div>
      </main>

      {/* Mobile sticky quote bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border-muted bg-surface-1 lg:hidden">
        <button
          type="button"
          onClick={() => setDrawerOpen((v) => !v)}
          className="flex w-full items-center justify-between px-16 py-12 focus:outline-none focus-visible:bg-canvas"
          aria-expanded={drawerOpen}
          aria-controls="mobile-quote"
        >
          <span>
            <span className="meta block">Quote · {selected.length}/{steps.length}</span>
            <span className="price mt-2 block text-title-h5 font-semibold">{formatINR(price)}</span>
          </span>
          <span className="flex items-center gap-8">
            <span className="meta">{drawerOpen ? 'Hide' : 'Review'}</span>
            {drawerOpen ? <ChevronDown className="h-16 w-16" aria-hidden="true" /> : <ChevronUp className="h-16 w-16" aria-hidden="true" />}
          </span>
        </button>
        <AnimatePresence>
          {drawerOpen && (
            <motion.div
              id="mobile-quote"
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: easeOut }}
              className="overflow-hidden border-t border-border-muted"
            >
              <div className="max-h-[60vh] overflow-y-auto">
                <QuotePanel
                  activeStep={activeStep}
                  activePart={activePart}
                  build={build}
                  bottleneck={bottleneck}
                  draw={draw}
                  orderBuild={() => { orderBuild(); setDrawerOpen(false) }}
                  previewImage={previewImage}
                  price={price}
                  psuHeadroom={psuHeadroom}
                  reduceMotion={reduceMotion}
                  saveBuild={() => saveBuild('Custom build')}
                  score={score}
                  selected={selected}
                  ready={ready}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </RetailLayout>
  )
}

function QuotePanel({ activeStep, activePart, build, bottleneck, draw, orderBuild, previewImage, price, psuHeadroom, reduceMotion, saveBuild, score, selected, ready, sticky = false }) {
  const Icon = activeStep.icon
  return (
    <div className={`flex flex-col border border-border-muted bg-surface-1 ${sticky ? 'lg:sticky lg:top-24' : ''}`}>
      <div className="flex items-center justify-between border-b border-border-muted px-20 py-12">
        <p className="meta">Preview · {activeStep.label}</p>
        <p className="meta">{selected.length}/{7}</p>
      </div>
      <div className="product-image-box relative grid min-h-[200px] place-items-center px-20 py-24">
        <AnimatePresence mode="wait">
          {previewImage ? (
            <motion.img
              key={previewImage}
              src={previewImage}
              alt={activePart?.name || 'Build preview'}
              width="520"
              height="420"
              className="relative max-h-[180px] w-full object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,.16)]"
              decoding="async"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.22, ease: easeOut }}
            />
          ) : (
            <motion.div
              key={activeStep.key}
              className="grid h-[100px] w-[100px] place-items-center border border-border-muted bg-surface-1 text-ink-muted"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.18 }}
            >
              <Icon className="h-32 w-32" aria-hidden="true" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="border-t border-border-muted px-20 py-16">
        <div className="flex items-start justify-between gap-16">
          <div className="min-w-0">
            <p className="meta">Quote</p>
            <p className="mt-6 truncate text-body-medium font-semibold">{activePart?.name || 'Pick a part'}</p>
          </div>
          <p className="price shrink-0 text-title-h4 font-semibold">{formatINR(price)}</p>
        </div>

        <div className="mt-16 flex flex-col gap-14 border border-border-muted bg-canvas-soft p-14">
          <div className="flex items-center justify-between">
            <LevelBadge score={score} size={48} />
            <GBadge tone={ready ? 'heat' : 'canvas'}>{ready ? 'Battle-ready' : 'Building'}</GBadge>
          </div>
          <HudMeter value={score} max={100} label="Build score" tone="heat" suffix="" />
          <HudMeter value={draw} max={build.psu?.wattage || 850} label="Power draw" tone="ink" suffix="W" />
          {build.psu && (
            <HudMeter
              value={Math.max(0, psuHeadroom)}
              max={build.psu.wattage}
              label="PSU headroom"
              tone={psuHeadroom < 100 ? 'heat' : 'success'}
              suffix="W"
            />
          )}
        </div>

        {bottleneck && (
          <div role="status" className="mt-12 flex items-start gap-8 border border-accent-heat bg-surface-1 px-12 py-10 text-label-x-small font-medium text-ink">
            <AlertTriangle className="mt-1 h-14 w-14 shrink-0 text-accent-heat" aria-hidden="true" />
            <span>{bottleneck}</span>
          </div>
        )}

        <ul className="mt-16 divide-y divide-border-muted border-y border-border-muted">
          {steps.map((step) => (
            <SpecRow key={step.key} step={step} part={build[step.key]} />
          ))}
        </ul>

        <div className="mt-16 grid gap-8">
          <button type="button" disabled={!ready} onClick={orderBuild} className="btn-primary w-full disabled:opacity-40" data-tone="heat">
            <ShoppingBag className="h-14 w-14" aria-hidden="true" /> Add build
          </button>
          <button type="button" disabled={!selected.length} onClick={saveBuild} className="btn-secondary w-full disabled:opacity-40">
            <Save className="h-14 w-14" aria-hidden="true" /> Save
          </button>
        </div>
      </div>
    </div>
  )
}

function SpecRow({ step, part }) {
  return (
    <li className="flex items-center justify-between gap-8 py-10 text-label-x-small">
      <span className="meta">{step.label}</span>
      <span className="min-w-0 flex-1 truncate text-right text-ink-soft">{part?.name || '—'}</span>
      {part && <Check className="h-12 w-12 shrink-0 text-ink" aria-hidden="true" />}
    </li>
  )
}

function PartCard({ part, index, selected, onClick, reduceMotion }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group flex min-w-0 flex-col text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink ${
        selected ? 'bg-ink text-canvas' : 'bg-surface-1 text-ink hover:bg-canvas'
      }`}
      initial={reduceMotion ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.19, delay: reduceMotion ? 0 : Math.min(index * 0.02, 0.12), ease: easeOut }}
    >
      <div className={`flex items-center justify-between px-14 py-10 ${selected ? 'border-b border-canvas/15' : 'border-b border-border-muted'}`}>
        <span className={`meta ${selected ? 'text-canvas/70' : ''}`}>{part.brand || part.category}</span>
        {selected && <CheckCircle2 className="h-14 w-14" aria-hidden="true" />}
      </div>
      <div className={`relative grid h-[140px] place-items-center overflow-hidden ${selected ? 'bg-ink' : 'product-image-box'}`}>
        <img
          src={part.image}
          alt={part.name}
          width="220"
          height="180"
          className="relative max-h-[104px] w-[78%] max-w-[180px] object-contain transition duration-4 group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="flex flex-1 flex-col gap-8 p-14">
        <h3 className={`line-clamp-2 min-h-[40px] text-body-small font-semibold leading-20 ${selected ? 'text-canvas' : 'text-ink'}`}>{part.name}</h3>
        <div className="mt-auto flex items-end justify-between gap-8 pt-8">
          <div>
            <p className={`price text-body-medium font-semibold leading-none ${selected ? 'text-canvas' : ''}`}>{formatINR(part.price)}</p>
            {part.mrp && <p className={`price mt-4 text-label-x-small font-normal line-through ${selected ? 'text-canvas/60' : 'text-ink-muted'}`}>{formatINR(part.mrp)}</p>}
          </div>
          <span className={`meta ${selected ? 'text-canvas/70' : ''}`}>{part.in_stock ? 'In stock' : '—'}</span>
        </div>
      </div>
    </motion.button>
  )
}

function Metric({ value, label }) {
  return (
    <div className="bg-surface-1 px-8 py-12 text-center">
      <p className="text-body-medium font-semibold leading-none">{value}</p>
      <p className="meta mt-6">{label}</p>
    </div>
  )
}

function PartSkeleton() {
  return (
    <div className="bg-surface-1">
      <div className="border-b border-border-muted px-14 py-10">
        <div className="h-12 w-20 animate-pulse bg-surface-2" />
      </div>
      <div className="h-[140px] animate-pulse bg-surface-2" />
      <div className="space-y-10 p-14">
        <div className="h-14 w-full animate-pulse bg-surface-2" />
        <div className="h-14 w-2/3 animate-pulse bg-surface-2" />
        <div className="h-12 w-1/2 animate-pulse bg-surface-2" />
      </div>
    </div>
  )
}
