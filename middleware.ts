// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

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

// Configure paths that require authentication
const PROTECTED_PATHS = ['/admin', '/account']
const ADMIN_PATHS = ['/admin']
const PUBLIC_PATHS = ['/', '/login', '/products', '/api/auth']
const STATIC_PATHS = ['/_next', '/favicon.ico', '/images']

// Rate limiting map for brute force protection
const rateLimit = new Map()

// Configure rate limiting
const RATE_LIMIT = {
  window: 60 * 1000, // 1 minute
  max: 50 // maximum requests per window
}

// Middleware function
export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const path = request.nextUrl.pathname

  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  )

  // Skip middleware for public and static paths
  if (PUBLIC_PATHS.some(p => path.startsWith(p)) || 
      STATIC_PATHS.some(p => path.startsWith(p)) ||
      path.match(/\.(ico|png|jpg|jpeg|gif|svg|css|js)$/)) {
    return response
  }

  // Rate limiting
  const ip = request.ip ?? 'anonymous'
  const rateLimitKey = `${ip}:${path}`
  const now = Date.now()

  // Clean up old rate limit entries
  for (const [key, data] of rateLimit.entries()) {
    if (now - data.timestamp > RATE_LIMIT.window) {
      rateLimit.delete(key)
    }
  }

  // Check rate limit
  const rateLimitData = rateLimit.get(rateLimitKey) ?? { count: 0, timestamp: now }
  if (now - rateLimitData.timestamp > RATE_LIMIT.window) {
    rateLimitData.count = 0
    rateLimitData.timestamp = now
  }
  rateLimitData.count++
  rateLimit.set(rateLimitKey, rateLimitData)

  if (rateLimitData.count > RATE_LIMIT.max) {
    return new NextResponse('Too Many Requests', { status: 429 })
  }

  // Get the token
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  })

  // Check protected paths
  if (PROTECTED_PATHS.some(prefix => path.startsWith(prefix))) {
    if (!token) {
      const url = new URL('/login', request.url)
      url.searchParams.set('callbackUrl', request.url)
      return NextResponse.redirect(url)
    }

    // Check admin paths
    if (ADMIN_PATHS.some(prefix => path.startsWith(prefix))) {
      if (token.role !== 'admin') {
        console.log('Non-admin access attempt:', path, 'by user role:', token.role)
        return NextResponse.redirect(new URL('/', request.url))
      }
    }
  }

  // Only intercept API routes
  if (!path.startsWith('/api/')) {
    return response
  }

  // Skip middleware for auth routes to prevent caching
  if (path.startsWith('/api/auth')) {
    return response
  }

  // Validate route access for non-auth routes
  if (!isRouteAllowed(path)) {
    return NextResponse.json({ error: 'Route not found' }, { status: 404 })
  }

  const method = request.method as HTTPMethod
  const queryParams = Object.fromEntries(request.nextUrl.searchParams.entries())
  const cacheKey = `${method}:${path}:${JSON.stringify(queryParams)}`

  // Check cache for GET requests
  if (method === 'GET') {
    const cachedData = getCachedData(cacheKey)
    if (cachedData) {
      return NextResponse.json(cachedData)
    }
  }

  // Check if the request is for an admin route
  if (path.startsWith('/admin')) {
    // Skip authentication for the login page
    if (path === '/admin/auth') {
      return response
    }

    // Check if user is authenticated
    const isAuthenticated = request.cookies.get('adminAuthenticated')?.value === 'true'
    
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      return NextResponse.redirect(new URL('/admin/auth', request.url))
    }
  }

  // Continue to the API route
  return response
}

// Configure which paths this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
