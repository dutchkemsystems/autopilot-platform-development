'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/auth-client'

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (event.nativeEvent.isComposing) return
    setPending(true)
    setError('')
    const result = mode === 'sign-in'
      ? await signIn.email({ email, password })
      : await signUp.email({ email, password, name })
    if (result.error) {
      setError('We could not verify those details. Please try again.')
      setPending(false)
      return
    }
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === 'sign-up' && <label className="block text-sm">Name<input required value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3 outline-none focus:border-[#d8ff3e]" /></label>}
      <label className="block text-sm">Email<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3 outline-none focus:border-[#d8ff3e]" /></label>
      <label className="block text-sm">Password<input required minLength={8} type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3 outline-none focus:border-[#d8ff3e]" /></label>
      {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
      <button disabled={pending} className="w-full rounded-lg bg-[#d8ff3e] px-4 py-3 font-semibold text-[#12160e] disabled:opacity-50">{pending ? 'Please wait…' : mode === 'sign-in' ? 'Sign in' : 'Create account'}</button>
    </form>
  )
}
