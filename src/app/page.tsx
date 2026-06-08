import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-8">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-bold mb-4 text-gray-900">AI Act Compliance</h1>
        <p className="text-xl mb-2 text-gray-600">EU AI Act Compliance Platform for SMEs</p>
        <p className="text-sm mb-8 text-gray-500">Continuous compliance operation platform</p>
        <div className="flex gap-4 justify-center">
          <Link href="/login" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 text-lg font-medium">Sign In</Link>
          <Link href="/register" className="bg-white text-blue-600 px-8 py-3 rounded-lg border border-blue-600 hover:bg-blue-50 text-lg font-medium">Sign Up</Link>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Risk Classification</h3>
            <p className="text-gray-500 text-sm">Article 6 decision tree + Annex III</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Compliance Check</h3>
            <p className="text-gray-500 text-sm">Multi-dimensional assessment</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-2">AI Documentation</h3>
            <p className="text-gray-500 text-sm">Annex IV + DoC + FRIA</p>
          </div>
        </div>
      </div>
    </main>
  )
}
