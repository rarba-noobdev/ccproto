import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Heart, User, Menu, X, Zap, ChevronDown, Gamepad2, Monitor, Box } from 'lucide-react'
import useStore from '@/store/useStore'
import clsx from 'clsx'

const navLinks = [
  {
    label: 'PCs',
    children: [
      { label: 'Gaming PCs', href: '/gaming-pcs', icon: Gamepad2 },
      { label: 'Workstations', href: '/workstations', icon: Monitor },
      { label: 'Prebuilt PCs', href: '/prebuilt', icon: Box },
    ],
  },
  { label: 'Build PC', href: '/build', highlight: true },
  { label: 'Accessories', href: '/accessories' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const { cart, wishlist, user } = useStore()
  const location = useLocation()
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <>
      <motion.nav
        className={clsx(
          'fixed top-0 inset-x-0 z-50 transition-all duration-500',
          scrolled
            ? 'py-3 bg-void/90 backdrop-blur-xl border-b border-white/5 shadow-elevated'
            : 'py-5 bg-transparent'
        )}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container-max flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 rounded-6">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded bg-gradient-to-br from-heat-100 to-accent-amethyst opacity-20 group-hover:opacity-40 transition-opacity" />
              <Zap className="w-5 h-5 text-heat-100 relative z-10" />
            </div>
            <span className="font-display text-lg font-black tracking-widest text-white group-hover:text-heat-100 transition-colors">
              NEXFORGE
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.href ? (
                  <Link
                    to={link.href}
                    className={clsx(
                      'flex items-center gap-1 px-4 py-2 rounded-8 text-sm font-medium font-heading transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100',
                      link.highlight
                        ? 'bg-gradient-to-r from-heat-100 to-accent-amethyst text-white shadow-glow-sm hover:shadow-glow-heat hover:scale-105'
                        : 'text-white/70 hover:text-white hover:bg-white/5',
                      location.pathname === link.href && !link.highlight && 'text-heat-100'
                    )}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    className={clsx(
                      'flex items-center gap-1 px-4 py-2 rounded-8 text-sm font-medium font-heading transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100',
                      'text-white/70 hover:text-white hover:bg-white/5',
                      activeDropdown === link.label && 'text-white bg-white/5'
                    )}
                  >
                    {link.label}
                    <ChevronDown className={clsx('w-3.5 h-3.5 transition-transform duration-200', activeDropdown === link.label && 'rotate-180')} />
                  </button>
                )}

                {/* Dropdown */}
                {link.children && (
                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        className="absolute top-full left-0 mt-2 w-52 glass rounded-8 border border-border-muted shadow-elevated overflow-hidden"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                      >
                        {link.children.map((child) => {
                          const Icon = child.icon
                          return (
                            <Link
                              key={child.href}
                              to={child.href}
                              className="flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 focus-visible:ring-inset"
                            >
                              <Icon className="w-4 h-4 text-heat-100/70" />
                              <span className="font-heading">{child.label}</span>
                            </Link>
                          )
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              to="/wishlist"
              className="relative p-2 rounded-lg text-white/60 hover:text-accent-crimson hover:bg-white/5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 rounded-6"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent-crimson text-[9px] font-bold flex items-center justify-center text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button
              className="relative p-2 rounded-lg text-white/60 hover:text-accent-bluetron hover:bg-white/5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 rounded-6"
              onClick={() => useStore.getState().setCartOpen(true)}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-heat-100 text-[9px] font-bold flex items-center justify-center text-white">
                  {cartCount}
                </span>
              )}
            </button>

            <Link
              to={user ? '/dashboard' : '/auth'}
              className="hidden sm:flex items-center gap-2 ml-2 btn-ghost py-2 px-4 text-xs"
            >
              <User className="w-4 h-4" />
              {user ? user.name?.split(' ')[0] : 'Login'}
            </Link>

            <button
              className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 rounded-6"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-[70] w-80 bg-void-50 border-l border-white/5 p-6 flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-display font-black text-lg tracking-widest gradient-text">NEXFORGE</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 rounded-6"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 space-y-1">
                {navLinks.flatMap((l) => l.children ? l.children : [l]).map((link) => {
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.href || link.label}
                      to={link.href || '#'}
                      className={clsx(
                        'flex items-center gap-3 px-4 py-3 rounded-lg font-heading text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100',
                        link.highlight
                          ? 'bg-gradient-to-r from-heat-100 to-accent-amethyst text-white'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      )}
                    >
                      {Icon && <Icon className="w-4 h-4 text-heat-100/70" />}
                      {link.label}
                    </Link>
                  )
                })}
              </nav>

              <Link to="/auth" className="btn-primary justify-center mt-6">
                <User className="w-4 h-4" />
                {user ? 'Dashboard' : 'Sign In'}
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
