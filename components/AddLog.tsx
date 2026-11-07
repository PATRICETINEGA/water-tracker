'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
export default function AddLog() {
  const [amount, setAmount] = useState('250')
  const [loading, setLoading] = useState(false)
  const r = useRouter()
  async function submit(e: any) {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/logs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount }) })
    setLoading(false); r.refresh()
  }
  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow mb-4 space-y-2">
      <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Amount (ml)" type="number" className="w-full border p-2 rounded text-sm" required />
      <button type="submit" disabled={loading} className="bg-cyan-600 text-white px-4 py-1 rounded text-sm disabled:opacity-50">Log</button>
    </form>
  )
}
