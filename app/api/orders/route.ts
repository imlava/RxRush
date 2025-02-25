import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  
  // In a real application, this would create an order in the database
  const order = {
    id: Math.random().toString(36).substr(2, 9),
    ...body,
    status: 'Preparing',
    createdAt: new Date().toISOString()
  }

  return NextResponse.json(order)
}
