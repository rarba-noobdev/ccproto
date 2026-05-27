import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Cpu, Twitter, Youtube, Twitch, Instagram, MessageCircle, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'

const links = {
  Products: [
    { label: 'Gaming PCs', href: '/gaming-pcs' },
    { label: 'Workstations', href: '/workstations' },
    { label: 'Prebuilt PCs', href: '/prebuilt' },
    { label: 'All Gear', href: '/category/accessories' },
    { label: 'Build Your PC', href: '/build' },
  ],
  Parts: [
    { label: 'Graphic Card', href: '/category/graphic-card' },
    { label: 'Processor', href: '/category/processor' },
    { label: 'Motherboard', href: '/category/motherboard' },
    { label: 'RAM', href: '/category/ram' },
    { label: 'SSD', href: '/category/ssd' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press Kit', href: '/press' },
    { label: 'Contact', href: '/contact' },
  ],
  Support: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Warranty', href: '/warranty' },
    { label: 'Returns', href: '/returns' },
    { label: 'Live Chat', href: '/support' },
    { label: 'Community', href: '/community' },
  ],
}

const socials = [
  { icon: Twitter, label: 'Twitter' },
  { icon: Youtube, label: 'YouTube' },
  { icon: Twitch, label: 'Twitch' },
  { icon: Instagram, label: 'Instagram' },
  { icon: MessageCircle, label: 'Community' },
]

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/5 bg-void">
      <div className="container-max py-16 relative">
        {/* Top */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-10 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-bluetron rounded-full">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-void">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="font-display font-medium text-lg tracking-[-0.18px] text-white">Challenger Computers</span>
            </Link>

            <p className="text-white/50 text-sm leading-relaxed font-body max-w-xs">
              Performance PCs, workstations, and desk gear selected for clean upgrades and daily reliability.
            </p>

            {/* Newsletter */}
            <div className="space-y-2">
              <p className="text-xs text-white/50 tracking-[-0.12px]">Join the mailing list</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  name="newsletter-email"
                  aria-label="Email for newsletter"
                  autoComplete="email"
                  spellCheck={false}
                  placeholder="you@example.com…"
                  className="flex-1 input-base"
                />
                <button aria-label="Subscribe to newsletter" className="p-2.5 bg-white text-void rounded-full transition-all hover:scale-[0.98] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-bluetron">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  title={label}
                  className="p-2 rounded-full bg-white/5 text-white/40 transition-all hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-bluetron"
                >
                  <Icon aria-hidden="true" className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="font-heading font-semibold text-white text-sm mb-4 tracking-wide">{section}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link to={item.href} className="text-white/40 hover:text-white text-sm font-body transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-bluetron rounded-4">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className="flex flex-wrap gap-6 py-6 border-y border-white/5 mb-8">
          {[
            { icon: Mail, text: 'support@challengercomputers.in' },
            { icon: Phone, text: '+91 90000 00000' },
            { icon: MapPin, text: 'India-wide online orders' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm text-white/40">
              <Icon className="w-4 h-4 text-white/60" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/25 text-xs font-body">
            &copy; 2026 Challenger Computers. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <Link
                key={item}
                to="#"
                className="text-white/25 hover:text-white/60 text-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-bluetron rounded-4"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
