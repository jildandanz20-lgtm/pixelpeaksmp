// src/app/admin/page.tsx
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Navbar from '@/components/layout/Navbar'
import BottomNav from '@/components/layout/BottomNav'
import { formatRupiah } from '@/lib/utils'

export default async function AdminPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  // Check admin role
  const user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!user || !['ADMIN', 'OWNER'].includes(user.role)) {
    redirect('/')
  }

  // Fetch stats
  const [
    totalPlayers,
    onlineNow,
    pendingOrders,
    recentOrders,
    recentUsers,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.serverStats.findFirst().then((s) => s?.onlinePlayers ?? 0),
    prisma.order.count({ where: { status: 'PENDING' } }),
    prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { user: { select: { username: true } } },
    }),
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { username: true, rank: true, createdAt: true },
    }),
  ])

  const monthRevenue = await prisma.order.aggregate({
    where: {
      status: 'SUCCESS',
      createdAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) },
    },
    _sum: { price: true },
  })

  const cardStyle = {
    background: 'rgba(26,31,46,0.85)',
    border: '1px solid rgba(255,255,255,0.07)',
    backdropFilter: 'blur(12px)',
  }

  const statusColor: Record<string, string> = {
    SUCCESS: '#22c55e',
    PENDING: '#f59e0b',
    FAILED:  '#ef4444',
  }
  const statusLabel: Record<string, string> = {
    SUCCESS: 'Sukses ✓',
    PENDING: 'Pending...',
    FAILED:  'Gagal ✗',
  }

  return (
    <main className="relative min-h-screen">
      <div className="mc-bg" />
      <div className="relative z-10">
        <Navbar />
        <div className="pt-20 pb-32 max-w-2xl mx-auto px-5">

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-black">⚙️ Admin Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">PixelPeak SMP — Panel Kontrol</p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { label: 'Total Players', value: totalPlayers, color: 'text-cyan-400', trend: '↑ Growing' },
              { label: 'Online Sekarang', value: onlineNow, color: 'text-green-400', trend: 'Peak: 120' },
              { label: 'Revenue Bulan Ini', value: formatRupiah(monthRevenue._sum.price ?? 0), color: 'text-yellow-400', trend: '↑ +18%' },
              { label: 'Pending Orders', value: pendingOrders, color: 'text-red-400', trend: 'Butuh konfirmasi' },
            ].map((s) => (
              <div key={s.label} className="p-4 rounded-2xl" style={cardStyle}>
                <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">{s.label}</p>
                <p className={`text-2xl font-black font-mono ${s.color}`}>{s.value}</p>
                <p className="text-xs text-slate-500 mt-1">{s.trend}</p>
              </div>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="rounded-2xl overflow-hidden mb-4" style={cardStyle}>
            <div className="px-5 py-4 border-b border-white/5 text-sm font-bold">
              📋 Transaksi <span className="text-cyan-400">Terbaru</span>
            </div>
            {recentOrders.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-8">Belum ada order</p>
            ) : (
              recentOrders.map((o) => (
                <div key={o.id} className="flex items-center justify-between px-5 py-3.5 border-b border-white/5 last:border-0">
                  <div>
                    <p className="text-sm font-semibold">{o.user.username}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{o.itemName}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-bold"
                      style={{
                        background: `${statusColor[o.status]}20`,
                        color: statusColor[o.status],
                      }}
                    >
                      {statusLabel[o.status] ?? o.status}
                    </span>
                    <p className="text-xs text-slate-500 mt-1">{formatRupiah(o.price)}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Recent Players */}
          <div className="rounded-2xl overflow-hidden" style={cardStyle}>
            <div className="px-5 py-4 border-b border-white/5 text-sm font-bold">
              👥 Player <span className="text-cyan-400">Baru</span>
            </div>
            {recentUsers.map((u) => (
              <div key={u.username} className="flex items-center justify-between px-5 py-3.5 border-b border-white/5 last:border-0">
                <div>
                  <p className="text-sm font-semibold">{u.username}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Join {new Date(u.createdAt).toLocaleDateString('id-ID')}
                  </p>
                </div>
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-bold"
                  style={{ background: 'rgba(34,211,238,0.1)', color: '#22d3ee' }}
                >
                  {u.rank}
                </span>
              </div>
            ))}
          </div>

        </div>
        <BottomNav />
      </div>
    </main>
  )
}
