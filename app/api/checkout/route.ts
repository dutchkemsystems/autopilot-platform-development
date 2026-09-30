import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { PRODUCTS } from '@/lib/products'

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  try {
    const body = await request.json() as { productId?: string; quantity?: number }
    const product = PRODUCTS.find((item) => item.id === body.productId)
    const quantity = body.quantity ?? 1
    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 10) return NextResponse.json({ error: 'Invalid checkout request' }, { status: 400 })
    const origin = request.headers.get('origin') ?? process.env.VERCEL_PROJECT_PRODUCTION_URL ?? 'http://localhost:3000'
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price_data: { currency: 'gbp', product_data: { name: product.name, description: product.description }, unit_amount: product.priceInCents }, quantity }],
      success_url: `${origin}/dashboard?checkout=success`,
      cancel_url: `${origin}/dashboard?checkout=cancelled`,
      integration_identifier: `autopilot_${Math.random().toString(36).slice(2, 10)}`,
    })
    return NextResponse.json({ url: session.url })
  } catch {
    return NextResponse.json({ error: 'Checkout is temporarily unavailable' }, { status: 500 })
  }
}
