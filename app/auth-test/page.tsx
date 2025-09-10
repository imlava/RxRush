'use client'

import { useSession } from 'next-auth/react'

export default function AuthTest() {
  const { data: session, status } = useSession()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Authentication Test</h1>
      
      <div className="space-y-4">
        <div>
          <strong>Status:</strong> {status}
        </div>
        
        {session && (
          <div>
            <strong>Session:</strong>
            <pre className="bg-gray-100 p-4 rounded mt-2 text-sm">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
