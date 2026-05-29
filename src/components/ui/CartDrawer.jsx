import { useRef, useState } from 'react'
import { X, Trash2, Loader2, ShieldCheck } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import toast from 'react-hot-toast'
import useStore from '@/store/useStore'
import { formatINR } from '@/utils/currency'
import useDismissable from '@/hooks/useDismissable'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import { openRazorpayCheckout } from '@/services/razorpay'

export default function CartDrawer() {
  const { cart, isCartOpen, setCartOpen, removeFromCart, clearCart, cartTotal, user } = useStore()
  const drawerRef = useRef(null)
  const [confirmingClear, setConfirmingClear] = useState(false)
  const [paying, setPaying] = useState(false)
  const reduceMotion = useReducedMotion()

  useDismissable({ open: isCartOpen, onDismiss: () => setCartOpen(false), containerRef: drawerRef })

  const handlePay = async () => {
    const total = cartTotal()
    if (!total || cart.length === 0) return
    setPaying(true)
    const t = toast.loading('Opening secure checkout…')
    try {
      const result = await openRazorpayCheckout({
        amountInRupees: total,
        cart: cart.map((item) => ({ id: item.id, name: item.name, price: item.price, quantity: item.quantity })),
        customer: { name: user?.name, email: user?.email, phone: user?.phone },
        description: `${cart.length} item${cart.length === 1 ? '' : 's'} · Zaid Info`,
      })
      if (result?.verified) {
        toast.success('Payment confirmed — receipt sent', { id: t })
        clearCart()
        setCartOpen(false)
      } else if (result?.dismissed) {
        toast.dismiss(t)
      }
    } catch (err) {
      toast.error(err?.message || 'Payment failed', { id: t })
    } finally {
      setPaying(false)
    }
  }

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[70]">
            <motion.button
              type="button"
              className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
              aria-label="Close cart"
              onClick={() => setCartOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.18 }}
            />
            <motion.aside
              ref={drawerRef}
              className="absolute right-0 top-0 flex h-full w-[min(100%,460px)] flex-col bg-canvas"
              role="dialog"
              aria-modal="true"
              aria-labelledby="cart-title"
              initial={reduceMotion ? false : { x: 32, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 16, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="flex items-end justify-between border-b border-border-muted px-24 py-20">
                <div>
                  <p className="meta">Cart</p>
                  <h2 id="cart-title" className="mt-4 text-title-h3 font-semibold tracking-[-.02em]">
                    {cart.length} {cart.length === 1 ? 'item' : 'items'}
                  </h2>
                </div>
                <button type="button" onClick={() => setCartOpen(false)} className="icon-btn" aria-label="Close cart">
                  <X className="h-16 w-16" aria-hidden="true" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="grid h-full place-items-center px-24 text-center">
                    <div>
                      <p className="meta mb-8">Empty</p>
                      <p className="text-title-h5 font-semibold tracking-[-.02em]">Nothing selected</p>
                      <p className="mt-8 text-body-medium text-ink-soft">Add a system, configure a build, or browse parts.</p>
                    </div>
                  </div>
                ) : (
                  <motion.ul layout>
                    <AnimatePresence initial={false}>
                      {cart.map((item, index) => (
                        <motion.li
                          key={item.id}
                          layout
                          initial={reduceMotion ? false : { opacity: 0, x: 30, height: 0 }}
                          animate={{ opacity: 1, x: 0, height: 'auto' }}
                          exit={{ opacity: 0, x: -40, height: 0 }}
                          transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1], delay: reduceMotion ? 0 : index * 0.04 }}
                          className="border-b border-border-muted"
                        >
                          <div className="flex gap-16 px-24 py-20">
                            {item.image && (
                              <div className="product-image-box grid h-[72px] w-[72px] shrink-0 place-items-center border border-border-muted">
                                <img src={item.image} alt={item.name} width="72" height="72" className="h-full w-full object-contain p-8" loading="lazy" decoding="async" />
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <h3 className="truncate-2 text-body-medium font-semibold leading-20">{item.name}</h3>
                              <p className="meta mt-6">Qty {item.quantity}</p>
                              <p className="price mt-8 text-body-medium font-semibold">{formatINR(item.price * item.quantity)}</p>
                            </div>
                            <motion.button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="grid h-36 w-36 shrink-0 place-items-center border border-border-muted text-ink-soft transition hover:border-accent-heat hover:text-accent-heat"
                              aria-label={`Remove ${item.name}`}
                              whileTap={reduceMotion ? undefined : { scale: 0.88, rotate: -8 }}
                            >
                              <Trash2 className="h-14 w-14" aria-hidden="true" />
                            </motion.button>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </motion.ul>
                )}
              </div>

              <div className="border-t border-border-muted px-24 py-20">
                <div className="mb-16 flex items-end justify-between">
                  <span className="meta">Estimated total</span>
                  <span className="price text-title-h3 font-semibold">{formatINR(cartTotal())}</span>
                </div>
                <button
                  type="button"
                  onClick={handlePay}
                  disabled={paying || cart.length === 0}
                  className="btn-primary magnetic w-full disabled:cursor-not-allowed disabled:opacity-60"
                  data-tone="heat"
                >
                  {paying ? (
                    <>
                      <Loader2 className="h-16 w-16 animate-spin" aria-hidden="true" /> Opening checkout…
                    </>
                  ) : (
                    <>Pay {formatINR(cartTotal())} · Razorpay</>
                  )}
                </button>
                <p className="mt-12 flex items-center justify-center gap-6 text-label-x-small text-ink-muted">
                  <ShieldCheck className="h-12 w-12 text-accent-heat" aria-hidden="true" />
                  Secure test checkout · UPI / Cards / Netbanking
                </p>
                {cart.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setConfirmingClear(true)}
                    className="mt-12 w-full text-body-small font-medium text-ink-muted transition hover:text-ink"
                  >
                    Clear cart
                  </button>
                )}
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      <ConfirmDialog
        open={confirmingClear}
        title="Clear cart"
        description="This removes every item from your cart."
        confirmLabel="Clear cart"
        cancelLabel="Keep items"
        destructive
        onConfirm={() => {
          clearCart()
          setConfirmingClear(false)
        }}
        onCancel={() => setConfirmingClear(false)}
      />
    </>
  )
}
