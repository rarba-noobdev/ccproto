import { Mail, MapPin, MessageSquare, Phone } from 'lucide-react'
import toast from 'react-hot-toast'
import RetailLayout from '@/components/retail/RetailLayout'
import PageHeader from '@/components/retail/PageHeader'

const channels = [
  [Phone, 'Sales', '+91 98765 43210'],
  [Mail, 'Email', 'support@challengercomputers.in'],
  [MapPin, 'Studio', 'Bengaluru, Karnataka'],
  [MessageSquare, 'Reply within', '2 business hours'],
]

export default function Contact() {
  const submit = (event) => {
    event.preventDefault()
    toast.success('Message sent.')
    event.currentTarget.reset()
  }

  return (
    <RetailLayout>
      <PageHeader
        kicker="Issue 06 · Contact"
        title="Talk to the workshop."
        description="Quotes, build reviews, warranty service."
      />
      <section className="container-max grid gap-px border border-border-muted bg-line py-0 lg:grid-cols-[1fr_1.4fr]">
        <div className="bg-surface-1">
          <ul>
            {channels.map(([Icon, label, value], i) => (
              <li key={label} className={`flex items-center gap-16 px-24 py-20 ${i !== channels.length - 1 ? 'border-b border-border-muted' : ''}`}>
                <Icon className="h-18 w-18 shrink-0 text-ink" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="meta">{label}</p>
                  <p className="mt-4 text-body-medium font-semibold">{value}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={submit} className="bg-surface-1 p-24 md:p-32">
          <p className="meta mb-20">Send a message</p>
          <div className="grid gap-16 sm:grid-cols-2">
            <label className="grid gap-8 text-body-small font-semibold">
              Name
              <input className="input-base" name="name" autoComplete="name" required />
            </label>
            <label className="grid gap-8 text-body-small font-semibold">
              Phone
              <input className="input-base" name="phone" type="tel" inputMode="tel" autoComplete="tel" />
            </label>
            <label className="grid gap-8 text-body-small font-semibold sm:col-span-2">
              Email
              <input className="input-base" name="email" type="email" inputMode="email" autoComplete="email" spellCheck={false} required />
            </label>
            <label className="grid gap-8 text-body-small font-semibold sm:col-span-2">
              Message
              <textarea className="input-base min-h-[160px]" name="message" autoComplete="off" />
            </label>
          </div>
          <button type="submit" className="btn-primary mt-24" data-tone="heat">Send</button>
        </form>
      </section>
    </RetailLayout>
  )
}
