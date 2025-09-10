'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'

function PostLoginRedirectComponent() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get('callbackUrl')

  useEffect(() => {
    if (status === 'loading') return

    if (session?.user) {
      const role = session.user.role
      
      // Check if there's a specific callback URL first
      if (callbackUrl && !callbackUrl.includes('/login')) {
        router.push(callbackUrl)
        return
      }
      
      // Role-based redirection
      if (role === 'admin') {
        router.push('/admin')
      } else if (role === 'pharmacy') {
        router.push('/admin/inventory')
      } else {
        router.push('/')
      }
    } else {
      router.push('/login')
    }
  }, [session, status, router, callbackUrl])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="h-8 w-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to your dashboard...</p>
      </div>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="h-8 w-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  )
}

export default function PostLoginRedirect() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PostLoginRedirectComponent />
    </Suspense>
  )
}
