'use client'

import { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function TestLogin() {
  const [email, setEmail] = useState('admin@rxrush.com')
  const [password, setPassword] = useState('admin123')
  const [status, setStatus] = useState('')
  const { data: session } = useSession()
  const router = useRouter()

  const handleLogin = async () => {
    setStatus('Logging in...')
    
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      setStatus(`Login result: ${JSON.stringify(result)}`)

      if (result?.ok) {
        setStatus('Login successful! Redirecting...')
        setTimeout(() => {
          router.push('/admin')
        }, 2000)
      }
    } catch (error) {
      setStatus(`Error: ${error}`)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Login</h1>
      
      <div className="space-y-4 max-w-md">
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <button 
          onClick={handleLogin}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Test Login
        </button>
        
        <div className="mt-4">
          <strong>Status:</strong> {status}
        </div>
        
        <div className="mt-4">
          <strong>Current Session:</strong>
          <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}
