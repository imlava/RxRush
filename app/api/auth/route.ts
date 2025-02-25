import { NextRequest, NextResponse } from 'next/server'

// Mock user data - in a real app, this would come from a database
const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
}

export async function POST(request: NextRequest) {
  console.log('POST /api/auth - Request received')
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    console.log('Action:', action)

    if (action === 'login') {
      console.log('Processing login action')
      const body = await request.json()
      const { email, password } = body
      console.log('Login attempt for:', email)

      // For demo purposes, accept any non-empty email/password
      if (email && password) {
        console.log('Credentials valid, creating response')
        const response = NextResponse.json({ 
          user: mockUser,
          status: 'authenticated' 
        })
        response.cookies.set('isLoggedIn', 'true', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 7 * 24 * 60 * 60,
          path: '/',
        })
        return response
      }
      console.log('Invalid credentials')
      return NextResponse.json({ 
        status: 'unauthenticated',
        error: 'Invalid credentials' 
      }, { status: 401 })
    }

    if (action === 'logout') {
      console.log('Processing logout action')
      const response = NextResponse.json({ 
        status: 'unauthenticated',
        success: true 
      })
      response.cookies.set('isLoggedIn', '', {
        path: '/',
        expires: new Date(0),
      })
      return response
    }

    console.log('Invalid action:', action)
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  console.log('GET /api/auth - Request received')
  try {
    const isLoggedIn = request.cookies.get('isLoggedIn')?.value
    console.log('IsLoggedIn cookie:', isLoggedIn)

    if (isLoggedIn === 'true') {
      console.log('User is authenticated, returning user data')
      return NextResponse.json({ 
        user: mockUser,
        status: 'authenticated' 
      })
    }

    console.log('User is not authenticated')
    return NextResponse.json({ 
      status: 'unauthenticated',
      user: null 
    }, { status: 200 }) // Changed from 401 to 200
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json({ 
      status: 'error',
      error: 'Internal server error' 
    }, { status: 500 })
  }
} 