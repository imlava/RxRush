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
      <div className="min-h-screen bg-gray-100">
        <Sidebar />
        <div className="md:pl-64 flex flex-col min-h-screen">
          <div className="py-12 px-8">
            {children}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
} 