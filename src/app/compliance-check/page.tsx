'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const questions = [
  { id: 'c1', text: 'Has your organization established a risk management system for the AI system?', category: 'governance', weight: 3 },
  { id: 'c2', text: 'Is there a designated person responsible for AI governance and compliance?', category: 'governance', weight: 3 },
  { id: 'c3', text: 'Has a data governance strategy been implemented for training and testing data?', category: 'data', weight: 3 },
  { id: 'c4', text: 'Are training datasets representative and free from bias?', category: 'data', weight: 3 },
  { id: 'c5', text: 'Has technical documentation been prepared according to Annex IV?', category: 'documentation', weight: 3 },
  { id: 'c6', text: 'Has a conformity assessment been conducted or is planned?', category: 'assessment', weight: 3 },
  { id: 'c7', text: 'Are there mechanisms for human oversight in place?', category: 'human', weight: 3 },
  { id: 'c8', text: 'Is there a plan for post-market monitoring?', category: 'monitoring', weight: 2 },
  { id: 'c9', text: 'Has an incident reporting procedure been established?', category: 'monitoring', weight: 2 },
  { id: 'c10', text: 'Are transparency obligations addressed (Article 52)?', category: 'transparency', weight: 2 },
  { id: 'c11', text: 'Is there a process for handling user complaints?', category: 'user', weight: 2 },
  { id: 'c12', text: 'Has a Fundamental Rights Impact Assessment (FRIA) been conducted?', category: 'rights', weight: 3 }
]

export default function ComplianceCheck() {
  const router = useRouter()
  const [systemName, setSystemName] = useState('')
  const [answers, setAnswers] = useState<Record<string, boolean>>({})
  const [result, setResult] = useState(null)
  const [saving, setSaving] = useState(false)

  const handleAnswer = (questionId: string, value: boolean) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const calculateScore = () => {
    const totalWeight = questions.reduce((sum, q) => sum + q.weight, 0)
    const yesWeight = questions
      .filter(q => answers[q.id] === true)
      .reduce((sum, q) => sum + q.weight, 0)
    return Math.round((yesWeight / totalWeight) * 100)
  }

  const getComplianceLevel = (score: number) => {
    if (score >= 80) return 'Compliant'
    if (score >= 60) return 'Partially Compliant'
    if (score >= 40) return 'Non-Compliant'
    return 'Critical Non-Compliance'
  }

  const handleSubmit = async () => {
    if (!systemName.trim()) { alert('Please enter a system name'); return }
    const score = calculateScore()
    const level = getComplianceLevel(score)
    setResult({ score, level })
    setSaving(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      await supabase.from('compliance_checks').insert({
        user_id: user.id,
        system_name: systemName,
        score: score,
        answers: answers
      })
    } catch (e) {
      console.error('Save error:', e)
    }
    setTimeout(() => setSaving(false), 1000)
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Compliance Check</h1>
        <p className="text-gray-600 mb-8">EU AI Act Self-Assessment Questionnaire</p>
        
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <label className="block text-sm font-medium mb-2">AI System Name</label>
          <input type="text" value={systemName} onChange={(e) => setSystemName(e.target.value)}
            placeholder="Enter system name" className="w-full p-3 border rounded-lg" />
        </div>
        
        <div className="space-y-4">
          {questions.map((q) => (
            <div key={q.id} className="bg-white p-6 rounded-lg shadow">
              <p className="font-medium mb-4">{q.text}</p>
              <div className="flex gap-4">
                <button onClick={() => handleAnswer(q.id, true)}
                  className={'px-6 py-2 rounded-lg ' + (answers[q.id] === true ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700')}>Yes</button>
                <button onClick={() => handleAnswer(q.id, false)}
                  className={'px-6 py-2 rounded-lg ' + (answers[q.id] === false ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700')}>No</button>
              </div>
              <span className={'inline-block mt-2 text-xs px-2 py-1 rounded bg-blue-100 text-blue-700'}>{q.category}</span>
            </div>
          ))}
        </div>
        
        <button onClick={handleSubmit} disabled={saving}
          className="w-full mt-8 bg-blue-600 text-white py-4 rounded-lg text-lg font-medium hover:bg-blue-700 disabled:opacity-50">
          {saving ? 'Calculating...' : 'Submit Assessment'}
        </button>
        
        {result && (
          <div className={'mt-8 p-6 rounded-lg text-center ' + (result.level === 'Compliant' ? 'bg-green-100 text-green-800' : result.level === 'Partially Compliant' ? 'bg-yellow-100 text-yellow-800' : result.level === 'Non-Compliant' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800')}>
            <h2 className="text-2xl font-bold mb-2">{result.level}</h2>
            <p className="text-4xl font-bold mb-2">{result.score}%</p>
            <p className="text-sm">{result.score >= 80 ? 'Your system meets EU AI Act requirements.' : result.score >= 60 ? 'Some improvements needed to fully comply.' : result.score >= 40 ? 'Significant gaps in compliance. Action required.' : 'Critical compliance gaps. Immediate action required.'}</p>
          </div>
        )}
        
        <button onClick={() => router.push('/dashboard')}
          className="w-full mt-4 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300">Back to Dashboard</button>
      </div>
    </main>
  )
}
