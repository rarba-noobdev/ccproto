import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, MessageCircle, Send, Zap, CheckCircle2 } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import GlassCard from '@/components/ui/GlassCard'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setTimeout(() => setSent(true), 800)
  }

  return (
    <div className="min-h-screen bg-void">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="container-max max-w-5xl">
          <div className="text-center mb-12">
            <div className="section-label mx-auto mb-4"><Zap className="w-3 h-3" />CONTACT</div>
            <h1 className="font-display text-5xl font-black text-white">GET IN <span className="gradient-text">TOUCH</span></h1>
            <p className="text-white/50 mt-3 max-w-md mx-auto">Questions, custom builds, wholesale inquiries — we respond within 2 hours.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Info */}
            <div className="space-y-5">
              {[
                { icon: Mail, title: 'Email Us', value: 'support@nexforge.com', sub: 'Avg response: 45 minutes', color: 'text-heat-100' },
                { icon: Phone, title: 'Call Us', value: '+1 (888) NEX-FORGE', sub: 'Mon–Fri, 8AM–10PM PST', color: 'text-accent-bluetron' },
                { icon: MapPin, title: 'Visit Us', value: '1024 Overclock Ave, San Francisco', sub: 'Showroom open Mon–Sat', color: 'text-accent-amethyst' },
                { icon: MessageCircle, title: 'Live Chat', value: 'Discord Community', sub: '50K+ members, 24/7 support', color: 'text-accent-crimson' },
              ].map(({ icon: Icon, title, value, sub, color }, i) => (
                <GlassCard key={title} delay={i * 0.08} className="p-5 flex items-center gap-4 rounded-12">
                  <div className={`w-12 h-12 rounded-xl bg-void-300 flex items-center justify-center ${color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-white/30 font-mono">{title}</p>
                    <p className="font-heading font-semibold text-white">{value}</p>
                    <p className="text-xs text-white/40">{sub}</p>
                  </div>
                </GlassCard>
              ))}
            </div>

            {/* Form */}
            <GlassCard animate className="p-7 rounded-12">
              {sent ? (
                <div className="text-center py-12">
                  <div className="mb-4 flex justify-center">
                    <CheckCircle2 className="w-12 h-12 text-accent-forest" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mb-2">Message Sent!</h3>
                  <p className="text-white/50">We'll get back to you within 2 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-heading font-bold text-white mb-2">Send a Message</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { k: 'name', placeholder: 'Your Name', type: 'text' },
                      { k: 'email', placeholder: 'Email Address', type: 'email' },
                    ].map(({ k, placeholder, type }) => (
                      <input
                        key={k}
                        type={type}
                        placeholder={placeholder}
                        value={form[k]}
                        onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                        className="input-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100"
                        required
                      />
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Subject"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="input-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100"
                  />
                  <textarea
                    placeholder="Your message..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    className="input-base resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100"
                    required
                  />
                  <button type="submit" className="w-full btn-primary justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100">
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
