import { Database, ShieldCheck, Truck, Wrench } from 'lucide-react'
import RetailLayout from '@/components/retail/RetailLayout'
import PageHeader from '@/components/retail/PageHeader'

export default function About() {
  return (
    <RetailLayout>
      <PageHeader
        kicker="About"
        title="Built around trust"
        description="A quieter way to buy performance hardware: clear pricing, balanced builds, and warranty-first support."
      />
      <section className="container-max grid gap-6 py-10 lg:grid-cols-4">
        {[
          [Database, 'Curated catalog', 'Clean product data with image, price, MRP, stock, score, and tier.'],
          [Wrench, 'Builder logic', 'The configurator computes price, wattage headroom, score, and component balance from selected parts.'],
          [ShieldCheck, 'Warranty first', 'The UI emphasizes GST billing, clear specifications, and service workflows instead of fake futuristic claims.'],
          [Truck, 'India ready', 'INR pricing, Indian-market copy, delivery cues, and support language are used across the app.'],
        ].map(([Icon, title, copy]) => (
          <article key={title} className="panel rounded-2xl p-6">
            <Icon className="mb-5 h-7 w-7 text-[var(--ink)]" />
            <h2 className="text-xl font-black">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-white/58">{copy}</p>
          </article>
        ))}
      </section>
    </RetailLayout>
  )
}
