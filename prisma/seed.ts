import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('demo123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'demo@water.app' },
    update: {},
    create: { email: 'demo@water.app', password },
  })

  await prisma.waterLog.upsert({
    where: { id: 'seed-log' },
    update: {},
    create: { id: 'seed-log', amount: 500, date: '2026-11-07', ownerId: user.id },
  })

  console.log('Seed done')
}

main().finally(() => prisma.$disconnect())
