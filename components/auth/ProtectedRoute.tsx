'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import type { Session } from 'next-auth'

export default function ProtectedRoute({
  children,
  requireAdmin = false,
}: {
  children: React.ReactNode
  requireAdmin?: boolean
}) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/login')
    } else if (requireAdmin && session.user.role !== 'admin') {
      router.push('/')
    }
  }, [session, status, requireAdmin, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session || (requireAdmin && session.user.role !== 'admin')) {
    return null
  }

  return <>{children}</>
} 