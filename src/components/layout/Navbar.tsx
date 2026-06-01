'use client'
// src/components/layout/Navbar.tsx
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/',            label: '🏠 Home' },
  { href: '/store',       label: '🛒 Store' },
  { href: '/leaderboard', label: '🏆 Leaderboard' },
  { href: '/gallery',     label: '🖼️ Galeri' },
  { href: '/join',        label: '▶ Cara Join' },
  { href: '/dashboard',   label: '👤 Dashboard' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const path = usePathname()

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 h-16"
        style={{
          background: 'rgba(15,17,23,0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(34,211,238,0.15)',
        }}
      >
        <Link href="/" className="text-xl font-black tracking-widest uppercase select-none">
          PIXEL<span className="text-cyan-400">PEAK</span>
        </Link>

        <div className="flex items-center gap-2">
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: 'w-9 h-9 rounded-xl border border-white/10',
                },
              }}
            />
          </SignedIn>
          <SignedOut>
            <Link
              href="/sign-in"
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-cyan-400 text-black transition-all hover:bg-cyan-300"
            >
              Login
            </Link>
          </SignedOut>

          <button
            onClick={() => setOpen(!open)}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
            style={{
              background: 'rgba(26,31,46,0.85)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {open ? <X size={18} className="text-cyan-400" /> : <Menu size={18} className="text-cyan-400" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="fixed top-16 left-0 right-0 z-40 flex flex-col gap-1 p-4"
          style={{
            background: 'rgba(15,17,23,0.98)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(34,211,238,0.12)',
          }}
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={cn(
                'px-4 py-3.5 rounded-xl text-base font-medium transition-all',
                path === l.href
                  ? 'bg-cyan-400/10 text-cyan-400'
                  : 'text-white hover:bg-white/5 hover:text-cyan-400'
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
