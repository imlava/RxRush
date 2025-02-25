import React from 'react'
import Link from 'next/link'

function Error({ statusCode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          {statusCode ? `Error ${statusCode}` : 'Client Error'}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {statusCode
            ? `A server-side error occurred`
            : 'An error occurred on client'}
        </p>
        <Link 
          href="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
        >
          Go back home
        </Link>
      </div>
    </div>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error 