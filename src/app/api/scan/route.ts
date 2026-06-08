import { NextRequest, NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const { url } = await req.json()
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 })
    }

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // Step 1: Fetch the webpage content
    let pageContent = ''
    let pageTitle = ''
    try {
      const response = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AIActComplianceBot/1.0)' }
      })
      if (!response.ok) {
        return NextResponse.json({ error: 'Could not fetch URL. Status: ' + response.status }, { status: 400 })
      }
      pageContent = await response.text()
      const titleMatch = pageContent.match(/<title[^>]*>([^<]*)<\/title>/i)
      if (titleMatch) pageTitle = titleMatch[1]
    } catch (fetchError) {
      return NextResponse.json({ error: 'Could not reach the URL. Please check it is correct and accessible.' }, { status: 400 })
    }

    // Step 2: Extract text content (remove HTML tags)
    const textContent = pageContent
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 8000)

    // Step 3: Analyze with OpenAI for EU AI Act compliance
    const analysisPrompt = `You are an EU AI Act compliance auditor. Analyze this webpage content and check for EU AI Act compliance issues.

Website URL: ${url}
Page Title: ${pageTitle}

Page Content (truncated):
${textContent}

Check for the following EU AI Act compliance items and respond in JSON format:

1. AI Disclosure: Does the page disclose the use of AI systems? (Article 13)
2. Chatbot/Deepfake Labeling: Are AI-generated interactions labeled? (Article 52)
3. Emotion Recognition: Is there any emotion recognition technology? (Article 5 - prohibited in certain contexts)
4. Biometric Identification: Is there biometric identification? (Article 5 - prohibited in certain contexts)
5. Social Scoring: Is there any social scoring? (Article 5 - prohibited)
6. Risk Information: Does the page provide information about AI system risks?
7. Human Oversight: Is there mention of human oversight or human-in-the-loop? (Article 14)
8. Data Protection: Does the page mention GDPR compliance or data protection?
9. Privacy Policy: Is there a link to a privacy policy?
10. Terms of Service: Is there a link to terms of service?
11. Contact Information: Is there contact information for the organization?
12. Cookie Consent: Is there evidence of cookie consent mechanism?

For each item, provide:
- status: "compliant", "non-compliant", "warning", or "not-found"
- details: brief explanation

Also provide:
- overall_score: a number from 0-100
- risk_level: "low", "medium", "high", or "critical"
- summary: 2-3 sentence overall assessment
- recommendations: array of 3-5 specific improvement suggestions

Respond ONLY with valid JSON, no markdown formatting.`

    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiKey },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'system', content: 'You are an EU AI Act compliance auditor. Always respond with valid JSON only, no markdown.' }, { role: 'user', content: analysisPrompt }],
        max_tokens: 2000,
        temperature: 0.3,
      }),
    })

    const aiData = await aiResponse.json()
    let analysis
    try {
      const replyContent = aiData.choices[0].message.content
      const cleaned = replyContent.replace(/```json
?/g, '').replace(/```
?/g, '').trim()
      analysis = JSON.parse(cleaned)
    } catch (parseError) {
      analysis = {
        overall_score: 0,
        risk_level: 'unknown',
        summary: 'Analysis completed but results could not be parsed.',
        recommendations: ['Please try scanning again.'],
        checks: []
      }
    }

    return NextResponse.json({
      url,
      page_title: pageTitle,
      scanned_at: new Date().toISOString(),
      ...analysis
    })
  } catch (error) {
    return NextResponse.json({ error: 'Scan failed. Please try again.' }, { status: 500 })
  }
}
