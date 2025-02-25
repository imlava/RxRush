import OrderTracking from '@/components/OrderTracking'
import { RuntimeConfig } from '@/config/runtime-config'

export async function generateStaticParams() {
  try {
    const response = await fetch(`${RuntimeConfig.apiBaseUrl}/api/orders`)
    if (!response.ok) {
      throw new Error('Failed to fetch orders')
    }
    const orders = await response.json()

    return orders.map((order: { id: string }) => ({
      id: order.id,
    }))
  } catch (error) {
    console.error('Error generating static params for orders:', error)
    return []
  }
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <OrderTracking id={params.id} />
    </div>
  )
}
