'use client'

import { useSession } from 'next-auth/react'

export default function TestAdminPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div className="p-8">Loading admin page...</div>
  }

  if (!session) {
    return <div className="p-8">No session found. Please log in.</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Admin Dashboard</h1>
      
      <div className="space-y-4">
        <div className="p-4 bg-green-100 rounded">
          <h2 className="font-bold">Current User:</h2>
          <p>Email: {session.user?.email}</p>
          <p>Name: {session.user?.name}</p>
          <p>Role: {session.user?.role}</p>
          <p>ID: {session.user?.id}</p>
        </div>
        
        <div className="p-4 bg-blue-100 rounded">
          <h2 className="font-bold">Session Status:</h2>
          <p>Status: {status}</p>
          <p>Session exists: {session ? 'Yes' : 'No'}</p>
        </div>

        <div className="p-4 bg-yellow-100 rounded">
          <h2 className="font-bold">Role Check:</h2>
          <p>Is Admin: {session.user?.role === 'admin' ? 'Yes' : 'No'}</p>
          <p>Is Pharmacy: {session.user?.role === 'pharmacy' ? 'Yes' : 'No'}</p>
          <p>Is Customer: {session.user?.role === 'customer' ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </div>
  )
}
