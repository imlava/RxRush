import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  // In a real application, this would fetch data from a database
  const medicine = {
    id,
    name: 'Paracetamol',
    dosage: '500mg',
    price: 50,
    originalPrice: 60,
    discount: '17% off',
    description: 'Paracetamol is a common pain reliever and fever reducer.'
  }

  return NextResponse.json(medicine)
}
