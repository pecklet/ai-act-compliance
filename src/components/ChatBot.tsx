'use client'
import { useState } from 'react'

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Hello! I am your EU AI Act compliance assistant. Ask me anything about the EU AI Act, risk levels, obligations, or how our platform can help you comply. What would you like to know?' }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setLoading(true)
    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: userMsg }) })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }])
    }
    setLoading(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col" style={{ height: '480px' }}>
          <div className="bg-blue-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div>
              <h3 className="font-bold">EU AI Act Assistant</h3>
              <p className="text-xs text-blue-200">Multilingual support available</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white hover:text-blue-200 text-xl font-bold">x</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                <div className={msg.role === 'user' ? 'bg-blue-600 text-white rounded-2xl rounded-br-sm px-4 py-2 max-w-[80%] text-sm' : 'bg-gray-100 text-gray-800 rounded-2xl rounded-bl-sm px-4 py-2 max-w-[80%] text-sm'}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-2 text-sm text-gray-500">Thinking...</div>
              </div>
            )}
          </div>
          <div className="p-3 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask about EU AI Act..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button onClick={handleSend} disabled={loading} className="bg-blue-600 text-white rounded-full px-4 py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-50">Send</button>
            </div>
          </div>
        </div>
      )}
      <button onClick={() => setOpen(!open)} className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-700 hover:scale-110 transition-all">
        {open ? (
          <span className="text-2xl font-bold">x</span>
        ) : (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
        )}
      </button>
    </div>
  )
}
