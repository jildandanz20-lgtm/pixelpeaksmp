'use client'
// src/app/join/page.tsx
import Navbar from '@/components/layout/Navbar'
import BottomNav from '@/components/layout/BottomNav'
import { toast } from 'sonner'

const SERVER_IP   = process.env.NEXT_PUBLIC_SERVER_IP   ?? 'play.pixelpeaksmp.id'
const BEDROCK_PORT = process.env.NEXT_PUBLIC_BEDROCK_PORT ?? '19132'

function copyText(text: string) {
  navigator.clipboard.writeText(text).catch(() => {})
  toast.success(`✓ "${text}" disalin!`)
}

const steps = [
  {
    n: 1,
    title: 'Buka Minecraft',
    desc: 'Pastikan kamu sudah install Minecraft Java Edition (1.8–1.21.x) atau Bedrock Edition.',
  },
  {
    n: 2,
    title: 'Tambah Server',
    desc: 'Klik Multiplayer → Add Server. Beri nama bebas, lalu masukkan IP server di bawah.',
  },
  {
    n: 3,
    title: 'Masukkan IP Server',
    desc: null,
    custom: true,
  },
  {
    n: 4,
    title: 'Connect & Bermain!',
    desc: 'Klik Join Server dan mulai petualanganmu di PixelPeak SMP. Selamat bermain! 🎮',
  },
]

export default function JoinPage() {
  const cardStyle = {
    background: 'rgba(26,31,46,0.85)',
    border: '1px solid rgba(255,255,255,0.07)',
    backdropFilter: 'blur(12px)',
  }

  return (
    <main className="relative min-h-screen">
      <div className="mc-bg" />
      <div className="relative z-10">
        <Navbar />
        <div className="pt-20 pb-32 max-w-2xl mx-auto px-5">
          <h1 className="text-2xl font-black mb-2">Cara Join Server</h1>
          <p className="text-slate-400 text-sm mb-7">Ikuti langkah mudah berikut untuk bergabung ke PixelPeak SMP</p>

          {/* Steps */}
          <div className="flex flex-col gap-3 mb-6">
            {steps.map((s) => (
              <div key={s.n} className="flex gap-4 p-4 rounded-2xl" style={cardStyle}>
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black text-black flex-shrink-0"
                  style={{ background: '#22d3ee' }}
                >
                  {s.n}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold mb-1">{s.title}</h3>
                  {s.desc && <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>}
                  {s.custom && (
                    <div className="flex flex-col gap-2 mt-1">
                      <p className="text-xs text-slate-400">
                        IP Java:{' '}
                        <button
                          onClick={() => copyText(SERVER_IP)}
                          className="font-mono text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-md text-xs hover:bg-cyan-400/20 transition-colors"
                        >
                          {SERVER_IP}
                        </button>
                      </p>
                      <p className="text-xs text-slate-400">
                        IP Bedrock:{' '}
                        <button
                          onClick={() => copyText(SERVER_IP)}
                          className="font-mono text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-md text-xs hover:bg-cyan-400/20 transition-colors"
                        >
                          {SERVER_IP}
                        </button>
                        {' '}Port:{' '}
                        <button
                          onClick={() => copyText(BEDROCK_PORT)}
                          className="font-mono text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-md text-xs hover:bg-cyan-400/20 transition-colors"
                        >
                          {BEDROCK_PORT}
                        </button>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Server info card */}
          <div className="p-5 rounded-2xl" style={{ ...cardStyle, border: '1px solid rgba(34,211,238,0.18)' }}>
            <h3 className="text-sm font-bold text-cyan-400 mb-4">📡 Info Server</h3>
            {[
              { label: 'Status',       value: <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" style={{ boxShadow:'0 0 8px #22c55e' }} />Online</span> },
              { label: 'IP Java',      value: SERVER_IP,      mono: true, cyan: true },
              { label: 'IP Bedrock',   value: SERVER_IP,      mono: true, cyan: true },
              { label: 'Bedrock Port', value: BEDROCK_PORT,   mono: true },
              { label: 'Versi',        value: '1.8 – 1.21.x', mono: true },
              { label: 'Max Players',  value: '200',          mono: true },
            ].map((row) => (
              <div
                key={row.label}
                className="flex justify-between items-center py-2.5"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
              >
                <span className="text-xs text-slate-400">{row.label}</span>
                <span className={`text-sm font-semibold ${row.mono ? 'font-mono' : ''} ${row.cyan ? 'text-cyan-400' : ''}`}>
                  {row.value}
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
