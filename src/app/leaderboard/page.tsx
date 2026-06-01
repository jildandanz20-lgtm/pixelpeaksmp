// src/app/leaderboard/page.tsx
import { prisma } from '@/lib/prisma'
import Navbar from '@/components/layout/Navbar'
import BottomNav from '@/components/layout/BottomNav'
import LeaderboardClient from './LeaderboardClient'

export const revalidate = 120

async function getData() {
  const [playtime, kills, balance, votes] = await Promise.all([
    prisma.user.findMany({ orderBy: { playtime: 'desc' }, take: 10,
      select: { username:true, rank:true, playtime:true, avatarUrl:true } }),
    prisma.user.findMany({ orderBy: { kills: 'desc' }, take: 10,
      select: { username:true, rank:true, kills:true, avatarUrl:true } }),
    prisma.user.findMany({ orderBy: { balance: 'desc' }, take: 10,
      select: { username:true, rank:true, balance:true, avatarUrl:true } }),
    prisma.user.findMany({ orderBy: { votes: 'desc' }, take: 10,
      select: { username:true, rank:true, votes:true, avatarUrl:true } }),
  ])
  return { playtime, kills, balance, votes }
}

export default async function LeaderboardPage() {
  const data = await getData()

  return (
    <main className="relative min-h-screen">
      <div className="mc-bg" />
      <div className="relative z-10">
        <Navbar />
        <LeaderboardClient data={data} />
        <BottomNav />
      </div>
    </main>
  )
}
