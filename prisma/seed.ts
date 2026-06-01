// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Rank Packages
  await prisma.rankPackage.deleteMany()
  await prisma.rankPackage.createMany({
    data: [
      {
        name: 'IRON',
        displayName: '⚙️ Iron',
        price: 15000,
        color: '#94a3b8',
        features: [
          'Prefix [Iron] di chat',
          'Akses /kit iron setiap 24 jam',
          '2x claim land tambahan',
          'Warna nama abu di tab list',
        ],
        sortOrder: 1,
      },
      {
        name: 'GOLD',
        displayName: '🥇 Gold',
        price: 30000,
        color: '#f59e0b',
        features: [
          'Prefix [Gold] di chat',
          'Akses /kit gold setiap 24 jam',
          '5x claim land tambahan',
          'Warna nama kuning di tab list',
          'Akses /fly di spawn area',
        ],
        sortOrder: 2,
      },
      {
        name: 'DIAMOND',
        displayName: '💎 Diamond',
        price: 55000,
        color: '#93c5fd',
        features: [
          'Prefix [Diamond] di chat',
          'Akses /kit diamond setiap 12 jam',
          '10x claim land tambahan',
          'Warna nama biru di tab list',
          'Akses /fly di seluruh world',
          'Akses /nick dan /hat',
        ],
        sortOrder: 3,
      },
      {
        name: 'EMERALD',
        displayName: '💚 Emerald',
        price: 100000,
        color: '#34d399',
        features: [
          'Prefix [Emerald] di chat',
          'Akses /kit emerald setiap 6 jam',
          'Unlimited claim land',
          'Warna nama hijau di tab list',
          'Akses /fly di seluruh world',
          'Akses /nick, /hat, /god',
          'Priority queue saat server penuh',
          'Badge eksklusif di website',
        ],
        sortOrder: 4,
      },
    ],
  })

  // Coin Packages
  await prisma.coinPackage.deleteMany()
  await prisma.coinPackage.createMany({
    data: [
      { coins: 100, bonus: 0, price: 10000 },
      { coins: 250, bonus: 0, price: 20000 },
      { coins: 600, bonus: 50, price: 45000 },
      { coins: 1500, bonus: 200, price: 85000 },
      { coins: 3500, bonus: 600, price: 175000 },
    ],
  })

  // Server Stats
  await prisma.serverStats.upsert({
    where: { id: 'main' },
    update: { onlinePlayers: 47, isOnline: true },
    create: { id: 'main', onlinePlayers: 47, maxPlayers: 200, isOnline: true },
  })

  console.log('✅ Seed complete!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
