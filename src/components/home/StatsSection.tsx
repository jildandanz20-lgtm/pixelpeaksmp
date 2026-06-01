// src/components/home/StatsSection.tsx
interface Props {
  onlinePlayers: number
  totalPlayers: number
  isOnline: boolean
}

export default function StatsSection({ onlinePlayers, totalPlayers, isOnline }: Props) {
  const stats = [
    { icon: '🎮', label: 'Version', value: '1.8 – 1.21.x' },
    { icon: '👥', label: 'Player Register', value: `${totalPlayers || '500'}+` },
    {
      icon: '🟢',
      label: 'Status Server',
      value: (
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block w-2 h-2 rounded-full bg-green-500"
            style={{ boxShadow: '0 0 8px #22c55e', animation: 'pulse-dot 2s infinite' }}
          />
          {isOnline ? 'Online' : 'Offline'}
        </span>
      ),
    },
    { icon: '💬', label: 'Bedrock Port', value: process.env.NEXT_PUBLIC_BEDROCK_PORT ?? '19132' },
  ]

  return (
    <div className="flex flex-col gap-3 px-5 pb-8 max-w-2xl mx-auto">
      {stats.map((s, i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-4 rounded-2xl"
          style={{
            background: 'rgba(26,31,46,0.85)',
            border: '1px solid rgba(255,255,255,0.07)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <span className="text-2xl w-8 text-center flex-shrink-0">{s.icon}</span>
          <div>
            <p className="text-xs text-slate-500 font-medium">{s.label}</p>
            <p className="text-base font-bold font-mono mt-0.5">{s.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
