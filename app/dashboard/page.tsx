import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import AddLog from '@/components/AddLog'
export default async function Dash() {
  const s = await getSession()
  if (!s) redirect('/login')
  const uid = (s.user as any).id
  const logs = await prisma.waterLog.findMany({ where: { ownerId: uid }, orderBy: { date: 'desc' } })
  const today = new Date().toISOString().slice(0,10)
  const todayTotal = logs.filter((l: any) => l.date === today).reduce((a: number, l: any) => a + l.amount, 0)
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Water</h1>
        <Link href="/api/auth/signout" className="text-sm text-red-600">Sign out</Link>
      </div>
      <div className="bg-white p-4 rounded shadow mb-4 text-center">
        <p className="text-xs text-gray-500">Today</p>
        <p className="text-2xl font-bold text-cyan-600">{todayTotal} ml</p>
      </div>
      <AddLog />
      <div className="space-y-2">
        {logs.map((l: any) => (
          <div key={l.id} className="bg-white p-3 rounded shadow flex justify-between text-sm">
            <span>{l.amount} ml</span>
            <span className="text-xs text-gray-400">{l.date}</span>
          </div>
        ))}
        {logs.length === 0 && <p className="text-gray-500">No logs yet</p>}
      </div>
    </div>
  )
}
