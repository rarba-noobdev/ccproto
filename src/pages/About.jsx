import { Database, ShieldCheck, Truck, Wrench } from 'lucide-react'
import RetailLayout from '@/components/retail/RetailLayout'
import PageHeader from '@/components/retail/PageHeader'

const principles = [
  [Database, 'Component-level pricing', 'Every part listed by name, tier, and current price.'],
  [Wrench, 'Compatibility checks', 'Configurator validates socket, memory, wattage, clearance.'],
  [ShieldCheck, 'Three-year warranty', 'On-site service across Chennai, courier elsewhere.'],
  [Truck, 'India-wide delivery', 'Insured, signature-on-delivery, GST invoice included.'],
]

export default function About() {
  return (
    <RetailLayout>
      <PageHeader
        kicker="Issue 05 · About"
        title="A workshop, not a marketplace."
        description="Challenger Computers assembles, tests, and ships gaming and creator systems from Chennai."
      />
      <section className="container-max py-48">
        <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4 border border-border-muted">
          {principles.map(([Icon, title, copy], i) => (
            <article key={title} className="flex flex-col gap-16 bg-surface-1 p-24">
              <div className="flex items-center justify-between">
                <Icon className="h-20 w-20 text-ink" aria-hidden="true" />
                <span className="meta">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h2 className="text-title-h5 font-semibold tracking-[-.02em]">{title}</h2>
              <p className="text-body-medium leading-[1.55] text-ink-soft">{copy}</p>
            </article>
          ))}
        </div>
      </section>
    </RetailLayout>
  )
}
