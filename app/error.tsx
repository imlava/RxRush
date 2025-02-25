'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">500</h1>
        <p className="text-xl text-gray-600 mb-8">Something went wrong</p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
