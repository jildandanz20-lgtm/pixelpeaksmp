// src/components/layout/Footer.tsx
import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      className="px-5 py-10 max-w-2xl mx-auto"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="mb-6">
        <p className="text-xl font-black tracking-widest uppercase mb-1">
          PIXEL<span className="text-cyan-400">PEAK</span>
        </p>
        <p className="text-sm text-slate-400">Server Minecraft Survival terbaik di Indonesia</p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <p className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3">Quick Links</p>
          <div className="flex flex-col gap-2">
            <Link href="/store" className="text-sm text-slate-400 hover:text-white transition-colors">Store</Link>
            <Link href="/leaderboard" className="text-sm text-slate-400 hover:text-white transition-colors">Leaderboard</Link>
            <Link href="/join" className="text-sm text-slate-400 hover:text-white transition-colors">Cara Join</Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3">Server</p>
          <div className="flex flex-col gap-2">
            <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Rules</a>
            <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Discord</a>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-600 text-center">
        © 2026 PixelPeak SMP. All rights reserved.
      </p>
    </footer>
  )
}
