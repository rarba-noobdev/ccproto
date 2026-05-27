import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'

const faqs = [
  { q: 'How fast do prebuilt systems ship?', a: 'Most ready systems ship within 1-3 business days after confirmation.' },
  { q: 'Can I upgrade later?', a: 'Yes. The catalog prioritizes standard parts and practical upgrade room.' },
  { q: 'What warranty applies?', a: 'Component warranty applies as per manufacturer terms. Order support is handled by Challenger Computers.' },
  { q: 'Do you help choose parts?', a: 'Yes. Send your budget, monitor, and use case through the contact page.' },
]

export default function FAQSection() {
  const [open, setOpen] = useState(null)

  return (
    <section className="section-padding">
      <div className="container-max max-w-3xl">
        <div className="text-center mb-10">
          <motion.div className="section-label mx-auto mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            FAQ
          </motion.div>
          <motion.h2 className="font-display text-4xl sm:text-title-h3 font-black text-white" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Quick answers.
          </motion.h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={faq.q} className={clsx('glass rounded-xl border transition-all duration-300', open === i ? 'border-heat-100/40 bg-heat-100/5' : 'border-border-muted')} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <button className="w-full flex items-center justify-between p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 rounded-xl" onClick={() => setOpen(open === i ? null : i)}>
                <span className="font-heading font-semibold text-white pr-4">{faq.q}</span>
                <ChevronDown className={clsx('w-5 h-5 text-heat-100 shrink-0 transition-transform duration-300', open === i && 'rotate-180')} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
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
