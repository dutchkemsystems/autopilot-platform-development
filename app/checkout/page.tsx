'use client'

import { useState } from 'react'
import { PRODUCTS } from '@/lib/products'

export default function CheckoutPage() {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const product = PRODUCTS[0]

  async function startCheckout() {
    setPending(true)
    setError('')
    try {
      const response = await fetch('/api/checkout', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ productId: product.id, quantity: 1, email }) })
      const data = await response.json()
      if (!response.ok || !data.url) {
        setError(data.error ?? 'Unable to start checkout')
        return
      }
      window.location.assign(data.url)
    } catch {
      setError('Checkout is temporarily unavailable. Please try again.')
    } finally {
      setPending(false)
    }
  }

  return <main className="flex min-h-screen items-center justify-center bg-[#0b0d0c] px-5 text-[#e9ede8]"><section className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#111512] p-8"><p className="text-xs uppercase tracking-[0.18em] text-[#a4c337]">Autopilot plans</p><h1 className="mt-3 text-3xl font-semibold">Autopilot Growth</h1><p className="mt-3 text-white/50">Automated revenue intelligence for growing dealer groups.</p><div className="my-8 flex items-end gap-2"><span className="text-4xl font-semibold">$49</span><span className="pb-1 text-white/40">one-time setup</span></div><label className="block text-sm text-white/70" htmlFor="checkout-email">Billing email<input id="checkout-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3 text-white outline-none placeholder:text-white/30 focus:border-[#d8ff3e]" /></label><button onClick={startCheckout} disabled={pending || !email} className="mt-5 w-full rounded-lg bg-[#d8ff3e] px-4 py-3 font-semibold text-[#12160e] disabled:opacity-50">{pending ? 'Opening secure checkout…' : 'Continue to secure checkout'}</button>{error && <p role="alert" className="mt-4 text-sm text-red-300">{error}</p>}<p className="mt-4 text-center text-xs text-white/35">Secure payment powered by Stripe.</p></section></main>
}
