import { NavLink, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, Grid3X3, Menu, ShoppingCart, User, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import useStore from '@/store/useStore'

const primaryLinks = [
  ['/', 'Home'],
  ['/build', 'Build'],
  ['/prebuilt', 'Systems'],
  ['/workstations', 'Workstations'],
]

const utilityLinks = [
  ['/blog', 'Guides'],
  ['/about', 'About'],
  ['/contact', 'Support'],
]

const groups = [
  {
    title: 'Systems',
    copy: 'Ready-to-ship machines and guided custom builds.',
    items: [
      ['Prebuilt PCs', '/prebuilt', 'Curated gaming systems'],
      ['Build custom', '/build', 'Configure part by part'],
      ['Workstations', '/workstations', 'Creator and studio rigs'],
    ],
  },
  {
    title: 'Core components',
    copy: 'The parts that decide platform, power, and performance.',
    items: [
      ['Processor', '/category/processor', 'Desktop CPUs'],
      ['Graphic Card', '/category/graphic-card', 'Gaming and creator GPUs'],
      ['Motherboard', '/category/motherboard', 'Socket and chipset boards'],
      ['RAM', '/category/ram', 'Memory kits'],
      ['SSD', '/category/ssd', 'Fast storage'],
      ['Power Supply', '/category/power-supply', 'Reliable SMPS units'],
    ],
  },
  {
    title: 'Setup gear',
    copy: 'Cabinets, cooling, displays, and desk peripherals.',
    items: [
      ['Cabinet', '/category/cabinet', 'Airflow and showcase cases'],
      ['Cooler', '/category/cooler', 'Air and liquid cooling'],
      ['Monitor', '/category/monitor', 'High-refresh displays'],
      ['Keyboard', '/category/keyboard', 'Control surfaces'],
      ['Mouse', '/category/mouse', 'Aim and productivity'],
      ['Laptop', '/category/laptop', 'Portable gear'],
      ['Accessories', '/category/accessories', 'Add-ons and utilities'],
    ],
  },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  const shopRef = useRef(null)
  const { pathname } = useLocation()
  const { cart, setCartOpen } = useStore()
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  const shopActive = pathname.startsWith('/category') || pathname === '/prebuilt' || pathname === '/gaming-pcs'

  useEffect(() => {
    if (!shopOpen) return undefined

    const close = (event) => {
      if (event.key === 'Escape') setShopOpen(false)
    }
    const closeOutside = (event) => {
      if (shopRef.current && !shopRef.current.contains(event.target)) setShopOpen(false)
    }

    window.addEventListener('keydown', close)
    window.addEventListener('pointerdown', closeOutside)
    return () => {
      window.removeEventListener('keydown', close)
      window.removeEventListener('pointerdown', closeOutside)
    }
  }, [shopOpen])

  return (
    <header className="sticky top-3 z-40">
      <div className="container-max">
        <div className="surface relative flex h-14 items-center justify-between rounded-full px-2 pl-3">
          <Link to="/" className="flex items-center gap-2.5" aria-label="Challenger Computers home">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--ink)] text-sm font-black text-[var(--canvas)]">CC</span>
            <span className="hidden text-sm font-black tracking-tight sm:block">Challenger</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {primaryLinks.map(([to, label]) => (
              <NavLink key={to} to={to} className={({ isActive }) => `nav-link text-[13px] font-bold ${isActive ? 'active' : ''}`}>
                {label}
              </NavLink>
            ))}
            <div ref={shopRef} className="relative">
              <button
                type="button"
                onClick={() => setShopOpen((value) => !value)}
                className={`nav-link flex items-center gap-1.5 text-[13px] font-bold active:scale-[.97] ${shopOpen || shopActive ? 'active' : ''}`}
                aria-expanded={shopOpen}
                aria-haspopup="menu"
                aria-controls="nav-shop-menu"
              >
                Shop
                <ChevronDown className={`h-3.5 w-3.5 text-current transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${shopOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>

              <AnimatePresence>
                {shopOpen && (
                <motion.div
                  id="nav-shop-menu"
                  className="mega-menu absolute left-1/2 top-[calc(100%+10px)] w-[min(820px,calc(100vw-40px))] rounded-[26px] p-2.5"
                  initial={reduceMotion ? false : { opacity: 0, filter: 'blur(3px)', transform: 'translate(-50%, -8px) scale(.985)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)', transform: 'translate(-50%, 0px) scale(1)' }}
                  exit={{ opacity: 0, filter: 'blur(2px)', transform: 'translate(-50%, -5px) scale(.99)' }}
                  transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                >
                  <div className="grid gap-2 xl:grid-cols-3">
                    {groups.map((group) => (
                      <div key={group.title} className="rounded-[22px] border border-[var(--line)] bg-[var(--surface-2)] p-3">
                        <div className="mb-2 px-1">
                          <div className="text-sm font-black tracking-[-.02em]">{group.title}</div>
                          <p className="mt-1 line-clamp-2 text-xs leading-5 muted">{group.copy}</p>
                        </div>
                        <nav className="grid gap-0.5" aria-label={group.title}>
                          {group.items.map(([label, to, copy]) => (
                            <NavLink
                              key={label}
                              to={to}
                              onClick={() => setShopOpen(false)}
                              className={({ isActive }) =>
                                `group rounded-[16px] px-3 py-2 transition-colors duration-150 ${
                                  isActive ? 'bg-[var(--ink)] text-[var(--canvas)]' : 'hover:bg-[var(--surface-hover)]'
                                }`
                              }
                            >
                              {({ isActive }) => (
                                <>
                                  <div className={`text-sm font-black ${isActive ? 'text-[var(--canvas)]' : 'text-[var(--ink)]'}`}>{label}</div>
                                  <div className={`mt-0.5 truncate text-[11px] font-bold ${isActive ? 'text-[var(--ink-muted)]' : 'muted'}`}>{copy}</div>
                                </>
                              )}
                            </NavLink>
                          ))}
                        </nav>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex items-center justify-between rounded-[20px] border border-[var(--line)] bg-[var(--surface-2)] px-4 py-3">
                    <span className="text-sm font-black tracking-[-.02em]">Need the full catalog?</span>
                    <Link to="/accessories" onClick={() => setShopOpen(false)} className="btn-primary min-h-9 px-4 text-xs">
                      Browse all
                    </Link>
                  </div>
                </motion.div>
                )}
              </AnimatePresence>
            </div>
            {utilityLinks.map(([to, label]) => (
              <NavLink key={to} to={to} className={({ isActive }) => `nav-link text-[13px] font-bold ${isActive ? 'active' : ''}`}>
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <Link to="/build" className="btn-primary hidden min-h-10 px-4 text-xs md:inline-flex">
              Start build
            </Link>
            <Link to="/auth" className="icon-btn hidden md:grid" aria-label="Account">
              <User className="h-4 w-4" />
            </Link>
            <button type="button" onClick={() => setCartOpen(true)} className="icon-btn relative" aria-label="Open cart">
              <ShoppingCart className="h-4 w-4" />
              {count > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-[var(--accent-blue)] px-1 text-[10px] font-black text-white">{count}</span>}
            </button>
            <button type="button" onClick={() => setOpen(true)} className="icon-btn lg:hidden" aria-label="Open menu">
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" className="absolute inset-0 bg-black/20 backdrop-blur-sm" aria-label="Close navigation menu" onClick={() => setOpen(false)} />
          <div className="surface absolute right-0 top-3 h-[calc(100%-24px)] w-[min(88vw,360px)] rounded-l-3xl p-4">
            <div className="mb-5 flex items-center justify-between">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--ink)] text-sm font-black text-[var(--canvas)]">CC</span>
              <button type="button" onClick={() => setOpen(false)} className="icon-btn" aria-label="Close menu">
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="grid gap-1">
              {primaryLinks.map(([to, label]) => (
                <NavLink key={to} to={to} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-lg font-black text-[var(--ink)]">
                  {label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-5 border-t border-[var(--line)] pt-5">
              <div className="mb-2 flex items-center gap-2 px-4 text-xs font-black uppercase tracking-[.12em] muted">
                <Grid3X3 className="h-4 w-4" aria-hidden="true" />
                Shop by category
              </div>
              <div className="grid gap-3">
                {groups.map((group) => (
                  <div key={group.title} className="rounded-[22px] border border-[var(--line)] bg-[var(--surface-2)] p-2">
                    <div className="px-2 py-2 text-sm font-black">{group.title}</div>
                    <nav className="grid grid-cols-2 gap-1">
                      {group.items.map(([label, to]) => (
                        <NavLink key={label} to={to} onClick={() => setOpen(false)} className="rounded-[16px] px-2.5 py-2 text-sm font-black text-[var(--ink-muted)]">
                          {label}
                        </NavLink>
                      ))}
                    </nav>
                  </div>
                ))}
              </div>
              <nav className="mt-4 grid gap-1 border-t border-[var(--line)] pt-4">
                {utilityLinks.map(([to, label]) => (
                  <NavLink key={to} to={to} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-base font-black text-[var(--ink)]">
                    {label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export function Footer() {
  return (
    <footer className="py-10">
      <div className="container-max">
        <div className="surface flex flex-col gap-5 rounded-3xl p-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--ink)] font-black text-[var(--canvas)]">CC</span>
            <div>
              <div className="font-black">Challenger Computers</div>
              <div className="text-xs font-semibold muted">Configured with care.</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              ['Build', '/build'],
              ['Parts', '/gaming-pcs'],
              ['Support', '/contact'],
            ].map(([label, to]) => (
              <Link key={label} to={to} className="rounded-full border border-[var(--line)] px-3 py-2 text-xs font-bold muted transition hover:text-[var(--ink)]">
                {label}
              </Link>
            ))}
          </div>
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
