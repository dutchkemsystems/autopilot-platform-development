import Link from 'next/link'
import { AuthForm } from '@/components/auth-form'

export default function SignInPage() {
  return <main className="flex min-h-screen items-center justify-center bg-[#0b0d0c] px-5 text-[#e9ede8]"><section className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111512] p-7 shadow-2xl"><div className="mb-8"><div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#d8ff3e] font-bold text-[#12160e]">A</div><h1 className="text-2xl font-semibold">Welcome back</h1><p className="mt-2 text-sm text-white/45">Sign in to your Autopilot command centre.</p></div><AuthForm mode="sign-in" /><p className="mt-6 text-center text-sm text-white/45">New here? <Link className="text-[#d8ff3e]" href="/sign-up">Create an account</Link></p></section></main>
}
