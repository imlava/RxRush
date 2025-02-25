import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-6">The page you're looking for can't be found</p>
        <Link 
          href="/" 
          className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-green-500 hover:bg-green-600 rounded-md transition"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
