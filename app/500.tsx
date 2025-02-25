import Link from 'next/link';

export default function Error500() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">500</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">Server Error</h2>
        <p className="text-gray-500 mb-8">Something went wrong on our end. Please try again later.</p>
        <div className="space-x-4">
          <Link 
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
} 