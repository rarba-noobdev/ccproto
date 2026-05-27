import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'

const faqs = [
  { q: 'How long does it take to build and ship my PC?', a: 'Most custom builds ship within 3-5 business days after order confirmation. Prebuilt systems ship same or next day. We provide real-time build status updates throughout the process.' },
  { q: 'Do you offer financing options?', a: 'Yes! We partner with Affirm and Klarna to offer 0% APR financing on orders over $500. Split your purchase into equal monthly payments with no hidden fees.' },
  { q: 'What does the warranty cover?', a: 'Our 3-year warranty covers all components against manufacturer defects and premature failure. We handle all warranty claims directly — you never have to deal with component manufacturers yourself.' },
  { q: 'Can I upgrade my PC after purchase?', a: 'Absolutely. We offer upgrade services at our facilities, or you can do it yourself — our builds are designed for easy access and upgradability. We\'ll also advise you on what to upgrade next.' },
  { q: 'What if my PC has issues on arrival?', a: 'We include our DOA (Dead on Arrival) guarantee. If your system has any issues out of the box, we ship a replacement within 24 hours, no questions asked. We also cover return shipping costs.' },
  { q: 'Do you ship internationally?', a: 'We currently ship to the US, Canada, UK, and Australia. International orders include full warranty coverage and support. More regions coming soon.' },
  { q: 'Can I use my own parts in the build?', a: 'Yes! Our "Bring Your Own Parts" service lets you supply components and we handle the build, cable management, and testing. Contact us for pricing on this service.' },
]

export default function FAQSection() {
  const [open, setOpen] = useState(null)

  return (
    <section className="section-padding">
      <div className="container-max max-w-3xl">
        <div className="text-center mb-12 space-y-4">
          <motion.div className="section-label mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            FAQ
          </motion.div>
          <motion.h2
            className="font-display text-4xl sm:text-title-h3 font-black text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            GOT <span className="gradient-text">QUESTIONS?</span>
          </motion.h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className={clsx(
                'glass rounded-xl border transition-all duration-300',
                open === i ? 'border-heat-100/40 bg-heat-100/5' : 'border-border-muted'
              )}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 rounded-xl"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-heading font-semibold text-white pr-4">{faq.q}</span>
                <ChevronDown className={clsx('w-5 h-5 text-heat-100 shrink-0 transition-transform duration-300', open === i && 'rotate-180')} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-white/60 text-sm leading-relaxed font-body">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
