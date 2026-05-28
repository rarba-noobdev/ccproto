import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "jsr:@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
}

function json(data: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { ...corsHeaders, "content-type": "application/json", ...(init.headers || {}) },
  })
}

function getEnv(name: string): string {
  const value = Deno.env.get(name)
  if (!value) throw new Error(`Missing env: ${name}`)
  return value
}

function basicAuthHeader(id: string, secret: string) {
  return "Basic " + btoa(`${id}:${secret}`)
}

async function hmacSha256Hex(message: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  )
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message))
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

function supabaseAdmin() {
  return createClient(getEnv("SUPABASE_URL"), getEnv("SUPABASE_SERVICE_ROLE_KEY"), {
    auth: { persistSession: false },
  })
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders })

  const url = new URL(req.url)
  const route = url.pathname.split("/").filter(Boolean).at(-1)

  try {
    if (req.method === "POST" && route === "order") return await createOrder(req)
    if (req.method === "POST" && route === "verify") return await verifyPayment(req)
    return json({ ok: true, routes: ["POST /order", "POST /verify"] })
  } catch (err) {
    console.error(err)
    return json({ error: (err as Error).message || "Internal error" }, { status: 500 })
  }
})

async function createOrder(req: Request) {
  const body = await req.json().catch(() => ({}))
  const amount = Number(body.amount)
  const currency = (body.currency || "INR").toString()
  if (!Number.isFinite(amount) || amount < 100) {
    return json({ error: "amount must be integer paise >= 100" }, { status: 400 })
  }
  const receipt = (body.receipt || `rcpt_${Date.now()}`).toString().slice(0, 40)
  const customer = body.customer || {}
  const cart = body.cart || null

  const keyId = getEnv("RAZORPAY_KEY_ID")
  const keySecret = getEnv("RAZORPAY_KEY_SECRET")

  const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: basicAuthHeader(keyId, keySecret),
    },
    body: JSON.stringify({
      amount,
      currency,
      receipt,
      notes: body.notes || {},
    }),
  })

  const order = await rzpRes.json()
  if (!rzpRes.ok) {
    return json({ error: order.error?.description || "Razorpay order failed", details: order }, { status: rzpRes.status })
  }

  const supabase = supabaseAdmin()
  const { error: dbError } = await supabase.from("payments").insert({
    razorpay_order_id: order.id,
    amount,
    currency,
    receipt,
    status: "created",
    customer_name: customer.name || null,
    customer_email: customer.email || null,
    customer_phone: customer.phone || null,
    cart,
    notes: body.notes || null,
  })
  if (dbError) console.error("payments insert", dbError)

  return json({
    order_id: order.id,
    amount: order.amount,
    currency: order.currency,
    receipt: order.receipt,
    key_id: keyId,
  })
}

async function verifyPayment(req: Request) {
  const body = await req.json().catch(() => ({}))
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return json({ error: "missing payment fields" }, { status: 400 })
  }

  const secret = getEnv("RAZORPAY_KEY_SECRET")
  const expected = await hmacSha256Hex(`${razorpay_order_id}|${razorpay_payment_id}`, secret)
  const valid = timingSafeEqual(expected, String(razorpay_signature))

  const supabase = supabaseAdmin()
  const { error: dbError } = await supabase
    .from("payments")
    .update({
      razorpay_payment_id,
      razorpay_signature,
      status: valid ? "verified" : "failed",
      updated_at: new Date().toISOString(),
    })
    .eq("razorpay_order_id", razorpay_order_id)
  if (dbError) console.error("payments update", dbError)

  if (!valid) return json({ verified: false }, { status: 400 })
  return json({ verified: true, payment_id: razorpay_payment_id })
}
