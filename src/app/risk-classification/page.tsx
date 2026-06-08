'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const questions = [
  { id: 'q1', text: 'Does your AI system use subliminal techniques?', category: 'prohibited' },
  { id: 'q2', text: 'Does your AI system exploit vulnerabilities?', category: 'prohibited' },
  { id: 'q3', text: 'Is your AI system used for social scoring?', category: 'prohibited' },
  { id: 'q4', text: 'Is your AI system used for real-time biometric ID?', category: 'prohibited' },
  { id: 'q5', text: 'Is your AI system a biometric identification system?', category: 'high' },
  { id: 'q6', text: 'Is your AI system used for critical infrastructure?', category: 'high' },
  { id: 'q7', text: 'Is your AI system used for education?', category: 'high' },
  { id: 'q8', text: 'Is your AI system used for employment?', category: 'high' },
  { id: 'q9', text: 'Is your AI system used for essential services?', category: 'high' },
  { id: 'q10', text: 'Is your AI system used for law enforcement?', category: 'high' },
  { id: 'q11', text: 'Is your AI system used for migration control?', category: 'high' },
  { id: 'q12', text: 'Is your AI system used for administration of justice?', category: 'high' },
  { id: 'q13', text: 'Is your AI system a chatbot?', category: 'limited' },
  { id: 'q14', text: 'Is your AI system used for emotion recognition?', category: 'limited' },
  { id: 'q15', text: 'Is your AI system used for biometric categorization?', category: 'limited' },
  { id: 'q16', text: 'Is your AI system used to generate content?', category: 'limited' }
]

export default function RiskClassification() {
  const router = useRouter()
  const [systemName, setSystemName] = useState('')
  const [answers, setAnswers] = useState<Record<string, boolean>>({})
  const [result, setResult] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const handleAnswer = (questionId: string, value: boolean) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const calculateRisk = () => {
    const prohibitedYes = questions.filter(q => q.category === 'prohibited').some(q => answers[q.id] === true)
    if (prohibitedYes) return 'Prohibited'
    const highYes = questions.filter(q => q.category === 'high').some(q => answers[q.id] === true)
    if (highYes) return 'High Risk'
    const limitedYes = questions.filter(q => q.category === 'limited').some(q => answers[q.id] === true)
    if (limitedYes) return 'Limited Risk'
    return 'Minimal Risk'
  }

  const handleSubmit = async () => {
    if (!systemName.trim()) { alert('Please enter a system name'); return }
    const riskLevel = calculateRisk()
    setResult(riskLevel)
    setSaving(true)
    setError(null)
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      console.log('User:', user)
      
      if (user) {
        const { data, error: saveError } = await supabase.from('risk_assessments').insert( {
          p_user_id: user.id,
          p_system_name: systemName,
          p_risk_level: riskLevel,
          p_answers: answers
        })
        
        if (saveError) {
          console.error('RPC error:', saveError)
          setError('Error saving: ' + saveError.message)
        } else {
          console.log('Saved successfully:', data)
          alert('Assessment saved successfully!')
        }
      } else {
        setError('User not logged in')
      }
    } catch (err) {
      console.error('Error:', err)
      setError('Error: ' + err.message)
    }
    
    setSaving(false)
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Risk Classification</h1>
        <p className="text-gray-600 mb-8">EU AI Act Article 6</p>
        
        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}
        
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
                  className={'px-6 py-2 rounded-lg ' + (answers[q.id] === true ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700')}>Yes</button>
                <button onClick={() => handleAnswer(q.id, false)}
                  className={'px-6 py-2 rounded-lg ' + (answers[q.id] === false ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700')}>No</button>
              </div>
              <span className={'inline-block mt-2 text-xs px-2 py-1 rounded ' + (q.category === 'prohibited' ? 'bg-red-100 text-red-700' : q.category === 'high' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700')}>{q.category}</span>
            </div>
          ))}
        </div>
        <button onClick={handleSubmit} disabled={saving}
          className="w-full mt-8 bg-blue-600 text-white py-4 rounded-lg text-lg font-medium hover:bg-blue-700 disabled:opacity-50">
          {saving ? 'Saving...' : 'Submit Assessment'}
        </button>
        {result && (
          <div className={'mt-8 p-6 rounded-lg text-center ' + (result === 'Prohibited' ? 'bg-red-100 text-red-800' : result === 'High Risk' ? 'bg-orange-100 text-orange-800' : result === 'Limited Risk' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800')}>
            <h2 className="text-2xl font-bold mb-2">Risk Level: {result}</h2>
            <p className="text-sm">{result === 'Prohibited' ? 'Prohibited under Article 5.' : result === 'High Risk' ? 'Full compliance under Articles 8-15.' : result === 'Limited Risk' ? 'Transparency under Article 52.' : 'Voluntary codes recommended.'}</p>
          </div>
        )}
        <button onClick={() => router.push('/dashboard')}
          className="w-full mt-4 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300">Back to Dashboard</button>
      </div>
    </main>
  )
}
