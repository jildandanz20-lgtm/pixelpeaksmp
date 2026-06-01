// src/app/api/store/purchase/route.ts
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const schema = z.object({
  itemType: z.enum(['RANK', 'COIN']),
  itemId:   z.string(),
  itemName: z.string(),
  price:    z.number().positive(),
})

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 })

  const { itemType, itemId, itemName, price } = parsed.data

  const user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  // Create order
  const order = await prisma.order.create({
    data: {
      userId:   user.id,
      itemType,
      itemId,
      itemName,
      price,
      status:   'PENDING',
    },
  })

  // TODO: Integrate payment gateway (Midtrans/Xendit) here
  // For now, return order info

  return NextResponse.json({
    success: true,
    orderId: order.id,
    message: 'Order created. Silakan lakukan pembayaran via transfer.',
    paymentInfo: {
      bank:      'BCA',
      noRek:     '1234567890',
      atasNama:  'PixelPeak SMP',
      nominal:   price,
      orderId:   order.id,
    },
  })
}
