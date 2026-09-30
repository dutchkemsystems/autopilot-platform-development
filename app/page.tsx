import Link from 'next/link'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

export default async function HomePage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (session?.user) {
    redirect('/dashboard')
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#0b0d0c] text-[#e9ede8]">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between border-b border-white/10 pb-5">
          <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight" aria-label="Autopilot home">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#d8ff3e] font-bold text-[#12160e]">A</span>
            <span>autopilot</span>
          </Link>
          <nav className="flex items-center gap-3 text-sm" aria-label="Primary navigation">
            <Link href="/sign-in" className="rounded-lg px-3 py-2 text-white/65 transition hover:text-white">Sign in</Link>
            <Link href="/sign-up" className="rounded-lg bg-[#d8ff3e] px-4 py-2 font-semibold text-[#12160e] transition hover:bg-[#e4ff77]">Get started</Link>
          </nav>
        </header>

        <div className="grid flex-1 items-center gap-14 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div>
            <p className="mb-6 inline-flex rounded-full border border-[#d8ff3e]/25 bg-[#d8ff3e]/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[#d8ff3e]">Revenue operations, simplified</p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-7xl">Turn scattered growth work into a clear <span className="text-[#d8ff3e]">revenue engine.</span></h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/55 sm:text-lg">Autopilot gives your team one focused command centre for pipeline, performance, and the actions that move your business forward.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/sign-up" className="rounded-xl bg-[#d8ff3e] px-5 py-3 text-center font-semibold text-[#12160e] transition hover:bg-[#e4ff77]">Start free</Link>
              <Link href="/sign-in" className="rounded-xl border border-white/15 px-5 py-3 text-center font-medium text-white/80 transition hover:border-white/30 hover:text-white">Sign in to your workspace</Link>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-[#111512] p-5 shadow-2xl shadow-black/20 sm:p-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-5"><div><p className="text-sm text-white/45">Command centre</p><p className="mt-1 text-xl font-semibold">Revenue performance</p></div><span className="rounded-full bg-[#d8ff3e]/15 px-3 py-1 text-xs text-[#d8ff3e]">Live view</span></div>
            <div className="mt-6 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-white/[0.04] p-4"><p className="text-xs text-white/40">Pipeline</p><p className="mt-2 text-2xl font-semibold">$248k</p><p className="mt-1 text-xs text-[#d8ff3e]">+18.4%</p></div><div className="rounded-2xl bg-white/[0.04] p-4"><p className="text-xs text-white/40">Conversion</p><p className="mt-2 text-2xl font-semibold">24.8%</p><p className="mt-1 text-xs text-[#d8ff3e]">+6.2%</p></div></div>
            <div className="mt-3 rounded-2xl bg-white/[0.04] p-4"><div className="flex items-center justify-between text-xs text-white/45"><span>Weekly momentum</span><span>Last 7 days</span></div><div className="mt-5 flex h-20 items-end gap-2" aria-label="Weekly momentum chart"><span className="h-8 flex-1 rounded-t bg-[#d8ff3e]/35" /><span className="h-12 flex-1 rounded-t bg-[#d8ff3e]/45" /><span className="h-10 flex-1 rounded-t bg-[#d8ff3e]/35" /><span className="h-16 flex-1 rounded-t bg-[#d8ff3e]/65" /><span className="h-14 flex-1 rounded-t bg-[#d8ff3e]/55" /><span className="h-20 flex-1 rounded-t bg-[#d8ff3e]" /></div></div>
          </div>
        </div>
      </section>
    </main>
  )
}
