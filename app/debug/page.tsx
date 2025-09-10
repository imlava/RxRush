'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function DebugPage() {
  const { data: session, status } = useSession()

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Auth Status</h1>
      
      <div className="space-y-4">
        <div>
          <strong>Status:</strong> {status}
        </div>
        
        <div>
          <strong>Session:</strong>
          <pre className="bg-gray-100 p-4 rounded mt-2">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>

        <div className="space-y-2">
          <Link href="/login" className="block text-blue-600 hover:underline">
            Go to Login
          </Link>
          <Link href="/admin" className="block text-blue-600 hover:underline">
            Go to Admin (should redirect if not authenticated)
          </Link>
          <Link href="/" className="block text-blue-600 hover:underline">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
