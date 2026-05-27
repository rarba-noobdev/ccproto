import { NavLink, Link } from 'react-router-dom'
import { Menu, ShoppingCart, ShieldCheck, Truck, User, X } from 'lucide-react'
import { useState } from 'react'
import useStore from '@/store/useStore'
import { formatINR } from '@/utils/currency'

const links = [
  ['/', 'Home'],
  ['/build', 'Build PC'],
  ['/prebuilt', 'Prebuilt PCs'],
  ['/gaming-pcs', 'Components'],
  ['/workstations', 'Workstations'],
  ['/accessories', 'Accessories'],
  ['/blog', 'Guides'],
]

export function Header() {
  const [open, setOpen] = useState(false)
  const { cart, setCartOpen } = useStore()
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#090a0c]/92 backdrop-blur-xl">
      <div className="bg-[#f26522] text-[#121212]">
        <div className="container-max flex h-9 items-center justify-between text-[12px] font-bold">
          <span className="hidden sm:inline">Live prices from Indian market scrape - MD Computers source links included</span>
          <span className="sm:hidden">Live Indian market prices</span>
          <span className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1"><Truck className="h-3.5 w-3.5" /> Pan India delivery</span>
            <span className="hidden md:inline-flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5" /> GST invoice</span>
          </span>
        </div>
      </div>

      <div className="container-max flex h-16 items-center justify-between gap-5">
        <Link to="/" className="flex items-center gap-3" aria-label="Challenger Computers home">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-white text-[18px] font-black text-black">CC</span>
          <span>
            <span className="block text-[15px] font-black leading-4 tracking-tight">Challenger</span>
            <span className="block text-[11px] font-semibold uppercase tracking-[.16em] text-white/45">Computers</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} className={({ isActive }) => `nav-link text-[14px] font-semibold ${isActive ? 'active' : ''}`}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/auth" className="hidden h-10 items-center gap-2 rounded-lg border border-white/10 px-3 text-[13px] font-bold text-white/80 md:inline-flex">
            <User className="h-4 w-4" /> Login
          </Link>
          <button onClick={() => setCartOpen(true)} className="relative h-10 rounded-lg border border-white/10 px-3 text-white" aria-label="Open cart">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#f26522] px-1 text-[11px] font-black text-black">{count}</span>}
          </button>
          <button onClick={() => setOpen(true)} className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 lg:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 lg:hidden" onClick={() => setOpen(false)}>
          <div className="ml-auto h-full w-[min(86vw,360px)] border-l border-white/10 bg-[#101217] p-5" onClick={(e) => e.stopPropagation()}>
            <div className="mb-7 flex items-center justify-between">
              <span className="font-black">Menu</span>
              <button onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-lg border border-white/10" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="grid gap-2">
              {links.map(([to, label]) => (
                <NavLink key={to} to={to} onClick={() => setOpen(false)} className="rounded-lg border border-white/10 px-4 py-3 font-bold text-white/80">
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#08090b] py-10">
      <div className="container-max grid gap-8 md:grid-cols-[1.3fr_.8fr_.8fr]">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-white font-black text-black">CC</span>
            <span className="font-black">Challenger Computers</span>
          </div>
          <p className="max-w-md text-sm leading-6 text-white/58">
            Custom gaming PCs, creator workstations, and genuine components priced for the Indian market. Built around real inventory, transparent pricing, and warranty-first support.
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-black uppercase tracking-wide text-white/80">Store</h3>
          <div className="grid gap-2 text-sm text-white/58">
            <Link to="/prebuilt">Prebuilt PCs</Link>
            <Link to="/build">PC Builder</Link>
            <Link to="/gaming-pcs">Components</Link>
            <Link to="/accessories">Accessories</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-black uppercase tracking-wide text-white/80">Support</h3>
          <div className="grid gap-2 text-sm text-white/58">
            <Link to="/contact">Contact</Link>
            <Link to="/about">About</Link>
            <Link to="/admin">Admin</Link>
            <span>GST billing available</span>
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

export function money(value) {
  return formatINR(value || 0)
}
