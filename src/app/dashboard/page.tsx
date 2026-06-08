'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/login')
        return
      }
      setUser(session.user)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.push('/login')
      else setUser(session.user)
    })
    return () => subscription.unsubscribe()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">AC</div>
            <span className="text-xl font-bold text-gray-900">AI Act Compliance</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="text-gray-600 hover:text-blue-600 text-sm font-medium">Pricing</Link>
            <span className="text-sm text-gray-500">{user?.email}</span>
            <button onClick={handleLogout} className="text-gray-600 hover:text-red-600 text-sm font-medium">Sign Out</button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back. Manage your EU AI Act compliance here.</p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-yellow-800">Free Plan</h3>
              <p className="text-sm text-yellow-600">Upgrade to unlock URL scanning, monthly reports, and cloud data storage.</p>
            </div>
            <Link href="/pricing" className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-600">Upgrade</Link>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-6">Compliance Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href="/risk-classification" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600 font-bold text-xl mb-4">R</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Risk Classification</h3>
            <p className="text-gray-600 text-sm">Article 6 decision tree. Determine if your AI system is prohibited, high-risk, limited risk, or minimal risk.</p>
            <p className="text-xs text-blue-600 mt-3 font-medium">Art. 5, 6, Annex III</p>
          </Link>
          <Link href="/compliance-check" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold text-xl mb-4">C</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Compliance Check</h3>
            <p className="text-gray-600 text-sm">Self-assessment questionnaire covering all high-risk obligations from risk management to human oversight.</p>
            <p className="text-xs text-blue-600 mt-3 font-medium">Art. 9-15, 27, 52</p>
          </Link>
          <Link href="/annex-iv-docs" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-xl mb-4">D</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Generate Documentation</h3>
            <p className="text-gray-600 text-sm">Auto-generate Annex IV technical documentation and other regulatory compliance documents.</p>
            <p className="text-xs text-blue-600 mt-3 font-medium">Art. 11, Annex IV</p>
          </Link>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-6">EU AI Act Timeline</h2>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div>
                <p className="font-medium text-gray-900">Feb 2025 - Prohibited Practices (Art. 5)</p>
                <p className="text-sm text-gray-500">Social scoring, remote biometric ID, emotion recognition in workplaces</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div>
                <p className="font-medium text-gray-900">Aug 2025 - GPAI Rules (Art. 51)</p>
                <p className="text-sm text-gray-500">General-purpose AI model obligations and code of practice</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div>
                <p className="font-medium text-gray-900">Aug 2026 - High-Risk AI (Art. 9-49)</p>
                <p className="text-sm text-gray-500">Full compliance required for all high-risk AI systems</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="font-medium text-gray-900">Aug 2027 - Low-Risk AI (Art. 52)</p>
                <p className="text-sm text-gray-500">Transparency obligations for chatbots and AI-generated content</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
