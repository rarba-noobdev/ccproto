import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingCart, Trash2, Zap, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import useStore from '@/store/useStore'

export default function CartDrawer() {
  const { cart, isCartOpen, setCartOpen, removeFromCart, cartTotal } = useStore()

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
          />
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-[90] w-96 bg-void-50 border-l border-white/5 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-heat-100" />
                <h2 className="font-heading font-bold text-white">Cart ({cart.length})</h2>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 rounded-lg hover:bg-white/5 text-white/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 focus-visible:ring-offset-2 focus-visible:ring-offset-void rounded-6"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingCart className="w-12 h-12 text-white/20 mx-auto mb-4" />
                  <p className="text-white/40">Your cart is empty.</p>
                  <Link
                    to="/prebuilt"
                    onClick={() => setCartOpen(false)}
                    className="btn-primary mt-4 inline-flex text-xs py-2 px-4"
                  >
                    Shop Now
                  </Link>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="glass border border-border-muted rounded-8 p-4 flex gap-4"
                  >
                    <div className="w-12 h-12 rounded-lg bg-void-300 flex items-center justify-center text-heat-100 shrink-0">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-heading font-semibold text-sm text-white truncate">{item.name}</p>
                      <p className="font-display font-bold text-heat-100 mt-0.5">${item.price?.toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 rounded-lg text-white/30 hover:text-accent-crimson hover:bg-white/5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heat-100 rounded-6"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-white/5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-heading text-white/60">Total</span>
                  <span className="font-display font-black text-2xl gradient-text">${cartTotal().toLocaleString()}</span>
                </div>
                <button className="w-full btn-primary justify-center">
                  <Zap className="w-4 h-4" />
                  Checkout
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full btn-ghost justify-center text-sm"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
