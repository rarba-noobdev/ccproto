import { useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  Box,
  ChevronDown,
  Cpu,
  Fan,
  Gamepad2,
  Grid3X3,
  HardDrive,
  Keyboard,
  Laptop,
  MemoryStick,
  Monitor,
  Mouse,
  PlugZap,
  Server,
} from 'lucide-react'

export const shopCategories = [
  { label: 'Accessories', to: '/category/accessories', icon: Grid3X3 },
  { label: 'Cabinet', to: '/category/cabinet', icon: Box },
  { label: 'Cooler', to: '/category/cooler', icon: Fan },
  { label: 'Graphic Card', to: '/category/graphic-card', icon: Gamepad2 },
  { label: 'Keyboard', to: '/category/keyboard', icon: Keyboard },
  { label: 'Mouse', to: '/category/mouse', icon: Mouse },
  { label: 'Laptop', to: '/category/laptop', icon: Laptop },
  { label: 'Monitor', to: '/category/monitor', icon: Monitor },
  { label: 'Motherboard', to: '/category/motherboard', icon: Cpu },
  { label: 'Power Supply', to: '/category/power-supply', icon: PlugZap },
  { label: 'Prebuild', to: '/prebuilt', icon: Server },
  { label: 'Processor', to: '/category/processor', icon: Cpu },
  { label: 'RAM', to: '/category/ram', icon: MemoryStick },
  { label: 'SSD', to: '/category/ssd', icon: HardDrive },
]

export default function CategoryRail() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const activeCategory = useMemo(() => {
    return shopCategories.find((item) => item.to === pathname || (item.to !== '/' && pathname.startsWith(item.to))) || null
  }, [pathname])
  const ActiveIcon = activeCategory?.icon || Grid3X3

  return (
    <section className="container-max relative z-30 pt-4">
      <div className="rounded-[28px] border border-[var(--line)] bg-[var(--surface-1)] p-2 shadow-[0_14px_38px_rgba(38,38,38,.07)]">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex min-h-12 w-full items-center justify-between rounded-[20px] px-4 text-left transition hover:bg-[var(--surface-hover)]"
          aria-expanded={open}
          aria-controls="shop-category-menu"
        >
          <span className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--surface-2)] text-[var(--ink)]">
              <ActiveIcon className="h-4 w-4" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-[11px] font-black uppercase tracking-[.12em] muted">Browse</span>
              <span className="block text-sm font-black tracking-[-.02em]">{activeCategory?.label || 'All sections'}</span>
            </span>
          </span>
          <ChevronDown className={`h-4 w-4 muted transition ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>

        {open && (
          <nav id="shop-category-menu" className="mt-2 grid gap-1.5 rounded-[22px] border border-[var(--line)] bg-[var(--surface-2)] p-2 sm:grid-cols-2 lg:grid-cols-4" aria-label="Shop categories">
            {shopCategories.map(({ label, to, icon: Icon }) => (
              <NavLink
                key={label}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-[18px] px-3 py-3 text-sm font-black transition ${
                    isActive ? 'bg-[var(--ink)] text-[var(--canvas)] shadow-sm' : 'bg-[var(--surface-1)] text-[var(--ink-muted)] hover:text-[var(--ink)]'
                  }`
                }
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/70 text-current">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </section>
  )
}
