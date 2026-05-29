import { supabaseUrl, supabaseAnonKey } from '@/lib/supabase'

const CHECKOUT_SRC = 'https://checkout.razorpay.com/v1/checkout.js'
const FUNCTION_BASE = `${supabaseUrl}/functions/v1/razorpay`

let scriptPromise = null
function loadCheckoutScript() {
  if (typeof window === 'undefined') return Promise.reject(new Error('window required'))
  if (window.Razorpay) return Promise.resolve()
  if (scriptPromise) return scriptPromise
  scriptPromise = new Promise((resolve, reject) => {
    const tag = document.createElement('script')
    tag.src = CHECKOUT_SRC
    tag.async = true
    tag.onload = () => resolve()
    tag.onerror = () => {
      scriptPromise = null
      reject(new Error('Razorpay checkout script failed to load'))
    }
    document.head.appendChild(tag)
  })
  return scriptPromise
}

async function callFunction(path, payload) {
  const res = await fetch(`${FUNCTION_BASE}/${path}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      apikey: supabaseAnonKey,
      authorization: `Bearer ${supabaseAnonKey}`,
    },
    body: JSON.stringify(payload),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(data.error || `Razorpay ${path} failed (${res.status})`)
    err.details = data
    throw err
  }
  return data
}

export const RAZORPAY_TEST_MAX_RUPEES = 500000

export async function createRazorpayOrder({ amountInRupees, cart, customer }) {
  const rupees = Math.round(Number(amountInRupees))
  if (!Number.isFinite(rupees) || rupees < 1) {
    throw new Error('Invalid amount')
  }
  if (rupees > RAZORPAY_TEST_MAX_RUPEES) {
    const err = new Error(`Test mode caps a single payment at ₹${RAZORPAY_TEST_MAX_RUPEES.toLocaleString('en-IN')}. Reduce your cart or split the order.`)
    err.code = 'AMOUNT_OVER_TEST_LIMIT'
    throw err
  }
  const amount = rupees * 100
  return callFunction('order', { amount, currency: 'INR', cart, customer })
}

export async function verifyRazorpayPayment(payload) {
  return callFunction('verify', payload)
}

export async function openRazorpayCheckout({
  amountInRupees,
  cart = [],
  customer = {},
  description = 'Challenger Computers order',
  onSuccess,
  onFailure,
  onDismiss,
}) {
  await loadCheckoutScript()
  const order = await createRazorpayOrder({ amountInRupees, cart, customer })

  return new Promise((resolve, reject) => {
    const rzp = new window.Razorpay({
      key: order.key_id,
      amount: order.amount,
      currency: order.currency,
      name: 'Challenger Computers',
      description,
      order_id: order.order_id,
      prefill: {
        name: customer.name || '',
        email: customer.email || '',
        contact: customer.phone || '',
      },
      notes: { receipt: order.receipt },
      theme: { color: '#fa5d19' },
      modal: {
        ondismiss: () => {
          onDismiss?.()
          resolve({ dismissed: true })
        },
      },
      handler: async (response) => {
        try {
          const result = await verifyRazorpayPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          })
          if (result.verified) {
            onSuccess?.(result, response)
            resolve({ verified: true, ...result, response })
          } else {
            onFailure?.(new Error('Signature verification failed'))
            reject(new Error('Signature verification failed'))
          }
        } catch (err) {
          onFailure?.(err)
          reject(err)
        }
      },
    })
    rzp.on('payment.failed', (event) => {
      onFailure?.(event?.error)
      reject(new Error(event?.error?.description || 'Payment failed'))
    })
    rzp.open()
  })
}
