import { NextResponse } from 'next/server'
import { PRODUCTS } from '@/lib/products'

const MAX_QUANTITY = 10
const KORA_API_URL = 'https://api.korapay.com/merchant/api/v1/charges/initialize'

export async function POST(request: Request) {
  try {
    const secretKey = process.env.KORA_SECRET_KEY_2 ?? process.env.KORA_SECRET_KEY
    if (!secretKey) return NextResponse.json({ error: 'Checkout is not configured' }, { status: 503 })

    const body = await request.json() as { productId?: unknown; quantity?: unknown; email?: unknown; name?: unknown }
    const product = PRODUCTS.find((item) => item.id === body.productId)
    const quantity = body.quantity === undefined ? 1 : body.quantity
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
    const name = typeof body.name === 'string' ? body.name.trim().slice(0, 120) : 'Autopilot customer'
    if (!product || typeof quantity !== 'number' || !Number.isSafeInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Enter a valid email and checkout details' }, { status: 400 })
    }

    const reference = `autopilot_${crypto.randomUUID().replaceAll('-', '')}`
    const origin = request.headers.get('origin') ?? process.env.VERCEL_PROJECT_PRODUCTION_URL ?? 'http://localhost:3000'
    const response = await fetch(KORA_API_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${secretKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: (product.priceInCents / 100) * quantity,
        currency: 'USD',
        reference,
        customer: { name, email },
        notification_url: `${origin}/api/kora/webhook`,
        redirect_url: `${origin}/dashboard?checkout=success&reference=${encodeURIComponent(reference)}`,
        metadata: { productId: product.id, quantity: String(quantity) },
      }),
      cache: 'no-store',
    })
    const result = await response.json() as { status?: boolean; message?: string; data?: { checkout_url?: string } }
    if (!response.ok || !result.data?.checkout_url) return NextResponse.json({ error: result.message ?? 'Checkout is temporarily unavailable' }, { status: 502 })
    return NextResponse.json({ url: result.data.checkout_url })
  } catch {
    return NextResponse.json({ error: 'Checkout is temporarily unavailable' }, { status: 500 })
  }
}
