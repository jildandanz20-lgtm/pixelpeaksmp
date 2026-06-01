// src/app/page.tsx
import { prisma } from '@/lib/prisma'
import Navbar from '@/components/layout/Navbar'
import BottomNav from '@/components/layout/BottomNav'
import HeroSection from '@/components/home/HeroSection'
import StatsSection from '@/components/home/StatsSection'
import FeaturesSection from '@/components/home/FeaturesSection'
import Footer from '@/components/layout/Footer'

export const revalidate = 60 // ISR every 60s

async function getServerStats() {
  try {
    const stats = await prisma.serverStats.findFirst()
    const totalPlayers = await prisma.user.count()
    return { stats, totalPlayers }
  } catch {
    return { stats: null, totalPlayers: 0 }
  }
}

export default async function HomePage() {
  const { stats, totalPlayers } = await getServerStats()

  return (
    <main className="relative min-h-screen">
      <div className="mc-bg" />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <StatsSection
          onlinePlayers={stats?.onlinePlayers ?? 47}
          totalPlayers={totalPlayers}
          isOnline={stats?.isOnline ?? true}
        />
        <FeaturesSection />
        <Footer />
        <BottomNav />
      </div>
    </main>
  )
}
