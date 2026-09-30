import { createHmac, timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const secret = process.env.KORA_SECRET_KEY_2 ?? process.env.KORA_SECRET_KEY
  const signature = request.headers.get('x-kora-signature')
  if (!secret || !signature) return NextResponse.json({ error: 'Webhook is not configured' }, { status: 503 })

  const payload = await request.text()
  const expected = createHmac('sha256', secret).update(payload).digest('hex')
  const valid = signature.length === expected.length && timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  if (!valid) return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 })

  const event = JSON.parse(payload) as { event?: string; data?: { status?: string; reference?: string; payment_status?: string } }
  if (event.event === 'charge.success' && event.data?.status === 'success') {
    console.info('[billing] Kora payment received', { reference: event.data.reference })
  }
  return NextResponse.json({ received: true })
}
