import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { amount, date } = body
  if (!amount) return NextResponse.json({ error: 'Amount required' }, { status: 400 })

  const log = await prisma.waterLog.create({
    data: { amount: parseInt(amount), date: date || new Date().toISOString().slice(0,10), ownerId: (session.user as any).id },
  })
  return NextResponse.json(log)
}
