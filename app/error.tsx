'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import type { ErrorProps } from 'next/error'

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-gray-900">500</h1>
        <p className="text-xl text-gray-600">Something went wrong</p>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  )
}
