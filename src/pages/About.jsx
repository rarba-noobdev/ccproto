import { Database, ShieldCheck, Truck, Wrench } from 'lucide-react'
import RetailLayout from '@/components/retail/RetailLayout'
import PageHeader from '@/components/retail/PageHeader'

export default function About() {
  return (
    <RetailLayout>
      <PageHeader
        kicker="About"
        title="Built around trust"
        description="Clear pricing, balanced builds, and warranty-first support."
      />
      <section className="container-max grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {[
          [Database, 'Curated catalog', 'Clean product data with image, price, MRP, stock, score, and tier.'],
          [Wrench, 'Builder logic', 'The configurator computes price, wattage headroom, score, and component balance from selected parts.'],
          [ShieldCheck, 'Warranty first', 'The UI emphasizes GST billing, clear specifications, and service workflows instead of fake futuristic claims.'],
          [Truck, 'India ready', 'INR pricing, Indian-market copy, delivery cues, and support language are used across the app.'],
        ].map(([Icon, title, copy]) => (
          <article key={title} className="rounded-[28px] border border-[var(--line)] bg-[var(--surface-1)] p-5 shadow-[0_12px_36px_rgba(38,38,38,.07)]">
            <span className="mb-5 grid h-12 w-12 place-items-center rounded-[18px] bg-[var(--surface-2)]">
              <Icon className="h-6 w-6 text-[var(--ink)]" />
            </span>
            <h2 className="text-xl font-black tracking-[-.04em]">{title}</h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-[var(--ink-muted)]">{copy}</p>
          </article>
        ))}
      </section>
    </RetailLayout>
  )
}
