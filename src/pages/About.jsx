import { Database, ShieldCheck, Truck, Wrench } from 'lucide-react'
import RetailLayout from '@/components/retail/RetailLayout'
import PageHeader from '@/components/retail/PageHeader'

export default function About() {
  return (
    <RetailLayout>
      <PageHeader
        kicker="About"
        title="A PC store interface built around trust, not hype"
        description="Challenger Computers is structured like a serious Indian PC builder: transparent pricing, genuine source links, warranty-first workflows, and admin tooling for real inventory."
      />
      <section className="container-max grid gap-6 py-10 lg:grid-cols-4">
        {[
          [Database, 'Real catalog', 'Products are sourced through Firecrawl and stored in Supabase with image, price, MRP, stock, and source URL.'],
          [Wrench, 'Builder logic', 'The configurator computes price, wattage headroom, score, and component balance from selected parts.'],
          [ShieldCheck, 'Warranty first', 'The UI emphasizes GST billing, source transparency, and service workflows instead of fake futuristic claims.'],
          [Truck, 'India ready', 'INR pricing, Indian-market copy, delivery cues, and support language are used across the app.'],
        ].map(([Icon, title, copy]) => (
          <article key={title} className="panel rounded-2xl p-6">
            <Icon className="mb-5 h-7 w-7 text-[#f26522]" />
            <h2 className="text-xl font-black">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-white/58">{copy}</p>
          </article>
        ))}
      </section>
    </RetailLayout>
  )
}
