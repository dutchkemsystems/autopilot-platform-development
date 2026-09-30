'use client'

import { useState } from 'react'
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  CarFront,
  ChevronDown,
  CircleHelp,
  Cloud,
  Gauge,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Radio,
  Search,
  Settings2,
  Sparkles,
  Target,
  Users,
  Wallet,
  X,
  Zap,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signOut } from '@/lib/auth-client'

const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Live traffic', icon: Radio, badge: '24' },
  { label: 'Buyer pipeline', icon: Users },
  { label: 'Campaigns', icon: Target },
  { label: 'Inventory', icon: CarFront },
  { label: 'Revenue', icon: Wallet },
]

const vehicles = [
  { name: 'BMW iX xDrive50', meta: 'Stock  #BMX-2094', views: '248', leads: '18', color: 'lime', trend: '+28%' },
  { name: 'Mercedes-Benz EQA 250', meta: 'Stock  #MRC-7741', views: '191', leads: '14', color: 'purple', trend: '+18%' },
  { name: 'Volkswagen ID.4 Pro', meta: 'Stock  #VW-3812', views: '157', leads: '11', color: 'blue', trend: '+12%' },
  { name: 'Audi Q4 e-tron S line', meta: 'Stock  #AUD-6108', views: '139', leads: '9', color: 'orange', trend: '+9%' },
]

const vehicleAccentClasses = {
  lime: 'bg-lime-500/10 text-lime-400',
  purple: 'bg-purple-500/10 text-purple-400',
  blue: 'bg-blue-500/10 text-blue-400',
  orange: 'bg-orange-500/10 text-orange-400',
} as const

const bars = [42, 55, 48, 66, 52, 73, 62, 80, 75, 92, 84, 97, 87, 100, 93, 82, 89, 77, 91, 86, 95, 88, 98, 92]

