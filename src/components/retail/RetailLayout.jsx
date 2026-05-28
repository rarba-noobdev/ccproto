import { NavLink, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, Menu, ShoppingBag, User, X } from 'lucide-react'
import { useRef, useState } from 'react'
import useStore from '@/store/useStore'
import useDismissable from '@/hooks/useDismissable'

const primaryLinks = [
  ['/prebuilt', 'Systems'],
  ['/build', 'Configurator'],
  ['/workstations', 'Workstations'],
  ['/accessories', 'Catalogue'],
]

const utilityLinks = [
  ['/blog', 'Notes'],
  ['/about', 'About'],
  ['/contact', 'Contact'],
]

const shopList = [
  ['Processor', '/category/processor'],
  ['Graphics card', '/category/graphic-card'],
  ['Motherboard', '/category/motherboard'],
  ['Memory', '/category/ram'],
  ['Storage', '/category/ssd'],
  ['Power supply', '/category/power-supply'],
  ['Cabinet', '/category/cabinet'],
  ['Cooling', '/category/cooler'],
  ['Monitor', '/category/monitor'],
  ['Keyboard', '/category/keyboard'],
  ['Mouse', '/category/mouse'],
  ['Laptop', '/category/laptop'],
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  const shopRef = useRef(null)
  const mobileRef = useRef(null)
  const { pathname } = useLocation()
  const { cart, setCartOpen } = useStore()
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  const shopActive = pathname.startsWith('/category')

  useDismissable({ open: shopOpen, onDismiss: () => setShopOpen(false), containerRef: shopRef })
  useDismissable({ open, onDismiss: () => setOpen(false), containerRef: mobileRef })

  return (
    <header className="sticky top-0 z-40">
      <div className="surface">
        <div className="container-max flex h-64 items-center justify-between gap-32">
          <Link to="/" className="flex items-center" aria-label="Challenger Computers home">
            <img
              src="https://challengerbuildyourpc.com/static/media/navlogo-challenger.7aa229f9140087ca3a98.png"
              alt="Challenger Computers"
              className="h-40 w-auto brightness-0"
              decoding="async"
              loading="eager"
            />
          </Link>

          <nav className="hidden items-center gap-28 lg:flex" aria-label="Primary">
            {primaryLinks.map(([to, label]) => (
              <NavLink key={to} to={to} className={({ isActive }) => `nav-link text-body-medium ${isActive ? 'active' : ''}`}>
                {label}
              </NavLink>
            ))}
            <div ref={shopRef} className="relative">
              <button
                type="button"
                onClick={() => setShopOpen((value) => !value)}
                className={`nav-link flex items-center gap-6 text-body-medium ${shopOpen || shopActive ? 'active' : ''}`}
                aria-expanded={shopOpen}
                aria-haspopup="menu"
                aria-controls="nav-shop-menu"
              >
                Parts
                <ChevronDown className={`h-12 w-12 transition-transform duration-4 ${shopOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>

              <AnimatePresence>
                {shopOpen && (
                  <motion.div
                    id="nav-shop-menu"
                    role="menu"
                    className="mega-menu absolute right-0 top-[calc(100%+8px)] w-[280px] p-4"
                    initial={reduceMotion ? false : { opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -2 }}
                    transition={{ duration: 0.14 }}
                  >
                    <p className="meta px-12 pb-8 pt-8">Browse parts</p>
                    <nav className="grid" aria-label="Parts">
                      {shopList.map(([label, to]) => (
                        <NavLink
                          key={label}
                          to={to}
                          onClick={() => setShopOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center justify-between px-12 py-10 text-body-medium transition-colors duration-4 ${
                              isActive ? 'bg-ink text-canvas' : 'text-ink-soft hover:bg-surface-2 hover:text-ink'
                            }`
                          }
                        >
                          <span>{label}</span>
                          <span className="meta" aria-hidden="true">→</span>
                        </NavLink>
                      ))}
                    </nav>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {utilityLinks.map(([to, label]) => (
              <NavLink key={to} to={to} className={({ isActive }) => `nav-link text-body-medium ${isActive ? 'active' : ''}`}>
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-8">
            <Link to="/build" className="btn-primary hidden min-h-40 px-14 text-body-small md:inline-flex">
              Configure
            </Link>
            <Link to="/auth" className="icon-btn hidden md:grid" aria-label="Account">
              <User className="h-16 w-16" aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="icon-btn relative"
              aria-label={`Open cart${count > 0 ? `, ${count} items` : ''}`}
            >
              <ShoppingBag className="h-16 w-16" aria-hidden="true" />
              {count > 0 && (
                <span className="absolute -right-4 -top-4 grid h-16 min-w-16 place-items-center bg-accent-heat px-4 text-[10px] font-bold leading-none text-white">
                  {count}
                </span>
              )}
            </button>
            <button type="button" onClick={() => setOpen(true)} className="icon-btn lg:hidden" aria-label="Open menu">
              <Menu className="h-16 w-16" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.button
              type="button"
              className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
              aria-label="Close navigation menu"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            />
            <motion.div
              ref={mobileRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              className="absolute right-0 top-0 flex h-full w-[min(86vw,360px)] flex-col bg-canvas"
              initial={reduceMotion ? false : { x: 32, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 16, opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <div className="flex h-64 items-center justify-between border-b border-border-muted px-20">
                <img
                  src="https://challengerbuildyourpc.com/static/media/navlogo-challenger.7aa229f9140087ca3a98.png"
                  alt="Challenger Computers"
                  className="h-32 w-auto brightness-0"
                  decoding="async"
                />
                <button type="button" onClick={() => setOpen(false)} className="icon-btn" aria-label="Close menu">
                  <X className="h-16 w-16" aria-hidden="true" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-20 py-24" aria-label="Primary">
                <p className="meta mb-12">Navigate</p>
                <div className="grid">
                  {primaryLinks.map(([to, label]) => (
                    <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) =>
                      `flex items-center justify-between border-b border-border-muted py-16 text-title-h5 font-semibold ${isActive ? 'text-ink' : 'text-ink-soft'}`
                    }>
                      {label}
                      <span className="meta" aria-hidden="true">→</span>
                    </NavLink>
                  ))}
                </div>
                <p className="meta mb-12 mt-28">Parts</p>
                <div className="grid">
                  {shopList.map(([label, to]) => (
                    <NavLink key={to} to={to} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-border-muted py-12 text-body-large font-medium text-ink-soft">
                      {label}
                      <span className="meta" aria-hidden="true">→</span>
                    </NavLink>
                  ))}
                </div>
                <p className="meta mb-12 mt-28">More</p>
                <div className="grid">
                  {utilityLinks.map(([to, label]) => (
                    <NavLink key={to} to={to} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-border-muted py-12 text-body-large font-medium text-ink-soft">
                      {label}
                      <span className="meta" aria-hidden="true">→</span>
                    </NavLink>
                  ))}
                </div>
              </nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border-muted">
      <div className="container-max py-48">
        <div className="flex flex-col gap-24 md:flex-row md:items-end md:justify-between">
          <div>
            <img
              src="https://challengerbuildyourpc.com/static/media/navlogo-challenger.7aa229f9140087ca3a98.png"
              alt="Challenger Computers"
              className="h-40 w-auto brightness-0"
              decoding="async"
              loading="lazy"
            />
            <p className="meta mt-12">Chennai, IN · Est. 2014</p>
          </div>
          <nav className="flex flex-wrap gap-28 text-body-small font-medium text-ink-soft" aria-label="Footer">
            <Link to="/build" className="hover:text-ink">Configurator</Link>
            <Link to="/prebuilt" className="hover:text-ink">Systems</Link>
            <Link to="/workstations" className="hover:text-ink">Workstations</Link>
            <Link to="/accessories" className="hover:text-ink">Catalogue</Link>
            <Link to="/blog" className="hover:text-ink">Notes</Link>
            <Link to="/contact" className="hover:text-ink">Contact</Link>
          </nav>
        </div>
        <div className="mt-32 flex flex-col gap-8 border-t border-border-muted pt-20 md:flex-row md:items-center md:justify-between">
          <p className="meta">© {new Date().getFullYear()} Challenger Computers</p>
          <p className="meta">GST · Warranty · India</p>
        </div>
      </div>
    </footer>
  )
}

export default function RetailLayout({ children }) {
  return (
    <div className="retail-shell">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
