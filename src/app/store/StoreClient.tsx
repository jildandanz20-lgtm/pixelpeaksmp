'use client'
// src/app/store/StoreClient.tsx
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import { formatRupiah } from '@/lib/utils'

interface RankPackage {
  id: string; name: string; displayName: string; price: number
  color: string; features: string[]
}
interface CoinPackage {
  id: string; coins: number; bonus: number; price: number
}

export default function StoreClient({
  rankPackages,
  coinPackages,
}: {
  rankPackages: RankPackage[]
  coinPackages: CoinPackage[]
}) {
  const [tab, setTab]         = useState<'rank' | 'coin'>('rank')
  const [loading, setLoading] = useState<string | null>(null)
  const { isSignedIn }        = useUser()
  const router                = useRouter()

  async function handlePurchase(itemType: 'RANK' | 'COIN', itemId: string, itemName: string, price: number) {
    if (!isSignedIn) { router.push('/sign-in'); return }
    setLoading(itemId)
    try {
      const res = await fetch('/api/store/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemType, itemId, itemName, price }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      toast.success('Order berhasil dibuat! Silakan lakukan pembayaran.')
    } catch (e: any) {
      toast.error(e.message ?? 'Gagal membuat order')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="pt-20 pb-32 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center px-5 mb-6">
        <h1 className="text-3xl font-black mb-2">Server Store</h1>
        <p className="text-slate-400 text-sm">Beli Rank dan Coin untuk meningkatkan pengalaman bermainmu</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 justify-center mb-6 px-5">
        {(['rank','coin'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-6 py-2.5 rounded-xl text-sm font-bold transition-all"
            style={
              tab === t
                ? { background: '#22d3ee', color: '#000' }
                : { background: 'rgba(26,31,46,0.85)', color: 'white', border: '1px solid rgba(255,255,255,0.07)' }
            }
          >
            {t === 'rank' ? 'Rank' : 'Coin / TopUp'}
          </button>
        ))}
      </div>

      {/* Rank Items */}
      {tab === 'rank' && (
        <div className="flex flex-col gap-4 px-5">
          {rankPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="rounded-2xl overflow-hidden"
              style={{ background: 'rgba(26,31,46,0.85)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)' }}
            >
              <div className="flex items-center justify-between px-4 py-3">
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(15,17,23,0.8)', color: '#94a3b8' }}
                >Rank</span>
                <span
                  className="px-3 py-1.5 rounded-full text-xs font-bold text-black"
                  style={{ background: '#22d3ee' }}
                >{formatRupiah(pkg.price)}</span>
              </div>

              {/* Visual */}
              <div
                className="h-24 flex items-center justify-center text-5xl font-black font-mono tracking-widest"
                style={{ color: `${pkg.color}30` }}
              >
                {pkg.name.slice(0, 2)}
              </div>

              <div className="px-4 pb-4">
                <h3 className="text-lg font-black mb-3">{pkg.displayName}</h3>
                <div className="flex flex-col gap-1.5 mb-4">
                  {pkg.features.map((f, i) => (
                    <p key={i} className="text-sm text-slate-400 flex items-center gap-2">
                      <span className="text-cyan-400 font-bold">✓</span>{f}
                    </p>
                  ))}
                </div>
                <button
                  onClick={() => handlePurchase('RANK', pkg.id, pkg.displayName, pkg.price)}
                  disabled={!!loading}
                  className="w-full py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-60"
                  style={{ background: '#22d3ee', color: '#000' }}
                >
                  {loading === pkg.id ? 'Memproses...' : 'Purchase'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Coin Items */}
      {tab === 'coin' && (
        <div className="flex flex-col gap-4 px-5">
          {coinPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="rounded-2xl overflow-hidden"
              style={{ background: 'rgba(26,31,46,0.85)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)' }}
            >
              <div className="flex items-center justify-between px-4 py-3">
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background:'rgba(15,17,23,0.8)', color:'#94a3b8' }}
                >Coin</span>
                <span
                  className="px-3 py-1.5 rounded-full text-xs font-bold text-black"
                  style={{ background:'#22d3ee' }}
                >{formatRupiah(pkg.price)}</span>
              </div>
              <div
                className="h-20 flex items-center justify-center text-5xl font-black font-mono"
                style={{ color: 'rgba(245,158,11,0.25)' }}
              >
                {pkg.coins.toLocaleString()}
              </div>
              <div className="px-4 pb-4">
                <h3 className="text-lg font-black mb-3">
                  🪙 {pkg.coins.toLocaleString()} Coin
                  {pkg.bonus > 0 && (
                    <span className="ml-2 text-sm font-normal text-green-400">+{pkg.bonus} Bonus</span>
                  )}
                </h3>
                <button
                  onClick={() => handlePurchase('COIN', pkg.id, `${pkg.coins} Coin`, pkg.price)}
                  disabled={!!loading}
                  className="w-full py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-60"
                  style={{ background:'#22d3ee', color:'#000' }}
                >
                  {loading === pkg.id ? 'Memproses...' : `Beli ${pkg.coins.toLocaleString()} Coin`}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
