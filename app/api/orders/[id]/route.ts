import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // In a real application, this would fetch data from a database
  const order = {
    id,
    status: 'Out for Delivery',
    createdAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 30 * 60000).toISOString(), // 30 minutes from now
  };

  return NextResponse.json(order);
}
