import { NextRequest, NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const { message } = await req.json()
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return NextResponse.json({ reply: 'AI chat is being configured. Please try again later.' })
    }

    const systemPrompt = `You are an expert EU AI Act compliance advisor. You help businesses understand and comply with the EU AI Act (Regulation 2024/1689). 

Rules:
- Answer questions about EU AI Act articles, obligations, risk levels, deadlines, and penalties
- Provide accurate, specific article references when possible
- Explain in clear, practical language
- If asked about pricing or plans, suggest visiting the pricing page
- If asked about features, explain what the platform offers
- Respond in the same language the user writes in
- Keep responses concise (2-4 paragraphs max)
- Always remind users that this is general guidance, not legal advice

Key EU AI Act facts:
- Entered into force: 1 August 2024
- Prohibited practices (Art. 5): Social scoring, real-time remote biometric ID in public, emotion recognition in workplaces/schools
- High-risk (Annex III): Critical infrastructure, education, employment, law enforcement, migration, justice, democratic processes
- High-risk obligations (Art. 9-49): Risk management, data governance, technical docs, record-keeping, transparency, human oversight, accuracy/robustness
- Limited risk (Art. 52): Transparency obligations for chatbots, deepfakes, emotion recognition
- Fines: Up to EUR 35M or 7% global turnover for prohibited practices; EUR 15M or 3% for other violations
- GPAI rules: Code of practice, systemic risk obligations
- Application dates: Prohibited practices from Feb 2025, GPAI from Aug 2025, high-risk from Aug 2026`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiKey },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: message }],
        max_tokens: 500,
        temperature: 0.7,
      }),
    })

    const data = await response.json()
    const reply = data.choices && data.choices[0] ? data.choices[0].message.content : 'Sorry, I could not process your request. Please try again.'
    return NextResponse.json({ reply })
  } catch (error) {
    return NextResponse.json({ reply: 'An error occurred. Please try again later.' })
  }
}
