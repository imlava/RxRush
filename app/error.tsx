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
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Something went wrong</h1>
        <p className="text-lg text-gray-600 mb-6">
          An error occurred. Please try again or contact support.
        </p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-green-500 hover:bg-green-600 rounded-md transition"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
