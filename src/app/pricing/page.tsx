'use client'
import Link from 'next/link'

const plans = [
  {
    name: 'Free',
    price: '0',
    period: '/month',
    description: 'Experience core compliance features for free',
    features: [
      'Risk Classification (Article 6)',
      'Compliance Self-Assessment (12 questions)',
      '3 Document Templates',
      'AI Multilingual Chatbot',
    ],
    limitations: [
      'No data saving',
      'No URL scanning',
      'No monthly reports',
    ],
    cta: 'Get Started Free',
    ctaLink: '/register',
    highlighted: false,
  },
  {
    name: 'Starter',
    price: '39',
    period: '/month',
    description: 'Basic continuous compliance for low-risk AI',
    features: [
      'All Free features',
      'Cloud data storage',
      '8 Document Templates',
      '1 URL scan / month',
      'White-label PDF monthly report',
      'Change tracking',
      'Email alerts',
      '3 team members',
    ],
    limitations: [],
    cta: 'Start Free Trial',
    ctaLink: '/register',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '89',
    period: '/month',
    description: 'Full EU AI Act compliance coverage',
    features: [
      'All Starter features',
      '15 Document Templates (all obligations)',
      '5 URL scans / month',
      'White-label PDF monthly report',
      'Quarterly deep compliance review',
      'FRIA Impact Assessment (Art. 27)',
      'Serious incident report (Art. 73)',
      'Compliance score dashboard',
      'GDPR cross-check',
      'Human oversight assessment (Art. 14)',
      '10 team members',
    ],
    limitations: [],
    cta: 'Start Free Trial',
    ctaLink: '/register',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '159',
    period: '/month',
    description: 'Complete compliance operations platform',
    features: [
      'All Professional features',
      'Unlimited URL scans + weekly',
      'GDPR deep scan (auto-detect)',
      'Custom checklists by industry',
      'Document version management',
      'Regulation change auto-push',
      'White-label PDF (client logo)',
      'Unlimited team members',
    ],
    limitations: [],
    cta: 'Start Free Trial',
    ctaLink: '/register',
    highlighted: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Pricing</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            EU AI Act compliance made simple. Choose the plan that fits your risk level.
            All paid plans include a 14-day free trial.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Prices in EUR. No credit card required for free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 ${
                plan.highlighted
                  ? 'bg-blue-600 text-white shadow-xl scale-105'
                  : 'bg-white text-gray-900 shadow-lg'
              }`}
            >
              <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
              <p className={`text-sm mb-4 ${plan.highlighted ? 'text-blue-100' : 'text-gray-500'}`}>
                {plan.description}
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold">EUR{plan.price}</span>
                <span className={plan.highlighted ? 'text-blue-200' : 'text-gray-500'}>
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className={plan.highlighted ? 'text-blue-200' : 'text-green-500'}>check</span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
                {plan.limitations.map((limitation) => (
                  <li key={limitation} className="flex items-start gap-2 opacity-50">
                    <span>x</span>
                    <span className="text-sm">{limitation}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={plan.ctaLink}
                className={`block w-full text-center py-3 px-6 rounded-lg font-medium ${
                  plan.highlighted
                    ? 'bg-white text-blue-600 hover:bg-blue-50'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">EU AI Act Coverage by Plan</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-3 border">Article</th>
                  <th className="text-left p-3 border">Requirement</th>
                  <th className="text-center p-3 border">Free</th>
                  <th className="text-center p-3 border">Starter</th>
                  <th className="text-center p-3 border bg-blue-50">Pro</th>
                  <th className="text-center p-3 border">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-3 border">Art. 6</td><td className="p-3 border">Risk Classification</td><td className="text-center p-3 border">Y</td><td className="text-center p-3 border">Y</td><td className="text-center p-3 border bg-blue-50">Y</td><td className="text-center p-3 border">Y</td></tr>
                <tr><td className="p-3 border">Art. 9</td><td className="p-3 border">Risk Management</td><td className="text-center p-3 border">Y</td><td className="text-center p-3 border">Y</td><td className="text-center p-3 border bg-blue-50">Y</td><td className="text-center p-3 border">Y</td></tr>
                <tr><td className="p-3 border">Art. 10</td><td className="p-3 border">Data Governance</td><td className="text-center p-3 border">Y</td><td className="text-center p-3 border">Y</td><td className="text-center p-3 border bg-blue-50">Y</td><td className="text-center p-3 border">Y</td></tr>
                <tr><td className="p-3 border">Art. 11+Annex IV</td><td className="p-3 border">Technical Documentation</td><td className="text-center p-3 border">Y</td><td className="text-center p-3 border">Y</td><td className="text-center p-3 border bg-blue-50">Y</td><td className="text-center p-3 border">Y</td></tr>
                <tr><td className="p-3 border">Art. 13</td><td className="p-3 border">Transparency</td><td className="text-center p-3 border">Y</td><td className="text-center p-3 border">Y</td><td className="text-center p-3 border bg-blue-50">Y</td><td className="text-center p-3 border">Y</td></tr>
                <tr><td className="p-3 border">Art. 14</td><td className="p-3 border">Human Oversight</td><td className="text-center p-3 border">-</td><td className="text-center p-3 border">-</td><td className="text-center p-3 border bg-blue-50">Y</td><td className="text-center p-3 border">Y</td></tr>
                <tr><td className="p-3 border">Art. 27+29</td><td className="p-3 border">FRIA Assessment</td><td className="text-center p-3 border">-</td><td className="text-center p-3 border">-</td><td className="text-center p-3 border bg-blue-50">Y</td><td className="text-center p-3 border">Y</td></tr>
                <tr><td className="p-3 border">Art. 52</td><td className="p-3 border">Limited Risk Transparency</td><td className="text-center p-3 border">Y</td><td className="text-center p-3 border">Y</td><td className="text-center p-3 border bg-blue-50">Y</td><td className="text-center p-3 border">Y</td></tr>
                <tr><td className="p-3 border">Art. 72</td><td className="p-3 border">Post-Market Monitoring</td><td className="text-center p-3 border">-</td><td className="text-center p-3 border">Y</td><td className="text-center p-3 border bg-blue-50">Y</td><td className="text-center p-3 border">Y</td></tr>
                <tr><td className="p-3 border">Art. 73</td><td className="p-3 border">Serious Incident Report</td><td className="text-center p-3 border">-</td><td className="text-center p-3 border">-</td><td className="text-center p-3 border bg-blue-50">Y</td><td className="text-center p-3 border">Y</td></tr>
                <tr><td className="p-3 border">GDPR</td><td className="p-3 border">Cross-compliance Check</td><td className="text-center p-3 border">-</td><td className="text-center p-3 border">-</td><td className="text-center p-3 border bg-blue-50">Y</td><td className="text-center p-3 border">Y</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
