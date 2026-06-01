// src/app/api/webhook/clerk/route.ts
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET
  if (!WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'No webhook secret' }, { status: 500 })
  }

  const headerPayload = headers()
  const svixId        = headerPayload.get('svix-id')
  const svixTimestamp = headerPayload.get('svix-timestamp')
  const svixSignature = headerPayload.get('svix-signature')

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 })
  }

  const payload = await req.json()
  const body    = JSON.stringify(payload)

  let evt: any
  try {
    const wh = new Webhook(WEBHOOK_SECRET)
    evt = wh.verify(body, {
      'svix-id':        svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    })
  } catch (err) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const { type, data } = evt

  // ── user.created → insert to DB ──────────────────────────────────────────
  if (type === 'user.created') {
    const email    = data.email_addresses?.[0]?.email_address ?? ''
    const username = data.username ?? email.split('@')[0]

    await prisma.user.upsert({
      where:  { clerkId: data.id },
      update: {},
      create: {
        clerkId:   data.id,
        username:  username,
        email:     email,
        avatarUrl: data.image_url,
        role:      'MEMBER',
        rank:      'DEFAULT',
      },
    })
  }

  // ── user.updated ─────────────────────────────────────────────────────────
  if (type === 'user.updated') {
    await prisma.user.updateMany({
      where: { clerkId: data.id },
      data:  { avatarUrl: data.image_url },
    })
  }

  // ── user.deleted ─────────────────────────────────────────────────────────
  if (type === 'user.deleted') {
    await prisma.user.deleteMany({ where: { clerkId: data.id } })
  }

  return NextResponse.json({ success: true })
}
