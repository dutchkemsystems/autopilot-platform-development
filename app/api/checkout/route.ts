import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { PRODUCTS } from '@/lib/products'

const MAX_QUANTITY = 10

export async function POST(request: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) return NextResponse.json({ error: 'Checkout is not configured' }, { status: 503 })

    const body = await request.json() as { productId?: unknown; quantity?: unknown }
    const product = PRODUCTS.find((item) => item.id === body.productId)
    const quantity = body.quantity === undefined ? 1 : body.quantity
    if (!product || typeof quantity !== 'number' || !Number.isSafeInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) {
      return NextResponse.json({ error: 'Invalid checkout request' }, { status: 400 })
    }

    const origin = request.headers.get('origin') ?? process.env.VERCEL_PROJECT_PRODUCTION_URL ?? 'http://localhost:3000'
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price_data: { currency: 'gbp', product_data: { name: product.name, description: product.description }, unit_amount: product.priceInCents }, quantity }],
      metadata: { productId: product.id, quantity: String(quantity) },
      success_url: `${origin}/dashboard?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard?checkout=cancelled`,
      integration_identifier: `autopilot_${crypto.randomUUID().replaceAll('-', '').slice(0, 8)}`,
    })
    return NextResponse.json({ url: session.url })
  } catch {
    return NextResponse.json({ error: 'Checkout is temporarily unavailable' }, { status: 500 })
  }
}
