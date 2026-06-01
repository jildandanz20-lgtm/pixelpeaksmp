'use client'
// src/components/home/HeroSection.tsx
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center text-center gap-6 px-5 pt-24 pb-6 max-w-2xl mx-auto">
      {/* Logo */}
      <div
        className="text-4xl font-black tracking-widest uppercase select-none"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          textShadow: '0 0 40px rgba(34,211,238,0.4)',
          animation: 'float 3s ease-in-out infinite',
        }}
      >
        PIXEL<span style={{ color: '#f59e0b' }}>PEAK</span>
        <br />
        <span className="text-2xl text-cyan-400" style={{ letterSpacing: '8px' }}>SMP</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 justify-center">
        {['Java & Bedrock', 'Survival SMP', 'Indonesia', '24/7 Online'].map((tag) => (
          <span
            key={tag}
            className="px-4 py-2 text-sm font-medium rounded-full"
            style={{
              background: 'rgba(15,17,23,0.85)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Link
          href="/join"
          className="flex items-center justify-center gap-2 py-4 rounded-2xl text-base font-bold text-black bg-cyan-400 transition-all hover:bg-cyan-300 hover:-translate-y-0.5 active:translate-y-0"
          style={{ boxShadow: '0 8px 24px rgba(34,211,238,0.25)' }}
        >
          ▶ &nbsp;Play Now
        </Link>
        <a
          href="https://discord.gg/pixelpeaksmp"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-4 rounded-2xl text-base font-semibold transition-all hover:border-cyan-400/40"
          style={{
            background: 'rgba(26,31,46,0.85)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          ↗ &nbsp;Join Discord
        </a>
      </div>
    </section>
  )
}
