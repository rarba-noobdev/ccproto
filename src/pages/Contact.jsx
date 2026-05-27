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
        title="Talk to a builder before you spend"
        description="Use this page for sales enquiries, saved build reviews, bulk workstation quotes, and post-sale support tickets."
      />
      <section className="container-max grid gap-6 py-10 lg:grid-cols-[.9fr_1.1fr]">
        <div className="space-y-4">
          {[
            [Phone, 'Sales line', '+91 98765 43210'],
            [Mail, 'Email', 'support@challengercomputers.in'],
            [MapPin, 'Store desk', 'Bengaluru, Karnataka'],
            [MessageSquare, 'Response SLA', 'Under 2 business hours'],
          ].map(([Icon, label, value]) => (
            <div key={label} className="panel flex items-center gap-4 rounded-xl p-4">
              <Icon className="h-5 w-5 text-[var(--ink)]" />
              <div>
                <div className="text-xs font-black uppercase tracking-wide text-white/40">{label}</div>
                <div className="font-black">{value}</div>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={submit} className="panel rounded-2xl p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold">Name<input className="input-base" name="name" autoComplete="name" /></label>
            <label className="grid gap-2 text-sm font-bold">Phone<input className="input-base" name="phone" type="tel" inputMode="tel" autoComplete="tel" /></label>
            <label className="grid gap-2 text-sm font-bold sm:col-span-2">Email<input className="input-base" name="email" type="email" inputMode="email" autoComplete="email" spellCheck={false} /></label>
            <label className="grid gap-2 text-sm font-bold sm:col-span-2">What are you building?<textarea className="min-h-32 rounded-lg border border-white/10 bg-[#0f1116] p-3 transition-[border-color,box-shadow] focus-visible:border-[var(--accent-blue)] focus-visible:ring-4 focus-visible:ring-[var(--accent-blue-soft)]" name="message" autoComplete="off" /></label>
          </div>
          <button type="submit" className="btn-primary mt-5 w-full">Send Enquiry</button>
        </form>
      </section>
    </RetailLayout>
  )
}
