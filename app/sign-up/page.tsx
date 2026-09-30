import Link from 'next/link'
import { AuthForm } from '@/components/auth-form'

export default function SignUpPage() {
  return <main className="flex min-h-screen items-center justify-center bg-[#0b0d0c] px-5 text-[#e9ede8]"><section className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111512] p-7 shadow-2xl"><h1 className="text-2xl font-semibold">Create your account</h1><p className="mb-8 mt-2 text-sm text-white/45">Start managing your revenue engine.</p><AuthForm mode="sign-up" /><p className="mt-6 text-center text-sm text-white/45">Already have an account? <Link className="text-[#d8ff3e]" href="/sign-in">Sign in</Link></p></section></main>
}
