'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push('/login')
      else setUser(session.user)
      setLoading(false)
    })
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Welcome, {user?.email}</h2>
          <p className="text-gray-600">This is your AI Act Compliance dashboard. Select a feature to get started.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/risk-classification" className="bg-white p-6 rounded-lg shadow hover:shadow-md cursor-pointer border-t-4 border-blue-500 block">
            <h3 className="font-semibold text-lg mb-2">Risk Classification</h3>
            <p className="text-gray-500 text-sm">Classify your AI system risk level</p>
          </Link>
          <Link href="/compliance-check" className="bg-white p-6 rounded-lg shadow hover:shadow-md cursor-pointer border-t-4 border-green-500 block">
            <h3 className="font-semibold text-lg mb-2">Compliance Check</h3>
            <p className="text-gray-500 text-sm">Self-assessment questionnaire</p>
          </Link>
          <Link href="/annex-iv-docs" className="bg-white p-6 rounded-lg shadow hover:shadow-md cursor-pointer border-t-4 border-purple-500 block">
            <h3 className="font-semibold text-lg mb-2">Annex IV Docs</h3>
            <p className="text-gray-500 text-sm">Generate technical documentation</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
