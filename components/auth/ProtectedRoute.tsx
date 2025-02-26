'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ExtendedSession {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
    role?: string
    id?: string
  }
}

export default function ProtectedRoute({
  children,
  requireAdmin = false,
}: {
  children: React.ReactNode
  requireAdmin?: boolean
}) {
  const { data: session, status } = useSession() as { data: ExtendedSession | null, status: string }
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/login')
    } else if (requireAdmin && session.user?.role !== 'admin') {
      router.push('/')
    }
  }, [session, status, requireAdmin, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session || (requireAdmin && session.user?.role !== 'admin')) {
    return null
  }

  return <>{children}</>
} 