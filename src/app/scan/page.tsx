'use client'
import { useState } from 'react'
import Link from 'next/link'
import { downloadReport } from '@/lib/reportGenerator'

export default function ScanPage() {
  const [url, setUrl] = useState('')
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleScan = async () => {
    if (!url.trim()) return
    let scanUrl = url.trim()
    if (!scanUrl.startsWith('http')) scanUrl = 'https://' + scanUrl
    setScanning(true)
    setError('')
    setResult(null)
    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: scanUrl })
      })
      const data = await res.json()
      if (data.error) {
        setError(data.error)
      } else {
        setResult(data)
      }
    } catch {
      setError('Network error. Please try again.')
    }
    setScanning(false)
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    if (score >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const getRiskColor = (level) => {
    if (level === 'low') return 'bg-green-100 text-green-800'
    if (level === 'medium') return 'bg-yellow-100 text-yellow-800'
    if (level === 'high') return 'bg-orange-100 text-orange-800'
    if (level === 'critical') return 'bg-red-100 text-red-800'
    return 'bg-gray-100 text-gray-800'
  }

  const getStatusColor = (status) => {
    if (status === 'compliant') return 'bg-green-100 text-green-800'
    if (status === 'non-compliant') return 'bg-red-100 text-red-800'
    if (status === 'warning') return 'bg-yellow-100 text-yellow-800'
    return 'bg-gray-100 text-gray-600'
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
            <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 text-sm font-medium">Dashboard</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">URL Compliance Scanner</h1>
          <p className="text-gray-600">Enter a URL to scan for EU AI Act compliance issues. Our AI will analyze the webpage and check for transparency obligations, risk disclosures, and more.</p>
          <p className="text-xs text-gray-400 mt-2">Based on Articles 5, 6, 13, 14, 52 of Regulation (EU) 2024/1689</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex gap-3">
            <input
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleScan()}
              placeholder="https://example.com"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleScan}
              disabled={scanning || !url.trim()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {scanning ? 'Scanning...' : 'Scan URL'}
            </button>
          </div>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          {scanning && (
            <div className="mt-6 text-center">
              <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-3 text-sm text-gray-500">Analyzing webpage for EU AI Act compliance...</p>
            </div>
          )}
        </div>

        {result && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{result.page_title || result.url}</h2>
                  <p className="text-sm text-gray-500">{result.url}</p>
                  <p className="text-xs text-gray-400 mt-1">Scanned: {new Date(result.scanned_at).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className={'text-4xl font-bold ' + getScoreColor(result.overall_score)}>{result.overall_score}</p>
                  <p className="text-sm text-gray-500">Compliance Score</p>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className={'px-3 py-1 rounded-full text-sm font-medium ' + getRiskColor(result.risk_level)}>
                  Risk Level: {result.risk_level ? result.risk_level.toUpperCase() : 'UNKNOWN'}
                </span>
              </div>
              <p className="text-gray-700 text-sm">{result.summary}</p>
            </div>

            {result.checks && result.checks.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Compliance Checks</h3>
                <div className="space-y-3">
                  {result.checks.map((check, i) => (
                    <div key={i} className="flex items-start justify-between border-b border-gray-100 pb-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{check.name || 'Check ' + (i + 1)}</p>
                        <p className="text-xs text-gray-500">{check.details}</p>
                      </div>
                      <span className={'px-2 py-1 rounded text-xs font-medium ' + getStatusColor(check.status)}>
                        {check.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.recommendations && result.recommendations.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recommendations</h3>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">1.</span>
                      <p className="text-sm text-gray-700">{rec}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-3 mb-6">
            <button
              onClick={() => downloadReport(result)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
            >
              Download PDF Report
            </button>
            <button
              onClick={() => setResult(null)}
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50"
            >
              New Scan
            </button>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800"><strong>Note:</strong> This is an automated scan based on publicly visible webpage content. It does not constitute legal advice. For a complete EU AI Act compliance assessment, use our Risk Classification and Compliance Check tools.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
