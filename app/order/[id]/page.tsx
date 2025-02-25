import OrderTracking from '@/components/OrderTracking'
import { RuntimeConfig } from '@/config/runtime-config'

export async function generateStaticParams() {
  try {
    // Use mock data instead of API call during build
    const orders = [
      { id: '1' },
      { id: '2' },
      { id: '3' }
    ]

    return orders.map((order) => ({
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
