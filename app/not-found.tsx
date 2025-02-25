export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">The page you are looking for does not exist</p>
        <a 
          href="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
        >
          Return Home
        </a>
      </div>
    </div>
  )
}
