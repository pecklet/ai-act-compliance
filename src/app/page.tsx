'use client'
import Link from 'next/link'
import ChatBot from '@/components/ChatBot'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">AC</div>
            <span className="text-xl font-bold text-gray-900">AI Act Compliance</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="text-gray-600 hover:text-blue-600 text-sm font-medium">Pricing</Link>
            <Link href="/login" className="text-gray-600 hover:text-blue-600 text-sm font-medium">Sign In</Link>
            <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">Sign Up</Link>
          </div>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">EU AI Act Compliance Platform for SMEs</h1>
        <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">Continuous compliance operation platform. Assess risk, generate documentation, monitor compliance, and stay ahead of regulatory changes.</p>
        <p className="text-sm text-gray-500 mb-8">Based on Regulation (EU) 2024/1689. Covers Articles 5-73 and Annexes I-IV.</p>
        <div className="flex justify-center gap-4 mb-12">
          <Link href="/register" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 text-lg">Start Free Assessment</Link>
          <Link href="/pricing" className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 text-lg">View Plans</Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-xl mb-4">1</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Classify Your Risk Level</h3>
            <p className="text-gray-600 text-sm">Answer 16 questions based on Article 6 and Annex III to determine if your AI system is prohibited, high-risk, limited risk, or minimal risk.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-xl mb-4">2</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Complete Compliance Check</h3>
            <p className="text-gray-600 text-sm">Self-assessment questionnaire covering risk management, data governance, technical documentation, transparency, human oversight, and more.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-xl mb-4">3</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Generate Documentation</h3>
            <p className="text-gray-600 text-sm">Auto-generate Annex IV technical documentation, compliance declarations, transparency notices, and 15+ regulatory templates.</p>
          </div>
        </div>
      </section>

      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Why Compliance Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="text-white">
              <p className="text-4xl font-bold mb-2">EUR 35M</p>
              <p className="text-blue-200 text-sm">Maximum fine for prohibited AI practices (7% global turnover)</p>
            </div>
            <div className="text-white">
              <p className="text-4xl font-bold mb-2">Aug 2026</p>
              <p className="text-blue-200 text-sm">Deadline for high-risk AI system compliance (Art. 9-49)</p>
            </div>
            <div className="text-white">
              <p className="text-4xl font-bold mb-2">100%</p>
              <p className="text-blue-200 text-sm">Coverage of EU AI Act obligations from Article 5 to Article 73</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">EU AI Act Coverage</h2>
        <p className="text-center text-gray-600 mb-12">Our platform covers the full scope of the EU AI Act</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Art. 5: Prohibited Practices', 'Art. 6: Risk Classification', 'Art. 9: Risk Management', 'Art. 10: Data Governance', 'Art. 11+Annex IV: Technical Docs', 'Art. 13: Transparency', 'Art. 14: Human Oversight', 'Art. 27: FRIA Assessment', 'Art. 52: Limited Risk', 'Art. 72: Post-Market Monitoring', 'Art. 73: Incident Reporting', 'GDPR Cross-Check'].map(item => (
            <div key={item} className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-sm font-medium text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs">AC</div>
            <span className="text-sm">AI Act Compliance</span>
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/pricing" className="hover:text-white">Pricing</Link>
            <span>Regulation (EU) 2024/1689</span>
          </div>
          <p className="text-xs">Not legal advice. Consult a qualified legal professional.</p>
        </div>
      </footer>

      <ChatBot />
    </div>
  )
}
