import { Mail, MapPin, MessageSquare, Phone } from 'lucide-react'
import toast from 'react-hot-toast'
import RetailLayout from '@/components/retail/RetailLayout'
import PageHeader from '@/components/retail/PageHeader'

export default function Contact() {
  const submit = (event) => {
    event.preventDefault()
    toast.success('Enquiry received')
    event.currentTarget.reset()
  }

  return (
    <RetailLayout>
      <PageHeader
        kicker="Support"
        title="Talk to a builder"
        description="Quotes, saved build reviews, and support tickets."
      />
      <section className="container-max grid gap-5 py-8 lg:grid-cols-[.82fr_1.18fr]">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {[
            [Phone, 'Sales line', '+91 98765 43210'],
            [Mail, 'Email', 'support@challengercomputers.in'],
            [MapPin, 'Store desk', 'Bengaluru, Karnataka'],
            [MessageSquare, 'Response SLA', 'Under 2 business hours'],
          ].map(([Icon, label, value]) => (
            <div key={label} className="flex items-center gap-4 rounded-[24px] border border-[var(--line)] bg-[var(--surface-1)] p-4 shadow-[0_10px_30px_rgba(38,38,38,.06)]">
              <span className="grid h-11 w-11 place-items-center rounded-[16px] bg-[var(--surface-2)]">
                <Icon className="h-5 w-5 text-[var(--ink)]" />
              </span>
              <div>
                <div className="text-xs font-black uppercase tracking-wide text-[var(--ink-muted)]">{label}</div>
                <div className="font-black">{value}</div>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={submit} className="rounded-[30px] border border-[var(--line)] bg-[var(--surface-1)] p-5 shadow-[0_14px_42px_rgba(38,38,38,.08)]">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-black">Name<input className="input-base" name="name" autoComplete="name" /></label>
            <label className="grid gap-2 text-sm font-black">Phone<input className="input-base" name="phone" type="tel" inputMode="tel" autoComplete="tel" /></label>
            <label className="grid gap-2 text-sm font-black sm:col-span-2">Email<input className="input-base" name="email" type="email" inputMode="email" autoComplete="email" spellCheck={false} /></label>
            <label className="grid gap-2 text-sm font-black sm:col-span-2">Build brief<textarea className="min-h-32 rounded-[20px] border border-[var(--line)] bg-[var(--surface-2)] p-4 transition-[border-color,box-shadow] focus-visible:border-[var(--accent-blue)] focus-visible:ring-4 focus-visible:ring-[var(--accent-blue-soft)]" name="message" autoComplete="off" /></label>
          </div>
          <button type="submit" className="btn-primary mt-5 w-full">Send</button>
        </form>
      </section>
    </RetailLayout>
  )
}
