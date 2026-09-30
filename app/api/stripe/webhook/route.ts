import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  const signature = request.headers.get('stripe-signature')

  if (!secret || !webhookSecret || !signature) {
    return NextResponse.json({ error: 'Webhook is not configured' }, { status: 503 })
  }

  const stripe = new StripeClient(secret)
  const payload = await request.text()
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret)
  } catch {
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed':
    case 'checkout.session.async_payment_succeeded': {
      const session = event.data.object as Stripe.Checkout.Session
      if (session.payment_status === 'paid') {
        console.info('[billing] paid checkout received', { sessionId: session.id, productId: session.metadata?.productId })
      }
      break
    }
    case 'checkout.session.async_payment_failed':
      console.warn('[billing] async payment failed', { sessionId: event.data.object.id })
      break
    default:
      break
  }

  return NextResponse.json({ received: true })
}

const StripeClient = Stripe
// Stripe v22 exports the client class as the default constructor; the alias keeps route setup explicit.
