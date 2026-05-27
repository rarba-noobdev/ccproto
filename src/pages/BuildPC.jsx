import { useMemo, useState } from 'react'
import { AlertTriangle, CheckCircle2, Cpu, Gauge, HardDrive, MemoryStick, Monitor, Save, ShoppingCart, Snowflake } from 'lucide-react'
import RetailLayout from '@/components/retail/RetailLayout'
import PageHeader from '@/components/retail/PageHeader'
import { fetchComponents } from '@/lib/supabase'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'
import { formatINR } from '@/utils/currency'
import useStore from '@/store/useStore'

const steps = [
  { key: 'cpu', label: 'Processor', icon: Cpu },
  { key: 'gpu', label: 'Graphics card', icon: Monitor },
  { key: 'ram', label: 'Memory', icon: MemoryStick },
  { key: 'storage', label: 'Storage', icon: HardDrive },
  { key: 'cooler', label: 'Cooling', icon: Snowflake },
  { key: 'case', label: 'Cabinet', icon: Gauge },
]

const wattage = { cpu: 125, gpu: 180, ram: 8, storage: 7, cooler: 12, case: 20 }

export default function BuildPC() {
  const [active, setActive] = useState('cpu')
  const [build, setBuild] = useState({})
  const { data = [], loading, error } = useSupabaseQuery(() => fetchComponents(), [])
  const { addToCart, saveBuild } = useStore()

  const grouped = useMemo(() => {
    return steps.reduce((acc, step) => {
      acc[step.key] = data.filter((p) => p.category === step.key).sort((a, b) => a.price - b.price)
      return acc
    }, {})
  }, [data])

  const selected = Object.values(build).filter(Boolean)
  const price = selected.reduce((sum, p) => sum + p.price, 0)
  const draw = selected.reduce((sum, p) => sum + (p.wattage || wattage[p.category] || 25), 0)
  const score = selected.length ? Math.round(selected.reduce((sum, p) => sum + (p.score || 72), 0) / selected.length) : 0
  const progress = Math.round((selected.length / steps.length) * 100)
  const cpuScore = build.cpu?.score || 0
  const gpuScore = build.gpu?.score || 0
  const bottleneck = cpuScore && gpuScore && Math.abs(cpuScore - gpuScore) > 16
    ? cpuScore < gpuScore ? 'Processor is weaker than the graphics card. Move up one CPU tier.' : 'Graphics card is weaker than the processor. Spend more on GPU for gaming.'
    : null

  const selectPart = (part) => {
    setBuild((current) => ({ ...current, [active]: part }))
    const index = steps.findIndex((s) => s.key === active)
    if (index < steps.length - 1) setActive(steps[index + 1].key)
  }

  const orderBuild = () => {
    addToCart({
      id: `custom-${Date.now()}`,
      name: 'Custom Challenger Build',
      price,
      image: build.case?.image || build.gpu?.image || build.cpu?.image,
      specs: build,
    })
  }

  return (
    <RetailLayout>
      <PageHeader
        kicker="Custom PC builder"
        title="Build from real parts, not fictional SKUs"
        description="Select components from the Supabase catalog populated with scraped MD Computers products. Pricing, MRP, and imagery stay tied to real products."
      />

      <section className="container-max grid gap-6 py-10 lg:grid-cols-[1fr_380px]">
        <div>
          <div className="panel mb-5 rounded-2xl p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-black text-white/70">Build progress</span>
              <span className="font-mono text-sm font-black text-[#f26522]">{progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/8">
              <div className="h-full rounded-full bg-[#f26522]" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {steps.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  className={`rounded-lg border px-3 py-3 text-left transition ${active === key ? 'border-[#f26522] bg-[#f26522]/10' : build[key] ? 'border-[#28c76f]/35 bg-[#28c76f]/8' : 'border-white/10 bg-white/[.025]'}`}
                >
                  <Icon className="mb-2 h-4 w-4 text-white/62" />
                  <span className="block text-xs font-black">{label}</span>
                  <span className="mt-1 block truncate text-[11px] text-white/38">{build[key]?.brand || 'Choose'}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="kicker mb-1">Step {steps.findIndex((s) => s.key === active) + 1} of {steps.length}</p>
              <h2 className="text-2xl font-black">{steps.find((s) => s.key === active)?.label}</h2>
            </div>
          </div>

          {error && <div className="panel mb-5 rounded-xl p-5 text-red-200">{error.message}</div>}
          <div className="grid gap-3">
            {loading && Array.from({ length: 6 }).map((_, i) => <div key={i} className="panel h-24 animate-pulse rounded-xl" />)}
            {(grouped[active] || []).map((part) => (
              <button
                key={part.id}
                onClick={() => selectPart(part)}
                className={`panel grid gap-4 rounded-xl p-4 text-left transition hover:border-white/20 sm:grid-cols-[92px_1fr_auto] ${build[active]?.id === part.id ? 'border-[#f26522]' : ''}`}
              >
                <img src={part.image} alt={part.name} className="h-20 w-20 rounded-lg bg-white object-contain p-1" />
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded bg-white/8 px-2 py-1 text-[11px] font-black uppercase tracking-wide text-white/50">{part.brand}</span>
                    <span className="rounded bg-[#28c76f]/12 px-2 py-1 text-[11px] font-black text-[#7ee5aa]">In stock</span>
                  </div>
                  <h3 className="font-black">{part.name}</h3>
                  <p className="mt-1 text-sm text-white/45">Score {part.score || 72}/100 - {part.tier || 'catalog'} tier</p>
                </div>
                <div className="text-left sm:text-right">
                  <div className="price text-xl font-black">{formatINR(part.price)}</div>
                  {part.mrp && <div className="price text-xs font-semibold text-white/35 line-through">{formatINR(part.mrp)}</div>}
                  {build[active]?.id === part.id && <CheckCircle2 className="ml-auto mt-3 h-5 w-5 text-[#28c76f]" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <div className="panel rounded-2xl p-5">
            <h2 className="mb-4 text-lg font-black">Live build summary</h2>
            <div className="mb-5">
              <div className="price text-4xl font-black">{formatINR(price)}</div>
              <p className="mt-1 text-sm text-white/45">Estimated from selected catalog rows</p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <Metric value={score} label="Score" />
              <Metric value={`${draw}W`} label="Draw" />
              <Metric value={`${Math.ceil((draw * 1.35) / 50) * 50}W`} label="PSU" />
            </div>
            {bottleneck && (
              <div className="mt-4 flex gap-3 rounded-xl border border-[#f6bd16]/25 bg-[#f6bd16]/8 p-3 text-sm text-[#ffd66b]">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{bottleneck}</span>
              </div>
            )}
            <div className="mt-5 space-y-2">
              {steps.map((step) => (
                <div key={step.key} className="flex justify-between gap-3 border-b border-white/8 py-2 text-sm">
                  <span className="font-bold text-white/40">{step.label}</span>
                  <span className="max-w-[190px] truncate text-right text-white/75">{build[step.key]?.name || 'Not selected'}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-2">
              <button disabled={selected.length < 2} onClick={orderBuild} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-40">
                <ShoppingCart className="h-4 w-4" /> Add build to cart
              </button>
              <button disabled={!selected.length} onClick={() => saveBuild('Custom Challenger Build')} className="btn-secondary w-full disabled:cursor-not-allowed disabled:opacity-40">
                <Save className="h-4 w-4" /> Save build
              </button>
            </div>
          </div>
        </aside>
      </section>
    </RetailLayout>
  )
}

function Metric({ value, label }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/20 p-3">
      <div className="font-mono text-lg font-black text-[#f26522]">{value}</div>
      <div className="text-[11px] font-bold text-white/40">{label}</div>
    </div>
  )
}
