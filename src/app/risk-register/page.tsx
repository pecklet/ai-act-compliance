'use client'
import { useState } from 'react'
import Link from 'next/link'

interface Risk {
  id: string
  title: string
  category: string
  likelihood: 'low' | 'medium' | 'high'
  severity: 'low' | 'medium' | 'high'
  mitigation: string
  status: 'open' | 'mitigated' | 'accepted'
}

const categories = [
  'Safety & Physical Harm',
  'Privacy & Data Protection',
  'Transparency & Explainability',
  'Fairness & Non-Discrimination',
  'Human Oversight & Control',
  'Security & Robustness',
  'Accuracy & Reliability',
  'Social & Environmental Impact'
]
export default function RiskRegisterPage() {
  const [step, setStep] = useState(1)
  const [systemName, setSystemName] = useState('')
  const [systemDesc, setSystemDesc] = useState('')
  const [risks, setRisks] = useState<Risk[]>([])
  const [newTitle, setNewTitle] = useState('')
  const [newCategory, setNewCategory] = useState(categories[0])
  const [newLikelihood, setNewLikelihood] = useState<'low' | 'medium' | 'high'>('medium')
  const [newSeverity, setNewSeverity] = useState<'low' | 'medium' | 'high'>('medium')
  const [submitted, setSubmitted] = useState(false)

  const addRisk = () => {
    if (!newTitle.trim()) return
    const risk: Risk = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      category: newCategory,
      likelihood: newLikelihood,
      severity: newSeverity,
      mitigation: '',
      status: 'open'
    }
    setRisks([...risks, risk])
    setNewTitle('')
  }

  const removeRisk = (id: string) => {
    setRisks(risks.filter(r => r.id !== id))
  }

  const updateMitigation = (id: string, value: string) => {
    setRisks(risks.map(r => r.id === id ? { ...r, mitigation: value } : r))
  }

  const updateStatus = (id: string, status: 'open' | 'mitigated' | 'accepted') => {
    setRisks(risks.map(r => r.id === id ? { ...r, status } : r))
  }

  const riskLevel = (r: Risk) => {
    const map = { low: 1, medium: 2, high: 3 }
    const score = map[r.likelihood] * map[r.severity]
    if (score >= 6) return 'High'
    if (score >= 3) return 'Medium'
    return 'Low'
  }

  const riskColor = (level: string) => {
    if (level === 'High') return 'bg-red-100 text-red-800'
    if (level === 'Medium') return 'bg-yellow-100 text-yellow-800'
    return 'bg-green-100 text-green-800'
  }

  const statusColor = (s: string) => {
    if (s === 'mitigated') return 'bg-green-100 text-green-800'
    if (s === 'accepted') return 'bg-blue-100 text-blue-800'
    return 'bg-red-100 text-red-800'
  }

  const highCount = risks.filter(r => riskLevel(r) === 'High').length
  const mitigatedCount = risks.filter(r => r.status === 'mitigated').length

  const handleSubmit = () => {
    setSubmitted(true)
  }
  if (submitted) {
    return (
      <div className='min-h-screen bg-gray-50'>
        <nav className='bg-white shadow-sm border-b'>
          <div className='max-w-4xl mx-auto px-4 py-3 flex justify-between'>
            <Link href='/' className='text-blue-600 font-bold'>AC</Link>
            <Link href='/dashboard' className='text-gray-600'>Dashboard</Link>
          </div>
        </nav>
        <div className='bg-gradient-to-r from-green-500 to-emerald-600 text-white py-10'>
          <div className='max-w-4xl mx-auto px-4 text-center'>
            <h1 className='text-3xl font-bold'>Risk Register Complete</h1>
            <p className='text-green-100'>Article 9 - Risk Management System</p>
          </div>
        </div>
        <div className='max-w-4xl mx-auto px-4 py-8'>
          <div className='grid grid-cols-3 gap-4 mb-8'>
            <div className='bg-white rounded-lg shadow p-6 text-center'>
              <div className='text-3xl font-bold text-gray-800'>{risks.length}</div>
              <div className='text-gray-500 text-sm'>Total Risks</div>
            </div>
            <div className='bg-white rounded-lg shadow p-6 text-center'>
              <div className='text-3xl font-bold text-red-600'>{highCount}</div>
              <div className='text-gray-500 text-sm'>High Risk</div>
            </div>
            <div className='bg-white rounded-lg shadow p-6 text-center'>
              <div className='text-3xl font-bold text-green-600'>{mitigatedCount}</div>
              <div className='text-gray-500 text-sm'>Mitigated</div>
            </div>
          </div>
          <div className='bg-white rounded-lg shadow overflow-x-auto mb-8'>
            <table className='w-full text-sm'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-4 py-3 text-left'>Risk</th>
                  <th className='px-4 py-3 text-left'>Category</th>
                  <th className='px-4 py-3 text-left'>Level</th>
                  <th className='px-4 py-3 text-left'>Mitigation</th>
                  <th className='px-4 py-3 text-left'>Status</th>
                </tr>
              </thead>
              <tbody className='divide-y'>
                {risks.map(r => (
                  <tr key={r.id}>
                    <td className='px-4 py-3 font-medium'>{r.title}</td>
                    <td className='px-4 py-3 text-gray-500'>{r.category}</td>
                    <td className='px-4 py-3'>
                      <span className={'px-2 py-1 rounded-full text-xs font-medium ' + riskColor(riskLevel(r))}>
                        {riskLevel(r)}
                      </span>
                   </td>
                    <td className='px-4 py-3 text-gray-500 max-w-xs truncate'>{r.mitigation || '-'}</td>
                    <td className='px-4 py-3'>
                      <span className={'px-2 py-1 rounded-full text-xs font-medium ' + statusColor(r.status)}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800 mb-6'>
            <strong>Legal Disclaimer:</strong> This risk register is generated for reference purposes under Article 9 of the EU AI Act (Regulation 2024/1689). It does not constitute legal advice. Please consult a qualified legal professional for formal compliance assessment.
          </div>
          <div className='flex gap-4'>
            <button onClick={() => { setSubmitted(false); setStep(1); }} className='px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300'>
              Start Over
            </button>
            <Link href='/dashboard' className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <nav className='bg-white shadow-sm border-b'>
        <div className='max-w-4xl mx-auto px-4 py-3 flex justify-between'>
          <Link href='/' className='text-blue-600 font-bold'>AC</Link>
          <Link href='/dashboard' className='text-gray-600'>Dashboard</Link>
        </div>
      </nav>
      <div className='bg-gradient-to-r from-orange-500 to-red-600 text-white py-10'>
        <div className='max-w-4xl mx-auto px-4 text-center'>
          <h1 className='text-3xl font-bold'>Risk Register Builder</h1>
          <p className='text-orange-100'>Article 9 - Risk Management System</p>
        </div>
      </div>
      <div className='max-w-4xl mx-auto px-4 py-8'>
        <div className='flex items-center justify-between mb-8'>
          <div className='flex items-center gap-2'>
            {[1, 2, 3, 4].map(s => (
              <div key={s} className={'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ' + (s <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500')}>
                {s}
              </div>
            ))}
          </div>
          <span className='text-sm text-gray-500'>
            Step {step} of 4
          </span>
        </div>
       {step === 1 && (
          <div className='bg-white rounded-lg shadow p-6'>
            <h2 className='text-xl font-bold mb-1'>System Description</h2>
            <p className='text-gray-500 text-sm mb-6'>Describe the AI system you are assessing.</p>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>System Name</label>
                <input type='text' value={systemName} onChange={e => setSystemName(e.target.value)} placeholder='e.g. Customer Churn Predictor' className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none' />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
                <textarea value={systemDesc} onChange={e => setSystemDesc(e.target.value)} rows={4} placeholder='Describe what your AI system does, its intended purpose, and how it makes decisions...' className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none' />
              </div>
            </div>
            <div className='mt-6 flex justify-end'>
              <button onClick={() => setStep(2)} disabled={!systemName.trim() || !systemDesc.trim()} className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed'>
                Next: Identify Risks
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className='bg-white rounded-lg shadow p-6'>
            <h2 className='text-xl font-bold mb-1'>Risk Identification</h2>
            <p className='text-gray-500 text-sm mb-6'>Identify potential risks associated with your AI system.</p>
            <div className='grid grid-cols-2 gap-4 mb-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Risk Title</label>
                <input type='text' value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder='e.g. Biased training data' className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none' />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Category</label>
                <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none'>
                 {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Likelihood</label>
                <select value={newLikelihood} onChange={e => setNewLikelihood(e.target.value as 'low' | 'medium' | 'high')} className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none'>
                  <option value='low'>Low</option>
                  <option value='medium'>Medium</option>
                  <option value='high'>High</option>
                </select>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Severity</label>
                <select value={newSeverity} onChange={e => setNewSeverity(e.target.value as 'low' | 'medium' | 'high')} className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none'>
                  <option value='low'>Low</option>
                  <option value='medium'>Medium</option>
                  <option value='high'>High</option>
                </select>
              </div>
            </div>
            <button onClick={addRisk} disabled={!newTitle.trim()} className='px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed mb-6'>
              Add Risk
            </button>
            {risks.length > 0 && (
              <div className='space-y-3'>
                <h3 className='font-medium text-gray-700'>Identified Risks ({risks.length})</h3>
                {risks.map(r => (
                  <div key={r.id} className='flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3'>
                    <div>
                      <div className='font-medium'>{r.title}</div>
                      <div className='text-sm text-gray-500'>{r.category} - Likelihood: {r.likelihood} / Severity: {r.severity}</div>
                    </div>
                    <button onClick={() => removeRisk(r.id)} className='text-red-500 hover:text-red-700 text-sm'>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className='mt-6 flex justify-between'>
              <button onClick={() => setStep(1)} className='px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300'>
                Back
              </button>
              <button onClick={() => setStep(3)} disabled={risks.length === 0} className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed'>
                Next: Add Safeguards
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className='bg-white rounded-lg shadow p-6'>
            <h2 className='text-xl font-bold mb-1'>Risk Mitigation</h2>
            <p className='text-gray-500 text-sm mb-6'>Define safeguards and mitigation measures for each risk.</p>
            <div className='space-y-6'>
              {risks.map(r => (
                <div key={r.id} className='border border-gray-200 rounded-lg p-4'>
                  <div className='flex items-center gap-2 mb-2'>
                    <span className={'px-2 py-1 rounded-full text-xs font-medium ' + riskColor(riskLevel(r))}>
                      {riskLevel(r)}
                    </span>
                    <span className='font-medium'>{r.title}</span>
                  </div>
                  <textarea value={r.mitigation} onChange={e => updateMitigation(r.id, e.target.value)} rows={3} placeholder='Describe the mitigation measures, safeguards, or controls you will implement...' className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none' />
                </div>
              ))}
            </div>
            <div className='mt-6 flex justify-between'>
              <button onClick={() => setStep(2)} className='px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300'>
                Back
              </button>
              <button onClick={() => setStep(4)} className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
                Next: Review
              </button>
            </div>
          </div>
        )}
       {step === 4 && (
          <div className='bg-white rounded-lg shadow p-6'>
            <h2 className='text-xl font-bold mb-1'>Final Review</h2>
            <p className='text-gray-500 text-sm mb-6'>Review and set the status for each identified risk.</p>
            <div className='mb-6 p-4 bg-gray-50 rounded-lg'>
              <div className='font-medium'>System: {systemName}</div>
              <div className='text-sm text-gray-500'>{systemDesc}</div>
            </div>
            <div className='space-y-4'>
              {risks.map(r => (
                <div key={r.id} className='border border-gray-200 rounded-lg p-4'>
                  <div className='flex items-center justify-between mb-2'>
                    <div className='flex items-center gap-2'>
                      <span className={'px-2 py-1 rounded-full text-xs font-medium ' + riskColor(riskLevel(r))}>
                        {riskLevel(r)}
                      </span>
                      <span className='font-medium'>{r.title}</span>
                    </div>
                    <select value={r.status} onChange={e => updateStatus(r.id, e.target.value as 'open' | 'mitigated' | 'accepted')} className='border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none'>
                      <option value='open'>Open</option>
                      <option value='mitigated'>Mitigated</option>
                      <option value='accepted'>Accepted</option>
                    </select>
                  </div>
                  <div className='text-sm text-gray-500'>
                    <span className='font-medium'>Mitigation:</span> {r.mitigation || 'No mitigation defined'}
                  </div>
                </div>
              ))}
            </div>
            <div className='mt-6 flex justify-between'>
              <button onClick={() => setStep(3)} className='px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300'>
                Back
              </button>
              <button onClick={handleSubmit} className='px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700'>
                Submit Risk Register
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
