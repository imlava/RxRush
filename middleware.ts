// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define allowed API routes
const DYNAMIC_ROUTES = [
  '/api/orders',
  '/api/users',
  '/api/medicines',
  '/api/auth'  // Add auth route
] as const

// Supported HTTP methods
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

// Simple cache implementation
const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 60 * 1000 // 1 minute

// Validate route access
function isRouteAllowed(pathname: string): boolean {
  return DYNAMIC_ROUTES.some(route => pathname.startsWith(route))
}

// Check cache for GET requests
function getCachedData(key: string) {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }
  return null
}

// Set data in the cache
function setCachedData(key: string, data: any) {
  cache.set(key, { data, timestamp: Date.now() })
}

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  // Only intercept API routes
  if (!pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Skip middleware for auth routes to prevent caching
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next()
  }

  // Validate route access for non-auth routes
  if (!isRouteAllowed(pathname)) {
    return NextResponse.json({ error: 'Route not found' }, { status: 404 })
  }

  const method = request.method as HTTPMethod
  const queryParams = Object.fromEntries(searchParams.entries())
  const cacheKey = `${method}:${pathname}:${JSON.stringify(queryParams)}`

  // Check cache for GET requests
  if (method === 'GET') {
    const cachedData = getCachedData(cacheKey)
    if (cachedData) {
      return NextResponse.json(cachedData)
    }
  }

  // Continue to the API route
  return NextResponse.next()
}
