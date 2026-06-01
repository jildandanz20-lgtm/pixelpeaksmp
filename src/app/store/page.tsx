// src/app/store/page.tsx
import { prisma } from '@/lib/prisma'
import Navbar from '@/components/layout/Navbar'
import BottomNav from '@/components/layout/BottomNav'
import StoreClient from './StoreClient'

export const revalidate = 300

export default async function StorePage() {
  const [rankPackages, coinPackages] = await Promise.all([
    prisma.rankPackage.findMany({ where:{ isActive:true }, orderBy:{ sortOrder:'asc' } }),
    prisma.coinPackage.findMany({ where:{ isActive:true }, orderBy:{ price:'asc' } }),
  ])

  return (
    <main className="relative min-h-screen">
      <div className="mc-bg" />
      <div className="relative z-10">
        <Navbar />
        <StoreClient rankPackages={rankPackages} coinPackages={coinPackages} />
        <BottomNav />
      </div>
    </main>
  )
}
