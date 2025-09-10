'use client'

import { useState } from 'react'
import { Sidebar } from '@/app/components/admin/Sidebar'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute requireAdmin allowPharmacy>
      <div className="relative">
        <Sidebar />
        <div className="md:pl-64">
          {children}
        </div>
      </div>
    </ProtectedRoute>
  )
} 