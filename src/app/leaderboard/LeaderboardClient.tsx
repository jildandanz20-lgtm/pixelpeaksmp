'use client'
// src/app/leaderboard/LeaderboardClient.tsx
import { useState } from 'react'
import { formatPlaytime, formatNumber, RANK_COLORS, RANK_LABELS } from '@/lib/utils'

type Tab = 'playtime' | 'kills' | 'balance' | 'votes'

const tabs: { key: Tab; label: string }[] = [
  { key: 'playtime', label: '⏱ Playtime' },
  { key: 'kills',    label: '⚔️ Kills' },
  { key: 'balance',  label: '💰 Balance' },
  { key: 'votes',    label: '👍 Votes' },
]

const rankBadge = ['🥇', '🥈', '🥉']
const rankBg    = [
  'rgba(245,158,11,0.12)',
  'rgba(148,163,184,0.12)',
  'rgba(180,83,9,0.12)',
]
const rankBorder = [
  'rgba(245,158,11,0.3)',
  'rgba(148,163,184,0.3)',
  'rgba(180,83,9,0.3)',
]
const rankColor = ['#f59e0b', '#94a3b8', '#b45309']

export default function LeaderboardClient({ data }: { data: Record<Tab, any[]> }) {
  const [tab, setTab] = useState<Tab>('playtime')

  function getValue(item: any): string {
    switch (tab) {
      case 'playtime': return formatPlaytime(item.playtime ?? 0)
      case 'kills':    return `${formatNumber(item.kills ?? 0)} kills`
      case 'balance':  return `$${formatNumber(item.balance ?? 0)}`
      case 'votes':    return `${item.votes ?? 0} votes`
    }
  }

  const list = data[tab]

  return (
    <div className="pt-20 pb-32 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center px-5 mb-6">
        <h1 className="text-3xl font-black mb-2">🏆 Leaderboard</h1>
        <p className="text-slate-400 text-sm">Pemain terbaik PixelPeak SMP</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap justify-center px-5 mb-6">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="px-4 py-2 rounded-xl text-sm font-bold transition-all"
            style={
              tab === t.key
                ? { background: '#22d3ee', color: '#000' }
                : { background: 'rgba(26,31,46,0.85)', color: 'white', border: '1px solid rgba(255,255,255,0.07)' }
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex flex-col gap-2.5 px-5">
        {list.length === 0 && (
          <p className="text-center text-slate-400 py-12">Belum ada data.</p>
        )}
        {list.map((item, i) => (
          <div
            key={item.username}
            className="flex items-center gap-3 p-4 rounded-2xl transition-all"
            style={{
              background: 'rgba(26,31,46,0.85)',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* Rank number */}
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-base font-black flex-shrink-0"
              style={{
                background: i < 3 ? rankBg[i] : 'rgba(255,255,255,0.04)',
                border:     `1px solid ${i < 3 ? rankBorder[i] : 'rgba(255,255,255,0.07)'}`,
                color:      i < 3 ? rankColor[i] : '#64748b',
              }}
            >
              {i < 3 ? rankBadge[i] : i + 1}
            </div>

            {/* Avatar */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 overflow-hidden"
              style={{ background: 'linear-gradient(135deg,#1e3a5f,#0c2340)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {item.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.avatarUrl} alt={item.username} className="w-full h-full object-cover" />
              ) : '⛏️'}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate">{item.username}</p>
              <p className="text-xs mt-0.5" style={{ color: RANK_COLORS[item.rank] }}>
                {RANK_LABELS[item.rank]}
              </p>
            </div>

            {/* Score */}
            <div className="text-right flex-shrink-0">
              <p className="text-base font-black font-mono text-cyan-400">{getValue(item)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
