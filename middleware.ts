// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Paths that require admin authentication (admin only)
const ADMIN_ONLY_PATHS = ['/admin/users']
// Paths that require admin or pharmacy authentication  
const ADMIN_PHARMACY_PATHS = ['/admin']
// Paths that require user authentication
const PROTECTED_PATHS = ['/account', '/orders']
// Paths that are always accessible
const PUBLIC_PATHS = ['/', '/login', '/register', '/forgot-password', '/products', '/api/auth', '/about']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for public files and API routes (except admin API routes)
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/api') && !pathname.startsWith('/api/admin')
  ) {
    return NextResponse.next()
  }

  // Get the token
  const token = await getToken({ req: request })

  // Check if the path requires admin-only authentication
  if (ADMIN_ONLY_PATHS.some(path => pathname.startsWith(path))) {
    if (!token || token.role !== 'admin') {
      const url = new URL('/login', request.url)
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }
  }

  // Check if the path requires admin or pharmacy authentication
  else if (ADMIN_PHARMACY_PATHS.some(path => pathname.startsWith(path))) {
    if (!token || (token.role !== 'admin' && token.role !== 'pharmacy')) {
      const url = new URL('/login', request.url)
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }
  }

  // Check if the path requires user authentication
  else if (PROTECTED_PATHS.some(path => pathname.startsWith(path))) {
    if (!token) {
      const url = new URL('/login', request.url)
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /_next/ (Next.js internals)
     * 2. /static (static files)
     * 3. /_vercel (Vercel internals)
     * 4. /favicon.ico, /sitemap.xml (SEO files)
     */
    '/((?!_next|static|_vercel|favicon.ico|sitemap.xml).*)',
  ],
}