export default function Page() {
  const router = useRouter()
  const [activeNav, setActiveNav] = useState('Overview')
  const [range, setRange] = useState('Last 30 days')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notifications, setNotifications] = useState(false)

  return (
    <main className="min-h-screen bg-[#0b0d0c] text-[#e9ede8] selection:bg-[#d8ff3e] selection:text-[#10130e]">
      <div className="flex min-h-screen">
        <aside className={`${mobileOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-30 flex w-[248px] shrink-0 flex-col border-r border-white/[0.07] bg-[#101311] transition-transform lg:static lg:translate-x-0`}>
          <div className="flex h-[76px] items-center justify-between border-b border-white/[0.07] px-6">
            <div className="flex items-center gap-3"><div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#d8ff3e] text-[#131611]"><Zap size={17} fill="currentColor" /></div><span className="text-[17px] font-semibold tracking-[-0.04em]">autopilot<span className="text-[#a9c831]">.</span></span></div>
            <button onClick={() => setMobileOpen(false)} className="text-white/40 lg:hidden" aria-label="Close navigation"><X size={18} /></button>
          </div>
          <div className="flex-1 px-3 py-6">
            <div className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">Workspace</div>
            <nav className="space-y-1">{navItems.map(({ label, icon: Icon, badge }) => <button key={label} onClick={() => { setActiveNav(label); setMobileOpen(false) }} className={`flex w-full items-center justify-between rounded-[9px] px-3 py-2.5 text-[13px] transition ${activeNav === label ? 'bg-[#d8ff3e] font-semibold text-[#12160e]' : 'text-white/55 hover:bg-white/[0.05] hover:text-white'}`}><span className="flex items-center gap-3"><Icon size={16} strokeWidth={1.8} />{label}</span>{badge && <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${activeNav === label ? 'bg-black/10' : 'bg-[#d8ff3e] text-[#151a0f]'}`}>{badge}</span>}</button>)}</nav>
            <div className="mb-3 mt-9 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">Automation</div>
            <nav className="space-y-1"><button className="flex w-full items-center gap-3 rounded-[9px] px-3 py-2.5 text-[13px] text-white/55 hover:bg-white/[0.05] hover:text-white"><Sparkles size={16} />AI agents <span className="ml-auto rounded bg-[#23301a] px-1.5 py-0.5 text-[9px] text-[#c5eb44]">4 live</span></button><button className="flex w-full items-center gap-3 rounded-[9px] px-3 py-2.5 text-[13px] text-white/55 hover:bg-white/[0.05] hover:text-white"><Activity size={16} />Activity log</button><button className="flex w-full items-center gap-3 rounded-[9px] px-3 py-2.5 text-[13px] text-white/55 hover:bg-white/[0.05] hover:text-white"><Settings2 size={16} />Settings</button></nav>
          </div>
          <div className="border-t border-white/[0.07] p-4"><div className="flex items-center gap-3 rounded-xl bg-white/[0.04] p-3"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#d8ff3e] to-[#7d9f18] text-[12px] font-bold text-[#12160e]">JD</div><div className="min-w-0"><div className="truncate text-[12px] font-medium">James Davidson</div><div className="truncate text-[10px] text-white/35">Group marketing</div></div><MoreHorizontal size={16} className="ml-auto text-white/35" /></div></div>
        </aside>
        {mobileOpen && <button className="fixed inset-0 z-20 bg-black/60 lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close menu overlay" />}
        <section className="min-w-0 flex-1">
          <header className="flex h-[76px] items-center justify-between border-b border-white/[0.07] px-5 sm:px-8"><div className="flex items-center gap-3"><button className="text-white/60 lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={21} /></button><div><div className="text-[11px] text-white/35">Tuesday, 24 September 2024</div><h1 className="mt-0.5 text-[17px] font-medium tracking-[-0.03em]">Good morning, James</h1></div></div><div className="flex items-center gap-2 sm:gap-4"><div className="hidden items-center gap-2 rounded-lg border border-white/[0.09] bg-white/[0.025] px-3 py-2 text-[11px] text-white/40 sm:flex"><Search size={14} /> Search anything <kbd className="ml-3 rounded border border-white/10 px-1.5 py-0.5 text-[9px]">⌘ K</kbd></div><button onClick={() => setNotifications(!notifications)} className="relative rounded-lg p-2 text-white/50 hover:bg-white/[0.05]" aria-label="Notifications"><Bell size={18} />{notifications && <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-[#d8ff3e]" />}</button><button className="rounded-lg p-2 text-white/50 hover:bg-white/[0.05]" aria-label="Help"><CircleHelp size={18} /></button><button onClick={() => router.push('/checkout')} className="hidden rounded-lg bg-[#d8ff3e] px-3 py-2 text-[11px] font-semibold text-[#12160e] sm:block">Upgrade plan</button><button onClick={async () => { await signOut(); router.push('/sign-in'); router.refresh() }} className="rounded-lg border border-white/[0.09] px-3 py-2 text-[11px] text-white/55 hover:text-white">Sign out</button></div></header>
          <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 lg:px-10"><div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><div className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#a4c337]"><span className="h-1.5 w-1.5 rounded-full bg-[#d8ff3e] shadow-[0_0_10px_#d8ff3e]" />Live command centre</div><h2 className="text-[28px] font-semibold tracking-[-0.055em] sm:text-[32px]">Overview</h2><p className="mt-1 text-[13px] text-white/40">Your revenue engine is running at full speed.</p></div><div className="flex items-center gap-2"><div className="flex rounded-lg border border-white/[0.09] bg-white/[0.025] p-1">{['Today', 'Last 7 days', 'Last 30 days'].map(item => <button key={item} onClick={() => setRange(item)} className={`rounded-md px-3 py-1.5 text-[10px] transition ${range === item ? 'bg-white/[0.1] text-white' : 'text-white/35 hover:text-white'}`}>{item}</button>)}</div><button className="hidden rounded-lg border border-white/[0.09] p-2 text-white/45 hover:text-white sm:block" aria-label="More options"><MoreHorizontal size={16} /></button></div></div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><Metric title="Revenue attributed" value="£284,690" change="18.4%" note="vs previous period" icon={Wallet} /><Metric title="Vehicles sold" value="126" change="12.8%" note="vs previous period" icon={CarFront} /><Metric title="Blended ROAS" value="6.42x" change="0.84x" note="vs previous period" icon={Gauge} /><Metric title="Hot prospects" value="2,481" change="24.6%" note="active intent signals" icon={Target} /></div>
            <div className="mt-3 grid gap-3 xl:grid-cols-[1.6fr_1fr]"><section className="rounded-xl border border-white/[0.08] bg-[#111512] p-5"><div className="flex items-start justify-between"><div><h3 className="text-[14px] font-medium">Revenue performance</h3><p className="mt-1 text-[11px] text-white/35">Attributed revenue across all channels</p></div><div className="text-right"><div className="text-[23px] font-semibold tracking-[-0.05em]">£284.7k</div><div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-[#c8ed42]"><ArrowUpRight size={12} />18.4%</div></div></div><div className="mt-8 flex h-[178px] items-end gap-[5px] sm:gap-2">{bars.map((height, i) => <div key={i} className="group relative flex h-full flex-1 items-end"><div className={`w-full rounded-t-[3px] transition-all group-hover:bg-[#d8ff3e] ${i > 20 ? 'bg-[#b5da35]' : 'bg-[#40521d]'}`} style={{ height: `${height}%` }} />{i % 4 === 0 && <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-white/25">{['01 Sep','05 Sep','09 Sep','13 Sep','17 Sep','21 Sep'][i / 4]}</span>}</div>)}</div><div className="mt-10 flex items-center gap-5 border-t border-white/[0.06] pt-3 text-[10px] text-white/35"><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#b5da35]" />This period</span><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#40521d]" />Previous period</span><span className="ml-auto hidden sm:inline">Last updated 2 min ago</span></div></section><section className="rounded-xl border border-white/[0.08] bg-[#111512] p-5"><div className="flex items-center justify-between"><div><h3 className="text-[14px] font-medium">Funnel health</h3><p className="mt-1 text-[11px] text-white/35">Visitor to sale conversion</p></div><button className="text-white/35 hover:text-white"><MoreHorizontal size={17} /></button></div><div className="mt-7 space-y-5"><Funnel label="Visitors" value="48,291" width="100%" color="bg-[#d8ff3e]" /><Funnel label="VIN viewers" value="12,840" width="72%" color="bg-[#a4c337]" /><Funnel label="Qualified leads" value="4,128" width="48%" color="bg-[#719020]" /><Funnel label="Test drives" value="1,204" width="30%" color="bg-[#50691e]" /><Funnel label="Purchases" value="126" width="17%" color="bg-[#394d1b]" /></div><div className="mt-7 flex items-center justify-between border-t border-white/[0.06] pt-4"><span className="text-[11px] text-white/40">Visitor → sale</span><span className="text-[13px] font-medium text-[#d8ff3e]">0.26%</span></div></section></div>
            <div className="mt-3 grid gap-3 lg:grid-cols-[1.25fr_1fr]"><section className="rounded-xl border border-white/[0.08] bg-[#111512] p-5"><div className="mb-5 flex items-center justify-between"><div><h3 className="text-[14px] font-medium">Top inventory signals</h3><p className="mt-1 text-[11px] text-white/35">Most engaged vehicles right now</p></div><button className="flex items-center gap-1 text-[11px] text-[#c6e940] hover:text-white">View inventory <ArrowUpRight size={13} /></button></div><div className="overflow-x-auto"><div className="min-w-[560px]"><div className="grid grid-cols-[1.5fr_.65fr_.65fr_.55fr] border-b border-white/[0.06] pb-2 text-[10px] uppercase tracking-[0.12em] text-white/25"><span>Vehicle</span><span>Views</span><span>Leads</span><span>Trend</span></div>{vehicles.map(vehicle => <div key={vehicle.name} className="grid grid-cols-[1.5fr_.65fr_.65fr_.55fr] items-center border-b border-white/[0.05] py-3 last:border-0"><div className="flex items-center gap-3"><div className={`flex h-7 w-7 items-center justify-center rounded-md ${vehicleAccentClasses[vehicle.color as keyof typeof vehicleAccentClasses]}`}><CarFront size={14} /></div><div><div className="text-[12px] font-medium">{vehicle.name}</div><div className="mt-0.5 text-[10px] text-white/30">{vehicle.meta}</div></div></div><span className="text-[12px] text-white/70">{vehicle.views}</span><span className="text-[12px] text-white/70">{vehicle.leads}</span><span className="flex items-center gap-1 text-[11px] text-[#c6e940]"><ArrowUpRight size={12} />{vehicle.trend}</span></div>)}</div></div></section><section className="rounded-xl border border-white/[0.08] bg-[#111512] p-5"><div className="flex items-center justify-between"><div><h3 className="text-[14px] font-medium">Agent activity</h3><p className="mt-1 text-[11px] text-white/35">Autonomous actions in the last hour</p></div><span className="flex items-center gap-1.5 rounded-full bg-[#213019] px-2 py-1 text-[9px] font-medium text-[#c8ed42]"><span className="h-1.5 w-1.5 rounded-full bg-[#d8ff3e]" />Live</span></div><div className="mt-5 space-y-4"><ActivityItem icon={Sparkles} title="Raised bid on BMW iX campaign" detail="Campaign agent · 2 min ago" /><ActivityItem icon={Users} title="Identified 38 high-intent buyers" detail="Discovery agent · 11 min ago" /><ActivityItem icon={Target} title="Synced 142 offline conversions" detail="Analytics agent · 24 min ago" /><ActivityItem icon={Zap} title="Paused 6 sold vehicle ads" detail="Campaign agent · 41 min ago" /></div><button className="mt-4 w-full rounded-lg border border-white/[0.08] py-2 text-[11px] text-white/45 transition hover:border-white/20 hover:text-white">View activity log</button></section></div>
          </div>
        </section>
      </div>
    </main>
  )
}

function Metric({ title, value, change, note, icon: Icon }: { title: string; value: string; change: string; note: string; icon: typeof Wallet }) { return <div className="rounded-xl border border-white/[0.08] bg-[#111512] p-4"><div className="flex items-center justify-between"><span className="text-[11px] text-white/40">{title}</span><Icon size={16} className="text-[#a5c638]" /></div><div className="mt-4 flex items-end justify-between"><span className="text-[23px] font-semibold tracking-[-0.05em]">{value}</span><span className="flex items-center gap-0.5 text-[10px] text-[#c8ed42]"><ArrowUpRight size={11} />{change}</span></div><div className="mt-1 text-[10px] text-white/25">{note}</div></div> }
function Funnel({ label, value, width, color }: { label: string; value: string; width: string; color: string }) { return <div><div className="mb-2 flex justify-between text-[11px]"><span className="text-white/45">{label}</span><span className="text-white/75">{value}</span></div><div className="h-2 rounded-full bg-white/[0.06]"><div className={`h-full rounded-full ${color}`} style={{ width }} /></div></div> }
function ActivityItem({ icon: Icon, title, detail }: { icon: typeof Sparkles; title: string; detail: string }) { return <div className="flex gap-3"><div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#263417] text-[#c9ed43]"><Icon size={14} /></div><div><div className="text-[11px] text-white/75">{title}</div><div className="mt-1 text-[10px] text-white/30">{detail}</div></div></div> }
