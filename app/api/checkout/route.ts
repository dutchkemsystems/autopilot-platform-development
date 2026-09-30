import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { PRODUCTS } from '@/lib/products'

const MAX_QUANTITY = 10

export async function POST(request: Request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) return NextResponse.json({ error: 'Checkout is not configured' }, { status: 503 })

    const body = await request.json() as { productId?: unknown; quantity?: unknown; email?: unknown; name?: unknown }
    const product = PRODUCTS.find((item) => item.id === body.productId)
    const quantity = body.quantity === undefined ? 1 : body.quantity
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
    const name = typeof body.name === 'string' ? body.name.trim().slice(0, 120) : 'Autopilot customer'
    if (!product || typeof quantity !== 'number' || !Number.isSafeInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Enter a valid email and checkout details' }, { status: 400 })
    }

    const origin = request.headers.get('origin') ?? process.env.VERCEL_PROJECT_PRODUCTION_URL ?? 'http://localhost:3000'
    const stripe = new Stripe(secretKey)
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      ui_mode: 'hosted_page',
      customer_email: email,
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: product.name, description: product.description },
          unit_amount: product.priceInCents,
        },
        quantity,
      }],
      success_url: `${origin}/dashboard?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?checkout=cancelled`,
      metadata: { productId: product.id, quantity: String(quantity), customerName: name },
    })
    if (!session.url) return NextResponse.json({ error: 'Checkout is temporarily unavailable' }, { status: 502 })
    return NextResponse.json({ url: session.url })
  } catch {
    return NextResponse.json({ error: 'Checkout is temporarily unavailable' }, { status: 500 })
  }
}
