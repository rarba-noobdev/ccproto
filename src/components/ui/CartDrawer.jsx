import { X, Trash2 } from 'lucide-react'
import useStore from '@/store/useStore'
import { formatINR } from '@/utils/currency'

export default function CartDrawer() {
  const { cart, isCartOpen, setCartOpen, removeFromCart, clearCart, cartTotal } = useStore()

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 z-[70]">
      <button type="button" className="absolute inset-0 bg-black/70" aria-label="Close cart" onClick={() => setCartOpen(false)} />
      <aside className="absolute right-0 top-0 flex h-full w-[min(100%,420px)] overscroll-contain flex-col border-l border-white/10 bg-[#101217] shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <div>
            <h2 id="cart-title" className="text-lg font-black">Cart</h2>
            <p className="text-xs text-white/45">{cart.length} item types selected</p>
          </div>
          <button type="button" onClick={() => setCartOpen(false)} className="grid h-10 w-10 place-items-center rounded-lg border border-white/10" aria-label="Close cart">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="grid h-full place-items-center text-center">
              <div>
                <p className="font-black">Your cart is empty</p>
                <p className="mt-1 text-sm text-white/50">Add a prebuilt PC or a custom configuration.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="rounded-xl border border-white/10 bg-white/[.035] p-3">
                  <div className="flex gap-3">
                    {item.image && <img src={item.image} alt={item.name} width="64" height="64" className="h-16 w-16 rounded-lg bg-white object-contain p-1" loading="lazy" decoding="async" />}
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate-2 text-sm font-black">{item.name}</h3>
                      <p className="mt-1 text-xs text-white/45">Qty {item.quantity}</p>
                      <p className="price mt-2 font-black text-[var(--ink)]">{formatINR(item.price * item.quantity)}</p>
                    </div>
                    <button type="button" onClick={() => removeFromCart(item.id)} className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-white/60" aria-label={`Remove ${item.name}`}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-white/10 p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-bold text-white/60">Estimated total</span>
            <span className="price text-2xl font-black">{formatINR(cartTotal())}</span>
          </div>
          <button type="button" className="btn-primary w-full">Request Invoice</button>
          {cart.length > 0 && <button type="button" onClick={() => window.confirm('Clear all cart items?') && clearCart()} className="mt-3 w-full text-sm font-bold text-white/45">Clear Cart</button>}
        </div>
      </aside>
    </div>
  )
}
