// src/app/dashboard/page.tsx
import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Navbar from '@/components/layout/Navbar'
import BottomNav from '@/components/layout/BottomNav'
import { formatPlaytime, formatNumber, formatRupiah, RANK_COLORS, RANK_LABELS } from '@/lib/utils'

export default async function DashboardPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const clerkUser = await currentUser()

  // Get or create user in DB
  let user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!user) {
    const email    = clerkUser?.emailAddresses?.[0]?.emailAddress ?? ''
    const username = clerkUser?.username ?? email.split('@')[0] ?? 'Player'
    user = await prisma.user.create({
      data: { clerkId: userId, username, email, avatarUrl: clerkUser?.imageUrl },
    })
  }

  const transactions = await prisma.transaction.findMany({
    where:   { userId: user.id },
    orderBy: { createdAt: 'desc' },
    take:    5,
  })

  return (
    <main className="relative min-h-screen">
      <div className="mc-bg" />
      <div className="relative z-10">
        <Navbar />
        <div className="px-5 pt-20 pb-32 max-w-2xl mx-auto">

          {/* Greeting */}
          <div className="mb-6">
            <h1 className="text-2xl font-black">
              👋 Halo, <span className="text-cyan-400">{user.username}!</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">Dashboard member PixelPeak SMP</p>
          </div>

          {/* Profile card */}
          <div
            className="flex items-center gap-4 p-5 rounded-2xl mb-4"
            style={{
              background: 'rgba(26,31,46,0.85)',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
              style={{ background: 'linear-gradient(135deg,#1e3a5f,#0c2340)', border: '2px solid rgba(34,211,238,0.2)' }}
            >
              {clerkUser?.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={clerkUser.imageUrl} alt="avatar" className="w-full h-full rounded-2xl object-cover" />
              ) : '⛏️'}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-black">{user.username}</h3>
              <p className="text-xs text-slate-400">Bergabung {new Date(user.createdAt).toLocaleDateString('id-ID', { year:'numeric',month:'short' })}</p>
            </div>
            <span
              className="px-3 py-1.5 rounded-xl text-xs font-bold"
              style={{
                background: 'rgba(34,211,238,0.1)',
                border: '1px solid rgba(34,211,238,0.2)',
                color: RANK_COLORS[user.rank],
              }}
            >
              {RANK_LABELS[user.rank]}
            </span>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { label: 'Playtime',       value: formatPlaytime(user.playtime), color: 'text-cyan-400' },
              { label: 'Coin Balance',   value: formatNumber(user.coins),      color: 'text-yellow-400' },
              { label: 'Kills',          value: formatNumber(user.kills),      color: 'text-white' },
              { label: 'In-Game Money',  value: `$${formatNumber(user.balance)}`, color: 'text-cyan-400' },
            ].map((s) => (
              <div
                key={s.label}
                className="p-4 rounded-2xl"
                style={{ background:'rgba(26,31,46,0.85)', border:'1px solid rgba(255,255,255,0.07)', backdropFilter:'blur(12px)' }}
              >
                <p className="text-xs text-slate-400 mb-1">{s.label}</p>
                <p className={`text-2xl font-black font-mono ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Transactions */}
          <div
            className="p-5 rounded-2xl"
            style={{ background:'rgba(26,31,46,0.85)', border:'1px solid rgba(255,255,255,0.07)', backdropFilter:'blur(12px)' }}
          >
            <h3 className="text-base font-bold mb-4">
              🪙 Riwayat <span className="text-cyan-400">Transaksi</span>
            </h3>
            {transactions.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-4">Belum ada transaksi</p>
            ) : (
              <div className="flex flex-col divide-y divide-white/5">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex justify-between items-center py-3">
                    <div>
                      <p className="text-sm text-slate-300">{tx.description}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {new Date(tx.createdAt).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                    <span className={`text-sm font-bold font-mono ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {tx.amount > 0 ? '+' : ''}{tx.type.includes('COIN') ? `${tx.amount} Coin` : formatRupiah(Math.abs(tx.amount))}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <BottomNav />
      </div>
    </main>
  )
}
