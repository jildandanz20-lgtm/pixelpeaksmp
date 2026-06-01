'use client'
// src/components/layout/BottomNav.tsx
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const items = [
  { href: '/',            icon: '🏠', label: 'Home' },
  { href: '/store',       icon: '🛒', label: 'Store' },
  { href: '/leaderboard', icon: '🏆', label: 'Top' },
  { href: '/gallery',     icon: '🖼️', label: 'Galeri' },
  { href: '/join',        icon: '▶',  label: 'Join' },
  { href: '/dashboard',   icon: '👤', label: 'Akun' },
]

export default function BottomNav() {
  const path = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex"
      style={{
        background: 'rgba(15,17,23,0.95)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(34,211,238,0.12)',
        paddingBottom: 'max(8px, env(safe-area-inset-bottom))',
      }}
    >
      {items.map((item) => {
        const active = path === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex-1 flex flex-col items-center gap-0.5 py-2 transition-all',
              active ? 'opacity-100' : 'opacity-50 hover:opacity-80'
            )}
          >
            <span className={cn('text-xl transition-transform', active && '-translate-y-0.5')}>
              {item.icon}
            </span>
            <span
              className={cn('text-[10px] font-medium', active ? 'text-cyan-400' : 'text-slate-400')}
            >
              {item.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
