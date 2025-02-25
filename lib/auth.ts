import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

export async function getServerSession() {
  const cookieStore = cookies()
  const token = cookieStore.get('auth-token')
  
  if (!token) {
    return null
  }

  try {
    // You can add your JWT verification logic here
    // For example, using jose or jsonwebtoken library
    return {
      user: {
        // Decoded user information from token
        token: token.value
      }
    }
  } catch (error) {
    console.error('Session error:', error)
    return null
  }
}

export function getTokenFromRequest(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }
  return null
}

export async function validateRequest(request: NextRequest) {
  const token = getTokenFromRequest(request)
  if (!token) {
    return false
  }

  try {
    // Add your token validation logic here
    // For example, verify JWT token
    return true
  } catch (error) {
    console.error('Token validation error:', error)
    return false
  }
}

export function unauthorized() {
  return new Response(JSON.stringify({ error: 'Unauthorized' }), {
    status: 401,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export function forbidden() {
  return new Response(JSON.stringify({ error: 'Forbidden' }), {
    status: 403,
    headers: {
      'Content-Type': 'application/json',
    },
  })
} 