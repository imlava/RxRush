'use client'

import { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function SimpleAuthTest() {
  const { data: session, status } = useSession()
  const [email, setEmail] = useState('admin@rxrush.com')
  const [password, setPassword] = useState('admin123')

  const handleLogin = async () => {
    const result = await signIn('credentials', {
      email,
      password,
      callbackUrl: '/admin'
    })
    console.log('Login result:', result)
  }

  const handleLogout = () => {
    signOut({ callbackUrl: '/' })
  }

  if (status === 'loading') {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Simple Auth Test</h1>
      
      {!session ? (
        <div className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full p-2 border rounded"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full p-2 border rounded"
            />
          </div>
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Sign In
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-green-100 rounded">
            <p><strong>Logged in as:</strong> {session.user?.email}</p>
            <p><strong>Role:</strong> {session.user?.role}</p>
            <p><strong>Name:</strong> {session.user?.name}</p>
          </div>
          
          <div className="space-y-2">
            <Link href="/admin" className="block text-blue-600 hover:underline">
              → Go to Admin Dashboard
            </Link>
            <Link href="/account" className="block text-blue-600 hover:underline">
              → Go to Account
            </Link>
          </div>
          
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}
