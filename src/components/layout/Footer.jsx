import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, Twitter, Youtube, Twitch, Instagram, MessageCircle, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'

const links = {
  Products: [
    { label: 'Gaming PCs', href: '/gaming-pcs' },
    { label: 'Workstations', href: '/workstations' },
    { label: 'Prebuilt PCs', href: '/prebuilt' },
    { label: 'Accessories', href: '/accessories' },
    { label: 'Build Your PC', href: '/build' },
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
  { icon: Twitter, label: 'Twitter', color: 'hover:text-accent-bluetron' },
  { icon: Youtube, label: 'YouTube', color: 'hover:text-accent-crimson' },
  { icon: Twitch, label: 'Twitch', color: 'hover:text-accent-amethyst' },
  { icon: Instagram, label: 'Instagram', color: 'hover:text-accent-crimson' },
  { icon: MessageCircle, label: 'Discord', color: 'hover:text-accent-bluetron' },
]

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/5">
      <div className="absolute inset-0 bg-mesh-purple opacity-30 pointer-events-none" />

      <div className="container-max py-20 relative">
        {/* Top */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 rounded-6">
              <div className="w-8 h-8 flex items-center justify-center rounded bg-heat-100/20">
                <Zap className="w-5 h-5 text-heat-100" />
              </div>
              <span className="font-display font-black text-lg tracking-widest text-white">NEXFORGE</span>
            </Link>

            <p className="text-white/50 text-sm leading-relaxed font-body max-w-xs">
              Building the world's most powerful custom gaming PCs. Performance without compromise. Delivered to your door, ready to dominate.
            </p>

            {/* Newsletter */}
            <div className="space-y-2">
              <p className="text-xs font-mono text-heat-100/80 tracking-widest uppercase">Join the Elite</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 input-base"
                />
                <button className="p-2.5 bg-gradient-to-r from-heat-100 to-accent-amethyst rounded-lg hover:shadow-glow-heat transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 rounded-8">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, label, color }) => (
                <button
                  key={label}
                  title={label}
                  className={`p-2 rounded-lg bg-white/5 text-white/40 transition-all hover:bg-white/10 ${color} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 rounded-6`}
                >
                  <Icon className="w-4 h-4" />
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
                    <Link
                      to={item.href}
                      className="text-white/40 hover:text-heat-100 text-sm font-body transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 rounded-4"
                    >
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
            { icon: Mail, text: 'support@nexforge.com', color: 'text-heat-100' },
            { icon: Phone, text: '+1 (888) NEX-FORGE', color: 'text-accent-bluetron' },
            { icon: MapPin, text: 'San Francisco, CA 94102', color: 'text-accent-amethyst' },
          ].map(({ icon: Icon, text, color }) => (
            <div key={text} className="flex items-center gap-2 text-sm text-white/40">
              <Icon className={`w-4 h-4 ${color}`} />
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/25 text-xs font-body">
            &copy; 2024 NexForge Gaming Systems. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <Link
                key={item}
                to="#"
                className="text-white/25 hover:text-white/60 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 rounded-4"
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
