import { NavLink, useLocation } from 'react-router-dom'
import {
  Box,
  CircuitBoard,
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
  { label: 'Graphics', to: '/category/graphic-card', icon: Gamepad2 },
  { label: 'Keyboard', to: '/category/keyboard', icon: Keyboard },
  { label: 'Mouse', to: '/category/mouse', icon: Mouse },
  { label: 'Laptop', to: '/category/laptop', icon: Laptop },
  { label: 'Monitor', to: '/category/monitor', icon: Monitor },
  { label: 'Motherboard', to: '/category/motherboard', icon: CircuitBoard },
  { label: 'PSU', to: '/category/power-supply', icon: PlugZap },
  { label: 'Prebuilt', to: '/prebuilt', icon: Server },
  { label: 'Processor', to: '/category/processor', icon: Cpu },
  { label: 'Memory', to: '/category/ram', icon: MemoryStick },
  { label: 'Storage', to: '/category/ssd', icon: HardDrive },
]

export default function CategoryRail() {
  const { pathname } = useLocation()

  return (
    <section className="border-b border-border-muted">
      <div className="container-max">
        <div className="flex items-center gap-4 overflow-x-auto py-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="meta shrink-0 pr-12">Filter</span>
          {shopCategories.map(({ label, to, icon: Icon }) => {
            const isActive = pathname === to || (to !== '/' && pathname.startsWith(to))
            return (
              <NavLink
                key={label}
                to={to}
                className={`flex shrink-0 items-center gap-6 border px-12 py-8 text-label-x-small font-medium transition ${
                  isActive
                    ? 'border-ink bg-ink text-canvas'
                    : 'border-border-muted bg-transparent text-ink-soft hover:border-ink hover:text-ink'
                }`}
              >
                <Icon className="h-14 w-14" aria-hidden="true" />
                <span>{label}</span>
              </NavLink>
            )
          })}
        </div>
      </div>
    </section>
  )
}
