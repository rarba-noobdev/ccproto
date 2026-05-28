import { X, Trash2 } from 'lucide-react'
import useStore from '@/store/useStore'
import { formatINR } from '@/utils/currency'

export default function CartDrawer() {
  const { cart, isCartOpen, setCartOpen, removeFromCart, clearCart, cartTotal } = useStore()

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 z-[70]">
      <button type="button" className="absolute inset-0 bg-black/20 backdrop-blur-sm" aria-label="Close cart" onClick={() => setCartOpen(false)} />
      <aside className="absolute right-3 top-3 flex h-[calc(100%-24px)] w-[min(calc(100%-24px),440px)] overscroll-contain flex-col overflow-hidden rounded-[30px] border border-[var(--line)] bg-[var(--surface-1)] shadow-[0_24px_80px_rgba(38,38,38,.22)]" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div className="flex h-18 items-center justify-between border-b border-[var(--line)] px-5 py-4">
          <div>
            <h2 id="cart-title" className="text-xl font-black tracking-[-.04em]">Cart</h2>
            <p className="text-xs font-bold text-[var(--ink-muted)]">{cart.length} selected</p>
          </div>
          <button type="button" onClick={() => setCartOpen(false)} className="icon-btn" aria-label="Close cart">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="grid h-full place-items-center text-center">
              <div>
                <p className="font-black">Your cart is empty</p>
                <p className="mt-1 text-sm text-[var(--ink-muted)]">Add a prebuilt PC or a custom configuration.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="rounded-[22px] border border-[var(--line)] bg-[var(--surface-2)] p-2">
                  <div className="flex gap-3">
                    {item.image && <img src={item.image} alt={item.name} width="72" height="72" className="h-[72px] w-[72px] rounded-[18px] border border-[var(--line)] bg-white object-contain p-2" loading="lazy" decoding="async" />}
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate-2 text-sm font-black">{item.name}</h3>
                      <p className="mt-1 text-xs font-bold text-[var(--ink-muted)]">Qty {item.quantity}</p>
                      <p className="price mt-2 font-black text-[var(--ink)]">{formatINR(item.price * item.quantity)}</p>
                    </div>
                    <button type="button" onClick={() => removeFromCart(item.id)} className="grid h-9 w-9 place-items-center rounded-full border border-[var(--line)] bg-white text-[var(--ink-soft)] transition hover:text-[var(--ink)]" aria-label={`Remove ${item.name}`}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-[var(--line)] bg-[var(--surface-2)] p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-bold text-[var(--ink-soft)]">Estimated total</span>
            <span className="price text-2xl font-black">{formatINR(cartTotal())}</span>
          </div>
          <button type="button" className="btn-primary w-full">Request Invoice</button>
          {cart.length > 0 && <button type="button" onClick={() => window.confirm('Clear all cart items?') && clearCart()} className="mt-3 w-full text-sm font-bold text-[var(--ink-muted)]">Clear Cart</button>}
        </div>
      </aside>
    </div>
  )
}
