'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import type { Session } from 'next-auth'

export default function ProtectedRoute({
  children,
  requireAdmin = false,
  allowPharmacy = false,
}: {
  children: React.ReactNode
  requireAdmin?: boolean
  allowPharmacy?: boolean
}) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/login')
    } else if (requireAdmin && session.user.role !== 'admin') {
      // If admin is required and user is not admin
      if (!allowPharmacy || session.user.role !== 'pharmacy') {
        router.push('/')
      }
    }
  }, [session, status, requireAdmin, allowPharmacy, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  // Check permissions
  if (requireAdmin) {
    const hasAccess = session.user.role === 'admin' || (allowPharmacy && session.user.role === 'pharmacy')
    if (!hasAccess) {
      return null
    }
  }

  return <>{children}</>
} 