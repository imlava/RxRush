import { NextRequest } from 'next/server'
import { validateRequest, unauthorized } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const isValid = await validateRequest(request)
  
  if (!isValid) {
    return unauthorized()
  }

  return Response.json({
    message: 'This is a protected API route',
    timestamp: new Date().toISOString(),
  })
}

export async function POST(request: NextRequest) {
  const isValid = await validateRequest(request)
  
  if (!isValid) {
    return unauthorized()
  }

  const data = await request.json()

  return Response.json({
    message: 'Data received successfully',
    data,
    timestamp: new Date().toISOString(),
  })
} 