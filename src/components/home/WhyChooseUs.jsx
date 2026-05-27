import { ListChecks, ReceiptText, SearchCheck } from 'lucide-react'

const items = [
  {
    icon: SearchCheck,
    title: 'Traceable inventory',
    text: 'Every highlighted build keeps a consistent internal spec sheet so shoppers can compare parts without guesswork.',
  },
  {
    icon: ListChecks,
    title: 'Specs are visible before the cart',
    text: 'CPU, GPU, RAM, storage, cooling, PSU, motherboard, and case are shown in plain language.',
  },
  {
    icon: ReceiptText,
    title: 'INR pricing throughout',
    text: 'Cards, cart totals, and comparison views use rupee formatting with no generic placeholder pricing.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="bg-void py-20 lg:py-28">
      <div className="container-max">
        <div className="mb-10 max-w-3xl">
          <p className="section-label mb-4">How this storefront works</p>
          <h2 className="text-4xl font-medium leading-[0.98] tracking-[-1.8px] text-white md:text-6xl">
            Designed for comparison, not decoration.
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-[24px] border border-white/5 bg-white/5 md:grid-cols-3">
          {items.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-void-100 p-6 md:p-8">
              <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-full bg-white text-void">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-medium tracking-[-0.7px] text-white">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/50">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
